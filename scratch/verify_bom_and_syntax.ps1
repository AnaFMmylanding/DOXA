$bytes = [System.IO.File]::ReadAllBytes('bombonbloom/index.html')
# Check BOM
if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    Write-Host "WARNING: File has UTF-8 BOM!"
} else {
    Write-Host "File is UTF-8 without BOM (OK)."
}

# Check for replacement character \uFFFD
$text = [System.IO.File]::ReadAllText('bombonbloom/index.html', [System.Text.Encoding]::UTF8)
if ($text.Contains([char]0xFFFD)) {
    Write-Host "WARNING: File contains replacement character U+FFFD!"
} else {
    Write-Host "No U+FFFD characters detected (OK)."
}

# Verify JS tags balance
$scriptOpen = [regex]::Matches($text, '<script\b')
$scriptClose = [regex]::Matches($text, '</script>')
Write-Host "Script tags: $($scriptOpen.Count) open, $($scriptClose.Count) close."

