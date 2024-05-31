"use client"

import React from 'react'
import Searchinput from '@projects/components/Searchinput'
import Tab from '@projects/components/Tabs'



export default function page() {
  return (
    <>

      <div className="min-h-full bg-gray-50">
        <div className="bg-gray-50">
          
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                <p className='pt-8'> Projects <b>/Recent Projects</b></p>
                </div>
              </div>
            
        
        </div>

        <header className="bg-gray-50 ">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
           
           
            <Searchinput/>

          </div>
        </header>
        <main>
            
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"><Tab/></div>
        </main>
      </div>
    </>
  )
}