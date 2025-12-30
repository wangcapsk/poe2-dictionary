# 🚀 Netlify 部署完整教程

## 📋 准备工作

### ✅ 已完成
- [x] 网站文件准备完毕
- [x] 已创建 `index.html`（主页面）
- [x] SEO优化完成
- [x] 所有功能测试正常

---

## 方法一：拖拽部署（最简单）⭐⭐⭐⭐⭐

### 🎯 适合人群
- 🔰 没有 Git 经验的新手
- ⚡ 想要快速上线测试
- 🎨 不需要版本控制

### 📝 详细步骤

#### 第 1 步：注册 Netlify

1. 打开浏览器，访问：[https://www.netlify.com](https://www.netlify.com)
2. 点击右上角 **「Sign up」** 按钮
3. 选择注册方式：
   - **推荐：** 使用 GitHub 账号注册（方便后续管理）
   - 或使用 Email 注册
4. 完成注册流程

#### 第 2 步：进入部署页面

1. 登录后，你会看到 Netlify 的控制面板
2. 点击 **「Sites」** 标签
3. 找到页面中间的拖放区域（会显示 "Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"）

#### 第 3 步：拖拽部署

有两种方式：

**方式 A：部署整个文件夹（推荐）**

1. 打开文件资源管理器，进入 `d:\po2`
2. 选中整个 `po2` 文件夹
3. 直接拖拽到 Netlify 页面的拖放区域
4. 等待上传完成（大约 30 秒 - 2 分钟）

**方式 B：只部署必需文件（更快）**

1. 在桌面创建新文件夹，命名为 `poe2-deploy`
2. 从 `d:\po2` 复制以下文件到新文件夹：
   ```
   ✅ index.html
   ✅ styles.css
   ✅ app_multilang.js
   ✅ data_multilang.js
   ✅ robots.txt
   ✅ sitemap.xml
   ```
3. 将 `poe2-deploy` 文件夹拖拽到 Netlify
4. 等待上传完成

#### 第 4 步：等待部署

1. Netlify 会自动开始部署
2. 你会看到部署进度
3. 大约 30 秒后，显示 **「Published」**
4. 🎉 部署完成！

#### 第 5 步：访问你的网站

1. 部署完成后，Netlify 会自动生成一个网址
2. 格式类似：`https://随机名称.netlify.app`
3. 点击链接即可访问你的网站！

---

## 方法二：Git 自动部署（推荐进阶用户）⭐⭐⭐⭐⭐

### 🎯 适合人群
- 💻 熟悉 Git 的开发者
- 🔄 需要频繁更新内容
- 👥 多人协作项目

### 📝 详细步骤

#### 第 1 步：将代码推送到 GitHub

```bash
# 1. 打开命令行（PowerShell或CMD），进入项目目录
cd d:\po2

# 2. 初始化 Git 仓库（如果还没有）
git init

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "首次提交：流放之路2中英文对照表"

# 5. 在 GitHub 创建新仓库
# 访问 https://github.com/new
# 仓库名称：poe2-dictionary
# 设为 Public（公开）
# 不要勾选任何初始化选项
# 点击 Create repository

# 6. 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/poe2-dictionary.git

# 7. 推送代码
git branch -M main
git push -u origin main
```

#### 第 2 步：连接 Netlify

1. 在 Netlify 控制面板点击 **「Add new site」**
2. 选择 **「Import an existing project」**
3. 选择 **「GitHub」**
4. 授权 Netlify 访问你的 GitHub（首次需要）
5. 在仓库列表中找到 `poe2-dictionary`
6. 点击仓库名称

#### 第 3 步：配置构建设置

Netlify 会自动检测，你只需确认：

```
Site name: poe2-dictionary（可自定义）
Branch to deploy: main
Build command: （留空）
Publish directory: （留空或填 .）
```

点击 **「Deploy site」**

#### 第 4 步：等待部署完成

1. Netlify 开始自动部署
2. 大约 1-2 分钟完成
3. 显示绿色的 **「Published」** 表示成功
4. 🎉 完成！

#### 第 5 步：自动化优势

**以后每次更新，只需：**
```bash
cd d:\po2
git add .
git commit -m "更新数据"
git push
```

Netlify 会**自动检测并重新部署**！无需手动操作！

---

## 🎨 部署后配置

### 修改网站名称

1. 进入你的站点设置
2. 点击 **「Site settings」**
3. 找到 **「Site information」** → **「Change site name」**
4. 修改为：`poe2-dictionary` 或其他喜欢的名称
5. 新网址：`https://poe2-dictionary.netlify.app`

### 绑定自定义域名（可选）

#### 如果你有域名（如 poe2dict.com）：

1. 在 Netlify 站点设置中点击 **「Domain management」**
2. 点击 **「Add custom domain」**
3. 输入你的域名：`poe2dict.com` 或 `www.poe2dict.com`
4. 点击 **「Verify」**

#### 配置 DNS：

Netlify 会提供 DNS 配置指南，通常是：

**方法 A：使用 Netlify DNS（推荐）**
1. 在域名注册商处，将 Name Servers 改为 Netlify 提供的
2. 等待 DNS 生效（1-24小时）

**方法 B：使用 CNAME**
1. 在域名 DNS 设置中添加 CNAME 记录：
   ```
   类型: CNAME
   主机记录: www
   记录值: poe2-dictionary.netlify.app
   ```
2. 等待 DNS 生效

#### 启用 HTTPS：

1. DNS 生效后，回到 Netlify
2. 在 **「Domain management」** 中点击 **「HTTPS」**
3. 点击 **「Verify DNS configuration」**
4. 等待 SSL 证书自动生成（几分钟）
5. 🔒 HTTPS 自动启用！

---

## 📊 Netlify 免费额度

| 项目 | 免费额度 | 足够吗？ |
|------|---------|---------|
| **带宽** | 100 GB/月 | ✅ 足够（相当于10万次访问） |
| **构建分钟数** | 300 分钟/月 | ✅ 足够（静态站几秒完成） |
| **站点数量** | 无限制 | ✅ 可以部署多个项目 |
| **团队成员** | 1 人 | ✅ 个人项目足够 |
| **自定义域名** | 支持 | ✅ 免费 |
| **HTTPS** | 自动 | ✅ 免费 |

**结论：** 对于你的项目，免费额度完全够用！ 🎉

---

## 🔧 常见问题解决

### Q1: 上传后显示 404 错误？

**原因：** Netlify 找不到 `index.html`

**解决：**
1. 确保文件名是 `index.html`（不是 `index_multilang.html`）
2. 检查文件是否在根目录（不是在子文件夹中）

### Q2: 网站显示但样式错误？

**原因：** 文件路径问题

**解决：**
1. 检查 `index.html` 中的引用路径：
   ```html
   <link rel="stylesheet" href="styles.css">  <!-- ✅ 正确 -->
   <link rel="stylesheet" href="./styles.css"> <!-- ✅ 也可以 -->
   ```
2. 确保 `styles.css`、`app_multilang.js`、`data_multilang.js` 都已上传

### Q3: 如何更新网站内容？

**拖拽部署：**
1. 修改本地文件
2. 重新拖拽整个文件夹到 Netlify
3. Netlify 会自动覆盖旧版本

**Git 部署：**
```bash
git add .
git commit -m "更新内容"
git push
```

### Q4: 想删除旧版本重新部署？

1. 进入站点设置
2. 点击 **「Site settings」** → **「Danger zone」**
3. 点击 **「Delete this site」**
4. 重新部署

### Q5: 部署后 URL 中的 yourwebsite.com 怎么办？

**需要替换！** 在 `index.html` 中查找并替换：

```html
<!-- 替换前 -->
<meta property="og:url" content="https://yourwebsite.com/">

<!-- 替换后 -->
<meta property="og:url" content="https://poe2-dictionary.netlify.app/">
```

使用编辑器的"查找替换"功能：
- 查找：`https://yourwebsite.com/`
- 替换为：`https://poe2-dictionary.netlify.app/`（你的实际网址）

---

## 🎯 部署后待办事项

### ✅ 立即完成

- [ ] 访问网站，测试所有功能
- [ ] 检查搜索功能正常
- [ ] 测试分类筛选
- [ ] 测试移动端显示
- [ ] 将 `yourwebsite.com` 替换为实际网址

### 📈 SEO 优化（1-3天内）

- [ ] 提交到 [Google Search Console](https://search.google.com/search-console)
- [ ] 提交到 [百度站长平台](https://ziyuan.baidu.com)
- [ ] 提交到 [必应站长工具](https://www.bing.com/webmasters)
- [ ] 更新 `sitemap.xml` 中的网址

### 🎊 推广（第一周）

- [ ] 在 NGA 论坛发帖
- [ ] 在流放之路贴吧分享
- [ ] 在 Reddit r/PathOfExile2 发布
- [ ] 在 Discord/QQ 群分享
- [ ] 在知乎写使用教程
- [ ] 在 B站 制作介绍视频

### 📊 监控（持续）

- [ ] 添加 [Google Analytics](https://analytics.google.com)
- [ ] 查看 Netlify 内置统计
- [ ] 收集用户反馈
- [ ] 定期更新数据

---

## 🎁 Netlify 额外功能

### 表单处理（可选）
可以添加反馈表单：
```html
<form name="feedback" method="POST" data-netlify="true">
  <input type="text" name="name" placeholder="昵称">
  <textarea name="message" placeholder="反馈内容"></textarea>
  <button type="submit">提交</button>
</form>
```

### 环境变量（可选）
在 Site settings → Environment variables 中设置

### 访问统计
在 Site settings → Analytics 中查看流量数据

---

## 📞 获取帮助

**Netlify 文档：** [https://docs.netlify.com](https://docs.netlify.com)  
**Netlify 社区：** [https://answers.netlify.com](https://answers.netlify.com)  
**Netlify 状态：** [https://www.netlifystatus.com](https://www.netlifystatus.com)

---

## 🎉 恭喜你！

完成部署后，你的网站将：
- ✅ 拥有全球 CDN 加速
- ✅ 自动 HTTPS 加密
- ✅ 免费稳定的托管
- ✅ 随时可以更新内容
- ✅ 支持绑定自定义域名

**你的 POE2 中英文对照表已经上线！🎮🎊**

---

**预计部署时间：5-10 分钟**  
**难度等级：⭐⭐ (很简单)**
