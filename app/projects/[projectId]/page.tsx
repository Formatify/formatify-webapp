

import React from "react";
import Stepper from "./components/Stepper";
import Searchinput from "../components/Searchinput";



export default function page({ params }: any) {
  return <div>page - {params.projectId}




<>

<div className="min-h-full bg-gray-50">
  <div className="bg-gray-50">
    
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
          <p className='pt-8'> Projects <b>/Create Project</b></p>
          </div>
        </div>
      
  
  </div>
  

  <header className="bg-gray-50 ">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
     
     
      <Stepper/>

    </div>
  </header>
  <main>
      
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"></div>
  </main>
</div>
</>
  
  
  
  </div>;
}
    