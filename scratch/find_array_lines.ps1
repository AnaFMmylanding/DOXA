$filePath = "bombonbloom/index.html"
$lines = [System.IO.File]::ReadAllLines($filePath, [System.Text.Encoding]::UTF8)

for ($i = 3050; $i -lt 3500; $i++) {
    if ($lines[$i] -match "const (bbbCategorias|lingoteCategorias|obleaCategorias|pequebloomCategorias)\s*=") {
        Write-Host "Line $($i + 1): $($lines[$i])"
    }
}

