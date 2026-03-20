@echo off
title TAURA Research - Servidor Dev
color 0A

echo.
echo  ========================================
echo   TAURA RESEARCH - Iniciando Servidor
echo  ========================================
echo.
echo  Porta: 3000
echo  URL:   http://localhost:3000
echo.
echo  Pressione Ctrl+C para encerrar.
echo  ========================================
echo.

cd /d "%~dp0"
node node_modules\webpack-cli\bin\cli.js serve --mode development --port 3000
