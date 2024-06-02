import Link from 'next/link'
import React from 'react'
import SuccessImage from '../../../images/success.png'
import Image from 'next/image'

export default function Success() {
    return (
        <div className='flex flex-col items-center justify-center h-screen w-screen'>
            <div className='h-24 w-24 my-10'>
                <Image src={SuccessImage.src} alt='success' />
            </div>
            <h2 className='text-3xl font-medium'>Verified!</h2>
            <p className='font-light my-5'>You have successfully veried your Account</p>
            <Link className='px-12 bg-slate-900 text-white py-2 rounded-lg' href={'/signin'}>Proceed</Link>
        </div>
    )
}
