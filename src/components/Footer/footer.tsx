import React, { useEffect, useState } from "react";
import { WeatherItem, WeatherResponse } from "../../types";
import './style.css'

interface Props {
  city?: WeatherResponse;
}

interface WeatherData {
  date: string;
  minTemp: number | null;
  maxTemp: number | null;
  weather: string;
}

const baseUrl = "https://api.openweathermap.org/data/2.5/forecast?";
const key = "&cnt=40&appid=6db318e745d1d1fe15732dd5e22d6eaf";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Footer: React.FC<Props> = ({ city }) => {
  const [loadedData, setLoadedData] = useState<WeatherItem[]>([]);
  const [forecast, setForecast] = useState<WeatherData[]>([]);

  const getDay = (time: string) => {
    const date = new Date(time);
    const day = date.getDay();
    return daysOfWeek[day];
  };

  const avarageTemp = () => {
    let weekObj: Record<string, WeatherItem[]> = daysOfWeek.reduce(
      (acc, day) => {
        acc[day] = [];
        return acc;
      },
      {}
    );
  
    for (const key in weekObj) {
      weekObj[key] = loadedData.filter((el) => getDay(el.dt_txt) === key);
  
      if (weekObj[key].length < 1) {
        delete weekObj[key];
      }
    }
  
    const updatedWeekObj = Object.keys(weekObj).reduce((acc, key) => {
      const temps = weekObj[key].map((el) => ({
        temp_min: el.main.temp_min,
        temp_max: el.main.temp_max,
        date: el.dt_txt.split(" ")[0],
        weather: el.weather[0].main
      }));
  
      if (temps.length > 0) {
        const minTemp = Math.min(...temps.map((temp) => temp.temp_min));
        const maxTemp = Math.max(...temps.map((temp) => temp.temp_max));
        const date = temps[0].date;
        const weather = temps[0].weather;
  
        acc.push({
          date,
          minTemp,
          maxTemp,
          weather,
        });
      }
  
      return acc;
    }, [] as WeatherData[]);
  
    if (updatedWeekObj.length > 5) {
      updatedWeekObj.pop();
    }
  
    setForecast(
      updatedWeekObj.sort(
        (a, b) =>
          Number(a.date.replace(/-/g, "")) - Number(b.date.replace(/-/g, ""))
      )
    );
  };

  const celsius = (value: number | undefined | null) => {
    if (value != null) {
      return Math.round(value - 273.15).toString() + "°C";
    }
    return "";
  };

  useEffect(() => {
    if (city) {
      const lat = `lat=${city.coord.lat}`;
      const lon = `&lon=${city.coord.lon}`;

      fetch(`${baseUrl}${lat}${lon}${key}`)
        .then((res) => res.json())
        .then((data) => setLoadedData(data.list))
        .catch((error) => console.log("Could not load data:", error));
    }
  }, [city]);

  useEffect(() => {
    avarageTemp();
  }, [loadedData]);

  console.log(forecast);

  return (
    <div className="footer">
      {forecast.map((day) => (
        <div key={day.date} className="footer_card">
          <p className="description">{getDay(day.date)}</p>
          <div className="footer_container">
            <div className="footer_box">
              <span>min</span>
              <p>{celsius(day.minTemp)}</p>
            </div>
            <div className="footer_box">
              <span>max</span>
              <p>{celsius(day.maxTemp)}</p>
            </div>
          </div>
          <img
            className="weather_title"
            src={`/img/${day.weather}.png`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};
