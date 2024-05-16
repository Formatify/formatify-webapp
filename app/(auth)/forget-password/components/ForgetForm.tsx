"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import LoadingSpinner from '@/components/Loader';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { Forget_Validation } from '@/lib/validation';
import axios from 'axios';




// Define the type for form values
interface ForgetFormValues {
    email: string;
}

export default function ForgetForm() {

    const initialValues: ForgetFormValues = { email: '' };
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const SubmitForm = (values: ForgetFormValues, actions: FormikHelpers<ForgetFormValues>) => {
        const { email } = values;

        axios.post('http://localhost:3000/api/forgot-password', { email }).then((data) => {
            toast.success('Success ! Check Your Mail');
            actions.resetForm();
        })
        actions.setSubmitting(false);
    };
    return (
        <>
            {isLoading && <LoadingSpinner />}

            <Formik initialValues={initialValues} validate={Forget_Validation} onSubmit={SubmitForm}>
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




                        <button type="submit" className='bg-green-600 rounded-lg text-white py-2 w-full'>Continue</button>
                    </Form>
                )}

            </Formik>
        </>
    )
}
