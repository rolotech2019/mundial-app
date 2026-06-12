export default async function handler(req, res) {
  // Habilitar CORS para cualquier origen (o solo para tu app)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Obtener el endpoint desde la URL (ej: /competitions/WC/matches)
  const endpoint = req.url;
  const apiUrl = `https://api.football-data.org/v4${endpoint}`;
  const API_KEY = '8cff69db270e4e4e9ea61503994ef780';

  try {
    const response = await fetch(apiUrl, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el proxy' });
  }
}