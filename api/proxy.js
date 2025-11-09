export default async function handler(req, res) {
  const target = "https://sweetshopbackend.infinityfreeapp.com" + req.url.replace("/api/proxy", "");

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...req.headers,
      },
      body: ["GET", "HEAD"].includes(req.method) ? undefined : req.body,
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy failed" });
  }
}
