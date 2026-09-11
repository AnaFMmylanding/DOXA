@echo off
chcp 65001 > nul
title Servidor Local DOXA — Pasarela Stripe

echo ========================================================
echo   DOXA Atelier — Iniciando Servidor de Pagos Stripe
echo ========================================================
echo.

where node >nul 2>nul
if %errorlevel% equ 0 (
    set "NODE_CMD=node"
) else (
    if exist "C:\Users\Ana\AppData\Local\ms-playwright-go\1.57.0\node.exe" (
        set "NODE_CMD=C:\Users\Ana\AppData\Local\ms-playwright-go\1.57.0\node.exe"
    ) else (
        echo [ERROR] No se ha detectado Node.js en el sistema.
        pause
        exit /b 1
    )
)

start "" http://localhost:3000/compra.html
"%NODE_CMD%" server.js
pause
