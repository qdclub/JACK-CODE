@echo off
for /f %%i in (
namelist.txt
) do mkdir %%i && copy departments.vue %%i\%%i.vue
:: do mkdir %%i && copy departments.vue %%i\%%i.vue && start %%i\%%i.vue
::pause