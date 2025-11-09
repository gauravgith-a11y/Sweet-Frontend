export default async function handler(req, res) {
    try {
        const apiUrl = 'https://sweetshopbackend.infinityfreeapp.com' + req.url;

        const response = await fetch(apiUrl, {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization || '',
            },
            body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
        });

        const text = await response.text();
        res.status(response.status).send(text);
    } catch (err) {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy failed', details: err.message });
    }
}
