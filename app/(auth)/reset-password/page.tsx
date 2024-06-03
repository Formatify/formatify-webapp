import React from 'react'
import NewPassword from './components/NewPassword'



export default function page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  console.log(searchParams.otp)


  return (
    <div>
      <h2 className='text-2xl font-semibold'>
        Setup New Password?
      </h2>


      {
        searchParams.otp ? <>

          <h3 className='mt-5 text-xl font-medium'>Don't worry we got you 🙌</h3>
          <p className='text-sm font-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta exercitationem esse, quas dolore soluta ratione quasi ipsam incidunt minima culpa!</p>

          <NewPassword />
        </> : <p className='text-sm font-light'>Invalid Credentils , Please Contact Support for Correct URL.</p>

      }


    </div>
  )
}
