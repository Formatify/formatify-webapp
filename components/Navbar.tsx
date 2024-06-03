"use client"
import React, { useState } from 'react'
import Link from "next/link";
import classNames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const [profileDropdown, setProfileDropDown] = useState(false)
  const { data: Session } = useSession()

  const UserName = Session?.user?.name?.split(" ")

  console.log(UserName)

  const navigation = [
    {
      URL: '/projects',
      Name: 'Dashboard'
    },
    {
      URL: '/settings',
      Name: 'Settings'
    }
  ]
  return (
    <>
      <div className=" px-6  bg-white shadow">
        <div className="relative flex h-16 items-center justify-between">

          <div className="flex ">
            <div className="flex items-center gap-4 ">
              <Image
                width={100}
                height={100}
                className="size-10"
                src='data:image/png;base64,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'
                alt="Formatify"
              />

              {
                UserName ? <div className=''>
                  <p className='text-lg  font-semibold flex items-center gap-2'><span>Hello, {UserName[0]}</span> <span className='wave'>👋</span></p>
                  <p className="text-green-500  text-xs"> How are you doing today</p>
                </div> : <div>Loading..</div>
              }

            </div>

          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              href={'/projects/new-project'}
              className=" rounded-md bg-green-600 px-6 text-xs py-2.5 mr-6 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Create
            </Link>
            <>
              <button
                id="dropdownUserAvatarButton"
                data-dropdown-toggle="dropdownAvatar"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                type="button"
                onClick={() => setProfileDropDown(!profileDropdown)}
              >
                <span className="sr-only">Open user menu</span>
                <Image
                  width={100}
                  height={100}
                  className="w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="user photo"
                />
              </button>
              {/* Dropdown menu */}
              <div
                id="dropdownAvatar"
                className={classNames(
                  'z-10 absolute top-16 right-1  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600',
                  !profileDropdown && 'hidden'

                )}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownUserAvatarButton"
                >
                  {
                    navigation.map((item: any) => <li key={item.Name}>
                      <Link href={item.URL}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        {item.Name}
                      </Link>
                    </li>)
                  }
                </ul>

                <div className="py-2">
                  <button
                    onClick={() => signOut()}
                    className="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  )
}