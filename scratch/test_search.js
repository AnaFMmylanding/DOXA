const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\bombonbloom\\index.html', 'utf8');
console.log('rueda-activos index:', content.indexOf('rueda-activos'));
console.log('bbbCategorias index:', content.indexOf('bbbCategorias'));
console.log('calculateMobileArcOpacity index:', content.indexOf('calculateMobileArcOpacity'));
console.log('actualParentRadio index:', content.indexOf('actualParentRadio'));
console.log('Total length:', content.length);
