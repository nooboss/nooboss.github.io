@echo off
setlocal enabledelayedexpansion

REM Prompt user for prefix
set /p prefix="Enter filename prefix (leave blank to use current filenames): "

REM Prompt user for start index
set /p startindex="Enter start index number (leave blank to skip numbering): "

REM If startindex is empty, set a flag
if "!startindex!"=="" (
    set "usenumber=0"
) else (
    set "usenumber=1"
    set "counter=!startindex!"
)

REM Get file extension and create new filename
setlocal enabledelayedexpansion
for %%F in (*) do (
    if not "%%~xF"==".bat" if not "%%F"=="%~nx0" (
        REM Get the file extension
        for %%E in ("%%~xF") do set "ext=%%E"
        
        REM Determine the new filename
        if "!prefix!"=="" (
            REM Use current filename as prefix (without extension)
            set "newname=%%~nF"
            if !usenumber! equ 1 (
                set "newname=%%~nF!counter!"
            )
        ) else (
            if !usenumber! equ 1 (
                set "newname=!prefix!!counter!"
            ) else (
                set "newname=!prefix!"
            )
        )
        
        REM Perform the rename
        ren "%%F" "!newname!!ext!"
        echo Renamed: "%%F" to "!newname!!ext!"
        
        REM Increment counter if numbering is enabled
        if !usenumber! equ 1 (
            set /a counter+=1
        )
    )
)

echo.
echo Rename operation complete!
pause