# 文档导航与管理方案

## 当前内容的唯一入口

| 文档类型 | 目录 / 入口 | 回答的问题 | 维护方式 |
|---|---|---|---|
| 需求规格 | [requirements](requirements/README.md) | 用户需要什么、业务规则和验收标准是什么 | 每个独立需求一个 REQ，持续更新当前规格 |
| 页面交互设计 | [design](design/README.md) | 页面如何展示、用户如何操作 | 按组件/关联功能组织，嵌入当前实际截图 |
| 变更记录 | [changes](changes/README.md) | 某轮澄清决定了什么、本轮改了什么 | 每轮实质业务澄清或页面设计一份简短记录，倒序索引 |
| 管理规范 | [guides](guides/requirements-standard.md) | 如何澄清、编写、验证和交付 | 持续维护流程与模板，AGENTS.md 负责执行约束 |
| 输入参考 | [reference](reference/README.md) | 设计依据来自哪里 | 保留来源与版本，不当作当前需求规格 |

需求澄清是形成和更新需求规格的过程，不是把完整需求存入独立 clarifications 目录的理由。同一规则只在对应 REQ 中维护；交互设计引用规则，变更记录引用 REQ 和设计，不重复复制完整规格。每轮记录负责保存决策和变化，不作为开发时的规格入口。

一个需求可经过多轮澄清，一个设计可覆盖多个相关需求。每轮实质澄清都更新受影响 REQ 与设计，并新增一份变更记录；纯协作规则调整只更新指南与 AGENTS.md，不再制造空页面变更文档。

## 本次分类纠正

| 原文档 | 处理 | 原因 |
|---|---|---|
| clarifications/widget-feature-clarification.md | 迁至 design/widget-interaction-design.md | 内容是完整页面交互设计和截图 |
| CL-002、CL-004、CL-005 | 迁至 changes，标注历史记录 | 保存来源跳转及布局前后变化，不能作为当前规格 |
| CL-006 关键交互图解 | 合并到当前交互设计后删除重复文档 | 截图及流程已由设计文档承载 |
| CL-001、CL-007 | 合并到 AGENTS.md 和规范后删除 | 重复记录协作约定，没有独立业务需求 |
| CL-003 HTTP 调测 | 合并到 HTTP 工具说明后删除 | 属于调测方法，不是业务需求 |
| clarifications/README.md | 删除，由本导航及各分类索引替代 | 消除重复且错误的入口 |
| clarification-template.md | 更名为 change-record-template.md | 模板只记录本轮变化，不承载完整需求 |
| REQ-001、REQ-002 | 清理过期假设与待确认表 | 保留已明确的规则，与当前设计一致 |

所有原文档在 Git 历史中可追溯。原始设计图、外部后台设计 V2.0、实际截图和 demo 均保留。CL 编号和截图目录为已有证据标识，不因分类调整重命名图片；新记录继续 CL 编号，但存放于 changes。

本次只调整文档归属、内容及引用，无业务页面变更，不生成重复截图。当前界面与验证证据见[交互设计](design/widget-interaction-design.md)。
