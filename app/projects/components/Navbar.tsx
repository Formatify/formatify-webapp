"use client"
import React from 'react'
import { Menu } from '@headlessui/react'
import { ROUTES } from "@/utils/constant";
import Link from "next/link";
 import {} from "./images/fomatify.png"



const navigation = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Projects", href: ROUTES.Project },
];

export default function Example() {
  return (
    
        <>
          <div className="mx-auto  px-2 sm:px-6 lg:px-8 bg-white shadow">
            <div className="relative flex h-24 items-center justify-between">

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 rounded-md p-3 items-center bg-green-500">
                  <img
                    className="h-10 w-auto"
                    src="data:image/png;base64,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   "
                    // alt="Formatify"
                  />
                      
                </div>
                <div className=''>
                <p className='px-8 text-3xl font-semibold '>Hello, Arqam 👋</p>     
                <p className="text-green-500 px-8"> How are you doing today</p>   
                </div>       
              </div>
              
              
              

          <div className=" hidden lg:flex lg:gap-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl  leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>


              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              
                <button
                  type="button"
                  className=" relative rounded-md bg-green-600 px-6 py-2.5 mr-6 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  
                  Create
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full mr-3 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-11 w-11 rounded-full "
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  
                </Menu>
              </div>
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
            
            </div>
          </Disclosure.Panel> */}
        </>
  )
}
