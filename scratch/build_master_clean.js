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

// 1. Submenu
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

// 2. Section HTML
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

// 3. Extract and evaluate clean JavaScript engine
console.log('2. Evaluating clean base script from step_560.js...');
const s560 = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\scratch\\step_560.js', 'utf8');
const nsStart = s560.indexOf('const newScript = `<script>');
const nsEnd = s560.indexOf('</script>`;', nsStart) + '</script>'.length + 2;
let engineScript = (new Function(s560.substring(nsStart, nsEnd) + '\nreturn newScript;'))();

console.log('3. Evaluating replacement from step_711.js...');
const s711 = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\scratch\\step_711.js', 'utf8');
const rStart = s711.indexOf('const replacement = `');
const rEnd = s711.lastIndexOf('`;') + 2;
const step711Replacement = (new Function(s711.substring(rStart, rEnd) + '\nreturn replacement;'))();

// Integrate step 711
const startMarker = "                function selectCategory(index, initial = false) {";
const endMarker = "                window.bbbSelectCategory = function(index) {";
const uStartIdx = engineScript.indexOf(startMarker);
const uEndIdx = engineScript.indexOf("};", engineScript.indexOf(endMarker, uStartIdx)) + 2;

if (uStartIdx !== -1 && uEndIdx !== -1) {
    engineScript = engineScript.substring(0, uStartIdx) + step711Replacement + engineScript.substring(uEndIdx);
    console.log('Successfully integrated step 711 into engineScript!');
} else {
    console.error('Could not find step 711 integration markers!');
    process.exit(1);
}

// 4. Add calculateMobileArcOpacity function and update updateMobileArcVisibility
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

engineScript = engineScript.replace(
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

engineScript = engineScript.replace(oldVis, newVis);

// 5. Intercalated zigzag radii for categories in renderRueda
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

engineScript = engineScript.replace(oldRadios, newRadios);

// 6. Mobile arc opacity in renderRueda
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

engineScript = engineScript.replace(oldNodeStyle, newNodeStyle);

// 7. Staggered subActivos alternating radius on mobile
const oldSub = `                                // En móvil: arco inferior visible
                                const subRadio = 175;
                                const baseOffset = 18;
                                const stepOffset = 18;
                                a.subActivos.forEach((sub, idx) => {
                                    const offsetActual = baseOffset + idx * stepOffset;
                                    const gradosSub = gradosPadre - offsetActual;
                                    const anguloSub = gradosSub * (Math.PI / 180);
                                    const xSub = Math.cos(anguloSub) * subRadio;
                                    const ySub = Math.sin(anguloSub) * subRadio;`;

const newSub = `                                // En móvil: arco inferior visible con separación escalonada alterna
                                const baseOffset = 28;
                                const stepOffset = 24;
                                a.subActivos.forEach((sub, idx) => {
                                    const offsetActual = baseOffset + idx * stepOffset;
                                    const gradosSub = gradosPadre - offsetActual;
                                    const anguloSub = gradosSub * (Math.PI / 180);
                                    const subRadio = (idx % 2 === 0) ? 172 : 194;
                                    const xSub = Math.cos(anguloSub) * subRadio;
                                    const ySub = Math.sin(anguloSub) * subRadio;`;

engineScript = engineScript.replace(oldSub, newSub);

// 8. Assemble full document
console.log('4. Assembling full HTML document...');
let fullHtml = original.substring(0, subStart) +
               newSubmenuHTML +
               singleSectionHTML +
               '\n\n        ' + engineScript + '\n\n' +
               original.substring(scriptEnd);

// 9. Update mobile CSS in fullHtml
// Ensure pointer-events and z-index are optimal
fullHtml = fullHtml.replace(
    '.galleta-fija {\n                    position: absolute !important;\n                    top: 50% !important;\n                    left: 50% !important;\n                    transform: translate(-50%, -50%) !important;\n                    width: 200px !important;\n                    height: 200px !important;\n                    object-fit: contain !important;\n                    filter: drop-shadow(0 14px 28px rgba(0, 0, 0, 0.22)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.12)) !important;\n                    pointer-events: auto !important;\n                    cursor: pointer !important;\n                    z-index: 15 !important;',
    '.galleta-fija {\n                    position: absolute !important;\n                    top: 50% !important;\n                    left: 50% !important;\n                    transform: translate(-50%, -50%) !important;\n                    width: 200px !important;\n                    height: 200px !important;\n                    object-fit: contain !important;\n                    filter: drop-shadow(0 14px 28px rgba(0, 0, 0, 0.22)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.12)) !important;\n                    pointer-events: auto !important;\n                    cursor: pointer !important;\n                    z-index: 45 !important;'
);

fullHtml = fullHtml.replace(
    '.nodo-activo {\n                    cursor: pointer !important;\n                    z-index: 35 !important;',
    '.nodo-activo {\n                    cursor: pointer !important;\n                    pointer-events: auto !important;\n                    z-index: 50 !important;'
);

// 10. Update header TOC
fullHtml = fullHtml.replace(
    /4\. SECCIONES: 7 RUEDAS RADIALES DE ACTIVOS[\s\S]*?5\. DATOS Y TEXTOS DE LOS ACTIVOS EN JAVASCRIPT/,
    '4. SECCION UNICA: RUEDA RADIAL DE ACTIVOS (#rueda-activos)\n- Engloba las 7 variedades en una sola rueda interactiva intercalada.\n\n-------------------------------------------------------------------------\n5. DATOS Y TEXTOS EN JAVASCRIPT (bbbCategorias)'
);

const targetFile = 'C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\bombonbloom\\index.html';
fs.writeFileSync(targetFile, fullHtml, 'utf8');
console.log('Finished! Successfully built clean master bombonbloom/index.html! Length:', fullHtml.length);
