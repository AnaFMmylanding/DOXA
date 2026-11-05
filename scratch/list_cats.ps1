$filePath = "bombonbloom/index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Extract bbbCategorias array
if ($content -match '(?s)const bbbCategorias = \[(.+?)\];\s*const lingoteCategorias') {
    $arrayContent = $matches[1]
    # Match outer objects only
    $catMatches = [regex]::Matches($arrayContent, '(?s)\{\s*n:\s*"([^"]+)",\s*title:\s*"([^"]+)"')
    Write-Host "Found $($catMatches.Count) categories in bbbCategorias:"
    $i = 0
    foreach ($cm in $catMatches) {
        Write-Host "  [$i] $($cm.Groups[1].Value) | $($cm.Groups[2].Value)"
        $i++
    }
} else {
    Write-Host "Could not find bbbCategorias array."
}

