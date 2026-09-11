/**
 * DOXA — Servidor Local de Desarrollo con Pasarela de Pago Stripe Checkout
 * 
 * Este servidor:
 * 1. Sirve todos los archivos estáticos de la web (HTML, CSS, JS, imágenes).
 * 2. Provee el endpoint /api/create-checkout-session para procesar pagos con Stripe.
 * 3. No requiere dependencias externas (utiliza la API nativa de Node.js).
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url');

// Cargar variables de entorno desde archivo .env local si existe
const envFilePath = path.join(__dirname, '.env');
if (fs.existsSync(envFilePath)) {
    try {
        const envContent = fs.readFileSync(envFilePath, 'utf8');
        envContent.split(/\r?\n/).forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const eqIdx = trimmed.indexOf('=');
                if (eqIdx > 0) {
                    const key = trimmed.substring(0, eqIdx).trim();
                    const val = trimmed.substring(eqIdx + 1).trim();
                    if (key && !process.env[key]) {
                        process.env[key] = val;
                    }
                }
            }
        });
    } catch (err) {
        console.warn('No se pudo leer el archivo .env:', err.message);
    }
}

// Claves y configuración de Stripe
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const PORT = process.env.PORT || 3000;

// Tipos MIME para servir archivos estáticos
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.avif': 'image/avif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const server = http.createServer(async (req, res) => {
    // Configuración de cabeceras CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // ============================================================
    // ENDPOINT DE STRIPE: CREAR SESIÓN DE CHECKOUT
    // ============================================================
    if (pathname === '/api/create-checkout-session' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const origin = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host || `localhost:${PORT}`}`;

                // Parámetros para construir la solicitud a Stripe API
                const stripeParams = new URLSearchParams();
                stripeParams.append('mode', 'payment');

                // Enlaces de retorno tras el pago
                const returnQuery = new URLSearchParams({
                    variety: data.varietyName || 'Caja DOXA',
                    qty: (data.personalQty || 0).toString(),
                    total: (data.totalFormatted || `${data.totalAmount} €`),
                    name: (data.buyer && data.buyer.name) || '',
                    email: (data.buyer && data.buyer.email) || '',
                    gifts: encodeURIComponent(JSON.stringify(data.giftOrders || []))
                }).toString();

                stripeParams.append('success_url', `${origin}/gracias.html?session_id={CHECKOUT_SESSION_ID}&${returnQuery}`);
                stripeParams.append('cancel_url', `${origin}/compra.html`);

                // Email del comprador
                if (data.buyer && data.buyer.email) {
                    stripeParams.append('customer_email', data.buyer.email);
                }

                let lineIndex = 0;

                // 1. Cajas personales del comprador
                if (data.personalQty && data.personalQty > 0) {
                    const priceInCents = Math.round(data.unitPrice * 100);
                    stripeParams.append(`line_items[${lineIndex}][price_data][currency]`, 'eur');
                    stripeParams.append(`line_items[${lineIndex}][price_data][product_data][name]`, data.varietyName || 'Caja DOXA');
                    stripeParams.append(`line_items[${lineIndex}][price_data][product_data][description]`, 'Caja de 4 unidades de repostería molecular');
                    stripeParams.append(`line_items[${lineIndex}][price_data][unit_amount]`, priceInCents.toString());
                    stripeParams.append(`line_items[${lineIndex}][quantity]`, data.personalQty.toString());
                    lineIndex++;
                }

                // 2. Cajas de regalo
                if (Array.isArray(data.giftOrders)) {
                    data.giftOrders.forEach(gift => {
                        const priceInCents = Math.round(gift.unitPrice * 100);
                        stripeParams.append(`line_items[${lineIndex}][price_data][currency]`, 'eur');
                        stripeParams.append(`line_items[${lineIndex}][price_data][product_data][name]`, `[Regalo] ${gift.variety} para ${gift.recipientName}`);
                        stripeParams.append(`line_items[${lineIndex}][price_data][product_data][description]`, `Envío directo a: ${gift.address}, ${gift.zip} ${gift.city}${gift.message ? ` — Dedicatoria: "${gift.message}"` : ''}`);
                        stripeParams.append(`line_items[${lineIndex}][price_data][unit_amount]`, priceInCents.toString());
                        stripeParams.append(`line_items[${lineIndex}][quantity]`, (gift.qty || 1).toString());
                        lineIndex++;
                    });
                }

                // 3. Gastos de envío
                if (data.shippingCost && data.shippingCost > 0) {
                    const shippingInCents = Math.round(data.shippingCost * 100);
                    stripeParams.append(`line_items[${lineIndex}][price_data][currency]`, 'eur');
                    stripeParams.append(`line_items[${lineIndex}][price_data][product_data][name]`, 'Gastos de Envío Express Refrigerado');
                    stripeParams.append(`line_items[${lineIndex}][price_data][unit_amount]`, shippingInCents.toString());
                    stripeParams.append(`line_items[${lineIndex}][quantity]`, '1');
                    lineIndex++;
                }

                // Metadata para el panel de administración de Stripe
                if (data.buyer) {
                    stripeParams.append('metadata[comprador_nombre]', data.buyer.name || '');
                    stripeParams.append('metadata[comprador_telefono]', data.buyer.phone || '');
                    stripeParams.append('metadata[comprador_direccion]', `${data.buyer.address || ''}, ${data.buyer.zip || ''} ${data.buyer.city || ''}`);
                    stripeParams.append('metadata[cajas_personales]', `${data.personalQty || 0}x ${data.varietyName || ''}`);
                    stripeParams.append('metadata[total_regalos]', (data.giftOrders ? data.giftOrders.length : 0).toString());
                }

                // Llamada a la API de Stripe
                const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: stripeParams.toString()
                });

                const session = await stripeResponse.json();

                if (!stripeResponse.ok || session.error) {
                    console.error('Error de Stripe:', session.error);
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: session.error ? session.error.message : 'Error al crear la sesión de pago' }));
                    return;
                }

                // Devolver URL de redirección
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ id: session.id, url: session.url }));
            } catch (err) {
                console.error('Error interno en servidor:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error interno del servidor procesando el pago' }));
            }
        });
        return;
    }

    // ============================================================
    // SERVIDOR DE ARCHIVOS ESTÁTICOS
    // ============================================================
    let decodedPath = '/';
    try {
        decodedPath = decodeURIComponent(pathname);
    } catch (e) {
        decodedPath = pathname;
    }

    let filePath = path.join(__dirname, decodedPath === '/' ? 'index.html' : decodedPath);

    // Soporte para URLs limpias sin extensión (ej: /compra -> /compra.html)
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Archivo no encontrado');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=3600'
        });
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
    });
});

server.listen(PORT, () => {
    console.log('=====================================================');
    console.log(` DOXA Atelier — Servidor Local Iniciado`);
    console.log(` URL de compra: http://localhost:${PORT}/compra.html`);
    console.log(` Web principal: http://localhost:${PORT}/index.html`);
    console.log(` Pasarela: Stripe Checkout (Modo Test Activo)`);
    console.log('=====================================================');
});
