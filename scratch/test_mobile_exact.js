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

    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));

    await page.goto('http://localhost:3000/bombonbloom/index.html#rueda-activos', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Inspect elements
    const initialData = await page.evaluate(() => {
        const nodes = Array.from(document.querySelectorAll('.nodo-activo')).map(n => ({
            text: n.innerText.replace(/\n/g, ' '),
            opacity: n.style.opacity,
            computedOpacity: getComputedStyle(n).opacity,
            pointerEvents: n.style.pointerEvents,
            rect: n.getBoundingClientRect()
        }));
        const galleta = document.querySelector('.galleta-fija');
        const gRect = galleta ? galleta.getBoundingClientRect() : null;
        const wheel = document.querySelector('.rueda-giro');
        const wRect = wheel ? wheel.getBoundingClientRect() : null;
        return { nodes, gRect, wRect };
    });

    console.log('INITIAL NODES:', JSON.stringify(initialData, null, 2));

    const artifactDir = 'C:/Users/Ana/.gemini/antigravity-ide/brain/bdef1a3c-1f8e-4528-af63-b060d4634a94';
    await page.screenshot({ path: path.join(artifactDir, 'pw_mobile_neutral.png') });

    // Click on visible node
    const clicked = await page.evaluate(() => {
        const visibleNodes = Array.from(document.querySelectorAll('.nodo-activo')).filter(n => parseFloat(getComputedStyle(n).opacity) > 0.3);
        if (visibleNodes.length > 0) {
            visibleNodes[0].click();
            return visibleNodes[0].innerText.replace(/\n/g, ' ');
        }
        return null;
    });

    console.log('CLICKED CATEGORY:', clicked);
    await page.waitForTimeout(1500);

    await page.screenshot({ path: path.join(artifactDir, 'pw_mobile_category_open.png') });

    // Click on center chocolate
    const resetClicked = await page.evaluate(() => {
        const galleta = document.querySelector('.galleta-fija');
        if (galleta) {
            galleta.click();
            return true;
        }
        return false;
    });

    console.log('CLICKED GALLETA RESET:', resetClicked);
    await page.waitForTimeout(1000);

    const postResetData = await page.evaluate(() => {
        const title = document.querySelector('.variety-title')?.innerText;
        const visibleNodes = Array.from(document.querySelectorAll('.nodo-activo')).filter(n => parseFloat(getComputedStyle(n).opacity) > 0.3).length;
        const subNodes = document.querySelectorAll('.nodo-subactivo').length;
        return { title, visibleNodes, subNodes };
    });

    console.log('POST RESET DATA:', JSON.stringify(postResetData, null, 2));

    await page.screenshot({ path: path.join(artifactDir, 'pw_mobile_reset_verified.png') });

    await browser.close();
    console.log('DONE!');
})();
