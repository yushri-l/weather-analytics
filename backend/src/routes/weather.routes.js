import { Router } from "express";
import { getWeatherAnalytics } from "../controllers/weather.controller.js";
import { getCacheStatus } from "../services/cache.service.js";

const router = Router();

router.get("/", getWeatherAnalytics);

router.get("/cache/status", (req, res) => {
  res.json({
    cachedKeys: getCacheStatus()
  });
});

export default router;
