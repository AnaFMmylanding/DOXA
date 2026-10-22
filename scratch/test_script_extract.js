const fs = require('fs');

const s560 = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\scratch\\step_560.js', 'utf8');
const scriptStart = s560.indexOf('<script>\r\n            /* =========================================================================\r\n               =========================================================================\r\n               RUEDA RADIAL UNIFICADA DE BOMBÓN BLOOM');
const scriptStartNorm = s560.indexOf('RUEDA RADIAL UNIFICADA DE BOMBÓN BLOOM');
console.log({ scriptStart, scriptStartNorm });

const fullScriptStart = s560.lastIndexOf('<script>', scriptStartNorm);
const fullScriptEnd = s560.indexOf('</script>', fullScriptStart) + '</script>'.length;
console.log({ fullScriptStart, fullScriptEnd });

let scriptContent = s560.substring(fullScriptStart, fullScriptEnd);
console.log('Script length:', scriptContent.length);

// Check step_711
const s711 = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\scratch\\step_711.js', 'utf8');
const rMarker = 'const replacement = `';
const rStart = s711.indexOf(rMarker) + rMarker.length;
const rEnd = s711.lastIndexOf('`;');
const replacementBlock = s711.substring(rStart, rEnd);
console.log('Step 711 replacement length:', replacementBlock.length);

const startMarker = "                function selectCategory(index, initial = false) {";
const endMarker = "                window.bbbSelectCategory = function(index) {";
const uStartIdx = scriptContent.indexOf(startMarker);
const uEndIdx = scriptContent.indexOf("};", scriptContent.indexOf(endMarker, uStartIdx)) + 2;
console.log({ uStartIdx, uEndIdx });

if (uStartIdx !== -1 && uEndIdx !== -1) {
    scriptContent = scriptContent.substring(0, uStartIdx) + replacementBlock + scriptContent.substring(uEndIdx);
    console.log('Integrated step_711! New script length:', scriptContent.length);
}
