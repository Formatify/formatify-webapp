import React from "react";
import {eyeIcon, pdfImage, threeDotsIcon} from "@/constants/index"



export default function Cards({
    Name,
}:any) {
  return (
    <div className="w-40 h-48 bg-gray-50 p-3 flex flex-col gap-1 rounded-md border hover:border-green-400 focus:border-green-400">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col">
          <span className="text-sm text-black pb-1 ">{Name} </span>
        </div>
        <img
          className=" mt-1 size-4 "
          src={eyeIcon}
        ></img>
      </div>

      <div className="duration-500 rounded-md bg-white">
        <img
          className=""
          src={pdfImage}
        ></img>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">
              Last Opened on ${"Date"}
            </span>
          </div>
          <img
            className=" my-1 h-3 w-0.5 "
            src={threeDotsIcon}
          ></img>
        </div>
      </div>
    </div>
  );
}
