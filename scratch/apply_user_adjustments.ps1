$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$files = @("index.html", "bombonbloom/index.html", "doxa/index.html", "cookie/index.html", "lingote/index.html", "oblea/index.html")

$oldMediaBlock = @"
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
"@

$oldMediaBlockBombon = @"
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
"@

$newMediaBlock = @"
        @media (min-width: 769px) {
            .wheel-column {
                transform: translateX(60px);
            }
            .text-column {
                transform: translateX(-60px);
            }
        }
"@

foreach ($filePath in $files) {
    Write-Host "Updating $filePath ..."
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

    # 1. Update .content-grid max-width from 1200px to 1380px
    # Target only .content-grid { ... max-width: 1200px;
    $pattern = '(?s)(\.content-grid\s*\{[^}]*?width:\s*100%;\s*max-width:\s*)1200px;'
    $content = [regex]::Replace($content, $pattern, '${1}1380px;')

    # 2. Update media blocks for translateX(140px) -> translateX(60px)
    if ($content.Contains("transform: translateX(140px);")) {
        # Regex replace any block with 140px / 60px down to unified 60px
        $mediaPattern = '(?s)@media\s*\(min-width:\s*1025px\)\s*\{\s*\.wheel-column\s*\{[^}]+\}\s*\.text-column\s*\{[^}]+\}\s*\}\s*@media\s*\(min-width:\s*769px\)\s*and\s*\(max-width:\s*1024px\)\s*\{\s*\.wheel-column\s*\{[^}]+\}\s*\.text-column\s*\{[^}]+\}\s*\}'
        $content = [regex]::Replace($content, $mediaPattern, $newMediaBlock.Trim())
    }

    # 3. Update max-width: 520px -> 480px on text box
    $content = $content.Replace("max-width: 520px !important;", "max-width: 480px !important;")
    $content = $content.Replace("max-width: 520px;", "max-width: 480px;")

    [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
    Write-Host "  Finished $filePath."
}

