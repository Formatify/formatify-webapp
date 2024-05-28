import React from 'react'
import Link from 'next/link'
import SignInForm from './components/SignInForm'
import { MdArrowBackIos } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";


export default function page() {
  return (
    <div className='pl-16'>
      <h2 className='text-2xl font-semibold'>
        Sign In
      </h2>
      <h3 className='mt-5 text-xl font-medium'> <span className="wave">👋</span> Welcome Back! We miss you.</h3>
      <p className='text-sm font-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta exercitationem esse, quas dolore soluta ratione quasi ipsam incidunt minima culpa!</p>
      <SignInForm />
      <div className='flex items-center flex-col gap-2'>
        <p className='text-center'>Don't have an account? <Link className='text-green-600' href={'/signup'}>Sign Up</Link></p>
        <span>or</span>
        <button className='border-2 px-6 py-2 rounded-lg flex gap-4 items-center justify-center' > <FcGoogle size={20} /><span>SignIn  with Google</span></button>
      </div>
    </div>
  )
}
