import React from 'react'
import FailureImage from '../../../images/error.png'
import Image from 'next/image'

export default function Failure() {



    return (
        <div className='flex flex-col items-center justify-center h-screen w-screen'>
            <div className='h-24 w-24 my-10'>
                <Image src={FailureImage.src} alt='failure' />
            </div>
            <h2 className='text-3xl font-medium'>Failed!</h2>
            <p className='font-light my-5'>Verification Failed</p>
            <button className='px-12 bg-slate-900 text-white py-2 rounded-lg'>Try Again</button>
        </div>
    )
}
