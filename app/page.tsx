'use client';

import Image from "next/image";
import { LinkedinnIcon, formatifyLogo, FbIcon, XIcon, InstIcon } from "@/utils/constant";
import Link from "next/link";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    try {
      const res = await axios.post('/api/subscribe', { email });
      console.log("res --->", res)
      if (res.statusText === 'OK') {
        toast.success('Subscribed successfully')
      }
      setEmail('')
    } catch (e) {
      console.log({ e })
      const error = e as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message ?? '')
      setEmail('')
    }
  }

  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative flex items-center lg:justify-center flex-col">
      {/* Radial gradient for the container to give a faded look */}
      <Image width={75} height={75} src={formatifyLogo} alt="Logo" className="mt-12 z-10"></Image>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className=" text-4xl font-bold  lg:text-8xl"> FORMATIFY </div>

        <div className="flex justify-center items-end gap-8 ">
          <div className=" text-4xl font-bold  lg:text-8xl"> WEBSITE IS </div>
          <div className=" w-80 md:text-xs lg:text-base lg:font-medium lg:mb-4 hidden md:block lg:block">
            {" "}
            Subscribe to be the first to know about our website and product
            updates!{" "}
          </div>
        </div>

        <div className="text-4xl font-bold lg:text-8xl"> ON THE WAY </div>

        <div className="flex justify-center items-center ">
          <div className=" text-center text-xs w-72 mt-6 lg:hidden md:hidden ">
            {" "}
            Subscribe to be the first to know about our website and product
            updates!{" "}
          </div>
        </div>

      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <input value={email} onChange={(e) => setEmail(e.target.value)} className=" rounded-3xl w-48 text-xs lg:text-base md:text-base md:w-96 lg:w-96 " placeholder="Please enter your e-mail address" />
        <button onClick={handleSubscribe} className="bg-green-500 text-white text-xs w-20 md:text-base lg:text-base md:w-32 lg:w-32 rounded-3xl border h-9 lg:h-11 md:h-11 " >Subscribe</button>
      </div>

      <div className="">
        <ul className="flex gap-6">
          <li className="z-10">
            <Link href={"https://www.linkedin.com/company/formatify "}> <Image width={40} height={40} src={LinkedinnIcon} alt="Logo" className="mt-12"></Image> </Link>
          </li>
          <li className="z-10">
            <Link href={"https://www.instagram.com/formatify.io/"}> <Image width={40} height={40} src={InstIcon} alt="Logo" className="mt-12"></Image> </Link>
          </li>
          <li className="z-10">
            <Link href={"https://www.facebook.com/formatify"}> <Image width={40} height={40} src={FbIcon} alt="Logo" className="mt-12"></Image> </Link>
          </li>
          <li className="z-10">
            <Link href={""}> <Image width={40} height={40} src={XIcon} alt="Logo" className="mt-12"></Image> </Link>
          </li>
        </ul>
      </div>

      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  );
}
