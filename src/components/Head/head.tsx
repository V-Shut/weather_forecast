import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, WeatherResponse, Place } from "../../types";
import { addToFavorites } from "../../Redux/favoritesSlice";
import './style.css'

interface Props {
  city?: WeatherResponse;
  loadData: (lat: string, lon: string) => void;
}

const baseUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
const key = "&limit=8&appid=6db318e745d1d1fe15732dd5e22d6eaf";

export const Head: React.FC<Props> = ({ city, loadData }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [availableCities, setAvailableCities] = useState<Place[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !!availableCities.length) {
      loadData(availableCities[0].lat.toString(), availableCities[0].lon.toString());
      dispatch(addToFavorites(availableCities[0]));
      setAvailableCities([]);
      setSearchFocused(false);
    }
  }

  const searchCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value;
    setInputValue(city);
    setSearchFocused(true);
    fetch(`${baseUrl}${city}${key}`)
      .then((res) => res.json())
      .then((data) => setAvailableCities(data))
      .catch((error) => console.error("Could not load data:", error));
  };

  return (
    <div className="head">
      <div className="logo_container">
        <img src="img/logo.png" alt="logo" className="logo" />
        <h1 className="city_name">{city?.name}</h1>
      </div>
      <div className="search_wrap">
        <input
          type="text"
          className="search"
          placeholder="City"
          value={inputValue}
          onChange={searchCity}
          onClick={() => setSearchFocused(true)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setTimeout(() => {
              setSearchFocused(false);
            }, 200);
          }}
          style={(searchFocused && (!!availableCities.length || !!favorites.length)) ? { borderBottomRightRadius: '0px', borderBottomLeftRadius: '0px'} : {}}
        />
        <ul className="list">
          {!!availableCities.length &&
            searchFocused &&
            availableCities.map((place) => (
              <li
                className="list_element"
                key={`${place.lat}-${place.lon}`}
                onClick={() => {
                  loadData(place.lat.toString(), place.lon.toString());
                  dispatch(addToFavorites(place));
                  setAvailableCities([]);
                }}
              >{`${place.name}, ${
                place.state ? place.state : place.country
              }`}</li>
            ))}
          {favorites &&
            !availableCities.length &&
            searchFocused &&
            favorites.map((place, index) => (
              <li
                className="list_element"
                key={`${place.name}-${index}`}
                onClick={() => {
                  loadData(place.lat.toString(), place.lon.toString());
                  dispatch(addToFavorites(place));
                  setAvailableCities([]);
                }}
              >
                {`${place.name}, ${place.state ? place.state : place.country}`}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
