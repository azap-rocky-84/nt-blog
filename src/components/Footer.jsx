import React from "react";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsDiscord, BsTelegram } from "react-icons/bs";
import { images } from "../constants";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src={images.GreenLogo} alt="logo" className="mr-3 h-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-primary dark:text-white">
                Il portale delle nazionali di calcio
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Risorse
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a href="/allPostList" className="hover:underline">
                    Post
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/database" className="hover:underline">
                    Nazionali
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Seguici
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a href="/" className="hover:underline">
                    Github
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Legali
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a href="/" className="hover:underline">
                    Privacy
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/" className="hover:underline">
                    Termini e Condizioni
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2023{" "}
            <a href="/" className="hover:underline">
              GeoGoal ™
            </a>{" "}
            Tutti i diritti riservati.
          </span>
          <div className="mt-4 flex space-x-5 sm:mt-0 sm:justify-center">
            <a
              href="/"
              className="text-gray-500 hover:text-[#4267B2] dark:hover:text-white"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-4 flex space-x-5 sm:mt-0 sm:justify-center">
            <a
              href="/"
              className="text-gray-500 hover:text-[#E1306C] dark:hover:text-white"
            >
              <AiFillInstagram className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-4 flex space-x-5 sm:mt-0 sm:justify-center">
            <a
              href="/"
              className="text-gray-500 hover:text-[#1DA1F2] dark:hover:text-white"
            >
              <AiOutlineTwitter className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-4 flex space-x-5 sm:mt-0 sm:justify-center">
            <a
              href="/"
              className="text-gray-500 hover:text-[#FF0000] dark:hover:text-white"
            >
              <AiFillYoutube className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-4 flex space-x-5 sm:mt-0 sm:justify-center">
            <a
              href="/"
              className="text-gray-500 hover:text-[#2AABEE] dark:hover:text-white"
            >
              <BsTelegram className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-4 flex space-x-5 sm:mt-0 sm:justify-center">
            <a
              href="/"
              className="text-gray-500 hover:text-[#5865F2] dark:hover:text-white"
            >
              <BsDiscord className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
