# Playwright CLI 本机工具说明

本机安装 `@playwright/cli` 0.1.25，命令为 `playwright-cli`。安装为用户级全局工具，不是 demo 的运行依赖；复制项目到其他环境仍可直接打开 demo，无需安装 Node.js。

检查命令：

```powershell
playwright-cli --version
playwright-cli --help screenshot
```

CLI 提供 `screenshot --filename <路径> --full-page`，也支持针对组件截图。截图归档遵循 [AGENTS.md](../../AGENTS.md)，保存到对应 CL 编号目录，嵌入本轮澄清文档。

工具安装不等于已完成截图验收，也不修改 Codex 或浏览器安全策略。此前内置浏览器拒绝本地 file 协议访问；本次仅安装工具和浏览器运行环境，没有通过替代工具重试被拒绝的页面访问。

## 已验证的本地预览方式

在仓库根目录启动仅监听本机的服务：

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory demo
```

访问 `http://127.0.0.1:8000/`。2026-11-24 已通过内置浏览器成功加载并保存首页和方案配置弹窗截图，截图证据见[当前交互设计](../requirements/widget-requirements.md)。本次验证使用内置浏览器，不代表 CLI 截图已单独测试。
