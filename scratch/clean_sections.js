const fs = require('fs');

const targetFile = 'C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\bombonbloom\\index.html';
let content = fs.readFileSync(targetFile, 'utf8');

const s2 = content.indexOf('<section id="rueda-bbb-2"');
const s7 = content.indexOf('<section id="rueda-bbb-7"');
if (s2 !== -1 && s7 !== -1) {
    const s7End = content.indexOf('</section>', s7) + '</section>'.length;
    // Also include any comments before s2
    let cutStart = content.lastIndexOf('<!-- =========================================================================', s2);
    if (cutStart === -1 || s2 - cutStart > 300) {
        cutStart = s2;
    }
    content = content.substring(0, cutStart) + content.substring(s7End);
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log('Removed duplicate sections 2-7 successfully!');
} else {
    console.log('Sections 2 or 7 not found.');
}
