param(
  [string]$Message = "Update $(Get-Date -Format 'yyyy-MM-dd HH:mm')",
  [switch]$Push
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

# Step 3: Optional Git push
if ($Push) {
  Write-Host "`n[3/3] Pushing to GitHub..." -ForegroundColor Yellow
  git add -A
  git commit -m "$Message"
  if ($LASTEXITCODE -ne 0) { Write-Host "Git commit failed!" -ForegroundColor Red; exit 1 }
  git push
  if ($LASTEXITCODE -ne 0) { Write-Host "Git push failed!" -ForegroundColor Red; exit 1 }
} else {
  Write-Host "`n[3/3] Git push skipped. Use -Push after reviewing changes." -ForegroundColor Yellow
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host " Pipeline complete!" -ForegroundColor Green
Write-Host " Site: https://flixcentralplus-33dc5.web.app" -ForegroundColor Green
Write-Host " Repo: https://github.com/Publicityvisual/flixcentralplus" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
