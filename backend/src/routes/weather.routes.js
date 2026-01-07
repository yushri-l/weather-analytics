import { Router } from "express";
import { getWeatherAnalytics } from "../controllers/weather.controller.js";
import { getCacheStatus, clearCache } from "../services/cache.service.js";

const router = Router();

router.get("/", getWeatherAnalytics);

router.get("/cache/status", (req, res) => {
  res.json({ cachedKeys: getCacheStatus() });
});

router.get("/cache/clear", (req, res) => {
  clearCache();
  res.json({ message: "Cache cleared" });
});

export default router;
