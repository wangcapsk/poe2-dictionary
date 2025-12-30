# 📦 GitHub 上传完整教程

## 🎯 为什么要上传到 GitHub？

| 优势 | 说明 |
|------|------|
| 🆓 **免费托管** | GitHub Pages 可免费托管静态网站 |
| 💾 **版本控制** | 记录每次修改，可随时回退 |
| 🔒 **安全备份** | 代码永久保存，不怕丢失 |
| 🚀 **自动部署** | 连接 Netlify/Vercel 实现自动部署 |
| 👥 **开源协作** | 其他玩家可以贡献数据和翻译 |
| 📈 **展示作品** | 建立个人技术档案 |

---

## 方法一：使用自动化脚本（最简单）⭐⭐⭐⭐⭐

### 步骤 1：安装 Git

**如果还没安装 Git：**

1. 访问：[https://git-scm.com/download/win](https://git-scm.com/download/win)
2. 下载并安装（一路下一步即可）
3. 安装完成后重启命令行

**检查是否安装成功：**
```bash
git --version
# 应该显示：git version 2.x.x
```

### 步骤 2：创建 GitHub 仓库

1. 访问 [https://github.com](https://github.com)
2. 登录（没有账号就注册一个）
3. 点击右上角 **"+"** → **"New repository"**
4. 填写信息：
   ```
   Repository name: poe2-dictionary
   Description: 流放之路2中英文对照表 - POE2 Dictionary
   Public: ✅ 选择公开
   不要勾选：Add a README file
   不要勾选：Add .gitignore
   不要勾选：Choose a license
   ```
5. 点击 **"Create repository"**
6. 记住仓库地址（类似：`https://github.com/你的用户名/poe2-dictionary`）

### 步骤 3：运行上传脚本

1. 双击 **"上传到GitHub.bat"**
2. 按提示输入你的 GitHub 用户名
3. 等待上传完成（1-2分钟）
4. 完成！✅

---

## 方法二：手动命令行上传（标准方法）⭐⭐⭐⭐

### 步骤 1：打开 PowerShell

1. 按 `Win + X`
2. 选择 **"Windows PowerShell"** 或 **"终端"**
3. 进入项目目录：
   ```bash
   cd d:\po2
   ```

### 步骤 2：初始化 Git 仓库

```bash
# 初始化
git init

# 添加所有文件
git add .

# 提交
git commit -m "首次提交：流放之路2中英文对照表"

# 设置主分支
git branch -M main
```

### 步骤 3：关联 GitHub 仓库

```bash
# 关联远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/poe2-dictionary.git

# 推送到 GitHub
git push -u origin main
```

### 步骤 4：输入认证信息

**如果提示输入用户名和密码：**

1. **用户名**：你的 GitHub 用户名
2. **密码**：不是账号密码！需要用 Personal Access Token

**创建 Token：**
1. 访问：[https://github.com/settings/tokens](https://github.com/settings/tokens)
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. Note：填写 `poe2-dictionary`
4. Expiration：选择 **"No expiration"**（不过期）
5. 勾选权限：
   - ✅ repo（所有子项）
6. 点击 **"Generate token"**
7. **复制生成的 Token**（只显示一次！）
8. 在命令行粘贴 Token 作为密码

---

## 方法三：GitHub Desktop（图形界面）⭐⭐⭐

### 步骤 1：安装 GitHub Desktop

1. 访问：[https://desktop.github.com](https://desktop.github.com)
2. 下载并安装
3. 登录你的 GitHub 账号

### 步骤 2：创建仓库

1. 打开 GitHub Desktop
2. 点击 **"File"** → **"Add local repository"**
3. 选择 `d:\po2` 文件夹
4. 如果提示没有 Git 仓库，点击 **"create a repository"**

### 步骤 3：提交并推送

1. 在左侧看到所有文件的改动
2. 在 Summary 输入：`首次提交`
3. 点击 **"Commit to main"**
4. 点击 **"Publish repository"**
5. 填写：
   - Name: `poe2-dictionary`
   - Description: `流放之路2中英文对照表`
   - ✅ Keep this code public
6. 点击 **"Publish repository"**

---

## 🔧 常见问题解决

### Q1: 提示 "git 不是内部或外部命令"

**原因：** Git 未安装或未添加到环境变量

**解决：**
1. 安装 Git：[https://git-scm.com/download/win](https://git-scm.com/download/win)
2. 安装时选择 **"Add to PATH"**
3. 重启命令行

### Q2: 推送时要求输入用户名密码

**原因：** GitHub 已不支持密码认证

**解决：** 使用 Personal Access Token
1. 访问：[https://github.com/settings/tokens](https://github.com/settings/tokens)
2. 生成新 Token
3. 复制 Token 作为密码使用

### Q3: 提示 "remote origin already exists"

**原因：** 已经关联过远程仓库

**解决：**
```bash
# 删除旧的关联
git remote remove origin

# 重新关联
git remote add origin https://github.com/你的用户名/poe2-dictionary.git
```

### Q4: 提示 "failed to push some refs"

**原因：** 远程仓库有文件，本地没有

**解决：**
```bash
# 强制推送（首次可用）
git push -u origin main --force
```

### Q5: 提示需要配置用户信息

**解决：**
```bash
git config --global user.name "你的名字"
git config --global user.email "your.email@example.com"
```

---

## 🌐 启用 GitHub Pages（免费托管网站）

### 方法 1：设置界面启用

1. 访问你的仓库：`https://github.com/你的用户名/poe2-dictionary`
2. 点击 **"Settings"**（设置）
3. 左侧菜单找到 **"Pages"**
4. Source 选择：**"main"** 分支
5. Folder 选择：**"/ (root)"**
6. 点击 **"Save"**
7. 等待 1-5 分钟

### 访问网站

```
https://你的用户名.github.io/poe2-dictionary/
```

**⚠️ 注意：** 因为主页是 `index.html`（不是 `index_multilang.html`），所以可以直接访问根目录！

### 方法 2：修改 index.html（如果需要）

如果你希望网址更短，确保主文件名为 `index.html`：

```bash
# 已经创建好了，无需修改
✅ index.html 已存在
```

---

## 📝 上传后的文件结构

```
你的GitHub仓库
├── index.html              ← 主页面
├── styles.css              ← 样式
├── app_multilang.js        ← 逻辑
├── data_multilang.js       ← 数据
├── robots.txt              ← SEO
├── sitemap.xml             ← SEO
├── README.md               ← 项目说明
├── .gitignore              ← Git忽略规则
└── 其他文件...
```

---

## 🔄 如何更新代码？

### 方法 1：命令行

```bash
cd d:\po2

# 查看改动
git status

# 添加所有改动
git add .

# 提交
git commit -m "更新数据：新增XXX条术语"

# 推送
git push
```

### 方法 2：使用脚本

创建 `更新到GitHub.bat`：

```batch
@echo off
cd d:\po2
git add .
git commit -m "更新数据"
git push
echo 更新完成！
pause
```

以后每次修改，只需双击这个文件！

### 方法 3：GitHub Desktop

1. 打开 GitHub Desktop
2. 查看改动的文件
3. 填写 Summary（如：更新数据）
4. 点击 **"Commit to main"**
5. 点击 **"Push origin"**

---

## 🚀 连接 Netlify/Vercel 自动部署

### 优势

- ✅ 推送到 GitHub 后，自动重新部署
- ✅ 不需要手动操作
- ✅ 访问速度更快（CDN）

### Netlify 连接步骤

1. 访问 [https://netlify.com](https://netlify.com) 并登录
2. 点击 **"Add new site"** → **"Import an existing project"**
3. 选择 **"GitHub"**
4. 授权并选择 `poe2-dictionary` 仓库
5. 点击 **"Deploy site"**
6. 完成！

**以后每次 `git push`，Netlify 会自动重新部署！**

### Vercel 连接步骤

1. 访问 [https://vercel.com](https://vercel.com) 并登录
2. 点击 **"New Project"**
3. 选择 **"Import Git Repository"**
4. 选择 `poe2-dictionary`
5. 点击 **"Deploy"**
6. 完成！

---

## 📊 GitHub 统计

上传到 GitHub 后，你可以看到：

- 📈 代码提交历史
- 👥 访问量统计（Insights）
- ⭐ Star 数量（点赞）
- 🍴 Fork 数量（复制）
- 📝 Issue 反馈

---

## 💡 进阶技巧

### 1. 添加 README 徽章

在 `README.md` 顶部添加：

```markdown
[![GitHub stars](https://img.shields.io/github/stars/你的用户名/poe2-dictionary)](https://github.com/你的用户名/poe2-dictionary/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/你的用户名/poe2-dictionary)](https://github.com/你的用户名/poe2-dictionary/network)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
```

### 2. 添加 LICENSE

创建 `LICENSE` 文件，选择 MIT License（最宽松）

### 3. 设置 .gitignore

已创建，可以根据需要调整：

```gitignore
node_modules/
*.log
.DS_Store
需求.md
分类*.md
```

### 4. 开启 Discussions

在仓库设置中启用 Discussions，让玩家讨论翻译问题

---

## ✅ 推荐的完整流程

```
1️⃣ 上传代码到 GitHub
   ↓
2️⃣ 启用 GitHub Pages（免费托管）
   ↓
3️⃣ 或连接到 Netlify（更快速度）
   ↓
4️⃣ 提交到搜索引擎
   ↓
5️⃣ 在游戏社区分享
   ↓
6️⃣ 收集反馈，持续更新
```

---

## 🎉 总结

**上传到 GitHub 的好处：**

✅ 代码安全备份  
✅ 版本控制管理  
✅ 免费托管网站（GitHub Pages）  
✅ 方便连接 Netlify/Vercel  
✅ 建立开源社区  
✅ 展示个人作品  

**推荐方案：**

```
GitHub（代码托管） + Netlify（快速访问） = 完美组合！
```

---

**现在就开始吧！双击运行 "上传到GitHub.bat"！🚀**
