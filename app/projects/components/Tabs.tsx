"use client";

import React, { useState } from "react";
import Cards from "@projects/Cards";
import { files, file2, file3 } from "@/constants/index";

const Tab = () => {
  const [open, setOpen] = useState("All Files");


  const handleTabOpen = (tabCategory: any) => {
    setOpen(tabCategory);
  };

  const getAllFiles = () => {
    // Here we will send request for all the files. and create an array
   
    // setAllFiles(files);
  };
  return (
    <>
      <section className="">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mb-14 w-full">
                <div className="flex flex-col gap-4 flex-wrap rounded-lg  px-4 dark:border-dark-3 sm:flex-row">
                  <a
                    onClick={() => {
                      getAllFiles();
                      handleTabOpen("All Files");
                    }}
                    className={`cursor-pointer py-3 text-xs font-medium md:text-base  ${
                      open === "All Files"
                        ? "bg-primary font-bold border-b-2 border-black"
                        : "font-extralight text-body-color text-gray-400 hover:bg-primary  "
                    }`}
                  >
                    All Files
                  </a>
                  <a
                    onClick={() => handleTabOpen("owned")}
                    className={`cursor-pointer py-3 text-xs font-medium md:text-base  ${
                      open === "owned"
                        ? "bg-primary font-bold border-b-2 border-black"
                        : "font-extralight text-body-color text-gray-400 hover:bg-primary  "
                    }`}
                  >
                    Owned
                  </a>
                  <a
                    onClick={() => handleTabOpen("shared")}
                    className={`cursor-pointer py-3 text-xs font-medium md:text-base ${
                      open === "shared"
                        ? "bg-primary font-bold border-b-2 border-black"
                        : "font-extralight text-body-color text-gray-400 hover:bg-primary  "
                    }`}
                  >
                    Shared
                  </a>
                </div>
                <div>
                <TabContent   
                  details= <div className="lg:grid lg:grid-cols-5 lg:gap-5 md:grid md:grid-cols-3 md:gap-5"> {files.map( (items)=><Cards Name={items} key={items}/>)} </div>
                  tabCategory="All Files"
                  open={open}
                />
                <TabContent 
                 details= <div className="lg:grid lg:grid-cols-5 lg:gap-5 md:grid md:grid-cols-3 md:gap-5"> {file2.map((items)=> <Cards Name={items} />  ) }</div>
                 tabCategory="owned"
                 open={open} />
                <TabContent
                   details= <div className="lg:grid lg:grid-cols-5 lg:gap-5 md:grid md:grid-cols-3 md:gap-5"> {file3.map((items)=> <Cards Name={items} />  ) }</div>
                  tabCategory="shared"
                  open={open}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tab;

const TabContent = ({ open, tabCategory, details }: any) => {
  return (
    <div>
      <div
        className={`p-6 text-base leading-relaxed text-body-color dark:text-dark-6 ${
          open === tabCategory ? "block" : "hidden"
        } `}
      >
        {details}
      </div>
    </div>
  );
};
