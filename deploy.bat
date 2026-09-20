@echo off
call setup_images.bat
git add .
git commit -m "Add mascot image, red wardogs card, and discord seo"
git push origin master
npx vercel --prod
