$content = [System.IO.File]::ReadAllText('scratch/all_8_bbb_categories.js', [System.Text.Encoding]::UTF8)
$pattern = '(?s)\{\s*n:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*tagline:\s*"([^"]+)",\s*img:\s*"([^"]+)",\s*bg:\s*"([^"]+)",\s*neg:\s*"([^"]+)",\s*prop:\s*"([^"]+)",\s*subActivos:\s*\[(.*?)\]\s*\}'
$matches = [regex]::Matches($content, $pattern)
Write-Host "Found $($matches.Count) category objects."
for ($i = 0; $i -lt $matches.Count; $i++) {
    Write-Host "[$i] $($matches[$i].Groups[1].Value)"
}

