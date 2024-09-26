export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherResponse {
  coord: Coord;
  weather: Weather[];
  main: Main;
  wind: Wind;
  clouds: Clouds;
  sys: Sys;
  name: string;
}

export interface LocalNames {
  [key: string]: string;
}

export interface Place {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface RootState {
  favorites: {
    favorites: Place[];
  };
}

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherClouds {
  all: number;
}

interface WeatherWind {
  speed: number;
  deg: number;
  gust: number;
}

interface WeatherSys {
  pod: string;
}

export interface WeatherItem {
  dt: number;
  main: WeatherMain;
  weather: WeatherDescription[];
  clouds: WeatherClouds;
  wind: WeatherWind;
  visibility: number;
  pop: number;
  sys: WeatherSys;
  dt_txt: string;
}

export enum WeatherCondition {
  Clear = "Clear",
  Clouds = "Clouds",
  Rain = "Rain",
  Drizzle = "Drizzle",
  Thunderstorm = "Thunderstorm",
  Snow = "Snow",
  Atmosphere = "Atmosphere",
  Mist = "Mist",
  Smoke = "Smoke",
  Haze = "Haze",
  Dust = "Dust",
  Fog = "Fog",
  Sand = "Sand",
  Ash = "Ash",
  Squall = "Squall",
  Tornado = "Tornado",
}
