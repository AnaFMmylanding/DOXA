const fs = require('fs');

const filePath = 'c:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\bombonbloom\\index.html';
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original length:', content.length);

// 1. Actualizar el submenú de bombones: href="#rueda-activos" y data-category="0" a "6"
const oldSubmenuHTML = `        <div class="bbb-submenu-bar" id="bbbSubmenuBar">
            <div class="bbb-submenu-container">
                <!-- VARIEDAD 1: BBB Piel,Pelo & Uñas [ESTADO: ON] -->
                <a href="#rueda-bbb-1" class="bbb-submenu-item" id="btn-bbb-1" data-visible="on">
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
                <a href="#rueda-bbb-2" class="bbb-submenu-item" id="btn-bbb-2" data-visible="on">
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
                <a href="#rueda-bbb-3" class="bbb-submenu-item" id="btn-bbb-3" data-visible="on">
                    <div class="bbb-submenu-thumb">
                        <img src="../BBB 3.png" alt="BBB Menopausia" onerror="this.src='../BBB.png'">
                    </div>
                    <span class="bbb-submenu-name">
                        <span class="bbb-brand">BBB</span>
                        <span class="bbb-line">Menopausia</span>
                    </span>
                </a>

                <!-- VARIEDAD 4: BBB Regla [ESTADO: ON] -->
                <a href="#rueda-bbb-4" class="bbb-submenu-item" id="btn-bbb-4" data-visible="on">
                    <div class="bbb-submenu-thumb">
                        <img src="../BBB 4.png" alt="BBB Regla" onerror="this.src='../BBB.png'">
                    </div>
                    <span class="bbb-submenu-name">
                        <span class="bbb-brand">BBB</span>
                        <span class="bbb-line">Regla</span>
                    </span>
                </a>

                <!-- VARIEDAD 5: BBB Pre-entreno [ESTADO: ON] -->
                <a href="#rueda-bbb-5" class="bbb-submenu-item" id="btn-bbb-5" data-visible="on">
                    <div class="bbb-submenu-thumb">
                        <img src="../BBB 5.png" alt="BBB Pre-entreno" onerror="this.src='../BBB.png'">
                    </div>
                    <span class="bbb-submenu-name">
                        <span class="bbb-brand">BBB</span>
                        <span class="bbb-line">Pre-entreno</span>
                    </span>
                </a>

                <!-- VARIEDAD 6: BBB Relajación [ESTADO: ON] -->
                <a href="#rueda-bbb-6" class="bbb-submenu-item" id="btn-bbb-6" data-visible="on">
                    <div class="bbb-submenu-thumb">
                        <img src="../BBB 6.png" alt="BBB Relajación" onerror="this.src='../BBB.png'">
                    </div>
                    <span class="bbb-submenu-name">
                        <span class="bbb-brand">BBB</span>
                        <span class="bbb-line">Relajación</span>
                    </span>
                </a>

                <!-- VARIEDAD 7: BBB Stop-loss Hombre [ESTADO: ON] -->
                <a href="#rueda-bbb-7" class="bbb-submenu-item" id="btn-bbb-7" data-visible="on">
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
        </div>`;

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
        </div>`;

if (content.includes(oldSubmenuHTML)) {
    content = content.replace(oldSubmenuHTML, newSubmenuHTML);
    console.log('Updated submenu HTML successfully.');
} else {
    // Reemplazo regex si hay pequeñas diferencias de espacios
    content = content.replace(/<div class="bbb-submenu-bar" id="bbbSubmenuBar">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, newSubmenuHTML);
    console.log('Updated submenu HTML via regex.');
}

// 2. Reemplazar las 7 secciones por UNA ÚNICA SECCIÓN UNIFICADA (#rueda-activos)
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

// Encontrar el bloque desde <section id="rueda-bbb-1" hasta el final de la sección 7 antes de <script>
const sectionsStart = content.indexOf('<section id="rueda-bbb-1"');
const scriptStart = content.indexOf('<script>', sectionsStart);

if (sectionsStart !== -1 && scriptStart !== -1) {
    // Buscar el comentario previo a rueda-bbb-1 si existe
    let replaceStart = content.lastIndexOf('<!-- =========================================================================', sectionsStart);
    if (replaceStart === -1 || sectionsStart - replaceStart > 300) {
        replaceStart = sectionsStart;
    }

    content = content.substring(0, replaceStart) + singleSectionHTML + '\n\n        ' + content.substring(scriptStart);
    console.log('Replaced 7 stacked sections with single unified section successfully.');
} else {
    console.warn('Could not find sectionsStart or scriptStart.');
}

// 3. Reemplazar el bloque de <script> con el motor completo y unificado de la rueda radial DOXA
const newScript = `<script>
            /* =========================================================================
               =========================================================================
               RUEDA RADIAL UNIFICADA DE BOMBÓN BLOOM (CATEGORÍAS PADRE + ACTIVOS HIJAS)
               - 7 Variedades de Bombón Bloom como categorías padre en la rueda.
               - Al seleccionar una categoría: rota, cambia la imagen central del bombón
                 y despliega sus 6 activos funcionales (categorías hijas).
               - Al hacer clic en un activo hijo: muestra sus propiedades funcionales.
               - Al hacer clic en el botón "Volver" o en el bombón central: resetea a neutral.
               =========================================================================
               ========================================================================= */

            const bbbCategorias = [
                {
                    n: "BBB Piel, Pelo & Uñas",
                    title: "BBB Piel, Pelo & Uñas",
                    tagline: "BOMBÓN BLOOM",
                    img: "../BBB 1.png",
                    neg: "Regeneración celular, elasticidad y firmeza",
                    prop: "Fórmula de alta biodisponibilidad para nutrir la piel desde el interior, fortalecer el folículo piloso y devolver la vitalidad a las uñas.",
                    subActivos: [
                        { n: "Péptidos Colágeno", title: "Péptidos de Colágeno — 10g", neg: "Firmeza y regeneración dérmica", prop: "10g de péptidos bioactivos hidrolizados de máxima asimilación para favorecer la síntesis de colágeno y restaurar la turgencia." },
                        { n: "Ácido Hialurónico", title: "Ácido Hialurónico Puro", neg: "Hidratación celular profunda", prop: "Retiene hasta 1000 veces su peso molecular en agua, hidratando la matriz extracelular para una piel jugosa y tersa." },
                        { n: "Coenzima Q10", title: "Coenzima Q10 Bioidéntica", neg: "Protección mitocondrial", prop: "Antioxidante intracelular que previene el estrés oxidativo y combate el fotoenvejecimiento." },
                        { n: "Biotina Activa", title: "Biotina Pura D-Biotina", neg: "Vigor capilar y dureza ungular", prop: "Refuerza la queratina capilar y celular, engrosando el pelo fino y reduciendo la fragilidad." },
                        { n: "Zinc Quelado", title: "Bisglicinato de Zinc", neg: "Cicatrización y equilibrio", prop: "Mineral esencial con máxima biodisponibilidad que regula la producción sebácea." },
                        { n: "Vitamina C", title: "Vitamina C Pura Liposomada", neg: "Cofactor esencial", prop: "Potente antioxidante sinérgico indispensable para ensamblar las fibras de colágeno." }
                    ]
                },
                {
                    n: "BBB Stop-loss Mujer",
                    title: "BBB Stop-loss Mujer",
                    tagline: "BOMBÓN BLOOM",
                    img: "../BBB 2.png",
                    neg: "Anclaje folicular, nutrición y freno a la caída",
                    prop: "Arquitectura nutracéutica diseñada específicamente para frenar la caída capilar femenina estacional u hormonal y reactivar el crecimiento.",
                    subActivos: [
                        { n: "Extracto Cola Caballo", title: "Cola de Caballo Estandarizada", neg: "Sílice orgánica y elasticidad", prop: "Aporte concentrado de silicio biodisponible para regenerar la estructura interna de la fibra capilar." },
                        { n: "Hierro Bisglicinato", title: "Hierro Quelado Sin Molestias", neg: "Oxigenación de la raíz", prop: "Forma de hierro de máxima asimilación estomacal para sostener niveles óptimos de ferritina." },
                        { n: "L-Cisteína", title: "L-Cisteína Pura", neg: "Estructura primaria de la queratina", prop: "Aminoácido azufrado indispensable para crear los puentes disulfuro que dan resistencia y fuerza al cabello." },
                        { n: "Levadura Cerveza", title: "Levadura Nutricional Viva", neg: "Complejo vitamínico B natural", prop: "Aporte biodisponible de vitaminas del grupo B para activar la división celular en la raíz del pelo." },
                        { n: "Semilla Calabaza", title: "Aceite de Semilla de Calabaza", neg: "Inhibición suave de la 5α-reductasa", prop: "Fitonutrientes que equilibran el impacto de andrógenos a nivel folicular en la mujer." },
                        { n: "Vitamina E", title: "Tocoferoles Mixtos Naturales", neg: "Microcirculación en el cuero cabelludo", prop: "Protege los capilares sanguíneos que irrigan la papila dérmica del estrés oxidativo." }
                    ]
                },
                {
                    n: "BBB Menopausia",
                    title: "BBB Menopausia",
                    tagline: "BOMBÓN BLOOM",
                    img: "../BBB 3.png",
                    neg: "Equilibrio hormonal, serenidad y soporte óseo",
                    prop: "Sinergia botánica y micronutricional para acompañar la transición hormonal con confort, vitalidad y protección celular.",
                    subActivos: [
                        { n: "Trébol Rojo", title: "Isoflavonas de Trébol Rojo", neg: "Modulación fitoestrogénica", prop: "Fitoestrógenos naturales que alivian los sofocos, la sudoración nocturna y la sequedad." },
                        { n: "Cimicífuga", title: "Cimicifuga Racemosa", neg: "Regulación neurovegetativa", prop: "Extracto estandarizado que suaviza los cambios de humor y favorece el descanso reparador." },
                        { n: "Maca Andina", title: "Maca Roja y Negra Estandarizada", neg: "Energía y vitalidad endocrina", prop: "Adaptógeno milenario que combate la fatiga crónica y apoya la libido y la densidad ósea." },
                        { n: "Salvia", title: "Salvia Officinalis Pura", neg: "Control de sofocos y transpiración", prop: "Fitocompuestos que equilibran el centro termorregulador hipotalámico." },
                        { n: "Vitamina D3 & K2", title: "D3 Colecalciferol + K2 Menaquinona-7", neg: "Fijación del calcio óseo", prop: "Dúo vitamínico sinérgico que dirige el calcio hacia el hueso y previene la desmineralización." },
                        { n: "Complejo B Metilado", title: "Vitaminas B6, B9 y B12 Metiladas", neg: "Apoyo del sistema nervioso", prop: "Vitaminas en su forma biológicamente activa para mitigar la niebla mental y el cansancio." }
                    ]
                },
                {
                    n: "BBB Regla",
                    title: "BBB Regla",
                    tagline: "BOMBÓN BLOOM",
                    img: "../BBB 4.png",
                    neg: "Alivio del SPM, equilibrio prostaglándico y bienestar",
                    prop: "Fórmula reconfortante formulada para calmar los espasmos, reducir la inflamación y sostener un estado de ánimo estable durante el ciclo.",
                    subActivos: [
                        { n: "Sauzgatillo", title: "Vitex Agnus-Castus", neg: "Equilibrio estrógeno / progesterona", prop: "Regula la prolactina y armoniza la fase lútea, aliviando la hinchazón y la sensibilidad mamaria." },
                        { n: "Magnesio Bisglicinato", title: "Magnesio Quelado de Alta Absorción", neg: "Relajación miometrial y muscular", prop: "Reduce la intensidad de los cólicos menstruales y alivia las migrañas catameniales." },
                        { n: "Jengibre Estandarizado", title: "Extracto de Jengibre (5% Gingeroles)", neg: "Inhibición de prostaglandinas proinflamatorias", prop: "Eficacia demostrada para reducir el dolor espasmódico abdominal y las náuseas." },
                        { n: "Vitamina B6 Activa", title: "Piridoxal-5-Fosfato (P5P)", neg: "Metabolismo de serotonina y dopamina", prop: "Forma activa de la B6 indispensable para estabilizar el humor y reducir la irritabilidad." },
                        { n: "Onagra", title: "Aceite de Onagra Primera Prensión (GLA)", neg: "Modulación de la inflamación cíclica", prop: "Ácido gamma-linolénico para mantener la piel limpia y prevenir brotes premenstruales." },
                        { n: "Hierro Quelado", title: "Bisglicinato de Hierro Ferrochel", neg: "Reposición de pérdidas menstruales", prop: "Restaura la vitalidad previniendo la fatiga ferropénica durante el sangrado." }
                    ]
                },
                {
                    n: "BBB Pre-entreno",
                    title: "BBB Pre-entreno",
                    tagline: "BOMBÓN BLOOM",
                    img: "../BBB 5.png",
                    neg: "Fuerza limpia, bombeo muscular y foco mental",
                    prop: "Complejo ergogénico natural sin picos ni bajones, optimizado para elevar el rendimiento físico, la resistencia y la vascularización.",
                    subActivos: [
                        { n: "Beta-Alanina", title: "Beta-Alanina Pura", neg: "Tampón de ácido láctico y resistencia", prop: "Aumenta los niveles de carnosina muscular retrasando la fatiga en esfuerzos intensos." },
                        { n: "Citrulina Malato", title: "L-Citrulina Malato (2:1)", neg: "Óxido nítrico y bombeo muscular", prop: "Potente precursor de óxido nítrico que optimiza el flujo sanguíneo y el transporte de nutrientes." },
                        { n: "Taurina", title: "L-Taurina Pura", neg: "Hidratación celular y contracción", prop: "Apoya la transmisión del impulso neuromuscular y protege las células musculares del daño oxidativo." },
                        { n: "Té Verde", title: "Té Verde Estandarizado (EGCG + Cafeína)", neg: "Activación metabólica limpia", prop: "Estimulación neurofisiológica sostenida que mejora la concentración sin taquicardia ni nerviosismo." },
                        { n: "Creatina Creapure", title: "Creatina Monohidrato Creapure®", neg: "Regeneración de ATP y potencia explosiva", prop: "Recarga rápida de fosfocreatina para series pesadas y potencia anaeróbica." },
                        { n: "Electrolitos Quelados", title: "Sodio, Potasio y Magnesio Iónicos", neg: "Conductividad neuromuscular", prop: "Previene calambres y sostiene el rendimiento electrolítico celular intraentrenamiento." }
                    ]
                },
                {
                    n: "BBB Relajación",
                    title: "BBB Relajación",
                    tagline: "BOMBÓN BLOOM",
                    img: "../BBB 6.png",
                    neg: "Descanso reparador, calma mental y desconexión",
                    prop: "Fórmula adaptogénica y relajante para desconectar de la sobreestimulación diaria, rebajar el cortisol y facilitar un sueño profundo.",
                    subActivos: [
                        { n: "Magnesio Bisglicinato", title: "Magnesio Bisglicinato Puro", neg: "Relajación neuromuscular profunda", prop: "Favorece la síntesis de GABA y desactiva la tensión muscular acumulada durante el día." },
                        { n: "L-Teanina", title: "L-Teanina de Grado Farmacéutico", neg: "Ondas cerebrales alfa y foco sereno", prop: "Promueve un estado de calma lúcida sin generar somnolencia diurna." },
                        { n: "Pasiflora", title: "Extracto Seco de Pasiflora", neg: "Calmante del sistema nervioso", prop: "Fitocomplejo ansiolítico suave que apacigua la rumiación mental y el nerviosismo." },
                        { n: "Fosfatidilserina", title: "Fosfatidilserina Lipídica", neg: "Amortiguación del cortisol nocturno", prop: "Fosfolípido esencial que normaliza la curva de estrés y protege las neuronas del cortisol." },
                        { n: "Glicina", title: "Glicina Pura Cristalina", neg: "Descenso de la temperatura central", prop: "Neurotransmisor inhibidor que acorta el tiempo de latencia del sueño y mejora la fase REM." },
                        { n: "Melatonina", title: "Melatonina Pura Microencapsulada", neg: "Sincronización del ciclo circadiano", prop: "Favorece la inducción rápida del sueño y previene los despertares a medianoche." }
                    ]
                },
                {
                    n: "BBB Stop-loss Hombre",
                    title: "BBB Stop-loss Hombre",
                    tagline: "BOMBÓN BLOOM",
                    img: "../BBB 7.png",
                    neg: "Inhibición de DHT, densidad y fortaleza folicular",
                    prop: "Tratamiento nutracéutico masculino enfocado en combatir la miniaturización folicular androgénica y sostener la densidad del cabello.",
                    subActivos: [
                        { n: "Saw Palmetto", title: "Saw Palmetto (45% Ácidos Grasos)", neg: "Inhibidor natural de la 5α-reductasa", prop: "Bloquea selectivamente la conversión de testosterona en dihidrotestosterona (DHT)." },
                        { n: "Pygeum Africanum", title: "Extracto de Ciruelo Africano", neg: "Acción antiandrogénica sinérgica", prop: "Reduce la inflamación perineal folicular y frena la involución del folículo piloso." },
                        { n: "Semilla Calabaza", title: "Aceite Concentrado de Calabaza", neg: "Fitoesteroles bloqueadores de DHT", prop: "Rico en delta-7-esteroles que protegen la papila dérmica del ataque androgénico." },
                        { n: "Zinc & Selenio", title: "Zinc Bisglicinato + Selenometionina", neg: "Síntesis de queratina y cofactor", prop: "Dúo mineral indispensable para la regeneración celular y la salud capilar y prostática." },
                        { n: "Biotina", title: "Biotina Pura", neg: "Calibre y densidad de la hebra", prop: "Nutriente fundamental para vigorizar el tallo capilar, aumentando el grosor del pelo." },
                        { n: "Maca Negra", title: "Maca Negra Andina Estandarizada", neg: "Tono vital, resistencia y energía", prop: "Adaptógeno vigorizante que sostiene la vitalidad hormonal masculina y la salud celular." }
                    ]
                }
            ];

            (function initUnifiedBBBWheel() {
                const sec = document.getElementById('rueda-activos');
                if (!sec) return;

                const rueda = sec.querySelector('.rueda-giro');
                const cajaText = sec.querySelector('.text-box');
                const galletaFija = sec.querySelector('.galleta-fija');
                const radialWrapper = sec.querySelector('.radial-wrapper');
                const btnVolver = document.getElementById('btnVolver');
                if (!rueda || !cajaText || !radialWrapper) return;

                const getRadioCategorias = () => (window.innerWidth <= 768 ? 205 : 255);
                let rotacionActual = 0;
                let selectedCategoryIndex = -1;
                let selectedSubIndex = -1;
                let childrenVisible = false;
                let isDraggingWheel = false;
                let wasDragging = false;

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
                    let clean = name.replace(/^BBB\\s+/i, '');
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
                    const newHTML = \`
                        <div class="tagline" style="font-family:'Lexend',sans-serif;font-size:10.5px;font-weight:300;letter-spacing:2.5px;text-transform:uppercase;color:rgba(0,0,0,0.45);margin-bottom:8px;display:block;">\${a.tagline || 'BOMBÓN BLOOM'}</div>
                        <h3 class="variety-title" style="margin-bottom: 20px; line-height: 1.2;">\${a.title || a.n}</h3>
                        \${a.neg ? \`<p class="hero-value-prop-neg">\${a.neg}</p>\` : ''}
                        <div class="hero-value-prop">\${a.prop || ''}</div>
                    \`;
                    transitionCajaText(newHTML);
                }

                function selectCategory(index, initial = false) {
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

                    // 2. Rotación suave para enfocar la categoría seleccionada
                    const anguloPaso = 360 / bbbCategorias.length;
                    let targetRot;
                    if (isMobile) {
                        targetRot = 212 - index * anguloPaso;
                    } else {
                        targetRot = 90 - index * anguloPaso;
                    }

                    let diff = (targetRot - rotacionActual) % 360;
                    if (diff > 180) diff -= 360;
                    if (diff < -180) diff += 360;
                    rotacionActual += diff;

                    const rotDur = initial ? 0 : Math.min(2.0, Math.max(1.5, 1.3 + Math.abs(diff) * 0.0035));
                    rueda.style.transition = initial ? 'none' : \`transform \${rotDur}s cubic-bezier(0.2, 1, 0.25, 1)\`;
                    rueda.style.transform = \`rotate(\${rotacionActual}deg)\`;

                    rueda.querySelectorAll('.nodo-texto').forEach(t => {
                        t.style.transition = initial ? 'none' : \`transform \${rotDur}s cubic-bezier(0.2, 1, 0.25, 1), color 0.5s ease\`;
                        t.style.transform = \`rotate(\${-rotacionActual}deg)\`;
                    });
                    rueda.querySelectorAll('.sub-activo-link').forEach(t => {
                        t.style.transition = initial ? 'none' : \`transform \${rotDur}s cubic-bezier(0.2, 1, 0.25, 1), color 0.45s ease\`;
                        t.style.transform = \`rotate(\${-rotacionActual}deg)\`;
                    });

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
                    galletaFija.onclick = () => {
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

                    bbbCategorias.forEach((a, i) => {
                        const gradosPadre = i * anguloPaso - 90;
                        const anguloPadre = gradosPadre * (Math.PI / 180);
                        const isSelected = (i === selectedCategoryIndex);
                        const isNeutral = (selectedCategoryIndex === -1);

                        let actualParentRadio = radioCategorias;
                        if (isSelected) {
                            actualParentRadio = isMobile ? radioCategorias : (radioCategorias - 5);
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
                            line.style.transition = 'width 0.75s ease, background 0.5s ease, opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
                            rueda.appendChild(line);
                        }

                        line.style.width = \`\${actualParentRadio}px\`;
                        if (isSelected) {
                            line.style.background = 'linear-gradient(90deg, transparent 40%, rgba(193, 155, 118, 0.25) 42%, rgba(193, 155, 118, 0.95) 95%, transparent 100%)';
                            line.style.opacity = childrenVisible ? '0' : '1';
                        } else {
                            line.style.background = 'linear-gradient(90deg, transparent 55%, rgba(255, 255, 255, 0.05) 58%, rgba(255, 255, 255, 0.15) 95%, transparent 100%)';
                            line.style.opacity = isNeutral ? '0.75' : '0.15';
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
                            nodo.style.transition = 'left 1.1s cubic-bezier(0.2, 1, 0.25, 1), top 1.1s cubic-bezier(0.2, 1, 0.25, 1), scale 0.5s cubic-bezier(0.2, 1, 0.25, 1), opacity 0.4s ease';

                            nodo.innerHTML = \`<span class="nodo-texto" style="display:inline-flex; flex-direction:column; align-items:center; text-align:center; line-height:1.2; font-size:\${isMobile ? '9.5px' : '10.5px'}; letter-spacing: 0.8px; text-transform: uppercase;">\${formatCategoryName(a.n)}</span>\`;

                            rueda.appendChild(nodo);
                        }

                        nodo.onclick = () => {
                            if (wasDragging || isDraggingWheel) return;
                            alignToWheelSection();
                            if (i !== selectedCategoryIndex) {
                                selectCategory(i);
                            } else {
                                resetToNeutral();
                            }
                        };

                        nodo.onmouseenter = () => {
                            if (isDraggingWheel || isMobile) return;
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
                            nodo.style.opacity = isNeutral ? '1' : (isSelected ? '1' : '0.28');
                            const textEl = nodo.querySelector('.nodo-texto');
                            if (textEl) {
                                textEl.style.color = isSelected ? '#fff' : (isNeutral ? '#fff' : 'rgba(255, 255, 255, 0.65)');
                                textEl.style.textShadow = isSelected ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none';
                            }
                        };

                        nodo.style.left = \`calc(50% + \${x}px)\`;
                        nodo.style.top = \`calc(50% + \${y}px)\`;
                        nodo.style.opacity = isNeutral ? '1' : (isSelected ? '1' : '0.28');
                        nodo.style.scale = isNeutral ? '1' : (isSelected ? '1.08' : '0.88');

                        const textSpan = nodo.querySelector('.nodo-texto');
                        textSpan.style.fontWeight = isSelected ? '600' : '300';
                        textSpan.style.color = isSelected ? '#fff' : (isNeutral ? '#fff' : 'rgba(255, 255, 255, 0.65)');
                        textSpan.style.fontSize = isMobile ? '9.5px' : '10.5px';
                        textSpan.style.textShadow = isSelected ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none';
                        textSpan.style.transform = \`rotate(\${-rotacionActual}deg)\`;

                        // 3. Renderizar activos hijas (subActivos) si la categoría está seleccionada
                        if (isSelected && a.subActivos && childrenVisible) {
                            const subCount = a.subActivos.length;
                            const subRadio = isMobile ? (radioCategorias + 26) : (radioCategorias + 34);

                            a.subActivos.forEach((sub, idx) => {
                                let gradosSub;
                                if (isMobile) {
                                    // Arco hacia abajo y a la derecha en móvil
                                    const baseOffset = 22;
                                    const stepOffset = 24;
                                    gradosSub = gradosPadre - (baseOffset + idx * stepOffset);
                                } else {
                                    // Abanico elegante en escritorio alrededor del nodo seleccionado
                                    const baseOffset = 14;
                                    const stepOffset = 18;
                                    const half = (subCount - 1) / 2;
                                    gradosSub = gradosPadre + (idx - half) * stepOffset;
                                }

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
                                subLine.style.transition = 'opacity 0.6s cubic-bezier(0.2, 1, 0.25, 1), background 0.4s ease';
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
                                nodoSub.style.transition = 'opacity 0.8s cubic-bezier(0.2, 1, 0.25, 1), scale 0.3s cubic-bezier(0.2, 1, 0.25, 1), transform 1.1s cubic-bezier(0.2, 1, 0.25, 1)';

                                nodoSub.innerHTML = \`
                                    <span class="sub-activo-link" style="display:inline-flex; flex-direction:column; align-items:center; text-align:center; line-height:1.2; font-size:\${isMobile ? '9.5px' : '10.5px'}; font-weight:\${isSubSelected ? '600' : '400'}; color:\${isSubSelected || noSubSelected ? '#fff' : 'rgba(255, 255, 255, 0.65)'}; letter-spacing: 0.6px; text-transform: none; pointer-events:none; transition: transform 1.25s cubic-bezier(0.2, 1, 0.25, 1), color 0.4s ease, text-shadow 0.4s ease; text-shadow: \${isSubSelected ? '0 0 14px rgba(255, 255, 255, 0.95)' : 'none'};">
                                        \${formatSubActivoName(sub.n)}
                                    </span>
                                \`;

                                const textSpanSub = nodoSub.querySelector('.sub-activo-link');
                                textSpanSub.style.transform = \`rotate(\${-rotacionActual}deg)\`;

                                nodoSub.onclick = (e) => {
                                    e.stopPropagation();
                                    if (wasDragging || isDraggingWheel) return;
                                    alignToWheelSection();
                                    if (selectedSubIndex === idx) {
                                        selectedSubIndex = -1;
                                        updateCategoryText(i);
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
                                        selectedSubIndex = idx;
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
                                            <h3 class="variety-title" style="margin-bottom: 14px; line-height: 1.25;">\${sub.title || sub.n}</h3>
                                            \${sub.neg ? \`<p class="hero-value-prop-neg">\${sub.neg}</p>\` : ''}
                                            <div class="hero-value-prop">\${sub.prop || ''}</div>
                                        \`;
                                        transitionCajaText(daughterHTML);
                                    }
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
                    });
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
                    if (e.target.closest('.nodo-activo') || e.target.closest('.nodo-subactivo')) return;
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

                        function snapToClosestCategory() {
                            const isMobile = window.innerWidth <= 768;
                            const anguloPaso = 360 / bbbCategorias.length;
                            const targetBase = isMobile ? 212 : 90;

                            let closestIdx = 0;
                            let minDiff = Infinity;

                            bbbCategorias.forEach((a, i) => {
                                const idealRot = targetBase - i * anguloPaso;
                                let d = Math.abs((idealRot - rotacionActual) % 360);
                                if (d > 180) d = 360 - d;
                                if (d < minDiff) {
                                    minDiff = d;
                                    closestIdx = i;
                                }
                            });

                            selectCategory(closestIdx);

                            setTimeout(() => {
                                wasDragging = false;
                            }, 180);
                        }

                        snapToClosestCategory();
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
                            selectCategory(selectedCategoryIndex, true);
                        } else {
                            resetToNeutral();
                        }
                    }
                });

                resetToNeutral();

                // Exponer globalmente para el submenú
                window.bbbSelectCategory = function(index) {
                    alignToWheelSection();
                    selectCategory(index);
                };
            })();

            /* =========================================================================
               DESPLAZAMIENTO SUAVE DEL SUBMENÚ Y SELECCIÓN DIRECTA DE BOMBÓN
               Al hacer clic en cualquier bombón del submenú superior:
               1. Se desplaza fluidamente hasta la sección única #rueda-activos
               2. Se activa automáticamente la categoría seleccionada en la rueda
               ========================================================================= */
            document.querySelectorAll('.bbb-submenu-item').forEach((btn, index) => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetSection = document.getElementById('rueda-activos');
                    if (targetSection) {
                        const targetY = targetSection.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: targetY,
                            behavior: 'smooth'
                        });

                        const catIdx = this.hasAttribute('data-category') 
                            ? parseInt(this.getAttribute('data-category')) 
                            : index;

                        setTimeout(() => {
                            if (window.bbbSelectCategory) {
                                window.bbbSelectCategory(catIdx);
                            }
                        }, 350);
                    }
                });
            });
        </script>`;

const scriptEnd = content.lastIndexOf('</script>');
if (scriptStart !== -1 && scriptEnd !== -1) {
    const afterScript = content.substring(scriptEnd + '</script>'.length);
    const beforeScript = content.substring(0, content.indexOf('<script>', content.indexOf('id="rueda-activos"')));
    content = beforeScript + newScript + afterScript;
    console.log('Replaced JavaScript block with unified engine successfully.');
} else {
    console.warn('Could not replace script block.');
}

// 4. Actualizar el índice al principio del archivo HTML
const oldIndexHeader = content.substring(content.indexOf('<!-- \n=========================================================================\nINDICE DE CONTENIDO'), content.indexOf('-->', content.indexOf('INDICE DE CONTENIDO')) + 3);

const newIndexHeader = `<!-- 
=========================================================================
INDICE DE CONTENIDO EDITABLE E IMPORTANTE (BOMBON BLOOM)
=========================================================================
Este indice indica la estructura clave de esta pagina (Rueda Radial Unificada).

-------------------------------------------------------------------------
1. MENU PRINCIPAL DE NAVEGACION (CABECERA)
-------------------------------------------------------------------------
- Barra de navegacion completa (<nav>): Linea 1318
- Desplegable de Productos: Linea 1331

-------------------------------------------------------------------------
2. SECCION HERO (PORTADA / CABECERA)
-------------------------------------------------------------------------
- Imagen de fondo y textos: Linea 1420

-------------------------------------------------------------------------
3. SUBMENU DE 7 VARIEDADES DE BOMBON BLOOM (DEBAJO DEL HERO)
-------------------------------------------------------------------------
- Contenedor del submenu: Linea 1494
- Al hacer clic, navega a la Rueda Unificada y activa directamente la variedad.
- Interruptores ON/OFF (cambia data-visible="on" o "off"):
  * VARIEDAD 1: BBB Piel,Pelo & Unas ...... [data-visible="on"]
  * VARIEDAD 2: BBB Stop-loss Mujer ....... [data-visible="on"]
  * VARIEDAD 3: BBB Menopausia ............ [data-visible="on"]
  * VARIEDAD 4: BBB Regla ................. [data-visible="on"]
  * VARIEDAD 5: BBB Pre-entreno ........... [data-visible="on"]
  * VARIEDAD 6: BBB Relajacion ............ [data-visible="on"]
  * VARIEDAD 7: BBB Stop-loss Hombre ...... [data-visible="on"]

-------------------------------------------------------------------------
4. SECCION UNICA: RUEDA RADIAL DE ACTIVOS (#rueda-activos)
-------------------------------------------------------------------------
- Engloba todas las variedades en una sola rueda interactiva.
- Imagen de fondo general identificada (<div class="bg-layer" id="caja-bg">).
- Foto central interactiva (<img class="galleta-fija">): Cambia a BBB 1-7 segun la variedad seleccionada.
- Categorias padre (las 7 variedades) + Categorias hijas (activos funcionales).
- Boton "Volver" (<button class="btn-volver">) para resetear la rueda.

-------------------------------------------------------------------------
5. DATOS Y TEXTOS EN JAVASCRIPT (bbbCategorias)
-------------------------------------------------------------------------
- Bloque <script> con las 7 variedades y sus activos correspondientes.
=========================================================================
-->`;

if (oldIndexHeader && content.includes(oldIndexHeader)) {
    content = content.replace(oldIndexHeader, newIndexHeader);
    console.log('Updated index header comment successfully.');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Finished updating! Final file length:', content.length);
