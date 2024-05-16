"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import LoadingSpinner from '@/components/Loader';
import toast from 'react-hot-toast';

import { NewPasswordValidate } from '@/lib/validation';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'





// Define the type for form values
interface NewPasswordFormValues {
    email: string;
    password: string;
}

export default function NewPasswordForm() {

    const initialValues: NewPasswordFormValues = { email: '', password: '' };
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const OTP = searchParams.get('OTP')



    const SubmitForm = (values: NewPasswordFormValues, actions: FormikHelpers<NewPasswordFormValues>) => {
        const { email, password } = values;

        console.log(
            { email, otp: OTP, password }
        )

        axios.post('http://localhost:3000/api/reset-password', { email, otp: OTP, password })
            .then((res) => console.log(res.data))
            .catch((err) => toast.error(err.response.data.message))
        actions.setSubmitting(false);
    };
    return (
        <>
            {isLoading && <LoadingSpinner />}
            <Formik initialValues={initialValues} validate={NewPasswordValidate} onSubmit={SubmitForm}>
                {() => (
                    <Form className='my-5 flex flex-col gap-4'>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email*
                            </label>

                            <div className="relative rounded-md shadow-sm">
                                <Field type="email" name="email" id="email" placeholder="john@doe.com"
                                    className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                            </div>
                            <ErrorMessage name="email" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                New Password*
                            </label>

                            <div className="relative rounded-md shadow-sm">

                                <Field type="password" name="password" placeholder="Alpha Numeric Password" id="password" autoComplete='off'
                                    className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />

                            </div>
                            <ErrorMessage name="password" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>




                        <button type="submit" className='bg-green-600 rounded-lg text-white py-2 w-full'>Set Password</button>
                    </Form>
                )}

            </Formik>
        </>
    )
}
