$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$filePath = "bombonbloom/index.html"
Write-Host "Updating $filePath ..."
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# 1. Update JS in initDoxaStyleWheel
$content = $content.Replace(
    "const getRadioCategorias = () => (window.innerWidth <= 768 ? 205 : 250);",
    "const getRadioCategorias = () => (window.innerWidth <= 768 ? 205 : 215);"
)
$content = $content.Replace(
    "actualParentRadio = isOdd ? (isMobile ? 228 : 282) : (isMobile ? 182 : 240);",
    "actualParentRadio = isOdd ? (isMobile ? 228 : 235) : (isMobile ? 182 : 205);"
)

# 2. Update JS in initBBBStyleWheel
$content = $content.Replace(
    "const getRadioCategorias = () => (window.innerWidth <= 768 ? 155 : 250);",
    "const getRadioCategorias = () => (window.innerWidth <= 768 ? 155 : 215);"
)
$content = $content.Replace(
    "actualParentRadio = (i % 2 !== 0) ? 282 : 240;",
    "actualParentRadio = (i % 2 !== 0) ? 235 : 205;"
)
$content = $content.Replace(
    "actualParentRadio = isMobile ? 150 : (radioCategorias + 25);",
    "actualParentRadio = isMobile ? 150 : (radioCategorias + 15);"
)

# 3. Add desktop centering CSS
$cssInsert = @"

        @media (min-width: 1025px) {
            .wheel-column {
                transform: translateX(140px);
            }
            .text-column {
                transform: translateX(-140px);
            }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
            .wheel-column {
                transform: translateX(60px);
            }
            .text-column {
                transform: translateX(-60px);
            }
        }
        @media (min-width: 769px) {
            .text-box, .rueda-cta-wrapper {
                max-width: 380px;
            }
        }
"@

$pattern = '(?s)(\.text-column\s*\{[^}]+\})'
if ($content -match $pattern) {
    $matched = $matches[1]
    if (-not $content.Contains("transform: translateX(140px);")) {
        $content = $content.Replace($matched, $matched + "`r`n" + $cssInsert)
        Write-Host "  Added desktop centering CSS to bombonbloom/index.html."
    }
}

# 4. Mobile reset
$targetMobileWheel = "height: 380px !important;`r`n                display: flex !important;"
$replaceMobileWheel = "height: 380px !important;`r`n                transform: none !important;`r`n                display: flex !important;"
if ($content.Contains($targetMobileWheel) -and -not $content.Contains("transform: none !important;`r`n                display: flex !important;")) {
    $content = $content.Replace($targetMobileWheel, $replaceMobileWheel)
    Write-Host "  Added transform: none to mobile .wheel-column in bombonbloom/index.html."
}

$targetMobileText = "flex-direction: column !important;`r`n                align-items: center !important;"
$replaceMobileText = "flex-direction: column !important;`r`n                align-items: center !important;`r`n                transform: none !important;"
if ($content.Contains($targetMobileText) -and -not $content.Contains("align-items: center !important;`r`n                transform: none !important;")) {
    $content = $content.Replace($targetMobileText, $replaceMobileText)
    Write-Host "  Added transform: none to mobile .text-column in bombonbloom/index.html."
}

[System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
Write-Host "Finished bombonbloom/index.html."

