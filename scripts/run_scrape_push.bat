@echo off
rem ============================================================
rem  Torres Titanium — Scraping de redes en modo PUSH (PC -> VPS)
rem  Ejecutado diariamente por el Programador de tareas de Windows
rem  (tarea: TorresTitanium-ScrapSocial, 19:00)
rem  Log: data\scrape-push.log
rem ============================================================
cd /d "D:\Claude Projects\Holding Claude"
"venv\Scripts\python.exe" scripts\scrap_social.py --push >> data\scrape-push.log 2>&1
