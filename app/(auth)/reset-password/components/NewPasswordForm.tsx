"use client";


import React, { FC } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

import { SetupNewPasswordFormValues } from '@/lib/validation';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useSearchParams } from 'next/navigation'



// Define the type for form values
interface SetupNewPasswordFormValues {
    confirm_password: string;
    password: string;
    email: string | null | undefined;
}


interface SessionProps {
    userEmail: string | null | undefined;
}

const NewPasswordForm: FC<SessionProps> = ({ userEmail }): JSX.Element => {

    

    const initialValues: SetupNewPasswordFormValues = { confirm_password: '', password: '', email: userEmail };

    const searchParams = useSearchParams();
    const OTP = searchParams.get('otp')



    const SubmitForm = (values: SetupNewPasswordFormValues, actions: FormikHelpers<SetupNewPasswordFormValues>) => {

        const payload = { email: values.email, otp: OTP, password: values.password }
        console.log(payload)

        // if (payload.email && payload.otp) {

        //     axios.post('http://localhost:3000/api/reset-password', payload)
        //         .then((res) => console.log(res.data))
        //         .catch((err) => toast.error(err.response.data.message))
        //     actions.setSubmitting(false);
        // }

        // else {
        //     toast.error("Session Error Occured")
        // }


    };
    return (
        <Formik initialValues={initialValues} validate={SetupNewPasswordFormValues} onSubmit={SubmitForm}>
            {() => (
                <Form className='my-5 flex flex-col gap-4'>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email*
                        </label>

                        <div className="relative rounded-md shadow-sm">
                            <Field type="email" name="email" id="email" placeholder="john@doe.com" disabled={true}
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
    )
}


export default NewPasswordForm