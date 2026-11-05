$text = [System.IO.File]::ReadAllText("scratch/all_8_bbb_categories.js", [System.Text.Encoding]::UTF8)

# Check all 8 categories exist and their names
$matches = [regex]::Matches($text, '(?m)^\s*n:\s*"([^"]+)",')
Write-Host "Categories in scratch/all_8_bbb_categories.js: $($matches.Count)"
for ($i = 0; $i -lt $matches.Count; $i++) {
    Write-Host "  [$i] $($matches[$i].Groups[1].Value)"
}

