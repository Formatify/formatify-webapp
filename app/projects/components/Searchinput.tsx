import React from "react";
import {searchInputImage} from "@/constants/index"
import { FaSearch } from "react-icons/fa";



export default function Searchbar() {
  return (

  <div className=" w-fit bg-white border rounded-md flex flex-row items-center">
  
    <FaSearch className=" ml-4 size-5 text-gray-500"/>
    
    <input
      
      placeholder="Search folder, file anything"
      className=" text-md w-96 text-gray-900 border-hidden rounded-lg bg-white focus:outline-none focus:ring-0"
      id="default-search"
      
    />
   <div className=" flex  items-center justify-end "> 
   <button className=" flex-none text-sm font-medium text-white rounded-lg ">
      <img
        src={searchInputImage}
        aria-hidden="true"
        className="size-4"
      >
      </img>
    </button>
    <button className="ml-2 bg-amber-100 text-orange-400  text-md py-1 px-2 my-1 mx-1 rounded-md flex-none "> All Files <span className=" pt-1 font-light text-xl">| x</span></button>
   </div>
  </div>


  );
}
    



