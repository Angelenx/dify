# custom/het-dev-260117 合并 upstream `main` 冲突解决记录

**操作时间**：2026-06-18  
**当前分支**：`custom/het-dev-260117`  
**MERGE_HEAD**：`43192036fa`（`fix: require Agent App role (#37601)`）  
**共同祖先（merge-base）**：`20e91990bf`  
**操作约束**：仅解决冲突并 `git add` 暂存，**未 commit、未 push**。

> 合并总原则：custom 分支中**功能性更改**（权限隔离、软删除、非安全上下文复制、本地构建镜像）一律保留；custom 分支中的 **bug 修复性更改**以 `main` 为优先，必要时回退到 `main` 实现。

---

## 1. 已解决冲突文件一览（共 14 个文件 + 1 个联动修改）

| 文件 | 处理结论 |
|------|----------|
| `.gitignore` | union 两侧条目 |
| `api/controllers/console/app/app.py` | union import；put/delete/name/icon/site-enable/trace 端点保留 `edit_app_permission_required`，采用 main 类型注解 |
| `api/controllers/console/app/workflow.py` | union import；publish 端点叠加 `with_current_user` + `edit_app_permission_required` |
| `api/controllers/console/app/app_import.py` | 保留覆盖导入权限校验块 + 采用 main 的 `Session(expire_on_commit=False)` |
| `api/controllers/console/app/conversation.py` | 采用 main 的 `register_schema_models`，移除旧 `console_ns.model` 大块 |
| `api/fields/conversation_fields.py` | 联动修改：为 `Conversation` / `ConversationWithSummary` / `ConversationDetail` 补回 `is_deleted` 字段 |
| `web/.../copy-feedback/index.tsx` | main 的 shadcn Tooltip UI + custom 的 `writeTextToClipboard` 复制逻辑 |
| `web/.../copy-icon/index.tsx` | 同上，移除 `useClipboard`/`reset` 残留 |
| `web/.../input-with-copy/index.tsx` | 同上，`cn` 改用 `@langgenius/dify-ui/cn` |
| `web/.../file-uploader-in-attachment/file-item.tsx` | 采用 main 侧（`useTranslation` + 去掉 `type=''` 默认值） |
| `web/.../file-uploader-in-chat-input/file-item.tsx` | 同上 |
| `web/.../workflow-variable-block/component.tsx` | union import（保留 `ErrorBoundary` + 旧 var 函数 + main 的 `isSpecialVar`），移除未用 `Tooltip` |
| `docker/.env.example` | 基于 main 结构，仅保留 HET 定制项 `NUMEXPR_MAX_THREADS=16` |
| `docker/docker-compose-template.yaml` | 保留本地 `build`，镜像版本对齐 1.14.2，官方镜像行注释保留 |
| `docker/docker-compose.yaml` | 由 template 重新生成（header + template），同步本地 build 与 1.14.2 |

---

## 2. 各文件处理细节

### 2.1 `api/controllers/console/app/app.py`（8 处冲突）

- **import**：union 为 `from controllers.console.app.wraps import edit_app_permission_required, get_app_model, with_session`。
- **put / delete / name / icon / site-enable 端点**：保留 custom 的 `@edit_app_permission_required`（HET 权限隔离：禁止非管理员修改/删除他人创建的 app），同时采用 main 的类型注解 `app_model: App`。
- **trace 端点**：装饰器顺序定为 `@get_app_model` → `@edit_app_permission_required`（确保权限装饰器从 `kwargs["app_model"]` 读 app），`app_id` 采用 main 的 `app_model.id`。
- 说明：copy / export 等非修改类端点维持 main 的 `@edit_permission_required`，未做改动。

### 2.2 `api/controllers/console/app/workflow.py`（2 处冲突）

- **import**：union，保留 `edit_app_permission_required`，纳入 main 新增的 `with_current_user`、`with_current_tenant_id`。移除 custom 旧 import `workflow_run_node_execution_model`（main 重构后文件内已无引用）。
- **publish 端点**：装饰器自外向内为 `@get_app_model(...)` → `@with_current_user`（注入位置参数 `current_user`）→ `@edit_app_permission_required`（最内层，从 `kwargs["app_model"]` 校验创建者），函数签名 `def post(self, current_user: Account, app_model: App)`。已确认两套注入互不干扰。

### 2.3 `api/controllers/console/app/app_import.py`

- 保留 custom 在 `post` 中对「覆盖导入（`args.app_id`）」的权限校验块（仅管理员/owner 或原创建者可覆盖，否则 `Forbidden`）。
- 采用 main 的 `with Session(db.engine, expire_on_commit=False) as session:`（配合 `AppDslService` 内部提交行为）。

### 2.4 `api/controllers/console/app/conversation.py` + `api/fields/conversation_fields.py`

- conversation.py：移除旧 `flask_restx` 手工 `console_ns.model` 注册大块（约 273 行），采用 main 的 `register_schema_models(console_ns, ...)`（Pydantic 路径）。确认无旧模型变量残留引用、无未使用 import。
- conversation_fields.py（联动）：main 的 Pydantic 响应模型缺少软删除字段，为保留 HET 软删除功能的可见性，在 `Conversation`、`ConversationWithSummary`、`ConversationDetail` 三个模型补回 `is_deleted: bool = False`。

### 2.5 前端复制三组件（copy-feedback / copy-icon / input-with-copy）

- **UI**：采用 main 的 shadcn 风格 `Tooltip`（`@langgenius/dify-ui/tooltip`：`Tooltip` / `TooltipTrigger` / `TooltipContent`）及无障碍属性（`aria-label`、`aria-hidden`）。
- **复制逻辑（功能性，保留 custom）**：保留 `writeTextToClipboard` + 本地 `copied` state + `handleCopy` / `handleMouseLeave`，以支持 HET 的 HTTP（非安全上下文）部署。
- 清除 main 的 `useClipboard` 引入及其 `copy` / `reset` 残留；`input-with-copy` 的 `cn` 改用 `@langgenius/dify-ui/cn`；保留 custom 的 `data-testid` 钩子。

### 2.6 前端 `workflow-variable-block/component.tsx`

- union import：保留 `ErrorBoundary`（防止节点在 ReactFlow 外崩溃）与旧变量工具函数（`isConversationVar` / `isENV` / `isGlobalVar`，Fallback 使用），同时纳入 main 的 `isSpecialVar`（Inner 使用）。
- 移除未使用的旧 `Tooltip` import。已确认所有保留符号在正文均有引用。

### 2.7 前端两个 file-item.tsx

- 均为 main 侧 bug 修复性改动（新增 `useTranslation`、去掉 `type = ''` 默认值），按「bug 修复以 main 优先」原则直接采用 main。

### 2.8 Docker（.env.example / template / compose）

- **.env.example**：经与 merge-base 对比确认，上传限制变量（`UPLOAD_FILE_SIZE_LIMIT` 等）在基线与 HET 中**取值相同**，并非 HET 定制（main 已将其迁移到 `docker/envs/`），故不回填；唯一真正的 HET 定制 `NUMEXPR_MAX_THREADS=16`（基线无）已保留。
- **template**：`api` / `worker` / `worker_beat` / `web` 以及 main 新增的 `api_websocket` 服务均保留/改为本地构建镜像（`dify-api:1.14.2` / `dify-web:1.14.2`），官方 `langgenius/dify-*:1.14.2` 行以注释形式保留备查；同时纳入 main 的 `<<: *shared-*-config` 共享锚点与 `env_file` 编排。
- **compose**：main 改为「header 注释 + template」生成方式（不再有巨型 `x-shared-env` 锚点）。本文件按该方式由已解决的 template 重新生成，一次性消解 5 处冲突。已通过 `yaml.safe_load` 语法校验。

---

## 3. 校验与暂存

- 全部 14 个冲突文件经逐一扫描，**无残留冲突标记**（`<<<<<<<` / `=======` / `>>>>>>>`）。
- 后端 5 个文件、前端 6 个文件经 linter 检查无错误；docker 两个 YAML 通过语法校验。
- 已对 15 个相关文件执行 `git add` 暂存，`git diff --diff-filter=U` 已无未合并项。
- **未执行 commit，未执行 push**，合并提交由用户自行完成。

## 4. 后续建议（手工回归）

- 后端：验证 app 修改/删除/导入覆盖的权限隔离、会话软删除列表与 `is_deleted` 字段返回。
- 前端：在 HTTP 环境手测复制按钮（copy-feedback / copy-icon / input-with-copy）与工作流变量块粘贴。
- Docker：执行 `docker compose config` 验证最终编排，确认本地 build 流程正常。
