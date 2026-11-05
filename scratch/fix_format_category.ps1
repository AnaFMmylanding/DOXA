$filePath = "bombonbloom/index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Normalize CRLF to LF
$content = $content.Replace("`r`n", "`n")

$pattern = [regex]'(?s)function formatCategoryName\(name\)\s*\{.+?return prefixHtml \+ ''<span style="display:block; white-space:nowrap;">'' \+ clean \+ ''</span>'';\s*\}'

$replacement = @'
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
'@

if ($pattern.IsMatch($content)) {
    $content = $pattern.Replace($content, $replacement.Trim(), 1)
    Write-Host "Replaced formatCategoryName successfully."
} else {
    Write-Host "Pattern did NOT match."
}

# Restore CRLF
$content = $content.Replace("`n", "`r`n")
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
Write-Host "Saved."

