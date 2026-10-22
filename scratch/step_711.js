const fs = require('fs');

const targetFile = 'c:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\bombonbloom\\index.html';
let content = fs.readFileSync(targetFile, 'utf8');

// Ensure galleta-fija has z-index: 35 in CSS
content = content.replace(
    /\.galleta-fija\s*\{([^}]+)\}/,
    (match, p1) => {
        let updated = p1;
        if (!/z-index\s*:\s*35/.test(updated)) {
            updated = updated.replace(/z-index\s*:\s*\d+;?/, 'z-index: 35;');
        }
        return `.galleta-fija {${updated}}`;
    }
);

// Find the target block from `function selectCategory(index, initial = false)` to `window.bbbSelectCategory = function(index)`
const startMarker = "                function selectCategory(index, initial = false) {";
const endMarker = "                window.bbbSelectCategory = function(index) {";

const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error("Start marker not found!");
    process.exit(1);
}

const endIndex = content.indexOf(endMarker, startIndex);
if (endIndex === -1) {
    console.error("End marker not found!");
    process.exit(1);
}

// Find the end of `window.bbbSelectCategory` block
const fullEndIndex = content.indexOf("};", endIndex) + 2;

const replacement = `                function selectCategory(index, initial = false, fromSubmenu = false) {
                    selectedCategoryIndex = index;
                    selectedSubIndex = -1;
                    childrenVisible = true;
                    const a = bbbCategorias[index];
                    const isMobile = window.innerWidth <= 768;

                    // 1. Cambio dinámico de la foto central del bombón
                    if (galletaFija && a.img) {
                        galletaFija.style.transition = 'opacity 0.25s ease, transform 0.3s ease';
                        galletaFija.style.opacity = '0';
                        setTimeout(() => {
                            galletaFija.src = a.img;
                            galletaFija.alt = a.title;
                            galletaFija.style.opacity = '1';
                        }, 220);
                    }

                    if (btnVolver) {
                        btnVolver.style.display = 'block';
                    }

                    updateCategoryText(index);

                    const anguloPaso = 360 / bbbCategorias.length;

                    if (isMobile) {
                        // En móvil: la categoría seleccionada se ubica en el arco inferior visible
                        const targetRot = 212 - index * anguloPaso;
                        let diff = (targetRot - rotacionActual) % 360;
                        if (diff > 180) diff -= 360;
                        if (diff < -180) diff += 360;
                        rotacionActual += diff;

                        const rotDur = initial ? 0 : Math.min(2.4, Math.max(1.8, 1.6 + Math.abs(diff) * 0.0035));
                        rueda.style.transition = initial ? 'none' : \`transform \${rotDur}s cubic-bezier(0.16, 1, 0.3, 1)\`;
                        rueda.style.transform = \`rotate(\${rotacionActual}deg)\`;

                        rueda.querySelectorAll('.nodo-texto').forEach(t => {
                            t.style.transition = initial ? 'none' : \`transform \${rotDur}s cubic-bezier(0.16, 1, 0.3, 1), color 0.5s ease\`;
                            t.style.transform = \`rotate(\${-rotacionActual}deg)\`;
                        });
                        rueda.querySelectorAll('.sub-activo-link').forEach(t => {
                            t.style.transition = initial ? 'none' : \`transform \${rotDur}s cubic-bezier(0.16, 1, 0.3, 1), color 0.45s ease\`;
                            t.style.transform = \`rotate(\${-rotacionActual}deg)\`;
                        });
                    } else {
                        // En PC / Tablet:
                        if (fromSubmenu) {
                            // Al pinchar desde el submenú superior: rotar suavemente hacia el cuadrante superior derecho (-30°)
                            // Así la categoría queda arriba en el lado derecho y los 6 activos por debajo rellenando el espacio hacia el texto
                            const targetRot = 60 - index * anguloPaso;
                            let diff = (targetRot - rotacionActual) % 360;
                            if (diff > 180) diff -= 360;
                            if (diff < -180) diff += 360;
                            rotacionActual += diff;

                            const rotDur = initial ? 0 : Math.min(2.5, Math.max(1.8, 1.6 + Math.abs(diff) * 0.0035));
                            rueda.style.transition = initial ? 'none' : \`transform \${rotDur}s cubic-bezier(0.16, 1, 0.3, 1)\`;
                            rueda.style.transform = \`rotate(\${rotacionActual}deg)\`;

                            rueda.querySelectorAll('.nodo-texto').forEach(t => {
                                t.style.transition = initial ? 'none' : \`transform \${rotDur}s cubic-bezier(0.16, 1, 0.3, 1), color 0.5s ease\`;
                                t.style.transform = \`rotate(\${-rotacionActual}deg)\`;
                            });
                            rueda.querySelectorAll('.sub-activo-link').forEach(t => {
                                t.style.transition = initial ? 'none' : \`transform \${rotDur}s cubic-bezier(0.16, 1, 0.3, 1), color 0.45s ease\`;
                                t.style.transform = \`rotate(\${-rotacionActual}deg)\`;
                            });
                        } else {
                            // Al pinchar directamente en la rueda: comportamiento orgánico Doxa
                            // Se abre allí donde se haya pinchado la categoría, con un suave giro brisa reactivo
                            if (!initial) {
                                const grados = index * anguloPaso - 90;
                                const angulo = grados * (Math.PI / 180);
                                const x = Math.cos(angulo) * getRadioCategorias();
                                const giroBrisa = x > 0 ? -12 : 12;
                                rotacionActual += giroBrisa;
                                const rotDur = 1.2;
                                rueda.style.transition = \`transform \${rotDur}s cubic-bezier(0.16, 1, 0.3, 1)\`;
                                rueda.style.transform = \`rotate(\${rotacionActual}deg)\`;

                                rueda.querySelectorAll('.nodo-texto').forEach(t => {
                                    t.style.transition = \`transform \${rotDur}s cubic-bezier(0.16, 1, 0.3, 1), color 0.5s ease\`;
                                    t.style.transform = \`rotate(\${-rotacionActual}deg)\`;
                                });
                                rueda.querySelectorAll('.sub-activo-link').forEach(t => {
                                    t.style.transition = \`transform \${rotDur}s cubic-bezier(0.16, 1, 0.3, 1), color 0.45s ease\`;
                                    t.style.transform = \`rotate(\${-rotacionActual}deg)\`;
                                });
                            }
                        }
                    }

                    renderRueda();
                }

                function resetToNeutral() {
                    selectedCategoryIndex = -1;
                    selectedSubIndex = -1;
                    childrenVisible = false;

                    if (btnVolver) {
                        btnVolver.style.display = 'none';
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

                    const neutralHTML = \`
                        <div class="tagline" style="font-family:'Lexend',sans-serif;font-size:10.5px;font-weight:300;letter-spacing:2.5px;text-transform:uppercase;color:rgba(0,0,0,0.45);margin-bottom:8px;display:block;">BOMBÓN BLOOM</div>
                        <h3 class="variety-title" style="margin-bottom: 25px; line-height: 1.2;">Arquitectura de Activos</h3>
                        <p class="hero-value-prop-neg">Repostería Nutricosmética</p>
                        <div class="hero-value-prop">
                            Haz clic en cualquiera de las 7 variedades de Bombón Bloom para explorar su formulación activa y beneficios clave.
                        </div>
                    \`;
                    transitionCajaText(neutralHTML);
                    renderRueda();
                }

                if (galletaFija) {
                    galletaFija.onpointerdown = (e) => {
                        e.stopPropagation();
                    };
                    galletaFija.onclick = (e) => {
                        e.stopPropagation();
                        alignToWheelSection();
                        resetToNeutral();
                    };
                }

                if (btnVolver) {
                    btnVolver.onclick = (e) => {
                        e.stopPropagation();
                        resetToNeutral();
                    };
                }

                function renderRueda() {
                    const isMobile = window.innerWidth <= 768;
                    const radioCategorias = getRadioCategorias();

                    // Limpieza suave de activos hijos anteriores
                    const oldSubs = rueda.querySelectorAll('.nodo-subactivo:not(.fading-out), .sub-ray-line:not(.fading-out)');
                    oldSubs.forEach(el => {
                        el.classList.add('fading-out');
                        el.style.pointerEvents = 'none';
                        el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                        el.style.opacity = '0';
                        setTimeout(() => el.remove(), 360);
                    });

                    const anguloPaso = 360 / bbbCategorias.length;

                    // Ángulo actual en pantalla de la categoría seleccionada (normalizado a [-180, 180))
                    const selGradosPadre = selectedCategoryIndex !== -1 ? (selectedCategoryIndex * anguloPaso - 90) : 0;
                    let selNormPantalla = 0;
                    if (selectedCategoryIndex !== -1) {
                        selNormPantalla = (selGradosPadre + rotacionActual) % 360;
                        if (selNormPantalla < -180) selNormPantalla += 360;
                        if (selNormPantalla >= 180) selNormPantalla -= 360;
                    }

                    bbbCategorias.forEach((a, i) => {
                        const gradosPadre = i * anguloPaso - 90;
                        const anguloPadre = gradosPadre * (Math.PI / 180);
                        const isSelected = (i === selectedCategoryIndex);
                        const isNeutral = (selectedCategoryIndex === -1);

                        let actualParentRadio = radioCategorias;
                        if (isSelected) {
                            actualParentRadio = isMobile ? 180 : (radioCategorias + 25);
                        }

                        // Línea rayo de la categoría padre
                        let line = rueda.querySelector(\`.ray-line[data-index="\${i}"]\`);
                        if (!line) {
                            line = document.createElement('div');
                            line.className = 'ray-line';
                            line.dataset.index = i;
                            line.style.position = 'absolute';
                            line.style.top = 'calc(50% - 0.5px)';
                            line.style.left = '50%';
                            line.style.height = '1px';
                            line.style.transformOrigin = '0 50%';
                            line.style.transform = \`rotate(\${gradosPadre}deg)\`;
                            line.style.zIndex = '0';
                            line.style.pointerEvents = 'none';
                            line.style.transition = 'width 0.75s ease, background 0.5s ease, opacity 0.6s ease';
                            rueda.appendChild(line);
                        }

                        line.style.width = \`\${actualParentRadio}px\`;
                        if (isSelected) {
                            line.style.background = 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.25) 42%, rgba(193, 155, 118, 0.95) 95%, transparent 100%)';
                            line.style.opacity = childrenVisible ? '0' : '1';
                        } else {
                            line.style.background = 'linear-gradient(90deg, transparent 55%, rgba(255, 255, 255, 0.05) 58%, rgba(255, 255, 255, 0.15) 95%, transparent 100%)';
                            line.style.opacity = isNeutral ? '0.75' : '0';
                        }

                        const x = Math.cos(anguloPadre) * actualParentRadio;
                        const y = Math.sin(anguloPadre) * actualParentRadio;

                        // Nodo de la categoría padre
                        let nodo = rueda.querySelector(\`.nodo-activo[data-index="\${i}"]\`);
                        if (!nodo) {
                            nodo = document.createElement('div');
                            nodo.className = 'nodo-activo';
                            nodo.dataset.index = i;
                            nodo.style.position = 'absolute';
                            nodo.style.left = \`calc(50% + \${x}px)\`;
                            nodo.style.top = \`calc(50% + \${y}px)\`;
                            nodo.style.transition = 'left 1.1s cubic-bezier(0.16, 1, 0.3, 1), top 1.1s cubic-bezier(0.16, 1, 0.3, 1), scale 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease';

                            nodo.innerHTML = \`<span class="nodo-texto" style="display:inline-flex; flex-direction:column; align-items:center; text-align:center; line-height:1.2; font-size:\${isMobile ? '9.5px' : '10.5px'}; letter-spacing: 0.8px; text-transform: uppercase;">\${formatCategoryName(a.n)}</span>\`;

                            rueda.appendChild(nodo);
                        }

                        nodo.onclick = () => {
                            if (wasDragging || isDraggingWheel) return;
                            alignToWheelSection();
                            if (i !== selectedCategoryIndex) {
                                selectCategory(i, false, false); // Direct click on wheel
                            } else {
                                resetToNeutral();
                            }
                        };

                        nodo.onmouseenter = () => {
                            if (isDraggingWheel || isMobile || (!isNeutral && !isSelected)) return;
                            nodo.style.opacity = '1';
                            nodo.style.scale = '1.08';
                            nodo.style.zIndex = '50';
                            if (line) line.style.opacity = '0.9';
                            const textEl = nodo.querySelector('.nodo-texto');
                            if (textEl) {
                                textEl.style.color = '#fff';
                                textEl.style.textShadow = '0 0 14px rgba(255, 255, 255, 0.95)';
                            }
                        };

                        nodo.onmouseleave = () => {
                            if (isDraggingWheel || isMobile) return;
                            nodo.style.zIndex = isSelected ? '35' : '30';
                            nodo.style.scale = isSelected ? '1.08' : (isNeutral ? '1' : '0.88');
                            nodo.style.opacity = isNeutral ? '1' : (isSelected ? '1' : '0');
                            nodo.style.pointerEvents = isNeutral || isSelected ? 'auto' : 'none';
                            const textEl = nodo.querySelector('.nodo-texto');
                            if (textEl) {
                                textEl.style.color = isSelected ? '#fff' : (isNeutral ? '#fff' : 'rgba(255, 255, 255, 0.65)');
                                textEl.style.textShadow = isSelected ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none';
                            }
                        };

                        nodo.style.left = \`calc(50% + \${x}px)\`;
                        nodo.style.top = \`calc(50% + \${y}px)\`;
                        nodo.style.opacity = isNeutral ? '1' : (isSelected ? '1' : '0');
                        nodo.style.pointerEvents = isNeutral || isSelected ? 'auto' : 'none';
                        nodo.style.scale = isNeutral ? '1' : (isSelected ? '1.08' : '0.88');

                        const textSpan = nodo.querySelector('.nodo-texto');
                        textSpan.style.fontWeight = isSelected ? '600' : '300';
                        textSpan.style.color = isSelected ? '#fff' : (isNeutral ? '#fff' : 'rgba(255, 255, 255, 0.65)');
                        textSpan.style.fontSize = isMobile ? '9.5px' : '10.5px';
                        textSpan.style.textShadow = isSelected ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none';
                        textSpan.style.transform = \`rotate(\${-rotacionActual}deg)\`;

                        // 3. Renderizar activos hijas (subActivos) bajo la categoría seleccionada
                        if (isSelected && a.subActivos && childrenVisible) {
                            const subCount = a.subActivos.length;

                            if (isMobile) {
                                // En móvil: arco inferior visible
                                const subRadio = 175;
                                const baseOffset = 18;
                                const stepOffset = 18;
                                a.subActivos.forEach((sub, idx) => {
                                    const offsetActual = baseOffset + idx * stepOffset;
                                    const gradosSub = gradosPadre - offsetActual;
                                    const anguloSub = gradosSub * (Math.PI / 180);
                                    const xSub = Math.cos(anguloSub) * subRadio;
                                    const ySub = Math.sin(anguloSub) * subRadio;

                                    const isSubSelected = (selectedSubIndex === idx);
                                    const noSubSelected = (selectedSubIndex === -1);

                                    // Rayo del subactivo
                                    const subLine = document.createElement('div');
                                    subLine.className = 'sub-ray-line';
                                    subLine.dataset.subIndex = idx;
                                    subLine.style.position = 'absolute';
                                    subLine.style.top = 'calc(50% - 0.5px)';
                                    subLine.style.left = '50%';
                                    subLine.style.width = \`\${subRadio}px\`;
                                    subLine.style.height = '1px';
                                    subLine.style.background = isSubSelected
                                        ? 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.25) 42%, rgba(193, 155, 118, 0.95) 95%, transparent 100%)'
                                        : 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.12) 42%, rgba(193, 155, 118, 0.6) 95%, transparent 100%)';
                                    subLine.style.transformOrigin = '0 50%';
                                    subLine.style.transform = \`rotate(\${gradosSub}deg)\`;
                                    subLine.style.zIndex = '5';
                                    subLine.style.pointerEvents = 'none';
                                    subLine.style.opacity = '0';
                                    subLine.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease';
                                    rueda.appendChild(subLine);

                                    // Nodo del subactivo
                                    const nodoSub = document.createElement('div');
                                    nodoSub.className = 'nodo-subactivo';
                                    nodoSub.dataset.subIndex = idx;
                                    nodoSub.style.position = 'absolute';
                                    nodoSub.style.left = \`calc(50% + \${xSub}px)\`;
                                    nodoSub.style.top = \`calc(50% + \${ySub}px)\`;
                                    nodoSub.style.opacity = '0';
                                    nodoSub.style.scale = isSubSelected ? '1.08' : (noSubSelected ? '1' : '0.9');
                                    nodoSub.style.zIndex = isSubSelected ? '65' : '55';
                                    nodoSub.style.cursor = 'pointer';
                                    nodoSub.style.touchAction = 'manipulation';
                                    nodoSub.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), scale 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)';

                                    nodoSub.innerHTML = \`
                                        <span class="sub-activo-link" style="display:inline-flex; flex-direction:column; align-items:center; text-align:center; line-height:1.2; font-size:9.5px; font-weight:\${isSubSelected ? '600' : '400'}; color:\${isSubSelected || noSubSelected ? '#fff' : 'rgba(255, 255, 255, 0.65)'}; letter-spacing: 0.6px; text-transform: none; pointer-events:none; transition: transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease, text-shadow 0.4s ease; text-shadow: \${isSubSelected ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none'};">
                                            \${formatSubActivoName(sub.n)}
                                        </span>
                                    \`;

                                    const textSpanSub = nodoSub.querySelector('.sub-activo-link');
                                    textSpanSub.style.transform = \`rotate(\${-rotacionActual}deg)\`;

                                    nodoSub.onclick = (e) => {
                                        e.stopPropagation();
                                        if (wasDragging || isDraggingWheel) return;
                                        alignToWheelSection();
                                        handleSubClick(i, idx, sub);
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
                                // Los activos se despliegan según dónde se encuentre la categoría seleccionada
                                const isLeftSide = Math.abs(selNormPantalla) > 90;
                                const isUpperHalf = selNormPantalla < 0;

                                // En el lado derecho (entre -90° y +90°):
                                // Si está en la mitad superior (-90° a 0°): signo = 1 (desciende hacia abajo por el lado derecho).
                                // La categoría padre queda ARRIBA y los 6 activos POR DEBAJO rellenando el espacio hacia la caja de texto.
                                // Si está en la mitad inferior (0° a 90°): signo = -1 (asciende hacia el centro horizontal para mantenerse en el lado derecho).
                                let signo = !isLeftSide ? (isUpperHalf ? 1 : -1) : (isUpperHalf ? -1 : 1);

                                const subRadio = radioCategorias + 26; // 281px
                                const baseOffset = 15;
                                const stepOffset = 13.5;

                                a.subActivos.forEach((sub, idx) => {
                                    const offsetActual = baseOffset + idx * stepOffset;
                                    const gradosSub = gradosPadre + offsetActual * signo;
                                    const anguloSub = gradosSub * (Math.PI / 180);
                                    const xSub = Math.cos(anguloSub) * subRadio;
                                    const ySub = Math.sin(anguloSub) * subRadio;

                                    const isSubSelected = (selectedSubIndex === idx);
                                    const noSubSelected = (selectedSubIndex === -1);

                                    // Rayo del subactivo
                                    const subLine = document.createElement('div');
                                    subLine.className = 'sub-ray-line';
                                    subLine.dataset.subIndex = idx;
                                    subLine.style.position = 'absolute';
                                    subLine.style.top = 'calc(50% - 0.5px)';
                                    subLine.style.left = '50%';
                                    subLine.style.width = \`\${subRadio}px\`;
                                    subLine.style.height = '1px';
                                    subLine.style.background = isSubSelected
                                        ? 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.25) 42%, rgba(193, 155, 118, 0.95) 95%, transparent 100%)'
                                        : 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.12) 42%, rgba(193, 155, 118, 0.6) 95%, transparent 100%)';
                                    subLine.style.transformOrigin = '0 50%';
                                    subLine.style.transform = \`rotate(\${gradosSub}deg)\`;
                                    subLine.style.zIndex = '5';
                                    subLine.style.pointerEvents = 'none';
                                    subLine.style.opacity = '0';
                                    subLine.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease';
                                    rueda.appendChild(subLine);

                                    // Nodo del subactivo
                                    const nodoSub = document.createElement('div');
                                    nodoSub.className = 'nodo-subactivo';
                                    nodoSub.dataset.subIndex = idx;
                                    nodoSub.style.position = 'absolute';
                                    nodoSub.style.left = \`calc(50% + \${xSub}px)\`;
                                    nodoSub.style.top = \`calc(50% + \${ySub}px)\`;
                                    nodoSub.style.opacity = '0';
                                    nodoSub.style.scale = isSubSelected ? '1.08' : (noSubSelected ? '1' : '0.9');
                                    nodoSub.style.zIndex = isSubSelected ? '65' : '55';
                                    nodoSub.style.cursor = 'pointer';
                                    nodoSub.style.touchAction = 'manipulation';
                                    nodoSub.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), scale 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)';

                                    nodoSub.innerHTML = \`
                                        <span class="sub-activo-link" style="display:inline-flex; flex-direction:column; align-items:center; text-align:center; line-height:1.2; font-size:10.5px; font-weight:\${isSubSelected ? '600' : '400'}; color:\${isSubSelected || noSubSelected ? '#fff' : 'rgba(255, 255, 255, 0.65)'}; letter-spacing: 0.6px; text-transform: none; pointer-events:none; transition: transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease, text-shadow 0.4s ease; text-shadow: \${isSubSelected ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none'};">
                                            \${formatSubActivoName(sub.n)}
                                        </span>
                                    \`;

                                    const textSpanSub = nodoSub.querySelector('.sub-activo-link');
                                    textSpanSub.style.transform = \`rotate(\${-rotacionActual}deg)\`;

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
                                        if (subLine) subLine.style.opacity = isNowSelected ? '0.85' : (noSubSelected ? '0.45' : '0.2');
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
                            }
                        }
                    });

                    function handleSubClick(catIndex, subIdx, subData) {
                        const a = bbbCategorias[catIndex];
                        if (selectedSubIndex === subIdx) {
                            selectedSubIndex = -1;
                            updateCategoryText(catIndex);
                            rueda.querySelectorAll('.nodo-subactivo:not(.fading-out)').forEach(ns => {
                                ns.style.scale = '1';
                                ns.style.opacity = '1';
                                ns.style.zIndex = '55';
                                const textSub = ns.querySelector('.sub-activo-link');
                                if (textSub) {
                                    textSub.style.color = '#fff';
                                    textSub.style.textShadow = 'none';
                                }
                            });
                            rueda.querySelectorAll('.sub-ray-line:not(.fading-out)').forEach(sl => {
                                sl.style.opacity = '0.45';
                            });
                        } else {
                            selectedSubIndex = subIdx;
                            rueda.querySelectorAll('.nodo-subactivo:not(.fading-out)').forEach(ns => {
                                const sIdx = parseInt(ns.dataset.subIndex);
                                const isNow = (sIdx === selectedSubIndex);
                                ns.style.scale = isNow ? '1.08' : '0.9';
                                ns.style.opacity = isNow ? '1' : '0.45';
                                ns.style.zIndex = isNow ? '65' : '55';
                                const textSub = ns.querySelector('.sub-activo-link');
                                if (textSub) {
                                    textSub.style.color = isNow ? '#fff' : 'rgba(255, 255, 255, 0.65)';
                                    textSub.style.textShadow = isNow ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none';
                                }
                            });
                            rueda.querySelectorAll('.sub-ray-line:not(.fading-out)').forEach(sl => {
                                const sIdx = parseInt(sl.dataset.subIndex);
                                const isNow = (sIdx === selectedSubIndex);
                                sl.style.opacity = isNow ? '0.85' : '0.2';
                            });

                            const daughterHTML = \`
                                <div class="tagline" style="font-family:'Lexend',sans-serif;font-size:10.5px;font-weight:300;letter-spacing:2.5px;text-transform:uppercase;color:rgba(0,0,0,0.45);margin-bottom:8px;display:block;">\${a.title || a.n}</div>
                                <h3 class="variety-title" style="margin-bottom: 14px; line-height: 1.25;">\${subData.title || subData.n}</h3>
                                \${subData.neg ? \`<p class="hero-value-prop-neg">\${subData.neg}</p>\` : ''}
                                <div class="hero-value-prop">\${subData.prop || ''}</div>
                            \`;
                            transitionCajaText(daughterHTML);
                        }
                    }
                }

                // Arrastre y Giro (Pointer Events)
                let startAngle = 0;
                let startRot = 0;
                let lastPointerAngle = 0;
                let lastPointerTime = 0;
                let angularVelocity = 0;

                function getPointerAngle(e) {
                    const rect = radialWrapper.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    return Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
                }

                radialWrapper.onpointerdown = (e) => {
                    if (e.target.closest('.nodo-activo') || e.target.closest('.nodo-subactivo') || e.target.closest('.galleta-fija')) return;
                    alignToWheelSection();
                    isDraggingWheel = true;
                    wasDragging = false;
                    startAngle = getPointerAngle(e);
                    lastPointerAngle = startAngle;
                    lastPointerTime = performance.now();
                    startRot = rotacionActual;
                    angularVelocity = 0;
                    rueda.style.transition = 'none';
                    rueda.querySelectorAll('.nodo-texto, .sub-activo-link').forEach(t => {
                        t.style.transition = 'none';
                    });
                    try { radialWrapper.setPointerCapture(e.pointerId); } catch(err) {}
                };

                radialWrapper.onpointermove = (e) => {
                    if (!isDraggingWheel) return;
                    const currentAngle = getPointerAngle(e);
                    const now = performance.now();
                    let deltaAngle = currentAngle - lastPointerAngle;
                    if (deltaAngle > 180) deltaAngle -= 360;
                    if (deltaAngle < -180) deltaAngle += 360;

                    const dt = Math.max(1, now - lastPointerTime);
                    angularVelocity = (deltaAngle / dt) * 16.6;
                    lastPointerAngle = currentAngle;
                    lastPointerTime = now;

                    let totalDelta = currentAngle - startAngle;
                    if (totalDelta > 180) totalDelta -= 360;
                    if (totalDelta < -180) totalDelta += 360;

                    if (Math.abs(totalDelta) > 3) {
                        wasDragging = true;
                    }

                    rotacionActual = startRot + totalDelta;
                    rueda.style.transform = \`rotate(\${rotacionActual}deg)\`;
                    rueda.querySelectorAll('.nodo-texto, .sub-activo-link').forEach(t => {
                        t.style.transform = \`rotate(\${-rotacionActual}deg)\`;
                    });
                };

                const handlePointerEnd = () => {
                    if (isDraggingWheel) {
                        isDraggingWheel = false;
                        // Permitir descanso orgánico donde se haya soltado la rueda (estilo Doxa)
                        setTimeout(() => {
                            wasDragging = false;
                        }, 180);
                    } else {
                        wasDragging = false;
                    }
                };

                window.addEventListener('pointerup', handlePointerEnd);
                window.addEventListener('pointercancel', handlePointerEnd);

                let lastIsMobile = window.innerWidth <= 768;
                window.addEventListener('resize', () => {
                    const currIsMobile = window.innerWidth <= 768;
                    if (currIsMobile !== lastIsMobile) {
                        lastIsMobile = currIsMobile;
                        if (selectedCategoryIndex !== -1) {
                            selectCategory(selectedCategoryIndex, true, false);
                        } else {
                            resetToNeutral();
                        }
                    }
                });

                resetToNeutral();

                // Exponer globalmente para el submenú superior
                window.bbbSelectCategory = function(index) {
                    alignToWheelSection();
                    selectCategory(index, false, true); // fromSubmenu = true -> cuadrante superior derecho
                };`;

content = content.slice(0, startIndex) + replacement + content.slice(fullEndIndex);
fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully updated bombonbloom/index.html with Doxa organic opening, right-side placement for PC, and central bombón reset!');
