import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "./Assets/search.png";
import cloud_icon from "./Assets/cloud.png";
import clear_icon from "./Assets/clear.png";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import wind_icon from "./Assets/wind.png";
import humidity_icon from "./Assets/humidity.png";

const WeatherApp = () => {
  const api_key = "618a4bdce924bce7ae1515ccee5fc603";
  const [weatherData, setWeatherData] = useState({
    humidity: "64%",
    wind: "18 km/h",
    temperature: "24°C",
    location: "London",
    icon: "01d", // Default icon
  });
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const cityInput = document.querySelector(".cityInput").value;

    if (!cityInput) {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        humidity: `${data.main.humidity} %`,
        wind: `${Math.floor(data.wind.speed)} km/h`,
        temperature: `${Math.floor(data.main.temp)} °C`,
        location: data.name,
        icon: data.weather[0].icon,
      });

      updateWeatherIcon(data.weather[0].icon);
      //   setCityInput("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const updateWeatherIcon = (icon) => {
    switch (icon) {
      case "01d":
      case "01n":
        setWicon(clear_icon);
        break;
      case "02d":
      case "02n":
        setWicon(cloud_icon);
        break;
      case "03d":
      case "03n":
        setWicon(drizzle_icon);
        break;
      case "04d":
      case "04n":
        setWicon(drizzle_icon);
        break;
      case "09d":
      case "09n":
        setWicon(rain_icon);
        break;
      case "10d":
      case "10n":
        setWicon(rain_icon);
        break;
      case "13d":
      case "13n":
        setWicon(snow_icon);
        break;
      default:
        setWicon(cloud_icon);
        break;
    }
  };

  return (
    <>
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="Search " />
          <div className="search-icon" onClick={search}>
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">{weatherData.temperature}</div>
        <div className="weather-location">{weatherData.location}</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">{weatherData.humidity}</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">{weatherData.wind}</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
        <p className="copywrite">Copyright©2024 vscode</p>
      </div>
    </>
  );
};

export default WeatherApp;
