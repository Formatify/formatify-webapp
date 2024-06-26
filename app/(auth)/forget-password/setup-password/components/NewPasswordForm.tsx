"use client";

import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import LoadingSpinner from '@/components/Loader';
import toast from 'react-hot-toast';

import { SetupNewPasswordFormValues } from '@/lib/validation';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from "next-auth/react"





// Define the type for form values
interface SetupNewPasswordFormValues {
    confirm_password: string;
    password: string;
    email: string | null | undefined;
}

export default function NewPasswordForm() {

    const initialValues: SetupNewPasswordFormValues = { confirm_password: '', password: '', email: '' };
    const searchParams = useSearchParams();
    const OTP = searchParams.get('otp')
    const router = useRouter()





    const SubmitForm = (values: SetupNewPasswordFormValues, actions: FormikHelpers<SetupNewPasswordFormValues>) => {
        const payload = { email: values.email, OTP: OTP, password: values.password }
        if (payload.email && payload.OTP) {

            axios.post('http://localhost:3000/api/reset-password', payload)
                .then((res) => {
                    toast.success(res.data.message)
                    actions.resetForm();
                    router.replace('/signin')
                })
                .catch((err) => toast.error(err.response.data.message))
            actions.setSubmitting(false);
        }

        else {
            toast.error("Session Error Occured")
        }


    };
    return (
        <>
            <Formik initialValues={initialValues} validate={SetupNewPasswordFormValues} onSubmit={SubmitForm}>
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

                                <Field type="password" name="password" placeholder="Type New Password" id="password" autoComplete='off'
                                    className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />

                            </div>
                            <ErrorMessage name="password" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>

                        <div>
                            <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm New Password*
                            </label>

                            <div className="relative rounded-md shadow-sm">

                                <Field type="password" name="confirm_password" placeholder="Confirm New Password" id="confirm_password" autoComplete='off'
                                    className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />

                            </div>
                            <ErrorMessage name="confirm_password" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>
                        <button type="submit" className='bg-green-600 rounded-lg text-white py-2 w-full'>Set Password</button>
                    </Form>
                )}

            </Formik>
        </>
    )
}
