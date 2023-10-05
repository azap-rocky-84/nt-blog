import React from "react";
import { BiSolidSearchAlt2 } from "react-icons/bi";
import { images } from "../../../constants";
const Hero = () => {
  return (
    <section className="relative">
      <video
        className="m-0 w-full p-0"
        src={images.BackgroundVideo}
        muted
        autoPlay
        loop
        type="video/mp4"
      ></video>

      <div className="inset-x-0 bottom-12 text-center md:absolute lg:absolute">
        <div className="mx-auto max-w-3xl rounded-lg bg-white bg-opacity-75 p-6 md:max-w-2xl">
          <h1 className="text-center font-roboto text-3xl font-bold text-dark-soft">
            Il portale delle nazionali di calcio
          </h1>
          <p className="mt-4 text-center font-roboto text-xl sm:text-sm md:text-lg">
            Un viaggio entusiasmante nel calcio internazionale, tra news,
            approfondimenti e interviste
          </p>
          <button className="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-white transition duration-300 hover:border-2 hover:border-primary hover:bg-transparent hover:text-primary">
            Scopri di più <BiSolidSearchAlt2 className="ml-3" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
