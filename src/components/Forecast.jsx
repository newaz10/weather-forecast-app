import { useEffect, useState } from "react";
import "./forecast.css";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Forecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Get current weather
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const currentResponse = await fetch(currentUrl);
      const currentData = await currentResponse.json();

      // Get 5-day forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastResult = await forecastResponse.json();

      if (!currentData || !currentData.weather || !currentData.main) {
        throw new Error("Invalid weather data received.");
      }

      // Process forecast data (group by day)
      const dailyForecast = {};
      forecastResult.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyForecast[date]) {
          dailyForecast[date] = {
            date,
            temp: item.main.temp,
            icon: item.weather[0].icon,
            description: item.weather[0].description,
          };
        }
      });

      setWeatherData({
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind.speed,
        temperature: Math.floor(currentData.main.temp),
        location: currentData.name,
        icon: allIcons[currentData.weather[0].icon] || clear_icon,
      });

      setForecastData(Object.values(dailyForecast).slice(0, 5));
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search("Dhaka");
  }, []);

  return (
    <div className="weather-container">
      <div className="weather-card">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search(city)}
          />
          <button onClick={() => search(city)}>
            <img src={search_icon} alt="search" />
          </button>
        </div>

        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {weatherData && (
              <div className="current-weather">
                <div className="weather-header">
                  <img
                    src={weatherData.icon}
                    alt={weatherData.description}
                    className="main-icon"
                  />
                  <div>
                    <h1>{weatherData.temperature}°C</h1>
                    <p>{weatherData.location}</p>
                  </div>
                </div>

                <div className="weather-details">
                  <div className="detail-item">
                    <img src={humidity_icon} alt="humidity" />
                    <div>
                      <h3>{weatherData.humidity}%</h3>
                      <p>Humidity</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <img src={wind_icon} alt="wind" />
                    <div>
                      <h3>{weatherData.windSpeed} km/h</h3>
                      <p>Wind Speed</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="forecast-section">
              <h2>5-Day Forecast</h2>
              <div className="forecast-grid">
                {forecastData.map((day, index) => (
                  <div key={index} className="forecast-card">
                    <p className="forecast-day">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <img
                      src={allIcons[day.icon] || clear_icon}
                      alt={day.description}
                      className="forecast-icon"
                    />
                    <div className="forecast-temp">
                      <p>{Math.floor(day.temp)}°C</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Forecast;
