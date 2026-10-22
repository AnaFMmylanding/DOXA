const fs = require('fs');
const { execSync } = require('child_process');

console.log('1. Reading commit 0b97035...');
const original = execSync('git show 0b97035:bombonbloom/index.html').toString('utf8');

const subStart = original.indexOf('<div class="bbb-submenu-bar" id="bbbSubmenuBar">');
const v1Idx = original.indexOf('[VARIEDAD 1] BBB PIEL, PELO & UÑAS');
const subEnd = original.lastIndexOf('<!-- =========================================================================', v1Idx);

const scriptStart = original.lastIndexOf('<script>', original.indexOf('const bbbData1'));
const scriptEnd = original.indexOf('</script>', scriptStart) + '</script>'.length;

console.log({ subStart, subEnd, scriptEnd });

// New Submenu HTML
const newSubmenuHTML = `        <div class="bbb-submenu-bar" id="bbbSubmenuBar">
            <div class="bbb-submenu-container">
                <!-- VARIEDAD 1: BBB Piel,Pelo & Uñas [ESTADO: ON] -->
                <a href="#rueda-activos" class="bbb-submenu-item" id="btn-bbb-1" data-category="0" data-visible="on">
                    <div class="bbb-submenu-thumb">
                        <img src="../BBB 1.png" alt="BBB Piel,Pelo & Uñas" onerror="this.src='../BBB.png'">
                    </div>
                    <span class="bbb-submenu-name">
                        <span class="bbb-brand">BBB</span>
                        <span class="bbb-line">Piel, Pelo</span>
                        <span class="bbb-line">&amp; Uñas</span>
                    </span>
                </a>

                <!-- VARIEDAD 2: BBB Stop-loss Mujer [ESTADO: ON] -->
                <a href="#rueda-activos" class="bbb-submenu-item" id="btn-bbb-2" data-category="1" data-visible="on">
                    <div class="bbb-submenu-thumb">
                        <img src="../BBB 2.png" alt="BBB Stop-loss Mujer" onerror="this.src='../BBB.png'">
                    </div>
                    <span class="bbb-submenu-name">
                        <span class="bbb-brand">BBB</span>
                        <span class="bbb-line">Stop-loss</span>
                        <span class="bbb-line">Mujer</span>
                    </span>
                </a>

                <!-- VARIEDAD 3: BBB Menopausia [ESTADO: ON] -->
                <a href="#rueda-activos" class="bbb-submenu-item" id="btn-bbb-3" data-category="2" data-visible="on">
                    <div class="bbb-submenu-thumb">
                        <img src="../BBB 3.png" alt="BBB Menopausia" onerror="this.src='../BBB.png'">
                    </div>
                    <span class="bbb-submenu-name">
                        <span class="bbb-brand">BBB</span>
                        <span class="bbb-line">Menopausia</span>
                    </span>
                </a>

                <!-- VARIEDAD 4: BBB Regla [ESTADO: ON] -->
                <a href="#rueda-activos" class="bbb-submenu-item" id="btn-bbb-4" data-category="3" data-visible="on">
                    <div class="bbb-submenu-thumb">
                        <img src="../BBB 4.png" alt="BBB Regla" onerror="this.src='../BBB.png'">
                    </div>
                    <span class="bbb-submenu-name">
                        <span class="bbb-brand">BBB</span>
                        <span class="bbb-line">Regla</span>
                    </span>
                </a>

                <!-- VARIEDAD 5: BBB Pre-entreno [ESTADO: ON] -->
                <a href="#rueda-activos" class="bbb-submenu-item" id="btn-bbb-5" data-category="4" data-visible="on">
                    <div class="bbb-submenu-thumb">
                        <img src="../BBB 5.png" alt="BBB Pre-entreno" onerror="this.src='../BBB.png'">
                    </div>
                    <span class="bbb-submenu-name">
                        <span class="bbb-brand">BBB</span>
                        <span class="bbb-line">Pre-entreno</span>
                    </span>
                </a>

                <!-- VARIEDAD 6: BBB Relajación [ESTADO: ON] -->
                <a href="#rueda-activos" class="bbb-submenu-item" id="btn-bbb-6" data-category="5" data-visible="on">
                    <div class="bbb-submenu-thumb">
                        <img src="../BBB 6.png" alt="BBB Relajación" onerror="this.src='../BBB.png'">
                    </div>
                    <span class="bbb-submenu-name">
                        <span class="bbb-brand">BBB</span>
                        <span class="bbb-line">Relajación</span>
                    </span>
                </a>

                <!-- VARIEDAD 7: BBB Stop-loss Hombre [ESTADO: ON] -->
                <a href="#rueda-activos" class="bbb-submenu-item" id="btn-bbb-7" data-category="6" data-visible="on">
                    <div class="bbb-submenu-thumb">
                        <img src="../BBB 7.png" alt="BBB Stop-loss Hombre" onerror="this.src='../BBB.png'">
                    </div>
                    <span class="bbb-submenu-name">
                        <span class="bbb-brand">BBB</span>
                        <span class="bbb-line">Stop-loss</span>
                        <span class="bbb-line">Hombre</span>
                    </span>
                </a>
            </div>
        </div>
`;

// Single Section HTML
const singleSectionHTML = `        <!-- =========================================================================
           [SECCIÓN ÚNICA] RUEDA RADIAL DE ACTIVOS BOMBÓN BLOOM
           Engloba las 7 variedades de bombones como categorías padre.
           Al pinchar en una variedad se abren sus activos hijos y cambia la foto central.
           ========================================================================= -->
        <section id="rueda-activos" class="cajas-activos-section" data-visible="on">
            <!-- [IMAGEN DE FONDO GENERAL DE LA RUEDA DE ACTIVOS]: Cambia la url a continuación -->
            <div class="bg-layer" id="caja-bg" style="background-image: url('../piel negra.jpg');"></div>

            <button class="btn-volver" id="btnVolver">Volver</button>

            <div class="content-grid">
                <!-- Columna Rueda Interactiva -->
                <div class="wheel-column">
                    <div class="radial-wrapper" id="radialWrapper">
                        <img src="../BBB.png" class="galleta-fija" id="galletaFija" alt="Bombón Bloom" onerror="this.src='../Galle choco.png'">
                        <div class="rueda-giro" id="ruedaGiro"></div>
                    </div>
                </div>

                <!-- Columna Texto Dinámico -->
                <div class="text-column">
                    <div class="text-box" id="cajaText">
                        <div class="tagline">BOMBÓN BLOOM</div>
                        <h3 class="variety-title" style="margin-bottom: 25px; line-height: 1.2;">Arquitectura de Activos</h3>
                        <p class="hero-value-prop-neg">Repostería Nutricosmética</p>
                        <div class="hero-value-prop">
                            Haz clic en cualquiera de las 7 variedades de Bombón Bloom para explorar su formulación activa y beneficios clave.
                        </div>
                    </div>
                </div>
            </div>
        </section>`;

// Unified Script
const s560 = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\scratch\\step_560.js', 'utf8');
const scriptStartNorm = s560.indexOf('RUEDA RADIAL UNIFICADA DE BOMBÓN BLOOM');
const fullScriptStart = s560.lastIndexOf('<script>', scriptStartNorm);
const fullScriptEnd = s560.indexOf('</script>', fullScriptStart) + '</script>'.length;
let scriptContent = s560.substring(fullScriptStart, fullScriptEnd);

// Step 711
const s711 = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\scratch\\step_711.js', 'utf8');
const rMarker = 'const replacement = `';
const rStart = s711.indexOf(rMarker) + rMarker.length;
const rEnd = s711.lastIndexOf('`;');
const replacementBlock = s711.substring(rStart, rEnd);

const startMarker = "                function selectCategory(index, initial = false) {";
const endMarker = "                window.bbbSelectCategory = function(index) {";
const uStartIdx = scriptContent.indexOf(startMarker);
const uEndIdx = scriptContent.indexOf("};", scriptContent.indexOf(endMarker, uStartIdx)) + 2;

if (uStartIdx !== -1 && uEndIdx !== -1) {
    scriptContent = scriptContent.substring(0, uStartIdx) + replacementBlock + scriptContent.substring(uEndIdx);
    console.log('Integrated step_711 into script!');
}

// Mobile Arc Opacity calculation
const arcFunc = `                function calculateMobileArcOpacity(degPantalla) {
                    // degPantalla normalizado en rango [0, 360)
                    // Zona visible inferior amplia para rueda intercalada
                    if (degPantalla < 18 || degPantalla > 162) {
                        return 0;
                    }
                    if (degPantalla >= 42 && degPantalla <= 138) {
                        return 1.0;
                    }
                    if (degPantalla < 42) {
                        return Math.max(0, (degPantalla - 18) / 24);
                    }
                    return Math.max(0, (162 - degPantalla) / 24);
                }

`;

scriptContent = scriptContent.replace(
    '                function updateMobileArcVisibility(currentRot) {',
    arcFunc + '                function updateMobileArcVisibility(currentRot) {'
);

const oldVis = `                        if (isNeutral) {
                            if (sDeg < 25 || sDeg > 155) {
                                n.style.opacity = '0';
                                n.style.pointerEvents = 'none';
                                if (l) l.style.opacity = '0';
                            } else {
                                const distFromBottom = Math.abs(sDeg - 90);
                                const arcOpacity = Math.max(0.15, 1 - (distFromBottom / 65));
                                n.style.opacity = String(arcOpacity * 0.95);
                                n.style.scale = '1';
                                n.style.pointerEvents = 'auto';
                                if (l) l.style.opacity = String(arcOpacity * 0.35);
                            }
                        }`;

const newVis = `                        if (isNeutral) {
                            const op = calculateMobileArcOpacity(sDeg);
                            if (op <= 0) {
                                n.style.opacity = '0';
                                n.style.pointerEvents = 'none';
                                if (l) l.style.opacity = '0';
                            } else {
                                n.style.opacity = String(op);
                                n.style.scale = '1';
                                n.style.pointerEvents = 'auto';
                                if (l) l.style.opacity = String(op * 0.45);
                            }
                        }`;

scriptContent = scriptContent.replace(oldVis, newVis);

// Intercalated radii in renderRueda
const oldRadios = `                        let actualParentRadio = radioCategorias;
                        if (isSelected) {
                            actualParentRadio = isMobile ? 180 : (radioCategorias + 25);
                        }`;

const newRadios = `                        // Radios intercalados en zigzag para aprovechar el espacio visual
                        const mobileRadii = [182, 228, 182, 228, 182, 228, 205];
                        const desktopRadii = [240, 282, 240, 282, 240, 282, 260];
                        let actualParentRadio;
                        if (isSelected) {
                            actualParentRadio = isMobile ? 180 : (radioCategorias + 25);
                        } else {
                            actualParentRadio = isMobile ? mobileRadii[i % mobileRadii.length] : desktopRadii[i % desktopRadii.length];
                        }`;

scriptContent = scriptContent.replace(oldRadios, newRadios);

// Mobile arc opacity in renderRueda
const oldNodeStyle = `                        nodo.style.left = \`calc(50% + \${x}px)\`;
                        nodo.style.top = \`calc(50% + \${y}px)\`;
                        nodo.style.opacity = isNeutral ? '1' : (isSelected ? '1' : '0');
                        nodo.style.pointerEvents = isNeutral || isSelected ? 'auto' : 'none';
                        nodo.style.scale = isNeutral ? '1' : (isSelected ? '1.08' : '0.88');`;

const newNodeStyle = `                        nodo.style.left = \`calc(50% + \${x}px)\`;
                        nodo.style.top = \`calc(50% + \${y}px)\`;

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
                            nodo.style.opacity = isNeutral ? '1' : (isSelected ? '1' : '0');
                            nodo.style.pointerEvents = isNeutral || isSelected ? 'auto' : 'none';
                            nodo.style.scale = isNeutral ? '1' : (isSelected ? '1.08' : '0.88');
                        }`;

scriptContent = scriptContent.replace(oldNodeStyle, newNodeStyle);

// SubActivos staggered in renderRueda
const oldSub = `                                // En móvil: arco inferior visible
                                const subRadio = 175;
                                const baseOffset = 18;
                                const stepOffset = 18;`;

const newSub = `                                // En móvil: arco inferior visible con separación escalonada alterna
                                const baseOffset = 28;
                                const stepOffset = 24;
                                a.subActivos.forEach((sub, idx) => {
                                    const offsetActual = baseOffset + idx * stepOffset;
                                    const gradosSub = gradosPadre - offsetActual;
                                    const anguloSub = gradosSub * (Math.PI / 180);
                                    const subRadio = (idx % 2 === 0) ? 172 : 194;`;

// Replace in scriptContent
const subIdx = scriptContent.indexOf(oldSub);
if (subIdx !== -1) {
    const forEachEnd = scriptContent.indexOf('const ySub = Math.sin(anguloSub) * subRadio;', subIdx);
    const oldPart = scriptContent.substring(subIdx, forEachEnd);
    scriptContent = scriptContent.replace(oldPart, newSub + '\n                                    const xSub = Math.cos(anguloSub) * subRadio;\n');
    console.log('SubActivos replaced successfully!');
} else {
    console.log('oldSub not found in scriptContent');
}

// Assemble full output
const finalHtml = original.substring(0, subStart) + 
                  newSubmenuHTML + 
                  singleSectionHTML + 
                  '\n\n        ' + scriptContent + '\n\n' + 
                  original.substring(scriptEnd);

// Header TOC replacement
const finalUpdatedHtml = finalHtml.replace(
    /4\. SECCIONES: 7 RUEDAS RADIALES DE ACTIVOS[\s\S]*?5\. DATOS Y TEXTOS DE LOS ACTIVOS EN JAVASCRIPT/,
    '4. SECCION UNICA: RUEDA RADIAL DE ACTIVOS (#rueda-activos)\n- Engloba las 7 variedades en una sola rueda interactiva intercalada.\n\n-------------------------------------------------------------------------\n5. DATOS Y TEXTOS EN JAVASCRIPT (bbbCategorias)'
);

fs.writeFileSync('C:\\\\Users\\\\Ana\\\\.gemini\\\\antigravity\\\\scratch\\\\DOXA\\\\bombonbloom\\\\index.html', finalUpdatedHtml, 'utf8');
console.log('Successfully wrote bombonbloom/index.html! Length:', finalUpdatedHtml.length);
