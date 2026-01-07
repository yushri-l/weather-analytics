import {
  loadCityCodes,
  fetchWeatherForCities
} from "../services/weather.service.js";

import { calculateComfortIndex } from "../services/comfortIndex.service.js";

export const getWeatherAnalytics = async (req, res) => {
  try {
    const cityCodes = loadCityCodes();
    const weatherData = await fetchWeatherForCities(cityCodes);

    const processed = weatherData.map(city => ({
      city: city.name,
      description: city.weather[0].description,
      temperature: city.main.temp,
      comfortIndex: calculateComfortIndex(city)
    }));

    processed.sort((a, b) => b.comfortIndex - a.comfortIndex);

    res.json({
      totalCities: processed.length,
      rankedCities: processed
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
