import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const getComfortColor = (score) => {
  if (score >= 80) return "#16a34a";
  if (score >= 60) return "#f59e0b";
  return "#dc2626";
};

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

        const response = await fetch(
          "http://localhost:5000/api/weather",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Unauthorized");

        const data = await response.json();
        setCities(data.rankedCities || []);
        setSource(data.source);
      } catch (err) {
        setError("Unable to load weather analytics");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [getAccessTokenSilently]);

  if (loading) return <p>Loading weather analytics…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <p style={{ marginBottom: "20px", color: "var(--muted-text)" }}>
        Data source: <strong>{source}</strong>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        {cities.map((city, index) => (
          <div
            key={city.city}
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--text-color)",
              borderRadius: "10px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <strong>
                #{index + 1} {city.city}
              </strong>

              <span
                style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  backgroundColor: getComfortColor(city.comfortIndex),
                  color: "white",
                }}
              >
                {city.comfortIndex}
              </span>
            </div>

            <p style={{ margin: "6px 0", color: "var(--muted-text)" }}>
              {city.description}
            </p>

            <p style={{ margin: "6px 0" }}>
              🌡 Temperature:{" "}
              <strong>{city.temperature} °C</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;
