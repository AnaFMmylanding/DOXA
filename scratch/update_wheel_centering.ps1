$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Update-DoxaStyleFile($filePath) {
    Write-Host "Updating $filePath ..."
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

    # 1. Update JS: getRadioCategorias
    $content = $content.Replace(
        "const getRadioCategorias = () => (window.innerWidth <= 768 ? 205 : 250);",
        "const getRadioCategorias = () => (window.innerWidth <= 768 ? 205 : 215);"
    )

    # 2. Update JS: actualParentRadio
    $content = $content.Replace(
        "actualParentRadio = isOdd ? (isMobile ? 228 : 282) : (isMobile ? 182 : 240);",
        "actualParentRadio = isOdd ? (isMobile ? 228 : 235) : (isMobile ? 182 : 205);"
    )

    # 3. Add CSS for centering wheel and text box in desktop, plus mobile reset
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

    # Find .wheel-column definition to append the @media rules
    $pattern = '(?s)(\.text-column\s*\{[^}]+\})'
    if ($content -match $pattern) {
        $matched = $matches[1]
        if (-not $content.Contains("transform: translateX(140px);")) {
            $content = $content.Replace($matched, $matched + "`r`n" + $cssInsert)
            Write-Host "  Added desktop centering CSS."
        }
    }

    # In mobile @media (max-width: 768px), add transform: none !important to .wheel-column and .text-column
    # For .wheel-column in mobile:
    $targetMobileWheel = "height: 380px !important;`r`n                    display: flex !important;"
    $replaceMobileWheel = "height: 380px !important;`r`n                    transform: none !important;`r`n                    display: flex !important;"
    if ($content.Contains($targetMobileWheel) -and -not $content.Contains("transform: none !important;`r`n                    display: flex !important;")) {
        $content = $content.Replace($targetMobileWheel, $replaceMobileWheel)
        Write-Host "  Added transform: none to mobile .wheel-column."
    }

    # For .text-column in mobile:
    $targetMobileText = "flex-direction: column !important;`r`n                    align-items: center !important;"
    $replaceMobileText = "flex-direction: column !important;`r`n                    align-items: center !important;`r`n                    transform: none !important;"
    if ($content.Contains($targetMobileText) -and -not $content.Contains("align-items: center !important;`r`n                    transform: none !important;")) {
        $content = $content.Replace($targetMobileText, $replaceMobileText)
        Write-Host "  Added transform: none to mobile .text-column."
    }

    [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
    Write-Host "Finished $filePath."
}

# Update index.html, doxa/index.html, cookie/index.html, lingote/index.html, oblea/index.html
Update-DoxaStyleFile "index.html"
Update-DoxaStyleFile "doxa/index.html"
Update-DoxaStyleFile "cookie/index.html"
Update-DoxaStyleFile "lingote/index.html"
Update-DoxaStyleFile "oblea/index.html"

