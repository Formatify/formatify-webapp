"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { ROUTES } from "@/utils/constant";

const Navbar = () => {
  const { data: session }: any = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log({ session })

  const navigation = [
    { name: "Home", href: ROUTES.HOME },
    { name: "Dashboard", href: ROUTES.DASHBOARD },
  ];

  return (
    <>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href={ROUTES.HOME} className="-m-1.5 p-1.5">
              <span className="sr-only">Formatify</span>
              <Image src="/logo 1.png" width={50} height={50} alt="star logo" />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-6">
            {!session ? (
              <>
                <Link
                  href={ROUTES.LOGIN}
                  className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
                >
                  Log in
                </Link>
                <Link
                  href={ROUTES.REGISTER}
                  className="rounded-md bg-black px-3 py-2 border border-gray-500 border-1 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <span className="ml-10 text-sm">{session.user?.name ?? session.user?.email}</span>

                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
                >
                  Log out
                </button>
              </>
            )}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center gap-x-6">
              <Link href={ROUTES.HOME} className="-m-1.5 p-1.5">
                <span className="sr-only">Formatify</span>
                <Image
                  width={50}
                  height={50}
                  src="/logo 1.png"
                  alt="star logo mobile"
                />
              </Link>
              {session ? (
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="ml-auto rounded-md bg-black border border-1 border-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log out
                </button>
              ) : (
                <Link
                  href={ROUTES.HOME}
                  className="ml-auto rounded-md bg-black border border-1 border-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </Link>
              )}

              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <FaXmark className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default Navbar;
