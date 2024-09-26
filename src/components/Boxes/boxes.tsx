import React from "react";
import { WeatherResponse } from "../../types";
import "./style.css";

interface City {
  city: WeatherResponse | undefined;
}

export const Boxes: React.FC<City> = ({ city }) => {
  const celsius = (value: number | undefined) => {
    if (value) {
      return Math.round(value - 273.15).toString() + "°C";
    }

    return;
  };

  console.log(city);

  return (
    <div className="box">
      <div className="box_child">
        <div className="other_params">
          <img
            className="weather_title"
            src={`/img/${city?.weather[0].main}.png`}
            alt="weather_image"
          />
          <h1 className="title">{city?.weather[0].main}</h1>
        </div>
        <div className="other_params">
          <p className="description">Current</p>
          <h1 className="title">{celsius(city?.main.temp)}</h1>
        </div>
      </div>
      <div className="box_child">
        <div className="other_params">
          <p className="description">Feels</p>
          <h1 className="title">{celsius(city?.main.feels_like)}</h1>
        </div>
        <div className="other_params">
          <p className="description">Wind</p>
          <h1 className="title">{city?.wind.speed}ms</h1>
        </div>
        <div className="other_params">
          <p className="description">Pressure</p>
          <h1 className="title">{city?.main.pressure}Pa</h1>
        </div>
        <div className="other_params">
          <p className="description">Humidity</p>
          <h1 className="title">{city?.main.humidity}%</h1>
        </div>
      </div>
    </div>
  );
};
