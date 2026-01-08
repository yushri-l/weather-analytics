import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const WeatherDashboard = () => {
  const [cities, setCities] = useState([]);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });

        const response = await fetch("http://localhost:5000/api/weather", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const data = await response.json();

        setCities(data.rankedCities || []);
        setSource(data.source);
        setLoading(false);
      } catch (err) {
        setError("Unauthorized or failed to load weather data");
        setLoading(false);
      }
    };

    loadWeather();
  }, [getAccessTokenSilently]);

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
            borderRadius: "6px",
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
