import React from 'react'
import Link from 'next/link'
import SignInForm from './components/SignInForm'
import { MdArrowBackIos } from "react-icons/md";
import { signIn } from 'next-auth/react';


export default function page() {
  return (
    <>
      <h2 className='text-2xl font-semibold mb-5'>
        Sign In
      </h2>
      <h3 className='text-xl font-medium hidden lg:block md:block'> <span className="wave">👋</span> Welcome Back! We miss you.</h3>
      <p className='text-sm font-light hidden lg:block md:block'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta exercitationem esse, quas dolore soluta ratione quasi ipsam incidunt minima culpa!</p>
      <SignInForm />
    </>
  )
}
