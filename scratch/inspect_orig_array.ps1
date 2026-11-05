$text = [System.IO.File]::ReadAllText("scratch/original_bbb_array.js", [System.Text.Encoding]::UTF8)

$matches = [regex]::Matches($text, '(?m)^\s*n:\s*"([^"]+)",\s*$')
Write-Host "Total categories in original bbbCategorias: $($matches.Count)"
$i = 0
foreach ($m in $matches) {
    Write-Host "  [$i] $($m.Groups[1].Value)"
    $i++
}

