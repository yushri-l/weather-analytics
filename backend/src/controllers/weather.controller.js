import { loadCityCodes } from "../services/weather.service.js";

export const getWeatherAnalytics = async (req, res) => {
  const cityCodes = loadCityCodes();

  res.json({
    totalCities: cityCodes.length,
    cityCodes
  });
};
  