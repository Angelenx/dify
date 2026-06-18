# HET 二次开发记录及未来计划

**文档版本**：2026-06-11  
**维护分支**：`custom/het-dev-260117`  
**上游基准**：Dify 开源仓库 `main`（共同祖先 `20e91990bf`）  
**远程跟踪**：`gitlab-het/custom/het-dev-260117`

---

## 1. 背景与目标

本项目基于 [Dify](https://github.com/langgenius/dify) 开源平台进行二次开发，面向 HET 团队自托管部署与内部使用场景。二次开发不以 fork 上游全量功能为目标，而是在官方能力之上叠加：

- **运维本地化**：国内网络环境、本地 Docker 构建、Weaviate 数据备份与迁移
- **权限收紧**：工作区内 App 的修改/删除/覆盖导入仅限管理员或创建者
- **业务增强**：会话软删除（保留审计）、文件上传上限调整、Sandbox Excel 支持等
- **生产问题修复**：非 HTTPS 环境下剪贴板复制、工作流变量块崩溃隔离等

分支命名 `het-dev-260117` 表示 2026-01-17 前后启动的定制开发线；详细逐提交记录见 [`het-dev-260117-changelog.md`](./het-dev-260117-changelog.md)。

---

## 2. 项目结构速览

```
dify/
├── api/                 # 后端：Flask + DDD（controller → service → core）
├── web/                 # 前端：Next.js + TypeScript + React
├── docker/              # Docker Compose 全栈 / 中间件部署
├── docs/                # 官方多语言文档
├── sdks/                # 各语言 SDK
├── scripts/             # 辅助脚本
├── dev/                 # 实验性脚本（不进入生产构建）
├── migrate_weaviate_collections.py   # 【定制】Weaviate 集合迁移
├── docker/docker_fast_tool.sh      # 【定制】一键 build / 重部署
├── het-dev-260117-changelog.md     # 【定制】分支提交明细
└── AGENT_MERGE_RESULT.md           # 【定制】与 main 合并冲突分析
```

### 2.1 后端 `api/` 关键目录

| 目录 | 说明 |
|------|------|
| `controllers/console/app/` | 控制台 App / 会话 / 工作流 API（定制改动集中区） |
| `controllers/web/` | 终端用户 Web API（含会话软删除） |
| `services/` | 业务服务层（`conversation_service`、`app_dsl_service` 等） |
| `models/` | ORM 模型（`Conversation.is_deleted` 等） |
| `tasks/` | Celery 异步任务 |

CLI 约定：`uv run --project api <command>`。

### 2.2 前端 `web/` 关键目录

| 目录 | 说明 |
|------|------|
| `app/components/base/` | 基础 UI（复制、文件上传等定制组件） |
| `app/components/base/prompt-editor/plugins/workflow-variable-block/` | 工作流变量块（ErrorBoundary） |
| `service/` | API 调用层 |
| `i18n/` | 国际化（新增用户可见文案须走 `i18n/en-US/`） |

### 2.3 Docker 部署 `docker/`

| 资源 | 说明 |
|------|------|
| `docker-compose.yaml` | 生产全栈编排 |
| `docker-compose.middleware.yaml` | 开发用中间件（DB + Weaviate） |
| `.env` / `.env.example` | 环境变量（部署前 `cp .env.example .env`） |
| `dify-env-sync.sh` | 升级时同步新增环境变量 |
| `docker_fast_tool.sh` | **定制**：`-b` 构建、`-r` 重部署、`-l` 跟日志 |

**定制镜像策略**：不使用官方云端镜像直接启动，而是本地 build 后打标签：

- `dify-api:1.13.0`（api / worker / worker_beat）
- `dify-web:1.13.0`

官方 `langgenius/dify-*` 行在 compose 中保留为注释，便于对照版本。

---

## 3. 二次开发记录（按领域）

### 3.1 基础设施与 Docker（2026-01-17 ~ 2026-05-20）

| 日期 | 提交 | 内容 |
|------|------|------|
| 01-17 | `14cef88d5e` | Weaviate 备份兼容：`.gitignore` 与 compose 编排 |
| 01-13 | `52f9174ca3` | 一体化大改：Weaviate 迁移脚本与备份卷、Sandbox 放宽 syscall、上传上限 88、调试日志、`NUMEXPR_MAX_THREADS` |
| 01-20 | `2440c68831` | 规范化 Weaviate 备份启用方案 |
| 01-19 | `7f6ecee630` | Web Dockerfile 使用国内 npm 镜像 |
| 02-04 | `372aa842e9` | 新增 `docker_fast_tool.sh` 部署辅助脚本 |
| 02-04 | `3b6faf6410` | 修复 compose 重复 build |
| 02-04 | `1f20aeadd5` | build 输出增加 `--progress=plain` |
| 02-26 | `2ab2cfb242` | 简化 Docker build 命令 |
| 05-20 | `22db3c2377` | SSRF 代理（squid）允许访问本地网络 |

**涉及文件（代表性）**：

- `docker/docker-compose.yaml`、`docker-compose-template.yaml`
- `docker/volumes/sandbox/conf/config.yaml`
- `docker/volumes/sandbox/dependencies/python-requirements.txt`
- `docker/ssrf_proxy/squid.conf.template`
- `migrate_weaviate_collections.py`（新增，423 行）
- `web/Dockerfile`

### 3.2 App 权限隔离（2026-02-04）

| 提交 | `e2fe486883` |
|------|----------------|
| 目标 | 禁止非管理员修改/删除他人创建的 App；覆盖导入时校验创建者身份 |

**实现要点**：

1. **装饰器** `edit_app_permission_required`（`api/controllers/console/app/wraps.py`）  
   - 允许：工作区 admin/owner，或 App 的 `created_by`  
   - 拒绝：其他 editor 角色 → `403 Forbidden`

2. **挂载端点**（`app.py`、`workflow.py` 等）：`PUT`/`DELETE` 及工作流发布类操作

3. **导入校验**（`app_import.py`）：`app_id` 覆盖导入时，非 admin/owner 且非原创建者则拒绝

### 3.3 会话软删除（2026-02-05）

| 提交 | `6d0cdc7edd` |
|------|----------------|
| 目标 | 用户侧「删除」会话不物理抹除，便于管理员审计与恢复查阅 |

**实现要点**：

1. `ConversationService.soft_delete()`：将 `is_deleted` 置为 `True`
2. **Web 端**（`controllers/web/conversation.py`）：用户删除走软删
3. **Console 端**（`controllers/console/app/conversation.py`）：列表**包含**已软删会话（注释：*Console queries include soft-deleted conversations so admins can view all logs*）
4. 普通查询路径仍过滤 `is_deleted == False`（`conversation_service.py`）

### 3.4 前端功能与修复

| 日期 | 提交 | 内容 |
|------|------|------|
| 01-19 | `421eff1d3f` | 工作流文件数量上限调整（更合理方式） |
| 02-06 | `7448ad4922` | 简化聊天组件文件处理（后经 revert 链部分回退，最终 `2962d6b177` 保留部分改动） |
| 02-26 | `2ab2cfb242` | `WorkflowVariableBlockComponent` 增加 `ErrorBoundary`，防止 ReactFlow 外崩溃 |
| 03-03 | `7bbcca1103` | 非安全上下文（非 HTTPS）剪贴板复制：自定义 `writeTextToClipboard` 替代 `useClipboard` |
| 03-06 | `4d01fff00e` | Sandbox 增加 openpyxl / xlsxwriter / xlwt |
| 04-17 | `5697ea8a43` | Sandbox 增加 xlrd（Excel 读取增强） |

**涉及组件**：`copy-feedback`、`copy-icon`、`input-with-copy`、`file-uploader/*`、`workflow-variable-block/component.tsx`

### 3.5 其他

| 日期 | 提交 | 内容 |
|------|------|------|
| 01-20 | `c8f73f6b8d` | 修复 Swagger UI 页面无法访问 |
| 03-06 ~ 03-13 | `9e2fc4e2d0` / `62c1d7b64e` | Python 类型提示规范更新后 revert（与上游工具链未对齐，暂回退） |
| 05-20 | `25f1f2c448` | `.gitignore` 增加 `tmp/` 目录 |

---

## 4. 分支与上游差异现状

> 统计时间：2026-06-11

| 指标 | 值 |
|------|-----|
| 定制分支 tip | `25f1f2c448` |
| 本地 `main` tip | `5cdf4e405b` |
| 共同祖先 | `20e91990bf`（orjson 依赖升级） |
| 领先 `main` | 38 提交（22 个非 merge，作者均为 Angelenx） |
| 落后 `main` | **1331** 提交 |
| 差异文件数 | 36 个（约 +4998 / -71 行） |
| 工作区 | 干净，**无进行中的 merge** |

### 4.1 与 `main` 合并时的已知冲突点

详见 [`AGENT_MERGE_RESULT.md`](./AGENT_MERGE_RESULT.md)。摘要如下：

| 文件 | 冲突原因 | 拟定策略 |
|------|----------|----------|
| `conversation.py` | 上游 `register_schema_models` vs 本分支软删除 + 旧 Swagger 模型 | 采用上游响应模型框架，**保留软删除业务逻辑** |
| `app_import.py` | 上游 `Session(..., expire_on_commit=False)` vs 本分支权限校验 | **二者并存**：先校验权限，再使用上游 Session 参数 |
| `docker-compose*.yaml` | 上游官方镜像 1.13.3 vs 本分支本地 build 1.13.0 | **仅对齐 image 版本号**，保留 `build` 段与定制卷 |
| 复制三组件 | 上游 `useClipboard` + 设计系统 vs 本分支 `writeTextToClipboard` | 功能性保留本分支；若上游已修复同等 bug 可收敛 |
| `workflow-variable-block` | 上游 Tooltip/`isSpecialVar` 重构 vs 本分支 ErrorBoundary | 以上游为底，**增量加回 ErrorBoundary** |

### 4.2 合并原则（团队约定）

1. **功能性改动**（权限隔离、软删除、Weaviate 备份、本地 build 策略等）→ **保留 `custom/het-dev-260117` 逻辑**
2. **Bug 修复性改动**（上游已修复的同类问题）→ **优先采用 `main`**
3. Docker：不切换为云端官方镜像启动，本地 build；compose 其余编排跟随上游

---

## 5. 当前进度总结

### 已完成

- [x] 权限隔离装饰器与导入校验落地
- [x] 会话软删除（Web 删 / Console 可查）
- [x] Docker 本地化构建链路与 `docker_fast_tool.sh`
- [x] Weaviate 备份、迁移脚本与卷映射
- [x] 文件上传上限、Sandbox 依赖、SSRF 本地网络
- [x] 剪贴板非安全上下文修复、工作流变量块 ErrorBoundary
- [x] 分支提交明细文档 `het-dev-260117-changelog.md`
- [x] 与 `main` 合并冲突预分析 `AGENT_MERGE_RESULT.md`

### 未完成 / 进行中

- [ ] **与上游 `main` 的大规模合并**（落后 1331 提交，合并尚未执行）
- [ ] 合并后 `conversation.py` 响应模型迁移至 `register_schema_models` 并回归软删除行为
- [ ] 合并后全链路手工 / 自动化回归（权限、软删除、复制、文件上传、Docker 部署）
- [ ] 镜像版本与上游 release 的持续对齐机制（当前钉在 1.13.0，上游已到更新版本）

---

## 6. 未来计划

### 6.1 近期（P0）：完成与 `main` 合并

**目标**：将 `custom/het-dev-260117` 追上当前 `main`，在解决冲突时严格遵循第四节合并原则。

| 步骤 | 动作 | 验收标准 |
|------|------|----------|
| 1 | `git merge main`（或 rebase，团队择一） | 识别并解决 7 类冲突文件 |
| 2 | `conversation.py` | 软删除列表/过滤行为与合并前一致；响应走 Pydantic |
| 3 | `app_import.py` | 覆盖导入权限 + `expire_on_commit=False` |
| 4 | `docker-compose*.yaml` | 版本号对齐上游，保留本地 `build` |
| 5 | 前端冲突文件 | UI 跟随上游，功能性补丁按需保留 |
| 6 | `docker compose config` | YAML 校验通过 |
| 7 | 关键路径回归 | 见 6.3 测试清单 |

**产出**：更新 `AGENT_MERGE_RESULT.md` 记录实际操作与决策；合并 commit 经 review 后推送 `gitlab-het`。

### 6.2 中期（P1）：质量与可维护性

| 事项 | 说明 |
|------|------|
| 削减前端分叉 | 评估 `writeTextToClipboard` 是否仍必要；若上游 `useClipboard` 已覆盖非安全上下文，revert 自定义实现 |
| 类型检查规范 | 重新评估 `9e2fc4e2d0` 类工具链改动，与上游 `make type-check` 对齐后择机引入 |
| 权限模型文档化 | 在团队内部 wiki 说明 `edit_app_permission_required` 与角色矩阵 |
| Weaviate 运维手册 | 备份恢复、迁移脚本使用场景与回滚步骤 |

### 6.3 中期（P1）：测试与回归清单

合并或发版前至少覆盖：

**后端**

- [ ] 非创建者 editor 修改他人 App → 403
- [ ] 非创建者覆盖导入他人 App → 403
- [ ] admin/owner 可修改任意 App
- [ ] Web 用户删除会话 → `is_deleted=True`，数据仍在库
- [ ] Console 会话列表可见已软删记录

**前端**

- [ ] HTTP（非 HTTPS）环境下复制按钮可用
- [ ] 工作流编辑器变量块拖拽/粘贴不白屏
- [ ] 工作流发布文件上传（大文件 / 多文件边界）

**Docker**

- [ ] `./docker_fast_tool.sh -b -r` 全流程
- [ ] Weaviate 备份卷写入与 `migrate_weaviate_collections.py` 干跑
- [ ] Sandbox Excel 相关工具调用

### 6.4 长期（P2）：演进方向

| 方向 | 描述 |
|------|------|
| 上游贡献回流 | 将通用修复（如 ErrorBoundary、剪贴板）整理为上游 PR，减少长期分叉 |
| CI 流水线 | 在 `gitlab-het` 增加 build + lint + 核心 API 测试，合并 main 后自动触发 |
| 版本标签策略 | 定制镜像采用 `dify-api:het-<date>` 或 `het-<upstream-version>` 语义化标签 |
| 配置外置 | 将 HET 特有环境变量（上传上限、SSRF 策略等）收敛到 `.env` 文档与模板，减少代码硬编码 |
| 多环境 compose | 视需要拆分 `docker-compose.het.yaml` overlay，与上游 `docker-compose.yaml` 解耦 |

---

## 7. 相关文档索引

| 文档 | 用途 |
|------|------|
| [`README.md`](./README.md) | Dify 官方项目介绍与快速启动 |
| [`docker/README.md`](./docker/README.md) | Docker Compose 部署说明 |
| [`AGENTS.md`](./AGENTS.md) | 仓库级开发约定 |
| [`api/AGENTS.md`](./api/AGENTS.md) | 后端开发规范 |
| [`web/AGENTS.md`](./web/AGENTS.md) | 前端开发规范 |
| [`het-dev-260117-changelog.md`](./het-dev-260117-changelog.md) | 分支逐提交明细（3944 行） |
| [`AGENT_MERGE_RESULT.md`](./AGENT_MERGE_RESULT.md) | 与 `main` 合并冲突分析与操作策略 |

---

## 8. 修订记录

| 日期 | 说明 |
|------|------|
| 2026-06-11 | 初版：基于仓库探索、`git log` 与 `AGENT_MERGE_RESULT.md` 整理二次开发记录与未来计划 |
