        /* =========================================================================
           [RUEDA 3: BOMBÃ“N BLOOM]
           ========================================================================= */
        const bbbCategorias = [
        {
                n: "BBB Piel, Pelo & Uñas",
                title: "BBB Piel, Pelo & Uñas",
                tagline: "BOMBÓN BLOOM",
                img: "../BBB 1.png",
                bg: "../Pelo y uñas.jpg",
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
                bg: "../cabello y uñas.jpg",
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
                bg: "../amazona.jpg",
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
                bg: "../respeto.jpg",
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
                bg: "../Energía.jpg",
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
                bg: "../Claridad mental.jpg",
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
                bg: "../Creatina _ok.jpg",
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
            },
        {
                n: "BBB Articulaciones",
                title: "BBB Articulaciones",
                tagline: "BOMBÓN BLOOM",
                img: "../BBB 1.png",
                bg: "../articulaciones.jpg",
                neg: "Flexibilidad, regeneración articular y confort biomecánico",
                prop: "Arquitectura nutracéutica diseñada para preservar el cartílago, lubricar las articulaciones y mitigar la inflamación y rigidez articular.",
                subActivos: [
                    { n: "Boswellia Serrata", title: "Boswellia Serrata (65% Ácidos Boswélicos)", neg: "Modulación antiinflamatoria y confort articular", prop: "Extracto botánico concentrado que inhibe la enzima proinflamatoria 5-LOX, aliviando la rigidez y favoreciendo la movilidad articular." },
                    { n: "Colágeno Tipo II", title: "Colágeno Nativo Tipo II (UC-II®)", neg: "Integridad estructural y regeneración del cartílago", prop: "Proteína no desnaturalizada que actúa por tolerancia oral en las placas de Peyer, frenando la degradación del colágeno en las articulaciones." },
                    { n: "Ácido Hialurónico", title: "Ácido Hialurónico Biotecnológico", neg: "Lubricación y viscosuplementación sinovial", prop: "Componente mayoritario del líquido sinovial que restaura la viscoelasticidad intraarticular y actúa como amortiguador biomecánico natural." },
                    { n: "Cúrcuma Liposomada", title: "Cúrcuma Liposomada (95% Curcuminoides)", neg: "Alivio del dolor y protección antioxidante", prop: "Curcumina de absorción multiplicada que bloquea las vías de señalización inflamatoria NF-kB, aliviando las articulaciones sobrecargadas." },
                    { n: "MSM Puro", title: "Metilsulfonilmetano (MSM) de Alta Pureza", neg: "Flexibilidad, tendones y azufre biológico", prop: "Donante de azufre orgánico indispensable para reparar los enlaces disulfuro de tendones, ligamentos y cartílagos sometidos a tensión." }
                ]
            }
        ];

        /* =========================================================================
           [RUEDA 4: LINGOTES]
           ========================================================================= */
        const lingoteCategorias = [
        {
                n: "Lingote Piel, Pelo & Uñas",
                title: "Lingote Piel, Pelo & Uñas",
                tagline: "LINGOTE",
                img: "../Lingote.png",
                bg: "../Pelo y uñas.jpg",
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
                n: "Lingote Stop-loss Mujer",
                title: "Lingote Stop-loss Mujer",
                tagline: "LINGOTE",
                img: "../Lingote.png",
                bg: "../cabello y uñas.jpg",
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
                n: "Lingote Menopausia",
                title: "Lingote Menopausia",
                tagline: "LINGOTE",
                img: "../Lingote.png",
                bg: "../amazona.jpg",
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
                n: "Lingote Regla",
                title: "Lingote Regla",
                tagline: "LINGOTE",
                img: "../Lingote.png",
                bg: "../respeto.jpg",
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
                n: "Lingote Pre-entreno",
                title: "Lingote Pre-entreno",
                tagline: "LINGOTE",
                img: "../Lingote.png",
                bg: "../Energía.jpg",
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
                n: "Lingote Relajación",
                title: "Lingote Relajación",
                tagline: "LINGOTE",
                img: "../Lingote.png",
                bg: "../Claridad mental.jpg",
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
                n: "Lingote Stop-loss Hombre",
                title: "Lingote Stop-loss Hombre",
                tagline: "LINGOTE",
                img: "../Lingote.png",
                bg: "../Creatina _ok.jpg",
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
            },
        {
                n: "Lingote Articulaciones",
                title: "Lingote Articulaciones",
                tagline: "LINGOTE",
                img: "../Lingote.png",
                bg: "../articulaciones.jpg",
                neg: "Flexibilidad, regeneración articular y confort biomecánico",
                prop: "Arquitectura nutracéutica diseñada para preservar el cartílago, lubricar las articulaciones y mitigar la inflamación y rigidez articular.",
                subActivos: [
                    { n: "Boswellia Serrata", title: "Boswellia Serrata (65% Ácidos Boswélicos)", neg: "Modulación antiinflamatoria y confort articular", prop: "Extracto botánico concentrado que inhibe la enzima proinflamatoria 5-LOX, aliviando la rigidez y favoreciendo la movilidad articular." },
                    { n: "Colágeno Tipo II", title: "Colágeno Nativo Tipo II (UC-II®)", neg: "Integridad estructural y regeneración del cartílago", prop: "Proteína no desnaturalizada que actúa por tolerancia oral en las placas de Peyer, frenando la degradación del colágeno en las articulaciones." },
                    { n: "Ácido Hialurónico", title: "Ácido Hialurónico Biotecnológico", neg: "Lubricación y viscosuplementación sinovial", prop: "Componente mayoritario del líquido sinovial que restaura la viscoelasticidad intraarticular y actúa como amortiguador biomecánico natural." },
                    { n: "Cúrcuma Liposomada", title: "Cúrcuma Liposomada (95% Curcuminoides)", neg: "Alivio del dolor y protección antioxidante", prop: "Curcumina de absorción multiplicada que bloquea las vías de señalización inflamatoria NF-kB, aliviando las articulaciones sobrecargadas." },
                    { n: "MSM Puro", title: "Metilsulfonilmetano (MSM) de Alta Pureza", neg: "Flexibilidad, tendones y azufre biológico", prop: "Donante de azufre orgánico indispensable para reparar los enlaces disulfuro de tendones, ligamentos y cartílagos sometidos a tensión." }
                ]
            }
        ];

        /* =========================================================================
           [RUEDA 5: CRUJIENTE DE ALMENDRA]
           ========================================================================= */
        const obleaCategorias = [
        {
                n: "Crujiente Piel, Pelo & Uñas",
                title: "Crujiente Piel, Pelo & Uñas",
                tagline: "CRUJIENTE DE ALMENDRA",
                img: "../Oblea.png",
                bg: "../Pelo y uñas.jpg",
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
                n: "Crujiente Stop-loss Mujer",
                title: "Crujiente Stop-loss Mujer",
                tagline: "CRUJIENTE DE ALMENDRA",
                img: "../Oblea.png",
                bg: "../cabello y uñas.jpg",
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
                n: "Crujiente Menopausia",
                title: "Crujiente Menopausia",
                tagline: "CRUJIENTE DE ALMENDRA",
                img: "../Oblea.png",
                bg: "../amazona.jpg",
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
                n: "Crujiente Regla",
                title: "Crujiente Regla",
                tagline: "CRUJIENTE DE ALMENDRA",
                img: "../Oblea.png",
                bg: "../respeto.jpg",
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
                n: "Crujiente Pre-entreno",
                title: "Crujiente Pre-entreno",
                tagline: "CRUJIENTE DE ALMENDRA",
                img: "../Oblea.png",
                bg: "../Energía.jpg",
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
                n: "Crujiente Relajación",
                title: "Crujiente Relajación",
                tagline: "CRUJIENTE DE ALMENDRA",
                img: "../Oblea.png",
                bg: "../Claridad mental.jpg",
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
                n: "Crujiente Stop-loss Hombre",
                title: "Crujiente Stop-loss Hombre",
                tagline: "CRUJIENTE DE ALMENDRA",
                img: "../Oblea.png",
                bg: "../Creatina _ok.jpg",
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
            },
        {
                n: "Crujiente Articulaciones",
                title: "Crujiente Articulaciones",
                tagline: "CRUJIENTE DE ALMENDRA",
                img: "../Oblea.png",
                bg: "../articulaciones.jpg",
                neg: "Flexibilidad, regeneración articular y confort biomecánico",
                prop: "Arquitectura nutracéutica diseñada para preservar el cartílago, lubricar las articulaciones y mitigar la inflamación y rigidez articular.",
                subActivos: [
                    { n: "Boswellia Serrata", title: "Boswellia Serrata (65% Ácidos Boswélicos)", neg: "Modulación antiinflamatoria y confort articular", prop: "Extracto botánico concentrado que inhibe la enzima proinflamatoria 5-LOX, aliviando la rigidez y favoreciendo la movilidad articular." },
                    { n: "Colágeno Tipo II", title: "Colágeno Nativo Tipo II (UC-II®)", neg: "Integridad estructural y regeneración del cartílago", prop: "Proteína no desnaturalizada que actúa por tolerancia oral en las placas de Peyer, frenando la degradación del colágeno en las articulaciones." },
                    { n: "Ácido Hialurónico", title: "Ácido Hialurónico Biotecnológico", neg: "Lubricación y viscosuplementación sinovial", prop: "Componente mayoritario del líquido sinovial que restaura la viscoelasticidad intraarticular y actúa como amortiguador biomecánico natural." },
                    { n: "Cúrcuma Liposomada", title: "Cúrcuma Liposomada (95% Curcuminoides)", neg: "Alivio del dolor y protección antioxidante", prop: "Curcumina de absorción multiplicada que bloquea las vías de señalización inflamatoria NF-kB, aliviando las articulaciones sobrecargadas." },
                    { n: "MSM Puro", title: "Metilsulfonilmetano (MSM) de Alta Pureza", neg: "Flexibilidad, tendones y azufre biológico", prop: "Donante de azufre orgánico indispensable para reparar los enlaces disulfuro de tendones, ligamentos y cartílagos sometidos a tensión." }
                ]
            }
        ];

        /* =========================================================================
           [RUEDA 6: PEQUEBLOOMS / NENEBLOOMS]
           ========================================================================= */
        const pequebloomCategorias = [
        {
                n: "PequeBloom Piel, Pelo & Uñas",
                title: "PequeBloom Piel, Pelo & Uñas",
                tagline: "PEQUEBLOOMS",
                img: "../Pequebloom.png",
                bg: "../Pelo y uñas.jpg",
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
                n: "PequeBloom Stop-loss Mujer",
                title: "PequeBloom Stop-loss Mujer",
                tagline: "PEQUEBLOOMS",
                img: "../Pequebloom.png",
                bg: "../cabello y uñas.jpg",
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
                n: "PequeBloom Menopausia",
                title: "PequeBloom Menopausia",
                tagline: "PEQUEBLOOMS",
                img: "../Pequebloom.png",
                bg: "../amazona.jpg",
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
                n: "PequeBloom Regla",
                title: "PequeBloom Regla",
                tagline: "PEQUEBLOOMS",
                img: "../Pequebloom.png",
                bg: "../respeto.jpg",
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
                n: "PequeBloom Pre-entreno",
                title: "PequeBloom Pre-entreno",
                tagline: "PEQUEBLOOMS",
                img: "../Pequebloom.png",
                bg: "../Energía.jpg",
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
                n: "PequeBloom Relajación",
                title: "PequeBloom Relajación",
                tagline: "PEQUEBLOOMS",
                img: "../Pequebloom.png",
                bg: "../Claridad mental.jpg",
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
                n: "PequeBloom Stop-loss Hombre",
                title: "PequeBloom Stop-loss Hombre",
                tagline: "PEQUEBLOOMS",
                img: "../Pequebloom.png",
                bg: "../Creatina _ok.jpg",
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
            },
        {
                n: "PequeBloom Articulaciones",
                title: "PequeBloom Articulaciones",
                tagline: "PEQUEBLOOMS",
                img: "../Pequebloom.png",
                bg: "../articulaciones.jpg",
                neg: "Flexibilidad, regeneración articular y confort biomecánico",
                prop: "Arquitectura nutracéutica diseñada para preservar el cartílago, lubricar las articulaciones y mitigar la inflamación y rigidez articular.",
                subActivos: [
                    { n: "Boswellia Serrata", title: "Boswellia Serrata (65% Ácidos Boswélicos)", neg: "Modulación antiinflamatoria y confort articular", prop: "Extracto botánico concentrado que inhibe la enzima proinflamatoria 5-LOX, aliviando la rigidez y favoreciendo la movilidad articular." },
                    { n: "Colágeno Tipo II", title: "Colágeno Nativo Tipo II (UC-II®)", neg: "Integridad estructural y regeneración del cartílago", prop: "Proteína no desnaturalizada que actúa por tolerancia oral en las placas de Peyer, frenando la degradación del colágeno en las articulaciones." },
                    { n: "Ácido Hialurónico", title: "Ácido Hialurónico Biotecnológico", neg: "Lubricación y viscosuplementación sinovial", prop: "Componente mayoritario del líquido sinovial que restaura la viscoelasticidad intraarticular y actúa como amortiguador biomecánico natural." },
                    { n: "Cúrcuma Liposomada", title: "Cúrcuma Liposomada (95% Curcuminoides)", neg: "Alivio del dolor y protección antioxidante", prop: "Curcumina de absorción multiplicada que bloquea las vías de señalización inflamatoria NF-kB, aliviando las articulaciones sobrecargadas." },
                    { n: "MSM Puro", title: "Metilsulfonilmetano (MSM) de Alta Pureza", neg: "Flexibilidad, tendones y azufre biológico", prop: "Donante de azufre orgánico indispensable para reparar los enlaces disulfuro de tendones, ligamentos y cartílagos sometidos a tensión." }
                ]
            }
        ];
