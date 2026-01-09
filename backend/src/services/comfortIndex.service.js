export const calculateComfortIndex = (weather) => {
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;

  const tempScore = Math.max(0, 100 - Math.abs(temp - 22) * 3);
  const humidityScore = Math.max(0, 100 - Math.abs(humidity - 50) * 2);
  const windScore = Math.max(0, 100 - Math.abs(wind - 3) * 10);
  

  const comfortIndex =
    tempScore * 0.45 +
    humidityScore * 0.33 +
    windScore * 0.22;

  return Math.round(comfortIndex);
};
