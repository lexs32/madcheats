@echo off
setlocal
cd /d "%~dp0"
echo ========================================================
echo   MADCHEATS - DEPLOYING TO GITHUB ^& VERCEL
echo ========================================================
echo.

git add .
git commit -m "Fix cart interactivity, button clickability, SellAuth checkout, and price updates"
git push origin master

echo.
echo ========================================================
echo  Deploy complete! Pushed to GitHub (origin/master).
echo  Vercel will automatically build and deploy in ~30s.
echo ========================================================
pause
