@echo off

REM Script para ejecutar los comandos en diferentes ventanas del símbolo del sistema

REM Ventana 1
start "Server" cmd /K "cd C:\Users\aitor\Desktop\web\Ecommerce-website\server && npm start"

REM Espera un segundo para asegurarse de que el directorio del servidor esté configurado correctamente
ping 127.0.0.1 -n 2 > nul

REM Ventana 2
start "Client" cmd /K "cd C:\Users\aitor\Desktop\web\Ecommerce-website\client frontend && npm start"