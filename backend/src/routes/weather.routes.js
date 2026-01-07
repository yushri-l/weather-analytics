import { Router } from "express";
import { getWeatherAnalytics } from "../controllers/weather.controller.js";

const router = Router();

router.get("/", getWeatherAnalytics);

export default router;
