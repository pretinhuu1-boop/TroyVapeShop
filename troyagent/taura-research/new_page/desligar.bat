@echo off
title TAURA Research - Encerrando Servidor
color 0C

echo.
echo  ========================================
echo   TAURA RESEARCH - Encerrando Servidor
echo  ========================================
echo.

:: Encerra processos node na porta 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo  Encerrando processo PID: %%a
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo  Servidor na porta 3000 encerrado.
echo  ========================================
echo.
pause
