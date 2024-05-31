import React from "react";
import {Details} from "@/types/index"



export default function Confirmed() {
  const initialValues: Details = {
    title: "",
    email: ["affanAtWeb@gmail.com", "uusman04@gmail.com"],
  };
  const addMember = () => {};

  return (
    <div className="w-full bg-white p-3 flex flex-row gap-1 rounded-md border">
      <div className="w-1/2">
        <div className="flex flex-row justify-between full ">
          <div className="flex flex-col gap-5">
            <span className="text-sm text-gray-500 pb-1">
              Fill up the details below to let us know what you need and we will
              give or help you with a solution.{" "}
            </span>

            <div className="flex flex-col ">
              <label className="font-bold mb-1"> Enter Title*</label>
              <input
                className="italic bg-slate-200 rounded-md focus:border-black focus:ring-0 focus:outline-none"
                placeholder="Title"
              />
            </div>

            <div className="flex flex-col ">
              <label className="font-bold mb-1 "> Add Members*</label>
              <div className=" flex items-center bg-slate-200 border border-black rounded-md ">
                <input
                  className="italic w-3/4 bg-slate-200 rounded-md border-none focus:border-none focus:ring-0 focus:outline-none"
                  placeholder="Enter their email"
                />
                <button
                  className="bg-black text-white w-1/6 rounded-md text-xs py-1.5 ml-8"
                  onClick={addMember}
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap  gap-4 mt-4">
          {initialValues.email.map((items) => (
            <div className=" w-2/5 bg-white rounded-sm pl-4 border border-dashed border-green-400 " key={items}>
              {" "}
              {items}{" "}
              <button className="bg-gray-200 text-black text-lg "> x </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-200 ml-4 w-1/2">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col ">
            <label className="font-bold mt-16 mb-1"> Template*</label>
            <input
              className="italic bg-slate-200 rounded-md focus:border-black focus:ring-0 focus:outline-none"
              placeholder="Title"
            />
          </div>
          {/* <Cards /> */}
        </div>
      </div>
    </div>
  );
}
