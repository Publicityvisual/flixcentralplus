param(
  [string]$Message = "Update $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host " Flixcentral+ - Full Pipeline" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Step 1: Build
Write-Host "`n[1/3] Building production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Build failed!" -ForegroundColor Red; exit 1 }

# Step 2: Deploy to Firebase
Write-Host "`n[2/3] Deploying to Firebase..." -ForegroundColor Yellow
firebase deploy --only hosting
if ($LASTEXITCODE -ne 0) { Write-Host "Firebase deploy failed!" -ForegroundColor Red; exit 1 }

# Step 3: Push to GitHub
Write-Host "`n[3/3] Pushing to GitHub..." -ForegroundColor Yellow
git add -A
git commit -m "$Message"
git push
if ($LASTEXITCODE -ne 0) { Write-Host "Git push failed!" -ForegroundColor Red; exit 1 }

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host " Pipeline complete!" -ForegroundColor Green
Write-Host " Site: https://flixcentralplus-33dc5.web.app" -ForegroundColor Green
Write-Host " Repo: https://github.com/Publicityvisual/flixcentralplus" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
