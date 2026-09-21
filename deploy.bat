@echo off
setlocal
cd /d "%~dp0"
echo ========================================================
echo   MADCHEATS - DEPLOYING TO GITHUB ^& VERCEL
echo ========================================================
echo.

call setup_images.bat
git add .
git commit -m "Fix loader interactivity, eliminate site lag and freezing, and swap EFT unnamed image"
git push origin master

echo.
echo ========================================================
echo  Deploy complete! Pushed to GitHub (origin/master).
echo  Vercel will automatically build and deploy in ~30s.
echo ========================================================
pause
