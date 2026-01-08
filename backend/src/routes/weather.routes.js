import { Router } from "express";
import { getWeatherAnalytics } from "../controllers/weather.controller.js";
import { getCacheStatus, clearCache } from "../services/cache.service.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router = Router();

router.get("/", authMiddleware, getWeatherAnalytics);

router.get("/cache/status", (req, res) => {
  res.json({ cachedKeys: getCacheStatus() });
});

router.get("/cache/clear", (req, res) => {
  clearCache();
  res.json({ message: "Cache cleared" });
});

export default router;
