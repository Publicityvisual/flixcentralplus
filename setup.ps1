param([switch]$SkipBrowser)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host " Flixcentral+ - Configuración Automática" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Extraer Firebase CI token de la sesión local
$fbConfig = Get-Content "$env:USERPROFILE\.config\configstore\firebase-tools.json" | ConvertFrom-Json
$FB_TOKEN = $fbConfig.tokens.refresh_token

Write-Host ""
Write-Host "Paso 1: Autenticar GitHub CLI" -ForegroundColor Yellow
$auth = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  → Abriendo autenticación de GitHub..." -ForegroundColor Gray
    gh auth login
} else {
    Write-Host "  ✅ GitHub CLI ya autenticado" -ForegroundColor Green
}

Write-Host ""
Write-Host "Paso 2: Configurar FIREBASE_TOKEN en GitHub Secrets" -ForegroundColor Yellow
if (gh auth status 2>$null) {
    Write-Host "  → Configurando secret vía API..." -ForegroundColor Gray
    $pubKey = gh api repos/Publicityvisual/flixcentralplus/actions/secrets/public-key | ConvertFrom-Json
    # Encriptar y setear el secret requiere libsodium, lo hacemos vía CLI
    gh secret set FIREBASE_TOKEN --repo Publicityvisual/flixcentralplus --body "$FB_TOKEN" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ FIREBASE_TOKEN configurado correctamente" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ No se pudo configurar automáticamente" -ForegroundColor Red
        start "https://github.com/Publicityvisual/flixcentralplus/settings/secrets/actions"
        Write-Host "  → Agrega manualmente:" -ForegroundColor Gray
        Write-Host "    Name: FIREBASE_TOKEN" -ForegroundColor White
        Write-Host "    Value: $FB_TOKEN" -ForegroundColor White
    }
} else {
    if (-not $SkipBrowser) {
        start "https://github.com/Publicityvisual/flixcentralplus/settings/secrets/actions"
    }
    Write-Host "  → Agrega manualmente en GitHub Secrets:" -ForegroundColor Gray
    Write-Host "    Name: FIREBASE_TOKEN" -ForegroundColor White
    Write-Host "    Value: $FB_TOKEN" -ForegroundColor White
}

Write-Host ""
Write-Host "Paso 3: Configurar token GitHub en remote (opcional)" -ForegroundColor Yellow
if (-not $SkipBrowser) {
    start "https://github.com/settings/tokens"
}
$pat = Read-Host "  → Pega un PAT nuevo aquí (o Enter para omitir)"
if ($pat) {
    git remote set-url origin "https://$pat@github.com/Publicityvisual/flixcentralplus.git"
    Write-Host "  ✅ Remote actualizado" -ForegroundColor Green
    Write-Host "  → Haz push para activar CI/CD..." -ForegroundColor Yellow
    git push
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host " Sitio en vivo: https://flixcentralplus-33dc5.web.app" -ForegroundColor Green
Write-Host " GitHub: https://github.com/Publicityvisual/flixcentralplus" -ForegroundColor Green
Write-Host " Actions: https://github.com/Publicityvisual/flixcentralplus/actions" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
