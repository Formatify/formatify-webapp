

import React from "react";


export default function Searchbar() {
  return (

<form className=" w-full">

  <div className="relative w-5/12 bg-white border rounded-md">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-5 h-5 text-gray-500 dark:text-gray-400"
      >
        <path
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="currentColor"
        />
      </svg>
    </div>
    <input
      // required=""
      placeholder="Search folder, file anything"
      className="block  pl-10 py-3 w-4/6 ps-10 text-lg text-gray-900 border-hidden rounded-lg bg-white  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-0"
      id="default-search"
      type="search"
    />
    <button className="absolute end-32 bottom-1/2 translate-y-1/2 p-4 text-sm font-medium text-white rounded-lg ">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABJCAYAAACNZiAWAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM6SURBVHgB7Zs7bxNBEMfnzg9RnmW7P2TJdmm6lC5DhUtK+ASQkgq5o4Nv4JTQORWUSeeOlMiShen9Suk3M8cFjGTLt97d24HMT4oi7/ks7ezs7M78NR5oEIZhkM/nX22326bneQ0cCuJHMxy79X3/aj6fd4cIMMWDE6jX6+F6ve7gpJsJX7lcLBZtjobIgCK1Wo1W/CNOvq7wWiOTybwolUrz8XjcA0YoGaBarb7Ff+/w7xGoQ++cF4tFQCPcABMSG4BWHn5NXpcmesIdF09IFANoz282m6/wJ8jpMsOY8IRDTPCTfAknT65vavJEkMvlOsCAox4Qr/53sAB6QQGdYAYOiQywc6ztnuUqDNFIL1er1S1NqFKptDDqv8fxEHjSReNf0Bb0DOzvYbyf/1rJ+JJEvxsCT6I45OPkaaV09vfFPjemMfIK4EsUhygItkCDfr/fPfSMtgQwhrY8GUArCJGrH3rmOsAlIPApaQENstls49AzCobAmysfozXt05NXCjO+zj4voLH4JOAKBcHXmdFoNCuXy5/QE0IcVElw7qGJPg+C4Md0Ov1GE8er7hl6xmfgeQJQqt5bLpdPo2Pw2Lfj42wKFsAVeOz6Onz0KkyBDC12Dea5/GdyAd04sQfaf21gQKJ0mOJEoVCY47l5DgbA33kzGAy+AAMS1wMmk0kPixkUM5qgRxsvTybqCkZQqghhEeMaPeEOV/AM1KtCM1p5TpMnlGuC5AnxsVnAj40k71AQpWOHi9vvclJV+B7KJHFyLUx6nu0ri+PYDQa7D5yvxFoGsE0augNLA6SpOyjHANukrTuwMoAL3YGNAVzpDixigEvdIVEuYBuXuoNzD3CtO5jSBWxjWncwqgvYxpbuYEwXsI0t3cGMLmAbm7qDEV3ANpZ1B31dwDaWdQd9XcA2FnUHY7qAbUzrDmq6gG1c6w7Or8KudQcWuYBL3YFFOuxSd2BTD3ClO7CqCLnQHdjVBNPWHViXxdPQHbQMIP0C0i+QGOkXAOkX+I30C4D0C0i/QIT0C7hD+gVA+gWkX0D6BUD6BaRfQPoFpF/g2BekXwCkX0D6BQjpFwDpF4iQfoEd/od+gQfPT0DKQHUEnC2uAAAAAElFTkSuQmCC"
        aria-hidden="true"
        className="w-4 h-4"
      >
      </img>
    </button>
    <button className="bg-amber-100 text-orange-400 w-1/4 text-lg absolute end-1 bottom-1/2 translate-y-1/2 text-start pl-1.5  py-1.5  rounded-md"> All Files <span className="ml-4 pt-1 text-2xl">| x</span></button>
  </div>
</form>

  );
}
    



