import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://wzma38ggvg.execute-api.us-east-2.amazonaws.com/prod/weather?lat=${lat}&lon=${lon}`
      );
      setWeather(response.data);
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.");
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Enter latitude"
        />
        <input
          type="text"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="Enter longitude"
        />
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>Weather Information</h2>
          <p>
            <strong>Temperature:</strong> {weather.temperature}°
            {weather.temperatureUnit}
          </p>
          <p>
            <strong>Wind:</strong> {weather.windSpeed} {weather.windDirection}
          </p>
          <p>
            <strong>Conditions:</strong> {weather.shortForecast}
          </p>
          <p>
            <strong>Detailed Forecast:</strong> {weather.detailedForecast}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
