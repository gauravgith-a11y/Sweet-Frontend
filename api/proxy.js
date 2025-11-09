import axios from "axios";

export default async function handler(req, res) {
  const targetURL = "https://sweetshopbackend.infinityfreeapp.com" + req.url.replace("/api/proxy", "");
  
  try {
    const response = await axios({
      url: targetURL,
      method: req.method,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
      },
      data: req.body,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Proxy error:", error.response?.status, error.response?.data);
    res.status(error.response?.status || 500).json({
      message: "Proxy request failed",
      error: error.response?.data || error.message,
    });
  }
}
