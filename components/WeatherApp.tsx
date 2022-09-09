import React, { useState } from "react";
import { weatherStore } from "../store/StoreInit";

const WeatherApp = () => {
  const [cityInput, setCityInput] = useState<string>("");
  const [tempValue, setTempValue] = useState<number>(0);
  const [weatherTypeValue, setWeatherTypeValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [cityValue, setCityValue] = useState<string>("");

  const fetchWeather = async() => {
    if (cityInput !== "") {
      await weatherStore
        .getLatAndLon(cityInput)
        .then(async () => {
          await weatherStore.setWeatherURL();
        })
        .catch(() => {
          setMessage("Not Found");
        });

      setCityValue(weatherStore.cityData.cityName);
      setTempValue(weatherStore.temperature);
      setWeatherTypeValue(weatherStore.weatherType);
      setCityInput("");
    } else {
      setMessage("Empty Value Cannot be searched!");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 mt-10 mx-8">
        <input
          onChange={(e) => {
            setCityInput(e.target.value);
          }}
          type="text"
          value={cityInput}
          placeholder="Type the City Name"
          className="w-full text-lg border-b-2 border-gray-400 focus:outline-none focus:border-blue-600"
        />
        <button
          onClick={() => {
            fetchWeather();
          }}
          className="inline-flex mx-auto px-3 py-1.5 max-w-max rounded-lg shadow-md text-white text-base bg-blue-500 hover:bg-blue-400"
        >
          Get Weather
        </button>
      </div>
      <div className="grid w-screen h-[40vh] place-content-center">
        {message ? (
          <div className="mt-10 p-6 flex justify-center text-xl font-medium tracking-wider capitalize bg-red-200">
            {message}
          </div>
        ) : (
          <>
            <div className="my-10 p-6 rounded-md shadow-sm bg-gray-200">
              <div className="flex gap-5 justify-center text-3xl font-bold capitalize">
                {cityValue}
              </div>
              <div className="mt-6">
                <div className="flex flex-row gap-3 justify-center items-center">
                  <div>Temperature:</div>
                  <div>{tempValue}</div>
                </div>
                <div className="flex flex-row gap-3 justify-center items-center">
                  <div>Weather Type:</div>
                  <div className="capitalize">{weatherTypeValue}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
