# Aphelios Widget：交互与业务场景设计

本仓库用于设计和演示 AI 工作台 Widget 的前台交互、业务场景及需求规格。页面为离线演示，不连接实际业务系统或 AgentSpace；演示行为不能作为后台接口已实现的依据。页面画布模拟 AgentSpace Host，顶部仅提供演示环境配置，业务操作归属于画布中的各个 Widget。

## 目录

```text
aphelios-widget/
├── demo/                    # 可直接打开的页面演示
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── docs/
│   ├── clarifications/      # 跨需求的澄清与交互汇总
│   ├── requirements/        # 逐项需求规格及索引
│   ├── guides/              # 需求规格编写与管理规范
│   └── reference/           # 输入材料与历史设计，非当前规格的自动替代品
└── assets/design/           # 原始视觉设计参考
```

## 运行演示

直接使用 Chrome 或 Edge 打开 [demo/index.html](demo/index.html)，无需安装依赖或访问外网。页面提供部门切换、类型筛选、分页、多选、详情、模拟派发和任务状态展示。数据仅保存在页面内存，刷新后恢复。

需求规格见 [需求索引](docs/requirements/README.md)；编写与维护方式见 [需求规格规范](docs/guides/requirements-standard.md)。

## 演示边界

- 默认演示公共产品开发与IT装备部，可切换至 MAE-CN 产品部；部门选择不代表真实身份认证。
- 研发待办、执行方案、Workflow / Agent 名称与任务状态均为演示数据；模拟下发不会连接实际服务。
- 待办详情可悬浮预览或点击查看；为数据提供 HTTP(S) `sourceUrl` 时，详情可跳转来源系统。当前无真实地址。
- Agent 任务展示分配中、执行中、失败、已完成，不展示百分比；待处理表示尚未下发。
- 实际接入需确定身份、来源系统接口、权限、状态映射和 AgentSpace 事件路由；HttpOnly Cookie 应由服务端认证处理。

“我的待办”组件中的“执行方案配置”可为模拟 AgentSpace 空间和对象类别创建及管理方案。方案仅保存在当前页面会话中，刷新后清除；不会连接或配置 AgentSpace。

本轮新增功能交互见[需求澄清文档](docs/clarifications/widget-feature-clarification.md)。
