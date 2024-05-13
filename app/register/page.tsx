"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ROUTES } from "@/utils/constant";
import RegisterForm from "./(modules)/register-form";

const RegisterPage = () => {

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [sessionStatus, router]);



  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center flex-col items-center">
          {/* <Image src="/logo 1.png" alt="star logo" width={50} height={50} />
          <h2 className="mt-6 text-center text-2xl leading-9 tracking-tight text-gray-900">
            Sign up on our website
          </h2> */}
        </div>
        <RegisterForm />
      </div>
    )
  );
};

export default RegisterPage;
