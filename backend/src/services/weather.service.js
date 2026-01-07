import fs from "fs";
import path from "path";
import { get } from "../utils/httpClient.js";
import { getCache, setCache } from "./cache.service.js";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const loadCityCodes = () => {
  const filePath = path.resolve("src/data/cities.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(rawData);

  return data.List.map(city => Number(city.CityCode)).filter(Boolean);
};

export const fetchWeatherForCities = async (cityCodes) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const requests = cityCodes.map(async (cityId) => {
    const cacheKey = `weather_${cityId}`;
    const cached = getCache(cacheKey);

    if (cached) {
      return cached;
    }

    const url = `${API_URL}?id=${cityId}&appid=${apiKey}&units=metric`;
    const data = await get(url);

    setCache(cacheKey, data, WEATHER_CACHE_TTL);
    return data;
  });

  return Promise.all(requests);
};
