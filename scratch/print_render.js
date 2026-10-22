const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\bombonbloom\\index.html', 'utf8');

const rStart = content.indexOf('function renderRueda()');
const nIdx = content.indexOf('nodo.onmouseleave', rStart);
console.log(content.substring(nIdx, nIdx + 1500));
