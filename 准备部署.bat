@echo off
chcp 65001 >nul
echo ========================================
echo    🚀 Netlify 部署准备工具
echo ========================================
echo.
echo 正在准备部署文件...
echo.

REM 创建部署文件夹
if not exist "netlify-deploy" mkdir netlify-deploy

REM 复制必需文件
echo [1/6] 复制主页面...
copy /Y index.html netlify-deploy\ >nul

echo [2/6] 复制样式文件...
copy /Y styles.css netlify-deploy\ >nul

echo [3/6] 复制应用逻辑...
copy /Y app_multilang.js netlify-deploy\ >nul

echo [4/6] 复制数据文件...
copy /Y data_multilang.js netlify-deploy\ >nul

echo [5/6] 复制SEO文件...
copy /Y robots.txt netlify-deploy\ >nul 2>nul
copy /Y sitemap.xml netlify-deploy\ >nul 2>nul

echo [6/6] 复制可选文件...
copy /Y favicon.ico netlify-deploy\ >nul 2>nul
copy /Y apple-touch-icon.png netlify-deploy\ >nul 2>nul
copy /Y og-image.jpg netlify-deploy\ >nul 2>nul

echo.
echo ========================================
echo    ✅ 准备完成！
echo ========================================
echo.
echo 📁 部署文件已准备在：netlify-deploy 文件夹
echo.
echo 📋 下一步操作：
echo    1. 访问 https://www.netlify.com 并登录
echo    2. 将 netlify-deploy 文件夹拖拽到页面
echo    3. 等待部署完成
echo.
echo 🎉 预计5分钟内完成部署！
echo.
echo 按任意键打开部署文件夹...
pause >nul
explorer netlify-deploy
