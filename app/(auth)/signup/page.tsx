import React from 'react'
import Link from 'next/link'
import SignupForm from './components/SignupForm'
import { FcGoogle } from "react-icons/fc";
// import { MdArrowBackIos } from "react-icons/md";



export default function page() {
  return (
    <div className=' pl-16'>


      



      <h2 className='text-2xl font-semibold'>
        Sign Up
      </h2>

      <h3 className='mt-5 text-xl font-medium'> <span className="wave">👋</span> Welcome! Let's see you up.</h3>
      <p className='text-sm font-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta exercitationem esse, quas dolore soluta ratione quasi ipsam incidunt minima culpa!</p>

      <SignupForm />
      <div className='flex items-center flex-col gap-2'>
        <p className='text-center'>Already have an account? <Link className='text-green-600' href={'/signin'}>Sign In</Link></p>
        <span>or</span>

        <button className='border-2 px-6 py-2 rounded-lg flex gap-4 items-center justify-center' > <FcGoogle size={20} /><span>Signup with Google</span></button>
      </div>

    </div>
  )
}
