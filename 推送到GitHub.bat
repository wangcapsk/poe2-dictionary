@echo off
chcp 65001 >nul
echo ========================================
echo    🚀 推送到 GitHub
echo ========================================
echo.
echo 仓库地址：https://github.com/wangcapsk/poe2-dictionary.git
echo.
echo 正在推送...
echo.

cd /d d:\po2
git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo    ⚠️ 推送失败
    echo ========================================
    echo.
    echo 可能的原因：
    echo 1. 需要输入 GitHub 认证信息
    echo 2. 网络连接问题
    echo 3. Token 过期
    echo.
    echo 💡 解决方法：
    echo.
    echo 创建 Personal Access Token：
    echo 1. 访问：https://github.com/settings/tokens
    echo 2. Generate new token (classic)
    echo 3. 勾选 repo 权限
    echo 4. 复制 Token
    echo 5. 重新运行此脚本，粘贴 Token 作为密码
    echo.
) else (
    echo.
    echo ========================================
    echo    ✅ 推送成功！
    echo ========================================
    echo.
    echo 🎉 代码已成功上传到 GitHub！
    echo.
    echo 📍 仓库地址：
    echo    https://github.com/wangcapsk/poe2-dictionary
    echo.
    echo 🌐 如需启用 GitHub Pages：
    echo    1. 访问仓库设置（Settings）
    echo    2. 左侧找到 Pages
    echo    3. Source 选择：main 分支
    echo    4. 点击 Save
    echo.
    echo 📍 网站地址（启用后）：
    echo    https://wangcapsk.github.io/poe2-dictionary/
    echo.
)

pause
