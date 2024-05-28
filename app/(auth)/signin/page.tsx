import React from 'react'
import Link from 'next/link'
import SignInForm from './components/SignInForm'

export default function page() {
  return (
    <div className=''>


      <div className="flex gap-5 mb-10">
        <Link className='bg-black border-2 border-black text-white px-5 py-1 rounded-full text-sm' href={'/signin'}>Sign In</Link>
        <Link className='border-2 border-black px-5 py-1 rounded-full text-sm' href={'/signup'}>Sign Up</Link>
      </div>



      <h2 className='text-2xl font-semibold'>
        Sign In
      </h2>

      <h3 className='mt-5 text-xl font-medium'> <span className="wave">👋</span> Welcome Back! We miss you.</h3>
      <p className='text-sm font-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta exercitationem esse, quas dolore soluta ratione quasi ipsam incidunt minima culpa!</p>
      <SignInForm />

      <p className='text-center'>Don't have an account? <Link className='text-green-600' href={'/signup'}>Sign Up</Link></p>
    </div>
  )
}
