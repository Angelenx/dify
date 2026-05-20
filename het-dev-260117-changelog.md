# custom/het-dev-260117 分支提交详细记录

**生成时间**：2026-04-17（由本地 `git` 仓库导出；同日根据 `git show`/`--stat` 审阅补充各提交中文摘要，无 diff 正文）

## 报告范围说明

本文件列出的是：在**当前本地引用**下，从 `origin/main` 与 `custom/het-dev-260117` 的**共同祖先**起，到分支当前 tip 为止，**仅存在于该定制分支一侧**的提交（即 `git log origin/main..custom/het-dev-260117`）。

| 项目 | 值 |
|------|-----|
| 分支 tip | `5697ea8a43` — chore(deps): add xlrd to Python requirements for enhanced Excel support |
| 对比基准 | `origin/main`（本地所指向的提交） |
| 共同祖先（merge-base） | `20e91990bf` — chore(deps): bump orjson from 3.11.4 to 3.11.6 in /api (#33380) |
| 提交总数 | 36（其中 **merge 提交** 16，**非 merge 提交** 20） |
| 非 merge 提交作者 | 均为 Angelenx，邮箱 `lujinquan2@foxmail.com`（`git shortlog --no-merges` 统计） |

## 阅读说明

- **中文摘要（变更要点）**：位于每条提交的元数据表之后，依据 `git show --stat` 与必要时的差异浏览归纳而成，**不含完整 diff**，便于快速理解动机与影响面；合并类提交仅概括合并方向，细节需结合被并入的上游提交。
- **变更文件**列使用 `git diff-tree --name-status`：前缀 **M** 修改、**A** 新增、**D** 删除、**R** 重命名（可能带相似度）等。
- **Merge 提交**通常不展开与某一父提交的差异，故部分合并节点的「变更文件」为空，属正常现象；其实际引入的变更已包含在子提交或另一父分支历史中。
- **父提交**：单列格内为 `git rev-parse <commit>^@` 输出；合并提交会有**两个**哈希（第一父提交为当前分支线，第二父提交为被合并进来的分支 tip）。
- 若你之后执行了 `git fetch`，`origin/main` 会前移，本报告中的「相对 main 多出的提交」集合可能随之变化；重新生成报告即可。

---

## 提交明细（按时间正序，由旧到新）


---
### 14cef88d5e weaviate备份兼容

| 字段 | 值 |
|------|----|
| **完整哈希** | `14cef88d5ea5e519961983ec5159c9219bb0012f` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-01-17 14:34:52 +0800 |
| **父提交** | fad6fa141d0b0fca09075bdd420a21564f4eb3a9  |

**中文摘要（变更要点）**：在 `.gitignore` 与 `docker-compose` 中补充与 Weaviate 备份相关的忽略规则与编排，使备份能力与现有栈兼容。

**提交说明（body）**：

**变更文件**：
M	.gitignore
M	docker/docker-compose.yaml


---
### 52f9174ca3 feat: update file upload limits and enhance debugging information - web:增加文件上传限制至 88 - web:在文件上传和处理过程中添加调试信息，同时启用调试模式 - web:修复工作流发布前端无法上传文件的bug - env:更新 Docker 配置以支持新的环境变量NUMEXPR_MAX_THREADS - git:修改 .gitignore 以排除自定义备份文件 - docker:修改了sandbox配置，允许所有syscall - 增加weaviate迁移脚本，启用weaviate备份模块，增加卷映射。

| 字段 | 值 |
|------|----|
| **完整哈希** | `52f9174ca3cb072f6505a0cd5a7f7a25c7066d72` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-01-17 17:01:08 +0800 |
| **父提交** | 14cef88d5ea5e519961983ec5159c9219bb0012f  |

**中文摘要（变更要点）**：一体化改动：新增 `migrate_weaviate_collections.py`、Compose 中启用备份卷与映射；Sandbox 放宽 syscall、补充 Python 依赖；Web 侧提高上传上限、加强上传/调试日志并调整 `next.config`；`docker/.env.example` 增加如 `NUMEXPR_MAX_THREADS` 等环境说明。

**提交说明（body）**：

**变更文件**：
M	docker/.env.example
M	docker/docker-compose-template.yaml
M	docker/docker-compose.yaml
M	docker/volumes/sandbox/conf/config.yaml
A	docker/volumes/sandbox/dependencies/python-requirements.txt
A	migrate_weaviate_collections.py
M	web/Dockerfile
M	web/app/components/base/file-uploader/constants.ts
M	web/app/components/base/file-uploader/file-input.tsx
M	web/app/components/base/file-uploader/hooks.ts
M	web/app/components/base/file-uploader/utils.ts
M	web/app/components/workflow/nodes/_base/components/file-upload-setting.tsx
M	web/next.config.js
M	web/service/base.ts


---
### 421eff1d3f 以更合理的方式修改工作流文件上限。

| 字段 | 值 |
|------|----|
| **完整哈希** | `421eff1d3f81974b2d6e5f23ed1283fc081eebf0` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-01-19 10:58:22 +0800 |
| **父提交** | 52f9174ca3cb072f6505a0cd5a7f7a25c7066d72  |

**中文摘要（变更要点）**：仅调整工作流节点里「文件上传」相关上限配置，使限制更合理。

**提交说明（body）**：

**变更文件**：
M	web/app/components/workflow/nodes/_base/components/file-upload-setting.tsx


---
### 7f6ecee630 changed web build npm mirror for being located in China

| 字段 | 值 |
|------|----|
| **完整哈希** | `7f6ecee630d69a29f34fccb8016113c2ac1cd8dc` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-01-19 17:03:32 +0800 |
| **父提交** | 421eff1d3f81974b2d6e5f23ed1283fc081eebf0  |

**中文摘要（变更要点）**：`web/Dockerfile` 构建阶段改用适合国内网络的 npm 镜像源。

**提交说明（body）**：

**变更文件**：
M	web/Dockerfile


---
### c8f73f6b8d fix: swaggerui page cannot visit

| 字段 | 值 |
|------|----|
| **完整哈希** | `c8f73f6b8d9fca6e0478f4f042341f981adfdc56` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-01-20 10:33:08 +0800 |
| **父提交** | 7f6ecee630d69a29f34fccb8016113c2ac1cd8dc  |

**中文摘要（变更要点）**：在 Nginx 模板中增加与 Swagger UI 静态资源/路由相关的配置，修复控制台 Swagger 页面无法打开的问题。

**提交说明（body）**：

**变更文件**：
M	docker/nginx/conf.d/default.conf.template


---
### 2440c68831 规范化weaviate备份启用方案

| 字段 | 值 |
|------|----|
| **完整哈希** | `2440c6883152839f108adc19d624ce1c0c51801b` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-01-20 14:30:43 +0800 |
| **父提交** | c8f73f6b8d9fca6e0478f4f042341f981adfdc56  |

**中文摘要（变更要点）**：整理 Weaviate 备份启用方式：收紧或删除冗余的 `.gitignore` 规则，并在 Compose 模板中规范备份相关片段。

**提交说明（body）**：

**变更文件**：
M	.gitignore
M	docker/docker-compose-template.yaml
M	docker/docker-compose.yaml


---
### 23bfdb966a Merge remote-tracking branch 'origin/main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `23bfdb966ad0bfc6bcb2945e456ba7104fd1c749` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-01-29 09:57:42 +0800 |
| **父提交** | 2440c6883152839f108adc19d624ce1c0c51801b 24ebe2f5c6f31c5be430531ca1a02f83af35c51e  |

**中文摘要（变更要点）**：合并 `origin/main`：同步上游在 Agent 技能、Claude/Codex 配置、CI、API 控制器与核心库等的大量更新（本节点为合并提交，具体功能以被并入的上游提交为准）。

**提交说明（body）**：

**变更文件**：


---
### e2fe486883 feat(app): implement permission checks for app modifications and enhance app import logic to prevent deleting/editing app by others.

| 字段 | 值 |
|------|----|
| **完整哈希** | `e2fe486883fa51dcace85a877059f5ed3c9350e0` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-04 10:57:04 +0800 |
| **父提交** | 23bfdb966ad0bfc6bcb2945e456ba7104fd1c749  |

**中文摘要（变更要点）**：为应用与数据集增加「非所有者/非管理员不可删改」等权限校验；DSL 导入在指定 `app_id` 覆盖时校验创建者；扩展 `wraps`、`AppDslService` 与相关 API；并更新 Docker Compose 以匹配当前部署需求。

**提交说明（body）**：

**变更文件**：
M	api/controllers/console/app/app.py
M	api/controllers/console/app/app_import.py
M	api/controllers/console/app/workflow.py
M	api/controllers/console/app/wraps.py
M	api/controllers/console/datasets/datasets.py
M	api/services/app_dsl_service.py
M	docker/docker-compose-template.yaml
M	docker/docker-compose.yaml


---
### b04e14fb63 Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `b04e14fb63c6bac68553f597d407289ee0c7b621` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-04 13:28:57 +0800 |
| **父提交** | e2fe486883fa51dcace85a877059f5ed3c9350e0 05f2764d7c46f39b4ea311df648c1d98933fb7f4  |

**中文摘要（变更要点）**：合并 `main`：带入上游对数据集文档、远程文件、标注、工作区工具提供商、RAG 索引与插件等多处后端与 Web 改动。

**提交说明（body）**：

**变更文件**：


---
### 372aa842e9 feat: added a useful script for deploying with docker.

| 字段 | 值 |
|------|----|
| **完整哈希** | `372aa842e9d8abbd7a6f76be92ce7abda6a886f1` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-04 15:24:30 +0800 |
| **父提交** | b04e14fb63c6bac68553f597d407289ee0c7b621  |

**中文摘要（变更要点）**：新增 `docker/docker_fast_tool.sh`，封装常用的本地 Docker 构建/辅助命令。

**提交说明（body）**：

**变更文件**：
A	docker/docker_fast_tool.sh


---
### 47961bb26a Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `47961bb26a775254a2f7246d36eb7306e37f6b12` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-04 15:56:59 +0800 |
| **父提交** | 372aa842e9d8abbd7a6f76be92ce7abda6a886f1 468990cc3953743f3a72d4af76b1f7760805854d  |

**中文摘要（变更要点）**：合并 `main`：主要包含插件详情 Header 重构（拆组件与 hooks）、订阅创建/OAuth 流程大改、`web/service/client` 与 i18n 调整，以及 `explore/trial` 等少量后端变更。

**提交说明（body）**：

**变更文件**：


---
### 30e68dbc5d Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `30e68dbc5d962c9fc6c2661fcfd05fd558257c92` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-04 16:28:25 +0800 |
| **父提交** | 47961bb26a775254a2f7246d36eb7306e37f6b12 0d74ac634b541e4b0adcefdd03a4d0f2c7b23f6a  |

**中文摘要（变更要点）**：合并 `main`：变更面极小（如 `explore/trial` 一行级修复），属跟进上游补丁。

**提交说明（body）**：

**变更文件**：


---
### 3b6faf6410 chore(docker): Fix duplicate builds.

| 字段 | 值 |
|------|----|
| **完整哈希** | `3b6faf64101a4f602fcdf2219c2abaec0c838992` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-04 17:25:12 +0800 |
| **父提交** | 30e68dbc5d962c9fc6c2661fcfd05fd558257c92  |

**中文摘要（变更要点）**：修正 Docker Compose 中导致 API/Web 等服务被重复 `build` 的配置，避免无谓的重复构建。

**提交说明（body）**：

**变更文件**：
M	docker/docker-compose-template.yaml
M	docker/docker-compose.yaml


---
### 1f20aeadd5 chore(docker): Update docker_fast_tool.sh to include --progress=plain for build output

| 字段 | 值 |
|------|----|
| **完整哈希** | `1f20aeadd5b18d41b8d33e3e4a0fcd5f815c7421` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-04 17:34:13 +0800 |
| **父提交** | 3b6faf64101a4f602fcdf2219c2abaec0c838992  |

**中文摘要（变更要点）**：在 `docker_fast_tool.sh` 的构建命令中加入 `--progress=plain`，便于在终端查看完整构建输出。

**提交说明（body）**：

**变更文件**：
M	docker/docker_fast_tool.sh


---
### c89f3c3434 Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `c89f3c343452db0663df355c0388d6069c1ff1d0` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-04 17:47:13 +0800 |
| **父提交** | 1f20aeadd5b18d41b8d33e3e4a0fcd5f815c7421 74b027c41af3c26e1bbe6883f549b774b1706e05  |

**中文摘要（变更要点）**：合并 `main`：更新 MCP 工具相关前端、依赖锁文件与 Vitest 配置等。

**提交说明（body）**：

**变更文件**：


---
### 031b61a1f6 Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `031b61a1f66adcbed3bd76421253afd5ad0ae309` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-05 10:33:43 +0800 |
| **父提交** | c89f3c343452db0663df355c0388d6069c1ff1d0 c56ad8e3230b40143c17f83ac56f5d246d41bd32  |

**中文摘要（变更要点）**：合并 `main`：大规模同步——含账户删除同步服务、数据集创建/DSL 导入/文档列表与嵌入进度等前端重构、Compose 与多项单测补充。

**提交说明（body）**：

**变更文件**：


---
### 6d0cdc7edd feat: implement soft-delete functionality for conversations

| 字段 | 值 |
|------|----|
| **完整哈希** | `6d0cdc7edd350878653e7089bba31ad914f4a60d` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-05 16:12:16 +0800 |
| **父提交** | 031b61a1f66adcbed3bd76421253afd5ad0ae309  |

**中文摘要（变更要点）**：实现会话「软删除」：`ConversationService` 增加软删逻辑，Console 与 Web 侧会话接口行为随之调整（列表/详情与删除语义需结合业务约定理解）。

**提交说明（body）**：
> Added the ability to soft-delete conversations by marking them as deleted without removing them from the database. Updated relevant models and API endpoints to support this feature, allowing admins to review deleted conversations while end users will no longer see them.

**变更文件**：
M	api/controllers/console/app/conversation.py
M	api/controllers/web/conversation.py
M	api/services/conversation_service.py


---
### 717c70a1fe Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `717c70a1feab56e3ced797765a254e47bd78860f` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-05 16:16:25 +0800 |
| **父提交** | 6d0cdc7edd350878653e7089bba31ad914f4a60d 9e54f086dc4bafc0e0e68f554daa4e5b04fb2c33  |

**中文摘要（变更要点）**：合并 `main`：含 Serwist/PWA、`next` 与包版本、探索页与 Tooltip 组件、文档索引任务等相关更新。

**提交说明（body）**：

**变更文件**：


---
### 7448ad4922 refactor: simplify file handling in chat components

| 字段 | 值 |
|------|----|
| **完整哈希** | `7448ad49221e33e0276e3a4d86bfee97ce2bc6fd` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-06 16:44:53 +0800 |
| **父提交** | 717c70a1feab56e3ced797765a254e47bd78860f  |

**中文摘要（变更要点）**：精简聊天与附件场景下的文件处理：统一/简化 `file-uploader` 与 `tools/utils` 中的工具函数调用与展示逻辑。

**提交说明（body）**：
> Updated the file handling logic in the chat components to directly use the message files without processing them through a utility function. Adjusted type handling for file properties to ensure defaults are set correctly across various file uploader components.

**变更文件**：
M	web/app/components/base/chat/chat/answer/agent-content.tsx
M	web/app/components/base/file-uploader/file-list-in-log.tsx
M	web/app/components/base/file-uploader/file-uploader-in-attachment/file-item.tsx
M	web/app/components/base/file-uploader/file-uploader-in-chat-input/file-item.tsx
M	web/app/components/base/file-uploader/utils.ts
M	web/app/components/tools/utils/index.ts


---
### 8a7c05be80 Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `8a7c05be80ec533bd5430f33bfa38903dc56f549` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-06 17:12:25 +0800 |
| **父提交** | 7448ad49221e33e0276e3a4d86bfee97ce2bc6fd 2c9430313dba35ce948cf342a28f1bed98b93b1e  |

**中文摘要（变更要点）**：合并 `main`：引入 API Token 缓存与服务、定时任务与 Celery 调整、市场与数据集 Service API 包装、以及 Web 端 ESLint 抑制与依赖更新等。

**提交说明（body）**：

**变更文件**：


---
### d34befdc3b Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `d34befdc3b5c4b0582dba9fd96e587724cfd862b` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-07 11:16:42 +0800 |
| **父提交** | 8a7c05be80ec533bd5430f33bfa38903dc56f549 4430a1b3da4924e42974708e2b30571e5d473af6  |

**中文摘要（变更要点）**：合并 `main`：仅触及 `dataset_service` 的少量修正。

**提交说明（body）**：

**变更文件**：


---
### f5388ab4b5 Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `f5388ab4b50497ee5595326fc52a57c832beec6a` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-07 17:40:41 +0800 |
| **父提交** | d34befdc3b5c4b0582dba9fd96e587724cfd862b c185a51bad8ca441eac68b60c18e39706b297264  |

**中文摘要（变更要点）**：合并 `main`：数据集配置界面（params config）微小调整。

**提交说明（body）**：

**变更文件**：


---
### b9dfe4b636 Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `b9dfe4b63620350ba0cc1a35d13d341d0f3a940b` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-10 10:19:30 +0800 |
| **父提交** | f5388ab4b50497ee5595326fc52a57c832beec6a 1a050c9f8601c69d2bb626338fe8b985c5a46cf1  |

**中文摘要（变更要点）**：合并 `main`：合入 Human-in-the-loop / 人工表单、工作流暂停与 Redis 发布、图引擎与 RAG 检索等大量核心能力（变更体量大，属上游功能批次合并）。

**提交说明（body）**：

**变更文件**：


---
### e38b9e7643 Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `e38b9e76436b63b7e65f70bc3bb6baf9b5574b7f` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-10 15:22:52 +0800 |
| **父提交** | b9dfe4b63620350ba0cc1a35d13d341d0f3a940b 1819bd72efc47bf2ab176a55dbdf32ead9e039ec  |

**中文摘要（变更要点）**：合并 `main`：工作区服务小改，Badge/全局样式与 Tailwind 公共配置微调。

**提交说明（body）**：

**变更文件**：


---
### 9a46019614 Revert "refactor: simplify file handling in chat components"

| 字段 | 值 |
|------|----|
| **完整哈希** | `9a46019614ed6f5d203579ca62770a54474baa23` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-24 14:59:35 +0800 |
| **父提交** | e38b9e76436b63b7e65f70bc3bb6baf9b5574b7f  |

**中文摘要（变更要点）**：撤销提交「简化聊天中文件处理」：恢复此前的文件列表与工具函数实现，相当于回滚该 refactor。

**提交说明（body）**：
> This reverts commit 7448ad49221e33e0276e3a4d86bfee97ce2bc6fd.

**变更文件**：
M	web/app/components/base/chat/chat/answer/agent-content.tsx
M	web/app/components/base/file-uploader/file-list-in-log.tsx
M	web/app/components/base/file-uploader/file-uploader-in-attachment/file-item.tsx
M	web/app/components/base/file-uploader/file-uploader-in-chat-input/file-item.tsx
M	web/app/components/base/file-uploader/utils.ts
M	web/app/components/tools/utils/index.ts


---
### 6a68b58ec4 Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `6a68b58ec45daf9b3ac6aae2e2193d5ab83c6d30` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-24 15:04:49 +0800 |
| **父提交** | 9a46019614ed6f5d203579ca62770a54474baa23 f923901d3f998b5d4ea8b6628cfc4e9d7f153383  |

**中文摘要（变更要点）**：合并 `main`：含 OceanBase 向量配置、将工作流文件模块迁移至 `api/core/workflow/file`、探索试用与远程文件等广泛同步。

**提交说明（body）**：

**变更文件**：


---
### 2962d6b177 Revert "Revert "refactor: simplify file handling in chat components""

| 字段 | 值 |
|------|----|
| **完整哈希** | `2962d6b177b8f1066c528c6bae359fda15148ad6` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-25 17:08:42 +0800 |
| **父提交** | 6a68b58ec45daf9b3ac6aae2e2193d5ab83c6d30  |

**中文摘要（变更要点）**：撤销「对简化文件处理的撤销」：再次应用简化后的聊天/附件文件处理逻辑（与 `7448ad4922` 方向一致）。

**提交说明（body）**：
> This reverts commit 9a46019614ed6f5d203579ca62770a54474baa23.

**变更文件**：
M	web/app/components/base/chat/chat/answer/agent-content.tsx
M	web/app/components/base/file-uploader/file-list-in-log.tsx
M	web/app/components/base/file-uploader/file-uploader-in-attachment/file-item.tsx
M	web/app/components/base/file-uploader/file-uploader-in-chat-input/file-item.tsx
M	web/app/components/base/file-uploader/utils.ts
M	web/app/components/tools/utils/index.ts


---
### 2ab2cfb242 refactor: simplify Docker build command and add error boundary to WorkflowVariableBlockComponent

| 字段 | 值 |
|------|----|
| **完整哈希** | `2ab2cfb2422aa58fce2c2f29ec07ea70bea28ced` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-26 10:38:40 +0800 |
| **父提交** | 2962d6b177b8f1066c528c6bae359fda15148ad6  |

**中文摘要（变更要点）**：缩短 `docker_fast_tool.sh` 中的构建命令写法；在提示编辑器「工作流变量块」外包一层 `ErrorBoundary`，避免在异常场景下整页崩溃。

**提交说明（body）**：
> - Removed unnecessary progress flag from Docker build command.
> - Introduced ErrorBoundary to WorkflowVariableBlockComponent to handle rendering exceptions gracefully, along with a fallback component for improved error handling.

**变更文件**：
M	docker/docker_fast_tool.sh
M	web/app/components/base/prompt-editor/plugins/workflow-variable-block/component.tsx


---
### e795daae4b Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `e795daae4bfb02ca35ca6163484a6e7250f22942` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-02-28 15:35:36 +0800 |
| **父提交** | 2ab2cfb2422aa58fce2c2f29ec07ea70bea28ced 91dfdd87e3d60b279801fbd4bdb690cb15eeac74  |

**中文摘要（变更要点）**：合并 `main`：新增后端代码审查技能与 Pyrefly CI、数据源管理器/HTTP 请求节点/LLM 节点等重构，以及多项集成测试与文档更新。

**提交说明（body）**：

**变更文件**：


---
### afdf6b9e74 Merge branch 'main' into custom/het-dev-260117

| 字段 | 值 |
|------|----|
| **完整哈希** | `afdf6b9e74f0f1cd919b987c6e23d68001d1116a` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-03-02 15:17:14 +0800 |
| **父提交** | e795daae4bfb02ca35ca6163484a6e7250f22942 8a7ba8734946ae359df6d30cf60e1e853effcf22  |

**中文摘要（变更要点）**：合并 `main`：继续跟进 LLM 配额中间层、图引擎调度与多类工作流节点、import linter 规则等上游改动。

**提交说明（body）**：

**变更文件**：


---
### 7bbcca1103 refactor: replace useClipboard with custom clipboard handling in CopyFeedback, CopyIcon, and InputWithCopy components fix copying in unsafe context

| 字段 | 值 |
|------|----|
| **完整哈希** | `7bbcca1103f8889def6631f5a9f52ad073efbe99` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-03-03 11:13:54 +0800 |
| **父提交** | afdf6b9e74f0f1cd919b987c6e23d68001d1116a  |

**中文摘要（变更要点）**：将 `CopyFeedback`、`CopyIcon`、`InputWithCopy` 从 `useClipboard` 改为基于 `writeTextToClipboard` 的实现，修复非安全文档上下文（如 iframe）下复制失败的问题。

**提交说明（body）**：

**变更文件**：
M	web/app/components/base/copy-feedback/index.tsx
M	web/app/components/base/copy-icon/index.tsx
M	web/app/components/base/input-with-copy/index.tsx


---
### 4d01fff00e chore(deps): add openpyxl, xlsxwriter, and xlwt to Python requirements

| 字段 | 值 |
|------|----|
| **完整哈希** | `4d01fff00e91cfadb0d9a1fea9d03e7b95655999` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-03-06 15:03:22 +0800 |
| **父提交** | 7bbcca1103f8889def6631f5a9f52ad073efbe99  |

**中文摘要（变更要点）**：向 Sandbox 的 `python-requirements.txt` 增加 `openpyxl`、`xlsxwriter`、`xlwt` 以支持 Excel 相关执行环境。

**提交说明（body）**：

**变更文件**：
M	docker/volumes/sandbox/dependencies/python-requirements.txt


---
### 9e2fc4e2d0 chore: update .gitignore, enhance Python type hinting guidelines, and improve type-checking commands

| 字段 | 值 |
|------|----|
| **完整哈希** | `9e2fc4e2d0560a9febe74a91320edda3c005a932` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-03-06 15:54:28 +0800 |
| **父提交** | 4d01fff00e91cfadb0d9a1fea9d03e7b95655999  |

**中文摘要（变更要点）**：大范围工程化改动：更新 Agent 技能与 ORPC 文档、调整 `.importlinter` 与大量 Controller/核心代码中的类型与导入风格，并触及 Redis 中间件配置等（与上游类型收紧一致）。

**提交说明（body）**：
> - Added `.claude/worktrees/` to `.gitignore`.
> - Updated Python style guidelines in `AGENTS.md` to prefer `TypedDict` for type safety.
> - Modified `Makefile` to include `pyrefly` in the type-checking command and updated help text accordingly.

**变更文件**：
M	.agents/skills/frontend-testing/SKILL.md
M	.agents/skills/frontend-testing/references/checklist.md
M	.agents/skills/frontend-testing/references/mocking.md
M	.agents/skills/orpc-contract-first/SKILL.md
M	.devcontainer/post_create_command.sh
M	.github/CODEOWNERS
M	.github/dependabot.yml
M	.github/workflows/style.yml
M	.github/workflows/tool-test-sdks.yaml
M	.github/workflows/translate-i18n-claude.yml
M	.github/workflows/web-tests.yml
M	.gitignore
M	.vscode/launch.json.template
M	AGENTS.md
M	Makefile
M	api/.env.example
M	api/.importlinter
M	api/.ruff.toml
M	api/configs/middleware/cache/redis_config.py
M	api/configs/middleware/cache/redis_pubsub_config.py
M	api/context/__init__.py
M	api/context/flask_app_context.py
M	api/controllers/common/fields.py
M	api/controllers/console/app/app.py
M	api/controllers/console/app/audio.py
M	api/controllers/console/app/completion.py
M	api/controllers/console/app/generator.py
M	api/controllers/console/app/message.py
M	api/controllers/console/app/workflow.py
M	api/controllers/console/app/workflow_app_log.py
M	api/controllers/console/app/workflow_draft_variable.py
M	api/controllers/console/app/workflow_run.py
M	api/controllers/console/app/wraps.py
M	api/controllers/console/auth/oauth_server.py
M	api/controllers/console/datasets/datasets.py
M	api/controllers/console/datasets/datasets_document.py
M	api/controllers/console/datasets/datasets_segments.py
M	api/controllers/console/datasets/hit_testing_base.py
M	api/controllers/console/datasets/rag_pipeline/datasource_auth.py
M	api/controllers/console/datasets/rag_pipeline/rag_pipeline_draft_variable.py
M	api/controllers/console/datasets/rag_pipeline/rag_pipeline_workflow.py
M	api/controllers/console/explore/audio.py
M	api/controllers/console/explore/completion.py
M	api/controllers/console/explore/message.py
M	api/controllers/console/explore/parameter.py
M	api/controllers/console/explore/trial.py
M	api/controllers/console/explore/workflow.py
M	api/controllers/console/remote_files.py
M	api/controllers/console/workspace/agent_providers.py
M	api/controllers/console/workspace/endpoint.py
M	api/controllers/console/workspace/load_balancing_config.py
M	api/controllers/console/workspace/model_providers.py
M	api/controllers/console/workspace/models.py
M	api/controllers/console/workspace/plugin.py
M	api/controllers/console/workspace/tool_providers.py
M	api/controllers/console/workspace/trigger_providers.py
M	api/controllers/files/upload.py
M	api/controllers/inner_api/plugin/plugin.py
M	api/controllers/mcp/mcp.py
M	api/controllers/service_api/app/annotation.py
M	api/controllers/service_api/app/app.py
M	api/controllers/service_api/app/audio.py
M	api/controllers/service_api/app/completion.py
M	api/controllers/service_api/app/conversation.py
M	api/controllers/service_api/app/workflow.py
M	api/controllers/service_api/dataset/dataset.py
M	api/controllers/service_api/dataset/document.py
M	api/controllers/service_api/dataset/segment.py
M	api/controllers/service_api/workspace/models.py
M	api/controllers/web/app.py
M	api/controllers/web/audio.py
M	api/controllers/web/completion.py
M	api/controllers/web/message.py
M	api/controllers/web/remote_files.py
M	api/controllers/web/workflow.py
M	api/core/agent/base_agent_runner.py
M	api/core/agent/cot_agent_runner.py
M	api/core/agent/cot_chat_agent_runner.py
M	api/core/agent/cot_completion_agent_runner.py
M	api/core/agent/fc_agent_runner.py
M	api/core/agent/output_parser/cot_output_parser.py
M	api/core/app/app_config/common/sensitive_word_avoidance/manager.py
M	api/core/app/app_config/easy_ui_based_app/agent/manager.py
M	api/core/app/app_config/easy_ui_based_app/dataset/manager.py
M	api/core/app/app_config/easy_ui_based_app/model_config/converter.py
M	api/core/app/app_config/easy_ui_based_app/model_config/manager.py
M	api/core/app/app_config/easy_ui_based_app/prompt_template/manager.py
M	api/core/app/app_config/easy_ui_based_app/variables/manager.py
M	api/core/app/app_config/entities.py
M	api/core/app/app_config/features/file_upload/manager.py
M	api/core/app/app_config/workflow_ui_based_app/variables/manager.py
M	api/core/app/apps/advanced_chat/app_generator.py
M	api/core/app/apps/advanced_chat/app_runner.py
M	api/core/app/apps/advanced_chat/generate_task_pipeline.py
M	api/core/app/apps/agent_chat/app_config_manager.py
M	api/core/app/apps/agent_chat/app_generator.py
M	api/core/app/apps/agent_chat/app_runner.py
M	api/core/app/apps/base_app_generate_response_converter.py
M	api/core/app/apps/base_app_generator.py
M	api/core/app/apps/base_app_queue_manager.py
M	api/core/app/apps/base_app_runner.py
M	api/core/app/apps/chat/app_config_manager.py
M	api/core/app/apps/chat/app_generator.py
M	api/core/app/apps/chat/app_runner.py
M	api/core/app/apps/common/graph_runtime_state_support.py
M	api/core/app/apps/common/workflow_response_converter.py
M	api/core/app/apps/completion/app_config_manager.py
M	api/core/app/apps/completion/app_generator.py
M	api/core/app/apps/completion/app_runner.py
M	api/core/app/apps/pipeline/pipeline_generator.py
M	api/core/app/apps/pipeline/pipeline_runner.py
M	api/core/app/apps/workflow/app_generator.py
M	api/core/app/apps/workflow/app_runner.py
M	api/core/app/apps/workflow/generate_task_pipeline.py
M	api/core/app/apps/workflow_app_runner.py
M	api/core/app/entities/app_invoke_entities.py
M	api/core/app/entities/queue_entities.py
M	api/core/app/entities/task_entities.py
M	api/core/app/features/hosting_moderation/hosting_moderation.py
M	api/core/app/layers/conversation_variable_persist_layer.py
M	api/core/app/layers/pause_state_persist_layer.py
M	api/core/app/layers/suspend_layer.py
M	api/core/app/layers/timeslice_layer.py
M	api/core/app/layers/trigger_post_layer.py
M	api/core/app/llm/model_access.py
M	api/core/app/llm/quota.py
M	api/core/app/task_pipeline/based_generate_task_pipeline.py
M	api/core/app/task_pipeline/easy_ui_based_generate_task_pipeline.py
M	api/core/app/workflow/__init__.py
M	api/core/app/workflow/file_runtime.py
M	api/core/app/workflow/layers/llm_quota.py
M	api/core/app/workflow/layers/observability.py
M	api/core/app/workflow/layers/persistence.py
D	api/core/app/workflow/node_factory.py
M	api/core/base/tts/app_generator_tts_publisher.py
M	api/core/datasource/datasource_file_manager.py
M	api/core/datasource/datasource_manager.py
M	api/core/datasource/entities/api_entities.py
M	api/core/datasource/utils/message_transformer.py
M	api/core/entities/execution_extra_content.py
M	api/core/entities/mcp_provider.py
M	api/core/entities/model_entities.py
M	api/core/entities/provider_configuration.py
M	api/core/entities/provider_entities.py
M	api/core/helper/code_executor/code_executor.py
M	api/core/helper/code_executor/template_transformer.py
M	api/core/helper/moderation.py
M	api/core/hosting_configuration.py
M	api/core/indexing_runner.py
M	api/core/llm_generator/llm_generator.py
M	api/core/llm_generator/output_parser/structured_output.py
M	api/core/mcp/server/streamable_http.py
M	api/core/mcp/utils.py
M	api/core/memory/token_buffer_memory.py
M	api/core/model_manager.py
D	api/core/model_runtime/README.md
D	api/core/model_runtime/README_CN.md
D	api/core/model_runtime/__init__.py
D	api/core/model_runtime/callbacks/__init__.py
D	api/core/model_runtime/callbacks/base_callback.py
D	api/core/model_runtime/callbacks/logging_callback.py
D	api/core/model_runtime/entities/__init__.py
D	api/core/model_runtime/entities/common_entities.py
D	api/core/model_runtime/entities/defaults.py
D	api/core/model_runtime/entities/llm_entities.py
D	api/core/model_runtime/entities/message_entities.py
D	api/core/model_runtime/entities/model_entities.py
D	api/core/model_runtime/entities/provider_entities.py
D	api/core/model_runtime/entities/rerank_entities.py
D	api/core/model_runtime/entities/text_embedding_entities.py
D	api/core/model_runtime/errors/__init__.py
D	api/core/model_runtime/errors/invoke.py
D	api/core/model_runtime/errors/validate.py
D	api/core/model_runtime/memory/__init__.py
D	api/core/model_runtime/memory/prompt_message_memory.py
D	api/core/model_runtime/model_providers/__base/__init__.py
D	api/core/model_runtime/model_providers/__base/ai_model.py
D	api/core/model_runtime/model_providers/__base/large_language_model.py
D	api/core/model_runtime/model_providers/__base/moderation_model.py
D	api/core/model_runtime/model_providers/__base/rerank_model.py
D	api/core/model_runtime/model_providers/__base/speech2text_model.py
D	api/core/model_runtime/model_providers/__base/text_embedding_model.py
D	api/core/model_runtime/model_providers/__base/tokenizers/gpt2_tokenizer.py
D	api/core/model_runtime/model_providers/__base/tts_model.py
D	api/core/model_runtime/model_providers/__init__.py
D	api/core/model_runtime/model_providers/_position.yaml
D	api/core/model_runtime/model_providers/model_provider_factory.py
D	api/core/model_runtime/schema_validators/__init__.py
D	api/core/model_runtime/schema_validators/common_validator.py
D	api/core/model_runtime/schema_validators/model_credential_schema_validator.py
D	api/core/model_runtime/schema_validators/provider_credential_schema_validator.py
D	api/core/model_runtime/utils/__init__.py
D	api/core/model_runtime/utils/encoders.py
M	api/core/moderation/openai_moderation/openai_moderation.py
M	api/core/ops/aliyun_trace/aliyun_trace.py
M	api/core/ops/aliyun_trace/data_exporter/traceclient.py
M	api/core/ops/aliyun_trace/utils.py
M	api/core/ops/langfuse_trace/langfuse_trace.py
M	api/core/ops/langsmith_trace/langsmith_trace.py
M	api/core/ops/mlflow_trace/mlflow_trace.py
M	api/core/ops/opik_trace/opik_trace.py
M	api/core/ops/ops_trace_manager.py
M	api/core/ops/tencent_trace/client.py
M	api/core/ops/tencent_trace/span_builder.py
M	api/core/ops/tencent_trace/tencent_trace.py
M	api/core/ops/tencent_trace/utils.py
M	api/core/ops/utils.py
M	api/core/ops/weave_trace/weave_trace.py
M	api/core/plugin/backwards_invocation/app.py
M	api/core/plugin/backwards_invocation/model.py
M	api/core/plugin/backwards_invocation/node.py
M	api/core/plugin/entities/marketplace.py
M	api/core/plugin/entities/plugin.py
M	api/core/plugin/entities/plugin_daemon.py
M	api/core/plugin/entities/request.py
M	api/core/plugin/impl/base.py
M	api/core/plugin/impl/model.py
M	api/core/plugin/utils/converter.py
M	api/core/prompt/advanced_prompt_transform.py
M	api/core/prompt/agent_history_prompt_transform.py
M	api/core/prompt/entities/advanced_prompt_entities.py
M	api/core/prompt/prompt_transform.py
M	api/core/prompt/simple_prompt_transform.py
M	api/core/prompt/utils/prompt_message_util.py
M	api/core/provider_manager.py
M	api/core/rag/data_post_processor/data_post_processor.py
M	api/core/rag/datasource/retrieval_service.py
M	api/core/rag/datasource/vdb/chroma/chroma_vector.py
M	api/core/rag/datasource/vdb/clickzetta/clickzetta_vector.py
M	api/core/rag/datasource/vdb/vector_factory.py
M	api/core/rag/docstore/dataset_docstore.py
M	api/core/rag/embedding/cached_embedding.py
A	api/core/rag/index_processor/index_processor.py
M	api/core/rag/index_processor/processor/paragraph_index_processor.py
M	api/core/rag/models/document.py
M	api/core/rag/rerank/rerank_model.py
M	api/core/rag/rerank/weight_rerank.py
M	api/core/rag/retrieval/dataset_retrieval.py
M	api/core/rag/retrieval/router/multi_dataset_function_call_router.py
M	api/core/rag/retrieval/router/multi_dataset_react_route.py
M	api/core/rag/splitter/fixed_text_splitter.py
A	api/core/rag/summary_index/__init__.py
A	api/core/rag/summary_index/summary_index.py
M	api/core/repositories/celery_workflow_execution_repository.py
M	api/core/repositories/celery_workflow_node_execution_repository.py
M	api/core/repositories/factory.py
M	api/core/repositories/human_input_repository.py
M	api/core/repositories/sqlalchemy_workflow_execution_repository.py
M	api/core/repositories/sqlalchemy_workflow_node_execution_repository.py
M	api/core/tools/builtin_tool/providers/audio/tools/asr.py
M	api/core/tools/builtin_tool/providers/audio/tools/tts.py
M	api/core/tools/builtin_tool/tool.py
M	api/core/tools/custom_tool/tool.py
M	api/core/tools/entities/api_entities.py
M	api/core/tools/mcp_tool/tool.py
M	api/core/tools/tool_engine.py
M	api/core/tools/tool_file_manager.py
M	api/core/tools/tool_manager.py
M	api/core/tools/utils/dataset_retriever/dataset_multi_retriever_tool.py
M	api/core/tools/utils/message_transformer.py
M	api/core/tools/utils/model_invocation_utils.py
M	api/core/tools/utils/workflow_configuration_sync.py
M	api/core/tools/workflow_as_tool/provider.py
M	api/core/tools/workflow_as_tool/tool.py
M	api/core/trigger/debug/event_selectors.py
D	api/core/workflow/README.md
M	api/core/workflow/__init__.py
D	api/core/workflow/constants.py
D	api/core/workflow/context/__init__.py
D	api/core/workflow/context/execution_context.py
D	api/core/workflow/context/models.py
D	api/core/workflow/conversation_variable_updater.py
D	api/core/workflow/entities/__init__.py
D	api/core/workflow/entities/agent.py
D	api/core/workflow/entities/graph_config.py
D	api/core/workflow/entities/graph_init_params.py
D	api/core/workflow/entities/pause_reason.py
D	api/core/workflow/entities/workflow_execution.py
D	api/core/workflow/entities/workflow_node_execution.py
D	api/core/workflow/entities/workflow_start_reason.py
D	api/core/workflow/enums.py
D	api/core/workflow/errors.py
D	api/core/workflow/file/__init__.py
D	api/core/workflow/file/constants.py
D	api/core/workflow/file/enums.py
D	api/core/workflow/file/file_manager.py
D	api/core/workflow/file/helpers.py
D	api/core/workflow/file/models.py
D	api/core/workflow/file/protocols.py
D	api/core/workflow/file/runtime.py
D	api/core/workflow/file/tool_file_parser.py
D	api/core/workflow/graph/__init__.py
D	api/core/workflow/graph/edge.py
D	api/core/workflow/graph/graph.py
D	api/core/workflow/graph/graph_template.py
D	api/core/workflow/graph/validation.py
D	api/core/workflow/graph_engine/__init__.py
D	api/core/workflow/graph_engine/_engine_utils.py
D	api/core/workflow/graph_engine/command_channels/README.md
D	api/core/workflow/graph_engine/command_channels/__init__.py
D	api/core/workflow/graph_engine/command_channels/in_memory_channel.py
D	api/core/workflow/graph_engine/command_channels/redis_channel.py
D	api/core/workflow/graph_engine/command_processing/__init__.py
D	api/core/workflow/graph_engine/command_processing/command_handlers.py
D	api/core/workflow/graph_engine/command_processing/command_processor.py
D	api/core/workflow/graph_engine/config.py
D	api/core/workflow/graph_engine/domain/__init__.py
D	api/core/workflow/graph_engine/domain/graph_execution.py
D	api/core/workflow/graph_engine/domain/node_execution.py
D	api/core/workflow/graph_engine/entities/__init__.py
D	api/core/workflow/graph_engine/entities/commands.py
D	api/core/workflow/graph_engine/error_handler.py
D	api/core/workflow/graph_engine/event_management/__init__.py
D	api/core/workflow/graph_engine/event_management/event_handlers.py
D	api/core/workflow/graph_engine/event_management/event_manager.py
D	api/core/workflow/graph_engine/graph_engine.py
D	api/core/workflow/graph_engine/graph_state_manager.py
D	api/core/workflow/graph_engine/graph_traversal/__init__.py
D	api/core/workflow/graph_engine/graph_traversal/edge_processor.py
D	api/core/workflow/graph_engine/graph_traversal/skip_propagator.py
D	api/core/workflow/graph_engine/layers/README.md
D	api/core/workflow/graph_engine/layers/__init__.py
D	api/core/workflow/graph_engine/layers/base.py
D	api/core/workflow/graph_engine/layers/debug_logging.py
D	api/core/workflow/graph_engine/layers/execution_limits.py
D	api/core/workflow/graph_engine/manager.py
D	api/core/workflow/graph_engine/orchestration/__init__.py
D	api/core/workflow/graph_engine/orchestration/dispatcher.py
D	api/core/workflow/graph_engine/orchestration/execution_coordinator.py
D	api/core/workflow/graph_engine/protocols/command_channel.py
D	api/core/workflow/graph_engine/ready_queue/__init__.py
D	api/core/workflow/graph_engine/ready_queue/factory.py
D	api/core/workflow/graph_engine/ready_queue/in_memory.py
D	api/core/workflow/graph_engine/ready_queue/protocol.py
D	api/core/workflow/graph_engine/response_coordinator/__init__.py
D	api/core/workflow/graph_engine/response_coordinator/coordinator.py
D	api/core/workflow/graph_engine/response_coordinator/path.py
D	api/core/workflow/graph_engine/response_coordinator/session.py
D	api/core/workflow/graph_engine/worker.py
D	api/core/workflow/graph_engine/worker_management/__init__.py
D	api/core/workflow/graph_engine/worker_management/worker_pool.py
D	api/core/workflow/graph_events/__init__.py
D	api/core/workflow/graph_events/agent.py
D	api/core/workflow/graph_events/base.py
D	api/core/workflow/graph_events/graph.py
D	api/core/workflow/graph_events/human_input.py
D	api/core/workflow/graph_events/iteration.py
D	api/core/workflow/graph_events/loop.py
D	api/core/workflow/graph_events/node.py
D	api/core/workflow/node_events/__init__.py
D	api/core/workflow/node_events/agent.py
D	api/core/workflow/node_events/base.py
D	api/core/workflow/node_events/iteration.py
D	api/core/workflow/node_events/loop.py
D	api/core/workflow/node_events/node.py
A	api/core/workflow/node_factory.py
D	api/core/workflow/nodes/__init__.py
D	api/core/workflow/nodes/agent/__init__.py
D	api/core/workflow/nodes/agent/agent_node.py
D	api/core/workflow/nodes/agent/entities.py
D	api/core/workflow/nodes/agent/exc.py
D	api/core/workflow/nodes/answer/__init__.py
D	api/core/workflow/nodes/answer/answer_node.py
D	api/core/workflow/nodes/answer/entities.py
D	api/core/workflow/nodes/base/__init__.py
D	api/core/workflow/nodes/base/entities.py
D	api/core/workflow/nodes/base/exc.py
D	api/core/workflow/nodes/base/node.py
D	api/core/workflow/nodes/base/template.py
D	api/core/workflow/nodes/base/usage_tracking_mixin.py
D	api/core/workflow/nodes/base/variable_template_parser.py
D	api/core/workflow/nodes/code/__init__.py
D	api/core/workflow/nodes/code/code_node.py
D	api/core/workflow/nodes/code/entities.py
D	api/core/workflow/nodes/code/exc.py
D	api/core/workflow/nodes/code/limits.py
D	api/core/workflow/nodes/datasource/__init__.py
D	api/core/workflow/nodes/datasource/datasource_node.py
D	api/core/workflow/nodes/datasource/entities.py
D	api/core/workflow/nodes/datasource/exc.py
D	api/core/workflow/nodes/document_extractor/__init__.py
D	api/core/workflow/nodes/document_extractor/entities.py
D	api/core/workflow/nodes/document_extractor/exc.py
D	api/core/workflow/nodes/document_extractor/node.py
D	api/core/workflow/nodes/end/__init__.py
D	api/core/workflow/nodes/end/end_node.py
D	api/core/workflow/nodes/end/entities.py
D	api/core/workflow/nodes/http_request/__init__.py
D	api/core/workflow/nodes/http_request/config.py
D	api/core/workflow/nodes/http_request/entities.py
D	api/core/workflow/nodes/http_request/exc.py
D	api/core/workflow/nodes/http_request/executor.py
D	api/core/workflow/nodes/http_request/node.py
D	api/core/workflow/nodes/human_input/__init__.py
D	api/core/workflow/nodes/human_input/entities.py
D	api/core/workflow/nodes/human_input/enums.py
D	api/core/workflow/nodes/human_input/human_input_node.py
D	api/core/workflow/nodes/if_else/__init__.py
D	api/core/workflow/nodes/if_else/entities.py
D	api/core/workflow/nodes/if_else/if_else_node.py
D	api/core/workflow/nodes/iteration/__init__.py
D	api/core/workflow/nodes/iteration/entities.py
D	api/core/workflow/nodes/iteration/exc.py
D	api/core/workflow/nodes/iteration/iteration_node.py
D	api/core/workflow/nodes/iteration/iteration_start_node.py
D	api/core/workflow/nodes/knowledge_index/__init__.py
D	api/core/workflow/nodes/knowledge_index/entities.py
D	api/core/workflow/nodes/knowledge_index/exc.py
D	api/core/workflow/nodes/knowledge_index/knowledge_index_node.py
D	api/core/workflow/nodes/knowledge_retrieval/__init__.py
D	api/core/workflow/nodes/knowledge_retrieval/entities.py
D	api/core/workflow/nodes/knowledge_retrieval/exc.py
D	api/core/workflow/nodes/knowledge_retrieval/knowledge_retrieval_node.py
D	api/core/workflow/nodes/knowledge_retrieval/template_prompts.py
D	api/core/workflow/nodes/list_operator/__init__.py
D	api/core/workflow/nodes/list_operator/entities.py
D	api/core/workflow/nodes/list_operator/exc.py
D	api/core/workflow/nodes/list_operator/node.py
D	api/core/workflow/nodes/llm/__init__.py
D	api/core/workflow/nodes/llm/entities.py
D	api/core/workflow/nodes/llm/exc.py
D	api/core/workflow/nodes/llm/file_saver.py
D	api/core/workflow/nodes/llm/llm_utils.py
D	api/core/workflow/nodes/llm/node.py
D	api/core/workflow/nodes/llm/protocols.py
D	api/core/workflow/nodes/loop/__init__.py
D	api/core/workflow/nodes/loop/entities.py
D	api/core/workflow/nodes/loop/loop_end_node.py
D	api/core/workflow/nodes/loop/loop_node.py
D	api/core/workflow/nodes/loop/loop_start_node.py
D	api/core/workflow/nodes/node_mapping.py
D	api/core/workflow/nodes/parameter_extractor/__init__.py
D	api/core/workflow/nodes/parameter_extractor/entities.py
D	api/core/workflow/nodes/parameter_extractor/exc.py
D	api/core/workflow/nodes/parameter_extractor/parameter_extractor_node.py
D	api/core/workflow/nodes/parameter_extractor/prompts.py
D	api/core/workflow/nodes/protocols.py
D	api/core/workflow/nodes/question_classifier/__init__.py
D	api/core/workflow/nodes/question_classifier/entities.py
D	api/core/workflow/nodes/question_classifier/exc.py
D	api/core/workflow/nodes/question_classifier/question_classifier_node.py
D	api/core/workflow/nodes/question_classifier/template_prompts.py
D	api/core/workflow/nodes/start/__init__.py
D	api/core/workflow/nodes/start/entities.py
D	api/core/workflow/nodes/start/start_node.py
D	api/core/workflow/nodes/template_transform/__init__.py
D	api/core/workflow/nodes/template_transform/entities.py
D	api/core/workflow/nodes/template_transform/template_renderer.py
D	api/core/workflow/nodes/template_transform/template_transform_node.py
D	api/core/workflow/nodes/tool/__init__.py
D	api/core/workflow/nodes/tool/entities.py
D	api/core/workflow/nodes/tool/exc.py
D	api/core/workflow/nodes/tool/tool_node.py
D	api/core/workflow/nodes/trigger_plugin/__init__.py
D	api/core/workflow/nodes/trigger_plugin/entities.py
D	api/core/workflow/nodes/trigger_plugin/exc.py
D	api/core/workflow/nodes/trigger_plugin/trigger_event_node.py
D	api/core/workflow/nodes/trigger_schedule/__init__.py
D	api/core/workflow/nodes/trigger_schedule/entities.py
D	api/core/workflow/nodes/trigger_schedule/exc.py
D	api/core/workflow/nodes/trigger_schedule/trigger_schedule_node.py
D	api/core/workflow/nodes/trigger_webhook/__init__.py
D	api/core/workflow/nodes/trigger_webhook/entities.py
D	api/core/workflow/nodes/trigger_webhook/exc.py
D	api/core/workflow/nodes/trigger_webhook/node.py
D	api/core/workflow/nodes/variable_aggregator/__init__.py
D	api/core/workflow/nodes/variable_aggregator/entities.py
D	api/core/workflow/nodes/variable_aggregator/variable_aggregator_node.py
D	api/core/workflow/nodes/variable_assigner/__init__.py
D	api/core/workflow/nodes/variable_assigner/common/__init__.py
D	api/core/workflow/nodes/variable_assigner/common/exc.py
D	api/core/workflow/nodes/variable_assigner/common/helpers.py
D	api/core/workflow/nodes/variable_assigner/v1/__init__.py
D	api/core/workflow/nodes/variable_assigner/v1/node.py
D	api/core/workflow/nodes/variable_assigner/v1/node_data.py
D	api/core/workflow/nodes/variable_assigner/v2/__init__.py
D	api/core/workflow/nodes/variable_assigner/v2/entities.py
D	api/core/workflow/nodes/variable_assigner/v2/enums.py
D	api/core/workflow/nodes/variable_assigner/v2/exc.py
D	api/core/workflow/nodes/variable_assigner/v2/helpers.py
D	api/core/workflow/nodes/variable_assigner/v2/node.py
D	api/core/workflow/repositories/__init__.py
D	api/core/workflow/repositories/datasource_manager_protocol.py
D	api/core/workflow/repositories/draft_variable_repository.py
D	api/core/workflow/repositories/human_input_form_repository.py
D	api/core/workflow/repositories/rag_retrieval_protocol.py
D	api/core/workflow/repositories/workflow_execution_repository.py
D	api/core/workflow/repositories/workflow_node_execution_repository.py
D	api/core/workflow/runtime/__init__.py
D	api/core/workflow/runtime/graph_runtime_state.py
D	api/core/workflow/runtime/graph_runtime_state_protocol.py
D	api/core/workflow/runtime/read_only_wrappers.py
D	api/core/workflow/runtime/variable_pool.py
D	api/core/workflow/system_variable.py
D	api/core/workflow/utils/__init__.py
D	api/core/workflow/utils/condition/__init__.py
D	api/core/workflow/utils/condition/entities.py
D	api/core/workflow/utils/condition/processor.py
D	api/core/workflow/variable_loader.py
D	api/core/workflow/variables/__init__.py
D	api/core/workflow/variables/consts.py
D	api/core/workflow/variables/exc.py
D	api/core/workflow/variables/input_entities.py
D	api/core/workflow/variables/segment_group.py
D	api/core/workflow/variables/segments.py
D	api/core/workflow/variables/types.py
D	api/core/workflow/variables/utils.py
D	api/core/workflow/variables/variables.py
M	api/core/workflow/workflow_entry.py
D	api/core/workflow/workflow_type_encoder.py
A	api/dify_graph/README.md
A	api/dify_graph/__init__.py
A	api/dify_graph/constants.py
A	api/dify_graph/context/__init__.py
A	api/dify_graph/context/execution_context.py
A	api/dify_graph/context/models.py
A	api/dify_graph/conversation_variable_updater.py
A	api/dify_graph/entities/__init__.py
A	api/dify_graph/entities/agent.py
A	api/dify_graph/entities/graph_config.py
A	api/dify_graph/entities/graph_init_params.py
A	api/dify_graph/entities/pause_reason.py
A	api/dify_graph/entities/workflow_execution.py
A	api/dify_graph/entities/workflow_node_execution.py
A	api/dify_graph/entities/workflow_start_reason.py
A	api/dify_graph/enums.py
A	api/dify_graph/errors.py
A	api/dify_graph/file/__init__.py
A	api/dify_graph/file/constants.py
A	api/dify_graph/file/enums.py
A	api/dify_graph/file/file_manager.py
A	api/dify_graph/file/helpers.py
A	api/dify_graph/file/models.py
A	api/dify_graph/file/protocols.py
A	api/dify_graph/file/runtime.py
A	api/dify_graph/file/tool_file_parser.py
A	api/dify_graph/graph/__init__.py
A	api/dify_graph/graph/edge.py
A	api/dify_graph/graph/graph.py
A	api/dify_graph/graph/graph_template.py
A	api/dify_graph/graph/validation.py
A	api/dify_graph/graph_engine/__init__.py
A	api/dify_graph/graph_engine/_engine_utils.py
A	api/dify_graph/graph_engine/command_channels/README.md
A	api/dify_graph/graph_engine/command_channels/__init__.py
A	api/dify_graph/graph_engine/command_channels/in_memory_channel.py
A	api/dify_graph/graph_engine/command_channels/redis_channel.py
A	api/dify_graph/graph_engine/command_processing/__init__.py
A	api/dify_graph/graph_engine/command_processing/command_handlers.py
A	api/dify_graph/graph_engine/command_processing/command_processor.py
A	api/dify_graph/graph_engine/config.py
A	api/dify_graph/graph_engine/domain/__init__.py
A	api/dify_graph/graph_engine/domain/graph_execution.py
A	api/dify_graph/graph_engine/domain/node_execution.py
A	api/dify_graph/graph_engine/entities/__init__.py
A	api/dify_graph/graph_engine/entities/commands.py
A	api/dify_graph/graph_engine/error_handler.py
A	api/dify_graph/graph_engine/event_management/__init__.py
A	api/dify_graph/graph_engine/event_management/event_handlers.py
A	api/dify_graph/graph_engine/event_management/event_manager.py
A	api/dify_graph/graph_engine/graph_engine.py
A	api/dify_graph/graph_engine/graph_state_manager.py
A	api/dify_graph/graph_engine/graph_traversal/__init__.py
A	api/dify_graph/graph_engine/graph_traversal/edge_processor.py
A	api/dify_graph/graph_engine/graph_traversal/skip_propagator.py
A	api/dify_graph/graph_engine/layers/README.md
A	api/dify_graph/graph_engine/layers/__init__.py
A	api/dify_graph/graph_engine/layers/base.py
A	api/dify_graph/graph_engine/layers/debug_logging.py
A	api/dify_graph/graph_engine/layers/execution_limits.py
A	api/dify_graph/graph_engine/manager.py
A	api/dify_graph/graph_engine/orchestration/__init__.py
A	api/dify_graph/graph_engine/orchestration/dispatcher.py
A	api/dify_graph/graph_engine/orchestration/execution_coordinator.py
A	api/dify_graph/graph_engine/protocols/command_channel.py
A	api/dify_graph/graph_engine/ready_queue/__init__.py
A	api/dify_graph/graph_engine/ready_queue/factory.py
A	api/dify_graph/graph_engine/ready_queue/in_memory.py
A	api/dify_graph/graph_engine/ready_queue/protocol.py
A	api/dify_graph/graph_engine/response_coordinator/__init__.py
A	api/dify_graph/graph_engine/response_coordinator/coordinator.py
A	api/dify_graph/graph_engine/response_coordinator/path.py
A	api/dify_graph/graph_engine/response_coordinator/session.py
A	api/dify_graph/graph_engine/worker.py
A	api/dify_graph/graph_engine/worker_management/__init__.py
A	api/dify_graph/graph_engine/worker_management/worker_pool.py
A	api/dify_graph/graph_events/__init__.py
A	api/dify_graph/graph_events/agent.py
A	api/dify_graph/graph_events/base.py
A	api/dify_graph/graph_events/graph.py
A	api/dify_graph/graph_events/human_input.py
A	api/dify_graph/graph_events/iteration.py
A	api/dify_graph/graph_events/loop.py
A	api/dify_graph/graph_events/node.py
A	api/dify_graph/model_runtime/README.md
A	api/dify_graph/model_runtime/README_CN.md
A	api/dify_graph/model_runtime/__init__.py
A	api/dify_graph/model_runtime/callbacks/__init__.py
A	api/dify_graph/model_runtime/callbacks/base_callback.py
A	api/dify_graph/model_runtime/callbacks/logging_callback.py
A	api/dify_graph/model_runtime/entities/__init__.py
A	api/dify_graph/model_runtime/entities/common_entities.py
A	api/dify_graph/model_runtime/entities/defaults.py
A	api/dify_graph/model_runtime/entities/llm_entities.py
A	api/dify_graph/model_runtime/entities/message_entities.py
A	api/dify_graph/model_runtime/entities/model_entities.py
A	api/dify_graph/model_runtime/entities/provider_entities.py
A	api/dify_graph/model_runtime/entities/rerank_entities.py
A	api/dify_graph/model_runtime/entities/text_embedding_entities.py
A	api/dify_graph/model_runtime/errors/__init__.py
A	api/dify_graph/model_runtime/errors/invoke.py
A	api/dify_graph/model_runtime/errors/validate.py
A	api/dify_graph/model_runtime/memory/__init__.py
A	api/dify_graph/model_runtime/memory/prompt_message_memory.py
A	api/dify_graph/model_runtime/model_providers/__base/__init__.py
A	api/dify_graph/model_runtime/model_providers/__base/ai_model.py
A	api/dify_graph/model_runtime/model_providers/__base/large_language_model.py
A	api/dify_graph/model_runtime/model_providers/__base/moderation_model.py
A	api/dify_graph/model_runtime/model_providers/__base/rerank_model.py
A	api/dify_graph/model_runtime/model_providers/__base/speech2text_model.py
A	api/dify_graph/model_runtime/model_providers/__base/text_embedding_model.py
A	api/dify_graph/model_runtime/model_providers/__base/tokenizers/gpt2_tokenizer.py
A	api/dify_graph/model_runtime/model_providers/__base/tts_model.py
A	api/dify_graph/model_runtime/model_providers/__init__.py
A	api/dify_graph/model_runtime/model_providers/_position.yaml
A	api/dify_graph/model_runtime/model_providers/model_provider_factory.py
A	api/dify_graph/model_runtime/schema_validators/__init__.py
A	api/dify_graph/model_runtime/schema_validators/common_validator.py
A	api/dify_graph/model_runtime/schema_validators/model_credential_schema_validator.py
A	api/dify_graph/model_runtime/schema_validators/provider_credential_schema_validator.py
A	api/dify_graph/model_runtime/utils/__init__.py
A	api/dify_graph/model_runtime/utils/encoders.py
A	api/dify_graph/node_events/__init__.py
A	api/dify_graph/node_events/agent.py
A	api/dify_graph/node_events/base.py
A	api/dify_graph/node_events/iteration.py
A	api/dify_graph/node_events/loop.py
A	api/dify_graph/node_events/node.py
A	api/dify_graph/nodes/__init__.py
A	api/dify_graph/nodes/agent/__init__.py
A	api/dify_graph/nodes/agent/agent_node.py
A	api/dify_graph/nodes/agent/entities.py
A	api/dify_graph/nodes/agent/exc.py
A	api/dify_graph/nodes/answer/__init__.py
A	api/dify_graph/nodes/answer/answer_node.py
A	api/dify_graph/nodes/answer/entities.py
A	api/dify_graph/nodes/base/__init__.py
A	api/dify_graph/nodes/base/entities.py
A	api/dify_graph/nodes/base/exc.py
A	api/dify_graph/nodes/base/node.py
A	api/dify_graph/nodes/base/template.py
A	api/dify_graph/nodes/base/usage_tracking_mixin.py
A	api/dify_graph/nodes/base/variable_template_parser.py
A	api/dify_graph/nodes/code/__init__.py
A	api/dify_graph/nodes/code/code_node.py
A	api/dify_graph/nodes/code/entities.py
A	api/dify_graph/nodes/code/exc.py
A	api/dify_graph/nodes/code/limits.py
A	api/dify_graph/nodes/datasource/__init__.py
A	api/dify_graph/nodes/datasource/datasource_node.py
A	api/dify_graph/nodes/datasource/entities.py
A	api/dify_graph/nodes/datasource/exc.py
A	api/dify_graph/nodes/document_extractor/__init__.py
A	api/dify_graph/nodes/document_extractor/entities.py
A	api/dify_graph/nodes/document_extractor/exc.py
A	api/dify_graph/nodes/document_extractor/node.py
A	api/dify_graph/nodes/end/__init__.py
A	api/dify_graph/nodes/end/end_node.py
A	api/dify_graph/nodes/end/entities.py
A	api/dify_graph/nodes/http_request/__init__.py
A	api/dify_graph/nodes/http_request/config.py
A	api/dify_graph/nodes/http_request/entities.py
A	api/dify_graph/nodes/http_request/exc.py
A	api/dify_graph/nodes/http_request/executor.py
A	api/dify_graph/nodes/http_request/node.py
A	api/dify_graph/nodes/human_input/__init__.py
A	api/dify_graph/nodes/human_input/entities.py
A	api/dify_graph/nodes/human_input/enums.py
A	api/dify_graph/nodes/human_input/human_input_node.py
A	api/dify_graph/nodes/if_else/__init__.py
A	api/dify_graph/nodes/if_else/entities.py
A	api/dify_graph/nodes/if_else/if_else_node.py
A	api/dify_graph/nodes/iteration/__init__.py
A	api/dify_graph/nodes/iteration/entities.py
A	api/dify_graph/nodes/iteration/exc.py
A	api/dify_graph/nodes/iteration/iteration_node.py
A	api/dify_graph/nodes/iteration/iteration_start_node.py
A	api/dify_graph/nodes/knowledge_index/__init__.py
A	api/dify_graph/nodes/knowledge_index/entities.py
A	api/dify_graph/nodes/knowledge_index/exc.py
A	api/dify_graph/nodes/knowledge_index/knowledge_index_node.py
A	api/dify_graph/nodes/knowledge_retrieval/__init__.py
A	api/dify_graph/nodes/knowledge_retrieval/entities.py
A	api/dify_graph/nodes/knowledge_retrieval/exc.py
A	api/dify_graph/nodes/knowledge_retrieval/knowledge_retrieval_node.py
A	api/dify_graph/nodes/knowledge_retrieval/template_prompts.py
A	api/dify_graph/nodes/list_operator/__init__.py
A	api/dify_graph/nodes/list_operator/entities.py
A	api/dify_graph/nodes/list_operator/exc.py
A	api/dify_graph/nodes/list_operator/node.py
A	api/dify_graph/nodes/llm/__init__.py
A	api/dify_graph/nodes/llm/entities.py
A	api/dify_graph/nodes/llm/exc.py
A	api/dify_graph/nodes/llm/file_saver.py
A	api/dify_graph/nodes/llm/llm_utils.py
A	api/dify_graph/nodes/llm/node.py
A	api/dify_graph/nodes/llm/protocols.py
A	api/dify_graph/nodes/loop/__init__.py
A	api/dify_graph/nodes/loop/entities.py
A	api/dify_graph/nodes/loop/loop_end_node.py
A	api/dify_graph/nodes/loop/loop_node.py
A	api/dify_graph/nodes/loop/loop_start_node.py
A	api/dify_graph/nodes/node_mapping.py
A	api/dify_graph/nodes/parameter_extractor/__init__.py
A	api/dify_graph/nodes/parameter_extractor/entities.py
A	api/dify_graph/nodes/parameter_extractor/exc.py
A	api/dify_graph/nodes/parameter_extractor/parameter_extractor_node.py
A	api/dify_graph/nodes/parameter_extractor/prompts.py
A	api/dify_graph/nodes/protocols.py
A	api/dify_graph/nodes/question_classifier/__init__.py
A	api/dify_graph/nodes/question_classifier/entities.py
A	api/dify_graph/nodes/question_classifier/exc.py
A	api/dify_graph/nodes/question_classifier/question_classifier_node.py
A	api/dify_graph/nodes/question_classifier/template_prompts.py
A	api/dify_graph/nodes/start/__init__.py
A	api/dify_graph/nodes/start/entities.py
A	api/dify_graph/nodes/start/start_node.py
A	api/dify_graph/nodes/template_transform/__init__.py
A	api/dify_graph/nodes/template_transform/entities.py
A	api/dify_graph/nodes/template_transform/template_renderer.py
A	api/dify_graph/nodes/template_transform/template_transform_node.py
A	api/dify_graph/nodes/tool/__init__.py
A	api/dify_graph/nodes/tool/entities.py
A	api/dify_graph/nodes/tool/exc.py
A	api/dify_graph/nodes/tool/tool_node.py
A	api/dify_graph/nodes/trigger_plugin/__init__.py
A	api/dify_graph/nodes/trigger_plugin/entities.py
A	api/dify_graph/nodes/trigger_plugin/exc.py
A	api/dify_graph/nodes/trigger_plugin/trigger_event_node.py
A	api/dify_graph/nodes/trigger_schedule/__init__.py
A	api/dify_graph/nodes/trigger_schedule/entities.py
A	api/dify_graph/nodes/trigger_schedule/exc.py
A	api/dify_graph/nodes/trigger_schedule/trigger_schedule_node.py
A	api/dify_graph/nodes/trigger_webhook/__init__.py
A	api/dify_graph/nodes/trigger_webhook/entities.py
A	api/dify_graph/nodes/trigger_webhook/exc.py
A	api/dify_graph/nodes/trigger_webhook/node.py
A	api/dify_graph/nodes/variable_aggregator/__init__.py
A	api/dify_graph/nodes/variable_aggregator/entities.py
A	api/dify_graph/nodes/variable_aggregator/variable_aggregator_node.py
A	api/dify_graph/nodes/variable_assigner/__init__.py
A	api/dify_graph/nodes/variable_assigner/common/__init__.py
A	api/dify_graph/nodes/variable_assigner/common/exc.py
A	api/dify_graph/nodes/variable_assigner/common/helpers.py
A	api/dify_graph/nodes/variable_assigner/v1/__init__.py
A	api/dify_graph/nodes/variable_assigner/v1/node.py
A	api/dify_graph/nodes/variable_assigner/v1/node_data.py
A	api/dify_graph/nodes/variable_assigner/v2/__init__.py
A	api/dify_graph/nodes/variable_assigner/v2/entities.py
A	api/dify_graph/nodes/variable_assigner/v2/enums.py
A	api/dify_graph/nodes/variable_assigner/v2/exc.py
A	api/dify_graph/nodes/variable_assigner/v2/helpers.py
A	api/dify_graph/nodes/variable_assigner/v2/node.py
A	api/dify_graph/repositories/__init__.py
A	api/dify_graph/repositories/datasource_manager_protocol.py
A	api/dify_graph/repositories/draft_variable_repository.py
A	api/dify_graph/repositories/human_input_form_repository.py
A	api/dify_graph/repositories/index_processor_protocol.py
A	api/dify_graph/repositories/rag_retrieval_protocol.py
A	api/dify_graph/repositories/summary_index_service_protocol.py
A	api/dify_graph/repositories/workflow_execution_repository.py
A	api/dify_graph/repositories/workflow_node_execution_repository.py
A	api/dify_graph/runtime/__init__.py
A	api/dify_graph/runtime/graph_runtime_state.py
A	api/dify_graph/runtime/graph_runtime_state_protocol.py
A	api/dify_graph/runtime/read_only_wrappers.py
A	api/dify_graph/runtime/variable_pool.py
A	api/dify_graph/system_variable.py
A	api/dify_graph/utils/__init__.py
A	api/dify_graph/utils/condition/__init__.py
A	api/dify_graph/utils/condition/entities.py
A	api/dify_graph/utils/condition/processor.py
A	api/dify_graph/variable_loader.py
A	api/dify_graph/variables/__init__.py
A	api/dify_graph/variables/consts.py
A	api/dify_graph/variables/exc.py
A	api/dify_graph/variables/input_entities.py
A	api/dify_graph/variables/segment_group.py
A	api/dify_graph/variables/segments.py
A	api/dify_graph/variables/types.py
A	api/dify_graph/variables/utils.py
A	api/dify_graph/variables/variables.py
A	api/dify_graph/workflow_type_encoder.py
M	api/docker/entrypoint.sh
M	api/events/event_handlers/delete_tool_parameters_cache_when_sync_draft_workflow.py
M	api/events/event_handlers/sync_workflow_schedule_when_app_published.py
M	api/events/event_handlers/update_app_dataset_join_when_app_model_config_updated.py
M	api/events/event_handlers/update_app_dataset_join_when_app_published_workflow_updated.py
M	api/events/event_handlers/update_app_triggers_when_app_published_workflow_updated.py
M	api/extensions/ext_redis.py
M	api/extensions/ext_sentry.py
M	api/extensions/logstore/repositories/logstore_api_workflow_node_execution_repository.py
M	api/extensions/logstore/repositories/logstore_workflow_execution_repository.py
M	api/extensions/logstore/repositories/logstore_workflow_node_execution_repository.py
M	api/extensions/otel/parser/base.py
M	api/extensions/otel/parser/llm.py
M	api/extensions/otel/parser/retrieval.py
M	api/extensions/otel/parser/tool.py
M	api/factories/file_factory.py
M	api/factories/variable_factory.py
M	api/fields/_value_type_serializer.py
M	api/fields/conversation_fields.py
M	api/fields/member_fields.py
M	api/fields/message_fields.py
M	api/fields/raws.py
M	api/fields/workflow_fields.py
A	api/libs/broadcast_channel/redis/streams_channel.py
M	api/libs/helper.py
A	api/migrations/versions/2026_02_26_1336-e288952f2994_add_partial_indexes_on_conversations_.py
M	api/models/__init__.py
M	api/models/dataset.py
M	api/models/enums.py
M	api/models/human_input.py
M	api/models/model.py
M	api/models/workflow.py
M	api/pyproject.toml
A	api/pyrefly-local-excludes.txt
D	api/pyrefly.toml
M	api/repositories/api_workflow_node_execution_repository.py
M	api/repositories/api_workflow_run_repository.py
M	api/repositories/entities/workflow_pause.py
M	api/repositories/sqlalchemy_api_workflow_node_execution_repository.py
M	api/repositories/sqlalchemy_api_workflow_run_repository.py
M	api/repositories/sqlalchemy_execution_extra_content_repository.py
M	api/services/account_service.py
M	api/services/app_dsl_service.py
M	api/services/app_generate_service.py
M	api/services/app_model_config_service.py
M	api/services/app_service.py
M	api/services/app_task_service.py
M	api/services/audio_service.py
M	api/services/clear_free_plan_tenant_expired_logs.py
M	api/services/conversation_service.py
M	api/services/conversation_variable_updater.py
M	api/services/dataset_service.py
M	api/services/datasource_provider_service.py
M	api/services/entities/knowledge_entities/knowledge_entities.py
M	api/services/entities/model_provider_entities.py
M	api/services/external_knowledge_service.py
M	api/services/file_service.py
M	api/services/hit_testing_service.py
M	api/services/human_input_delivery_test_service.py
M	api/services/human_input_service.py
M	api/services/message_service.py
M	api/services/model_load_balancing_service.py
M	api/services/model_provider_service.py
M	api/services/rag_pipeline/rag_pipeline.py
M	api/services/rag_pipeline/rag_pipeline_dsl_service.py
M	api/services/retention/workflow_run/archive_paid_plan_workflow_run.py
M	api/services/summary_index_service.py
M	api/services/tools/api_tools_manage_service.py
M	api/services/tools/workflow_tools_manage_service.py
M	api/services/trigger/schedule_service.py
M	api/services/trigger/trigger_service.py
M	api/services/trigger/webhook_service.py
M	api/services/variable_truncator.py
M	api/services/vector_service.py
M	api/services/workflow/workflow_converter.py
M	api/services/workflow_app_service.py
M	api/services/workflow_draft_variable_service.py
M	api/services/workflow_event_snapshot_service.py
M	api/services/workflow_service.py
M	api/tasks/app_generate/workflow_execute_task.py
M	api/tasks/async_workflow_tasks.py
M	api/tasks/batch_create_segment_to_index_task.py
M	api/tasks/generate_summary_index_task.py
M	api/tasks/human_input_timeout_tasks.py
M	api/tasks/mail_human_input_delivery_task.py
M	api/tasks/regenerate_summary_index_task.py
M	api/tasks/trigger_processing_tasks.py
M	api/tasks/workflow_execution_tasks.py
M	api/tasks/workflow_node_execution_tasks.py
M	api/tasks/workflow_schedule_tasks.py
M	api/tests/integration_tests/core/datasource/test_datasource_manager_integration.py
M	api/tests/integration_tests/core/workflow/nodes/datasource/test_datasource_node_integration.py
M	api/tests/integration_tests/factories/test_storage_key_loader.py
M	api/tests/integration_tests/model_runtime/__mock/plugin_model.py
M	api/tests/integration_tests/services/test_workflow_draft_variable_service.py
M	api/tests/integration_tests/tasks/test_remove_app_and_related_data_task.py
M	api/tests/integration_tests/workflow/nodes/__mock/model.py
A	api/tests/integration_tests/workflow/nodes/knowledge_index/__init__.py
A	api/tests/integration_tests/workflow/nodes/knowledge_index/test_knowledge_index_node_integration.py
M	api/tests/integration_tests/workflow/nodes/test_code.py
M	api/tests/integration_tests/workflow/nodes/test_http.py
M	api/tests/integration_tests/workflow/nodes/test_llm.py
M	api/tests/integration_tests/workflow/nodes/test_parameter_extractor.py
M	api/tests/integration_tests/workflow/nodes/test_template_transform.py
M	api/tests/integration_tests/workflow/nodes/test_tool.py
M	api/tests/test_containers_integration_tests/controllers/console/app/test_chat_conversation_status_count_api.py
M	api/tests/test_containers_integration_tests/core/app/layers/test_pause_state_persist_layer.py
M	api/tests/test_containers_integration_tests/core/rag/retrieval/test_dataset_retrieval_integration.py
M	api/tests/test_containers_integration_tests/core/repositories/test_human_input_form_repository_impl.py
M	api/tests/test_containers_integration_tests/core/workflow/test_human_input_resume_node_execution.py
M	api/tests/test_containers_integration_tests/factories/test_storage_key_loader.py
M	api/tests/test_containers_integration_tests/helpers/execution_extra_content.py
M	api/tests/test_containers_integration_tests/repositories/test_sqlalchemy_api_workflow_node_execution_repository.py
M	api/tests/test_containers_integration_tests/repositories/test_sqlalchemy_api_workflow_run_repository.py
M	api/tests/test_containers_integration_tests/services/dataset_collection_binding.py
M	api/tests/test_containers_integration_tests/services/dataset_service_update_delete.py
M	api/tests/test_containers_integration_tests/services/test_account_service.py
M	api/tests/test_containers_integration_tests/services/test_agent_service.py
M	api/tests/test_containers_integration_tests/services/test_annotation_service.py
M	api/tests/test_containers_integration_tests/services/test_api_based_extension_service.py
M	api/tests/test_containers_integration_tests/services/test_app_generate_service.py
M	api/tests/test_containers_integration_tests/services/test_app_service.py
A	api/tests/test_containers_integration_tests/services/test_dataset_permission_service.py
M	api/tests/test_containers_integration_tests/services/test_dataset_service.py
A	api/tests/test_containers_integration_tests/services/test_dataset_service_batch_update_document_status.py
A	api/tests/test_containers_integration_tests/services/test_dataset_service_delete_dataset.py
M	api/tests/test_containers_integration_tests/services/test_dataset_service_get_segments.py
M	api/tests/test_containers_integration_tests/services/test_dataset_service_retrieval.py
M	api/tests/test_containers_integration_tests/services/test_dataset_service_update_dataset.py
M	api/tests/test_containers_integration_tests/services/test_delete_archived_workflow_run.py
A	api/tests/test_containers_integration_tests/services/test_document_service_rename_document.py
M	api/tests/test_containers_integration_tests/services/test_file_service.py
M	api/tests/test_containers_integration_tests/services/test_human_input_delivery_test.py
M	api/tests/test_containers_integration_tests/services/test_message_service.py
M	api/tests/test_containers_integration_tests/services/test_messages_clean_service.py
M	api/tests/test_containers_integration_tests/services/test_metadata_service.py
M	api/tests/test_containers_integration_tests/services/test_model_load_balancing_service.py
M	api/tests/test_containers_integration_tests/services/test_model_provider_service.py
M	api/tests/test_containers_integration_tests/services/test_saved_message_service.py
M	api/tests/test_containers_integration_tests/services/test_tag_service.py
M	api/tests/test_containers_integration_tests/services/test_trigger_provider_service.py
M	api/tests/test_containers_integration_tests/services/test_web_conversation_service.py
M	api/tests/test_containers_integration_tests/services/test_webapp_auth_service.py
M	api/tests/test_containers_integration_tests/services/test_workflow_app_service.py
M	api/tests/test_containers_integration_tests/services/test_workflow_draft_variable_service.py
M	api/tests/test_containers_integration_tests/services/test_workflow_run_service.py
M	api/tests/test_containers_integration_tests/services/test_workflow_service.py
M	api/tests/test_containers_integration_tests/services/test_workspace_service.py
M	api/tests/test_containers_integration_tests/services/tools/test_api_tools_manage_service.py
M	api/tests/test_containers_integration_tests/services/tools/test_mcp_tools_manage_service.py
M	api/tests/test_containers_integration_tests/services/tools/test_tools_transform_service.py
M	api/tests/test_containers_integration_tests/services/tools/test_workflow_tools_manage_service.py
M	api/tests/test_containers_integration_tests/services/workflow/test_workflow_converter.py
M	api/tests/test_containers_integration_tests/services/workflow/test_workflow_node_execution_service_repository.py
M	api/tests/test_containers_integration_tests/tasks/test_add_document_to_index_task.py
M	api/tests/test_containers_integration_tests/tasks/test_batch_clean_document_task.py
M	api/tests/test_containers_integration_tests/tasks/test_batch_create_segment_to_index_task.py
M	api/tests/test_containers_integration_tests/tasks/test_clean_dataset_task.py
M	api/tests/test_containers_integration_tests/tasks/test_disable_segment_from_index_task.py
M	api/tests/test_containers_integration_tests/tasks/test_disable_segments_from_index_task.py
M	api/tests/test_containers_integration_tests/tasks/test_duplicate_document_indexing_task.py
M	api/tests/test_containers_integration_tests/tasks/test_enable_segments_to_index_task.py
M	api/tests/test_containers_integration_tests/tasks/test_mail_account_deletion_task.py
M	api/tests/test_containers_integration_tests/tasks/test_mail_human_input_delivery_task.py
M	api/tests/test_containers_integration_tests/tasks/test_rag_pipeline_run_tasks.py
M	api/tests/test_containers_integration_tests/tasks/test_remove_app_and_related_data_task.py
M	api/tests/test_containers_integration_tests/test_workflow_pause_integration.py
M	api/tests/test_containers_integration_tests/trigger/test_trigger_e2e.py
M	api/tests/unit_tests/controllers/console/app/test_workflow_pause_details_api.py
M	api/tests/unit_tests/controllers/console/app/workflow_draft_variables_test.py
M	api/tests/unit_tests/controllers/console/test_wraps.py
M	api/tests/unit_tests/controllers/console/workspace/test_load_balancing_config.py
M	api/tests/unit_tests/controllers/service_api/app/test_audio.py
M	api/tests/unit_tests/controllers/service_api/app/test_completion.py
M	api/tests/unit_tests/controllers/service_api/app/test_workflow.py
M	api/tests/unit_tests/controllers/service_api/app/test_workflow_fields.py
M	api/tests/unit_tests/core/agent/output_parser/test_cot_output_parser.py
M	api/tests/unit_tests/core/app/app_config/features/file_upload/test_manager.py
M	api/tests/unit_tests/core/app/apps/advanced_chat/test_app_runner_conversation_variables.py
M	api/tests/unit_tests/core/app/apps/advanced_chat/test_generate_task_pipeline_extra_contents.py
M	api/tests/unit_tests/core/app/apps/chat/test_base_app_runner_multimodal.py
M	api/tests/unit_tests/core/app/apps/common/test_graph_runtime_state_support.py
M	api/tests/unit_tests/core/app/apps/common/test_workflow_response_converter.py
M	api/tests/unit_tests/core/app/apps/common/test_workflow_response_converter_human_input.py
M	api/tests/unit_tests/core/app/apps/common/test_workflow_response_converter_resumption.py
M	api/tests/unit_tests/core/app/apps/common/test_workflow_response_converter_truncation.py
M	api/tests/unit_tests/core/app/apps/test_base_app_generator.py
M	api/tests/unit_tests/core/app/apps/test_pause_resume.py
M	api/tests/unit_tests/core/app/apps/test_workflow_app_runner_notifications.py
M	api/tests/unit_tests/core/app/apps/test_workflow_app_runner_single_node.py
M	api/tests/unit_tests/core/app/apps/test_workflow_pause_events.py
M	api/tests/unit_tests/core/app/apps/workflow/test_generate_task_pipeline.py
M	api/tests/unit_tests/core/app/layers/test_conversation_variable_persist_layer.py
M	api/tests/unit_tests/core/app/layers/test_pause_state_persist_layer.py
M	api/tests/unit_tests/core/app/task_pipeline/test_easy_ui_based_generate_task_pipeline.py
M	api/tests/unit_tests/core/datasource/test_datasource_manager.py
M	api/tests/unit_tests/core/file/test_models.py
M	api/tests/unit_tests/core/mcp/server/test_streamable_http.py
M	api/tests/unit_tests/core/model_runtime/__base/test_increase_tool_call.py
M	api/tests/unit_tests/core/model_runtime/__base/test_large_language_model_non_stream_parsing.py
M	api/tests/unit_tests/core/model_runtime/entities/test_llm_entities.py
M	api/tests/unit_tests/core/ops/test_arize_phoenix_trace.py
M	api/tests/unit_tests/core/plugin/test_plugin_runtime.py
M	api/tests/unit_tests/core/prompt/test_advanced_prompt_transform.py
M	api/tests/unit_tests/core/prompt/test_agent_history_prompt_transform.py
M	api/tests/unit_tests/core/prompt/test_prompt_message.py
M	api/tests/unit_tests/core/prompt/test_prompt_transform.py
M	api/tests/unit_tests/core/prompt/test_simple_prompt_transform.py
M	api/tests/unit_tests/core/rag/embedding/test_embedding_service.py
M	api/tests/unit_tests/core/rag/indexing/test_indexing_runner.py
M	api/tests/unit_tests/core/rag/rerank/test_reranker.py
M	api/tests/unit_tests/core/rag/retrieval/test_dataset_retrieval_methods.py
M	api/tests/unit_tests/core/repositories/test_celery_workflow_execution_repository.py
M	api/tests/unit_tests/core/repositories/test_celery_workflow_node_execution_repository.py
M	api/tests/unit_tests/core/repositories/test_factory.py
M	api/tests/unit_tests/core/repositories/test_human_input_form_repository_impl.py
M	api/tests/unit_tests/core/repositories/test_workflow_node_execution_conflict_handling.py
M	api/tests/unit_tests/core/repositories/test_workflow_node_execution_truncation.py
M	api/tests/unit_tests/core/test_file.py
M	api/tests/unit_tests/core/test_model_manager.py
M	api/tests/unit_tests/core/test_provider_configuration.py
M	api/tests/unit_tests/core/test_provider_manager.py
M	api/tests/unit_tests/core/test_trigger_debug_event_selectors.py
M	api/tests/unit_tests/core/variables/test_segment.py
M	api/tests/unit_tests/core/variables/test_segment_type.py
M	api/tests/unit_tests/core/variables/test_segment_type_validation.py
M	api/tests/unit_tests/core/variables/test_variables.py
M	api/tests/unit_tests/core/workflow/context/test_execution_context.py
M	api/tests/unit_tests/core/workflow/entities/test_graph_runtime_state.py
M	api/tests/unit_tests/core/workflow/entities/test_pause_reason.py
M	api/tests/unit_tests/core/workflow/entities/test_template.py
M	api/tests/unit_tests/core/workflow/entities/test_variable_pool.py
M	api/tests/unit_tests/core/workflow/entities/test_workflow_node_execution.py
M	api/tests/unit_tests/core/workflow/graph/test_graph.py
M	api/tests/unit_tests/core/workflow/graph/test_graph_builder.py
M	api/tests/unit_tests/core/workflow/graph/test_graph_skip_validation.py
M	api/tests/unit_tests/core/workflow/graph/test_graph_validation.py
M	api/tests/unit_tests/core/workflow/graph_engine/README.md
M	api/tests/unit_tests/core/workflow/graph_engine/command_channels/test_redis_channel.py
M	api/tests/unit_tests/core/workflow/graph_engine/event_management/test_event_handlers.py
M	api/tests/unit_tests/core/workflow/graph_engine/event_management/test_event_manager.py
M	api/tests/unit_tests/core/workflow/graph_engine/graph_traversal/test_skip_propagator.py
M	api/tests/unit_tests/core/workflow/graph_engine/human_input_test_utils.py
M	api/tests/unit_tests/core/workflow/graph_engine/layers/conftest.py
M	api/tests/unit_tests/core/workflow/graph_engine/layers/test_layer_initialization.py
M	api/tests/unit_tests/core/workflow/graph_engine/layers/test_llm_quota.py
M	api/tests/unit_tests/core/workflow/graph_engine/layers/test_observability.py
M	api/tests/unit_tests/core/workflow/graph_engine/orchestration/test_dispatcher.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_answer_end_with_text.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_auto_mock_system.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_basic_chatflow.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_command_system.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_complex_branch_workflow.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_conditional_streaming_vs_template_workflow.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_dispatcher_pause_drain.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_end_node_without_value_type.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_execution_coordinator.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_graph_engine.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_graph_execution_serialization.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_graph_state_snapshot.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_human_input_pause_multi_branch.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_human_input_pause_single_branch.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_if_else_streaming.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_loop_contains_answer.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_loop_with_tool.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_config.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_factory.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_iteration_simple.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_nodes.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_nodes_template_code.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_simple.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_parallel_human_input_join_resume.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_parallel_human_input_pause_missing_finish.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_parallel_streaming_workflow.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_pause_deferred_ready_nodes.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_pause_resume_state.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_redis_stop_integration.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_streaming_conversation_variables.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_table_runner.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_tool_in_chatflow.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_variable_aggregator.py
M	api/tests/unit_tests/core/workflow/nodes/answer/test_answer.py
M	api/tests/unit_tests/core/workflow/nodes/base/test_base_node.py
M	api/tests/unit_tests/core/workflow/nodes/base/test_get_node_type_classes_mapping.py
M	api/tests/unit_tests/core/workflow/nodes/code/code_node_spec.py
M	api/tests/unit_tests/core/workflow/nodes/code/entities_spec.py
M	api/tests/unit_tests/core/workflow/nodes/datasource/test_datasource_node.py
M	api/tests/unit_tests/core/workflow/nodes/http_request/test_config.py
M	api/tests/unit_tests/core/workflow/nodes/http_request/test_entities.py
M	api/tests/unit_tests/core/workflow/nodes/http_request/test_http_request_executor.py
M	api/tests/unit_tests/core/workflow/nodes/http_request/test_http_request_node.py
M	api/tests/unit_tests/core/workflow/nodes/human_input/test_email_delivery_config.py
M	api/tests/unit_tests/core/workflow/nodes/human_input/test_entities.py
M	api/tests/unit_tests/core/workflow/nodes/human_input/test_human_input_form_filled_event.py
M	api/tests/unit_tests/core/workflow/nodes/iteration/entities_spec.py
M	api/tests/unit_tests/core/workflow/nodes/iteration/iteration_node_spec.py
A	api/tests/unit_tests/core/workflow/nodes/iteration/test_iteration_child_engine_errors.py
A	api/tests/unit_tests/core/workflow/nodes/knowledge_index/__init__.py
A	api/tests/unit_tests/core/workflow/nodes/knowledge_index/test_knowledge_index_node.py
M	api/tests/unit_tests/core/workflow/nodes/knowledge_retrieval/test_knowledge_retrieval_node.py
M	api/tests/unit_tests/core/workflow/nodes/list_operator/node_spec.py
M	api/tests/unit_tests/core/workflow/nodes/llm/test_file_saver.py
M	api/tests/unit_tests/core/workflow/nodes/llm/test_node.py
M	api/tests/unit_tests/core/workflow/nodes/llm/test_scenarios.py
M	api/tests/unit_tests/core/workflow/nodes/parameter_extractor/test_entities.py
M	api/tests/unit_tests/core/workflow/nodes/parameter_extractor/test_parameter_extractor_node.py
M	api/tests/unit_tests/core/workflow/nodes/template_transform/entities_spec.py
M	api/tests/unit_tests/core/workflow/nodes/template_transform/template_transform_node_spec.py
M	api/tests/unit_tests/core/workflow/nodes/test_base_node.py
M	api/tests/unit_tests/core/workflow/nodes/test_document_extractor_node.py
M	api/tests/unit_tests/core/workflow/nodes/test_if_else.py
M	api/tests/unit_tests/core/workflow/nodes/test_list_operator.py
M	api/tests/unit_tests/core/workflow/nodes/test_question_classifier_node.py
M	api/tests/unit_tests/core/workflow/nodes/test_start_node_json_object.py
M	api/tests/unit_tests/core/workflow/nodes/tool/test_tool_node.py
M	api/tests/unit_tests/core/workflow/nodes/variable_assigner/v1/test_variable_assigner_v1.py
M	api/tests/unit_tests/core/workflow/nodes/variable_assigner/v2/test_helpers.py
M	api/tests/unit_tests/core/workflow/nodes/variable_assigner/v2/test_variable_assigner_v2.py
M	api/tests/unit_tests/core/workflow/nodes/webhook/test_entities.py
M	api/tests/unit_tests/core/workflow/nodes/webhook/test_exceptions.py
M	api/tests/unit_tests/core/workflow/nodes/webhook/test_webhook_file_conversion.py
M	api/tests/unit_tests/core/workflow/nodes/webhook/test_webhook_node.py
M	api/tests/unit_tests/core/workflow/test_enums.py
M	api/tests/unit_tests/core/workflow/test_system_variable.py
M	api/tests/unit_tests/core/workflow/test_system_variable_read_only_view.py
M	api/tests/unit_tests/core/workflow/test_variable_pool.py
M	api/tests/unit_tests/core/workflow/test_workflow_entry.py
M	api/tests/unit_tests/core/workflow/test_workflow_entry_redis_channel.py
M	api/tests/unit_tests/core/workflow/utils/test_condition.py
M	api/tests/unit_tests/core/workflow/utils/test_variable_template_parser.py
M	api/tests/unit_tests/factories/test_variable_factory.py
M	api/tests/unit_tests/libs/_human_input/support.py
M	api/tests/unit_tests/libs/_human_input/test_form_service.py
M	api/tests/unit_tests/libs/_human_input/test_models.py
A	api/tests/unit_tests/libs/broadcast_channel/redis/test_streams_channel_unit_tests.py
M	api/tests/unit_tests/libs/test_cron_compatibility.py
M	api/tests/unit_tests/models/test_app_models.py
M	api/tests/unit_tests/models/test_conversation_variable.py
M	api/tests/unit_tests/models/test_workflow.py
M	api/tests/unit_tests/models/test_workflow_models.py
M	api/tests/unit_tests/repositories/test_sqlalchemy_api_workflow_run_repository.py
M	api/tests/unit_tests/repositories/test_sqlalchemy_execution_extra_content_repository.py
M	api/tests/unit_tests/repositories/workflow_node_execution/test_sqlalchemy_repository.py
M	api/tests/unit_tests/repositories/workflow_node_execution/test_sqlalchemy_workflow_node_execution_repository.py
M	api/tests/unit_tests/services/dataset_permission_service.py
M	api/tests/unit_tests/services/document_service_validation.py
M	api/tests/unit_tests/services/external_dataset_service.py
M	api/tests/unit_tests/services/test_account_service.py
A	api/tests/unit_tests/services/test_app_generate_service_streaming_integration.py
M	api/tests/unit_tests/services/test_dataset_service_batch_update_document_status.py
M	api/tests/unit_tests/services/test_dataset_service_create_dataset.py
D	api/tests/unit_tests/services/test_dataset_service_delete_dataset.py
D	api/tests/unit_tests/services/test_document_service_rename_document.py
M	api/tests/unit_tests/services/test_human_input_delivery_test_service.py
M	api/tests/unit_tests/services/test_human_input_service.py
M	api/tests/unit_tests/services/test_model_provider_service_sanitization.py
M	api/tests/unit_tests/services/test_schedule_service.py
M	api/tests/unit_tests/services/test_variable_truncator.py
M	api/tests/unit_tests/services/test_workflow_run_service_pause.py
M	api/tests/unit_tests/services/test_workflow_service.py
M	api/tests/unit_tests/services/workflow/test_draft_var_loader_simple.py
M	api/tests/unit_tests/services/workflow/test_workflow_converter.py
M	api/tests/unit_tests/services/workflow/test_workflow_draft_variable_service.py
M	api/tests/unit_tests/services/workflow/test_workflow_event_snapshot_service.py
M	api/tests/unit_tests/services/workflow/test_workflow_human_input_delivery.py
M	api/tests/unit_tests/services/workflow/test_workflow_service.py
M	api/tests/unit_tests/tasks/test_duplicate_document_indexing_task.py
M	api/tests/unit_tests/tasks/test_human_input_timeout_tasks.py
A	api/tests/unit_tests/tasks/test_summary_queue_isolation.py
M	api/tests/unit_tests/tasks/test_workflow_execute_task.py
M	api/tests/unit_tests/tasks/test_workflow_node_execution_tasks.py
M	api/tests/unit_tests/tools/test_mcp_tool.py
M	api/tests/unit_tests/utils/structured_output_parser/test_structured_output_parser.py
A	api/tests/workflow_test_utils.py
M	api/uv.lock
A	dev/pyrefly-check-local
M	dev/start-worker
M	docker/.env.example
M	docker/docker-compose.yaml
M	docker/middleware.env.example
M	web/.nvmrc
M	web/Dockerfile
M	web/__tests__/apps/app-card-operations-flow.test.tsx
M	web/__tests__/apps/app-list-browsing-flow.test.tsx
M	web/__tests__/apps/create-app-flow.test.tsx
M	web/__tests__/datasets/document-management.test.tsx
M	web/__tests__/rag-pipeline/dsl-export-import-flow.test.ts
M	web/__tests__/tools/tool-browsing-and-filtering.test.tsx
M	web/app/(commonLayout)/app/(appDetailLayout)/[appId]/layout-main.tsx
M	web/app/(commonLayout)/app/(appDetailLayout)/[appId]/overview/card-view.tsx
M	web/app/(commonLayout)/layout.tsx
M	web/app/account/(commonLayout)/account-page/AvatarWithEdit.tsx
M	web/app/account/(commonLayout)/account-page/email-change-modal.tsx
M	web/app/account/(commonLayout)/account-page/index.tsx
M	web/app/account/(commonLayout)/layout.tsx
M	web/app/account/oauth/authorize/layout.tsx
M	web/app/components/app-initializer.tsx
A	web/app/components/app-sidebar/__tests__/app-sidebar-dropdown.spec.tsx
A	web/app/components/app-sidebar/__tests__/basic.spec.tsx
A	web/app/components/app-sidebar/__tests__/dataset-sidebar-dropdown.spec.tsx
A	web/app/components/app-sidebar/__tests__/index.spec.tsx
A	web/app/components/app-sidebar/__tests__/sidebar-animation-issues.spec.tsx
A	web/app/components/app-sidebar/__tests__/text-squeeze-fix-verification.spec.tsx
A	web/app/components/app-sidebar/__tests__/toggle-button.spec.tsx
D	web/app/components/app-sidebar/app-info.tsx
A	web/app/components/app-sidebar/app-info/__tests__/app-info-detail-panel.spec.tsx
A	web/app/components/app-sidebar/app-info/__tests__/app-info-modals.spec.tsx
A	web/app/components/app-sidebar/app-info/__tests__/app-info-trigger.spec.tsx
A	web/app/components/app-sidebar/app-info/__tests__/app-mode-labels.spec.ts
A	web/app/components/app-sidebar/app-info/__tests__/app-operations.spec.tsx
A	web/app/components/app-sidebar/app-info/__tests__/index.spec.tsx
A	web/app/components/app-sidebar/app-info/__tests__/use-app-info-actions.spec.ts
A	web/app/components/app-sidebar/app-info/app-info-detail-panel.tsx
A	web/app/components/app-sidebar/app-info/app-info-modals.tsx
A	web/app/components/app-sidebar/app-info/app-info-trigger.tsx
A	web/app/components/app-sidebar/app-info/app-mode-labels.ts
A	web/app/components/app-sidebar/app-info/app-operations.tsx
A	web/app/components/app-sidebar/app-info/index.tsx
A	web/app/components/app-sidebar/app-info/use-app-info-actions.ts
D	web/app/components/app-sidebar/app-operations.tsx
M	web/app/components/app-sidebar/app-sidebar-dropdown.tsx
M	web/app/components/app-sidebar/basic.tsx
D	web/app/components/app-sidebar/completion.png
A	web/app/components/app-sidebar/dataset-info/__tests__/dropdown-callbacks.spec.tsx
A	web/app/components/app-sidebar/dataset-info/__tests__/index.spec.tsx
D	web/app/components/app-sidebar/dataset-info/index.spec.tsx
M	web/app/components/app-sidebar/dataset-info/index.tsx
M	web/app/components/app-sidebar/dataset-info/menu-item.tsx
M	web/app/components/app-sidebar/dataset-sidebar-dropdown.tsx
D	web/app/components/app-sidebar/expert.png
M	web/app/components/app-sidebar/index.tsx
A	web/app/components/app-sidebar/nav-link/__tests__/index.spec.tsx
A	web/app/components/app-sidebar/nav-link/index.tsx
D	web/app/components/app-sidebar/navLink.spec.tsx
D	web/app/components/app-sidebar/navLink.tsx
D	web/app/components/app-sidebar/sidebar-animation-issues.spec.tsx
D	web/app/components/app-sidebar/style.module.css
D	web/app/components/app-sidebar/text-squeeze-fix-verification.spec.tsx
M	web/app/components/app-sidebar/toggle-button.tsx
M	web/app/components/app/annotation/batch-add-annotation-modal/csv-uploader.spec.tsx
M	web/app/components/app/annotation/batch-add-annotation-modal/csv-uploader.tsx
M	web/app/components/app/configuration/config-prompt/advanced-prompt-input.tsx
M	web/app/components/app/configuration/config-prompt/simple-prompt-input.tsx
M	web/app/components/app/configuration/config/agent/prompt-editor.tsx
M	web/app/components/app/configuration/dataset-config/settings-modal/index.spec.tsx
M	web/app/components/app/configuration/dataset-config/settings-modal/index.tsx
A	web/app/components/app/configuration/debug/debug-with-multiple-model/context-provider.tsx
M	web/app/components/app/configuration/debug/debug-with-multiple-model/context.spec.tsx
A	web/app/components/app/configuration/debug/debug-with-multiple-model/context.ts
D	web/app/components/app/configuration/debug/debug-with-multiple-model/context.tsx
M	web/app/components/app/configuration/debug/debug-with-multiple-model/index.tsx
M	web/app/components/app/configuration/debug/debug-with-single-model/index.spec.tsx
M	web/app/components/app/configuration/debug/index.tsx
M	web/app/components/app/configuration/index.tsx
M	web/app/components/app/configuration/tools/external-data-tool-modal.tsx
M	web/app/components/app/configuration/tools/index.tsx
M	web/app/components/app/create-app-modal/index.spec.tsx
M	web/app/components/app/create-app-modal/index.tsx
M	web/app/components/app/create-from-dsl-modal/index.tsx
M	web/app/components/app/create-from-dsl-modal/uploader.tsx
M	web/app/components/app/log/list.tsx
M	web/app/components/app/overview/settings/index.spec.tsx
M	web/app/components/app/overview/settings/index.tsx
M	web/app/components/app/switch-app-modal/index.spec.tsx
M	web/app/components/app/switch-app-modal/index.tsx
M	web/app/components/apps/__tests__/app-card.spec.tsx
M	web/app/components/apps/__tests__/list.spec.tsx
M	web/app/components/apps/app-card.tsx
M	web/app/components/apps/hooks/__tests__/use-apps-query-state.spec.tsx
M	web/app/components/apps/list.tsx
M	web/app/components/base/agent-log-modal/__tests__/detail.spec.tsx
M	web/app/components/base/agent-log-modal/__tests__/index.spec.tsx
M	web/app/components/base/agent-log-modal/detail.tsx
M	web/app/components/base/button/__tests__/index.spec.tsx
M	web/app/components/base/button/index.css
M	web/app/components/base/button/index.stories.tsx
M	web/app/components/base/button/index.tsx
A	web/app/components/base/chat/chat-with-history/context.ts
D	web/app/components/base/chat/chat-with-history/context.tsx
M	web/app/components/base/chat/chat-with-history/hooks.tsx
M	web/app/components/base/chat/chat/__tests__/context.spec.tsx
M	web/app/components/base/chat/chat/__tests__/question.spec.tsx
M	web/app/components/base/chat/chat/chat-input-area/__tests__/index.spec.tsx
M	web/app/components/base/chat/chat/chat-input-area/index.tsx
M	web/app/components/base/chat/chat/check-input-forms-hooks.ts
A	web/app/components/base/chat/chat/context-provider.tsx
A	web/app/components/base/chat/chat/context.ts
D	web/app/components/base/chat/chat/context.tsx
M	web/app/components/base/chat/chat/hooks.ts
M	web/app/components/base/chat/chat/index.tsx
A	web/app/components/base/chat/embedded-chatbot/context.ts
D	web/app/components/base/chat/embedded-chatbot/context.tsx
M	web/app/components/base/chat/embedded-chatbot/hooks.tsx
M	web/app/components/base/chat/embedded-chatbot/inputs-form/__tests__/content.spec.tsx
M	web/app/components/base/confirm/index.tsx
M	web/app/components/base/features/new-feature-panel/moderation/__tests__/moderation-setting-modal.spec.tsx
M	web/app/components/base/features/new-feature-panel/moderation/moderation-setting-modal.tsx
M	web/app/components/base/file-uploader/__tests__/hooks.spec.ts
M	web/app/components/base/file-uploader/hooks.ts
M	web/app/components/base/form/hooks/__tests__/use-check-validated.spec.ts
M	web/app/components/base/form/hooks/use-check-validated.ts
M	web/app/components/base/image-uploader/__tests__/hooks.spec.ts
M	web/app/components/base/image-uploader/hooks.ts
M	web/app/components/base/markdown-blocks/__tests__/button.spec.tsx
M	web/app/components/base/markdown-blocks/__tests__/think-block.spec.tsx
M	web/app/components/base/markdown-blocks/think-block.stories.tsx
M	web/app/components/base/modal/index.tsx
M	web/app/components/base/modal/modal.tsx
M	web/app/components/base/portal-to-follow-elem/index.tsx
M	web/app/components/base/prompt-editor/plugins/component-picker-block/__tests__/index.spec.tsx
A	web/app/components/base/radio/context/index.ts
D	web/app/components/base/radio/context/index.tsx
M	web/app/components/base/select/index.tsx
M	web/app/components/base/tag-input/__tests__/index.spec.tsx
M	web/app/components/base/tag-input/index.tsx
M	web/app/components/base/tag-management/__tests__/panel.spec.tsx
M	web/app/components/base/tag-management/__tests__/selector.spec.tsx
M	web/app/components/base/tag-management/index.tsx
M	web/app/components/base/tag-management/panel.tsx
M	web/app/components/base/tag-management/tag-item-editor.tsx
M	web/app/components/base/text-generation/__tests__/hooks.spec.ts
M	web/app/components/base/text-generation/hooks.ts
M	web/app/components/base/theme-switcher.tsx
M	web/app/components/base/toast/__tests__/index.spec.tsx
A	web/app/components/base/toast/context.ts
M	web/app/components/base/toast/index.stories.tsx
M	web/app/components/base/toast/index.tsx
M	web/app/components/base/tooltip/index.tsx
A	web/app/components/base/ui/alert-dialog/__tests__/index.spec.tsx
A	web/app/components/base/ui/alert-dialog/index.tsx
A	web/app/components/base/ui/dialog/__tests__/index.spec.tsx
A	web/app/components/base/ui/dialog/index.tsx
A	web/app/components/base/ui/dropdown-menu/__tests__/index.spec.tsx
A	web/app/components/base/ui/dropdown-menu/index.stories.tsx
A	web/app/components/base/ui/dropdown-menu/index.tsx
A	web/app/components/base/ui/placement.ts
A	web/app/components/base/ui/popover/__tests__/index.spec.tsx
A	web/app/components/base/ui/popover/index.tsx
A	web/app/components/base/ui/select/__tests__/index.spec.tsx
A	web/app/components/base/ui/select/index.tsx
A	web/app/components/base/ui/tooltip/__tests__/index.spec.tsx
A	web/app/components/base/ui/tooltip/index.tsx
M	web/app/components/custom/custom-web-app-brand/__tests__/index.spec.tsx
M	web/app/components/custom/custom-web-app-brand/index.tsx
M	web/app/components/datasets/create-from-pipeline/create-options/create-from-dsl-modal/__tests__/uploader.spec.tsx
M	web/app/components/datasets/create-from-pipeline/create-options/create-from-dsl-modal/hooks/use-dsl-import.ts
M	web/app/components/datasets/create-from-pipeline/create-options/create-from-dsl-modal/uploader.tsx
M	web/app/components/datasets/create/empty-dataset-creation-modal/index.tsx
M	web/app/components/datasets/create/file-uploader/hooks/__tests__/use-file-upload.spec.tsx
M	web/app/components/datasets/create/file-uploader/hooks/use-file-upload.ts
M	web/app/components/datasets/create/step-two/__tests__/index.spec.tsx
M	web/app/components/datasets/documents/__tests__/index.spec.tsx
M	web/app/components/datasets/documents/components/__tests__/list.spec.tsx
M	web/app/components/datasets/documents/components/__tests__/operations.spec.tsx
M	web/app/components/datasets/documents/components/document-list/__tests__/index.spec.tsx
M	web/app/components/datasets/documents/components/document-list/components/__tests__/document-table-row.spec.tsx
M	web/app/components/datasets/documents/components/document-list/components/__tests__/sort-header.spec.tsx
M	web/app/components/datasets/documents/components/document-list/components/document-table-row.tsx
M	web/app/components/datasets/documents/components/document-list/components/sort-header.tsx
M	web/app/components/datasets/documents/components/document-list/hooks/__tests__/use-document-sort.spec.ts
M	web/app/components/datasets/documents/components/document-list/hooks/use-document-sort.ts
M	web/app/components/datasets/documents/components/list.tsx
M	web/app/components/datasets/documents/components/operations.tsx
M	web/app/components/datasets/documents/create-from-pipeline/data-source/local-file/hooks/__tests__/use-local-file-upload.spec.tsx
M	web/app/components/datasets/documents/detail/__tests__/index.spec.tsx
M	web/app/components/datasets/documents/detail/batch-modal/__tests__/csv-uploader.spec.tsx
M	web/app/components/datasets/documents/detail/batch-modal/csv-uploader.tsx
M	web/app/components/datasets/documents/detail/completed/__tests__/index.spec.tsx
M	web/app/components/datasets/documents/detail/completed/common/__tests__/regeneration-modal.spec.tsx
M	web/app/components/datasets/documents/detail/completed/hooks/__tests__/use-child-segment-data.spec.ts
M	web/app/components/datasets/documents/detail/completed/hooks/__tests__/use-segment-list-data.spec.ts
M	web/app/components/datasets/documents/detail/completed/hooks/use-child-segment-data.ts
M	web/app/components/datasets/documents/detail/completed/hooks/use-segment-list-data.ts
M	web/app/components/datasets/documents/detail/completed/new-child-segment.tsx
M	web/app/components/datasets/documents/detail/embedding/index.tsx
M	web/app/components/datasets/documents/detail/index.tsx
M	web/app/components/datasets/documents/detail/metadata/hooks/__tests__/use-metadata-state.spec.ts
M	web/app/components/datasets/documents/detail/metadata/hooks/use-metadata-state.ts
M	web/app/components/datasets/documents/detail/new-segment.tsx
D	web/app/components/datasets/documents/hooks/__tests__/use-document-list-query-state.spec.ts
A	web/app/components/datasets/documents/hooks/__tests__/use-document-list-query-state.spec.tsx
M	web/app/components/datasets/documents/hooks/__tests__/use-documents-page-state.spec.ts
M	web/app/components/datasets/documents/hooks/use-document-list-query-state.ts
M	web/app/components/datasets/documents/hooks/use-documents-page-state.ts
M	web/app/components/datasets/documents/index.tsx
M	web/app/components/datasets/documents/status-item/index.tsx
M	web/app/components/datasets/external-api/external-api-modal/__tests__/index.spec.tsx
M	web/app/components/datasets/external-api/external-api-modal/index.tsx
M	web/app/components/datasets/external-knowledge-base/connector/__tests__/index.spec.tsx
M	web/app/components/datasets/external-knowledge-base/connector/index.tsx
M	web/app/components/datasets/hit-testing/__tests__/index.spec.tsx
A	web/app/components/devtools/react-grab/loader.tsx
M	web/app/components/devtools/react-scan/loader.tsx
D	web/app/components/devtools/react-scan/scan.tsx
M	web/app/components/explore/app-list/__tests__/index.spec.tsx
M	web/app/components/goto-anything/actions/commands/slash.tsx
M	web/app/components/header/account-dropdown/compliance.spec.tsx
M	web/app/components/header/account-dropdown/compliance.tsx
M	web/app/components/header/account-dropdown/index.spec.tsx
M	web/app/components/header/account-dropdown/index.tsx
A	web/app/components/header/account-dropdown/menu-item-content.tsx
M	web/app/components/header/account-dropdown/support.spec.tsx
M	web/app/components/header/account-dropdown/support.tsx
M	web/app/components/header/account-dropdown/workplace-selector/index.spec.tsx
M	web/app/components/header/account-dropdown/workplace-selector/index.tsx
M	web/app/components/header/account-setting/api-based-extension-page/modal.spec.tsx
M	web/app/components/header/account-setting/api-based-extension-page/modal.tsx
M	web/app/components/header/account-setting/language-page/index.tsx
M	web/app/components/header/account-setting/members-page/edit-workspace-modal/index.spec.tsx
M	web/app/components/header/account-setting/members-page/edit-workspace-modal/index.tsx
M	web/app/components/header/account-setting/members-page/invite-modal/index.spec.tsx
M	web/app/components/header/account-setting/members-page/invite-modal/index.tsx
M	web/app/components/header/account-setting/members-page/operation/index.spec.tsx
M	web/app/components/header/account-setting/members-page/operation/index.tsx
M	web/app/components/header/account-setting/members-page/transfer-ownership-modal/index.spec.tsx
M	web/app/components/header/account-setting/members-page/transfer-ownership-modal/index.tsx
M	web/app/components/header/account-setting/model-provider-page/index.tsx
M	web/app/components/header/account-setting/model-provider-page/model-auth/hooks/use-auth.spec.tsx
M	web/app/components/header/account-setting/model-provider-page/model-auth/hooks/use-auth.ts
M	web/app/components/header/account-setting/model-provider-page/provider-added-card/credential-panel.spec.tsx
M	web/app/components/header/account-setting/model-provider-page/provider-added-card/credential-panel.tsx
M	web/app/components/header/account-setting/model-provider-page/provider-added-card/model-load-balancing-modal.spec.tsx
M	web/app/components/header/account-setting/model-provider-page/provider-added-card/model-load-balancing-modal.tsx
M	web/app/components/header/account-setting/model-provider-page/system-model-selector/index.spec.tsx
M	web/app/components/header/account-setting/model-provider-page/system-model-selector/index.tsx
M	web/app/components/header/account-setting/plugin-page/SerpapiPlugin.spec.tsx
M	web/app/components/header/account-setting/plugin-page/SerpapiPlugin.tsx
M	web/app/components/header/account-setting/plugin-page/index.spec.tsx
M	web/app/components/header/index.spec.tsx
M	web/app/components/header/index.tsx
M	web/app/components/header/utils/util.ts
M	web/app/components/plugins/marketplace/__tests__/atoms.spec.tsx
M	web/app/components/plugins/marketplace/__tests__/plugin-type-switch.spec.tsx
M	web/app/components/plugins/marketplace/__tests__/state.spec.tsx
M	web/app/components/plugins/marketplace/__tests__/sticky-search-and-switch-wrapper.spec.tsx
M	web/app/components/plugins/marketplace/hydration-server.tsx
M	web/app/components/plugins/marketplace/search-params.ts
M	web/app/components/plugins/plugin-auth/__tests__/authorized-in-node.spec.tsx
M	web/app/components/plugins/plugin-auth/__tests__/plugin-auth-in-agent.spec.tsx
M	web/app/components/plugins/plugin-auth/authorize/__tests__/api-key-modal.spec.tsx
M	web/app/components/plugins/plugin-auth/authorize/__tests__/authorize-components.spec.tsx
M	web/app/components/plugins/plugin-auth/authorize/__tests__/oauth-client-settings.spec.tsx
M	web/app/components/plugins/plugin-auth/authorize/api-key-modal.tsx
M	web/app/components/plugins/plugin-auth/authorize/oauth-client-settings.tsx
M	web/app/components/plugins/plugin-auth/authorized/__tests__/index.spec.tsx
M	web/app/components/plugins/plugin-auth/authorized/index.tsx
M	web/app/components/plugins/plugin-auth/hooks/__tests__/use-plugin-auth-action.spec.ts
M	web/app/components/plugins/plugin-auth/hooks/use-plugin-auth-action.ts
M	web/app/components/plugins/plugin-detail-panel/subscription-list/edit/__tests__/apikey-edit-modal.spec.tsx
M	web/app/components/plugins/plugin-detail-panel/subscription-list/edit/__tests__/manual-edit-modal.spec.tsx
M	web/app/components/plugins/plugin-detail-panel/subscription-list/edit/__tests__/oauth-edit-modal.spec.tsx
M	web/app/components/plugins/plugin-detail-panel/tool-selector/components/__tests__/tool-credentials-form.spec.tsx
M	web/app/components/plugins/plugin-page/__tests__/context.spec.tsx
M	web/app/components/plugins/plugin-page/__tests__/index.spec.tsx
A	web/app/components/plugins/plugin-page/context-provider.tsx
A	web/app/components/plugins/plugin-page/context.ts
D	web/app/components/plugins/plugin-page/context.tsx
M	web/app/components/plugins/plugin-page/index.tsx
D	web/app/components/provider/serwist.tsx
M	web/app/components/rag-pipeline/components/__tests__/index.spec.tsx
M	web/app/components/rag-pipeline/components/__tests__/update-dsl-modal.spec.tsx
M	web/app/components/rag-pipeline/components/rag-pipeline-header/__tests__/index.spec.tsx
M	web/app/components/rag-pipeline/components/rag-pipeline-header/publisher/__tests__/index.spec.tsx
M	web/app/components/rag-pipeline/components/rag-pipeline-header/publisher/__tests__/popup.spec.tsx
M	web/app/components/rag-pipeline/components/rag-pipeline-header/publisher/popup.tsx
M	web/app/components/rag-pipeline/hooks/__tests__/index.spec.ts
M	web/app/components/rag-pipeline/hooks/__tests__/use-DSL.spec.ts
M	web/app/components/rag-pipeline/hooks/__tests__/use-update-dsl-modal.spec.ts
M	web/app/components/rag-pipeline/hooks/use-DSL.ts
M	web/app/components/rag-pipeline/hooks/use-update-dsl-modal.ts
M	web/app/components/tools/__tests__/provider-list.spec.tsx
M	web/app/components/tools/provider-list.tsx
M	web/app/components/workflow-app/components/workflow-children.tsx
M	web/app/components/workflow-app/components/workflow-header/__tests__/features-trigger.spec.tsx
M	web/app/components/workflow-app/components/workflow-header/features-trigger.tsx
M	web/app/components/workflow-app/components/workflow-onboarding-modal/__tests__/index.spec.tsx
M	web/app/components/workflow-app/components/workflow-onboarding-modal/__tests__/start-node-option.spec.tsx
M	web/app/components/workflow-app/components/workflow-onboarding-modal/index.tsx
M	web/app/components/workflow-app/components/workflow-onboarding-modal/start-node-option.tsx
M	web/app/components/workflow-app/components/workflow-onboarding-modal/start-node-selection-panel.tsx
A	web/app/components/workflow-app/hooks/__tests__/use-nodes-sync-draft.spec.ts
A	web/app/components/workflow-app/hooks/__tests__/use-workflow-init.spec.ts
A	web/app/components/workflow-app/hooks/__tests__/use-workflow-refresh-draft.spec.ts
M	web/app/components/workflow-app/hooks/use-DSL.ts
M	web/app/components/workflow-app/hooks/use-nodes-sync-draft.ts
M	web/app/components/workflow-app/hooks/use-workflow-init.ts
M	web/app/components/workflow-app/hooks/use-workflow-refresh-draft.ts
A	web/app/components/workflow/__tests__/fixtures.ts
A	web/app/components/workflow/__tests__/reactflow-mock-state.ts
A	web/app/components/workflow/__tests__/service-mock-factory.ts
A	web/app/components/workflow/__tests__/trigger-status-sync.spec.tsx
D	web/app/components/workflow/__tests__/trigger-status-sync.test.tsx
A	web/app/components/workflow/__tests__/workflow-test-env.spec.tsx
A	web/app/components/workflow/__tests__/workflow-test-env.tsx
M	web/app/components/workflow/header/run-mode.tsx
A	web/app/components/workflow/hooks/__tests__/use-auto-generate-webhook-url.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-available-blocks.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-checklist.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-edges-interactions.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-helpline.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-hooksstore-wrappers.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-node-data-update.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-nodes-sync-draft.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-panel-interactions.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-selection-interactions.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-serial-async-callback.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-tool-icon.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-without-sync-hooks.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-workflow-mode.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-workflow-run-event-store-only.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-workflow-run-event-with-store.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-workflow-run-event-with-viewport.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-workflow-variables.spec.ts
A	web/app/components/workflow/hooks/__tests__/use-workflow.spec.ts
M	web/app/components/workflow/hooks/use-checklist.ts
A	web/app/components/workflow/nodes/human-input/__tests__/human-input.spec.tsx
D	web/app/components/workflow/nodes/human-input/__tests__/human-input.test.tsx
A	web/app/components/workflow/nodes/tool/__tests__/output-schema-utils.spec.ts
D	web/app/components/workflow/nodes/tool/__tests__/output-schema-utils.test.ts
A	web/app/components/workflow/nodes/trigger-plugin/utils/__tests__/form-helpers.spec.ts
D	web/app/components/workflow/nodes/trigger-plugin/utils/__tests__/form-helpers.test.ts
M	web/app/components/workflow/note-node/note-editor/plugins/link-editor-plugin/hooks.ts
M	web/app/components/workflow/panel/chat-variable-panel/components/object-value-item.tsx
M	web/app/components/workflow/panel/chat-variable-panel/components/variable-modal.tsx
M	web/app/components/workflow/panel/debug-and-preview/hooks.ts
M	web/app/components/workflow/panel/env-panel/variable-modal.tsx
M	web/app/components/workflow/run/index.tsx
A	web/app/components/workflow/store/__tests__/chat-variable-slice.spec.ts
A	web/app/components/workflow/store/__tests__/datasets-detail-store.spec.ts
A	web/app/components/workflow/store/__tests__/env-variable-slice.spec.ts
A	web/app/components/workflow/store/__tests__/inspect-vars-slice.spec.ts
A	web/app/components/workflow/store/__tests__/plugin-dependency-store.spec.ts
A	web/app/components/workflow/store/__tests__/trigger-status.spec.ts
D	web/app/components/workflow/store/__tests__/trigger-status.test.ts
A	web/app/components/workflow/store/__tests__/version-slice.spec.ts
A	web/app/components/workflow/store/__tests__/workflow-draft-slice.spec.ts
A	web/app/components/workflow/store/__tests__/workflow-store.spec.ts
M	web/app/components/workflow/update-dsl-modal.tsx
A	web/app/components/workflow/utils/__tests__/common.spec.ts
A	web/app/components/workflow/utils/__tests__/data-source.spec.ts
A	web/app/components/workflow/utils/__tests__/debug.spec.ts
A	web/app/components/workflow/utils/__tests__/edge.spec.ts
A	web/app/components/workflow/utils/__tests__/elk-layout.spec.ts
A	web/app/components/workflow/utils/__tests__/gen-node-meta-data.spec.ts
A	web/app/components/workflow/utils/__tests__/node-navigation.spec.ts
A	web/app/components/workflow/utils/__tests__/node.spec.ts
A	web/app/components/workflow/utils/__tests__/tool.spec.ts
A	web/app/components/workflow/utils/__tests__/trigger.spec.ts
A	web/app/components/workflow/utils/__tests__/variable.spec.ts
A	web/app/components/workflow/utils/__tests__/workflow-entry.spec.ts
A	web/app/components/workflow/utils/__tests__/workflow-init.spec.ts
A	web/app/components/workflow/utils/__tests__/workflow.spec.ts
D	web/app/components/workflow/utils/workflow-init.spec.ts
M	web/app/education-apply/education-apply-page.tsx
M	web/app/layout.tsx
D	web/app/serwist/[path]/route.ts
M	web/app/styles/globals.css
D	web/app/sw.ts
M	web/config/index.ts
A	web/context/app-context-provider.tsx
A	web/context/app-context.ts
D	web/context/app-context.tsx
A	web/context/datasets-context.ts
D	web/context/datasets-context.tsx
A	web/context/event-emitter-provider.tsx
A	web/context/event-emitter.ts
D	web/context/event-emitter.tsx
A	web/context/mitt-context-provider.tsx
A	web/context/mitt-context.ts
D	web/context/mitt-context.tsx
A	web/context/modal-context-provider.tsx
M	web/context/modal-context.test.tsx
A	web/context/modal-context.ts
D	web/context/modal-context.tsx
A	web/context/provider-context-provider.tsx
A	web/context/provider-context.ts
D	web/context/provider-context.tsx
A	web/context/workspace-context-provider.tsx
A	web/context/workspace-context.ts
D	web/context/workspace-context.tsx
A	web/contract/console/apps.ts
M	web/contract/router.ts
M	web/docs/lint.md
A	web/docs/overlay-migration.md
M	web/docs/test.md
M	web/env.ts
D	web/eslint-rules/index.js
D	web/eslint-rules/namespaces.js
D	web/eslint-rules/rules/consistent-placeholders.js
D	web/eslint-rules/rules/no-as-any-in-t.js
D	web/eslint-rules/rules/no-extra-keys.js
D	web/eslint-rules/rules/no-legacy-namespace-prefix.js
D	web/eslint-rules/rules/require-ns-option.js
D	web/eslint-rules/utils.js
M	web/eslint-suppressions.json
M	web/eslint.config.mjs
A	web/eslint.constants.mjs
M	web/hooks/use-import-dsl.ts
M	web/hooks/use-query-params.spec.tsx
M	web/hooks/use-query-params.ts
M	web/i18n-config/resources.ts
M	web/i18n/fr-FR/dataset.json
M	web/i18n/fr-FR/plugin.json
M	web/i18n/fr-FR/workflow.json
M	web/next.config.ts
M	web/package.json
A	web/plugins/eslint/index.js
A	web/plugins/eslint/namespaces.js
A	web/plugins/eslint/rules/consistent-placeholders.js
A	web/plugins/eslint/rules/no-as-any-in-t.js
A	web/plugins/eslint/rules/no-extra-keys.js
A	web/plugins/eslint/rules/no-legacy-namespace-prefix.js
A	web/plugins/eslint/rules/require-ns-option.js
A	web/plugins/eslint/utils.js
A	web/plugins/vite/custom-i18n-hmr.ts
A	web/plugins/vite/react-grab-open-file.ts
A	web/plugins/vite/utils.ts
M	web/pnpm-lock.yaml
M	web/proxy.ts
M	web/service/knowledge/use-document.ts
M	web/service/use-apps.ts
A	web/test/nuqs-testing.tsx
M	web/vite.config.ts


---
### 62c1d7b64e Revert "chore: update .gitignore, enhance Python type hinting guidelines, and improve type-checking commands"

| 字段 | 值 |
|------|----|
| **完整哈希** | `62c1d7b64ee08fa54f195aafd037f661e416d98f` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-03-13 16:39:56 +0800 |
| **父提交** | 9e2fc4e2d0560a9febe74a91320edda3c005a932  |

**中文摘要（变更要点）**：整体回滚上一提交（`9e2fc4e2d0`），恢复合并前的技能文档、import linter 与 API 签名/配置状态。

**提交说明（body）**：
> This reverts commit 9e2fc4e2d0560a9febe74a91320edda3c005a932.

**变更文件**：
M	.agents/skills/frontend-testing/SKILL.md
M	.agents/skills/frontend-testing/references/checklist.md
M	.agents/skills/frontend-testing/references/mocking.md
M	.agents/skills/orpc-contract-first/SKILL.md
M	.devcontainer/post_create_command.sh
M	.github/CODEOWNERS
M	.github/dependabot.yml
M	.github/workflows/style.yml
M	.github/workflows/tool-test-sdks.yaml
M	.github/workflows/translate-i18n-claude.yml
M	.github/workflows/web-tests.yml
M	.gitignore
M	.vscode/launch.json.template
M	AGENTS.md
M	Makefile
M	api/.env.example
M	api/.importlinter
M	api/.ruff.toml
M	api/configs/middleware/cache/redis_config.py
M	api/configs/middleware/cache/redis_pubsub_config.py
M	api/context/__init__.py
M	api/context/flask_app_context.py
M	api/controllers/common/fields.py
M	api/controllers/console/app/app.py
M	api/controllers/console/app/audio.py
M	api/controllers/console/app/completion.py
M	api/controllers/console/app/generator.py
M	api/controllers/console/app/message.py
M	api/controllers/console/app/workflow.py
M	api/controllers/console/app/workflow_app_log.py
M	api/controllers/console/app/workflow_draft_variable.py
M	api/controllers/console/app/workflow_run.py
M	api/controllers/console/app/wraps.py
M	api/controllers/console/auth/oauth_server.py
M	api/controllers/console/datasets/datasets.py
M	api/controllers/console/datasets/datasets_document.py
M	api/controllers/console/datasets/datasets_segments.py
M	api/controllers/console/datasets/hit_testing_base.py
M	api/controllers/console/datasets/rag_pipeline/datasource_auth.py
M	api/controllers/console/datasets/rag_pipeline/rag_pipeline_draft_variable.py
M	api/controllers/console/datasets/rag_pipeline/rag_pipeline_workflow.py
M	api/controllers/console/explore/audio.py
M	api/controllers/console/explore/completion.py
M	api/controllers/console/explore/message.py
M	api/controllers/console/explore/parameter.py
M	api/controllers/console/explore/trial.py
M	api/controllers/console/explore/workflow.py
M	api/controllers/console/remote_files.py
M	api/controllers/console/workspace/agent_providers.py
M	api/controllers/console/workspace/endpoint.py
M	api/controllers/console/workspace/load_balancing_config.py
M	api/controllers/console/workspace/model_providers.py
M	api/controllers/console/workspace/models.py
M	api/controllers/console/workspace/plugin.py
M	api/controllers/console/workspace/tool_providers.py
M	api/controllers/console/workspace/trigger_providers.py
M	api/controllers/files/upload.py
M	api/controllers/inner_api/plugin/plugin.py
M	api/controllers/mcp/mcp.py
M	api/controllers/service_api/app/annotation.py
M	api/controllers/service_api/app/app.py
M	api/controllers/service_api/app/audio.py
M	api/controllers/service_api/app/completion.py
M	api/controllers/service_api/app/conversation.py
M	api/controllers/service_api/app/workflow.py
M	api/controllers/service_api/dataset/dataset.py
M	api/controllers/service_api/dataset/document.py
M	api/controllers/service_api/dataset/segment.py
M	api/controllers/service_api/workspace/models.py
M	api/controllers/web/app.py
M	api/controllers/web/audio.py
M	api/controllers/web/completion.py
M	api/controllers/web/message.py
M	api/controllers/web/remote_files.py
M	api/controllers/web/workflow.py
M	api/core/agent/base_agent_runner.py
M	api/core/agent/cot_agent_runner.py
M	api/core/agent/cot_chat_agent_runner.py
M	api/core/agent/cot_completion_agent_runner.py
M	api/core/agent/fc_agent_runner.py
M	api/core/agent/output_parser/cot_output_parser.py
M	api/core/app/app_config/common/sensitive_word_avoidance/manager.py
M	api/core/app/app_config/easy_ui_based_app/agent/manager.py
M	api/core/app/app_config/easy_ui_based_app/dataset/manager.py
M	api/core/app/app_config/easy_ui_based_app/model_config/converter.py
M	api/core/app/app_config/easy_ui_based_app/model_config/manager.py
M	api/core/app/app_config/easy_ui_based_app/prompt_template/manager.py
M	api/core/app/app_config/easy_ui_based_app/variables/manager.py
M	api/core/app/app_config/entities.py
M	api/core/app/app_config/features/file_upload/manager.py
M	api/core/app/app_config/workflow_ui_based_app/variables/manager.py
M	api/core/app/apps/advanced_chat/app_generator.py
M	api/core/app/apps/advanced_chat/app_runner.py
M	api/core/app/apps/advanced_chat/generate_task_pipeline.py
M	api/core/app/apps/agent_chat/app_config_manager.py
M	api/core/app/apps/agent_chat/app_generator.py
M	api/core/app/apps/agent_chat/app_runner.py
M	api/core/app/apps/base_app_generate_response_converter.py
M	api/core/app/apps/base_app_generator.py
M	api/core/app/apps/base_app_queue_manager.py
M	api/core/app/apps/base_app_runner.py
M	api/core/app/apps/chat/app_config_manager.py
M	api/core/app/apps/chat/app_generator.py
M	api/core/app/apps/chat/app_runner.py
M	api/core/app/apps/common/graph_runtime_state_support.py
M	api/core/app/apps/common/workflow_response_converter.py
M	api/core/app/apps/completion/app_config_manager.py
M	api/core/app/apps/completion/app_generator.py
M	api/core/app/apps/completion/app_runner.py
M	api/core/app/apps/pipeline/pipeline_generator.py
M	api/core/app/apps/pipeline/pipeline_runner.py
M	api/core/app/apps/workflow/app_generator.py
M	api/core/app/apps/workflow/app_runner.py
M	api/core/app/apps/workflow/generate_task_pipeline.py
M	api/core/app/apps/workflow_app_runner.py
M	api/core/app/entities/app_invoke_entities.py
M	api/core/app/entities/queue_entities.py
M	api/core/app/entities/task_entities.py
M	api/core/app/features/hosting_moderation/hosting_moderation.py
M	api/core/app/layers/conversation_variable_persist_layer.py
M	api/core/app/layers/pause_state_persist_layer.py
M	api/core/app/layers/suspend_layer.py
M	api/core/app/layers/timeslice_layer.py
M	api/core/app/layers/trigger_post_layer.py
M	api/core/app/llm/model_access.py
M	api/core/app/llm/quota.py
M	api/core/app/task_pipeline/based_generate_task_pipeline.py
M	api/core/app/task_pipeline/easy_ui_based_generate_task_pipeline.py
M	api/core/app/workflow/__init__.py
M	api/core/app/workflow/file_runtime.py
M	api/core/app/workflow/layers/llm_quota.py
M	api/core/app/workflow/layers/observability.py
M	api/core/app/workflow/layers/persistence.py
A	api/core/app/workflow/node_factory.py
M	api/core/base/tts/app_generator_tts_publisher.py
M	api/core/datasource/datasource_file_manager.py
M	api/core/datasource/datasource_manager.py
M	api/core/datasource/entities/api_entities.py
M	api/core/datasource/utils/message_transformer.py
M	api/core/entities/execution_extra_content.py
M	api/core/entities/mcp_provider.py
M	api/core/entities/model_entities.py
M	api/core/entities/provider_configuration.py
M	api/core/entities/provider_entities.py
M	api/core/helper/code_executor/code_executor.py
M	api/core/helper/code_executor/template_transformer.py
M	api/core/helper/moderation.py
M	api/core/hosting_configuration.py
M	api/core/indexing_runner.py
M	api/core/llm_generator/llm_generator.py
M	api/core/llm_generator/output_parser/structured_output.py
M	api/core/mcp/server/streamable_http.py
M	api/core/mcp/utils.py
M	api/core/memory/token_buffer_memory.py
M	api/core/model_manager.py
A	api/core/model_runtime/README.md
A	api/core/model_runtime/README_CN.md
A	api/core/model_runtime/__init__.py
A	api/core/model_runtime/callbacks/__init__.py
A	api/core/model_runtime/callbacks/base_callback.py
A	api/core/model_runtime/callbacks/logging_callback.py
A	api/core/model_runtime/entities/__init__.py
A	api/core/model_runtime/entities/common_entities.py
A	api/core/model_runtime/entities/defaults.py
A	api/core/model_runtime/entities/llm_entities.py
A	api/core/model_runtime/entities/message_entities.py
A	api/core/model_runtime/entities/model_entities.py
A	api/core/model_runtime/entities/provider_entities.py
A	api/core/model_runtime/entities/rerank_entities.py
A	api/core/model_runtime/entities/text_embedding_entities.py
A	api/core/model_runtime/errors/__init__.py
A	api/core/model_runtime/errors/invoke.py
A	api/core/model_runtime/errors/validate.py
A	api/core/model_runtime/memory/__init__.py
A	api/core/model_runtime/memory/prompt_message_memory.py
A	api/core/model_runtime/model_providers/__base/__init__.py
A	api/core/model_runtime/model_providers/__base/ai_model.py
A	api/core/model_runtime/model_providers/__base/large_language_model.py
A	api/core/model_runtime/model_providers/__base/moderation_model.py
A	api/core/model_runtime/model_providers/__base/rerank_model.py
A	api/core/model_runtime/model_providers/__base/speech2text_model.py
A	api/core/model_runtime/model_providers/__base/text_embedding_model.py
A	api/core/model_runtime/model_providers/__base/tokenizers/gpt2_tokenizer.py
A	api/core/model_runtime/model_providers/__base/tts_model.py
A	api/core/model_runtime/model_providers/__init__.py
A	api/core/model_runtime/model_providers/_position.yaml
A	api/core/model_runtime/model_providers/model_provider_factory.py
A	api/core/model_runtime/schema_validators/__init__.py
A	api/core/model_runtime/schema_validators/common_validator.py
A	api/core/model_runtime/schema_validators/model_credential_schema_validator.py
A	api/core/model_runtime/schema_validators/provider_credential_schema_validator.py
A	api/core/model_runtime/utils/__init__.py
A	api/core/model_runtime/utils/encoders.py
M	api/core/moderation/openai_moderation/openai_moderation.py
M	api/core/ops/aliyun_trace/aliyun_trace.py
M	api/core/ops/aliyun_trace/data_exporter/traceclient.py
M	api/core/ops/aliyun_trace/utils.py
M	api/core/ops/langfuse_trace/langfuse_trace.py
M	api/core/ops/langsmith_trace/langsmith_trace.py
M	api/core/ops/mlflow_trace/mlflow_trace.py
M	api/core/ops/opik_trace/opik_trace.py
M	api/core/ops/ops_trace_manager.py
M	api/core/ops/tencent_trace/client.py
M	api/core/ops/tencent_trace/span_builder.py
M	api/core/ops/tencent_trace/tencent_trace.py
M	api/core/ops/tencent_trace/utils.py
M	api/core/ops/utils.py
M	api/core/ops/weave_trace/weave_trace.py
M	api/core/plugin/backwards_invocation/app.py
M	api/core/plugin/backwards_invocation/model.py
M	api/core/plugin/backwards_invocation/node.py
M	api/core/plugin/entities/marketplace.py
M	api/core/plugin/entities/plugin.py
M	api/core/plugin/entities/plugin_daemon.py
M	api/core/plugin/entities/request.py
M	api/core/plugin/impl/base.py
M	api/core/plugin/impl/model.py
M	api/core/plugin/utils/converter.py
M	api/core/prompt/advanced_prompt_transform.py
M	api/core/prompt/agent_history_prompt_transform.py
M	api/core/prompt/entities/advanced_prompt_entities.py
M	api/core/prompt/prompt_transform.py
M	api/core/prompt/simple_prompt_transform.py
M	api/core/prompt/utils/prompt_message_util.py
M	api/core/provider_manager.py
M	api/core/rag/data_post_processor/data_post_processor.py
M	api/core/rag/datasource/retrieval_service.py
M	api/core/rag/datasource/vdb/chroma/chroma_vector.py
M	api/core/rag/datasource/vdb/clickzetta/clickzetta_vector.py
M	api/core/rag/datasource/vdb/vector_factory.py
M	api/core/rag/docstore/dataset_docstore.py
M	api/core/rag/embedding/cached_embedding.py
D	api/core/rag/index_processor/index_processor.py
M	api/core/rag/index_processor/processor/paragraph_index_processor.py
M	api/core/rag/models/document.py
M	api/core/rag/rerank/rerank_model.py
M	api/core/rag/rerank/weight_rerank.py
M	api/core/rag/retrieval/dataset_retrieval.py
M	api/core/rag/retrieval/router/multi_dataset_function_call_router.py
M	api/core/rag/retrieval/router/multi_dataset_react_route.py
M	api/core/rag/splitter/fixed_text_splitter.py
D	api/core/rag/summary_index/__init__.py
D	api/core/rag/summary_index/summary_index.py
M	api/core/repositories/celery_workflow_execution_repository.py
M	api/core/repositories/celery_workflow_node_execution_repository.py
M	api/core/repositories/factory.py
M	api/core/repositories/human_input_repository.py
M	api/core/repositories/sqlalchemy_workflow_execution_repository.py
M	api/core/repositories/sqlalchemy_workflow_node_execution_repository.py
M	api/core/tools/builtin_tool/providers/audio/tools/asr.py
M	api/core/tools/builtin_tool/providers/audio/tools/tts.py
M	api/core/tools/builtin_tool/tool.py
M	api/core/tools/custom_tool/tool.py
M	api/core/tools/entities/api_entities.py
M	api/core/tools/mcp_tool/tool.py
M	api/core/tools/tool_engine.py
M	api/core/tools/tool_file_manager.py
M	api/core/tools/tool_manager.py
M	api/core/tools/utils/dataset_retriever/dataset_multi_retriever_tool.py
M	api/core/tools/utils/message_transformer.py
M	api/core/tools/utils/model_invocation_utils.py
M	api/core/tools/utils/workflow_configuration_sync.py
M	api/core/tools/workflow_as_tool/provider.py
M	api/core/tools/workflow_as_tool/tool.py
M	api/core/trigger/debug/event_selectors.py
A	api/core/workflow/README.md
M	api/core/workflow/__init__.py
A	api/core/workflow/constants.py
A	api/core/workflow/context/__init__.py
A	api/core/workflow/context/execution_context.py
A	api/core/workflow/context/models.py
A	api/core/workflow/conversation_variable_updater.py
A	api/core/workflow/entities/__init__.py
A	api/core/workflow/entities/agent.py
A	api/core/workflow/entities/graph_config.py
A	api/core/workflow/entities/graph_init_params.py
A	api/core/workflow/entities/pause_reason.py
A	api/core/workflow/entities/workflow_execution.py
A	api/core/workflow/entities/workflow_node_execution.py
A	api/core/workflow/entities/workflow_start_reason.py
A	api/core/workflow/enums.py
A	api/core/workflow/errors.py
A	api/core/workflow/file/__init__.py
A	api/core/workflow/file/constants.py
A	api/core/workflow/file/enums.py
A	api/core/workflow/file/file_manager.py
A	api/core/workflow/file/helpers.py
A	api/core/workflow/file/models.py
A	api/core/workflow/file/protocols.py
A	api/core/workflow/file/runtime.py
A	api/core/workflow/file/tool_file_parser.py
A	api/core/workflow/graph/__init__.py
A	api/core/workflow/graph/edge.py
A	api/core/workflow/graph/graph.py
A	api/core/workflow/graph/graph_template.py
A	api/core/workflow/graph/validation.py
A	api/core/workflow/graph_engine/__init__.py
A	api/core/workflow/graph_engine/_engine_utils.py
A	api/core/workflow/graph_engine/command_channels/README.md
A	api/core/workflow/graph_engine/command_channels/__init__.py
A	api/core/workflow/graph_engine/command_channels/in_memory_channel.py
A	api/core/workflow/graph_engine/command_channels/redis_channel.py
A	api/core/workflow/graph_engine/command_processing/__init__.py
A	api/core/workflow/graph_engine/command_processing/command_handlers.py
A	api/core/workflow/graph_engine/command_processing/command_processor.py
A	api/core/workflow/graph_engine/config.py
A	api/core/workflow/graph_engine/domain/__init__.py
A	api/core/workflow/graph_engine/domain/graph_execution.py
A	api/core/workflow/graph_engine/domain/node_execution.py
A	api/core/workflow/graph_engine/entities/__init__.py
A	api/core/workflow/graph_engine/entities/commands.py
A	api/core/workflow/graph_engine/error_handler.py
A	api/core/workflow/graph_engine/event_management/__init__.py
A	api/core/workflow/graph_engine/event_management/event_handlers.py
A	api/core/workflow/graph_engine/event_management/event_manager.py
A	api/core/workflow/graph_engine/graph_engine.py
A	api/core/workflow/graph_engine/graph_state_manager.py
A	api/core/workflow/graph_engine/graph_traversal/__init__.py
A	api/core/workflow/graph_engine/graph_traversal/edge_processor.py
A	api/core/workflow/graph_engine/graph_traversal/skip_propagator.py
A	api/core/workflow/graph_engine/layers/README.md
A	api/core/workflow/graph_engine/layers/__init__.py
A	api/core/workflow/graph_engine/layers/base.py
A	api/core/workflow/graph_engine/layers/debug_logging.py
A	api/core/workflow/graph_engine/layers/execution_limits.py
A	api/core/workflow/graph_engine/manager.py
A	api/core/workflow/graph_engine/orchestration/__init__.py
A	api/core/workflow/graph_engine/orchestration/dispatcher.py
A	api/core/workflow/graph_engine/orchestration/execution_coordinator.py
A	api/core/workflow/graph_engine/protocols/command_channel.py
A	api/core/workflow/graph_engine/ready_queue/__init__.py
A	api/core/workflow/graph_engine/ready_queue/factory.py
A	api/core/workflow/graph_engine/ready_queue/in_memory.py
A	api/core/workflow/graph_engine/ready_queue/protocol.py
A	api/core/workflow/graph_engine/response_coordinator/__init__.py
A	api/core/workflow/graph_engine/response_coordinator/coordinator.py
A	api/core/workflow/graph_engine/response_coordinator/path.py
A	api/core/workflow/graph_engine/response_coordinator/session.py
A	api/core/workflow/graph_engine/worker.py
A	api/core/workflow/graph_engine/worker_management/__init__.py
A	api/core/workflow/graph_engine/worker_management/worker_pool.py
A	api/core/workflow/graph_events/__init__.py
A	api/core/workflow/graph_events/agent.py
A	api/core/workflow/graph_events/base.py
A	api/core/workflow/graph_events/graph.py
A	api/core/workflow/graph_events/human_input.py
A	api/core/workflow/graph_events/iteration.py
A	api/core/workflow/graph_events/loop.py
A	api/core/workflow/graph_events/node.py
A	api/core/workflow/node_events/__init__.py
A	api/core/workflow/node_events/agent.py
A	api/core/workflow/node_events/base.py
A	api/core/workflow/node_events/iteration.py
A	api/core/workflow/node_events/loop.py
A	api/core/workflow/node_events/node.py
D	api/core/workflow/node_factory.py
A	api/core/workflow/nodes/__init__.py
A	api/core/workflow/nodes/agent/__init__.py
A	api/core/workflow/nodes/agent/agent_node.py
A	api/core/workflow/nodes/agent/entities.py
A	api/core/workflow/nodes/agent/exc.py
A	api/core/workflow/nodes/answer/__init__.py
A	api/core/workflow/nodes/answer/answer_node.py
A	api/core/workflow/nodes/answer/entities.py
A	api/core/workflow/nodes/base/__init__.py
A	api/core/workflow/nodes/base/entities.py
A	api/core/workflow/nodes/base/exc.py
A	api/core/workflow/nodes/base/node.py
A	api/core/workflow/nodes/base/template.py
A	api/core/workflow/nodes/base/usage_tracking_mixin.py
A	api/core/workflow/nodes/base/variable_template_parser.py
A	api/core/workflow/nodes/code/__init__.py
A	api/core/workflow/nodes/code/code_node.py
A	api/core/workflow/nodes/code/entities.py
A	api/core/workflow/nodes/code/exc.py
A	api/core/workflow/nodes/code/limits.py
A	api/core/workflow/nodes/datasource/__init__.py
A	api/core/workflow/nodes/datasource/datasource_node.py
A	api/core/workflow/nodes/datasource/entities.py
A	api/core/workflow/nodes/datasource/exc.py
A	api/core/workflow/nodes/document_extractor/__init__.py
A	api/core/workflow/nodes/document_extractor/entities.py
A	api/core/workflow/nodes/document_extractor/exc.py
A	api/core/workflow/nodes/document_extractor/node.py
A	api/core/workflow/nodes/end/__init__.py
A	api/core/workflow/nodes/end/end_node.py
A	api/core/workflow/nodes/end/entities.py
A	api/core/workflow/nodes/http_request/__init__.py
A	api/core/workflow/nodes/http_request/config.py
A	api/core/workflow/nodes/http_request/entities.py
A	api/core/workflow/nodes/http_request/exc.py
A	api/core/workflow/nodes/http_request/executor.py
A	api/core/workflow/nodes/http_request/node.py
A	api/core/workflow/nodes/human_input/__init__.py
A	api/core/workflow/nodes/human_input/entities.py
A	api/core/workflow/nodes/human_input/enums.py
A	api/core/workflow/nodes/human_input/human_input_node.py
A	api/core/workflow/nodes/if_else/__init__.py
A	api/core/workflow/nodes/if_else/entities.py
A	api/core/workflow/nodes/if_else/if_else_node.py
A	api/core/workflow/nodes/iteration/__init__.py
A	api/core/workflow/nodes/iteration/entities.py
A	api/core/workflow/nodes/iteration/exc.py
A	api/core/workflow/nodes/iteration/iteration_node.py
A	api/core/workflow/nodes/iteration/iteration_start_node.py
A	api/core/workflow/nodes/knowledge_index/__init__.py
A	api/core/workflow/nodes/knowledge_index/entities.py
A	api/core/workflow/nodes/knowledge_index/exc.py
A	api/core/workflow/nodes/knowledge_index/knowledge_index_node.py
A	api/core/workflow/nodes/knowledge_retrieval/__init__.py
A	api/core/workflow/nodes/knowledge_retrieval/entities.py
A	api/core/workflow/nodes/knowledge_retrieval/exc.py
A	api/core/workflow/nodes/knowledge_retrieval/knowledge_retrieval_node.py
A	api/core/workflow/nodes/knowledge_retrieval/template_prompts.py
A	api/core/workflow/nodes/list_operator/__init__.py
A	api/core/workflow/nodes/list_operator/entities.py
A	api/core/workflow/nodes/list_operator/exc.py
A	api/core/workflow/nodes/list_operator/node.py
A	api/core/workflow/nodes/llm/__init__.py
A	api/core/workflow/nodes/llm/entities.py
A	api/core/workflow/nodes/llm/exc.py
A	api/core/workflow/nodes/llm/file_saver.py
A	api/core/workflow/nodes/llm/llm_utils.py
A	api/core/workflow/nodes/llm/node.py
A	api/core/workflow/nodes/llm/protocols.py
A	api/core/workflow/nodes/loop/__init__.py
A	api/core/workflow/nodes/loop/entities.py
A	api/core/workflow/nodes/loop/loop_end_node.py
A	api/core/workflow/nodes/loop/loop_node.py
A	api/core/workflow/nodes/loop/loop_start_node.py
A	api/core/workflow/nodes/node_mapping.py
A	api/core/workflow/nodes/parameter_extractor/__init__.py
A	api/core/workflow/nodes/parameter_extractor/entities.py
A	api/core/workflow/nodes/parameter_extractor/exc.py
A	api/core/workflow/nodes/parameter_extractor/parameter_extractor_node.py
A	api/core/workflow/nodes/parameter_extractor/prompts.py
A	api/core/workflow/nodes/protocols.py
A	api/core/workflow/nodes/question_classifier/__init__.py
A	api/core/workflow/nodes/question_classifier/entities.py
A	api/core/workflow/nodes/question_classifier/exc.py
A	api/core/workflow/nodes/question_classifier/question_classifier_node.py
A	api/core/workflow/nodes/question_classifier/template_prompts.py
A	api/core/workflow/nodes/start/__init__.py
A	api/core/workflow/nodes/start/entities.py
A	api/core/workflow/nodes/start/start_node.py
A	api/core/workflow/nodes/template_transform/__init__.py
A	api/core/workflow/nodes/template_transform/entities.py
A	api/core/workflow/nodes/template_transform/template_renderer.py
A	api/core/workflow/nodes/template_transform/template_transform_node.py
A	api/core/workflow/nodes/tool/__init__.py
A	api/core/workflow/nodes/tool/entities.py
A	api/core/workflow/nodes/tool/exc.py
A	api/core/workflow/nodes/tool/tool_node.py
A	api/core/workflow/nodes/trigger_plugin/__init__.py
A	api/core/workflow/nodes/trigger_plugin/entities.py
A	api/core/workflow/nodes/trigger_plugin/exc.py
A	api/core/workflow/nodes/trigger_plugin/trigger_event_node.py
A	api/core/workflow/nodes/trigger_schedule/__init__.py
A	api/core/workflow/nodes/trigger_schedule/entities.py
A	api/core/workflow/nodes/trigger_schedule/exc.py
A	api/core/workflow/nodes/trigger_schedule/trigger_schedule_node.py
A	api/core/workflow/nodes/trigger_webhook/__init__.py
A	api/core/workflow/nodes/trigger_webhook/entities.py
A	api/core/workflow/nodes/trigger_webhook/exc.py
A	api/core/workflow/nodes/trigger_webhook/node.py
A	api/core/workflow/nodes/variable_aggregator/__init__.py
A	api/core/workflow/nodes/variable_aggregator/entities.py
A	api/core/workflow/nodes/variable_aggregator/variable_aggregator_node.py
A	api/core/workflow/nodes/variable_assigner/__init__.py
A	api/core/workflow/nodes/variable_assigner/common/__init__.py
A	api/core/workflow/nodes/variable_assigner/common/exc.py
A	api/core/workflow/nodes/variable_assigner/common/helpers.py
A	api/core/workflow/nodes/variable_assigner/v1/__init__.py
A	api/core/workflow/nodes/variable_assigner/v1/node.py
A	api/core/workflow/nodes/variable_assigner/v1/node_data.py
A	api/core/workflow/nodes/variable_assigner/v2/__init__.py
A	api/core/workflow/nodes/variable_assigner/v2/entities.py
A	api/core/workflow/nodes/variable_assigner/v2/enums.py
A	api/core/workflow/nodes/variable_assigner/v2/exc.py
A	api/core/workflow/nodes/variable_assigner/v2/helpers.py
A	api/core/workflow/nodes/variable_assigner/v2/node.py
A	api/core/workflow/repositories/__init__.py
A	api/core/workflow/repositories/datasource_manager_protocol.py
A	api/core/workflow/repositories/draft_variable_repository.py
A	api/core/workflow/repositories/human_input_form_repository.py
A	api/core/workflow/repositories/rag_retrieval_protocol.py
A	api/core/workflow/repositories/workflow_execution_repository.py
A	api/core/workflow/repositories/workflow_node_execution_repository.py
A	api/core/workflow/runtime/__init__.py
A	api/core/workflow/runtime/graph_runtime_state.py
A	api/core/workflow/runtime/graph_runtime_state_protocol.py
A	api/core/workflow/runtime/read_only_wrappers.py
A	api/core/workflow/runtime/variable_pool.py
A	api/core/workflow/system_variable.py
A	api/core/workflow/utils/__init__.py
A	api/core/workflow/utils/condition/__init__.py
A	api/core/workflow/utils/condition/entities.py
A	api/core/workflow/utils/condition/processor.py
A	api/core/workflow/variable_loader.py
A	api/core/workflow/variables/__init__.py
A	api/core/workflow/variables/consts.py
A	api/core/workflow/variables/exc.py
A	api/core/workflow/variables/input_entities.py
A	api/core/workflow/variables/segment_group.py
A	api/core/workflow/variables/segments.py
A	api/core/workflow/variables/types.py
A	api/core/workflow/variables/utils.py
A	api/core/workflow/variables/variables.py
M	api/core/workflow/workflow_entry.py
A	api/core/workflow/workflow_type_encoder.py
D	api/dify_graph/README.md
D	api/dify_graph/__init__.py
D	api/dify_graph/constants.py
D	api/dify_graph/context/__init__.py
D	api/dify_graph/context/execution_context.py
D	api/dify_graph/context/models.py
D	api/dify_graph/conversation_variable_updater.py
D	api/dify_graph/entities/__init__.py
D	api/dify_graph/entities/agent.py
D	api/dify_graph/entities/graph_config.py
D	api/dify_graph/entities/graph_init_params.py
D	api/dify_graph/entities/pause_reason.py
D	api/dify_graph/entities/workflow_execution.py
D	api/dify_graph/entities/workflow_node_execution.py
D	api/dify_graph/entities/workflow_start_reason.py
D	api/dify_graph/enums.py
D	api/dify_graph/errors.py
D	api/dify_graph/file/__init__.py
D	api/dify_graph/file/constants.py
D	api/dify_graph/file/enums.py
D	api/dify_graph/file/file_manager.py
D	api/dify_graph/file/helpers.py
D	api/dify_graph/file/models.py
D	api/dify_graph/file/protocols.py
D	api/dify_graph/file/runtime.py
D	api/dify_graph/file/tool_file_parser.py
D	api/dify_graph/graph/__init__.py
D	api/dify_graph/graph/edge.py
D	api/dify_graph/graph/graph.py
D	api/dify_graph/graph/graph_template.py
D	api/dify_graph/graph/validation.py
D	api/dify_graph/graph_engine/__init__.py
D	api/dify_graph/graph_engine/_engine_utils.py
D	api/dify_graph/graph_engine/command_channels/README.md
D	api/dify_graph/graph_engine/command_channels/__init__.py
D	api/dify_graph/graph_engine/command_channels/in_memory_channel.py
D	api/dify_graph/graph_engine/command_channels/redis_channel.py
D	api/dify_graph/graph_engine/command_processing/__init__.py
D	api/dify_graph/graph_engine/command_processing/command_handlers.py
D	api/dify_graph/graph_engine/command_processing/command_processor.py
D	api/dify_graph/graph_engine/config.py
D	api/dify_graph/graph_engine/domain/__init__.py
D	api/dify_graph/graph_engine/domain/graph_execution.py
D	api/dify_graph/graph_engine/domain/node_execution.py
D	api/dify_graph/graph_engine/entities/__init__.py
D	api/dify_graph/graph_engine/entities/commands.py
D	api/dify_graph/graph_engine/error_handler.py
D	api/dify_graph/graph_engine/event_management/__init__.py
D	api/dify_graph/graph_engine/event_management/event_handlers.py
D	api/dify_graph/graph_engine/event_management/event_manager.py
D	api/dify_graph/graph_engine/graph_engine.py
D	api/dify_graph/graph_engine/graph_state_manager.py
D	api/dify_graph/graph_engine/graph_traversal/__init__.py
D	api/dify_graph/graph_engine/graph_traversal/edge_processor.py
D	api/dify_graph/graph_engine/graph_traversal/skip_propagator.py
D	api/dify_graph/graph_engine/layers/README.md
D	api/dify_graph/graph_engine/layers/__init__.py
D	api/dify_graph/graph_engine/layers/base.py
D	api/dify_graph/graph_engine/layers/debug_logging.py
D	api/dify_graph/graph_engine/layers/execution_limits.py
D	api/dify_graph/graph_engine/manager.py
D	api/dify_graph/graph_engine/orchestration/__init__.py
D	api/dify_graph/graph_engine/orchestration/dispatcher.py
D	api/dify_graph/graph_engine/orchestration/execution_coordinator.py
D	api/dify_graph/graph_engine/protocols/command_channel.py
D	api/dify_graph/graph_engine/ready_queue/__init__.py
D	api/dify_graph/graph_engine/ready_queue/factory.py
D	api/dify_graph/graph_engine/ready_queue/in_memory.py
D	api/dify_graph/graph_engine/ready_queue/protocol.py
D	api/dify_graph/graph_engine/response_coordinator/__init__.py
D	api/dify_graph/graph_engine/response_coordinator/coordinator.py
D	api/dify_graph/graph_engine/response_coordinator/path.py
D	api/dify_graph/graph_engine/response_coordinator/session.py
D	api/dify_graph/graph_engine/worker.py
D	api/dify_graph/graph_engine/worker_management/__init__.py
D	api/dify_graph/graph_engine/worker_management/worker_pool.py
D	api/dify_graph/graph_events/__init__.py
D	api/dify_graph/graph_events/agent.py
D	api/dify_graph/graph_events/base.py
D	api/dify_graph/graph_events/graph.py
D	api/dify_graph/graph_events/human_input.py
D	api/dify_graph/graph_events/iteration.py
D	api/dify_graph/graph_events/loop.py
D	api/dify_graph/graph_events/node.py
D	api/dify_graph/model_runtime/README.md
D	api/dify_graph/model_runtime/README_CN.md
D	api/dify_graph/model_runtime/__init__.py
D	api/dify_graph/model_runtime/callbacks/__init__.py
D	api/dify_graph/model_runtime/callbacks/base_callback.py
D	api/dify_graph/model_runtime/callbacks/logging_callback.py
D	api/dify_graph/model_runtime/entities/__init__.py
D	api/dify_graph/model_runtime/entities/common_entities.py
D	api/dify_graph/model_runtime/entities/defaults.py
D	api/dify_graph/model_runtime/entities/llm_entities.py
D	api/dify_graph/model_runtime/entities/message_entities.py
D	api/dify_graph/model_runtime/entities/model_entities.py
D	api/dify_graph/model_runtime/entities/provider_entities.py
D	api/dify_graph/model_runtime/entities/rerank_entities.py
D	api/dify_graph/model_runtime/entities/text_embedding_entities.py
D	api/dify_graph/model_runtime/errors/__init__.py
D	api/dify_graph/model_runtime/errors/invoke.py
D	api/dify_graph/model_runtime/errors/validate.py
D	api/dify_graph/model_runtime/memory/__init__.py
D	api/dify_graph/model_runtime/memory/prompt_message_memory.py
D	api/dify_graph/model_runtime/model_providers/__base/__init__.py
D	api/dify_graph/model_runtime/model_providers/__base/ai_model.py
D	api/dify_graph/model_runtime/model_providers/__base/large_language_model.py
D	api/dify_graph/model_runtime/model_providers/__base/moderation_model.py
D	api/dify_graph/model_runtime/model_providers/__base/rerank_model.py
D	api/dify_graph/model_runtime/model_providers/__base/speech2text_model.py
D	api/dify_graph/model_runtime/model_providers/__base/text_embedding_model.py
D	api/dify_graph/model_runtime/model_providers/__base/tokenizers/gpt2_tokenizer.py
D	api/dify_graph/model_runtime/model_providers/__base/tts_model.py
D	api/dify_graph/model_runtime/model_providers/__init__.py
D	api/dify_graph/model_runtime/model_providers/_position.yaml
D	api/dify_graph/model_runtime/model_providers/model_provider_factory.py
D	api/dify_graph/model_runtime/schema_validators/__init__.py
D	api/dify_graph/model_runtime/schema_validators/common_validator.py
D	api/dify_graph/model_runtime/schema_validators/model_credential_schema_validator.py
D	api/dify_graph/model_runtime/schema_validators/provider_credential_schema_validator.py
D	api/dify_graph/model_runtime/utils/__init__.py
D	api/dify_graph/model_runtime/utils/encoders.py
D	api/dify_graph/node_events/__init__.py
D	api/dify_graph/node_events/agent.py
D	api/dify_graph/node_events/base.py
D	api/dify_graph/node_events/iteration.py
D	api/dify_graph/node_events/loop.py
D	api/dify_graph/node_events/node.py
D	api/dify_graph/nodes/__init__.py
D	api/dify_graph/nodes/agent/__init__.py
D	api/dify_graph/nodes/agent/agent_node.py
D	api/dify_graph/nodes/agent/entities.py
D	api/dify_graph/nodes/agent/exc.py
D	api/dify_graph/nodes/answer/__init__.py
D	api/dify_graph/nodes/answer/answer_node.py
D	api/dify_graph/nodes/answer/entities.py
D	api/dify_graph/nodes/base/__init__.py
D	api/dify_graph/nodes/base/entities.py
D	api/dify_graph/nodes/base/exc.py
D	api/dify_graph/nodes/base/node.py
D	api/dify_graph/nodes/base/template.py
D	api/dify_graph/nodes/base/usage_tracking_mixin.py
D	api/dify_graph/nodes/base/variable_template_parser.py
D	api/dify_graph/nodes/code/__init__.py
D	api/dify_graph/nodes/code/code_node.py
D	api/dify_graph/nodes/code/entities.py
D	api/dify_graph/nodes/code/exc.py
D	api/dify_graph/nodes/code/limits.py
D	api/dify_graph/nodes/datasource/__init__.py
D	api/dify_graph/nodes/datasource/datasource_node.py
D	api/dify_graph/nodes/datasource/entities.py
D	api/dify_graph/nodes/datasource/exc.py
D	api/dify_graph/nodes/document_extractor/__init__.py
D	api/dify_graph/nodes/document_extractor/entities.py
D	api/dify_graph/nodes/document_extractor/exc.py
D	api/dify_graph/nodes/document_extractor/node.py
D	api/dify_graph/nodes/end/__init__.py
D	api/dify_graph/nodes/end/end_node.py
D	api/dify_graph/nodes/end/entities.py
D	api/dify_graph/nodes/http_request/__init__.py
D	api/dify_graph/nodes/http_request/config.py
D	api/dify_graph/nodes/http_request/entities.py
D	api/dify_graph/nodes/http_request/exc.py
D	api/dify_graph/nodes/http_request/executor.py
D	api/dify_graph/nodes/http_request/node.py
D	api/dify_graph/nodes/human_input/__init__.py
D	api/dify_graph/nodes/human_input/entities.py
D	api/dify_graph/nodes/human_input/enums.py
D	api/dify_graph/nodes/human_input/human_input_node.py
D	api/dify_graph/nodes/if_else/__init__.py
D	api/dify_graph/nodes/if_else/entities.py
D	api/dify_graph/nodes/if_else/if_else_node.py
D	api/dify_graph/nodes/iteration/__init__.py
D	api/dify_graph/nodes/iteration/entities.py
D	api/dify_graph/nodes/iteration/exc.py
D	api/dify_graph/nodes/iteration/iteration_node.py
D	api/dify_graph/nodes/iteration/iteration_start_node.py
D	api/dify_graph/nodes/knowledge_index/__init__.py
D	api/dify_graph/nodes/knowledge_index/entities.py
D	api/dify_graph/nodes/knowledge_index/exc.py
D	api/dify_graph/nodes/knowledge_index/knowledge_index_node.py
D	api/dify_graph/nodes/knowledge_retrieval/__init__.py
D	api/dify_graph/nodes/knowledge_retrieval/entities.py
D	api/dify_graph/nodes/knowledge_retrieval/exc.py
D	api/dify_graph/nodes/knowledge_retrieval/knowledge_retrieval_node.py
D	api/dify_graph/nodes/knowledge_retrieval/template_prompts.py
D	api/dify_graph/nodes/list_operator/__init__.py
D	api/dify_graph/nodes/list_operator/entities.py
D	api/dify_graph/nodes/list_operator/exc.py
D	api/dify_graph/nodes/list_operator/node.py
D	api/dify_graph/nodes/llm/__init__.py
D	api/dify_graph/nodes/llm/entities.py
D	api/dify_graph/nodes/llm/exc.py
D	api/dify_graph/nodes/llm/file_saver.py
D	api/dify_graph/nodes/llm/llm_utils.py
D	api/dify_graph/nodes/llm/node.py
D	api/dify_graph/nodes/llm/protocols.py
D	api/dify_graph/nodes/loop/__init__.py
D	api/dify_graph/nodes/loop/entities.py
D	api/dify_graph/nodes/loop/loop_end_node.py
D	api/dify_graph/nodes/loop/loop_node.py
D	api/dify_graph/nodes/loop/loop_start_node.py
D	api/dify_graph/nodes/node_mapping.py
D	api/dify_graph/nodes/parameter_extractor/__init__.py
D	api/dify_graph/nodes/parameter_extractor/entities.py
D	api/dify_graph/nodes/parameter_extractor/exc.py
D	api/dify_graph/nodes/parameter_extractor/parameter_extractor_node.py
D	api/dify_graph/nodes/parameter_extractor/prompts.py
D	api/dify_graph/nodes/protocols.py
D	api/dify_graph/nodes/question_classifier/__init__.py
D	api/dify_graph/nodes/question_classifier/entities.py
D	api/dify_graph/nodes/question_classifier/exc.py
D	api/dify_graph/nodes/question_classifier/question_classifier_node.py
D	api/dify_graph/nodes/question_classifier/template_prompts.py
D	api/dify_graph/nodes/start/__init__.py
D	api/dify_graph/nodes/start/entities.py
D	api/dify_graph/nodes/start/start_node.py
D	api/dify_graph/nodes/template_transform/__init__.py
D	api/dify_graph/nodes/template_transform/entities.py
D	api/dify_graph/nodes/template_transform/template_renderer.py
D	api/dify_graph/nodes/template_transform/template_transform_node.py
D	api/dify_graph/nodes/tool/__init__.py
D	api/dify_graph/nodes/tool/entities.py
D	api/dify_graph/nodes/tool/exc.py
D	api/dify_graph/nodes/tool/tool_node.py
D	api/dify_graph/nodes/trigger_plugin/__init__.py
D	api/dify_graph/nodes/trigger_plugin/entities.py
D	api/dify_graph/nodes/trigger_plugin/exc.py
D	api/dify_graph/nodes/trigger_plugin/trigger_event_node.py
D	api/dify_graph/nodes/trigger_schedule/__init__.py
D	api/dify_graph/nodes/trigger_schedule/entities.py
D	api/dify_graph/nodes/trigger_schedule/exc.py
D	api/dify_graph/nodes/trigger_schedule/trigger_schedule_node.py
D	api/dify_graph/nodes/trigger_webhook/__init__.py
D	api/dify_graph/nodes/trigger_webhook/entities.py
D	api/dify_graph/nodes/trigger_webhook/exc.py
D	api/dify_graph/nodes/trigger_webhook/node.py
D	api/dify_graph/nodes/variable_aggregator/__init__.py
D	api/dify_graph/nodes/variable_aggregator/entities.py
D	api/dify_graph/nodes/variable_aggregator/variable_aggregator_node.py
D	api/dify_graph/nodes/variable_assigner/__init__.py
D	api/dify_graph/nodes/variable_assigner/common/__init__.py
D	api/dify_graph/nodes/variable_assigner/common/exc.py
D	api/dify_graph/nodes/variable_assigner/common/helpers.py
D	api/dify_graph/nodes/variable_assigner/v1/__init__.py
D	api/dify_graph/nodes/variable_assigner/v1/node.py
D	api/dify_graph/nodes/variable_assigner/v1/node_data.py
D	api/dify_graph/nodes/variable_assigner/v2/__init__.py
D	api/dify_graph/nodes/variable_assigner/v2/entities.py
D	api/dify_graph/nodes/variable_assigner/v2/enums.py
D	api/dify_graph/nodes/variable_assigner/v2/exc.py
D	api/dify_graph/nodes/variable_assigner/v2/helpers.py
D	api/dify_graph/nodes/variable_assigner/v2/node.py
D	api/dify_graph/repositories/__init__.py
D	api/dify_graph/repositories/datasource_manager_protocol.py
D	api/dify_graph/repositories/draft_variable_repository.py
D	api/dify_graph/repositories/human_input_form_repository.py
D	api/dify_graph/repositories/index_processor_protocol.py
D	api/dify_graph/repositories/rag_retrieval_protocol.py
D	api/dify_graph/repositories/summary_index_service_protocol.py
D	api/dify_graph/repositories/workflow_execution_repository.py
D	api/dify_graph/repositories/workflow_node_execution_repository.py
D	api/dify_graph/runtime/__init__.py
D	api/dify_graph/runtime/graph_runtime_state.py
D	api/dify_graph/runtime/graph_runtime_state_protocol.py
D	api/dify_graph/runtime/read_only_wrappers.py
D	api/dify_graph/runtime/variable_pool.py
D	api/dify_graph/system_variable.py
D	api/dify_graph/utils/__init__.py
D	api/dify_graph/utils/condition/__init__.py
D	api/dify_graph/utils/condition/entities.py
D	api/dify_graph/utils/condition/processor.py
D	api/dify_graph/variable_loader.py
D	api/dify_graph/variables/__init__.py
D	api/dify_graph/variables/consts.py
D	api/dify_graph/variables/exc.py
D	api/dify_graph/variables/input_entities.py
D	api/dify_graph/variables/segment_group.py
D	api/dify_graph/variables/segments.py
D	api/dify_graph/variables/types.py
D	api/dify_graph/variables/utils.py
D	api/dify_graph/variables/variables.py
D	api/dify_graph/workflow_type_encoder.py
M	api/docker/entrypoint.sh
M	api/events/event_handlers/delete_tool_parameters_cache_when_sync_draft_workflow.py
M	api/events/event_handlers/sync_workflow_schedule_when_app_published.py
M	api/events/event_handlers/update_app_dataset_join_when_app_model_config_updated.py
M	api/events/event_handlers/update_app_dataset_join_when_app_published_workflow_updated.py
M	api/events/event_handlers/update_app_triggers_when_app_published_workflow_updated.py
M	api/extensions/ext_redis.py
M	api/extensions/ext_sentry.py
M	api/extensions/logstore/repositories/logstore_api_workflow_node_execution_repository.py
M	api/extensions/logstore/repositories/logstore_workflow_execution_repository.py
M	api/extensions/logstore/repositories/logstore_workflow_node_execution_repository.py
M	api/extensions/otel/parser/base.py
M	api/extensions/otel/parser/llm.py
M	api/extensions/otel/parser/retrieval.py
M	api/extensions/otel/parser/tool.py
M	api/factories/file_factory.py
M	api/factories/variable_factory.py
M	api/fields/_value_type_serializer.py
M	api/fields/conversation_fields.py
M	api/fields/member_fields.py
M	api/fields/message_fields.py
M	api/fields/raws.py
M	api/fields/workflow_fields.py
D	api/libs/broadcast_channel/redis/streams_channel.py
M	api/libs/helper.py
D	api/migrations/versions/2026_02_26_1336-e288952f2994_add_partial_indexes_on_conversations_.py
M	api/models/__init__.py
M	api/models/dataset.py
M	api/models/enums.py
M	api/models/human_input.py
M	api/models/model.py
M	api/models/workflow.py
M	api/pyproject.toml
D	api/pyrefly-local-excludes.txt
A	api/pyrefly.toml
M	api/repositories/api_workflow_node_execution_repository.py
M	api/repositories/api_workflow_run_repository.py
M	api/repositories/entities/workflow_pause.py
M	api/repositories/sqlalchemy_api_workflow_node_execution_repository.py
M	api/repositories/sqlalchemy_api_workflow_run_repository.py
M	api/repositories/sqlalchemy_execution_extra_content_repository.py
M	api/services/account_service.py
M	api/services/app_dsl_service.py
M	api/services/app_generate_service.py
M	api/services/app_model_config_service.py
M	api/services/app_service.py
M	api/services/app_task_service.py
M	api/services/audio_service.py
M	api/services/clear_free_plan_tenant_expired_logs.py
M	api/services/conversation_service.py
M	api/services/conversation_variable_updater.py
M	api/services/dataset_service.py
M	api/services/datasource_provider_service.py
M	api/services/entities/knowledge_entities/knowledge_entities.py
M	api/services/entities/model_provider_entities.py
M	api/services/external_knowledge_service.py
M	api/services/file_service.py
M	api/services/hit_testing_service.py
M	api/services/human_input_delivery_test_service.py
M	api/services/human_input_service.py
M	api/services/message_service.py
M	api/services/model_load_balancing_service.py
M	api/services/model_provider_service.py
M	api/services/rag_pipeline/rag_pipeline.py
M	api/services/rag_pipeline/rag_pipeline_dsl_service.py
M	api/services/retention/workflow_run/archive_paid_plan_workflow_run.py
M	api/services/summary_index_service.py
M	api/services/tools/api_tools_manage_service.py
M	api/services/tools/workflow_tools_manage_service.py
M	api/services/trigger/schedule_service.py
M	api/services/trigger/trigger_service.py
M	api/services/trigger/webhook_service.py
M	api/services/variable_truncator.py
M	api/services/vector_service.py
M	api/services/workflow/workflow_converter.py
M	api/services/workflow_app_service.py
M	api/services/workflow_draft_variable_service.py
M	api/services/workflow_event_snapshot_service.py
M	api/services/workflow_service.py
M	api/tasks/app_generate/workflow_execute_task.py
M	api/tasks/async_workflow_tasks.py
M	api/tasks/batch_create_segment_to_index_task.py
M	api/tasks/generate_summary_index_task.py
M	api/tasks/human_input_timeout_tasks.py
M	api/tasks/mail_human_input_delivery_task.py
M	api/tasks/regenerate_summary_index_task.py
M	api/tasks/trigger_processing_tasks.py
M	api/tasks/workflow_execution_tasks.py
M	api/tasks/workflow_node_execution_tasks.py
M	api/tasks/workflow_schedule_tasks.py
M	api/tests/integration_tests/core/datasource/test_datasource_manager_integration.py
M	api/tests/integration_tests/core/workflow/nodes/datasource/test_datasource_node_integration.py
M	api/tests/integration_tests/factories/test_storage_key_loader.py
M	api/tests/integration_tests/model_runtime/__mock/plugin_model.py
M	api/tests/integration_tests/services/test_workflow_draft_variable_service.py
M	api/tests/integration_tests/tasks/test_remove_app_and_related_data_task.py
M	api/tests/integration_tests/workflow/nodes/__mock/model.py
D	api/tests/integration_tests/workflow/nodes/knowledge_index/__init__.py
D	api/tests/integration_tests/workflow/nodes/knowledge_index/test_knowledge_index_node_integration.py
M	api/tests/integration_tests/workflow/nodes/test_code.py
M	api/tests/integration_tests/workflow/nodes/test_http.py
M	api/tests/integration_tests/workflow/nodes/test_llm.py
M	api/tests/integration_tests/workflow/nodes/test_parameter_extractor.py
M	api/tests/integration_tests/workflow/nodes/test_template_transform.py
M	api/tests/integration_tests/workflow/nodes/test_tool.py
M	api/tests/test_containers_integration_tests/controllers/console/app/test_chat_conversation_status_count_api.py
M	api/tests/test_containers_integration_tests/core/app/layers/test_pause_state_persist_layer.py
M	api/tests/test_containers_integration_tests/core/rag/retrieval/test_dataset_retrieval_integration.py
M	api/tests/test_containers_integration_tests/core/repositories/test_human_input_form_repository_impl.py
M	api/tests/test_containers_integration_tests/core/workflow/test_human_input_resume_node_execution.py
M	api/tests/test_containers_integration_tests/factories/test_storage_key_loader.py
M	api/tests/test_containers_integration_tests/helpers/execution_extra_content.py
M	api/tests/test_containers_integration_tests/repositories/test_sqlalchemy_api_workflow_node_execution_repository.py
M	api/tests/test_containers_integration_tests/repositories/test_sqlalchemy_api_workflow_run_repository.py
M	api/tests/test_containers_integration_tests/services/dataset_collection_binding.py
M	api/tests/test_containers_integration_tests/services/dataset_service_update_delete.py
M	api/tests/test_containers_integration_tests/services/test_account_service.py
M	api/tests/test_containers_integration_tests/services/test_agent_service.py
M	api/tests/test_containers_integration_tests/services/test_annotation_service.py
M	api/tests/test_containers_integration_tests/services/test_api_based_extension_service.py
M	api/tests/test_containers_integration_tests/services/test_app_generate_service.py
M	api/tests/test_containers_integration_tests/services/test_app_service.py
D	api/tests/test_containers_integration_tests/services/test_dataset_permission_service.py
M	api/tests/test_containers_integration_tests/services/test_dataset_service.py
D	api/tests/test_containers_integration_tests/services/test_dataset_service_batch_update_document_status.py
D	api/tests/test_containers_integration_tests/services/test_dataset_service_delete_dataset.py
M	api/tests/test_containers_integration_tests/services/test_dataset_service_get_segments.py
M	api/tests/test_containers_integration_tests/services/test_dataset_service_retrieval.py
M	api/tests/test_containers_integration_tests/services/test_dataset_service_update_dataset.py
M	api/tests/test_containers_integration_tests/services/test_delete_archived_workflow_run.py
D	api/tests/test_containers_integration_tests/services/test_document_service_rename_document.py
M	api/tests/test_containers_integration_tests/services/test_file_service.py
M	api/tests/test_containers_integration_tests/services/test_human_input_delivery_test.py
M	api/tests/test_containers_integration_tests/services/test_message_service.py
M	api/tests/test_containers_integration_tests/services/test_messages_clean_service.py
M	api/tests/test_containers_integration_tests/services/test_metadata_service.py
M	api/tests/test_containers_integration_tests/services/test_model_load_balancing_service.py
M	api/tests/test_containers_integration_tests/services/test_model_provider_service.py
M	api/tests/test_containers_integration_tests/services/test_saved_message_service.py
M	api/tests/test_containers_integration_tests/services/test_tag_service.py
M	api/tests/test_containers_integration_tests/services/test_trigger_provider_service.py
M	api/tests/test_containers_integration_tests/services/test_web_conversation_service.py
M	api/tests/test_containers_integration_tests/services/test_webapp_auth_service.py
M	api/tests/test_containers_integration_tests/services/test_workflow_app_service.py
M	api/tests/test_containers_integration_tests/services/test_workflow_draft_variable_service.py
M	api/tests/test_containers_integration_tests/services/test_workflow_run_service.py
M	api/tests/test_containers_integration_tests/services/test_workflow_service.py
M	api/tests/test_containers_integration_tests/services/test_workspace_service.py
M	api/tests/test_containers_integration_tests/services/tools/test_api_tools_manage_service.py
M	api/tests/test_containers_integration_tests/services/tools/test_mcp_tools_manage_service.py
M	api/tests/test_containers_integration_tests/services/tools/test_tools_transform_service.py
M	api/tests/test_containers_integration_tests/services/tools/test_workflow_tools_manage_service.py
M	api/tests/test_containers_integration_tests/services/workflow/test_workflow_converter.py
M	api/tests/test_containers_integration_tests/services/workflow/test_workflow_node_execution_service_repository.py
M	api/tests/test_containers_integration_tests/tasks/test_add_document_to_index_task.py
M	api/tests/test_containers_integration_tests/tasks/test_batch_clean_document_task.py
M	api/tests/test_containers_integration_tests/tasks/test_batch_create_segment_to_index_task.py
M	api/tests/test_containers_integration_tests/tasks/test_clean_dataset_task.py
M	api/tests/test_containers_integration_tests/tasks/test_disable_segment_from_index_task.py
M	api/tests/test_containers_integration_tests/tasks/test_disable_segments_from_index_task.py
M	api/tests/test_containers_integration_tests/tasks/test_duplicate_document_indexing_task.py
M	api/tests/test_containers_integration_tests/tasks/test_enable_segments_to_index_task.py
M	api/tests/test_containers_integration_tests/tasks/test_mail_account_deletion_task.py
M	api/tests/test_containers_integration_tests/tasks/test_mail_human_input_delivery_task.py
M	api/tests/test_containers_integration_tests/tasks/test_rag_pipeline_run_tasks.py
M	api/tests/test_containers_integration_tests/tasks/test_remove_app_and_related_data_task.py
M	api/tests/test_containers_integration_tests/test_workflow_pause_integration.py
M	api/tests/test_containers_integration_tests/trigger/test_trigger_e2e.py
M	api/tests/unit_tests/controllers/console/app/test_workflow_pause_details_api.py
M	api/tests/unit_tests/controllers/console/app/workflow_draft_variables_test.py
M	api/tests/unit_tests/controllers/console/test_wraps.py
M	api/tests/unit_tests/controllers/console/workspace/test_load_balancing_config.py
M	api/tests/unit_tests/controllers/service_api/app/test_audio.py
M	api/tests/unit_tests/controllers/service_api/app/test_completion.py
M	api/tests/unit_tests/controllers/service_api/app/test_workflow.py
M	api/tests/unit_tests/controllers/service_api/app/test_workflow_fields.py
M	api/tests/unit_tests/core/agent/output_parser/test_cot_output_parser.py
M	api/tests/unit_tests/core/app/app_config/features/file_upload/test_manager.py
M	api/tests/unit_tests/core/app/apps/advanced_chat/test_app_runner_conversation_variables.py
M	api/tests/unit_tests/core/app/apps/advanced_chat/test_generate_task_pipeline_extra_contents.py
M	api/tests/unit_tests/core/app/apps/chat/test_base_app_runner_multimodal.py
M	api/tests/unit_tests/core/app/apps/common/test_graph_runtime_state_support.py
M	api/tests/unit_tests/core/app/apps/common/test_workflow_response_converter.py
M	api/tests/unit_tests/core/app/apps/common/test_workflow_response_converter_human_input.py
M	api/tests/unit_tests/core/app/apps/common/test_workflow_response_converter_resumption.py
M	api/tests/unit_tests/core/app/apps/common/test_workflow_response_converter_truncation.py
M	api/tests/unit_tests/core/app/apps/test_base_app_generator.py
M	api/tests/unit_tests/core/app/apps/test_pause_resume.py
M	api/tests/unit_tests/core/app/apps/test_workflow_app_runner_notifications.py
M	api/tests/unit_tests/core/app/apps/test_workflow_app_runner_single_node.py
M	api/tests/unit_tests/core/app/apps/test_workflow_pause_events.py
M	api/tests/unit_tests/core/app/apps/workflow/test_generate_task_pipeline.py
M	api/tests/unit_tests/core/app/layers/test_conversation_variable_persist_layer.py
M	api/tests/unit_tests/core/app/layers/test_pause_state_persist_layer.py
M	api/tests/unit_tests/core/app/task_pipeline/test_easy_ui_based_generate_task_pipeline.py
M	api/tests/unit_tests/core/datasource/test_datasource_manager.py
M	api/tests/unit_tests/core/file/test_models.py
M	api/tests/unit_tests/core/mcp/server/test_streamable_http.py
M	api/tests/unit_tests/core/model_runtime/__base/test_increase_tool_call.py
M	api/tests/unit_tests/core/model_runtime/__base/test_large_language_model_non_stream_parsing.py
M	api/tests/unit_tests/core/model_runtime/entities/test_llm_entities.py
M	api/tests/unit_tests/core/ops/test_arize_phoenix_trace.py
M	api/tests/unit_tests/core/plugin/test_plugin_runtime.py
M	api/tests/unit_tests/core/prompt/test_advanced_prompt_transform.py
M	api/tests/unit_tests/core/prompt/test_agent_history_prompt_transform.py
M	api/tests/unit_tests/core/prompt/test_prompt_message.py
M	api/tests/unit_tests/core/prompt/test_prompt_transform.py
M	api/tests/unit_tests/core/prompt/test_simple_prompt_transform.py
M	api/tests/unit_tests/core/rag/embedding/test_embedding_service.py
M	api/tests/unit_tests/core/rag/indexing/test_indexing_runner.py
M	api/tests/unit_tests/core/rag/rerank/test_reranker.py
M	api/tests/unit_tests/core/rag/retrieval/test_dataset_retrieval_methods.py
M	api/tests/unit_tests/core/repositories/test_celery_workflow_execution_repository.py
M	api/tests/unit_tests/core/repositories/test_celery_workflow_node_execution_repository.py
M	api/tests/unit_tests/core/repositories/test_factory.py
M	api/tests/unit_tests/core/repositories/test_human_input_form_repository_impl.py
M	api/tests/unit_tests/core/repositories/test_workflow_node_execution_conflict_handling.py
M	api/tests/unit_tests/core/repositories/test_workflow_node_execution_truncation.py
M	api/tests/unit_tests/core/test_file.py
M	api/tests/unit_tests/core/test_model_manager.py
M	api/tests/unit_tests/core/test_provider_configuration.py
M	api/tests/unit_tests/core/test_provider_manager.py
M	api/tests/unit_tests/core/test_trigger_debug_event_selectors.py
M	api/tests/unit_tests/core/variables/test_segment.py
M	api/tests/unit_tests/core/variables/test_segment_type.py
M	api/tests/unit_tests/core/variables/test_segment_type_validation.py
M	api/tests/unit_tests/core/variables/test_variables.py
M	api/tests/unit_tests/core/workflow/context/test_execution_context.py
M	api/tests/unit_tests/core/workflow/entities/test_graph_runtime_state.py
M	api/tests/unit_tests/core/workflow/entities/test_pause_reason.py
M	api/tests/unit_tests/core/workflow/entities/test_template.py
M	api/tests/unit_tests/core/workflow/entities/test_variable_pool.py
M	api/tests/unit_tests/core/workflow/entities/test_workflow_node_execution.py
M	api/tests/unit_tests/core/workflow/graph/test_graph.py
M	api/tests/unit_tests/core/workflow/graph/test_graph_builder.py
M	api/tests/unit_tests/core/workflow/graph/test_graph_skip_validation.py
M	api/tests/unit_tests/core/workflow/graph/test_graph_validation.py
M	api/tests/unit_tests/core/workflow/graph_engine/README.md
M	api/tests/unit_tests/core/workflow/graph_engine/command_channels/test_redis_channel.py
M	api/tests/unit_tests/core/workflow/graph_engine/event_management/test_event_handlers.py
M	api/tests/unit_tests/core/workflow/graph_engine/event_management/test_event_manager.py
M	api/tests/unit_tests/core/workflow/graph_engine/graph_traversal/test_skip_propagator.py
M	api/tests/unit_tests/core/workflow/graph_engine/human_input_test_utils.py
M	api/tests/unit_tests/core/workflow/graph_engine/layers/conftest.py
M	api/tests/unit_tests/core/workflow/graph_engine/layers/test_layer_initialization.py
M	api/tests/unit_tests/core/workflow/graph_engine/layers/test_llm_quota.py
M	api/tests/unit_tests/core/workflow/graph_engine/layers/test_observability.py
M	api/tests/unit_tests/core/workflow/graph_engine/orchestration/test_dispatcher.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_answer_end_with_text.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_auto_mock_system.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_basic_chatflow.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_command_system.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_complex_branch_workflow.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_conditional_streaming_vs_template_workflow.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_dispatcher_pause_drain.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_end_node_without_value_type.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_execution_coordinator.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_graph_engine.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_graph_execution_serialization.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_graph_state_snapshot.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_human_input_pause_multi_branch.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_human_input_pause_single_branch.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_if_else_streaming.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_loop_contains_answer.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_loop_with_tool.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_config.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_factory.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_iteration_simple.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_nodes.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_nodes_template_code.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_mock_simple.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_parallel_human_input_join_resume.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_parallel_human_input_pause_missing_finish.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_parallel_streaming_workflow.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_pause_deferred_ready_nodes.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_pause_resume_state.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_redis_stop_integration.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_streaming_conversation_variables.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_table_runner.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_tool_in_chatflow.py
M	api/tests/unit_tests/core/workflow/graph_engine/test_variable_aggregator.py
M	api/tests/unit_tests/core/workflow/nodes/answer/test_answer.py
M	api/tests/unit_tests/core/workflow/nodes/base/test_base_node.py
M	api/tests/unit_tests/core/workflow/nodes/base/test_get_node_type_classes_mapping.py
M	api/tests/unit_tests/core/workflow/nodes/code/code_node_spec.py
M	api/tests/unit_tests/core/workflow/nodes/code/entities_spec.py
M	api/tests/unit_tests/core/workflow/nodes/datasource/test_datasource_node.py
M	api/tests/unit_tests/core/workflow/nodes/http_request/test_config.py
M	api/tests/unit_tests/core/workflow/nodes/http_request/test_entities.py
M	api/tests/unit_tests/core/workflow/nodes/http_request/test_http_request_executor.py
M	api/tests/unit_tests/core/workflow/nodes/http_request/test_http_request_node.py
M	api/tests/unit_tests/core/workflow/nodes/human_input/test_email_delivery_config.py
M	api/tests/unit_tests/core/workflow/nodes/human_input/test_entities.py
M	api/tests/unit_tests/core/workflow/nodes/human_input/test_human_input_form_filled_event.py
M	api/tests/unit_tests/core/workflow/nodes/iteration/entities_spec.py
M	api/tests/unit_tests/core/workflow/nodes/iteration/iteration_node_spec.py
D	api/tests/unit_tests/core/workflow/nodes/iteration/test_iteration_child_engine_errors.py
D	api/tests/unit_tests/core/workflow/nodes/knowledge_index/__init__.py
D	api/tests/unit_tests/core/workflow/nodes/knowledge_index/test_knowledge_index_node.py
M	api/tests/unit_tests/core/workflow/nodes/knowledge_retrieval/test_knowledge_retrieval_node.py
M	api/tests/unit_tests/core/workflow/nodes/list_operator/node_spec.py
M	api/tests/unit_tests/core/workflow/nodes/llm/test_file_saver.py
M	api/tests/unit_tests/core/workflow/nodes/llm/test_node.py
M	api/tests/unit_tests/core/workflow/nodes/llm/test_scenarios.py
M	api/tests/unit_tests/core/workflow/nodes/parameter_extractor/test_entities.py
M	api/tests/unit_tests/core/workflow/nodes/parameter_extractor/test_parameter_extractor_node.py
M	api/tests/unit_tests/core/workflow/nodes/template_transform/entities_spec.py
M	api/tests/unit_tests/core/workflow/nodes/template_transform/template_transform_node_spec.py
M	api/tests/unit_tests/core/workflow/nodes/test_base_node.py
M	api/tests/unit_tests/core/workflow/nodes/test_document_extractor_node.py
M	api/tests/unit_tests/core/workflow/nodes/test_if_else.py
M	api/tests/unit_tests/core/workflow/nodes/test_list_operator.py
M	api/tests/unit_tests/core/workflow/nodes/test_question_classifier_node.py
M	api/tests/unit_tests/core/workflow/nodes/test_start_node_json_object.py
M	api/tests/unit_tests/core/workflow/nodes/tool/test_tool_node.py
M	api/tests/unit_tests/core/workflow/nodes/variable_assigner/v1/test_variable_assigner_v1.py
M	api/tests/unit_tests/core/workflow/nodes/variable_assigner/v2/test_helpers.py
M	api/tests/unit_tests/core/workflow/nodes/variable_assigner/v2/test_variable_assigner_v2.py
M	api/tests/unit_tests/core/workflow/nodes/webhook/test_entities.py
M	api/tests/unit_tests/core/workflow/nodes/webhook/test_exceptions.py
M	api/tests/unit_tests/core/workflow/nodes/webhook/test_webhook_file_conversion.py
M	api/tests/unit_tests/core/workflow/nodes/webhook/test_webhook_node.py
M	api/tests/unit_tests/core/workflow/test_enums.py
M	api/tests/unit_tests/core/workflow/test_system_variable.py
M	api/tests/unit_tests/core/workflow/test_system_variable_read_only_view.py
M	api/tests/unit_tests/core/workflow/test_variable_pool.py
M	api/tests/unit_tests/core/workflow/test_workflow_entry.py
M	api/tests/unit_tests/core/workflow/test_workflow_entry_redis_channel.py
M	api/tests/unit_tests/core/workflow/utils/test_condition.py
M	api/tests/unit_tests/core/workflow/utils/test_variable_template_parser.py
M	api/tests/unit_tests/factories/test_variable_factory.py
M	api/tests/unit_tests/libs/_human_input/support.py
M	api/tests/unit_tests/libs/_human_input/test_form_service.py
M	api/tests/unit_tests/libs/_human_input/test_models.py
D	api/tests/unit_tests/libs/broadcast_channel/redis/test_streams_channel_unit_tests.py
M	api/tests/unit_tests/libs/test_cron_compatibility.py
M	api/tests/unit_tests/models/test_app_models.py
M	api/tests/unit_tests/models/test_conversation_variable.py
M	api/tests/unit_tests/models/test_workflow.py
M	api/tests/unit_tests/models/test_workflow_models.py
M	api/tests/unit_tests/repositories/test_sqlalchemy_api_workflow_run_repository.py
M	api/tests/unit_tests/repositories/test_sqlalchemy_execution_extra_content_repository.py
M	api/tests/unit_tests/repositories/workflow_node_execution/test_sqlalchemy_repository.py
M	api/tests/unit_tests/repositories/workflow_node_execution/test_sqlalchemy_workflow_node_execution_repository.py
M	api/tests/unit_tests/services/dataset_permission_service.py
M	api/tests/unit_tests/services/document_service_validation.py
M	api/tests/unit_tests/services/external_dataset_service.py
M	api/tests/unit_tests/services/test_account_service.py
D	api/tests/unit_tests/services/test_app_generate_service_streaming_integration.py
M	api/tests/unit_tests/services/test_dataset_service_batch_update_document_status.py
M	api/tests/unit_tests/services/test_dataset_service_create_dataset.py
A	api/tests/unit_tests/services/test_dataset_service_delete_dataset.py
A	api/tests/unit_tests/services/test_document_service_rename_document.py
M	api/tests/unit_tests/services/test_human_input_delivery_test_service.py
M	api/tests/unit_tests/services/test_human_input_service.py
M	api/tests/unit_tests/services/test_model_provider_service_sanitization.py
M	api/tests/unit_tests/services/test_schedule_service.py
M	api/tests/unit_tests/services/test_variable_truncator.py
M	api/tests/unit_tests/services/test_workflow_run_service_pause.py
M	api/tests/unit_tests/services/test_workflow_service.py
M	api/tests/unit_tests/services/workflow/test_draft_var_loader_simple.py
M	api/tests/unit_tests/services/workflow/test_workflow_converter.py
M	api/tests/unit_tests/services/workflow/test_workflow_draft_variable_service.py
M	api/tests/unit_tests/services/workflow/test_workflow_event_snapshot_service.py
M	api/tests/unit_tests/services/workflow/test_workflow_human_input_delivery.py
M	api/tests/unit_tests/services/workflow/test_workflow_service.py
M	api/tests/unit_tests/tasks/test_duplicate_document_indexing_task.py
M	api/tests/unit_tests/tasks/test_human_input_timeout_tasks.py
D	api/tests/unit_tests/tasks/test_summary_queue_isolation.py
M	api/tests/unit_tests/tasks/test_workflow_execute_task.py
M	api/tests/unit_tests/tasks/test_workflow_node_execution_tasks.py
M	api/tests/unit_tests/tools/test_mcp_tool.py
M	api/tests/unit_tests/utils/structured_output_parser/test_structured_output_parser.py
D	api/tests/workflow_test_utils.py
M	api/uv.lock
D	dev/pyrefly-check-local
M	dev/start-worker
M	docker/.env.example
M	docker/docker-compose.yaml
M	docker/middleware.env.example
M	web/.nvmrc
M	web/Dockerfile
M	web/__tests__/apps/app-card-operations-flow.test.tsx
M	web/__tests__/apps/app-list-browsing-flow.test.tsx
M	web/__tests__/apps/create-app-flow.test.tsx
M	web/__tests__/datasets/document-management.test.tsx
M	web/__tests__/rag-pipeline/dsl-export-import-flow.test.ts
M	web/__tests__/tools/tool-browsing-and-filtering.test.tsx
M	web/app/(commonLayout)/app/(appDetailLayout)/[appId]/layout-main.tsx
M	web/app/(commonLayout)/app/(appDetailLayout)/[appId]/overview/card-view.tsx
M	web/app/(commonLayout)/layout.tsx
M	web/app/account/(commonLayout)/account-page/AvatarWithEdit.tsx
M	web/app/account/(commonLayout)/account-page/email-change-modal.tsx
M	web/app/account/(commonLayout)/account-page/index.tsx
M	web/app/account/(commonLayout)/layout.tsx
M	web/app/account/oauth/authorize/layout.tsx
M	web/app/components/app-initializer.tsx
D	web/app/components/app-sidebar/__tests__/app-sidebar-dropdown.spec.tsx
D	web/app/components/app-sidebar/__tests__/basic.spec.tsx
D	web/app/components/app-sidebar/__tests__/dataset-sidebar-dropdown.spec.tsx
D	web/app/components/app-sidebar/__tests__/index.spec.tsx
D	web/app/components/app-sidebar/__tests__/sidebar-animation-issues.spec.tsx
D	web/app/components/app-sidebar/__tests__/text-squeeze-fix-verification.spec.tsx
D	web/app/components/app-sidebar/__tests__/toggle-button.spec.tsx
A	web/app/components/app-sidebar/app-info.tsx
D	web/app/components/app-sidebar/app-info/__tests__/app-info-detail-panel.spec.tsx
D	web/app/components/app-sidebar/app-info/__tests__/app-info-modals.spec.tsx
D	web/app/components/app-sidebar/app-info/__tests__/app-info-trigger.spec.tsx
D	web/app/components/app-sidebar/app-info/__tests__/app-mode-labels.spec.ts
D	web/app/components/app-sidebar/app-info/__tests__/app-operations.spec.tsx
D	web/app/components/app-sidebar/app-info/__tests__/index.spec.tsx
D	web/app/components/app-sidebar/app-info/__tests__/use-app-info-actions.spec.ts
D	web/app/components/app-sidebar/app-info/app-info-detail-panel.tsx
D	web/app/components/app-sidebar/app-info/app-info-modals.tsx
D	web/app/components/app-sidebar/app-info/app-info-trigger.tsx
D	web/app/components/app-sidebar/app-info/app-mode-labels.ts
D	web/app/components/app-sidebar/app-info/app-operations.tsx
D	web/app/components/app-sidebar/app-info/index.tsx
D	web/app/components/app-sidebar/app-info/use-app-info-actions.ts
A	web/app/components/app-sidebar/app-operations.tsx
M	web/app/components/app-sidebar/app-sidebar-dropdown.tsx
M	web/app/components/app-sidebar/basic.tsx
A	web/app/components/app-sidebar/completion.png
D	web/app/components/app-sidebar/dataset-info/__tests__/dropdown-callbacks.spec.tsx
D	web/app/components/app-sidebar/dataset-info/__tests__/index.spec.tsx
A	web/app/components/app-sidebar/dataset-info/index.spec.tsx
M	web/app/components/app-sidebar/dataset-info/index.tsx
M	web/app/components/app-sidebar/dataset-info/menu-item.tsx
M	web/app/components/app-sidebar/dataset-sidebar-dropdown.tsx
A	web/app/components/app-sidebar/expert.png
M	web/app/components/app-sidebar/index.tsx
D	web/app/components/app-sidebar/nav-link/__tests__/index.spec.tsx
D	web/app/components/app-sidebar/nav-link/index.tsx
A	web/app/components/app-sidebar/navLink.spec.tsx
A	web/app/components/app-sidebar/navLink.tsx
A	web/app/components/app-sidebar/sidebar-animation-issues.spec.tsx
A	web/app/components/app-sidebar/style.module.css
A	web/app/components/app-sidebar/text-squeeze-fix-verification.spec.tsx
M	web/app/components/app-sidebar/toggle-button.tsx
M	web/app/components/app/annotation/batch-add-annotation-modal/csv-uploader.spec.tsx
M	web/app/components/app/annotation/batch-add-annotation-modal/csv-uploader.tsx
M	web/app/components/app/configuration/config-prompt/advanced-prompt-input.tsx
M	web/app/components/app/configuration/config-prompt/simple-prompt-input.tsx
M	web/app/components/app/configuration/config/agent/prompt-editor.tsx
M	web/app/components/app/configuration/dataset-config/settings-modal/index.spec.tsx
M	web/app/components/app/configuration/dataset-config/settings-modal/index.tsx
D	web/app/components/app/configuration/debug/debug-with-multiple-model/context-provider.tsx
M	web/app/components/app/configuration/debug/debug-with-multiple-model/context.spec.tsx
D	web/app/components/app/configuration/debug/debug-with-multiple-model/context.ts
A	web/app/components/app/configuration/debug/debug-with-multiple-model/context.tsx
M	web/app/components/app/configuration/debug/debug-with-multiple-model/index.tsx
M	web/app/components/app/configuration/debug/debug-with-single-model/index.spec.tsx
M	web/app/components/app/configuration/debug/index.tsx
M	web/app/components/app/configuration/index.tsx
M	web/app/components/app/configuration/tools/external-data-tool-modal.tsx
M	web/app/components/app/configuration/tools/index.tsx
M	web/app/components/app/create-app-modal/index.spec.tsx
M	web/app/components/app/create-app-modal/index.tsx
M	web/app/components/app/create-from-dsl-modal/index.tsx
M	web/app/components/app/create-from-dsl-modal/uploader.tsx
M	web/app/components/app/log/list.tsx
M	web/app/components/app/overview/settings/index.spec.tsx
M	web/app/components/app/overview/settings/index.tsx
M	web/app/components/app/switch-app-modal/index.spec.tsx
M	web/app/components/app/switch-app-modal/index.tsx
M	web/app/components/apps/__tests__/app-card.spec.tsx
M	web/app/components/apps/__tests__/list.spec.tsx
M	web/app/components/apps/app-card.tsx
M	web/app/components/apps/hooks/__tests__/use-apps-query-state.spec.tsx
M	web/app/components/apps/list.tsx
M	web/app/components/base/agent-log-modal/__tests__/detail.spec.tsx
M	web/app/components/base/agent-log-modal/__tests__/index.spec.tsx
M	web/app/components/base/agent-log-modal/detail.tsx
M	web/app/components/base/button/__tests__/index.spec.tsx
M	web/app/components/base/button/index.css
M	web/app/components/base/button/index.stories.tsx
M	web/app/components/base/button/index.tsx
D	web/app/components/base/chat/chat-with-history/context.ts
A	web/app/components/base/chat/chat-with-history/context.tsx
M	web/app/components/base/chat/chat-with-history/hooks.tsx
M	web/app/components/base/chat/chat/__tests__/context.spec.tsx
M	web/app/components/base/chat/chat/__tests__/question.spec.tsx
M	web/app/components/base/chat/chat/chat-input-area/__tests__/index.spec.tsx
M	web/app/components/base/chat/chat/chat-input-area/index.tsx
M	web/app/components/base/chat/chat/check-input-forms-hooks.ts
D	web/app/components/base/chat/chat/context-provider.tsx
D	web/app/components/base/chat/chat/context.ts
A	web/app/components/base/chat/chat/context.tsx
M	web/app/components/base/chat/chat/hooks.ts
M	web/app/components/base/chat/chat/index.tsx
D	web/app/components/base/chat/embedded-chatbot/context.ts
A	web/app/components/base/chat/embedded-chatbot/context.tsx
M	web/app/components/base/chat/embedded-chatbot/hooks.tsx
M	web/app/components/base/chat/embedded-chatbot/inputs-form/__tests__/content.spec.tsx
M	web/app/components/base/confirm/index.tsx
M	web/app/components/base/features/new-feature-panel/moderation/__tests__/moderation-setting-modal.spec.tsx
M	web/app/components/base/features/new-feature-panel/moderation/moderation-setting-modal.tsx
M	web/app/components/base/file-uploader/__tests__/hooks.spec.ts
M	web/app/components/base/file-uploader/hooks.ts
M	web/app/components/base/form/hooks/__tests__/use-check-validated.spec.ts
M	web/app/components/base/form/hooks/use-check-validated.ts
M	web/app/components/base/image-uploader/__tests__/hooks.spec.ts
M	web/app/components/base/image-uploader/hooks.ts
M	web/app/components/base/markdown-blocks/__tests__/button.spec.tsx
M	web/app/components/base/markdown-blocks/__tests__/think-block.spec.tsx
M	web/app/components/base/markdown-blocks/think-block.stories.tsx
M	web/app/components/base/modal/index.tsx
M	web/app/components/base/modal/modal.tsx
M	web/app/components/base/portal-to-follow-elem/index.tsx
M	web/app/components/base/prompt-editor/plugins/component-picker-block/__tests__/index.spec.tsx
D	web/app/components/base/radio/context/index.ts
A	web/app/components/base/radio/context/index.tsx
M	web/app/components/base/select/index.tsx
M	web/app/components/base/tag-input/__tests__/index.spec.tsx
M	web/app/components/base/tag-input/index.tsx
M	web/app/components/base/tag-management/__tests__/panel.spec.tsx
M	web/app/components/base/tag-management/__tests__/selector.spec.tsx
M	web/app/components/base/tag-management/index.tsx
M	web/app/components/base/tag-management/panel.tsx
M	web/app/components/base/tag-management/tag-item-editor.tsx
M	web/app/components/base/text-generation/__tests__/hooks.spec.ts
M	web/app/components/base/text-generation/hooks.ts
M	web/app/components/base/theme-switcher.tsx
M	web/app/components/base/toast/__tests__/index.spec.tsx
D	web/app/components/base/toast/context.ts
M	web/app/components/base/toast/index.stories.tsx
M	web/app/components/base/toast/index.tsx
M	web/app/components/base/tooltip/index.tsx
D	web/app/components/base/ui/alert-dialog/__tests__/index.spec.tsx
D	web/app/components/base/ui/alert-dialog/index.tsx
D	web/app/components/base/ui/dialog/__tests__/index.spec.tsx
D	web/app/components/base/ui/dialog/index.tsx
D	web/app/components/base/ui/dropdown-menu/__tests__/index.spec.tsx
D	web/app/components/base/ui/dropdown-menu/index.stories.tsx
D	web/app/components/base/ui/dropdown-menu/index.tsx
D	web/app/components/base/ui/placement.ts
D	web/app/components/base/ui/popover/__tests__/index.spec.tsx
D	web/app/components/base/ui/popover/index.tsx
D	web/app/components/base/ui/select/__tests__/index.spec.tsx
D	web/app/components/base/ui/select/index.tsx
D	web/app/components/base/ui/tooltip/__tests__/index.spec.tsx
D	web/app/components/base/ui/tooltip/index.tsx
M	web/app/components/custom/custom-web-app-brand/__tests__/index.spec.tsx
M	web/app/components/custom/custom-web-app-brand/index.tsx
M	web/app/components/datasets/create-from-pipeline/create-options/create-from-dsl-modal/__tests__/uploader.spec.tsx
M	web/app/components/datasets/create-from-pipeline/create-options/create-from-dsl-modal/hooks/use-dsl-import.ts
M	web/app/components/datasets/create-from-pipeline/create-options/create-from-dsl-modal/uploader.tsx
M	web/app/components/datasets/create/empty-dataset-creation-modal/index.tsx
M	web/app/components/datasets/create/file-uploader/hooks/__tests__/use-file-upload.spec.tsx
M	web/app/components/datasets/create/file-uploader/hooks/use-file-upload.ts
M	web/app/components/datasets/create/step-two/__tests__/index.spec.tsx
M	web/app/components/datasets/documents/__tests__/index.spec.tsx
M	web/app/components/datasets/documents/components/__tests__/list.spec.tsx
M	web/app/components/datasets/documents/components/__tests__/operations.spec.tsx
M	web/app/components/datasets/documents/components/document-list/__tests__/index.spec.tsx
M	web/app/components/datasets/documents/components/document-list/components/__tests__/document-table-row.spec.tsx
M	web/app/components/datasets/documents/components/document-list/components/__tests__/sort-header.spec.tsx
M	web/app/components/datasets/documents/components/document-list/components/document-table-row.tsx
M	web/app/components/datasets/documents/components/document-list/components/sort-header.tsx
M	web/app/components/datasets/documents/components/document-list/hooks/__tests__/use-document-sort.spec.ts
M	web/app/components/datasets/documents/components/document-list/hooks/use-document-sort.ts
M	web/app/components/datasets/documents/components/list.tsx
M	web/app/components/datasets/documents/components/operations.tsx
M	web/app/components/datasets/documents/create-from-pipeline/data-source/local-file/hooks/__tests__/use-local-file-upload.spec.tsx
M	web/app/components/datasets/documents/detail/__tests__/index.spec.tsx
M	web/app/components/datasets/documents/detail/batch-modal/__tests__/csv-uploader.spec.tsx
M	web/app/components/datasets/documents/detail/batch-modal/csv-uploader.tsx
M	web/app/components/datasets/documents/detail/completed/__tests__/index.spec.tsx
M	web/app/components/datasets/documents/detail/completed/common/__tests__/regeneration-modal.spec.tsx
M	web/app/components/datasets/documents/detail/completed/hooks/__tests__/use-child-segment-data.spec.ts
M	web/app/components/datasets/documents/detail/completed/hooks/__tests__/use-segment-list-data.spec.ts
M	web/app/components/datasets/documents/detail/completed/hooks/use-child-segment-data.ts
M	web/app/components/datasets/documents/detail/completed/hooks/use-segment-list-data.ts
M	web/app/components/datasets/documents/detail/completed/new-child-segment.tsx
M	web/app/components/datasets/documents/detail/embedding/index.tsx
M	web/app/components/datasets/documents/detail/index.tsx
M	web/app/components/datasets/documents/detail/metadata/hooks/__tests__/use-metadata-state.spec.ts
M	web/app/components/datasets/documents/detail/metadata/hooks/use-metadata-state.ts
M	web/app/components/datasets/documents/detail/new-segment.tsx
A	web/app/components/datasets/documents/hooks/__tests__/use-document-list-query-state.spec.ts
D	web/app/components/datasets/documents/hooks/__tests__/use-document-list-query-state.spec.tsx
M	web/app/components/datasets/documents/hooks/__tests__/use-documents-page-state.spec.ts
M	web/app/components/datasets/documents/hooks/use-document-list-query-state.ts
M	web/app/components/datasets/documents/hooks/use-documents-page-state.ts
M	web/app/components/datasets/documents/index.tsx
M	web/app/components/datasets/documents/status-item/index.tsx
M	web/app/components/datasets/external-api/external-api-modal/__tests__/index.spec.tsx
M	web/app/components/datasets/external-api/external-api-modal/index.tsx
M	web/app/components/datasets/external-knowledge-base/connector/__tests__/index.spec.tsx
M	web/app/components/datasets/external-knowledge-base/connector/index.tsx
M	web/app/components/datasets/hit-testing/__tests__/index.spec.tsx
D	web/app/components/devtools/react-grab/loader.tsx
M	web/app/components/devtools/react-scan/loader.tsx
A	web/app/components/devtools/react-scan/scan.tsx
M	web/app/components/explore/app-list/__tests__/index.spec.tsx
M	web/app/components/goto-anything/actions/commands/slash.tsx
M	web/app/components/header/account-dropdown/compliance.spec.tsx
M	web/app/components/header/account-dropdown/compliance.tsx
M	web/app/components/header/account-dropdown/index.spec.tsx
M	web/app/components/header/account-dropdown/index.tsx
D	web/app/components/header/account-dropdown/menu-item-content.tsx
M	web/app/components/header/account-dropdown/support.spec.tsx
M	web/app/components/header/account-dropdown/support.tsx
M	web/app/components/header/account-dropdown/workplace-selector/index.spec.tsx
M	web/app/components/header/account-dropdown/workplace-selector/index.tsx
M	web/app/components/header/account-setting/api-based-extension-page/modal.spec.tsx
M	web/app/components/header/account-setting/api-based-extension-page/modal.tsx
M	web/app/components/header/account-setting/language-page/index.tsx
M	web/app/components/header/account-setting/members-page/edit-workspace-modal/index.spec.tsx
M	web/app/components/header/account-setting/members-page/edit-workspace-modal/index.tsx
M	web/app/components/header/account-setting/members-page/invite-modal/index.spec.tsx
M	web/app/components/header/account-setting/members-page/invite-modal/index.tsx
M	web/app/components/header/account-setting/members-page/operation/index.spec.tsx
M	web/app/components/header/account-setting/members-page/operation/index.tsx
M	web/app/components/header/account-setting/members-page/transfer-ownership-modal/index.spec.tsx
M	web/app/components/header/account-setting/members-page/transfer-ownership-modal/index.tsx
M	web/app/components/header/account-setting/model-provider-page/index.tsx
M	web/app/components/header/account-setting/model-provider-page/model-auth/hooks/use-auth.spec.tsx
M	web/app/components/header/account-setting/model-provider-page/model-auth/hooks/use-auth.ts
M	web/app/components/header/account-setting/model-provider-page/provider-added-card/credential-panel.spec.tsx
M	web/app/components/header/account-setting/model-provider-page/provider-added-card/credential-panel.tsx
M	web/app/components/header/account-setting/model-provider-page/provider-added-card/model-load-balancing-modal.spec.tsx
M	web/app/components/header/account-setting/model-provider-page/provider-added-card/model-load-balancing-modal.tsx
M	web/app/components/header/account-setting/model-provider-page/system-model-selector/index.spec.tsx
M	web/app/components/header/account-setting/model-provider-page/system-model-selector/index.tsx
M	web/app/components/header/account-setting/plugin-page/SerpapiPlugin.spec.tsx
M	web/app/components/header/account-setting/plugin-page/SerpapiPlugin.tsx
M	web/app/components/header/account-setting/plugin-page/index.spec.tsx
M	web/app/components/header/index.spec.tsx
M	web/app/components/header/index.tsx
M	web/app/components/header/utils/util.ts
M	web/app/components/plugins/marketplace/__tests__/atoms.spec.tsx
M	web/app/components/plugins/marketplace/__tests__/plugin-type-switch.spec.tsx
M	web/app/components/plugins/marketplace/__tests__/state.spec.tsx
M	web/app/components/plugins/marketplace/__tests__/sticky-search-and-switch-wrapper.spec.tsx
M	web/app/components/plugins/marketplace/hydration-server.tsx
M	web/app/components/plugins/marketplace/search-params.ts
M	web/app/components/plugins/plugin-auth/__tests__/authorized-in-node.spec.tsx
M	web/app/components/plugins/plugin-auth/__tests__/plugin-auth-in-agent.spec.tsx
M	web/app/components/plugins/plugin-auth/authorize/__tests__/api-key-modal.spec.tsx
M	web/app/components/plugins/plugin-auth/authorize/__tests__/authorize-components.spec.tsx
M	web/app/components/plugins/plugin-auth/authorize/__tests__/oauth-client-settings.spec.tsx
M	web/app/components/plugins/plugin-auth/authorize/api-key-modal.tsx
M	web/app/components/plugins/plugin-auth/authorize/oauth-client-settings.tsx
M	web/app/components/plugins/plugin-auth/authorized/__tests__/index.spec.tsx
M	web/app/components/plugins/plugin-auth/authorized/index.tsx
M	web/app/components/plugins/plugin-auth/hooks/__tests__/use-plugin-auth-action.spec.ts
M	web/app/components/plugins/plugin-auth/hooks/use-plugin-auth-action.ts
M	web/app/components/plugins/plugin-detail-panel/subscription-list/edit/__tests__/apikey-edit-modal.spec.tsx
M	web/app/components/plugins/plugin-detail-panel/subscription-list/edit/__tests__/manual-edit-modal.spec.tsx
M	web/app/components/plugins/plugin-detail-panel/subscription-list/edit/__tests__/oauth-edit-modal.spec.tsx
M	web/app/components/plugins/plugin-detail-panel/tool-selector/components/__tests__/tool-credentials-form.spec.tsx
M	web/app/components/plugins/plugin-page/__tests__/context.spec.tsx
M	web/app/components/plugins/plugin-page/__tests__/index.spec.tsx
D	web/app/components/plugins/plugin-page/context-provider.tsx
D	web/app/components/plugins/plugin-page/context.ts
A	web/app/components/plugins/plugin-page/context.tsx
M	web/app/components/plugins/plugin-page/index.tsx
A	web/app/components/provider/serwist.tsx
M	web/app/components/rag-pipeline/components/__tests__/index.spec.tsx
M	web/app/components/rag-pipeline/components/__tests__/update-dsl-modal.spec.tsx
M	web/app/components/rag-pipeline/components/rag-pipeline-header/__tests__/index.spec.tsx
M	web/app/components/rag-pipeline/components/rag-pipeline-header/publisher/__tests__/index.spec.tsx
M	web/app/components/rag-pipeline/components/rag-pipeline-header/publisher/__tests__/popup.spec.tsx
M	web/app/components/rag-pipeline/components/rag-pipeline-header/publisher/popup.tsx
M	web/app/components/rag-pipeline/hooks/__tests__/index.spec.ts
M	web/app/components/rag-pipeline/hooks/__tests__/use-DSL.spec.ts
M	web/app/components/rag-pipeline/hooks/__tests__/use-update-dsl-modal.spec.ts
M	web/app/components/rag-pipeline/hooks/use-DSL.ts
M	web/app/components/rag-pipeline/hooks/use-update-dsl-modal.ts
M	web/app/components/tools/__tests__/provider-list.spec.tsx
M	web/app/components/tools/provider-list.tsx
M	web/app/components/workflow-app/components/workflow-children.tsx
M	web/app/components/workflow-app/components/workflow-header/__tests__/features-trigger.spec.tsx
M	web/app/components/workflow-app/components/workflow-header/features-trigger.tsx
M	web/app/components/workflow-app/components/workflow-onboarding-modal/__tests__/index.spec.tsx
M	web/app/components/workflow-app/components/workflow-onboarding-modal/__tests__/start-node-option.spec.tsx
M	web/app/components/workflow-app/components/workflow-onboarding-modal/index.tsx
M	web/app/components/workflow-app/components/workflow-onboarding-modal/start-node-option.tsx
M	web/app/components/workflow-app/components/workflow-onboarding-modal/start-node-selection-panel.tsx
D	web/app/components/workflow-app/hooks/__tests__/use-nodes-sync-draft.spec.ts
D	web/app/components/workflow-app/hooks/__tests__/use-workflow-init.spec.ts
D	web/app/components/workflow-app/hooks/__tests__/use-workflow-refresh-draft.spec.ts
M	web/app/components/workflow-app/hooks/use-DSL.ts
M	web/app/components/workflow-app/hooks/use-nodes-sync-draft.ts
M	web/app/components/workflow-app/hooks/use-workflow-init.ts
M	web/app/components/workflow-app/hooks/use-workflow-refresh-draft.ts
D	web/app/components/workflow/__tests__/fixtures.ts
D	web/app/components/workflow/__tests__/reactflow-mock-state.ts
D	web/app/components/workflow/__tests__/service-mock-factory.ts
D	web/app/components/workflow/__tests__/trigger-status-sync.spec.tsx
A	web/app/components/workflow/__tests__/trigger-status-sync.test.tsx
D	web/app/components/workflow/__tests__/workflow-test-env.spec.tsx
D	web/app/components/workflow/__tests__/workflow-test-env.tsx
M	web/app/components/workflow/header/run-mode.tsx
D	web/app/components/workflow/hooks/__tests__/use-auto-generate-webhook-url.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-available-blocks.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-checklist.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-edges-interactions.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-helpline.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-hooksstore-wrappers.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-node-data-update.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-nodes-sync-draft.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-panel-interactions.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-selection-interactions.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-serial-async-callback.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-tool-icon.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-without-sync-hooks.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-workflow-mode.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-workflow-run-event-store-only.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-workflow-run-event-with-store.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-workflow-run-event-with-viewport.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-workflow-variables.spec.ts
D	web/app/components/workflow/hooks/__tests__/use-workflow.spec.ts
M	web/app/components/workflow/hooks/use-checklist.ts
D	web/app/components/workflow/nodes/human-input/__tests__/human-input.spec.tsx
A	web/app/components/workflow/nodes/human-input/__tests__/human-input.test.tsx
D	web/app/components/workflow/nodes/tool/__tests__/output-schema-utils.spec.ts
A	web/app/components/workflow/nodes/tool/__tests__/output-schema-utils.test.ts
D	web/app/components/workflow/nodes/trigger-plugin/utils/__tests__/form-helpers.spec.ts
A	web/app/components/workflow/nodes/trigger-plugin/utils/__tests__/form-helpers.test.ts
M	web/app/components/workflow/note-node/note-editor/plugins/link-editor-plugin/hooks.ts
M	web/app/components/workflow/panel/chat-variable-panel/components/object-value-item.tsx
M	web/app/components/workflow/panel/chat-variable-panel/components/variable-modal.tsx
M	web/app/components/workflow/panel/debug-and-preview/hooks.ts
M	web/app/components/workflow/panel/env-panel/variable-modal.tsx
M	web/app/components/workflow/run/index.tsx
D	web/app/components/workflow/store/__tests__/chat-variable-slice.spec.ts
D	web/app/components/workflow/store/__tests__/datasets-detail-store.spec.ts
D	web/app/components/workflow/store/__tests__/env-variable-slice.spec.ts
D	web/app/components/workflow/store/__tests__/inspect-vars-slice.spec.ts
D	web/app/components/workflow/store/__tests__/plugin-dependency-store.spec.ts
D	web/app/components/workflow/store/__tests__/trigger-status.spec.ts
A	web/app/components/workflow/store/__tests__/trigger-status.test.ts
D	web/app/components/workflow/store/__tests__/version-slice.spec.ts
D	web/app/components/workflow/store/__tests__/workflow-draft-slice.spec.ts
D	web/app/components/workflow/store/__tests__/workflow-store.spec.ts
M	web/app/components/workflow/update-dsl-modal.tsx
D	web/app/components/workflow/utils/__tests__/common.spec.ts
D	web/app/components/workflow/utils/__tests__/data-source.spec.ts
D	web/app/components/workflow/utils/__tests__/debug.spec.ts
D	web/app/components/workflow/utils/__tests__/edge.spec.ts
D	web/app/components/workflow/utils/__tests__/elk-layout.spec.ts
D	web/app/components/workflow/utils/__tests__/gen-node-meta-data.spec.ts
D	web/app/components/workflow/utils/__tests__/node-navigation.spec.ts
D	web/app/components/workflow/utils/__tests__/node.spec.ts
D	web/app/components/workflow/utils/__tests__/tool.spec.ts
D	web/app/components/workflow/utils/__tests__/trigger.spec.ts
D	web/app/components/workflow/utils/__tests__/variable.spec.ts
D	web/app/components/workflow/utils/__tests__/workflow-entry.spec.ts
D	web/app/components/workflow/utils/__tests__/workflow-init.spec.ts
D	web/app/components/workflow/utils/__tests__/workflow.spec.ts
A	web/app/components/workflow/utils/workflow-init.spec.ts
M	web/app/education-apply/education-apply-page.tsx
M	web/app/layout.tsx
A	web/app/serwist/[path]/route.ts
M	web/app/styles/globals.css
A	web/app/sw.ts
M	web/config/index.ts
D	web/context/app-context-provider.tsx
D	web/context/app-context.ts
A	web/context/app-context.tsx
D	web/context/datasets-context.ts
A	web/context/datasets-context.tsx
D	web/context/event-emitter-provider.tsx
D	web/context/event-emitter.ts
A	web/context/event-emitter.tsx
D	web/context/mitt-context-provider.tsx
D	web/context/mitt-context.ts
A	web/context/mitt-context.tsx
D	web/context/modal-context-provider.tsx
M	web/context/modal-context.test.tsx
D	web/context/modal-context.ts
A	web/context/modal-context.tsx
D	web/context/provider-context-provider.tsx
D	web/context/provider-context.ts
A	web/context/provider-context.tsx
D	web/context/workspace-context-provider.tsx
D	web/context/workspace-context.ts
A	web/context/workspace-context.tsx
D	web/contract/console/apps.ts
M	web/contract/router.ts
M	web/docs/lint.md
D	web/docs/overlay-migration.md
M	web/docs/test.md
M	web/env.ts
A	web/eslint-rules/index.js
A	web/eslint-rules/namespaces.js
A	web/eslint-rules/rules/consistent-placeholders.js
A	web/eslint-rules/rules/no-as-any-in-t.js
A	web/eslint-rules/rules/no-extra-keys.js
A	web/eslint-rules/rules/no-legacy-namespace-prefix.js
A	web/eslint-rules/rules/require-ns-option.js
A	web/eslint-rules/utils.js
M	web/eslint-suppressions.json
M	web/eslint.config.mjs
D	web/eslint.constants.mjs
M	web/hooks/use-import-dsl.ts
M	web/hooks/use-query-params.spec.tsx
M	web/hooks/use-query-params.ts
M	web/i18n-config/resources.ts
M	web/i18n/fr-FR/dataset.json
M	web/i18n/fr-FR/plugin.json
M	web/i18n/fr-FR/workflow.json
M	web/next.config.ts
M	web/package.json
D	web/plugins/eslint/index.js
D	web/plugins/eslint/namespaces.js
D	web/plugins/eslint/rules/consistent-placeholders.js
D	web/plugins/eslint/rules/no-as-any-in-t.js
D	web/plugins/eslint/rules/no-extra-keys.js
D	web/plugins/eslint/rules/no-legacy-namespace-prefix.js
D	web/plugins/eslint/rules/require-ns-option.js
D	web/plugins/eslint/utils.js
D	web/plugins/vite/custom-i18n-hmr.ts
D	web/plugins/vite/react-grab-open-file.ts
D	web/plugins/vite/utils.ts
M	web/pnpm-lock.yaml
M	web/proxy.ts
M	web/service/knowledge/use-document.ts
M	web/service/use-apps.ts
D	web/test/nuqs-testing.tsx
M	web/vite.config.ts


---
### 47674476e0 merge main into custom/het-dev-260117 with clipboard fix

| 字段 | 值 |
|------|----|
| **完整哈希** | `47674476e029da0383f9fe4c72e4a1c7dddf7b57` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-03-13 17:29:01 +0800 |
| **父提交** | 62c1d7b64ee08fa54f195aafd037f661e416d98f 20e91990bfbb0b665bd128cd8e0ca8d68e554726  |

**中文摘要（变更要点）**：再次合并 `main` 并保留剪贴板修复：将 `api/commands.py` 拆为 `commands/` 包、更新大量 GitHub Workflow 与 AGENTS、引入通知控制器等；同时重新应用此前因 revert 撤销的上游 chore 内容。

**提交说明（body）**：

**变更文件**：


---
### 5697ea8a43 chore(deps): add xlrd to Python requirements for enhanced Excel support

| 字段 | 值 |
|------|----|
| **完整哈希** | `5697ea8a43c39caa8838983e606882bf0804af36` |
| **作者** | Angelenx <lujinquan2@foxmail.com> |
| **提交时间** | 2026-04-17 09:45:50 +0800 |
| **父提交** | 47674476e029da0383f9fe4c72e4a1c7dddf7b57  |

**中文摘要（变更要点）**：在 Sandbox 依赖中增加/调整 `xlrd`，用于增强对 Excel 文件的读取支持（与既有 openpyxl 等形成互补）。

**提交说明（body）**：

**变更文件**：
M	docker/volumes/sandbox/dependencies/python-requirements.txt

