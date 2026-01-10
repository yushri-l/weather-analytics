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

  const [source, setSource] = useState("");

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
    <div>
      {/* NAV BAR */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "var(--card-bg)",
          borderBottom: "1px solid var(--muted-text)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Data source */}
        <div style={{ fontSize: "13px", color: "var(--muted-text)" }}>
          {source && (
            <>
              Data source: <strong>{source}</strong>
            </>
          )}
        </div>

        {/* Center: Title */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "18px" }}>
            Live Weather
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "var(--muted-text)",
            }}
          >
            How Comfortable Is Your City?
          </p>
        </div>

        {/* Right: Actions */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={toggleTheme}
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--muted-text)",
              borderRadius: "999px",
              padding: "6px 10px",
              fontSize: "14px",
            }}
          >
            {theme === "light" ? "🌙" : "☀️"}
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
      </nav>

      {/* CONTENT */}
      <div className="container" style={{ paddingTop: "24px" }}>
        <WeatherDashboard onSourceUpdate={setSource} />
      </div>
    </div>
  );
}

export default App;
