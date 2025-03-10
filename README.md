# Weather Forecast App

This project is a weather forecast application built with React that allows users to effortlessly check the current weather conditions and a **5-day weather forecast** for cities around the globe. By leveraging real-time data from the OpenWeatherMap API, it provides essential information such as temperature, humidity, wind speed, and overall weather status, ensuring a smooth and dynamic experience for users.

## Features

- **Real-Time Weather Data:** Fetches data such as temperature, humidity, wind speed, and weather conditions using the OpenWeatherMap API.
- **5-Day Weather Forecast:** Displays a detailed 5-day weather forecast, including daily temperatures and weather conditions.
- **Dynamic Weather Search:** Users can search for any city's weather conditions.
- **Location-Based Weather Fetch:** Automatically detects the user's location using the Geolocation API. Falls back to a default city ("Dhaka") if geolocation fails or is denied.
- **Improved Error Handling:** Displays clear alerts for invalid cities or API errors, ensuring a better user experience.
- **Loading Animations:** Smooth spinner animations during data fetches.
- **Icon-Based Weather Display:** Displays icons based on the current weather conditions.
- **Responsive UI:** Ensures a seamless user experience on devices of all sizes.

## Tech Stack

- **React**: Used for building the user interface with hooks for state management and lifecycle methods.
- **OpenWeatherMap API**: Provides real-time weather data.
- **Geolocation API**: Enables location-based weather fetching.

## Setup and Installation

### Prerequisites

- Node.js (>=14.x)
- npm or yarn

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a .env file in the root directory and add your OpenWeatherMap API key:**
   ```bash
   VITE_APP_ID=your_openweathermap_api_key
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Open the app in your browser at [http://localhost:5173](http://localhost:5173)**

## File Structure

```plaintext
weather-forecast-app/
├── public/                  # Static assets
├── src/                     # Source files
│   ├── assets/              # Icons
│   ├── components/          # React components
│   ├── App.jsx              # Root component
│   ├── index.css            # Global CSS file
│   ├── main.jsx             # Entry point
└── .env                     # Environment variables
```

## Components

### Forecast.jsx

The main component that handles:

- Fetching weather data using the OpenWeatherMap API.
- Managing application state, including loading, error messages, and weather data.
- Automatically detecting the user's location using the Geolocation API and fetching weather data for their current location. Falls back to a default city ("Dhaka") if geolocation fails or is denied.
- Improved error handling to display meaningful alerts for invalid cities or API errors.
- Displaying a **5-day weather forecast**, grouping forecast data by day to provide daily temperatures and weather conditions.
- Dynamically rendering weather information, including current weather details and forecast data.

### forecast.css

Styles for the weather forecast application, including:

- Animations (e.g., loading spinner, floating weather icons).
- Responsive design

## Conclusion

This weather forecast app provides a user-friendly interface for checking real-time weather conditions and a **5-day weather forecast**. With features like location-based weather fetching, improved error handling, and responsive design, it ensures a seamless and intuitive experience for users.

If you encounter any issues, have suggestions for improvement, or would like to contribute, feel free to open an issue or create a pull request.
