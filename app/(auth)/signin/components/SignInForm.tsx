"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { SignInValidate } from '@/lib/validation';
import { signIn, useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/Loader';
import toast from 'react-hot-toast';
import { redirect, useRouter } from "next/navigation";



// Define the type for form values
interface SignInFormValues {
    email: string;
    password: string;
}

export default function SignInForm() {

    const initialValues: SignInFormValues = { email: '', password: '' };
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const [isVerifyExpired, setIsVerifyExpired] = useState(false)

    const SubmitForm = (values: SignInFormValues, actions: FormikHelpers<SignInFormValues>) => {
        const { email, password } = values;


        setIsLoading(true);
        signIn("credentials", {
            email,
            password,
            redirect: false
        })
            .then(res => {
                setIsLoading(false);

                if (res?.error) {
                    toast.error(res?.error);
                } else {
                    toast.success("Welcome!");
                    // actions.resetForm();     
                    router.push('/dashboard');
                    console.log({ session })

                }
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Something went Wrong");
                console.log(err)
            })
        actions.setSubmitting(false);
    };
    return (
        <>
            {isLoading && <LoadingSpinner />}

            {
                isVerifyExpired && <div className='bg-red-200 py-2 px-4 rounded-lg mt-3 text-sm flex items-center justify-between'>
                    User Not Verified! Please request a Email.
                    <button className='px-4 py-2 bg-white text-red-600 rounded-full'>Request</button>
                </div>
            }



            <Formik initialValues={initialValues} validate={SignInValidate} onSubmit={SubmitForm}>
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
                                Password*
                            </label>

                            <div className="relative rounded-md shadow-sm">

                                <Field type="password" name="password" placeholder="Alpha Numeric Password" id="password" autoComplete='off'
                                    className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />

                            </div>
                            <ErrorMessage name="password" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>

                        <div>
                            <Link href="/forget-password" className='text-sm text-green-600 text-right block underline'>Forget Password?</Link>
                        </div>

                        <button type="submit" className='bg-green-600 rounded-lg text-white py-2 w-full'>Submit</button>
                        <button className='bg-green-600 rounded-lg text-white py-2 w-full' onClick={() => signIn("google")}>Sign in with Google</button>
                    </Form>
                )}

            </Formik>
        </>
    )
}
