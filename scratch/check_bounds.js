const { execSync } = require('child_process');
const c = execSync('git show 0b97035:bombonbloom/index.html').toString('utf8');

const subStart = c.indexOf('<div class="bbb-submenu-bar" id="bbbSubmenuBar">');
const v1Idx = c.indexOf('[VARIEDAD 1] BBB PIEL, PELO & UÑAS');
const subEnd = c.lastIndexOf('<!-- =========================================================================', v1Idx);

const v7Idx = c.indexOf('[VARIEDAD 7] BBB STOP-LOSS HOMBRE');
const sec7End = c.indexOf('</section>', v7Idx) + '</section>'.length;

const scriptStart = c.lastIndexOf('<script>', c.indexOf('const bbbData1'));
const scriptEnd = c.indexOf('</script>', scriptStart) + '</script>'.length;

console.log({ subStart, subEnd, sec7End, scriptStart, scriptEnd });
console.log('Snippet before sec7End:', c.substring(sec7End - 50, sec7End));
console.log('Snippet after sec7End:', c.substring(sec7End, sec7End + 100));
