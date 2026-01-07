import fs from "fs";
import path from "path";
import { get } from "../utils/httpClient.js";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const loadCityCodes = () => {
  const filePath = path.resolve("src/data/cities.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(rawData);

  return data.List
    .map(city => Number(city.CityCode))
    .filter(Boolean)
    .slice(0, 10);
};

export const fetchWeatherForCities = async (cityCodes) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const requests = cityCodes.map(cityId => {
    const url = `${API_URL}?id=${cityId}&appid=${apiKey}&units=metric`;
    return get(url);
  });

  return Promise.all(requests);
};
