const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\bombonbloom\\index.html', 'utf8');
const idx = content.indexOf('actualParentRadio');
console.log(content.substring(idx - 200, idx + 600));
