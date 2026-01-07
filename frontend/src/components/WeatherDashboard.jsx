import { useEffect, useState } from "react";

const WeatherDashboard = () => {
  const [cities, setCities] = useState([]);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/weather")
      .then(res => res.json())
      .then(data => {
        setCities(data.rankedCities || []);
        setSource(data.source);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load weather data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div>
    <p><strong>Data source:</strong> {source}</p>
    
    {cities.map((city, index) => (
      <div
        key={city.city}
        style={{
          border: "1px solid #ccc",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "6px"
        }}
      >
        <strong>#{index + 1} {city.city}</strong>
        <p>{city.description}</p>
        <p>Temperature: {city.temperature} °C</p>
        <p>Comfort Index: {city.comfortIndex}</p>
      </div>
    ))}
  </div>
);

};

export default WeatherDashboard;
