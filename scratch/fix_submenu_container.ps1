$path = 'bombonbloom/index.html'
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$text = [regex]::Replace($text, '(\.bbb-submenu-container\s*\{[^}]*?max-width:\s*)520px !important;', '${1}380px;')
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $text, $utf8NoBom)
Write-Host "Fixed .bbb-submenu-container"

