$filePath = "bombonbloom/index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Replace common mojibake sequences
$content = $content.Replace("Ã³", "ó")
$content = $content.Replace("Ã¡", "á")
$content = $content.Replace("Ã­", "í")
$content = $content.Replace("Ã©", "é")
$content = $content.Replace("Ãº", "ú")
$content = $content.Replace("Ã±", "ñ")
$content = $content.Replace("Ãš", "Ú")
$content = $content.Replace("Ã“", "Ó")
$content = $content.Replace("Ã ", "Á")
$content = $content.Replace("Ã‰", "É")
$content = $content.Replace("Ã", "Í")

# Also replace the regex in formatCategoryName with the clean pure-ASCII check
$targetRegex = 'const m = name.match(/^([A-Za-z'
if ($content.Contains($targetRegex)) {
    # Find the full line
    $pattern = [regex]'(?m)^\s*const m = name\.match\(.+?\);$'
    $content = $pattern.Replace($content, '// Prefix check handled cleanly', 1)
}

$cleanFormat = @"
            function formatCategoryName(name) {
                let prefix = '';
                let clean = name;
                if (/^BBB\s+/i.test(name)) {
                    prefix = 'BBB';
                    clean = name.replace(/^BBB\s+/i, '');
                } else if (/^LINGOTE\s+/i.test(name)) {
                    prefix = 'LINGOTE';
                    clean = name.replace(/^LINGOTE\s+/i, '');
                } else if (/^OBLEA\s+/i.test(name)) {
                    prefix = 'OBLEA';
                    clean = name.replace(/^OBLEA\s+/i, '');
                } else if (/^PEQUEBLOOM\s+/i.test(name)) {
                    prefix = 'PEQUEBLOOM';
                    clean = name.replace(/^PEQUEBLOOM\s+/i, '');
                }
                const words = clean.split(' ');
                const prefixHtml = prefix ? ('<span style="display:block; font-size:8.5px; opacity:0.8; letter-spacing:2px; margin-bottom:2px;">' + prefix + '</span>') : '';
                if (words.length > 2) {
                    return prefixHtml + '<span style="display:block; white-space:nowrap;">' + words.slice(0, 2).join(' ') + '</span><span style="display:block; white-space:nowrap; margin-top:2px;">' + words.slice(2).join(' ') + '</span>';
                } else if (words.length === 2) {
                    return prefixHtml + '<span style="display:block; white-space:nowrap;">' + words[0] + '</span><span style="display:block; white-space:nowrap; margin-top:2px;">' + words[1] + '</span>';
                }
                return prefixHtml + '<span style="display:block; white-space:nowrap;">' + clean + '</span>';
            }
"@

$oldFormatPattern = [regex]'(?s)function formatCategoryName\(name\)\s*\{.+?return prefixHtml \+ ''<span style="display:block; white-space:nowrap;">'' \+ clean \+ ''</span>'';\s*\}'
if ($oldFormatPattern.IsMatch($content)) {
    $content = $oldFormatPattern.Replace($content, $cleanFormat.Trim(), 1)
    Write-Host "formatCategoryName updated to clean ASCII version."
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
Write-Host "Encoding fix finished."

