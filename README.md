# Aphelios Widget：需求与交互设计

本仓库提供 Widget 离线 demo、需求规格和页面交互设计。画布模拟 AgentSpace Host；顶部只配置演示环境，业务操作归属于各 Widget。

## 文档入口

- [文档管理与完整导航](docs/README.md)：分类职责及本次整理去向。
- [需求规格](docs/requirements/README.md)：当前业务规则与验收标准。
- [本轮完整需求文档](docs/requirements/REQ-005-2026-11-24-widget-requirements.md)：业务规则、关键流程、截图及验收标准。
- [编写规范](docs/guides/requirements-standard.md)与 [AGENTS.md](AGENTS.md)：协作及交付流程。

## 目录

```text
aphelios-widget/
├── demo/                    # 可运行页面
├── docs/
│   ├── requirements/        # 当前需求规格
│   ├── guides/              # 规范、模板、调测方法
│   └── reference/           # 原始输入材料
└── assets/
    ├── design/              # 原始设计图
    └── screenshots/         # 实际页面截图
```

## 启动与调测

从仓库根目录运行：

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory demo
```

打开 [本地页面](http://127.0.0.1:8000/)。服务只提供 demo 目录，仅允许本机访问。也可直接打开 demo/index.html 自行查看；自动调测统一使用 HTTP。

页面支持演示部门切换、待办筛选、详情、模拟下发和空间执行方案管理。对象和空间是样例，配置保存在页面内存，刷新后恢复；不会实际发送 Webhook 或连接 AgentSpace。真实对象跳转使用数据中的 HTTP(S) sourceUrl，未配置时如实提示。
