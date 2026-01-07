export const calculateComfortIndex = (weather) => {
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const clouds = weather.clouds.all;

  const tempScore = Math.max(0, 100 - Math.abs(temp - 22) * 3);
  const humidityScore = Math.max(0, 100 - Math.abs(humidity - 50) * 2);
  const windScore = Math.max(0, 100 - Math.abs(wind - 3) * 10);
  const cloudScore = Math.max(0, 100 - Math.abs(clouds - 40) * 1.5);

  const comfortIndex =
    tempScore * 0.4 +
    humidityScore * 0.3 +
    windScore * 0.2 +
    cloudScore * 0.1;

  return Math.round(comfortIndex);
};
