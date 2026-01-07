import fs from "fs";
import path from "path";

export const loadCityCodes = () => {
  const filePath = path.resolve("src/data/cities.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(rawData);

  if (!Array.isArray(data.List)) {
    throw new Error("cities.json must contain a List array");
  }

  return data.List
    .map(city => Number(city.CityCode))
    .filter(Boolean)
    .slice(0, 10);
};
