$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$files = @("index.html", "bombonbloom/index.html", "doxa/index.html", "cookie/index.html", "lingote/index.html", "oblea/index.html")

foreach ($filePath in $files) {
    Write-Host "Updating $filePath ..."
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

    # 1. Update the media query max-width: 380px -> 520px !important
    $content = $content.Replace("max-width: 380px;", "max-width: 520px !important;")

    # 2. Update the base .text-box max-width: 420px -> 520px
    $content = $content.Replace("max-width: 420px;", "max-width: 520px;")

    [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
    Write-Host "  Done."
}

