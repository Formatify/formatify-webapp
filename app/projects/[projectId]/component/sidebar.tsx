"use client";

import React, { useState } from "react";
import classNames from "classnames";
import {
  HomeIcon,
  Battery0Icon,
  AcademicCapIcon,
  CogIcon,
  BoltSlashIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  MusicalNoteIcon,
  DevicePhoneMobileIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import Design from "./Design";
import Element from "./Element";
import Text from "./Text";
import Brand from "./Brand";
import Upload from "./Upload";
import Draw from "./Draw";
import Project from "./Project";
import Appli from "./Appli";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [CompoToRender, setCompoToRender] = useState(<></>);
  const [active, setActive] = useState("");


  const Menus = [
    {
      title: "Design",
      icon: <HomeIcon className="size-6" />,
      CompoToRender: <Design />,
    },
    {
      title: "Element",
      icon: <Battery0Icon className="size-6" />,
      CompoToRender: <Element />,
    },
    {
      title: "Text",
      icon: <AcademicCapIcon className="size-6" />,
      CompoToRender: <Text />,
    },
    {
      title: "Brand",
      icon: <CogIcon className="size-6" />,
      CompoToRender: <Brand />,
    },
    {
      title: "Upload",
      icon: <BoltSlashIcon className="size-6" />,
      CompoToRender: <Upload />,
    },
    {
      title: "Draw",
      icon: <ChatBubbleOvalLeftEllipsisIcon className="size-6" />,
      CompoToRender: <Draw />,
    },
    {
      title: "Project",
      icon: <MusicalNoteIcon className="size-6" />,
      CompoToRender: <Project />,
    },
    {
      title: "Appli",
      icon: <DevicePhoneMobileIcon className="size-6" />,
      CompoToRender: <Appli />,
    },
  ];

  return (
    <div className="fixed h-full flex flex-row">
      <div
        className={`bg-gray-900 text-white w-20 h-full`}
        onClick={() => setIsOpen(true)}
        onDoubleClick={() => setIsOpen(false)}
      >
        <ul className="mt-4">
          {Menus.map((menu, index) => {
            const btnClass = classNames('mt-2 font-semibold text-orange-800 text-sm flex flex-col items-center gap-x-4 cursor-pointer  p-2  hover:text-orange-600 hover:font-semibold', {'bg-gray-800 text-orange-600 font-semibold': active === menu.title}, {'bg-gray-900': active !== menu.title})
            return (
              <li
                key={index}
                className={btnClass}
                onClick={() => {
                  setIsOpen(true);
                  setCompoToRender(menu.CompoToRender);
                  setActive(menu.title);
                }}
              >
                {menu.icon}
                <span
                  //style={{ transitionDelay: `${index + 1}00ms` }}
                  className={`whitespace-pre origin-left duration-500 hover:text-orange-600 hover:font-semibold`}
                >
                  {menu.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {isOpen && (
        <div className="flex flex-row justify-center items-center transition-all">
          <div className="w-60 bg-gray-800 h-screen"> {CompoToRender}</div>
          <button
            className="w-4 h-20 bg-gray-900 rounded-md"
            onClick={() => {
              setIsOpen(false);
              setActive("");
            }}
          >
            {" "}
            <ArrowLeftIcon className="size-4 text-orange-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
