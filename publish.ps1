# publish.ps1 — Rebuild cheatsheet and push to GitHub Pages
# Run from: C:\Users\damie\GitHub\fantasy-baseball-2026\
# Usage: .\publish.ps1

$ErrorActionPreference = "Stop"
$SRC = "C:\Users\damie\OneDrive\1-Sports-Fantasy-Betting\1 Fantasy Baseball\2026"
$REPO = "C:\Users\damie\GitHub\fantasy-baseball-2026"

Write-Host "=== STEP 1: Rebuild cheatsheets ===" -ForegroundColor Cyan
python "$SRC\build_final_cheatsheets.py"
if ($LASTEXITCODE -ne 0) { Write-Host "BUILD FAILED" -ForegroundColor Red; exit 1 }

Write-Host "=== STEP 2: Copy HTML to repo ===" -ForegroundColor Cyan
Copy-Item "$SRC\DRAFT_CHEATSHEET.html" "$REPO\index.html" -Force
Write-Host "Copied DRAFT_CHEATSHEET.html -> index.html"

Write-Host "=== STEP 3: Git commit + push ===" -ForegroundColor Cyan
Set-Location $REPO
git add -A
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Update cheatsheet $timestamp"
git push origin main

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Green
Write-Host "Live at: https://damienreilley.github.io/fantasy-baseball-2026/" -ForegroundColor Yellow
Write-Host "Local HTML: $SRC\DRAFT_CHEATSHEET.html"
Write-Host "Local Excel: $SRC\DRAFT_CHEATSHEET_2026.xlsx"
