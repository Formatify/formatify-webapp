"use client";

import React from 'react'
import Link from 'next/link';

export default function SignupForm() {
    return (
        <form className='my-5 flex flex-col gap-5'>

            <div className='grid grid-cols-2 gap-3'>

                <div >
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email*
                    </label>

                    <div className="relative rounded-md shadow-sm">

                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="john@doe.com"
                        />

                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password*
                    </label>

                    <div className="relative rounded-md shadow-sm">

                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete='off'
                            className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="Alpha Numeric Password"
                        />

                    </div>
                </div>

                <div >
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email*
                    </label>

                    <div className="relative rounded-md shadow-sm">

                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="john@doe.com"
                        />

                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password*
                    </label>

                    <div className="relative rounded-md shadow-sm">

                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete='off'
                            className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="Alpha Numeric Password"
                        />

                    </div>
                </div>

                <div >
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email*
                    </label>

                    <div className="relative rounded-md shadow-sm">

                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="john@doe.com"
                        />

                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password*
                    </label>

                    <div className="relative rounded-md shadow-sm">

                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete='off'
                            className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="Alpha Numeric Password"
                        />

                    </div>
                </div>

                <div >
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email*
                    </label>

                    <div className="relative rounded-md shadow-sm">

                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="john@doe.com"
                        />

                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password*
                    </label>

                    <div className="relative rounded-md shadow-sm">

                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete='off'
                            className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="Alpha Numeric Password"
                        />

                    </div>
                </div>
            </div>


           

            <input type="submit" value="Sign Up" className='bg-green-600 rounded-lg text-white py-2' />



        </form>
    )
}
