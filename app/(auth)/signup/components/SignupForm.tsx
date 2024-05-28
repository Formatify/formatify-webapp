"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Signup_validation } from '@/lib/validation';
import { countries } from '@/lib/countries';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import toast from 'react-hot-toast';

interface SignUpFormValues {
    firstName: string;
    lastName: string;
    organizationName: string;
    deptName: string;
    email: string;
    password: string;
    city: string;
    country: string;
}

export default function SignupForm() {

    const initialValues: SignUpFormValues = { firstName: '', lastName: '', email: '', password: '', organizationName: '', deptName: '', country: Object.keys(countries)[0], city: Object.values(countries)[0][0] };
    const SubmitForm = (values: SignUpFormValues, actions: FormikHelpers<SignUpFormValues>) => {
        const verificationToken = uuidv4();
        const payload = {
            // firstName: values.firstName,
            // lastName: values.lastName,
            userName: values.firstName + " " + values.lastName,
            email: values.email,
            password: values.password,
            country: values.country,
            city: values.city,
            university: values.organizationName,
            department: values.deptName,
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
                    <div className='grid grid-cols-2  gap-3'>

                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                First Name*
                            </label>

                            <div className="relative rounded-md shadow-sm">

                                <Field type="firstName" name="firstName" id="firstName" autoComplete='off' placeholder="First Name"
                                    className="px-3 block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <ErrorMessage name="firstName" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>


                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                Last Name*
                            </label>

                            <div className="relative rounded-md shadow-sm">

                                <Field
                                    type="lastName" name="lastName" id="lastName" placeholder="Last Name" autoComplete='off'
                                    className="px-3 block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <ErrorMessage name="lastName" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Country*
                            </label>

                            <div className="relative rounded-md shadow-sm">

                                <Field as="select" name="country"
                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleCountryChange(event, setFieldValue)}
                                    className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
                                    {
                                        Object.keys(countries).map(country => <option key={country} value={country}>{country}</option>)
                                    }
                                </Field>
                            </div>
                            <ErrorMessage name="country" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                City*
                            </label>

                            <div className="relative rounded-md shadow-sm">
                                <Field as="select" name="city"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
                                    {countries[values.country].map((city: any) => <option key={city} value={city}>{city}</option>)}
                                </Field>

                            </div>
                            <ErrorMessage name="city" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>

                        <div>
                            <label htmlFor="Organization Name" className="block text-sm font-medium leading-6 text-gray-900 truncate">
                                Institute/ Organization Name*
                            </label>

                            <div className="relative rounded-md shadow-sm">

                                <Field name="organizationName" placeholder="University Name" className="block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />

                            </div>
                            <ErrorMessage name="organizationName" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                        </div>


                        <div>
                            <label htmlFor="deptName" className="block text-sm font-medium leading-6 text-gray-900">
                                Department Name*
                            </label>

                            <div className="relative rounded-md shadow-sm">

                                <Field type="deptName" name="deptName" id="deptName" autoComplete='off' placeholder="Department Name"
                                    className="px-3 block w-full rounded-md border-0 py-1.5   text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <ErrorMessage name="deptName" component="div" className='text-sm text-red-900 pl-2 pt-2' />
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
