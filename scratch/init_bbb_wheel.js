        function initBBBStyleWheel(sec, bbbCategorias) {
            if (!sec) return;
            const rueda = sec.querySelector(".rueda-giro");
            const cajaText = sec.querySelector(".text-box");
            const galletaFija = sec.querySelector(".galleta-fija");
            const radialWrapper = sec.querySelector(".radial-wrapper");
            const cajaBg = sec.querySelector(".bg-layer");
            const cajaBgOverlay = sec.querySelector(".bg-layer-overlay");
            if (!rueda || !cajaText || !radialWrapper) return;

            const defaultImgSrc = galletaFija ? galletaFija.getAttribute("src") : "../BBB.png";
            const defaultImgAlt = galletaFija ? galletaFija.alt : "BombÃ³n Bloom";
            const defaultNeutralHTML = cajaText.innerHTML;

            let activeBgUrl = '../piel negra.jpg';
            let bgTransitionTimer = null;

            function updateTextTheme(bgUrl) {
                if (!cajaText) return;
                const isMobile = window.innerWidth <= 768;
                if (!isMobile) {
                    cajaText.setAttribute('data-header-theme', 'dark');
                    return;
                }
                const isLightBg = bgUrl && bgUrl.indexOf('amazona') !== -1;
                cajaText.setAttribute('data-header-theme', isLightBg ? 'dark' : 'light');
            }

            updateTextTheme(activeBgUrl);

            function transitionBg(newBgUrl) {
                updateTextTheme(newBgUrl);
                if (!newBgUrl) newBgUrl = '../piel negra.jpg';
                if (!cajaBg) return;

                if (!cajaBgOverlay) {
                    cajaBg.style.backgroundImage = 'url("' + newBgUrl + '")';
                    return;
                }

                if (bgTransitionTimer) {
                    clearTimeout(bgTransitionTimer);
                    bgTransitionTimer = null;
                    if (cajaBgOverlay.style.backgroundImage) {
                        cajaBg.style.backgroundImage = cajaBgOverlay.style.backgroundImage;
                    }
                }

                const currentBg = cajaBg.style.backgroundImage || '';
                if (activeBgUrl === newBgUrl && (cajaBgOverlay.style.opacity === '0' || !cajaBgOverlay.style.opacity)) {
                    return;
                }

                activeBgUrl = newBgUrl;
                cajaBgOverlay.style.transition = 'none';
                cajaBgOverlay.style.opacity = '0';
                cajaBgOverlay.style.backgroundImage = 'url("' + newBgUrl + '")';

                void cajaBgOverlay.offsetHeight;

                cajaBgOverlay.style.transition = 'opacity 0.85s cubic-bezier(0.25, 1, 0.5, 1)';
                cajaBgOverlay.style.opacity = '1';

                bgTransitionTimer = setTimeout(() => {
                    cajaBg.style.backgroundImage = 'url("' + newBgUrl + '")';
                    activeBgUrl = newBgUrl;
                cajaBgOverlay.style.transition = 'none';
                    cajaBgOverlay.style.opacity = '0';
                    bgTransitionTimer = null;
                }, 870);
            }
            const btnVolver = document.getElementById('btnVolver');
            if (!rueda || !cajaText || !radialWrapper) return;

            // =====================================================================
            // DETECCION DINAMICA DE LIMITES DE IMAGEN Y AJUSTE DE RADIO DE LA RUEDA
            // Detecta automaticamente los limites y tamano de la imagen central.
            // Cuando la imagen es mas pequena (como el Bombon Bloom frente a la Doxa),
            // acorta automaticamente las lineas y coloca los activos 100px mas cerca
            // del centro de la misma, cinendolos a su contorno.
            // =====================================================================
            function getImageRadiusOffset() {
                if (!galletaFija) return 100; // Por defecto para BBB

                // 1. Deteccion por archivo de imagen o producto (BBB vs Doxa)
                const src = (galletaFija.currentSrc || galletaFija.getAttribute('src') || '').toLowerCase();
                const isBBB = src.includes('bbb') || src.includes('bomb');
                const isDoxa = src.includes('galle') || src.includes('doxa');

                // 2. Deteccion por limites reales y dimensiones del elemento
                const baseDiametro = 340; // Tamano de referencia de la caja (Doxa estandar)
                const rect = galletaFija.getBoundingClientRect();
                const renderedSize = Math.min(rect.width || baseDiametro, rect.height || baseDiametro);

                let offset = 0;
                if (isBBB) {
                    // En BBB, la masa del bombon mide ~216px de ancho frente a los ~340px de la Doxa.
                    // Acorta las lineas exactamente 100px para acercar los activos al contorno.
                    offset = 100;
                } else if (!isDoxa && renderedSize < baseDiametro) {
                    // Para cualquier otra imagen mas pequena detectada por sus limites:
                    offset = Math.max(0, (baseDiametro - renderedSize) / 2);
                }

                // En movil (<= 768px), escalar proporcionalmente el acortamiento (~50px)
                if (window.innerWidth <= 768) {
                    offset = Math.round(offset * 0.5);
                }

                return offset;
            }

            const getRadioCategorias = () => {
                const isMobile = window.innerWidth <= 768;
                const base = isMobile ? 205 : 255;
                return base - getImageRadiusOffset();
            };
            let rotacionActual = 0;
            let selectedCategoryIndex = -1;
            let selectedSubIndex = -1;
            let childrenVisible = false;
            let isDraggingWheel = false;
            let wasDragging = false;

            function calculateMobileArcOpacity(degPantalla) {
                if (degPantalla < 8 || degPantalla > 172) return 0;
                return 1;
            }

            function getMobileParentAngle(idx) {
                // Reordenacion para evitar solapamientos (Regla -> 78 deg, Articulaciones -> 142 deg, Piel -> 162 deg, Menopausia -> 122 deg, Stop-loss Mujer -> 102 deg)
                // Indice 0: BBB Piel, Pelo & Unas (162 deg - extremo izquierdo superior)
                // Indice 1: BBB Stop-loss Mujer (102 deg - centro-izquierdo inferior)
                // Indice 2: BBB Menopausia (122 deg - lado izquierdo inferior)
                // Indice 3: BBB Regla (78 deg - centro-derecho inferior)
                // Indice 4: BBB Pre-entreno (18 deg - extremo derecho superior)
                // Indice 5: BBB Relajacion (38 deg - lado derecho medio)
                // Indice 6: BBB Stop-loss Hombre (58 deg - lado derecho inferior)
                // Indice 7: BBB Articulaciones (142 deg - lado izquierdo medio)
                const angles = [162, 102, 122, 78, 18, 38, 58, 142];
                return angles[idx];
            }

            function getMobileParentRadius(idx) {
                // Radios armonizados por posicion angular:
                // Extremos 18 y 162 deg -> 145px
                // Medios 38 y 142 deg -> 150px
                // Bajos 58 y 122 deg -> 158px
                // Centro 78 y 102 deg -> 172px
                // Indice 0 (162 deg): 145px
                // Indice 1 (102 deg): 172px
                // Indice 2 (122 deg): 158px
                // Indice 3 (78 deg): 172px
                // Indice 4 (18 deg): 145px
                // Indice 5 (38 deg): 150px
                // Indice 6 (58 deg): 158px
                // Indice 7 (142 deg): 150px
                const radii = [145, 172, 158, 172, 145, 150, 158, 150];
                return radii[idx];
            }

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

            function updateMobileArcVisibility(tempRot) {
                if (window.innerWidth > 768) return;
                const isNeutral = (selectedCategoryIndex === -1);
                rueda.querySelectorAll('.nodo-activo').forEach(nodo => {
                    const idx = parseInt(nodo.dataset.index);
                    const grPadre = getGradosPadre(idx);
                    let sDeg = ((grPadre + tempRot) % 360 + 360) % 360;
                    const line = rueda.querySelector(`.ray-line[data-index="${idx}"]`);
                    const isSel = (idx === selectedCategoryIndex);
                    if (isNeutral) {
                        const op = calculateMobileArcOpacity(sDeg);
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

            function alignToWheelSection() {
                const rect = sec.getBoundingClientRect();
                if (Math.abs(rect.top) > 4) {
                    window.scrollTo({ top: window.pageYOffset + rect.top, behavior: 'smooth' });
                }
            }

            let cajaTextTimeout = null;
            function transitionCajaText(newHTML) {
                if (cajaText.innerHTML.trim() === newHTML.trim()) return;
                if (cajaTextTimeout) clearTimeout(cajaTextTimeout);
                cajaText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                cajaText.style.opacity = '0';
                cajaText.style.transform = 'translateY(6px)';
                cajaTextTimeout = setTimeout(() => {
                    cajaText.innerHTML = newHTML;
                    cajaText.style.transition = 'opacity 0.6s cubic-bezier(0.2, 1, 0.25, 1), transform 0.6s cubic-bezier(0.2, 1, 0.25, 1)';
                    cajaText.style.opacity = '1';
                    cajaText.style.transform = 'translateY(0)';
                }, 250);
            }

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

            function formatSubActivoName(name) {
                if (!name) return '';
                const words = name.split(' ').map(w => {
                    if (/^q10$/i.test(w)) return "Q10";
                    if (/^b12$/i.test(w)) return "B12";
                    if (/^d3$/i.test(w)) return "D3";
                    if (/^k2$/i.test(w)) return "K2";
                    if (/^c$/i.test(w)) return "C";
                    if (/^ii$/i.test(w)) return "II";
                    if (/^msm$/i.test(w)) return "MSM";
                    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
                });
                if (words.length > 2) {
                    return '<span style="display:block; white-space:nowrap;">' + words.slice(0, 2).join(' ') + '</span><span style="display:block; white-space:nowrap; margin-top:2px;">' + words.slice(2).join(' ') + '</span>';
                } else if (words.length === 2) {
                    return '<span style="display:block; white-space:nowrap;">' + words[0] + '</span><span style="display:block; white-space:nowrap; margin-top:2px;">' + words[1] + '</span>';
                }
                return '<span style="display:block; white-space:nowrap;">' + words.join(' ') + '</span>';
            }

            function updateCategoryText(index) {
                if (index < 0 || index >= bbbCategorias.length) return;
                const a = bbbCategorias[index];
                const newHTML = `
                        <div class="tagline" style="font-family:'Lexend',sans-serif;font-size:10.5px;font-weight:300;letter-spacing:2.5px;text-transform:uppercase;color:rgba(0,0,0,0.45);margin-bottom:8px;display:block;">${a.tagline || 'BOMBÓN BLOOM'}</div>
                        <h3 class="variety-title" style="margin-bottom: 20px; line-height: 1.2;">${a.title || a.n}</h3>
                        ${a.neg ? `<p class="hero-value-prop-neg">${a.neg}</p>` : ''}
                        <div class="hero-value-prop">${a.prop || ''}</div>
                    `;
                transitionCajaText(newHTML);
            }

            function selectCategory(index, initial = false, fromSubmenu = false) {
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

                if (a && a.bg) {
                    transitionBg(a.bg);
                }



                updateCategoryText(index);

                const anguloPaso = 360 / bbbCategorias.length;

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
                    if (fromSubmenu) {
                        // Al pinchar desde el submenú superior: rotar suavemente hacia el cuadrante superior derecho (-30°)
                        // Así la categoría queda arriba en el lado derecho y los 6 activos por debajo rellenando el espacio hacia el texto
                        const targetRot = 60 - index * anguloPaso;
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
                        // Al pinchar directamente en la rueda: comportamiento orgánico Doxa
                        // Se abre allí donde se haya pinchado la categoría, con un suave giro brisa reactivo
                        if (!initial) {
                            const grados = index * anguloPaso - 90;
                            const angulo = grados * (Math.PI / 180);
                            const x = Math.cos(angulo) * getRadioCategorias();
                            const giroBrisa = x > 0 ? -15 : 15;
                            rotacionActual += giroBrisa;
                            const rotDur = 1.35;
                            rueda.style.transition = `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1)`;
                            rueda.style.transform = `rotate(${rotacionActual}deg)`;

                            rueda.querySelectorAll('.nodo-texto').forEach(t => {
                                t.style.transition = `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1), color 0.4s ease, text-shadow 0.4s ease`;
                                t.style.transform = `rotate(${-rotacionActual}deg)`;
                            });
                            rueda.querySelectorAll('.sub-activo-link').forEach(t => {
                                t.style.transition = `transform ${rotDur}s cubic-bezier(0.25, 1, 0.5, 1), color 0.45s ease, text-shadow 0.45s ease`;
                                t.style.transform = `rotate(${-rotacionActual}deg)`;
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

            if (galletaFija) {
                galletaFija.style.cursor = 'pointer';
                galletaFija.onpointerdown = (e) => {
                    e.stopPropagation();
                };
                galletaFija.ontouchstart = (e) => {
                    e.stopPropagation();
                };
                galletaFija.onclick = (e) => {
                    e.stopPropagation();
                    alignToWheelSection();
                    resetToNeutral();
                };
                galletaFija.addEventListener('load', () => {
                    renderRueda();
                });
            }



            function renderRueda() {
                const isMobile = window.innerWidth <= 768;
                if (radialWrapper) {
                    radialWrapper.classList.toggle('inner-fan-mode', isWheelCutByMargin());
                }
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
                    const gradosPadre = getGradosPadre(i);
                    const anguloPadre = gradosPadre * (Math.PI / 180);
                    const isSelected = (i === selectedCategoryIndex);
                    const isNeutral = (selectedCategoryIndex === -1);

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
                    let nodo = rueda.querySelector(`.nodo-activo[data-index="${i}"]`);
                    if (!nodo) {
                        nodo = document.createElement('div');
                        nodo.className = 'nodo-activo';
                        nodo.dataset.index = i;
                        nodo.style.position = 'absolute';
                        nodo.style.left = `calc(50% + ${x}px)`;
                        nodo.style.top = `calc(50% + ${y}px)`;
                        nodo.style.transition = 'left 1.1s cubic-bezier(0.25, 1, 0.5, 1), top 1.1s cubic-bezier(0.25, 1, 0.5, 1), scale 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease';

                        nodo.innerHTML = `<span class="nodo-texto" style="display:inline-flex; flex-direction:column; align-items:center; text-align:center; line-height:1.2; font-size:${isMobile ? '9.5px' : '10.5px'}; letter-spacing: 0.8px; text-transform: uppercase;">${formatCategoryName(a.n)}</span>`;

                        rueda.appendChild(nodo);
                    }

                    nodo.onclick = (e) => {
                        if (e) e.stopPropagation();
                        if (wasDragging || isDraggingWheel) return;
                        alignToWheelSection();
                        if (selectedCategoryIndex === -1) {
                            selectCategory(i, false, false);
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

                    nodo.style.left = `calc(50% + ${x}px)`;
                    nodo.style.top = `calc(50% + ${y}px)`;

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

                    const textSpan = nodo.querySelector('.nodo-texto');
                    textSpan.style.fontWeight = isSelected ? '600' : '300';
                    textSpan.style.color = isSelected ? '#fff' : (isNeutral ? '#fff' : 'rgba(255, 255, 255, 0.65)');
                    textSpan.style.fontSize = isMobile ? '9.5px' : '10.5px';
                    textSpan.style.textShadow = isSelected ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none';
                    textSpan.style.transform = `rotate(${-rotacionActual}deg)`;

                    // 3. Renderizar activos hijas (subActivos) bajo la categoría seleccionada
                    if (isSelected && a.subActivos && childrenVisible) {
                        const subCount = a.subActivos.length;

                        if (isMobile) {
                            // En móvil: arco inferior visible con separación escalonada alterna
                            const baseOffset = 28;
                            const stepOffset = 24;
                            a.subActivos.forEach((sub, idx) => {
                                const offsetActual = baseOffset + idx * stepOffset;
                                const gradosSub = gradosPadre - offsetActual;
                                const anguloSub = gradosSub * (Math.PI / 180);
                                const subRadio = (idx % 2 === 0) ? 148 : 168;
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
                                subLine.style.width = `${subRadio}px`;
                                subLine.style.height = '1px';
                                subLine.style.background = isSubSelected
                                    ? 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.25) 42%, rgba(193, 155, 118, 0.95) 95%, transparent 100%)'
                                    : 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.12) 42%, rgba(193, 155, 118, 0.6) 95%, transparent 100%)';
                                subLine.style.transformOrigin = '0 50%';
                                subLine.style.transform = `rotate(${gradosSub}deg)`;
                                subLine.style.zIndex = '5';
                                subLine.style.pointerEvents = 'none';
                                subLine.style.opacity = '0';
                                subLine.style.transition = 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), background 0.4s ease';
                                rueda.appendChild(subLine);

                                // Nodo del subactivo
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
                                        <span class="sub-activo-link" style="display:inline-flex; flex-direction:column; align-items:center; text-align:center; line-height:1.2; font-size:9.5px; font-weight:${isSubSelected ? '600' : '400'}; color:${isSubSelected || noSubSelected ? '#fff' : 'rgba(255, 255, 255, 0.65)'}; letter-spacing: 0.6px; text-transform: none; pointer-events:none; transition: transform 1.25s cubic-bezier(0.25, 1, 0.5, 1), color 0.4s ease, text-shadow 0.4s ease; text-shadow: ${isSubSelected ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none'};">
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

                                rueda.appendChild(nodoSub);

                                setTimeout(() => {
                                    subLine.style.opacity = isSubSelected ? '0.85' : (noSubSelected ? '0.45' : '0.2');
                                    nodoSub.style.opacity = isSubSelected ? '1' : (noSubSelected ? '1' : '0.45');
                                    nodoSub.style.scale = isSubSelected ? '1.08' : (noSubSelected ? '1' : '0.9');
                                }, 150 + idx * 70);
                            });
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
                                subLine.style.width = `${subRadio}px`;
                                subLine.style.height = '1px';
                                subLine.style.background = isSubSelected
                                    ? 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.25) 42%, rgba(193, 155, 118, 0.95) 95%, transparent 100%)'
                                    : 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.12) 42%, rgba(193, 155, 118, 0.6) 95%, transparent 100%)';
                                subLine.style.transformOrigin = '0 50%';
                                subLine.style.transform = `rotate(${gradosSub}deg)`;
                                subLine.style.zIndex = '5';
                                subLine.style.pointerEvents = 'none';
                                subLine.style.opacity = '0';
                                subLine.style.transition = 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), background 0.4s ease';
                                rueda.appendChild(subLine);

                                // Nodo del subactivo
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

                        const daughterHTML = `
                                <div class="tagline" style="font-family:'Lexend',sans-serif;font-size:10.5px;font-weight:300;letter-spacing:2.5px;text-transform:uppercase;color:rgba(0,0,0,0.45);margin-bottom:8px;display:block;">${a.title || a.n}</div>
                                <h3 class="variety-title" style="margin-bottom: 14px; line-height: 1.25;">${subData.title || subData.n}</h3>
                                ${subData.neg ? `<p class="hero-value-prop-neg">${subData.neg}</p>` : ''}
                                <div class="hero-value-prop">${subData.prop || ''}</div>
                            `;
                        transitionCajaText(daughterHTML);
                    }
                }
            }

            // Control de arrastre unificado y frenada suave con inercia orgÃ¡nica (Estilo Doxa)
            let activePointerId = null;
            let pointerStartX = 0;
            let pointerStartY = 0;
            let lastPointerAngle = 0;
            let lastPointerTime = 0;
            let angularVelocity = 0;
            let inertiaRaf = null;

            function getCenter() {
                const rect = radialWrapper.getBoundingClientRect();
                return {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                };
            }

            radialWrapper.addEventListener('pointerdown', (e) => {
                if (e.pointerType === 'mouse' && e.button !== 0) return;

                if (inertiaRaf) {
                    cancelAnimationFrame(inertiaRaf);
                    inertiaRaf = null;
                }

                activePointerId = e.pointerId;
                pointerStartX = e.clientX;
                pointerStartY = e.clientY;
                const center = getCenter();
                lastPointerAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x) * (180 / Math.PI);
                angularVelocity = 0;
                lastPointerTime = performance.now();
                isDraggingWheel = false;
            });

            window.addEventListener('pointermove', (e) => {
                if (activePointerId === null || e.pointerId !== activePointerId) return;

                const center = getCenter();
                const currentAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x) * (180 / Math.PI);
                let deltaAngle = currentAngle - lastPointerAngle;
                if (deltaAngle > 180) deltaAngle -= 360;
                if (deltaAngle < -180) deltaAngle += 360;

                const totalDist = Math.hypot(e.clientX - pointerStartX, e.clientY - pointerStartY);

                if (!isDraggingWheel) {
                    if (totalDist > 8) {
                        isDraggingWheel = true;
                        wasDragging = true;
                        radialWrapper.style.cursor = 'grabbing';
                        try {
                            radialWrapper.setPointerCapture(activePointerId);
                        } catch (err) { }
                    }
                }

                if (isDraggingWheel) {
                    if (e.cancelable) e.preventDefault();

                    const now = performance.now();
                    const dt = Math.max(1, now - lastPointerTime);
                    angularVelocity = (deltaAngle / dt) * 0.65 + angularVelocity * 0.35;
                    lastPointerTime = now;
                    lastPointerAngle = currentAngle;

                    rotacionActual += deltaAngle;
                    rueda.style.transition = 'none';
                    rueda.style.transform = `rotate(${rotacionActual}deg)`;

                    rueda.querySelectorAll('.nodo-texto, .sub-activo-link').forEach(t => {
                        t.style.transition = 'none';
                        t.style.transform = `rotate(${-rotacionActual}deg)`;
                    });

                    if (window.innerWidth <= 768) {
                        updateMobileArcVisibility(rotacionActual);
                    } else if (isWheelCutByMargin()) {
                        updateFanArcVisibility(rotacionActual);
                    }
                }
            }, { passive: false });

            const handlePointerEnd = (e) => {
                if (activePointerId === null || e.pointerId !== activePointerId) return;
                activePointerId = null;
                radialWrapper.style.cursor = 'grab';

                try {
                    if (radialWrapper.hasPointerCapture(e.pointerId)) {
                        radialWrapper.releasePointerCapture(e.pointerId);
                    }
                } catch (err) { }

                if (isDraggingWheel) {
                    isDraggingWheel = false;

                    const now = performance.now();
                    if (now - lastPointerTime > 140) {
                        angularVelocity = 0;
                    }

                    // Desaceleracion suave con inercia identica a Doxa
                    const decay = 0.96;
                    function applyInertia() {
                        if (Math.abs(angularVelocity) > 0.0008) {
                            rotacionActual += angularVelocity * 16;
                            if (Math.abs(angularVelocity) > 0.04) {
                                angularVelocity *= decay;
                            } else {
                                angularVelocity *= 0.935;
                            }
                            rueda.style.transition = 'none';
                            rueda.style.transform = `rotate(${rotacionActual}deg)`;

                            rueda.querySelectorAll('.nodo-texto, .sub-activo-link').forEach(t => {
                                t.style.transition = 'none';
                                t.style.transform = `rotate(${-rotacionActual}deg)`;
                            });

                            if (window.innerWidth <= 768) {
                                updateMobileArcVisibility(rotacionActual);
                            } else if (isWheelCutByMargin()) {
                                updateFanArcVisibility(rotacionActual);
                            }
                            inertiaRaf = requestAnimationFrame(applyInertia);
                        } else {
                            if (inertiaRaf) {
                                cancelAnimationFrame(inertiaRaf);
                                inertiaRaf = null;
                            }
                            setTimeout(() => {
                                wasDragging = false;
                            }, 180);
                        }
                    }

                    if (Math.abs(angularVelocity) > 0.008) {
                        applyInertia();
                    } else {
                        setTimeout(() => {
                            wasDragging = false;
                        }, 180);
                    }
                } else {
                    isDraggingWheel = false;
                    wasDragging = false;
                }
            };

            window.addEventListener('pointerup', handlePointerEnd);
            window.addEventListener('pointercancel', handlePointerEnd);

            let lastIsMobile = window.innerWidth <= 768;
            let lastIsCut = isWheelCutByMargin();
            window.addEventListener('resize', () => {
                const currIsMobile = window.innerWidth <= 768;
                const currIsCut = isWheelCutByMargin();
                if (currIsMobile !== lastIsMobile || currIsCut !== lastIsCut) {
                    lastIsMobile = currIsMobile;
                    lastIsCut = currIsCut;
                    if (selectedCategoryIndex !== -1) {
                        selectCategory(selectedCategoryIndex, true, false);
                    } else {
                        resetToNeutral();
                    }
                }
            });

            resetToNeutral();

            return {
                resetToNeutral: resetToNeutral,
                render: renderRueda
            };
        }
