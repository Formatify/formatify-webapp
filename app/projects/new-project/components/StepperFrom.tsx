"use client"

import React, { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { FiPlus } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";


const steps = [
    'Select Template',
    'Add Details',
    'Compile',
];



// Define the type for form values
interface StepperProps {
    template: string;
    title: string;
    members: [];
    newMember: string;
    fullName: string;
    department: string;
    University: string;
    city: string;
    country: string;
    email: string

}

export default function HorizontalLinearAlternativeLabelStepper() {
    const initialValues: StepperProps = {
        template: '',
        title: '',
        members: [],
        newMember: '',
        fullName: 'Muhammad Osama',
        department: 'Computer Science',
        University: 'Fast NUCES',
        city: 'Karachi',
        country: 'Pakistan',
        email: 'uusman004@gmail.com'
    };

    const SubmitForm = (values: StepperProps, actions: FormikHelpers<StepperProps>) => {

        actions.setSubmitting(false);
    };

    const addMember = (memberEmail: any, setFieldValue: any) => {
        const newMemberEmail = memberEmail.newMember; // Get the new member email
        setFieldValue('members', [...memberEmail.members, newMemberEmail]);
        setFieldValue('newMember', '');
    }

    const removeMember = ({ email, values, setFieldValue }: any) => {
        const newEmail = values.members.filter((data: any) => data !== email)
        setFieldValue('members', newEmail);
    }


    const [activeStep, setActiveStep] = useState(0)

    const templates = ['0', '1', '2', '3', '4', '5', '6']

    return (
        <div className='w-full px-10 flex flex-col gap-8'>

            <h2 className='px-24 '><span className='text-slate-400'>Projects</span> / <span className='text-black'>Create Project</span></h2>

            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}

                        sx={{
                            "& .MuiStepLabel-root .Mui-completed": {
                                color: "#38a832"
                            },
                            "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
                                color: "#38a832"
                            },
                            "& .MuiStepLabel-root .Mui-active": {
                                color: "#38a832"
                            },
                            "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                                color: "38a832"
                            },
                            "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                                fill: "white"
                            }
                        }}>
                        <StepLabel >{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div className=' lg:mx-24 lg:h-[60vh] h-full rounded shadow-lg bg-white flex flex-col gap-4 p-4'>

                <div className='h-full w-full p-4 overflow-y-auto'>


                    <Formik initialValues={initialValues} onSubmit={SubmitForm}>
                        {({ values, setFieldValue }) => (
                            <Form className=''>

                                {/* Step 1 */}


                                {
                                    activeStep == 0 && <div>
                                        <h2 className='text-green-600 mb-5 underline font-semibold'>Template Gallery</h2>

                                        <div className='grid grid-cols-2  gap-5 lg:grid-cols-5 md:grid-cols-4  overflow-hidden '>
                                            {
                                                templates.map((temp, key) =>

                                                    <label key={key}

                                                        className={
                                                            classNames('size-36 rounded-lg bg-slate-100 cursor-pointer',
                                                                values.template == temp && 'border-2 border-green-700'
                                                            )
                                                        }
                                                    >
                                                        <Field type="radio" name="template" value={temp} className='hidden' />
                                                        Template- {temp}
                                                    </label>

                                                )
                                            }

                                        </div>
                                    </div>
                                }


                                {
                                    activeStep == 1 && <div className='grid grid-cols-2 gap-20'>
                                        <div>
                                            <h2 className='text-green-600 mb-5 underline font-semibold'>Project Details</h2>
                                            <p className="text-xs text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, aliquid.</p>

                                            <div className="flex flex-col gap-5 mt-10">
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Title*
                                                    </label>

                                                    <div className="relative rounded-md shadow-sm">
                                                        <Field type="text" name="title" id="title" placeholder="Title"
                                                            className="block w-full rounded-md border-0 py-1.5  bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                    <ErrorMessage name="title" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                                                </div>


                                                <div>
                                                    <label htmlFor="email"


                                                        className="block text-sm font-medium leading-6 text-gray-900">
                                                        Add Members
                                                    </label>

                                                    <div className="relative rounded-md shadow-sm flex justify-between  border-0  bg-gray-200  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
                                                        <Field type="email" name="newMember" id="newMember" placeholder="john@doe.com"
                                                            className="block  border-0 bg-gray-200 " />
                                                        <button

                                                            onClick={() => addMember(values, setFieldValue)}


                                                            type='button' className='text-xs bg-black text-white px-3 rounded-r-lg'>
                                                            <FiPlus className='size-3 lg:hidden' />
                                                            <span className='sm:hidden lg:block'>Add Member</span></button>
                                                    </div>

                                                </div>

                                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                                    {
                                                        values.members.map((email) => <div key={email} className=' rounded-md text-sm  italic text-gray-500 py-1 px-2 flex items-center justify-between border-dashed border-2 border-green-500'><span>{email}</span>
                                                            <button type='button' onClick={() => removeMember({ email, values, setFieldValue })}>
                                                                <MdOutlineCancel />
                                                            </button>
                                                        </div>)
                                                    }

                                                </div>
                                            </div>



                                        </div>
                                        <div>
                                            <h2 className='text-green-600 mb-5 underline font-semibold'>Author Details</h2>
                                            <p className="text-xs text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, aliquid.</p>

                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
                                                <div>
                                                    <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Full Name*
                                                    </label>

                                                    <div className="relative rounded-md shadow-sm">
                                                        <Field type="text" name="fullName" id="fullName" placeholder="FullName"
                                                            className="block w-full rounded-md border-0 py-1.5  bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                    <ErrorMessage name="fullName" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                                                </div>

                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Email*
                                                    </label>

                                                    <div className="relative rounded-md shadow-sm">
                                                        <Field type="email" name="email" id="email" placeholder="Email"
                                                            className="block w-full rounded-md border-0 py-1.5  bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                    <ErrorMessage name="email" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                                                </div>

                                                <div>
                                                    <label htmlFor="university" className="block text-sm font-medium leading-6 text-gray-900">
                                                        University*
                                                    </label>

                                                    <div className="relative rounded-md shadow-sm">
                                                        <Field type="text" name="University" id="University" placeholder="University"
                                                            className="block w-full rounded-md border-0 py-1.5  bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                    <ErrorMessage name="University" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                                                </div>
                                                <div>
                                                    <label htmlFor="Department" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Department*
                                                    </label>

                                                    <div className="relative rounded-md shadow-sm">
                                                        <Field type="text" name="department" id="department" placeholder="department"
                                                            className="block w-full rounded-md border-0 py-1.5  bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                    <ErrorMessage name="department" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                                                </div>

                                                <div>
                                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Country*
                                                    </label>

                                                    <div className="relative rounded-md shadow-sm">
                                                        <Field type="text" name="country" id="country" placeholder="country"
                                                            className="block w-full rounded-md border-0 py-1.5  bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                    <ErrorMessage name="country" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                                                </div>

                                                <div>
                                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                        City*
                                                    </label>

                                                    <div className="relative rounded-md shadow-sm">
                                                        <Field type="text" name="city" id="city" placeholder="city"
                                                            className="block w-full rounded-md border-0 py-1.5  bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                    <ErrorMessage name="city" component="div" className='text-sm text-red-900 pl-2 pt-2' />
                                                </div>





                                            </div>



                                        </div>

                                    </div>
                                }



                                {
                                    activeStep == 2 && <div>
                                        <h2 className='text-green-600 mb-5 underline font-semibold'>Confirmation</h2>
                                        <p className="text-xs text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, aliquid.</p>

                                        <div className="grid grid-cols-2 mt-5">
                                            <div className="relative overflow-x-auto">
                                                <table className="w-full text-sm text-left">

                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" colSpan={2} className="px-6 py-3">
                                                                Paper Details
                                                            </th>

                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr className="bg-white border-b ">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                            >
                                                                Paper Title
                                                            </th>
                                                            <td className="px-6 py-4">{values.title}</td>
                                                        </tr>

                                                        <tr className="bg-white border-b ">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                            >
                                                                Template
                                                            </th>
                                                            <td className="px-6 py-4">{values.template}</td>
                                                        </tr>


                                                        {
                                                            values.members.map((author, key) => <tr key={key} className="bg-white border-b ">
                                                                <th
                                                                    scope="row"
                                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                                >
                                                                    Co-Author ({key + 1})
                                                                </th>
                                                                <td className="px-6 py-4">{author}</td>
                                                            </tr>)
                                                        }







                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="relative overflow-x-auto">
                                                <table className="w-full text-sm text-left">

                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" colSpan={2} className="px-6 py-3">
                                                                Author Details
                                                            </th>

                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr className="bg-white border-b ">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                            >
                                                                Full Name
                                                            </th>
                                                            <td className="px-6 py-4">{values.fullName}</td>
                                                        </tr>

                                                        <tr className="bg-white border-b ">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                            >
                                                                Email
                                                            </th>
                                                            <td className="px-6 py-4">{values.email}</td>
                                                        </tr>

                                                        <tr className="bg-white border-b ">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                            >
                                                                University
                                                            </th>
                                                            <td className="px-6 py-4">{values.University}</td>
                                                        </tr>

                                                        <tr className="bg-white border-b ">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                            >
                                                                Department
                                                            </th>
                                                            <td className="px-6 py-4">{values.department}</td>
                                                        </tr>

                                                        <tr className="bg-white border-b ">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                            >Country
                                                            </th>
                                                            <td className="px-6 py-4">{values.country}</td>
                                                        </tr>

                                                        <tr className="bg-white border-b ">
                                                            <th
                                                                scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                            >
                                                            City
                                                            </th>
                                                            <td className="px-6 py-4">{values.city}</td>
                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                }





                            </Form>
                        )}

                    </Formik>



                </div>



                <div className='flex gap-4 justify-end'>

                    {
                        activeStep != 0 &&
                        <button className='border-green-500 border text-green-500 rounded px-8 py-1 text-xs'
                            onClick={() => setActiveStep(activeStep - 1)}
                        >Back
                        </button>
                    }





                    {
                        (activeStep + 1 === steps.length) ?
                            <button className='bg-green-500 text-white rounded px-8 py-1 text-xs'>Submit</button>
                            :
                            <button className='bg-green-500 text-white rounded px-8 py-1 text-xs'
                                onClick={() => setActiveStep(activeStep + 1)}
                            >Next</button>
                    }

                </div>



            </div>
        </div>
    );
}
