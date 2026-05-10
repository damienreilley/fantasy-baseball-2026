# publish_streamers.ps1 - Refresh streamers pipeline and push to GitHub Pages
$PYTHON = "C:\Users\damie\AppData\Local\Programs\Python\Python314\python.exe"
$TOOLS  = "C:\Users\damie\OneDrive\1-Sports-Fantasy-Betting\1 Fantasy Baseball\2026\07-Tools"
$REPO   = "C:\Users\damie\GitHub\fantasy-baseball-2026"
$GIT    = "C:\Program Files\Git\cmd\git.exe"

function RunPy($name, $script) {
    Write-Host "=== $name ===" -ForegroundColor Cyan
    & $PYTHON $script
    $code = $LASTEXITCODE
    if ($code -ne 0 -and $code -ne $null) {
        Write-Host "FAILED with exit code $code" -ForegroundColor Red
        exit 1
    }
    Write-Host ""
}

RunPy "Step 1: Cutoff tracker"  "$TOOLS\cutoff_tracker.py"
RunPy "Step 2: Pull FAs + probables" "$TOOLS\streamer_finder.py"
RunPy "Step 3: Score" "$TOOLS\streamer_finder_step2.py"
RunPy "Step 4: Hidden gem candidates" "$TOOLS\hidden_gems.py"
RunPy "Step 5: Classify gems" "$TOOLS\classify_gems.py"
RunPy "Step 6: Build streamers.html into repo" "$TOOLS\build_streamers_for_pages.py"

Write-Host "=== Step 7: Git commit + push ===" -ForegroundColor Cyan
Set-Location $REPO
& $GIT add streamers.html
$status = & $GIT status --porcelain streamers.html
if ($status) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    & $GIT commit -m "Update streamers $timestamp"
    & $GIT push origin main
    Write-Host ""
    Write-Host "=== PUBLISHED ===" -ForegroundColor Green
    Write-Host "Live at: https://damienreilley.github.io/fantasy-baseball-2026/streamers.html" -ForegroundColor Yellow
} else {
    Write-Host "No changes to streamers.html" -ForegroundColor Yellow
}
