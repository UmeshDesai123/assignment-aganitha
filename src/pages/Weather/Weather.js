import React, { useEffect, useState } from 'react';
import './style.css';
import { getCoordinates, getWeather } from '../../utils/api';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const coordinates = await getCoordinates(city);
      if (coordinates) {
        const data = await getWeather(coordinates.lat, coordinates.lon);
        setWeatherData(data);
        console.log(data)
      } else {
        alert("City not found. Please try another.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='weather-container'>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Search for Weather"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>Get Weather</button>

      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div className='data-container'>
          <h3>Weather Data for {city}</h3>
          <p>Temperature: {weatherData.hourly?.temperature_2m[weatherData.hourly?.temperature_2m.length - 1]}°C</p>
          <p>Precipitation: {weatherData.hourly?.precipitation[weatherData.hourly?.precipitation.length-1]} mm</p>
        </div>
      ) : null}
    </div>
  )
}

export default Weather;