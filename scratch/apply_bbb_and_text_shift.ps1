$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# 1. Update bombonbloom/index.html: BBB category radius
$bbbPath = "bombonbloom/index.html"
Write-Host "Updating BBB category radius in $bbbPath ..."
$bbbContent = [System.IO.File]::ReadAllText($bbbPath, [System.Text.Encoding]::UTF8)

# In initBBBStyleWheel:
# getRadioCategorias
$bbbContent = $bbbContent.Replace(
    "const getRadioCategorias = () => (window.innerWidth <= 768 ? 155 : 215);",
    "const getRadioCategorias = () => (window.innerWidth <= 768 ? 155 : 180);"
)

# actualParentRadio neutral
$bbbContent = $bbbContent.Replace(
    "actualParentRadio = (i % 2 !== 0) ? 235 : 205;",
    "actualParentRadio = (i % 2 !== 0) ? 194 : 180;"
)

# actualParentRadio selected
$bbbContent = $bbbContent.Replace(
    "actualParentRadio = isMobile ? 150 : (radioCategorias + 15);",
    "actualParentRadio = isMobile ? 150 : (radioCategorias + 12);"
)

[System.IO.File]::WriteAllText($bbbPath, $bbbContent, $utf8NoBom)
Write-Host "  Updated BBB radii."

# 2. Update CSS in all 6 files: shift text-column to the right (away from center)
$files = @("bombonbloom/index.html", "index.html", "doxa/index.html", "cookie/index.html", "lingote/index.html", "oblea/index.html")

$targetCss = @"
        @media (min-width: 769px) {
            .wheel-column {
                transform: translateX(60px);
            }
            .text-column {
                transform: translateX(-60px);
            }
        }
"@

$newCss = @"
        @media (min-width: 769px) {
            .wheel-column {
                transform: translateX(40px);
            }
            .text-column {
                transform: translateX(40px);
            }
        }
"@

# Also handle index.html indentation (12 spaces)
$targetCssIndex = @"
            @media (min-width: 769px) {
            .wheel-column {
                transform: translateX(60px);
            }
            .text-column {
                transform: translateX(-60px);
            }
        }
"@

$newCssIndex = @"
            @media (min-width: 769px) {
                .wheel-column {
                    transform: translateX(40px);
                }
                .text-column {
                    transform: translateX(40px);
                }
            }
"@

foreach ($filePath in $files) {
    Write-Host "Updating CSS in $filePath ..."
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

    # Use regex to replace .text-column { transform: translateX(-60px); } with transform: translateX(40px);
    $content = [regex]::Replace($content, '(\.text-column\s*\{\s*transform:\s*translateX\()-60px(\);)', '${1}40px${2}')
    $content = [regex]::Replace($content, '(\.wheel-column\s*\{\s*transform:\s*translateX\()60px(\);)', '${1}40px${2}')

    [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
    Write-Host "  Done $filePath."
}

