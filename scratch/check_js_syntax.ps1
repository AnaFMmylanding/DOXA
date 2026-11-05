$filePath = "bombonbloom/index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Check balanced braces in script
$matches = [regex]::Matches($content, '(?s)<script\b[^>]*>(.*?)</script>')
Write-Host "Found $($matches.Count) script tags."

$idx = 0
foreach ($m in $matches) {
    $idx++
    $script = $m.Groups[1].Value
    $openBraces = ([regex]::Matches($script, '\{')).Count
    $closeBraces = ([regex]::Matches($script, '\}')).Count
    $openParens = ([regex]::Matches($script, '\(')).Count
    $closeParens = ([regex]::Matches($script, '\)')).Count
    $openBrackets = ([regex]::Matches($script, '\[')).Count
    $closeBrackets = ([regex]::Matches($script, '\]')).Count

    Write-Host "Script #$idx : Braces: $openBraces / $closeBraces | Parens: $openParens / $closeParens | Brackets: $openBrackets / $closeBrackets"
    if ($openBraces -ne $closeBraces) {
        Write-Host "WARNING: Unbalanced braces in script #$idx"
    }
    if ($openParens -ne $closeParens) {
        Write-Host "WARNING: Unbalanced parens in script #$idx"
    }
    if ($openBrackets -ne $closeBrackets) {
        Write-Host "WARNING: Unbalanced brackets in script #$idx"
    }
}

