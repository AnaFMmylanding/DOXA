const fs = require('fs');

const s560 = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\scratch\\step_560.js', 'utf8');
const nsStart = s560.indexOf('const newScript = `<script>');
const nsEnd = s560.indexOf('</script>`;', nsStart) + '</script>'.length + 2; // includes `;`

console.log('nsStart:', nsStart, 'nsEnd:', nsEnd);
const evalCode = s560.substring(nsStart, nsEnd) + '\nreturn newScript;';
const fn = new Function(evalCode);
const extractedScript = fn();

console.log('Extracted script length:', extractedScript.length);
console.log('Does extracted script contain backslash-backtick?', extractedScript.includes('\\`'));
console.log('Sample node style in extracted script:');
const sampleIdx = extractedScript.indexOf('nodo.style.left = `calc(50%');
console.log(extractedScript.substring(sampleIdx, sampleIdx + 80));
