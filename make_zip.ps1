$zipPath = "C:\Users\ed\Downloads\samstones_deploy.zip"
$distPath = "C:\Users\ed\Downloads\samstones\dist\*"

if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
  Write-Host "Old ZIP deleted." -ForegroundColor Yellow
}

Write-Host "Creating new deployment ZIP..." -ForegroundColor Cyan
Compress-Archive -Path $distPath -DestinationPath $zipPath -Force

$size = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
Write-Host ""
Write-Host "SUCCESS! ZIP ready at:" -ForegroundColor Green
Write-Host "  $zipPath" -ForegroundColor White
Write-Host "  Size: $size MB" -ForegroundColor Cyan
Write-Host ""
Write-Host "Upload Instructions:" -ForegroundColor White
Write-Host "  1. Delete all files in public_html on your host" -ForegroundColor Gray
Write-Host "  2. Upload samstones_deploy.zip to public_html" -ForegroundColor Gray
Write-Host "  3. Extract/unzip it there" -ForegroundColor Gray
Write-Host "  4. Confirm index.html is directly in public_html" -ForegroundColor Gray
