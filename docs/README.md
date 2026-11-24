# 文档导航与管理方案

## 当前内容的唯一入口

| 文档类型 | 目录 / 入口 | 回答的问题 | 维护方式 |
|---|---|---|---|
| 需求规格 | [requirements](requirements/README.md) | 用户需要什么、业务规则和验收标准是什么 | 每个独立需求一个 REQ，持续更新当前规格 |
| 变更记录 | [changes](changes/README.md) | 某轮澄清决定了什么、本轮改了什么 | 每轮实质业务澄清或页面设计一份简短记录，倒序索引 |
| 管理规范 | [guides](guides/requirements-standard.md) | 如何澄清、编写、验证和交付 | 持续维护流程与模板，AGENTS.md 负责执行约束 |
| 输入参考 | [reference](reference/README.md) | 设计依据来自哪里 | 保留来源与版本，不当作当前需求规格 |

需求澄清是形成和更新需求规格的过程，不是把完整需求存入独立 clarifications 目录的理由。完整需求和分项 REQ 均在 requirements，页面交互和截图是需求文档的组成部分；变更记录只引用对应需求。每轮记录负责保存决策和变化，不作为开发时的规格入口。

一个需求可经过多轮澄清。每轮实质澄清都更新受影响 REQ 与完整需求文档，并新增一份变更记录；纯协作规则调整只更新指南与 AGENTS.md，不再制造空页面变更文档。

## 本轮完整需求文档

[Widget 新增功能需求规格](requirements/widget-requirements.md) 是用户要求的本轮完整需求文档，包含业务规则、页面交互、实际截图和验收标准。REQ-001～REQ-004 是分项条款，修改时保持一致。

该文档曾被误放在 clarifications，随后又被错误地仅按交互图解迁至 design，现已纠正到 requirements。删除了已无独立用途的 design 入口；截图和原始材料保留，所有历史通过 Git 可追溯。

changes 只保存当轮变化；guides 只保存管理规范。不能因文档包含截图或经历澄清，就把需求文档移出 requirements。
