import { ICity, ICoordinates } from "./../components/interfaces/IData";
import { weatherService } from "./../pages/api/ServiceInitializer";
import { action, makeObservable, observable } from "mobx";

class WeatherStore {
  isLoading: boolean = false;

  temperature: number;
  weatherType: string;

  constant: number = 273.15;

  cityData: ICity = {
    cityName: "",
  };
  weatherCoordinates: ICoordinates = {
    lat: 0.0,
    lon: 0.0,
  };

  constructor() {
    this.temperature = 0;
    this.weatherType = "";

    makeObservable(this, {
      isLoading: observable,
      temperature: observable,
      weatherType: observable,
      cityData: observable,
      weatherCoordinates: observable,
      setIsLoading: action,
      setCity: action,
      getLatAndLon: action,
      setLatAndLon: action,
      setWeatherURL: action,
      setTemperature: action,
      setWeatherType: action,
    });
  }

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  setCity(city: string) {
    this.cityData.cityName = city;
  }

  async getLatAndLon(city: string) {
    try {
      this.setIsLoading(true);
      this.setCity(city);
      this.weatherCoordinates = await weatherService.getLatAndLon(city);
    } catch (error: any) {
      throw new Error(error.toString());
    } finally {
      this.setIsLoading(false);
    }
  }

  setLatAndLon(data: ICoordinates) {
    this.weatherCoordinates.lat = data.lat;
    this.weatherCoordinates.lon = data.lon;
  }

  async setWeatherURL() {
    try {
      this.setIsLoading(true);
      const weather = await weatherService.setWeatherURL();
      this.setTemperature(weather.main.temp);
      this.setWeatherType(weather.weather[0].description);
    } catch (error: any) {
      throw new Error(error.toString());
    } finally {
      this.setIsLoading(false);
    }
  }

  setTemperature(dataT: number) {
    try {
      this.setIsLoading(true);
      const temperatureInCelcius = (dataT - this.constant).toFixed(2);
      this.temperature = Number(temperatureInCelcius);
    } catch (error: any) {
      throw new Error(error.toString());
    } finally {
      this.setIsLoading(false);
    }
  }

  setWeatherType(dataW: string) {
    this.weatherType = dataW;
  }
}

export default WeatherStore;
