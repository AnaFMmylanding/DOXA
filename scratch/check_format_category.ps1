$filePath = "bombonbloom/index.html"
$lines = [System.IO.File]::ReadAllLines($filePath, [System.Text.Encoding]::UTF8)

for ($i = 4860; $i -lt 4900; $i++) {
    if ($lines[$i] -match "function formatCategoryName") {
        Write-Host "Found formatCategoryName in initBBBStyleWheel at line $($i + 1)"
        for ($j = $i; $j -lt $i + 20; $j++) {
            Write-Host "$($j + 1): $($lines[$j])"
        }
        break
    }
}

