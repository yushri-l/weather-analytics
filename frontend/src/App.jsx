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

  /* =========================
     UNAUTHENTICATED VIEW
     ========================= */
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--card-bg)",
            padding: "36px",
            borderRadius: "16px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
            width: "100%",
            maxWidth: "460px",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              backgroundColor: "transparent",
              border: "1px solid var(--muted-text)",
              borderRadius: "999px",
              padding: "6px 10px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <h1 style={{ marginBottom: "6px" }}>
            Live Weather
          </h1>

          <p
            style={{
              color: "var(--muted-text)",
              marginBottom: "28px",
            }}
          >
            How Comfortable Is Your City?
          </p>

          <button
            style={{
              width: "100%",
              padding: "12px",
            }}
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     AUTHENTICATED VIEW
     ========================= */
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
          <h1>Live Weather</h1>
          <p style={{ color: "var(--muted-text)", marginTop: "4px" }}>
            How Comfortable Is Your City?
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

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
        </div>
      </header>

      <WeatherDashboard />
    </div>
  );
}

export default App;
