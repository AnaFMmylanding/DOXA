const fs = require('fs');
const step560 = fs.readFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\scratch\\step_560.js', 'utf8');

const nsIdx = step560.indexOf('const newScript = `');
console.log('const newScript = ` at:', nsIdx);
const nsEnd = step560.indexOf('`;', nsIdx);
console.log('`; at:', nsEnd);
