@echo off
call setup_images.bat
git add .
git commit -m "Add EFT, Delta Force, Marvel Rivals cards and remove spoofer"
git push origin master
npx vercel --prod
