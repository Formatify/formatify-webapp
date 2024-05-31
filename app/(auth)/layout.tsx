import React, { ReactNode } from "react";
import AuthImage from '../../images/bg_image.png'
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const currentYear = new Date()
  return (
    <>
      <div className="lg:h-screen md:h-screen flex flex-1 justify-center">
        <div className=" p-3 sm:p-12 lg:w-3/5 xl:w-3/5 w-ful flex flex-col items-center justify-center">
          <div  className=" ">
            <div className="flex items-center gap-5 lg:ml-5 mb-2">
              <Link href={'/'} title="Back to Home" className="hidden md:block">
                <div className="flex items-center gap-2 hover:bg-slate-200 p-2 justify-center  size-7 rounded-full"><MdArrowBackIos /> </div>
              </Link>

              <div className='flex gap-5 b ml-5 lg:ml-0 md:ml-0'>
                <Link className='border-2 border-black px-5 py-1 rounded-full text-sm' href={'/signin'}>Sign In</Link>
                <Link className='bg-black border-2 border-black text-white px-5 py-1 rounded-full text-sm' href={'/signup'}>Sign Up</Link>
              </div>
            </div>

            <div className="lg:pl-16 p-4">
              {children}
            </div>

            <div className=" flex justify-center items-center md:hidden lg:hidden">
              <Link href={'/'} className="text-sm text-green-600  underline">
                Back to Home
              </Link>
            </div>

          </div>
        </div>
        <div className=" lg:w-2/5 bg-cover rounded-l-3xl border-l-2 bg-no-repeat bg-right hidden flex-1 items-center justify-center  p-6 text-center sm:p-12 lg:flex  xl:w-2/5" style={{ backgroundImage: `url(${AuthImage.src})` }}>
          <Link href={'/'} className="absolute top-10">
            <img
              className="size-16 "
              src="data:image/png;base64,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" alt="logo" />
          </Link>
          <p className="absolute bottom-2 right-3 text-sm lg:text-white text-dark">
            &copy; {currentYear.getFullYear()} Made with ❤️ by Formatify Team
          </p>
        </div>
      </div>
    </>
  );
};

export default Layout;
