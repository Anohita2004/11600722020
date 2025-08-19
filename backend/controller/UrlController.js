import { Log } from "../middleware/logger.js";

const urlStore = new Map();   
const clickLogs = new Map();  

export const createShortUrl = (req, res) => {
  const { url, validity, shortcode } = req.body;

  if (!url || !shortcode) {
    Log("backend", "error", "shortener", "Missing url or shortcode");
    return res.status(400).json({ error: "Original URL and shortcode are required" });
  }

  const ttl = (validity || 30) * 60 * 1000;
  const expireAt = Date.now() + ttl;
  const createdAt = Date.now();

  urlStore.set(shortcode, { url, expireAt, createdAt, clicks: 0 });
  clickLogs.set(shortcode, []); 

  Log("backend", "info", "shortener", `Created shortcode ${shortcode} for ${url}`);

  res.json({
    shortUrl: `http://localhost:4000/${shortcode}`,
    createdAt,
    expiresAt: expireAt,
    expiresInMinutes: validity || 30,
  });
};

export const redirectUrl = (req, res) => {
  const { code } = req.params;
  const entry = urlStore.get(code);

  if (!entry) {
    Log("backend", "warn", "shortener", `Shortcode not found: ${code}`);
    return res.status(404).json({ error: "Short URL not found" });
  }

  if (Date.now() > entry.expireAt) {
    urlStore.delete(code);
    clickLogs.delete(code);
    Log("backend", "fatal", "shortener", `Expired shortcode: ${code}`);
    return res.status(410).json({ error: "Short URL expired" });
  }

  entry.clicks++;
  const source = req.headers["referer"] || req.ip || "unknown";
  clickLogs.get(code).push({ timestamp: Date.now(), source });

  Log("backend", "info", "shortener", `Redirecting ${code} -> ${entry.url}`);

  return res.redirect(entry.url);
};


export const getStats = (req, res) => {
  const stats = [];

  for (const [code, entry] of urlStore.entries()) {
    stats.push({
      shortUrl: `http://localhost:4000/${code}`,
      originalUrl: entry.url,
      createdAt: entry.createdAt,
      expiresAt: entry.expireAt,
      totalClicks: entry.clicks,
      clickDetails: clickLogs.get(code) || [],
    });
  }

  res.json(stats);
};
