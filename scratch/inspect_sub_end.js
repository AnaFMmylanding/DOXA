const { execSync } = require('child_process');
const c = execSync('git show 0b97035:bombonbloom/index.html').toString('utf8');

const subStart = c.indexOf('<div class="bbb-submenu-bar" id="bbbSubmenuBar">');
// Find where the submenu bar div actually ends!
const item7 = c.indexOf('id="btn-bbb-7"');
const afterItem7 = c.indexOf('</div>', c.indexOf('</div>', item7) + 6) + 6;
console.log('afterItem7:', afterItem7);
console.log('Snippet after submenu bar:');
console.log(c.substring(afterItem7, afterItem7 + 600));
