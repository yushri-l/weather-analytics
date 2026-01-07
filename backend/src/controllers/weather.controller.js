import {
  loadCityCodes,
  fetchWeatherForCities
} from "../services/weather.service.js";

export const getWeatherAnalytics = async (req, res) => {
  try {
    const cityCodes = loadCityCodes();
    const weatherData = await fetchWeatherForCities(cityCodes);

    res.json({
      totalCities: weatherData.length,
      data: weatherData
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
