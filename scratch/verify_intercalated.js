const pw = require('C:/Users/Ana/AppData/Local/ms-playwright-go/1.57.0/package');
const path = require('path');

(async () => {
    const browser = await pw.chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true
    });
    const page = await context.newPage();

    const filePath = 'file:///' + path.resolve(__dirname, '../bombonbloom/index.html').replace(/\\/g, '/') + '#rueda-activos';
    await page.goto(filePath, { waitUntil: 'load' });
    await page.waitForTimeout(800);

    // Scroll to wheel
    await page.evaluate(() => {
        const sec = document.getElementById('rueda-activos');
        if (sec) sec.scrollIntoView();
    });
    await page.waitForTimeout(500);

    const artifactDir = 'C:/Users/Ana/.gemini/antigravity-ide/brain/665bd42a-eed3-4111-8afc-c419466f5863';

    // 1. Inspect neutral nodes
    const nodeInfo = await page.evaluate(() => {
        const nodes = Array.from(document.querySelectorAll('.nodo-activo')).map((n, i) => {
            const rect = n.getBoundingClientRect();
            const cs = getComputedStyle(n);
            return {
                idx: i,
                text: n.innerText.replace(/\n/g, ' '),
                top: Math.round(rect.top),
                left: Math.round(rect.left),
                opacity: parseFloat(cs.opacity).toFixed(2),
                pointerEvents: cs.pointerEvents
            };
        });
        return nodes;
    });

    console.log('NEUTRAL NODES:');
    console.table(nodeInfo);

    await page.screenshot({ path: path.join(artifactDir, 'intercalated_mobile_neutral.png') });

    // 2. Select index 1 (BBB Stop-loss Mujer) to reproduce user screenshot situation
    await page.evaluate(() => {
        if (window.bbbSelectCategory) {
            window.bbbSelectCategory(1);
        }
    });
    await page.waitForTimeout(1000);

    // Reset back to neutral so it stays at that rotation to see the intercalated arc
    await page.evaluate(() => {
        const galleta = document.querySelector('.galleta-fija');
        if (galleta) galleta.click();
    });
    await page.waitForTimeout(800);

    const rotatedNodeInfo = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.nodo-activo')).map((n, i) => {
            const rect = n.getBoundingClientRect();
            const cs = getComputedStyle(n);
            return {
                idx: i,
                text: n.innerText.replace(/\n/g, ' '),
                top: Math.round(rect.top),
                left: Math.round(rect.left),
                opacity: parseFloat(cs.opacity).toFixed(2)
            };
        });
    });

    console.log('ROTATED NODES (like user screenshot):');
    console.table(rotatedNodeInfo);

    await page.screenshot({ path: path.join(artifactDir, 'intercalated_mobile_user_view.png') });

    await browser.close();
    console.log('Done verifying!');
})();
