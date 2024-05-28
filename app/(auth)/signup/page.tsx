import React from 'react'
import Link from 'next/link'
import SignupForm from './components/SignupForm'

export default function page() {
  return (
    <div className=''>


      <div className="flex gap-5 mb-10">
        <Link className='border-2 border-black px-5 py-1 rounded-full text-sm' href={'/signin'}>Sign In</Link>
        <Link className='bg-black border-2 border-black text-white px-5 py-1 rounded-full text-sm' href={'/signup'}>Sign Up</Link>

      </div>



      <h2 className='text-2xl font-semibold'>
        Sign Up
      </h2>

      <h3 className='mt-5 text-xl font-medium'> <span className="wave">👋</span> Welcome! Let's see you up.</h3>
      <p className='text-sm font-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta exercitationem esse, quas dolore soluta ratione quasi ipsam incidunt minima culpa!</p>

      <SignupForm />
      <p className='text-center'>Already have an account? <Link className='text-green-600' href={'/signin'}>Sign In</Link></p>
    </div>
  )
}
