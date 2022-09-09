import type { NextPage } from "next";
import Loader from "../components/Loader";
import WeatherApp from "../components/WeatherApp";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <div className="py-4 text-center text-3xl font-semibold bg-gray-300">
          Weather App
        </div>
        <WeatherApp />
      </div>
      <Loader />
    </>
  );
};

export default Home;
