import React from "react";
import Sidebar from "@projects/[projectId]/components/sidebar";
import  Text  from "./components/Text";

export default function page({ params }: any) {
  return (
    <div>
      <div className="flex bg-white h-fit">
        <Sidebar/>
        {/* <Text /> */}
      </div>
    </div>
  );
}
