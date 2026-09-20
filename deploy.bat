@echo off
call setup_images.bat
git add .
git commit -m "Add interactive private client loader section and mobile optimizations"
git push origin master
npx vercel --prod
