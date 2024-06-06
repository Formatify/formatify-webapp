"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LinkedinnIcon,
  formatifyLogo,
  FbIcon,
  XIcon,
  InstIcon,
} from "@/utils/constant";
import Link from "next/link";

export default function Home() {
  const [isHovered, setIsHovered] = useState("#000000");

  const mouseIn = () => {
    setIsHovered("#22C55E");
  };
  const mouseOut = () => {
    setIsHovered("#000000");
  };

  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.05] bg-grid-black/[0.03] relative flex items-center justify-center flex-col">
      {/* Radial gradient for the container to give a faded look */}
      <Image
        width={75}
        height={75}
        src={formatifyLogo}
        alt="Logo"
        className="mt-11 z-10"
      ></Image>
      <div className="flex flex-col items-center lg:justify-center w-full mt-10">
        <div className=" text-4xl font-bold text-right lg:text-8xl">FORMATIFY</div>

        <div className="flex justify-right lg:justify-center items-end gap-8 ">
          <div className=" z-10 text-4xl font-bold  lg:text-8xl">WEBSITE IS</div>
          <div className=" w-80 md:text-xs lg:text-base lg:font-medium lg:mb-4 hidden md:block lg:block">
            Subscribe to be the first to know about our website and product
            updates!
          </div>
          <div className=" w-24 text-xs lg:w-80 md:w-80 md:text-xs lg:text-base lg:font-medium lg:mb-4 invisible md:hidden lg:hidden">
            Subscribe to be the first to
          </div>
        </div>

        <div className="text-4xl font-bold lg:text-8xl"> ON THE WAY </div>

        <div className="flex justify-center items-center ">
          <div className=" z-10 text-center text-xs w-64 mt-6 lg:hidden md:hidden ">
            Subscribe to be the first to know about our website and product
            updates!
          </div>
        </div>
      </div>

      <div className="w-full flex z-10 flex-col lg:flex-row md:flex-row justify-start lg:justify-center md:justify-center items-center gap-4 mt-6">
        <input
          className=" rounded-3xl w-11/12 text-xs lg:text-base md:text-base md:w-96 lg:w-96 "
          placeholder="Please enter your e-mail address"
        />
        <button className="bg-formatify text-white text-xs w-11/12 md:text-base lg:text-base md:w-32 lg:w-32 rounded-3xl border h-9 lg:h-11 md:h-11 ">
          Subscribe
        </button>
      </div>

      <div className="">
        <ul className="flex gap-6 ">
          <li className="z-10 mt-11 flex items-center justify-center">
            <Link
              className="border text-black p-3 border-black hover:border-2 hover:text-formatify hover:border-formatify rounded-full"
              href={""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </Link>
          </li>

          <li className="z-10 mt-11 flex items-center justify-center">
            <Link
              className="border text-black p-3 border-black hover:border-2 hover:text-formatify hover:border-formatify rounded-full"
              href={""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </li>

          <li className="z-10 mt-11 flex items-center justify-center">
            <Link
              className="border text-black p-3 border-black hover:border-2 hover:text-formatify hover:border-formatify rounded-full"
              href={""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 z-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </Link>
          </li>

          <li className="z-10 mt-11 flex items-center justify-center">
            <Link
              className="border text-black p-3 border-black hover:border-2 hover:text-formatify hover:border-formatify rounded-full"
              href={""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 font-bold"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"/>
              </svg>
            </Link>
          </li>
        </ul>
      </div>



      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  );
}
