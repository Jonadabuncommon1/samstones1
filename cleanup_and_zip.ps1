# Files referenced by the current dist/index.html (keep these)
$keep = @(
  'index-BH5Y0L6A.js',
  'ui-DJ2dw-H4.js',
  'motion-BXpOcoXI.js',
  'vendor-CVbq7X0w.js',
  'firebase-s32Qmb7C.js',
  'index-DboEKoue.css',
  'visitorTracking-BggV4-xh.js',
  'WishlistView-Ddtpetqy.js',
  'CategoriesView-DXlyH_TM.js',
  'ProductCard-B2WtuWw5.js',
  'AdminLogin-a8y4WHm0.js',
  'PrivacyView-DYCsmWrQ.js',
  'ProductDetailView-NwU6PBsk.js',
  'AboutView-syWUWq5E.js',
  'ContactView-BGVnsu-H.js',
  'TermsView-Bqs9Rr4m.js',
  'HomeView-Cj15STnm.js',
  'AuthView-BBB9GzeE.js',
  'CategoryView-CJUtgsM6.js',
  'AIChatWidget-DrqsUp7Q.js',
  'AdminLayout-Cbzjm3ZH.js',
  'lucide-BfCRmPoJ.js',
  'react-core-D-1Pq-3n.js',
  'react-icons-BsrvUeV0.js',
  'toast-Ct-4hHGU.js'
)

$assetsDir = 'C:\Users\ed\Downloads\samstones\dist\assets'
$removed = 0

Write-Host "=== Cleaning old duplicate assets ===" -ForegroundColor Cyan
Get-ChildItem $assetsDir | Where-Object { $keep -notcontains $_.Name } | ForEach-Object {
  Remove-Item $_.FullName -Force
  Write-Host "  Removed: $($_.Name)" -ForegroundColor Yellow
  $removed++
}
Write-Host "Cleanup done. Removed $removed old/stale files." -ForegroundColor Green

# Create the ZIP
$zipPath = 'C:\Users\ed\Downloads\samstones_deploy.zip'
if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
  Write-Host "Deleted old ZIP." -ForegroundColor Yellow
}

Write-Host "" 
Write-Host "=== Creating deployment ZIP ===" -ForegroundColor Cyan
Compress-Archive -Path 'C:\Users\ed\Downloads\samstones\dist\*' -DestinationPath $zipPath -Force
Write-Host ""
Write-Host "SUCCESS! ZIP created at: $zipPath" -ForegroundColor Green

$zipSize = (Get-Item $zipPath).Length / 1MB
Write-Host "ZIP size: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Cyan
Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor White
Write-Host "  1. Delete ALL files in your public_html folder on your host" -ForegroundColor White
Write-Host "  2. Upload samstones_deploy.zip to public_html" -ForegroundColor White
Write-Host "  3. Extract the ZIP in public_html" -ForegroundColor White
Write-Host "  4. Make sure index.html is directly inside public_html (not in a subfolder)" -ForegroundColor White
