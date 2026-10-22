const fs = require('fs');

const bbbFile = 'c:/Users/Ana/.gemini/antigravity/scratch/DOXA/bombonbloom/index.html';
let content = fs.readFileSync(bbbFile, 'utf8');

// 1. UPDATE NAVBAR HTML: Move <a class="navbar-logo active">DOXA</a> outside .navbar-menu
const oldNavHtml = `<a href="../articulos.html" class="navbar-link btn-articulos" data-visible="off">Artículos</a>

                <!-- BOTÓN AMARILLO DE INDEX "DOXA" (A LA DERECHA DEL TODO) -->
                <a href="../index.html" class="navbar-logo active">DOXA</a>
            </div>
        </nav>`;

const newNavHtml = `<a href="../articulos.html" class="navbar-link btn-articulos" data-visible="off">Artículos</a>
            </div>

            <!-- BOTÓN AMARILLO DE INDEX "DOXA" (A LA DERECHA DEL TODO) -->
            <a href="../index.html" class="navbar-logo active">DOXA</a>
        </nav>`;

if (content.includes(oldNavHtml)) {
    content = content.replace(oldNavHtml, newNavHtml);
    console.log('1. Navbar HTML updated: DOXA moved directly to navbar!');
} else {
    console.error('1. Warning: oldNavHtml not matched directly, checking variations...');
}

// 2. UPDATE CSS FOR NAVBAR:
// Update .navbar desktop gap and mobile layout
const oldMobileToggleCss = `            .mobile-toggle {
                display: flex;
                margin-left: auto;
            }

            .navbar-menu .navbar-logo {
                display: none !important;
            }`;

const newMobileToggleCss = `            .navbar {
                padding: 0 16px;
                height: 70px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 12px;
            }

            .mobile-toggle {
                display: flex;
                order: 1;
                margin-left: auto;
            }

            .navbar-logo {
                display: inline-flex !important;
                order: 2;
                padding: 6px 14px !important;
                font-size: 11px !important;
                letter-spacing: 2.5px !important;
                border-radius: 2px;
            }

            .navbar-logo.active {
                display: inline-flex !important;
                order: 2;
                padding: 6px 14px !important;
                font-size: 11px !important;
                background-color: var(--accent-color) !important;
                color: #000000 !important;
                transform: none !important;
            }`;

if (content.includes(oldMobileToggleCss)) {
    content = content.replace(oldMobileToggleCss, newMobileToggleCss);
    console.log('2. CSS for mobile navbar updated!');
} else {
    console.error('2. Warning: oldMobileToggleCss not matched!');
}

// 3. UPDATE WHEEL MOBILE ANGLES AND INTERLEAVING IN JS
const oldWheelCode = `                function calculateMobileArcOpacity(degPantalla) {
                    if (degPantalla < 18 || degPantalla > 162) return 0;
                    const distFromBottom = Math.abs(degPantalla - 90);
                    return Math.max(0.45, 1 - (distFromBottom / 72));
                }

                function updateMobileArcVisibility(tempRot) {
                    if (window.innerWidth > 768) return;
                    const angPaso = 360 / bbbCategorias.length;
                    const isNeutral = (selectedCategoryIndex === -1);
                    rueda.querySelectorAll('.nodo-activo').forEach(nodo => {
                        const idx = parseInt(nodo.dataset.index);
                        const grPadre = idx * angPaso - 90;
                        let sDeg = ((grPadre + tempRot) % 360 + 360) % 360;`;

const newWheelCode = `                function calculateMobileArcOpacity(degPantalla) {
                    if (degPantalla < 8 || degPantalla > 172) return 0;
                    return 1;
                }

                function getMobileParentAngle(idx) {
                    // Distribución del abanico inferior bajo el bombón (15° a 165°)
                    // con paso cerrado (~25°) e intercalando los activos en los espacios vacíos
                    // Índice 0: BBB Piel, Pelo & Uñas (90° centro inferior)
                    // Índice 1: BBB Stop-loss Mujer (115° lado izquierdo interno - rellenando el hueco 1)
                    // Índice 2: BBB Menopausia (140° lado izquierdo externo)
                    // Índice 3: BBB Regla (165° lado izquierdo interno)
                    // Índice 6: BBB Stop-loss Hombre (65° lado derecho interno - rellenando el hueco 2)
                    // Índice 5: BBB Relajación (40° lado derecho externo)
                    // Índice 4: BBB Pre-entreno (15° lado derecho interno)
                    const angles = [90, 115, 140, 165, 15, 40, 65];
                    return angles[idx];
                }

                function getMobileParentRadius(idx) {
                    // Radios intercalados en zigzag (interior 176px y exterior 222px)
                    // para encajar perfectamente en los espacios vacíos sin solaparse
                    const radii = [218, 176, 222, 176, 176, 222, 176];
                    return radii[idx];
                }

                function getGradosPadre(idx) {
                    if (window.innerWidth <= 768) {
                        return getMobileParentAngle(idx);
                    }
                    const anguloPaso = 360 / bbbCategorias.length;
                    return idx * anguloPaso - 90;
                }

                function updateMobileArcVisibility(tempRot) {
                    if (window.innerWidth > 768) return;
                    const isNeutral = (selectedCategoryIndex === -1);
                    rueda.querySelectorAll('.nodo-activo').forEach(nodo => {
                        const idx = parseInt(nodo.dataset.index);
                        const grPadre = getGradosPadre(idx);
                        let sDeg = ((grPadre + tempRot) % 360 + 360) % 360;`;

if (content.includes(oldWheelCode)) {
    content = content.replace(oldWheelCode, newWheelCode);
    console.log('3. calculateMobileArcOpacity and getGradosPadre added!');
} else {
    console.error('3. Warning: oldWheelCode not matched!');
}

// 4. In selectCategory on mobile:
const oldSelectMobile = `                    if (isMobile) {
                        // En móvil: la categoría seleccionada se ubica en el arco inferior visible
                        const targetRot = 212 - index * anguloPaso;`;

const newSelectMobile = `                    if (isMobile) {
                        // En móvil: la categoría seleccionada se ubica en el cuadrante inferior izquierdo visible (145°)
                        const targetRot = 145 - getGradosPadre(index);`;

if (content.includes(oldSelectMobile)) {
    content = content.replace(oldSelectMobile, newSelectMobile);
    console.log('4. selectCategory mobile targetRot updated!');
} else {
    console.error('4. Warning: oldSelectMobile not matched!');
}

// 5. In resetToNeutral: reset rotacionActual on mobile smoothly
const oldResetNeutral = `                function resetToNeutral() {
                    selectedCategoryIndex = -1;
                    selectedSubIndex = -1;
                    childrenVisible = false;

                    if (btnVolver) {
                        btnVolver.style.display = 'none';
                    }`;

const newResetNeutral = `                function resetToNeutral() {
                    selectedCategoryIndex = -1;
                    selectedSubIndex = -1;
                    childrenVisible = false;

                    if (btnVolver) {
                        btnVolver.style.display = 'none';
                    }

                    if (window.innerWidth <= 768) {
                        rotacionActual = 0;
                        rueda.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                        rueda.style.transform = 'rotate(0deg)';
                        rueda.querySelectorAll('.nodo-texto').forEach(t => {
                            t.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), color 0.5s ease';
                            t.style.transform = 'rotate(0deg)';
                        });
                    }`;

if (content.includes(oldResetNeutral)) {
    content = content.replace(oldResetNeutral, newResetNeutral);
    console.log('5. resetToNeutral mobile rotation reset updated!');
} else {
    console.error('5. Warning: oldResetNeutral not matched!');
}

// 6. In renderRueda(): use getGradosPadre(i) and mobile radii
const oldRenderParentRadio = `                    bbbCategorias.forEach((a, i) => {
                        const gradosPadre = i * anguloPaso - 90;
                        const anguloPadre = gradosPadre * (Math.PI / 180);
                        const isSelected = (i === selectedCategoryIndex);
                        const isNeutral = (selectedCategoryIndex === -1);

                        // Radios intercalados en zigzag para aprovechar el espacio visual
                        const mobileRadii = [182, 228, 182, 228, 182, 228, 205];
                        const desktopRadii = [240, 282, 240, 282, 240, 282, 260];
                        let actualParentRadio;
                        if (isSelected) {
                            actualParentRadio = isMobile ? 180 : (radioCategorias + 25);
                        } else {
                            actualParentRadio = isMobile ? mobileRadii[i % mobileRadii.length] : desktopRadii[i % desktopRadii.length];
                        }`;

const newRenderParentRadio = `                    bbbCategorias.forEach((a, i) => {
                        const gradosPadre = getGradosPadre(i);
                        const anguloPadre = gradosPadre * (Math.PI / 180);
                        const isSelected = (i === selectedCategoryIndex);
                        const isNeutral = (selectedCategoryIndex === -1);

                        // Radios intercalados en zigzag para aprovechar el espacio visual
                        const desktopRadii = [240, 282, 240, 282, 240, 282, 260];
                        let actualParentRadio;
                        if (isSelected) {
                            actualParentRadio = isMobile ? 180 : (radioCategorias + 25);
                        } else {
                            actualParentRadio = isMobile ? getMobileParentRadius(i) : desktopRadii[i % desktopRadii.length];
                        }`;

if (content.includes(oldRenderParentRadio)) {
    content = content.replace(oldRenderParentRadio, newRenderParentRadio);
    console.log('6. renderRueda parent angles and radii updated!');
} else {
    console.error('6. Warning: oldRenderParentRadio not matched!');
}

fs.writeFileSync(bbbFile, content, 'utf8');
console.log('All changes written to bombonbloom/index.html successfully!');
