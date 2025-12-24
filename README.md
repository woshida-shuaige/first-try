
# 🐱 Mochi 桌面宠物 - Mac 软件打包指南

想让 Mochi 像真正的 Mac 软件一样出现在 Dock 栏和 Applications 文件夹中？请按照以下步骤操作。

## 第一步：先将项目上线 (获取 URL)
你需要先有一个可以访问的网页链接。建议使用 **Vercel** 部署（见下方“部署”章节），你会得到一个如 `https://mochi-pet.vercel.app` 的链接。

---

## 第二步：使用 Nativefier 打包 (最快的方法)

Nativefier 是一个基于 Python/Node 的工具，能把任何网页变成桌面软件。

1. **安装工具**:
   打开你的 Mac 终端 (Terminal)，输入：
   ```bash
   npm install -g nativefier
   ```

2. **一行命令打包**:
   将下方的 `[你的链接]` 替换为你部署后的真实网址：
   ```bash
   nativefier --name "Mochi" \
              --title-bar-style 'hiddenInset' \
              --width 350 \
              --height 500 \
              --resizable \
              --always-on-top \
              --transparent \
              "[你的链接]"
   ```
   *参数解释：*
   - `--title-bar-style 'hiddenInset'`: 隐藏标题栏，让它看起来更像挂件。
   - `--always-on-top`: 让 Mochi 永远浮在窗口最上方。
   - `--transparent`: 开启窗口透明支持。

3. **完成**:
   命令执行完后，你会得到一个 `Mochi-darwin-x64` 文件夹，里面就有 `Mochi.app`。把它拖进你的 **Applications** 文件夹即可！

---

## 第三步：部署指引 (复习)
1. 将代码上传到 GitHub。
2. 在 Vercel 导入，设置环境变量 `API_KEY`。
3. 部署后拿到的 URL 就是你打包时需要的“链接”。

## ⚙️ 进阶：使用 Electron (专业版)
如果你想本地开发直接运行小窗，可以在项目中安装 `electron`，并创建一个 `main.js` 配置：
- `transparent: true`
- `frame: false`
- `alwaysOnTop: true`

现在，去把 Mochi 送给你的朋友吧！🎁
