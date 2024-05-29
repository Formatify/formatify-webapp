"use client"

import React from "react";
import { useState } from "react";


export default function ProjDetails() {

  const [email, setEmail] = useState('');
  const [members, setMembers] = useState<string[]>([]); // Specify the type of members as an array of strings


  const addMember = () => {
    if (email && !members.includes(email)) {
      setMembers([...members, email]);
      setEmail('');
    }
  };

  const removeMember = (emailToRemove:String) => {
    setMembers(members.filter((member) => member !== emailToRemove));
  };

  return (
    <div className="w-full bg-white p-3 flex flex-row gap-1 rounded-md border">
      <div className="flex flex-row justify-between w-1/2 ">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

      <div className="w-1/2 space-y-2 flex-wrap ml-4 ">
        {members.map((member,index) => (
          <div className=" w-full h-8 bg-white rounded-md pl-4 border border-dashed border-green-400 " key={index}>
            {" "}
            {member}{" "}
            <button className="bg-gray-200 text-black text-lg " onClick={() => removeMember(member)}> x </button>
          </div>
        ))}
      </div>
    </div>
  );
}
