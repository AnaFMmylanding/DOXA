$text = [System.IO.File]::ReadAllText("scratch/all_8_bbb_categories.js", [System.Text.Encoding]::UTF8)

$matches = [regex]::Matches($text, '(?m)^\s*n:\s*"([^"]+)",\s*$')
Write-Host "Total categories in b3ff0e9: $($matches.Count)"
$i = 0
foreach ($m in $matches) {
    Write-Host "  [$i] $($m.Groups[1].Value)"
    $i++
}

