import { useAuth0 } from "@auth0/auth0-react";
import WeatherDashboard from "./components/WeatherDashboard";

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    isLoading,
    user,
  } = useAuth0();

  if (isLoading) {
    return <p>Loading authentication...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Weather Comfort Analytics</h1>

      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>
          Log In
        </button>
      )}

      {isAuthenticated && (
        <>
          <p>Welcome, {user.email}</p>

          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>

          <WeatherDashboard />
        </>
      )}
    </div>
  );
}

export default App;
