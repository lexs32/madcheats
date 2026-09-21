@echo off
setlocal
cd /d "%~dp0"
title SellAuth Product Fetcher

echo ========================================================
echo   MADCHEATS - FETCHING SELLAUTH PRODUCTS ^& VARIANTS
echo ========================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "get_products.ps1"

echo.
echo ========================================================
echo Finished! Check the list above or open products_summary.txt.
echo ========================================================
pause
