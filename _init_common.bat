@echo off
setlocal enabledelayedexpansion

set filelist=_init_common_list.txt

cmd /c npm init
set x=0
for /f "usebackq tokens=* delims=" %%i in (%filelist%) do (
set /a x+=1
echo ---------------- !x! %%i
cmd /c npm install %%i --save-dev
)
cmd /c npm audit fix
echo ================ FINISH!
