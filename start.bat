@echo off
REM Quick Start Script for Curated Gifting - Windows
REM This script will start a local web server

echo.
echo ============================================
echo  Curated Gifting - Local Development Server
echo ============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Starting Python HTTP Server on http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else (
    REM Check for Node.js
    node --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo Starting Node.js HTTP Server
        echo Please make sure http-server is installed:
        echo   npm install -g http-server
        echo.
        http-server
    ) else (
        echo ERROR: Neither Python nor Node.js found!
        echo.
        echo Please install one of the following:
        echo   1. Python - https://www.python.org/downloads/
        echo   2. Node.js - https://nodejs.org/
        echo.
        pause
        exit /b 1
    )
)

pause
