import React from "react";
import Sidebar from "@projects/[projectId]/components/sidebar";
import Design from "./components/Design";
import Text from "./components/Text"
import Draw from "./components/Draw"

export default function page({ params }: any) {
  return (
    <div>
      <div className="flex bg-white h-fit">
        {/* <Sidebar/> */}
        {/* <Text /> */}
        <Draw/>
      </div>
    </div>
  );
}
