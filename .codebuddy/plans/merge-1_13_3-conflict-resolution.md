---
name: merge-1.13.3-conflict-resolution
overview: 解决 git merge tag 1.13.3 产生的 7 个文件冲突；保留 angelen 二开（InstalledApp.created_by 权限过滤、api/web/worker 本地构建、sandbox 依赖、外部 Milvus），并兼容上游 1.13.3（Pydantic query、双库迁移、compose 超时参数、前端 React Query 分页）
todos:
  - id: resolve-gitignore
    content: 解决 .gitignore：保留既有 api_bak/Benchmark/MCP，并合入 1.13.3 的 *.local.json / *.local.md / .qoder/*
    status: pending
  - id: resolve-installed-app
    content: 解决 installed_app.py：采用 1.13.3 的 InstalledAppsListQuery + current_account_with_tenant，并保留 add_angelen 的 created_by 角色过滤与响应字段
    status: pending
  - id: resolve-init-migration
    content: 解决 64b051264f32_init.py：采用 1.13.3 的 PG/非 PG 双分支建表，并在两套 installed_apps 定义中都保留 created_by
    status: pending
  - id: resolve-docker-compose-template
    content: 解决 docker-compose-template.yaml：api/web 保留本地 build，镜像标签升为 1.13.3
    status: pending
  - id: resolve-docker-compose
    content: 解决 docker-compose.yaml：api/worker/worker_beat/web 本地构建升到 1.13.3；postgres 合并 statement_timeout 与 15432 端口
    status: pending
  - id: resolve-python-requirements
    content: 解决 python-requirements.txt 删除冲突：git add 保留 pandas/numpy 等依赖
    status: pending
  - id: resolve-web-apps-list
    content: 解决 web/app/components/apps/list.tsx：整段采用 1.13.3 的 fetchNextPage / 动态 rootMargin 分页逻辑
    status: pending
  - id: verify-angelen-markers
    content: 核对已自动合并的 add_angelen 点：model.InstalledApp.created_by、app_service 非 admin 过滤、create_installed_app 事件写 created_by
    status: pending
  - id: verify-milvus-env
    content: 确认外部 Milvus 配置未回退：VECTOR_STORE=milvus、COMPOSE_PROFILES 为空、MILVUS_URI 指向外网地址
    status: pending
  - id: verify-and-commit
    content: git status 确认无未合并路径后，由用户确认再执行 merge commit（本 plan 不擅自 commit）
    status: pending
    dependencies:
      - resolve-gitignore
      - resolve-installed-app
      - resolve-init-migration
      - resolve-docker-compose-template
      - resolve-docker-compose
      - resolve-python-requirements
      - resolve-web-apps-list
      - verify-angelen-markers
      - verify-milvus-env
---

## 用户需求

当前已在 `custom/het-dev-181` 上执行 `Merge tag '1.13.3'`，需按本 plan 解决剩余冲突，保留二开能力并兼容上游 1.13.3。

本文件由原 `merge-1.9.2-conflict-resolution` plan **修订**而来，目标版本从 1.9.2 调整为 **1.13.3**。

## 冲突背景

- 当前分支：`custom/het-dev-181`
- 合并源：tag `1.13.3`（`MERGE_HEAD` = `59639ca9b2 chore: bump Dify to 1.13.3...`）
- 合并状态：进行中，仍有 **7 个未合并文件**
- 二开锚点：代码中 `# add_angelen` 注释
- 二开关键字段：`installed_apps.created_by`（不是 `createBy`；`App.created_by` 上游已有）
- 部署约定：
  - `api` / `web`（及本地 worker 系列）用本地构建镜像
  - 其余服务用在线镜像
  - 向量库用**外部 Milvus**（`COMPOSE_PROFILES=` 为空，不启本地 milvus profile）

## 与 1.9.2 plan 的差异

| 项 | 1.9.2 plan | 1.13.3 plan（本版） |
|----|------------|-------------------|
| 冲突数 | 6 | **7**（新增 migration + `list.tsx`） |
| `app_service.py` | 有 import 冲突 | **已自动合并**，仅需核对 |
| `installed_app.py` | SQLAlchemy 2.0 改写 | 再合入 **Pydantic Query**（`InstalledAppsListQuery`） |
| 迁移 | 无冲突 | **`64b051264f32_init.py` 必须保留 created_by** |
| compose 版本号 | 1.9.2 | **1.13.3**；worker/worker_beat 也本地构建 |
| 前端 | 无 | **`list.tsx` 以 1.13.3 React Query 为准** |
| Milvus | 未强调 | **明确校验外部 Milvus / 空 profiles 无冲突** |

## 冲突文件列表（7 个未解决）

1. `.gitignore` — 1 处
2. `api/controllers/console/explore/installed_app.py` — 1 处（核心业务）
3. `api/migrations/versions/64b051264f32_init.py` — 1 处（库表）
4. `docker/docker-compose-template.yaml` — 2 处（api/web 镜像）
5. `docker/docker-compose.yaml` — 5 处（api/worker/worker_beat/web + postgres）
6. `docker/volumes/sandbox/dependencies/python-requirements.txt` — 删除/修改冲突
7. `web/app/components/apps/list.tsx` — 1 处（分页 API）

### 已进入暂存、仍需核对（非 UU）

- `api/models/model.py` — `InstalledApp.created_by = ... # add_angelen` 应仍在
- `api/services/app_service.py` — 非 admin 过滤 `App.created_by == current_user.id # add_angelen` 应仍在
- `api/events/event_handlers/create_installed_app_when_app_created.py` — 创建时写入 `created_by`

## 解决方案概览

逐文件去掉冲突标记，**两边合理改动都保留**；Docker 本地构建标签升到 1.13.3；业务过滤逻辑以 angelen 为准、API 骨架以上游为准。

## 逐文件解决策略

### 1. `.gitignore`

冲突区：HEAD 为空，1.13.3 新增本地配置忽略。

保留文件前部已有内容（含 `api_bak`、Benchmark、MCP），冲突处采用 1.13.3：

```
# settings
*.local.json
*.local.md

# Code Agent Folder
.qoder/*
```

### 2. `api/controllers/console/explore/installed_app.py`（核心）

**策略**：以上游 1.13.3 为骨架，嵌入 `# add_angelen` 过滤与响应字段。

冲突块应合并为：

```python
def get(self):
    query = InstalledAppsListQuery.model_validate(request.args.to_dict())
    current_user, current_tenant_id = current_account_with_tenant()
    current_created_by = current_user.id  # add_angelen
    # 若后续过滤依赖 role，可在此或沿用下方 TenantService.get_user_role 赋值

    if query.app_id:
        installed_apps = db.session.scalars(
            select(InstalledApp).where(
                and_(InstalledApp.tenant_id == current_tenant_id, InstalledApp.app_id == query.app_id)
            )
        ).all()
    else:
        if current_user.role in {"owner", "admin"}:
            installed_apps = db.session.scalars(
                select(InstalledApp).where(InstalledApp.tenant_id == current_tenant_id)
            ).all()
        else:
            installed_apps = db.session.scalars(
                select(InstalledApp).where(
                    and_(
                        InstalledApp.tenant_id == current_tenant_id,
                        InstalledApp.created_by == current_created_by,
                    )
                )
            ).all()
```

响应列表保留：

```python
"created_by": installed_app.created_by,  # add_angelen
```

注意：

- 必须定义 `current_created_by`，否则 else 分支会 NameError
- 使用 `query.app_id`，不要退回旧的 `request.args.get("app_id")`
- 若 `current_user.role` 在过滤前尚未赋值，需在角色判断前调用 `TenantService.get_user_role`（与现有下方逻辑对齐，避免重复/覆盖错误）

### 3. `api/migrations/versions/64b051264f32_init.py`

**策略**：采用 1.13.3 的 `if _is_pg(conn): ... else: ...` 双分支，并在**两个** `installed_apps` 建表中加入：

```python
sa.Column('created_by', postgresql.UUID(), nullable=False),  # add_angelen  # PG 分支
# 非 PG 分支用对应 UUID 类型，同样 nullable=False
sa.Column('created_by', models.types.StringUUID(), nullable=False),  # add_angelen
```

说明：改 init 迁移主要影响新库；已有生产库若缺列，合并后需另补 `ALTER TABLE` migration（本 plan 解决冲突阶段先保证模型与 init 一致）。

### 4. `docker/docker-compose-template.yaml`

保留本地构建，版本升到 1.13.3：

```yaml
api:
  # 使用本地构建
  image: dify-api:1.13.3
  build:
    context: ../api
    dockerfile: Dockerfile

web:
  # 使用本地构建
  image: dify-web:1.13.3
  build:
    context: ../web
    dockerfile: Dockerfile
```

其余服务保持上游在线镜像。

### 5. `docker/docker-compose.yaml`

与 template 相同策略，且覆盖更多服务：

| 服务 | 策略 |
|------|------|
| `api` | 本地 `dify-api:1.13.3` + build |
| `worker` | 本地 `dify-api:1.13.3` + build（与近期二开一致） |
| `worker_beat` | 同上 |
| `web` | 本地 `dify-web:1.13.3` + build |
| 其他 | 用 1.13.3 在线镜像 |

`db_postgres` **两边都保留**：

```yaml
command: >
  postgres -c 'max_connections=...'
           ...
           -c 'statement_timeout=${POSTGRES_STATEMENT_TIMEOUT:-0}'
           -c 'idle_in_transaction_session_timeout=${POSTGRES_IDLE_IN_TRANSACTION_SESSION_TIMEOUT:-0}'

ports:
  - "15432:5432"
```

### 6. `docker/volumes/sandbox/dependencies/python-requirements.txt`

上游为空/删除，HEAD 含：

```
pandas
numpy
openpyxl
matplotlib
seaborn
```

保留 HEAD，执行 `git add` 标记解决。

### 7. `web/app/components/apps/list.tsx`

**策略：整段采用 1.13.3**（非二开逻辑）。

原因：分页已从 `setSize` 迁移到 `fetchNextPage` / `isFetchingNextPage` / 动态 `rootMargin`；保留 HEAD 会与周围 hooks 不兼容。

## 外部 Milvus（无冲突，合并后校验）

预期 `.env` 保持：

- `VECTOR_STORE=milvus`
- `MILVUS_URI` 指向外部（如 `http://10.16.25.205:19530`）
- `COMPOSE_PROFILES=` 为空（注释说明「使用外部 Milvus」）

结论：compose 内 milvus 服务有 `profiles: [milvus]`，空 profiles 不会启动本地容器，**与外部 Milvus 无端口/数据冲突**。合并时不要把 `COMPOSE_PROFILES` 改回 `${VECTOR_STORE:-weaviate}`。

## 操作步骤

1. 按上表逐文件编辑，删除 `<<<<<<<` / `=======` / `>>>>>>>` 标记
2. `git add` 每个已解决文件（含 sandbox requirements）
3. `rg '^(<<<<<<<|=======|>>>>>>>)'` 全库确认无残留标记
4. `rg 'add_angelen'` 核对二开锚点仍在
5. 检查 `docker/.env` 的 Milvus / `COMPOSE_PROFILES`
6. `git status` 确认「所有冲突已解决」
7. **经用户明确同意后**再 `git commit` 完成 merge（本 plan 默认不自动提交）

## 验收清单

- [ ] 无未合并路径（`git diff --name-only --diff-filter=U` 为空）
- [ ] `InstalledApp.created_by` 模型 + init 迁移（PG/非 PG）均存在
- [ ] installed-apps 列表：非 admin 仅见自己创建；响应含 `created_by`
- [ ] `app_service` 非 admin 应用列表过滤仍在
- [ ] api/web/worker/worker_beat 为本地 build 且标签 1.13.3
- [ ] postgres 同时有 timeout 参数与 `15432:5432`
- [ ] sandbox python-requirements 保留
- [ ] apps `list.tsx` 使用 `fetchNextPage`
- [ ] 外部 Milvus 配置未回退
