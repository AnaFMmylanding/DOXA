const fs = require('fs');

const targetFile = 'C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\bombonbloom\\index.html';
let content = fs.readFileSync(targetFile, 'utf8');

// Target block:
const targetBlock = `                        nodo.style.left = \`calc(50% + \${x}px)\`;
                        nodo.style.top = \`calc(50% + \${y}px)\`;
                        nodo.style.opacity = isNeutral ? '1' : (isSelected ? '1' : '0');
                        nodo.style.pointerEvents = isNeutral || isSelected ? 'auto' : 'none';
                        nodo.style.scale = isNeutral ? '1' : (isSelected ? '1.08' : '0.88');`;

const replacementBlock = `                        nodo.style.left = \`calc(50% + \${x}px)\`;
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

if (content.includes(targetBlock)) {
    content = content.replace(targetBlock, replacementBlock);
    console.log('Replaced nodo.style opacity block successfully!');
} else {
    console.error('targetBlock not found!');
}

// Update mobile subActivos radius to also alternate
const oldSubOffset = `                                // En móvil: arco inferior visible
                                const subRadio = 175;
                                const baseOffset = 18;
                                const stepOffset = 18;`;

const newSubOffset = `                                // En móvil: arco inferior visible escalonado
                                const baseOffset = 28;
                                const stepOffset = 24;
                                a.subActivos.forEach((sub, idx) => {
                                    const offsetActual = baseOffset + idx * stepOffset;
                                    const gradosSub = gradosPadre - offsetActual;
                                    const anguloSub = gradosSub * (Math.PI / 180);
                                    const subRadio = (idx % 2 === 0) ? 172 : 194;`;

// Find where subActivos forEach starts
const subStart = content.indexOf('if (isSelected && a.subActivos && childrenVisible) {');
if (subStart !== -1) {
    const mobileSubIdx = content.indexOf('if (isMobile) {', subStart);
    const forEachIdx = content.indexOf('a.subActivos.forEach((sub, idx) => {', mobileSubIdx);
    const forEachEnd = content.indexOf('const ySub = Math.sin(anguloSub) * subRadio;', forEachIdx) + 'const ySub = Math.sin(anguloSub) * subRadio;'.length;
    const oldPart = content.substring(mobileSubIdx, forEachEnd);
    const newPart = `if (isMobile) {
                                // En móvil: arco inferior visible con separación escalonada alterna
                                const baseOffset = 28;
                                const stepOffset = 24;
                                a.subActivos.forEach((sub, idx) => {
                                    const offsetActual = baseOffset + idx * stepOffset;
                                    const gradosSub = gradosPadre - offsetActual;
                                    const anguloSub = gradosSub * (Math.PI / 180);
                                    const subRadio = (idx % 2 === 0) ? 172 : 194;
                                    const xSub = Math.cos(anguloSub) * subRadio;
                                    const ySub = Math.sin(anguloSub) * subRadio;`;
    content = content.replace(oldPart, newPart);
    console.log('Updated subActivos staggered offset and alternating radius!');
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Saved bombonbloom/index.html! Length:', content.length);
