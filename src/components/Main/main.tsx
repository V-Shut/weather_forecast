import React, { useEffect, useState } from "react";
import { Boxes } from "../Boxes/boxes";
import { Footer } from "../Footer/footer";
import { Head } from "../Head/head";
import { WeatherResponse } from "../../types";
import './style.css'

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const baseLat = "50.4500336";
const baseLon = "30.5241361";
const key = "&appid=6db318e745d1d1fe15732dd5e22d6eaf";

export const Main = () => {
  const [city, setCity] = useState<WeatherResponse | undefined>(undefined);

  const loadData = (
    lat: string,
    lon: string,
    apiKey: string = key,
    url: string = baseUrl
  ) => {
    fetch(`${url}lat=${lat}&lon=${lon}${apiKey}`)
      .then((res) => res.json())
      .then((data) => setCity(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  };

  useEffect(() => {
    loadData(baseLat, baseLon);
  }, []);

  return (
    <div className="container">
      <div className="square">
        <Head city={city} loadData={loadData} />
        <Boxes city={city} />
        <Footer city={city} />
      </div>
    </div>
  );
};
