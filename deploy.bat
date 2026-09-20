@echo off
call setup_images.bat
git add .
git commit -m "Fix loader interactivity, tab switching, and row toggles"
git push origin master
npx vercel --prod
