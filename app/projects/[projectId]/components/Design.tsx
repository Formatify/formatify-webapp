"use client"

import React, { useState } from 'react'
import {Reorder} from "framer-motion"

export default function Design() {

  const [apnaArray,setApnaArray]=useState([])
  const [itemArray,setItemArray] = useState(["item 1", "item 2", "item 3", "item 4", "item 5", "item 6", "item 7", "item 8", "item 9", "item 10", "item 11", "item 12", "item 13", "item 14", "item 15", "item 16", "item 17"])


  const [nestedArray,setNestedArray]= useState([["item 1", "item 2", "item 3", "item 4", "item 5", "item 6", "item 7", "item 8" ],["item 9", "item 10", "item 11", "item 12", "item 13", "item 14", "item 15", "item 16"]])
  
  return (
    <div className='w-full text-orange-600 bg-blue-300 h-screen font-semibold overflow-auto'>Design
    


    <Reorder.Group values={nestedArray} onReorder={setNestedArray}>
    {
      nestedArray.map((item,index)=>{
        return(
          <div className='bg-red-300 mt-4 h-full'>
            {item.map((subItem,subIndex)=>{
              return( 
                <Reorder.Item value={subItem} key={subItem}>
                  <div key={subIndex} className='mt-6 h-8 flex justify-center items-center bg-purple-200 w-full border border-black rounded-md'> mai {subItem} hn {index} </div>
                </Reorder.Item>
              )
            })}
          </div>
        )
      })
    }
    
    </Reorder.Group>

    
    </div>
  )
}
