import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const getComfortColor = (score) => {
  if (score >= 85) return "#15803d";
  if (score >= 70) return "#4ade80";
  if (score >= 55) return "#fca5a5";
  if (score >= 40) return "#ef4444";
  return "#7f1d1d";
};

const WeatherDashboard = ({ onSourceUpdate }) => {
  const [cities, setCities] = useState([]);
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

        if (!response.ok) throw new Error("Unauthorized");

        const data = await response.json();
        setCities(data.rankedCities || []);
        onSourceUpdate?.(data.source);
      } catch {
        setError("Unable to load weather analytics");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [getAccessTokenSilently, onSourceUpdate]);

  if (loading) return <p>Loading weather analytics…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",   // center cards horizontally
        gap: "10px",
      }}
    >
      {cities.map((city, index) => (
        <div
          key={city.city}
          style={{
            width: "100%",
            maxWidth: "760px",   // 🔑 controls horizontal length
            backgroundColor: "var(--card-bg)",
            color: "var(--text-color)",
            borderRadius: "8px",
            padding: "10px 14px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          {/* Single compact row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <strong style={{ fontSize: "14px" }}>
                #{index + 1} {city.city}
              </strong>

              <span style={{ fontSize: "13px", color: "var(--muted-text)" }}>
                🌡 {city.temperature} °C
              </span>
            </div>

            <span
              style={{
                padding: "3px 9px",
                borderRadius: "999px",
                backgroundColor: getComfortColor(city.comfortIndex),
                color: "white",
                fontSize: "12px",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {city.comfortIndex}
            </span>
          </div>

          {city.description && (
            <div
              style={{
                fontSize: "12px",
                color: "var(--muted-text)",
                marginTop: "4px",
              }}
            >
              {city.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeatherDashboard;
