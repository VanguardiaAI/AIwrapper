# Script para iniciar el proyecto AI Wrapper Agency en modo desarrollo
Write-Host "🚀 Iniciando AIWRAPPER Agency..." -ForegroundColor Green

# Verificar si Node.js está instalado
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js no está instalado. Por favor instala Node.js primero." -ForegroundColor Red
    exit 1
}

# Verificar si Python está instalado
if (!(Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Python no está instalado. Por favor instala Python primero." -ForegroundColor Red
    exit 1
}

Write-Host "📋 Iniciando Backend Flask..." -ForegroundColor Yellow

# Iniciar backend en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\venv\Scripts\Activate.ps1; python app.py"

# Esperar un momento para que el backend se inicie
Start-Sleep -Seconds 3

Write-Host "🌐 Iniciando Frontend Next.js..." -ForegroundColor Yellow

# Iniciar frontend en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "✅ AIWRAPPER proyecto iniciado exitosamente!" -ForegroundColor Green
Write-Host "📍 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📍 Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "📄 Para parar los servidores, cierra las ventanas de PowerShell abiertas." -ForegroundColor White 