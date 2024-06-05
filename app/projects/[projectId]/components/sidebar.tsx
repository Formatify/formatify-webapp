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

import Design from "@projects/[projectId]/components/Design";
import Author from "@/app/projects/[projectId]/components/Author";
import Text from "@projects/[projectId]/components/Text";
import Brand from "@projects/[projectId]/components/Brand";
import Upload from "@projects/[projectId]/components/Upload";
import Draw from "@projects/[projectId]/components/Draw";
import Project from "@projects/[projectId]/components/Project";
import Appli from "@projects/[projectId]/components/Appli";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [CompoToRender, setCompoToRender] = useState(<></>);
  const [active, setActive] = useState(0);
  const[newActive, setNewActive] = useState(0)
   
  

  interface Menus{ 
    title: string;
    icon: any;
    CompoToRender: JSX.Element;
    number: number;
  }

  const Menus = [
    {
      title: "Design",
      icon: <HomeIcon className="size-6" />,
      CompoToRender: <Design />,
      number: 1
    },
    {
      title: "Author",
      icon: <Battery0Icon className="size-6" />,
      CompoToRender: <Author />,
      number: 2
    },
    {
      title: "Text",
      icon: <AcademicCapIcon className="size-6" />,
      CompoToRender: <Text />,
      number: 3
    },
    {
      title: "Brand",
      icon: <CogIcon className="size-6" />,
      CompoToRender: <Brand />,
      number: 4
    },
    {
      title: "Upload",
      icon: <BoltSlashIcon className="size-6" />,
      CompoToRender: <Upload />,
      number: 5
    },
    {
      title: "Draw",
      icon: <ChatBubbleOvalLeftEllipsisIcon className="size-6" />,
      CompoToRender: <Draw />,
      number: 6
    },
    {
      title: "Project",
      icon: <MusicalNoteIcon className="size-6" />,
      CompoToRender: <Project />,
      number: 7
    },
    {
      title: "Appli",
      icon: <DevicePhoneMobileIcon className="size-6" />,
      CompoToRender: <Appli />,
      number: 8
    },
  ];

  // const motion= ()=>{


  //     if (active < newActive) {
  //       for (let i = active; i >= newActive; i++) {
  //        setActive(+1) 
  //        console.log(active+ newActive)
  //       }
  //     } else {
  //       for (let i = active; i <= newActive; i--) {
  //         setActive(-1) 
  //         console.log(active+ newActive)
  //       }
  //     }
  // }

  return (
    <div className="fixed h-full flex flex-row">
      <div
        className={`bg-white w-20 h-full`}
        onClick={() => setIsOpen(true)}
        onDoubleClick={() => setIsOpen(false)}
      >
        <ul className="mt-4 ">
          {Menus.map((menu, index) => {
            const sideBarBtnBaseClass= 'py-2 font-semibold text-sm flex flex-col items-center gap-x-4 cursor-pointer p-2 hover:font-semibold'
            const sideBarBtnActiveClass= {' text-white bg-green-400 rounded-tr-xl rounded-br-xl font-semibold': active === menu.number}
            const sideBarBtnInactiveClass= {'text-green-700 bg-white  hover:text-green-400': active !== menu.number}
            
            const btnClass = classNames(sideBarBtnBaseClass, sideBarBtnActiveClass, sideBarBtnInactiveClass)
            return (
             <div className="bg-green-400 rounded-"> <li
                key={index}
                className={btnClass}
                onClick={() => {
                  setIsOpen(true);
                  setCompoToRender(menu.CompoToRender);
                  // motion()
                  setActive(menu.number)
                  setNewActive(menu.number)
                }}
              >
                {menu.icon}
                <span
                  //style={{ transitionDelay: `${index + 1}00ms` }}
                  className={`whitespace-pre origin-left duration-500 hover:font-semibold`}
                >
                  {menu.title}
                </span>
              </li>
              </div>
            );
          })}
        </ul>
      </div>

      {isOpen && (
        <div className="flex flex-row justify-center items-center transition-all">
          <div className="w-72 bg-green-400  h-screen"> {CompoToRender}</div>
          <button
            className="w-4 h-20 bg-green-400 rounded-br-full rounded-tr-full"
            onClick={() => {
              setIsOpen(false);
              setActive(0);
            }}
          >
            {" "}
            <ArrowLeftIcon className="size-4 pr-1 text-orange-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
