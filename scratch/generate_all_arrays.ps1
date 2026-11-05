$raw = [System.IO.File]::ReadAllText('scratch/all_8_bbb_categories.js', [System.Text.Encoding]::UTF8)

# Extract objects using regex match
$pattern = '(?s)\s*\{\s*n:\s*"BBB [^"]+",.+?subActivos:\s*\[.+?\]\s*\}'
$matches = [regex]::Matches($raw, $pattern)

Write-Host "Extracted $($matches.Count) categories from scratch/all_8_bbb_categories.js"

if ($matches.Count -ne 8) {
    Write-Host "Error: Expected 8 categories, got $($matches.Count)"
    exit 1
}

$sb = New-Object System.Text.StringBuilder

# 1. bbbCategorias
[void]$sb.AppendLine('        /* =========================================================================')
[void]$sb.AppendLine('           [RUEDA 3: BOMBÓN BLOOM]')
[void]$sb.AppendLine('           ========================================================================= */')
[void]$sb.AppendLine('        const bbbCategorias = [')
for ($i = 0; $i -lt 8; $i++) {
    $objText = $matches[$i].Value.Trim()
    [void]$sb.Append('        ' + $objText)
    if ($i -lt 7) { [void]$sb.AppendLine(',') } else { [void]$sb.AppendLine('') }
}
[void]$sb.AppendLine('        ];')
[void]$sb.AppendLine('')

# 2. lingoteCategorias
[void]$sb.AppendLine('        /* =========================================================================')
[void]$sb.AppendLine('           [RUEDA 4: LINGOTES]')
[void]$sb.AppendLine('           ========================================================================= */')
[void]$sb.AppendLine('        const lingoteCategorias = [')
for ($i = 0; $i -lt 8; $i++) {
    $objText = $matches[$i].Value.Trim()
    $objText = $objText -replace 'n:\s*"BBB ', 'n: "Lingote '
    $objText = $objText -replace 'title:\s*"BBB ', 'title: "Lingote '
    $objText = [regex]::Replace($objText, 'tagline:\s*"[^"]+"', 'tagline: "LINGOTE"')
    $objText = [regex]::Replace($objText, 'img:\s*"[^"]+"', 'img: "../Lingote.png"')
    [void]$sb.Append('        ' + $objText)
    if ($i -lt 7) { [void]$sb.AppendLine(',') } else { [void]$sb.AppendLine('') }
}
[void]$sb.AppendLine('        ];')
[void]$sb.AppendLine('')

# 3. obleaCategorias
[void]$sb.AppendLine('        /* =========================================================================')
[void]$sb.AppendLine('           [RUEDA 5: CRUJIENTE DE ALMENDRA]')
[void]$sb.AppendLine('           ========================================================================= */')
[void]$sb.AppendLine('        const obleaCategorias = [')
for ($i = 0; $i -lt 8; $i++) {
    $objText = $matches[$i].Value.Trim()
    $objText = $objText -replace 'n:\s*"BBB ', 'n: "Crujiente '
    $objText = $objText -replace 'title:\s*"BBB ', 'title: "Crujiente '
    $objText = [regex]::Replace($objText, 'tagline:\s*"[^"]+"', 'tagline: "CRUJIENTE DE ALMENDRA"')
    $objText = [regex]::Replace($objText, 'img:\s*"[^"]+"', 'img: "../Oblea.png"')
    [void]$sb.Append('        ' + $objText)
    if ($i -lt 7) { [void]$sb.AppendLine(',') } else { [void]$sb.AppendLine('') }
}
[void]$sb.AppendLine('        ];')
[void]$sb.AppendLine('')

# 4. pequebloomCategorias
[void]$sb.AppendLine('        /* =========================================================================')
[void]$sb.AppendLine('           [RUEDA 6: PEQUEBLOOMS / NENEBLOOMS]')
[void]$sb.AppendLine('           ========================================================================= */')
[void]$sb.AppendLine('        const pequebloomCategorias = [')
for ($i = 0; $i -lt 8; $i++) {
    $objText = $matches[$i].Value.Trim()
    $objText = $objText -replace 'n:\s*"BBB ', 'n: "PequeBloom '
    $objText = $objText -replace 'title:\s*"BBB ', 'title: "PequeBloom '
    $objText = [regex]::Replace($objText, 'tagline:\s*"[^"]+"', 'tagline: "PEQUEBLOOMS"')
    $objText = [regex]::Replace($objText, 'img:\s*"[^"]+"', 'img: "../Pequebloom.png"')
    [void]$sb.Append('        ' + $objText)
    if ($i -lt 7) { [void]$sb.AppendLine(',') } else { [void]$sb.AppendLine('') }
}
[void]$sb.AppendLine('        ];')

$generated = $sb.ToString()
[System.IO.File]::WriteAllText('scratch/generated_arrays.js', $generated, [System.Text.Encoding]::UTF8)
Write-Host "Generated text successfully written to scratch/generated_arrays.js (length: $($generated.Length))"
