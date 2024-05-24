"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Signup_validation } from '@/lib/validation';
import { countries } from '@/lib/countries';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import toast from 'react-hot-toast';

interface SignUpFormValues {
    fullName: string;
    email: string;
    password: string;
}

export default function SignupForm() {

    const initialValues: SignUpFormValues = { fullName: '', email: '', password: '' };
    const SubmitForm = (values: SignUpFormValues, actions: FormikHelpers<SignUpFormValues>) => {
        const verificationToken = uuidv4();
        const payload = {
            fullName: values.fullName,
            email: values.email,
            password: values.password,
            subscription: "free",
            verificationToken: verificationToken
        }

        axios.post("/api/register", payload)
            .then((res) => {
                toast.success(res.data.message)
                actions.resetForm();
            })
            .catch((err) => toast.error(err.response.data.message))

        actions.setSubmitting(false);
    };

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const selectedCountry = event.target.value;
        setFieldValue('country', selectedCountry);
        setFieldValue('city', '');
    };

    return (

        <Formik initialValues={initialValues} validate={Signup_validation} onSubmit={SubmitForm}>
            {({ values, setFieldValue }) => (
                <Form className='my-5 flex flex-col gap-4'>
                    <div className='grid  gap-3'>

                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name*
                            </label>

                            <div className="relative rounded-md shadow-sm">

                                <Field type="fullName" name="fullName" id="fullName" autoComplete='off' placeholder="Full Name"
                                    className="px-3 block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <ErrorMessage name="fullName" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>






                        <div >
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email*
                            </label>

                            <div className="relative rounded-md shadow-sm">

                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    placeholder="john@doe.com"
                                />
                            </div>
                            <ErrorMessage name="email" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>


                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password*
                            </label>

                            <div className="relative rounded-md shadow-sm">

                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete='off'
                                    className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                    placeholder="Alpha Numeric Password"
                                />
                            </div>
                            <ErrorMessage name="password" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>



                    </div>

                    <button type="submit" className='bg-green-600 rounded-lg text-white py-2 w-full'>Sign Up</button>
                </Form>
            )}

        </Formik>
    )
}
