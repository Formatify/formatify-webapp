

import React from "react";
import Sidebar from "@projects/[projectId]/components/sidebar";
import Editor from "@projects/[projectId]/components/Editor";

export default function page({ params }: any) {
  return (
    <div className="w-full">
      <div className="flex flex-row flex-wrap bg-white h-fit">
        {/* <Sidebar/> */}
        <div className="w-40 bg-blue-300"> ha</div>
        <div className="w-60 bg-yellow-200"></div>
        <Editor/>

      </div>
    </div>
  );
}
  