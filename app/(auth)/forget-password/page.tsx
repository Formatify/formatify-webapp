import React from 'react'
import ForgetForm from './components/ForgetForm'


export default function page() {
  return (
    <div  className=''>
      <h2 className='text-2xl font-semibold'>
        Forgot Password?
      </h2>
      <h3 className='mt-5 text-xl font-medium'>Don&lsquo;t worry we got you 🙌</h3>
      <p className='text-sm font-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta exercitationem esse, quas dolore soluta ratione quasi ipsam incidunt minima culpa!</p>

      <ForgetForm />
    </div>
  )
}
