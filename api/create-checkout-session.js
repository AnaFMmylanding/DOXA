/**
 * Vercel Serverless Function — Endpoint de creación de Stripe Checkout Session
 * Ruta en producción: /api/create-checkout-session
 */

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    if (!STRIPE_SECRET_KEY) {
        return res.status(500).json({ error: 'STRIPE_SECRET_KEY no configurada en las variables de entorno' });
    }

    try {
        const data = req.body;
        const protocol = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers.host;
        const origin = `${protocol}://${host}`;

        const stripeParams = new URLSearchParams();
        stripeParams.append('mode', 'payment');

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

        if (data.buyer && data.buyer.email) {
            stripeParams.append('customer_email', data.buyer.email);
        }

        let lineIndex = 0;

        // Cajas personales
        if (data.personalQty && data.personalQty > 0) {
            const priceInCents = Math.round(data.unitPrice * 100);
            stripeParams.append(`line_items[${lineIndex}][price_data][currency]`, 'eur');
            stripeParams.append(`line_items[${lineIndex}][price_data][product_data][name]`, data.varietyName || 'Caja DOXA');
            stripeParams.append(`line_items[${lineIndex}][price_data][product_data][description]`, 'Caja de 4 unidades de repostería molecular');
            stripeParams.append(`line_items[${lineIndex}][price_data][unit_amount]`, priceInCents.toString());
            stripeParams.append(`line_items[${lineIndex}][quantity]`, data.personalQty.toString());
            lineIndex++;
        }

        // Cajas de regalo
        if (Array.isArray(data.giftOrders)) {
            data.giftOrders.forEach(gift => {
                const priceInCents = Math.round(gift.unitPrice * 100);
                stripeParams.append(`line_items[${lineIndex}][price_data][currency]`, 'eur');
                stripeParams.append(`line_items[${lineIndex}][price_data][product_data][name]`, `[Regalo] ${gift.variety} para ${gift.recipientName}`);
                stripeParams.append(`line_items[${lineIndex}][price_data][product_data][description]`, `Envío a: ${gift.address}, ${gift.zip} ${gift.city}${gift.message ? ` — Dedicatoria: "${gift.message}"` : ''}`);
                stripeParams.append(`line_items[${lineIndex}][price_data][unit_amount]`, priceInCents.toString());
                stripeParams.append(`line_items[${lineIndex}][quantity]`, (gift.qty || 1).toString());
                lineIndex++;
            });
        }

        // Gastos de envío
        if (data.shippingCost && data.shippingCost > 0) {
            const shippingInCents = Math.round(data.shippingCost * 100);
            stripeParams.append(`line_items[${lineIndex}][price_data][currency]`, 'eur');
            stripeParams.append(`line_items[${lineIndex}][price_data][product_data][name]`, 'Gastos de Envío Express Refrigerado');
            stripeParams.append(`line_items[${lineIndex}][price_data][unit_amount]`, shippingInCents.toString());
            stripeParams.append(`line_items[${lineIndex}][quantity]`, '1');
            lineIndex++;
        }

        // Metadata
        if (data.buyer) {
            stripeParams.append('metadata[comprador_nombre]', data.buyer.name || '');
            stripeParams.append('metadata[comprador_telefono]', data.buyer.phone || '');
            stripeParams.append('metadata[comprador_direccion]', `${data.buyer.address || ''}, ${data.buyer.zip || ''} ${data.buyer.city || ''}`);
            stripeParams.append('metadata[cajas_personales]', `${data.personalQty || 0}x ${data.varietyName || ''}`);
            stripeParams.append('metadata[total_regalos]', (data.giftOrders ? data.giftOrders.length : 0).toString());
        }

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
            return res.status(400).json({ error: session.error ? session.error.message : 'Error al crear sesión de pago' });
        }

        return res.status(200).json({ id: session.id, url: session.url });
    } catch (err) {
        console.error('Error procesando checkout:', err);
        return res.status(500).json({ error: 'Error interno del servidor procesando el pago' });
    }
}
