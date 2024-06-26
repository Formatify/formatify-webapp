import Link from 'next/link'
import React from 'react'
import ErrorImage from '../../../images/success.png'
import Image from 'next/image'

export default function Error() {
    return (
        <div className='flex flex-col items-center justify-center h-screen w-screen'>
            <div className='h-24 w-24 my-10'>
                <Image width={100} height={100} src={ErrorImage.src} alt='error' />
            </div>
            <h2 className='text-3xl font-medium'>Error!</h2>
            <p className='font-light my-5'>Something went wrong, Please contact support.</p>
            <Link className='px-12 bg-slate-900 text-white py-2 rounded-lg' href={'/'}>Go to Home</Link>
        </div>
    )
}
