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
      <div className="absolute inset-x-0 bottom-12 text-center">
        <div className="mx-auto max-w-3xl rounded-lg bg-white bg-opacity-75 p-6">
          <h1 className="text-center font-roboto text-3xl font-bold text-dark-soft">
            Il portale delle nazionali di calcio
          </h1>
          <p className="mt-4 text-center font-roboto text-xl">
            Un viaggio entusiasmante nel calcio internazionale, tra news,
            approfondimenti e interviste
          </p>
          <button className="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-white transition duration-300 hover:bg-primary hover:bg-opacity-75">
            Scopri di più <BiSolidSearchAlt2 className="ml-3" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
