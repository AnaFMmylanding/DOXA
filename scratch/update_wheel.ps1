$filePath = "bombonbloom/index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Normalize all line endings in content and targets to LF
$content = $content.Replace("`r`n", "`n")

function Do-Replace([string]$content, [string]$target, [string]$replace, [string]$label) {
    $t = $target.Replace("`r`n", "`n").Trim()
    $r = $replace.Replace("`r`n", "`n").Trim()
    if ($content.Contains($t)) {
        $newContent = $content.Replace($t, $r)
        Write-Host "$label replaced successfully."
        return $newContent
    } else {
        Write-Host "$label NOT found."
        return $content
    }
}

# 1. Update getRadioCategorias
$target1 = @"
            const getRadioCategorias = () => {
                const isMobile = window.innerWidth <= 768;
                const base = isMobile ? 205 : 255;
                return base - getImageRadiusOffset();
            };
"@

$replace1 = @"
            const getRadioCategorias = () => (window.innerWidth <= 768 ? 155 : 250);
"@

$content = Do-Replace $content $target1 $replace1 "Target 1"

# 2. Update isWheelCutByMargin, getDesktopFanAngle, getDesktopFanRadius, getGradosPadre, updateFanArcVisibility
$target2 = @"
            // Deteccion dinamica de si la rueda se corta con el margen izquierdo de la ventana
            function isWheelCutByMargin() {
                if (window.innerWidth <= 768) return false;
                const rect = radialWrapper.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const offset = getImageRadiusOffset();
                const marginThreshold = 390 - offset;
                const leftThreshold = Math.max(40, 100 - offset * 0.6);
                return (centerX < marginThreshold) || (rect.left < leftThreshold);
            }

            function getDesktopFanAngle(idx) {
                const total = bbbCategorias.length;
                const step = 130 / (total - 1);
                return -65 + idx * step;
            }

            function getDesktopFanRadius(idx) {
                // Longitud de lineas aumentada en 30px para las categorias padre
                // evitando que queden apretadas en la vista neutral
                const parentOffset = Math.max(0, getImageRadiusOffset() - 30);
                const fanRadii = [250, 280, 248, 280, 248, 280, 248, 280];
                return Math.max(120, fanRadii[idx % fanRadii.length] - parentOffset);
            }

            function getGradosPadre(idx) {
                if (window.innerWidth <= 768) {
                    return getMobileParentAngle(idx);
                }
                if (isWheelCutByMargin()) {
                    return getDesktopFanAngle(idx);
                }
                const anguloPaso = 360 / bbbCategorias.length;
                return idx * anguloPaso - 90;
            }

            function updateFanArcVisibility(tempRot) {
                const isNeutral = (selectedCategoryIndex === -1);
                rueda.querySelectorAll('.nodo-activo').forEach(nodo => {
                    const idx = parseInt(nodo.dataset.index);
                    const grPadre = getGradosPadre(idx);
                    let sDeg = (grPadre + tempRot) % 360;
                    if (sDeg < -180) sDeg += 360;
                    if (sDeg >= 180) sDeg -= 360;

                    const line = rueda.querySelector(`.ray-line[data-index="${idx}"]`);
                    const isSel = (idx === selectedCategoryIndex);

                    if (isNeutral) {
                        const distFromRight = Math.abs(sDeg);
                        if (distFromRight > 85) {
                            nodo.style.opacity = '0';
                            nodo.style.pointerEvents = 'none';
                            if (line) line.style.opacity = '0';
                        } else {
                            const op = distFromRight > 70 ? (85 - distFromRight) / 15 : 1;
                            nodo.style.opacity = String(op);
                            nodo.style.scale = '1';
                            nodo.style.pointerEvents = 'auto';
                            if (line) line.style.opacity = String(op * 0.75);
                        }
                    } else if (isSel) {
                        nodo.style.opacity = '1';
                        nodo.style.scale = '1.08';
                        nodo.style.pointerEvents = 'auto';
                        if (line) line.style.opacity = childrenVisible ? '0' : '0.85';
                    } else {
                        nodo.style.opacity = '0';
                        nodo.style.pointerEvents = 'none';
                        if (line) line.style.opacity = '0';
                    }
                });
            }
"@

$replace2 = @"
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

$content = Do-Replace $content $target2 $replace2 "Target 2"

# 3. Update formatCategoryName
$target3 = @"
            function formatCategoryName(name) {
                let clean = name.replace(/^BBB\s+/i, '');
                const words = clean.split(' ');
                if (words.length > 2) {
                    return '<span style="display:block; font-size:8.5px; opacity:0.8; letter-spacing:2px; margin-bottom:2px;">BBB</span><span style="display:block; white-space:nowrap;">' + words.slice(0, 2).join(' ') + '</span><span style="display:block; white-space:nowrap; margin-top:2px;">' + words.slice(2).join(' ') + '</span>';
                } else if (words.length === 2) {
                    return '<span style="display:block; font-size:8.5px; opacity:0.8; letter-spacing:2px; margin-bottom:2px;">BBB</span><span style="display:block; white-space:nowrap;">' + words[0] + '</span><span style="display:block; white-space:nowrap; margin-top:2px;">' + words[1] + '</span>';
                }
                return '<span style="display:block; font-size:8.5px; opacity:0.8; letter-spacing:2px; margin-bottom:2px;">BBB</span><span style="display:block; white-space:nowrap;">' + clean + '</span>';
            }
"@

$replace3 = @"
            function formatCategoryName(name) {
                let prefix = '';
                let clean = name;
                const m = name.match(/^([A-Za-zÁÉÍÓÚáéíóúÑñ]+)\s+(.+)$/);
                if (m && ['BBB', 'LINGOTE', 'OBLEA', 'PEQUEBLOOM'].includes(m[1].toUpperCase())) {
                    prefix = m[1].toUpperCase();
                    clean = m[2];
                } else if (/^BBB\s+/i.test(name)) {
                    prefix = 'BBB';
                    clean = name.replace(/^BBB\s+/i, '');
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

$content = Do-Replace $content $target3 $replace3 "Target 3"

# 4. Update selectCategory desktop branch
$target4 = @"
                if (isMobile) {
                    // En móvil: la categoría seleccionada se ubica en el cuadrante inferior izquierdo visible (145°)
                    const targetRot = 145 - getGradosPadre(index);
                    let diff = (targetRot - rotacionActual) % 360;
                    if (diff > 180) diff -= 360;
                    if (diff < -180) diff += 360;
                    rotacionActual += diff;

                    const rotDur = initial ? 0 : Math.min(1.65, Math.max(1.35, 1.25 + Math.abs(diff) * 0.0035));
                    rueda.style.transition = initial ? 'none' : `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1)`;
                    rueda.style.transform = `rotate(${rotacionActual}deg)`;

                    rueda.querySelectorAll('.nodo-texto').forEach(t => {
                        t.style.transition = initial ? 'none' : `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1), color 0.5s ease`;
                        t.style.transform = `rotate(${-rotacionActual}deg)`;
                    });
                    rueda.querySelectorAll('.sub-activo-link').forEach(t => {
                        t.style.transition = initial ? 'none' : `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1), color 0.45s ease, text-shadow 0.45s ease`;
                        t.style.transform = `rotate(${-rotacionActual}deg)`;
                    });
                } else if (isWheelCutByMargin()) {
                    // En modo Abanico Interior (PC con corte por margen):
                    // La categoria seleccionada se ubica en el vertice superior del abanico (-65 deg)
                    // y sus 6 activos descienden a lo largo del interior hacia el texto (ver sugerencia)
                    const targetRot = -65 - getDesktopFanAngle(index);
                    let diff = (targetRot - rotacionActual) % 360;
                    if (diff > 180) diff -= 360;
                    if (diff < -180) diff += 360;
                    rotacionActual += diff;

                    const rotDur = initial ? 0 : Math.min(1.65, Math.max(1.35, 1.25 + Math.abs(diff) * 0.0035));
                    rueda.style.transition = initial ? 'none' : `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1)`;
                    rueda.style.transform = `rotate(${rotacionActual}deg)`;

                    rueda.querySelectorAll('.nodo-texto').forEach(t => {
                        t.style.transition = initial ? 'none' : `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1), color 0.4s ease, text-shadow 0.4s ease`;
                        t.style.transform = `rotate(${-rotacionActual}deg)`;
                    });
                    rueda.querySelectorAll('.sub-activo-link').forEach(t => {
                        t.style.transition = initial ? 'none' : `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1), color 0.45s ease, text-shadow 0.45s ease`;
                        t.style.transform = `rotate(${-rotacionActual}deg)`;
                    });
                } else {
                    // En PC / Tablet estandar (Modo 360 sin corte de ventana):
"@

$replace4 = @"
                if (isMobile) {
                    // En móvil: la categoría seleccionada se ubica en el cuadrante inferior izquierdo visible (145°)
                    const targetRot = 145 - getGradosPadre(index);
                    let diff = (targetRot - rotacionActual) % 360;
                    if (diff > 180) diff -= 360;
                    if (diff < -180) diff += 360;
                    rotacionActual += diff;

                    const rotDur = initial ? 0 : Math.min(1.65, Math.max(1.35, 1.25 + Math.abs(diff) * 0.0035));
                    rueda.style.transition = initial ? 'none' : `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1)`;
                    rueda.style.transform = `rotate(${rotacionActual}deg)`;

                    rueda.querySelectorAll('.nodo-texto').forEach(t => {
                        t.style.transition = initial ? 'none' : `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1), color 0.5s ease`;
                        t.style.transform = `rotate(${-rotacionActual}deg)`;
                    });
                    rueda.querySelectorAll('.sub-activo-link').forEach(t => {
                        t.style.transition = initial ? 'none' : `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1), color 0.45s ease, text-shadow 0.45s ease`;
                        t.style.transform = `rotate(${-rotacionActual}deg)`;
                    });
                } else {
                    // En PC / Tablet (Modo 360 completo):
"@

$content = Do-Replace $content $target4 $replace4 "Target 4"

# 5. Update resetToNeutral
$target5 = @"
            function resetToNeutral() {
                selectedCategoryIndex = -1;
                selectedSubIndex = -1;
                childrenVisible = false;



                if (window.innerWidth <= 768 || isWheelCutByMargin()) {
                    rotacionActual = 0;
                    rueda.style.transition = 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)';
                    rueda.style.transform = 'rotate(0deg)';
                    rueda.querySelectorAll('.nodo-texto').forEach(t => {
                        t.style.transition = 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1), color 0.5s ease';
                        t.style.transform = 'rotate(0deg)';
                    });
                }

                // Resetear la foto central a BBB.png
                if (galletaFija) {
                    galletaFija.style.transition = 'opacity 0.25s ease, transform 0.3s ease';
                    galletaFija.style.opacity = '0';
                    setTimeout(() => {
                        galletaFija.src = '../BBB.png';
                        galletaFija.alt = 'Bombón Bloom';
                        galletaFija.style.opacity = '1';
                    }, 220);
                }

                // Resetear el fondo a neutral con desvanecimiento suave
                transitionBg('../piel negra.jpg');

                const neutralHTML = `
                        <div class="tagline" style="font-family:'Lexend',sans-serif;font-size:10.5px;font-weight:300;letter-spacing:2.5px;text-transform:uppercase;color:rgba(0,0,0,0.45);margin-bottom:8px;display:block;">BOMBÓN BLOOM</div>
                        <h3 class="variety-title" style="margin-bottom: 25px; line-height: 1.2;">Arquitectura de Activos</h3>
                        <p class="hero-value-prop-neg">Repostería Nutricosmética</p>
                        <div class="hero-value-prop">
                            Haz clic en cualquiera de las 8 variedades de Bombón Bloom para explorar su formulación activa y beneficios clave.
                        </div>
                    `;
                transitionCajaText(neutralHTML);
                renderRueda();
            }
"@

$replace5 = @"
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

$content = Do-Replace $content $target5 $replace5 "Target 5"

# 6. Update renderRueda: actualParentRadio and line updates
$target6 = @"
                    // Radios intercalados en zigzag (+30px longitud de lineas para que las categorias padre no queden apretadas)
                    const parentOffset = Math.max(0, getImageRadiusOffset() - 30);
                    const baseDesktopRadii = [240, 282, 240, 282, 240, 282, 240, 282];
                    const desktopRadii = baseDesktopRadii.map(r => Math.max(120, r - parentOffset));
                    let actualParentRadio;
                    if (isSelected) {
                        actualParentRadio = isMobile ? 150 : (radioCategorias + 25);
                    } else {
                        if (isMobile) {
                            actualParentRadio = getMobileParentRadius(i);
                        } else if (isWheelCutByMargin()) {
                            actualParentRadio = getDesktopFanRadius(i);
                        } else {
                            actualParentRadio = desktopRadii[i % desktopRadii.length];
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
                        line.style.transform = `rotate(${gradosPadre}deg)`;
                        line.style.zIndex = '0';
                        line.style.pointerEvents = 'none';
                        line.style.transition = 'width 0.75s ease, background 0.5s ease, opacity 0.6s ease';
                        rueda.appendChild(line);
                    }

                    line.style.width = `${actualParentRadio}px`;
"@

$replace6 = @"
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

$content = Do-Replace $content $target6 $replace6 "Target 6"

# 7. Update opacity logic in renderRueda
$target7 = @"
                    if (isMobile) {
                        let degPantalla = ((gradosPadre + rotacionActual) % 360 + 360) % 360;
                        if (isNeutral) {
                            const op = calculateMobileArcOpacity(degPantalla);
                            if (op <= 0) {
                                nodo.style.opacity = '0';
                                nodo.style.pointerEvents = 'none';
                                if (line) line.style.opacity = '0';
                            } else {
                                nodo.style.opacity = String(op);
                                nodo.style.scale = '1';
                                nodo.style.pointerEvents = 'auto';
                                if (line) line.style.opacity = String(op * 0.45);
                            }
                        } else if (isSelected) {
                            nodo.style.opacity = '1';
                            nodo.style.scale = '1.08';
                            nodo.style.pointerEvents = 'auto';
                            if (line) line.style.opacity = childrenVisible ? '0' : '0.85';
                        } else {
                            nodo.style.opacity = '0';
                            nodo.style.pointerEvents = 'none';
                            if (line) line.style.opacity = '0';
                        }
                    } else if (isWheelCutByMargin()) {
                        let sDeg = (gradosPadre + rotacionActual) % 360;
                        if (sDeg < -180) sDeg += 360;
                        if (sDeg >= 180) sDeg -= 360;

                        if (isNeutral) {
                            const distFromRight = Math.abs(sDeg);
                            if (distFromRight > 85) {
                                nodo.style.opacity = '0';
                                nodo.style.pointerEvents = 'none';
                                if (line) line.style.opacity = '0';
                            } else {
                                const op = distFromRight > 70 ? (85 - distFromRight) / 15 : 1;
                                nodo.style.opacity = String(op);
                                nodo.style.scale = '1';
                                nodo.style.pointerEvents = 'auto';
                                if (line) line.style.opacity = String(op * 0.75);
                            }
                        } else if (isSelected) {
                            nodo.style.opacity = '1';
                            nodo.style.scale = '1.08';
                            nodo.style.pointerEvents = 'auto';
                            if (line) line.style.opacity = childrenVisible ? '0' : '0.85';
                        } else {
                            nodo.style.opacity = '0';
                            nodo.style.pointerEvents = 'none';
                            if (line) line.style.opacity = '0';
                        }
                    } else {
                        nodo.style.opacity = isNeutral ? '1' : (isSelected ? '1' : '0');
                        nodo.style.pointerEvents = isNeutral || isSelected ? 'auto' : 'none';
                        nodo.style.scale = isNeutral ? '1' : (isSelected ? '1.08' : '0.88');
                    }
"@

$replace7 = @"
                    if (isMobile) {
                        let degPantalla = ((gradosPadre + rotacionActual) % 360 + 360) % 360;
                        if (isNeutral) {
                            const op = calculateMobileArcOpacity(degPantalla);
                            if (op <= 0) {
                                nodo.style.opacity = '0';
                                nodo.style.pointerEvents = 'none';
                                if (line) line.style.opacity = '0';
                            } else {
                                nodo.style.opacity = String(op);
                                nodo.style.scale = '1';
                                nodo.style.pointerEvents = 'auto';
                                if (line) line.style.opacity = String(op * 0.45);
                            }
                        } else if (isSelected) {
                            nodo.style.opacity = '1';
                            nodo.style.scale = '1.08';
                            nodo.style.pointerEvents = 'auto';
                            if (line) line.style.opacity = childrenVisible ? '0' : '0.85';
                        } else {
                            nodo.style.opacity = '0';
                            nodo.style.pointerEvents = 'none';
                            if (line) line.style.opacity = '0';
                        }
                    } else {
                        // Desktop: TODAS LAS 8 CATEGORÍAS COMPLETAMENTE VISIBLES EN VISTA NEUTRAL
                        nodo.style.opacity = isNeutral ? '1' : (isSelected ? '1' : '0');
                        nodo.style.pointerEvents = isNeutral || isSelected ? 'auto' : 'none';
                        nodo.style.scale = isNeutral ? '1' : (isSelected ? '1.08' : '0.88');
                        if (line) {
                            line.style.opacity = isNeutral ? '0.75' : (isSelected ? (childrenVisible ? '0' : '0.85') : '0');
                        }
                    }
"@

$content = Do-Replace $content $target7 $replace7 "Target 7"

# 8. Remove the isWheelCutByMargin branch in subActivos deployment
$target8 = @"
                        } else if (isWheelCutByMargin()) {
                            // MODO ABANICO INTERIOR (SUGERENCIA DEL USUARIO):
                            // Los 6 activos hijos se despliegan en abanico descendente a la derecha de la madre
                            const subRadio = radioCategorias + 26; // ~281px
                            const fanStep = 130 / 6; // 21.67 deg

                            a.subActivos.forEach((sub, idx) => {
                                const gradosSubPantalla = -65 + (idx + 1) * fanStep;
                                const gradosSubLocal = gradosSubPantalla - rotacionActual;
                                const anguloSub = gradosSubLocal * (Math.PI / 180);

                                const xSub = Math.cos(anguloSub) * subRadio;
                                const ySub = Math.sin(anguloSub) * subRadio;

                                const isSubSelected = (selectedSubIndex === idx);
                                const noSubSelected = (selectedSubIndex === -1);

                                const subLine = document.createElement('div');
                                subLine.className = 'sub-ray-line';
                                subLine.dataset.subIndex = idx;
                                subLine.style.position = 'absolute';
                                subLine.style.top = 'calc(50% - 0.5px)';
                                subLine.style.left = '50%';
                                subLine.style.width = `${subRadio}px`;
                                subLine.style.height = '1px';
                                subLine.style.background = isSubSelected
                                    ? 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.25) 42%, rgba(193, 155, 118, 0.95) 95%, transparent 100%)'
                                    : 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.12) 42%, rgba(193, 155, 118, 0.6) 95%, transparent 100%)';
                                subLine.style.transformOrigin = '0 50%';
                                subLine.style.transform = `rotate(${gradosSubLocal}deg)`;
                                subLine.style.zIndex = '5';
                                subLine.style.pointerEvents = 'none';
                                subLine.style.opacity = '0';
                                subLine.style.transition = 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), background 0.4s ease';
                                rueda.appendChild(subLine);

                                const nodoSub = document.createElement('div');
                                nodoSub.className = 'nodo-subactivo';
                                nodoSub.dataset.subIndex = idx;
                                nodoSub.style.position = 'absolute';
                                nodoSub.style.left = `calc(50% + ${xSub}px)`;
                                nodoSub.style.top = `calc(50% + ${ySub}px)`;
                                nodoSub.style.opacity = '0';
                                nodoSub.style.scale = isSubSelected ? '1.08' : (noSubSelected ? '1' : '0.9');
                                nodoSub.style.zIndex = isSubSelected ? '65' : '55';
                                nodoSub.style.cursor = 'pointer';
                                nodoSub.style.touchAction = 'manipulation';
                                nodoSub.style.transition = 'opacity 0.85s cubic-bezier(0.25, 1, 0.5, 1), scale 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 1.1s cubic-bezier(0.25, 1, 0.5, 1)';

                                nodoSub.innerHTML = `
                                        <span class="sub-activo-link" style="display:inline-flex; flex-direction:column; align-items:center; text-align:center; line-height:1.2; font-size:10.5px; font-weight:${isSubSelected ? '600' : '400'}; color:${isSubSelected || noSubSelected ? '#fff' : 'rgba(255, 255, 255, 0.65)'}; letter-spacing: 0.6px; text-transform: none; pointer-events:none; transition: transform 1.25s cubic-bezier(0.25, 1, 0.5, 1), color 0.4s ease, text-shadow 0.4s ease; text-shadow: ${isSubSelected ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none'};">
                                            ${formatSubActivoName(sub.n)}
                                        </span>
                                    `;

                                const textSpanSub = nodoSub.querySelector('.sub-activo-link');
                                textSpanSub.style.transform = `rotate(${-rotacionActual}deg)`;

                                nodoSub.onclick = (e) => {
                                    e.stopPropagation();
                                    if (wasDragging || isDraggingWheel) return;
                                    alignToWheelSection();
                                    handleSubClick(i, idx, sub);
                                };

                                nodoSub.onmouseenter = () => {
                                    if (isDraggingWheel || isMobile) return;
                                    nodoSub.style.scale = '1.08';
                                    nodoSub.style.opacity = '1';
                                    nodoSub.style.zIndex = '65';
                                    if (subLine) subLine.style.opacity = '0.9';
                                    const textSub = nodoSub.querySelector('.sub-activo-link');
                                    if (textSub) {
                                        textSub.style.color = '#fff';
                                        textSub.style.textShadow = '0 0 14px rgba(255, 255, 255, 0.95)';
                                    }
                                };

                                nodoSub.onmouseleave = () => {
                                    if (isDraggingWheel || isMobile) return;
                                    const isNowSelected = (selectedSubIndex === idx);
                                    const noSubSelected = (selectedSubIndex === -1);
                                    nodoSub.style.scale = isNowSelected ? '1.08' : (noSubSelected ? '1' : '0.9');
                                    nodoSub.style.opacity = isNowSelected ? '1' : (noSubSelected ? '1' : '0.45');
                                    nodoSub.style.zIndex = isNowSelected ? '65' : '55';
                                    if (subLine) {
                                        subLine.style.opacity = isNowSelected ? '0.85' : (noSubSelected ? '0.45' : '0.2');
                                    }
                                    const textSub = nodoSub.querySelector('.sub-activo-link');
                                    if (textSub) {
                                        textSub.style.color = isNowSelected ? '#fff' : (noSubSelected ? '#fff' : 'rgba(255, 255, 255, 0.65)');
                                        textSub.style.textShadow = isNowSelected ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none';
                                    }
                                };

                                rueda.appendChild(nodoSub);

                                setTimeout(() => {
                                    subLine.style.opacity = isSubSelected ? '0.85' : (noSubSelected ? '0.45' : '0.2');
                                    nodoSub.style.opacity = isSubSelected ? '1' : (noSubSelected ? '1' : '0.45');
                                    nodoSub.style.scale = isSubSelected ? '1.08' : (noSubSelected ? '1' : '0.9');
                                }, 150 + idx * 70);
                            });
                        } else {
                            // En PC / Tablet (Modo Abanico Dinámico Doxa):
"@

$replace8 = @"
                        } else {
                            // En PC / Tablet (Modo Abanico Dinámico 360):
"@

$content = Do-Replace $content $target8 $replace8 "Target 8"

# 9. Update drag and inertia pointer events
$target9 = @"
                    if (window.innerWidth <= 768) {
                        updateMobileArcVisibility(rotacionActual);
                    } else if (isWheelCutByMargin()) {
                        updateFanArcVisibility(rotacionActual);
                    }
"@

$replace9 = @"
                    if (window.innerWidth <= 768) {
                        updateMobileArcVisibility(rotacionActual);
                    }
"@

$content = Do-Replace $content $target9 $replace9 "Target 9"

# Restore CRLF line endings for Windows consistency
$content = $content.Replace("`n", "`r`n")

# Write back with UTF-8 without BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
Write-Host "File successfully written."
