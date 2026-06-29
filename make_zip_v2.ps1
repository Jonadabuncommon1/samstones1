$zipPath = "C:\Users\ed\Downloads\samstones_v2_upload.zip"
$distPath = "C:\Users\ed\Downloads\samstones\dist\*"

if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
  Write-Host "Old ZIP deleted." -ForegroundColor Yellow
}

Write-Host "Creating fresh deployment ZIP..." -ForegroundColor Cyan
Compress-Archive -Path $distPath -DestinationPath $zipPath -Force

$size = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)
Write-Host ""
Write-Host "SUCCESS! New ZIP ready:" -ForegroundColor Green
Write-Host "  $zipPath" -ForegroundColor White
Write-Host "  Size: $size MB" -ForegroundColor Cyan
