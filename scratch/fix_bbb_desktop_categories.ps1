$filePath = "bombonbloom/index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Normalize to `n
$content = $content.Replace("`r`n", "`n")

# --- Change A ---
$patternA = [regex]'(?s)\s*// Deteccion dinamica de si la rueda se corta con el margen izquierdo de la ventana\s+function isWheelCutByMargin\(\)\s*\{.+?function updateFanArcVisibility\(tempRot\)\s*\{.+?\}\s*\}'
$replaceA = @"

            // En desktop/monitor se muestran SIEMPRE todas las 8 categorías en 360°
            function isWheelCutByMargin() {
                return false;
            }

            function getGradosPadre(idx) {
                if (window.innerWidth <= 768) {
                    return getMobileParentAngle(idx);
                }
                const anguloPaso = 360 / bbbCategorias.length;
                return idx * anguloPaso - 90;
            }

            function updateFanArcVisibility(tempRot) {
                // No-op: en desktop las 8 categorías se mantienen siempre visibles
            }
"@

if ($patternA.IsMatch($content)) {
    $content = $patternA.Replace($content, $replaceA, 1)
    Write-Host "Change A replaced successfully."
} else {
    Write-Host "Change A NOT found."
}

# --- Change B: remove isWheelCutByMargin in selectCategory ---
$patternB = [regex]'(?s)\}\s*else if \(isWheelCutByMargin\(\)\)\s*\{.+?rueda\.querySelectorAll\(''\.sub-activo-link''\)\.forEach\(t => \{\s*t\.style\.transition = initial \? ''none'' : `transform \$\{rotDur\}s cubic-bezier\(0\.25, 1, 0\.5, 1\), color 0\.45s ease, text-shadow 0\.45s ease`;\s*t\.style\.transform = `rotate\(\$\{-rotacionActual\}deg\)`;\s*\}\);\s*\}\s*else\s*\{'
$replaceB = "} else {"

if ($patternB.IsMatch($content)) {
    $content = $patternB.Replace($content, $replaceB, 1)
    Write-Host "Change B replaced successfully."
} else {
    Write-Host "Change B NOT found."
}

# --- Change C: resetToNeutral ---
$patternC = [regex]'(?s)function resetToNeutral\(\)\s*\{.+?renderRueda\(\);\s*\}'
$replaceC = @"
function resetToNeutral() {
                selectedCategoryIndex = -1;
                selectedSubIndex = -1;
                childrenVisible = false;

                rotacionActual = 0;
                rueda.style.transition = 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)';
                rueda.style.transform = 'rotate(0deg)';
                rueda.querySelectorAll('.nodo-texto').forEach(t => {
                    t.style.transition = 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1), color 0.5s ease';
                    t.style.transform = 'rotate(0deg)';
                });

                // Resetear la foto central
                if (galletaFija) {
                    galletaFija.style.transition = 'opacity 0.25s ease, transform 0.3s ease';
                    galletaFija.style.opacity = '0';
                    setTimeout(() => {
                        galletaFija.src = defaultImgSrc;
                        galletaFija.alt = defaultImgAlt;
                        galletaFija.style.opacity = '1';
                    }, 220);
                }

                // Resetear el fondo a neutral con desvanecimiento suave
                transitionBg('../piel negra.jpg');

                transitionCajaText(defaultNeutralHTML);
                renderRueda();
            }
"@

if ($patternC.IsMatch($content)) {
    $content = $patternC.Replace($content, $replaceC, 1)
    Write-Host "Change C replaced successfully."
} else {
    Write-Host "Change C NOT found."
}

# --- Change D: actualParentRadio in renderRueda ---
$patternD = [regex]'(?s)// Radios intercalados en zigzag.+?line\.style\.width = `\$\{actualParentRadio\}px`;'
$replaceD = @"
let actualParentRadio;
                    if (isSelected) {
                        actualParentRadio = isMobile ? 150 : (radioCategorias + 25);
                    } else {
                        if (isMobile) {
                            actualParentRadio = getMobileParentRadius(i);
                        } else {
                            actualParentRadio = (i % 2 !== 0) ? 282 : 240;
                        }
                    }

                    // Línea rayo de la categoría padre
                    let line = rueda.querySelector(`.ray-line[data-index="${i}"]`);
                    if (!line) {
                        line = document.createElement('div');
                        line.className = 'ray-line';
                        line.dataset.index = i;
                        line.style.position = 'absolute';
                        line.style.top = 'calc(50% - 0.5px)';
                        line.style.left = '50%';
                        line.style.height = '1px';
                        line.style.transformOrigin = '0 50%';
                        line.style.zIndex = '0';
                        line.style.pointerEvents = 'none';
                        line.style.transition = 'width 0.75s ease, background 0.5s ease, opacity 0.6s ease';
                        rueda.appendChild(line);
                    }

                    line.style.transform = `rotate(${gradosPadre}deg)`;
                    line.style.width = `${actualParentRadio}px`;
"@

if ($patternD.IsMatch($content)) {
    $content = $patternD.Replace($content, $replaceD, 1)
    Write-Host "Change D replaced successfully."
} else {
    Write-Host "Change D NOT found."
}

# --- Change E: subActivos deployment ---
$patternE = [regex]'(?s)\}\s*else if \(isWheelCutByMargin\(\)\)\s*\{.+?// MODO ABANICO INTERIOR.+?rueda\.appendChild\(nodoSub\);\s*setTimeout\(.+?\}\);\s*\}\s*else\s*\{'
$replaceE = "} else {"

if ($patternE.IsMatch($content)) {
    $content = $patternE.Replace($content, $replaceE, 1)
    Write-Host "Change E replaced successfully."
} else {
    Write-Host "Change E NOT found."
}

# Restore CRLF
$content = $content.Replace("`n", "`r`n")

# Write back
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
Write-Host "Finished processing."

