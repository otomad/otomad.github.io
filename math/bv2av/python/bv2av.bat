@echo off
cd %systemroot%/system32
set str=%1
if defined str (
python bv2av.py "%1"
) else (
echo Illegal parameter!
)