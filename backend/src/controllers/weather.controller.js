import {
  loadCityCodes,
  fetchWeatherForCities
} from "../services/weather.service.js";
import { calculateComfortIndex } from "../services/comfortIndex.service.js";
import { getCache, setCache } from "../services/cache.service.js";

const PROCESSED_CACHE_TTL = 5 * 60 * 1000;

export const getWeatherAnalytics = async (req, res) => {
  try {
    const processedCache = getCache("processed_weather");

    if (processedCache) {
      return res.json({
        source: "cache",
        ...processedCache
      });
    }

    const cityCodes = loadCityCodes();
    const weatherData = await fetchWeatherForCities(cityCodes);

    const rankedCities = weatherData
      .map(city => ({
        city: city.name,
        description: city.weather[0].description,
        temperature: city.main.temp,
        comfortIndex: calculateComfortIndex(city)
      }))
      .sort((a, b) => b.comfortIndex - a.comfortIndex);

    const result = {
      totalCities: rankedCities.length,
      rankedCities
    };

    setCache("processed_weather", result, PROCESSED_CACHE_TTL);

    res.json({
      source: "api",
      ...result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
