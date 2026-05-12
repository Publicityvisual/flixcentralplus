@echo off
echo ====================================
echo  Flixcentral+ - Build + Deploy
echo ====================================
echo.
echo Step 1: Building production...
call npx vite build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)
echo.
echo Step 2: Deploying to Firebase Hosting...
firebase deploy --only hosting
if %errorlevel% neq 0 (
    echo Deploy failed.
    echo Make sure you are logged in: firebase login
    pause
    exit /b 1
)
echo.
echo ====================================
echo  Build + Deploy complete!
echo  https://flixcentralplus-33dc5.web.app
echo ====================================
pause
    exit /b 1
)
echo.
echo Step 2: Login to Firebase (if needed)
firebase login
echo.
echo Step 3: Deploying to Firebase Hosting...
firebase deploy --only hosting
if %errorlevel% neq 0 (
    echo Deploy failed.
    pause
    exit /b 1
)
echo.
echo ====================================
echo  Build + Deploy complete!
echo  https://flixcentralplus-33dc5.web.app
echo ====================================
pause
