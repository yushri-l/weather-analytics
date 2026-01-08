import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import WeatherDashboard from "./components/WeatherDashboard";

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user,
  } = useAuth0();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (isLoading) {
    return <p style={{ padding: "24px" }}>Loading authentication…</p>;
  }

  return (
    <div className="container">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1>🌦 Weather Comfort Analytics</h1>
          <p style={{ color: "var(--muted-text)", marginTop: "4px" }}>
            Global comfort ranking dashboard
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {!isAuthenticated ? (
            <button onClick={() => loginWithRedirect()}>
              Log In
            </button>
          ) : (
            <>
              <span style={{ fontSize: "14px" }}>
                {user.email}
              </span>
              <button
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </header>

      {isAuthenticated ? (
        <WeatherDashboard />
      ) : (
        <p style={{ color: "var(--muted-text)" }}>
          Please log in to view weather comfort analytics.
        </p>
      )}
    </div>
  );
}

export default App;
