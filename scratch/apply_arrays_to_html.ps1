$filePath = "bombonbloom/index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$lines = [System.IO.File]::ReadAllLines($filePath, [System.Text.Encoding]::UTF8)

$startLine = -1
$endLine = -1

for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "\[RUEDA 3:") {
        $startLine = $i - 1
        break
    }
}

for ($i = $startLine; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "MOTOR 1: RUEDAS ESTILO DOXA") {
        $endLine = $i - 1
        break
    }
}

if ($startLine -eq -1 -or $endLine -eq -1) {
    Write-Host "ERROR: Could not locate bounds"
    exit 1
}

Write-Host "Replacing lines $startLine to $endLine (0-indexed)"

# Read new arrays text
$newArrays = [System.IO.File]::ReadAllText('scratch/generated_arrays.js', [System.Text.Encoding]::UTF8)

# Build new file content
$beforeLines = [string]::Join("`r`n", $lines[0..($startLine - 1)])
$afterLines = [string]::Join("`r`n", $lines[$endLine..($lines.Length - 1)])

$newContent = $beforeLines + "`r`n" + $newArrays + "`r`n`r`n" + $afterLines

# Also add CRUJIENTE support in formatCategoryName if not already present
if (-not $newContent.Contains("CRUJIENTE")) {
    $targetSnippet = "                } else if (/^OBLEA\s+/i.test(name)) {`r`n                    prefix = 'OBLEA';`r`n                    clean = name.replace(/^OBLEA\s+/i, '');`r`n                } else if (/^PEQUEBLOOM\s+/i.test(name)) {"
    $replacementSnippet = "                } else if (/^OBLEA\s+/i.test(name)) {`r`n                    prefix = 'OBLEA';`r`n                    clean = name.replace(/^OBLEA\s+/i, '');`r`n                } else if (/^CRUJIENTE\s+/i.test(name)) {`r`n                    prefix = 'CRUJIENTE';`r`n                    clean = name.replace(/^CRUJIENTE\s+/i, '');`r`n                } else if (/^PEQUEBLOOM\s+/i.test(name)) {"
    if ($newContent.Contains($targetSnippet)) {
        $newContent = $newContent.Replace($targetSnippet, $replacementSnippet)
        Write-Host "Added CRUJIENTE prefix handling in formatCategoryName."
    }
}

# Write UTF-8 without BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($filePath, $newContent, $utf8NoBom)

Write-Host "Successfully applied new arrays to $filePath!"
