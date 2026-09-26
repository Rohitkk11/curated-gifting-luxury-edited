#!/bin/bash
# Quick Start Script for Curated Gifting - macOS/Linux
# This script will start a local web server

echo ""
echo "============================================"
echo "  Curated Gifting - Local Development Server"
echo "============================================"
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "Starting Python HTTP Server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Starting Python HTTP Server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8000
# Check for Node.js
elif command -v node &> /dev/null; then
    echo "Starting Node.js HTTP Server"
    echo "Please make sure http-server is installed:"
    echo "  npm install -g http-server"
    echo ""
    http-server
else
    echo "ERROR: Neither Python nor Node.js found!"
    echo ""
    echo "Please install one of the following:"
    echo "  1. Python - https://www.python.org/downloads/"
    echo "  2. Node.js - https://nodejs.org/"
    echo ""
    exit 1
fi
