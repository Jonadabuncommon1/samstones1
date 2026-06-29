$src = "C:\Users\ed\Downloads\Samstones Logo.png"

$destinations = @(
  "C:\Users\ed\Downloads\samstones\public\favicon.ico",
  "C:\Users\ed\Downloads\samstones\public\favicon.png",
  "C:\Users\ed\Downloads\samstones\dist\favicon.ico",
  "C:\Users\ed\Downloads\samstones\dist\favicon.png"
)

Write-Host "=== Replacing favicon files with new logo ===" -ForegroundColor Cyan
foreach ($dest in $destinations) {
  Copy-Item -Path $src -Destination $dest -Force
  Write-Host "  Replaced: $dest" -ForegroundColor Green
}
Write-Host ""
Write-Host "All favicon files updated!" -ForegroundColor Green
