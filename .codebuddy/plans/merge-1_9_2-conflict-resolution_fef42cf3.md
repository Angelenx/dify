---
name: merge-1.9.2-conflict-resolution
overview: 解决 git merge 1.9.2 产生的 6 个文件冲突，保留 angelenx 的自定义改动（本地构建、created_by 权限过滤）并兼容 1.9.2 上游变更（SQLAlchemy 2.0 语法、新版镜像等）
todos:
  - id: resolve-gitignore
    content: 解决 .gitignore 冲突：合并双方忽略规则（api_bak + Benchmark + MCP 目录）
    status: completed
  - id: resolve-installed-app
    content: 解决 installed_app.py 核心冲突：使用 SQLAlchemy 2.0 语法重写角色权限过滤逻辑，兼容 current_account_with_tenant()
    status: completed
  - id: resolve-app-service
    content: 解决 app_service.py 冲突：保留 TenantService 和 BillingService 两个 import
    status: completed
  - id: resolve-docker-compose-template
    content: 解决 docker-compose-template.yaml 冲突：本地构建方式 + 版本号更新为 1.9.2
    status: completed
  - id: resolve-docker-compose
    content: 解决 docker-compose.yaml 冲突：本地构建 + 版本更新 + postgres 配置合并（超时参数 + 端口映射）
    status: completed
  - id: resolve-python-requirements
    content: 解决 python-requirements.txt 删除冲突：git add 保留文件
    status: completed
  - id: verify-and-commit
    content: git status 验证所有冲突已解决，完成 merge commit
    status: completed
    dependencies:
      - resolve-gitignore
      - resolve-installed-app
      - resolve-app-service
      - resolve-docker-compose-template
      - resolve-docker-compose
      - resolve-python-requirements
---

## 用户需求

解决当前 `git merge 1.9.2`（tag）产生的 6 个冲突文件。在保留 angelenx 自定义功能的前提下，兼容上游 1.9.2 的 SQLAlchemy 2.0 迁移、版本号更新等变更。

## 冲突背景

- 当前分支：`custom/het-dev-181`
- 合并源：tag `1.9.2`
- angelenx 自定义提交共 2 个：
- `724f19490a` — docker: 使用本地构建方式 (dify-api:1.8.1, dify-web:1.8.1)
- `3d7c86d8e6` — feat: InstalledApp 模型添加 created_by 字段，支持 owner/admin 角色权限过滤

## 冲突文件列表（6 个）

1. `.gitignore` — 1 处冲突
2. `api/controllers/console/explore/installed_app.py` — 2 处冲突（核心）
3. `api/services/app_service.py` — 1 处冲突
4. `docker/docker-compose-template.yaml` — 2 处冲突
5. `docker/docker-compose.yaml` — 3 处冲突
6. `docker/volumes/sandbox/dependencies/python-requirements.txt` — 删除冲突

## 解决方案概览

逐个文件编辑解决 git merge 冲突标记，每个文件保留双方合理改动，然后 `git add` 标记已解决。

## 逐文件解决策略

### 1. `.gitignore`

- 合并双方添加的忽略规则：保留 HEAD 的 `api_bak` + 保留 1.9.2 的 Benchmark 目录和 MCP 目录
- 最终添加内容：

```
# custom
api_bak

# Benchmark
scripts/stress-test/setup/config/
scripts/stress-test/reports/

# mcp
.playwright-mcp/
.serena/
```

### 2. `api/controllers/console/explore/installed_app.py`（核心冲突）

**策略**：以 1.9.2 的架构为基础，融入 angelenx 的角色权限过滤逻辑。

**第一处冲突 (L31-38)**：采用 1.9.2 的 `current_account_with_tenant()` 方式获取用户和租户，但额外保存 `current_user.id` 供后续过滤使用：

```python
current_user, current_tenant_id = current_account_with_tenant()
current_created_by = current_user.id  # add_angelen
```

**第二处冲突 (L46-63)**：采用 1.9.2 的 SQLAlchemy 2.0 `db.session.scalars(select())` 语法，同时将 angelenx 的角色过滤逻辑用 2.0 语法重写。保留 1.9.2 的 `is None` 检查和延后角色赋值：

```python
if current_user.role in {"owner", "admin"}:
    installed_apps = db.session.scalars(
        select(InstalledApp).where(InstalledApp.tenant_id == current_tenant_id)
    ).all()
else:
    installed_apps = db.session.scalars(
        select(InstalledApp).where(
            and_(InstalledApp.tenant_id == current_tenant_id, InstalledApp.created_by == current_created_by)
        )
    ).all()
```

注意需要移除 HEAD 中提前的角色赋值 `current_user.role = ...`（L34），因为 1.9.2 已经延后到 L62 处理。

### 3. `api/services/app_service.py`

两个 import 均需保留：

```python
from services.account_service import TenantService  # add_angelen
from services.billing_service import BillingService
```

### 4. `docker/docker-compose-template.yaml`

保留本地构建方式，版本号更新为 1.9.2：

- api 服务：`image: dify-api:1.9.2` + `build: {context: ../api, dockerfile: Dockerfile}`
- web 服务：`image: dify-web:1.9.2` + `build: {context: ../web, dockerfile: Dockerfile}`

### 5. `docker/docker-compose.yaml`

- api/web 镜像配置同 template（本地构建 + 版本号 1.9.2）
- postgres 配置合并：先保留 1.9.2 的 `statement_timeout` 和 `idle_in_transaction_session_timeout` 参数行（作为 command 的续行），然后紧接 HEAD 的 `ports` 端口映射

postgres command 最终结构：

```
command: >
  postgres -c ...
           -c 'statement_timeout=${POSTGRES_STATEMENT_TIMEOUT:-0}'
           -c 'idle_in_transaction_session_timeout=${POSTGRES_IDLE_IN_TRANSACTION_SESSION_TIMEOUT:-0}'

    ports:
      - "15432:5432"
```

### 6. `docker/volumes/sandbox/dependencies/python-requirements.txt`

1.9.2 删除了此文件，需保留。执行 `git add` 即可保留 HEAD 版本。

## 操作步骤

1. 编辑各冲突文件，移除冲突标记并写入正确内容
2. 执行 `git add <file>` 标记每个文件已解决
3. 执行 `git status` 确认所有冲突已解决
4. 执行 `git commit` 完成合并