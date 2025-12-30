@echo off
chcp 65001 >nul
echo ========================================
echo    🔄 GitHub 更新工具
echo ========================================
echo.

REM 检查是否已经初始化Git
if not exist ".git" (
    echo ❌ 错误：当前目录不是Git仓库
    echo 请先运行 "上传到GitHub.bat" 进行初始化
    echo.
    pause
    exit
)

echo 正在检查文件改动...
git status --short
echo.

echo 请输入本次更新的说明（如：更新数据、修复bug）：
set /p message=
if "%message%"=="" set message=更新内容

echo.
echo [1/3] 添加所有改动的文件...
git add .

echo [2/3] 提交更改...
git commit -m "%message%"

echo [3/3] 推送到GitHub...
git push

if errorlevel 1 (
    echo.
    echo ❌ 推送失败！
    echo 可能需要先拉取远程更新：
    echo    git pull origin main
    echo.
    pause
    exit
)

echo.
echo ========================================
echo    ✅ 更新成功！
echo ========================================
echo.
echo 🎉 你的改动已成功推送到GitHub！
echo.
echo 如果连接了Netlify/Vercel，网站会在1-2分钟内自动更新
echo.
pause
