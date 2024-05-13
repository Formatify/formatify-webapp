import { isValidEmail } from '@/helpers';
import { ROUTES } from '@/utils/constant';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from "uuid";
import React, { useState } from 'react'
import toast from "react-hot-toast";
import LoadingSpinner from '@/components/Loader';

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        setIsLoading(true);
        e.preventDefault();
        const firstName = e.target[0].value;
        const lastName = e.target[1].value;
        const email = e.target[2].value;
        const password = e.target[3].value;
        const country = e.target[4].value;
        const city = e.target[5].value;
        const university = e.target[6].value;
        const department = e.target[7].value;
        const subscription = "free";

        if (!firstName.trim()) {
            toast.error("First name is required");
        }

        if (!lastName.trim()) {
            toast.error("Last name is required");
        }

        if (!isValidEmail(email)) {
            toast.error("Email is invalid");
        }

        if (!password || password.length < 8) {
            toast.error("Password is invalid");
        }

        if (!country.trim()) {
            toast.error("Country is required");
        }

        if (!city.trim()) {
            toast.error("City is required");
        }

        if (!university.trim()) {
            toast.error("University is required");
        }

        if (!department.trim()) {
            toast.error("Department is required");
        }

        const verificationToken = uuidv4();

        const payload = {
            firstName,
            lastName,
            email,
            password,
            country,
            city,
            university,
            department,
            subscription,
            verificationToken
        }

        try {
            const res = await axios.post("/api/register", { payload });
            if (res.status === 400) {
                toast.error("This email is already registered")
            }
            if (res.status === 200) {
                toast.success("Registration successful, Please Check Your Email");
            }
        } catch (error) {
            toast.error("Oops, Something Went Wrong")
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex justify-between">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <label
                                    htmlFor="country"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Country
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="country"
                                        name="country"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <label
                                    htmlFor="university"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    University
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="university"
                                        name="university"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="department"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Department
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="department"
                                        name="department"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="flex w-full border border-black justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterForm
