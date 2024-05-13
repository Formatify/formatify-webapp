import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { isValidEmail } from '@/helpers';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingSpinner from '@/components/Loader';

const LoginForm = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        if (!isValidEmail(email)) {
            setError("Email is invalid");
            toast.error("Email is invalid");
            return;
        }

        if (!password || password.length < 8) {
            setError("Password is invalid");
            toast.error("Password is invalid");
            return;
        }

        try {
            setIsLoading(true);
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError("Invalid email or password");
                toast.error("Invalid email or password");
                if (res?.url) router.replace("/dashboard");
            } else {
                setError("");
                toast.success("Successful login");
            }
        } catch (error) {
            console.log('Something went wront', error)
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

                        <div className="flex items-center justify-end">
                            <div className="text-sm leading-6">
                                <Link
                                    href="#"
                                    className="text-black hover:text-gray-900"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full border border-black justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm
