$content = [System.IO.File]::ReadAllText('scratch/all_8_bbb_categories.js', [System.Text.Encoding]::UTF8)
$m = [regex]::Match($content, '(?s)n:\s*"BBB Articulaciones".+?tagline:\s*"([^"]+)"')
Write-Host "Articulaciones tagline: '$($m.Groups[1].Value)'"

