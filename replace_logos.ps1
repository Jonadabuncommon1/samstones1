$src = "C:\Users\ed\Downloads\Samstones Logo.png"

$destinations = @(
  "C:\Users\ed\Downloads\samstones\public\logo.png",
  "C:\Users\ed\Downloads\samstones\public\logo.png.jpg",
  "C:\Users\ed\Downloads\samstones\public\samstones-logo.jpg",
  "C:\Users\ed\Downloads\samstones\dist\logo.png",
  "C:\Users\ed\Downloads\samstones\dist\logo.png.jpg",
  "C:\Users\ed\Downloads\samstones\dist\samstones-logo.jpg"
)

if (-not (Test-Path $src)) {
  Write-Host "ERROR: Source file not found: $src" -ForegroundColor Red
  exit 1
}

$srcSize = (Get-Item $src).Length
Write-Host "Source: $src ($srcSize bytes)" -ForegroundColor Cyan
Write-Host ""

foreach ($dest in $destinations) {
  Copy-Item -Path $src -Destination $dest -Force
  Write-Host "  Replaced: $dest" -ForegroundColor Green
}

Write-Host ""
Write-Host "All 6 logo files replaced successfully!" -ForegroundColor Green
