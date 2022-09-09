import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "../public/LoadingIcon.gif";
import { observer } from "mobx-react-lite";
import { weatherStore } from "../store/StoreInit";

const Loader = observer(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(weatherStore.isLoading);
  }, [weatherStore.isLoading]);

  return (
    <div className={`flex justify-center ${!isLoading && "hidden"}`}>
      <Image src={Loading} alt="Loading..." width={250} height={150}/>
    </div>
  );
});

export default Loader;
