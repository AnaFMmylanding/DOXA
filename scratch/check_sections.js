const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\bombonbloom\\index.html', 'utf8');

const matches = content.match(/<section[^>]*>/gi);
console.log('Sections found:', matches);
