$timestamp = Get-Date -Format "yyyyMMdd_HHmm"
$zipPath = "C:\Users\ed\Downloads\samstones_FINAL_$timestamp.zip"
$distPath = "C:\Users\ed\Downloads\samstones\dist\*"

Write-Host "Creating ZIP: $zipPath" -ForegroundColor Cyan
Compress-Archive -Path $distPath -DestinationPath $zipPath -Force

$size = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
Write-Host ""
Write-Host "ZIP ready: $zipPath ($size MB)" -ForegroundColor Green

# Also copy the standalone index.html to Downloads for easy single-file upload
$standaloneHtml = "C:\Users\ed\Downloads\samstones_index_PATCH.html"
Copy-Item "C:\Users\ed\Downloads\samstones\dist\index.html" $standaloneHtml -Force
Write-Host "Standalone index.html patch: $standaloneHtml" -ForegroundColor Yellow
Write-Host ""
Write-Host "=== UPLOAD OPTIONS ===" -ForegroundColor White
Write-Host "Option A (Full): Upload the ZIP and extract into public_html" -ForegroundColor Cyan
Write-Host "Option B (Quick patch): Upload samstones_index_PATCH.html to public_html and rename it to index.html" -ForegroundColor Cyan
