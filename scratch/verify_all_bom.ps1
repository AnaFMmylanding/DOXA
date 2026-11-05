$files = @("index.html", "bombonbloom/index.html", "doxa/index.html", "cookie/index.html", "lingote/index.html", "oblea/index.html")

foreach ($f in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($f)
    $hasBom = ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)
    $text = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
    $hasFFFD = $text.Contains([char]0xFFFD)
    Write-Host "$f : BOM=$hasBom | U+FFFD=$hasFFFD"
}

