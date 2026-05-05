@echo off
echo ========================================================
echo   Augustuna Admin Hub - Criar Atalho no Ambiente de Trabalho
echo ========================================================

set SCRIPT_DIR=%~dp0
set TARGET=%SCRIPT_DIR%run_admin.bat
set ICON=%SCRIPT_DIR%icon.ico

powershell -NoProfile -Command "$WShell = New-Object -ComObject WScript.Shell; $Shortcut = $WShell.CreateShortcut([Environment]::GetFolderPath('Desktop') + '\Augustuna Admin Hub.lnk'); $Shortcut.TargetPath = '%TARGET%'; $Shortcut.WorkingDirectory = '%SCRIPT_DIR%'; $Shortcut.IconLocation = '%ICON%'; $Shortcut.Description = 'Augustuna Admin Hub - Gestao de Conteudo'; $Shortcut.Save()"

echo.
echo [+] Atalho criado com sucesso no Ambiente de Trabalho!
pause
