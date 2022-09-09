import { weatherStore } from "./../../store/StoreInit";
import axios, { AxiosResponse } from "axios";

class WeatherService {
  baseGeocodeURL: string = "http://api.openweathermap.org/geo/1.0";
  limit: number;

  baseOpenWeatherURL: string = "https://api.openweathermap.org/data/2.5";

  constructor() {
    this.limit = 1;
  }

  async getLatAndLon(city: string) {
    const geocodeURL = `${this.baseGeocodeURL}/direct?q=${city}&limit=${this.limit}&appid=${process.env.NEXT_PUBLIC_GEOCODE_KEY}`;

    const response: AxiosResponse = await axios.get(geocodeURL);

    return response.data[0];
  }

  async setWeatherURL() {
    const openWeatherURL = `${this.baseOpenWeatherURL}/weather?lat=${weatherStore.weatherCoordinates.lat}&lon=${weatherStore.weatherCoordinates.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

    const response: AxiosResponse = await axios.get(openWeatherURL);

    return response.data;
  }
}

export default WeatherService;
