@echo off
echo Organizing your custom images...
setlocal enabledelayedexpansion

cd "%~dp0images" 2>nul
if errorlevel 1 (
    echo [Error] The 'images' folder was not found!
    pause
    exit /b
)

:: First pass: rename everything to a temp prefix to prevent renaming collisions
for %%F in (*.jpg *.jpeg *.png *.gif *.webp) do (
    ren "%%F" "temp_%%~nxF"
)

:: Second pass: rename them sequentially
set i=1
for %%F in (temp_*.jpg temp_*.jpeg temp_*.png temp_*.gif temp_*.webp) do (
    set "ext=%%~xF"
    ren "%%F" "!i!!ext!"
    set /a i+=1
)

echo Success! Opening the Guess Who game...
cd "%~dp0"
start index.html
