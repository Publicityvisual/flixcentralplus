param([switch]$SkipBrowser)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host " Flixcentral+ - Configuración Automática" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Extraer Firebase CI token de la sesión local si existe.
$firebaseConfigPath = "$env:USERPROFILE\.config\configstore\firebase-tools.json"
$FB_TOKEN = $null
if (Test-Path -LiteralPath $firebaseConfigPath) {
    $fbConfig = Get-Content $firebaseConfigPath | ConvertFrom-Json
    $FB_TOKEN = $fbConfig.tokens.refresh_token
}

Write-Host ""
Write-Host "Paso 1: Autenticar GitHub CLI" -ForegroundColor Yellow
$auth = gh auth status 2>&1
$isGhAuthed = $LASTEXITCODE -eq 0
if (-not $isGhAuthed) {
    Write-Host "  → Abriendo autenticación de GitHub..." -ForegroundColor Gray
    gh auth login
    $isGhAuthed = $LASTEXITCODE -eq 0
} else {
    Write-Host "  ✅ GitHub CLI ya autenticado" -ForegroundColor Green
}

Write-Host ""
Write-Host "Paso 2: Configurar FIREBASE_TOKEN en GitHub Secrets" -ForegroundColor Yellow
if ($FB_TOKEN -and $isGhAuthed) {
    Write-Host "  → Configurando secret vía API..." -ForegroundColor Gray
    # Encriptar y setear el secret requiere libsodium, lo hacemos vía CLI
    gh secret set FIREBASE_TOKEN --repo Publicityvisual/flixcentralplus --body "$FB_TOKEN" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ FIREBASE_TOKEN configurado correctamente" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ No se pudo configurar automáticamente" -ForegroundColor Red
        start "https://github.com/Publicityvisual/flixcentralplus/settings/secrets/actions"
        Write-Host "  → Agrega manualmente el secret FIREBASE_TOKEN desde tu sesión local." -ForegroundColor Gray
    }
} else {
    if (-not $SkipBrowser) {
        start "https://github.com/Publicityvisual/flixcentralplus/settings/secrets/actions"
    }
    Write-Host "  → Agrega manualmente el secret FIREBASE_TOKEN desde tu sesión local." -ForegroundColor Gray
}

Write-Host ""
Write-Host "Paso 3: Verificar remote GitHub" -ForegroundColor Yellow
if (-not $SkipBrowser) {
    start "https://github.com/Publicityvisual/flixcentralplus"
}
Write-Host "  → No se guardan PATs en el remote. Usa gh auth login o Git Credential Manager para autenticar push." -ForegroundColor Gray

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host " Sitio en vivo: https://flixcentralplus-33dc5.web.app" -ForegroundColor Green
Write-Host " GitHub: https://github.com/Publicityvisual/flixcentralplus" -ForegroundColor Green
Write-Host " Actions: https://github.com/Publicityvisual/flixcentralplus/actions" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
