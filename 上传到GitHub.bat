@echo off
chcp 65001 >nul
echo ========================================
echo    📦 GitHub 上传工具
echo ========================================
echo.
echo 正在检查Git安装...
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未检测到Git，请先安装Git
    echo 下载地址：https://git-scm.com/download/win
    echo.
    pause
    exit
)
echo ✅ Git已安装
echo.

echo ========================================
echo    📋 准备工作
echo ========================================
echo.
echo 请先完成以下步骤：
echo 1. 访问 https://github.com
echo 2. 登录你的账号
echo 3. 点击右上角 + 号，选择 "New repository"
echo 4. 仓库名称输入：poe2-dictionary
echo 5. 选择 Public（公开）
echo 6. 不要勾选任何初始化选项
echo 7. 点击 "Create repository"
echo.
echo 完成后，按任意键继续...
pause >nul

echo.
echo ========================================
echo    🔧 初始化Git仓库
echo ========================================
echo.

REM 检查是否已经初始化
if not exist ".git" (
    echo [1/6] 初始化Git仓库...
    git init
) else (
    echo [1/6] Git仓库已存在，跳过初始化
)

echo [2/6] 添加所有文件...
git add .

echo [3/6] 提交更改...
git commit -m "首次提交：流放之路2中英文对照表 - 收录4000+游戏术语"

echo [4/6] 设置主分支为main...
git branch -M main

echo.
echo ========================================
echo    🔗 关联GitHub仓库
echo ========================================
echo.
echo 请输入你的GitHub用户名（如：zhangsan）：
set /p username=
echo.

echo [5/6] 关联远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/%username%/poe2-dictionary.git

echo [6/6] 推送到GitHub...
echo.
echo 正在上传文件，可能需要1-2分钟...
echo 如果是首次推送，可能需要输入GitHub账号密码
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo    ⚠️ 推送失败
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. GitHub仓库地址不正确
    echo 2. 需要配置GitHub认证
    echo 3. 网络连接问题
    echo.
    echo 解决方法：
    echo 1. 检查仓库名称是否正确
    echo 2. 使用GitHub Personal Access Token
    echo    访问：https://github.com/settings/tokens
    echo.
    pause
    exit
)

echo.
echo ========================================
echo    ✅ 上传成功！
echo ========================================
echo.
echo 🎉 你的代码已成功上传到GitHub！
echo.
echo 📍 仓库地址：
echo    https://github.com/%username%/poe2-dictionary
echo.
echo 🌐 GitHub Pages地址（稍后可访问）：
echo    https://%username%.github.io/poe2-dictionary/
echo.
echo 📋 下一步：
echo    1. 访问仓库地址查看代码
echo    2. 在仓库设置中启用GitHub Pages
echo    3. 或者连接到Netlify/Vercel自动部署
echo.
pause
