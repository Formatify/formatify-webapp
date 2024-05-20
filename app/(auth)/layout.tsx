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
      <Link className="absolute" href={'/'} title="Back to Home">
        <div className="flex items-center gap-2 hover:bg-slate-200 px-4 py-2 rounded-full"><MdArrowBackIos /> <span>Back</span></div>
      </Link>
      <div className="h-screen flex">
        <div className=" flex justify-center items-center lg:w-3/5 w-screen lg:pl-36 lg:pr-0 py-14 px-20">
          {children}
        </div>
        <div className=" lg:w-2/5 bg-contain bg-no-repeat bg-right" style={{ backgroundImage: `url(${AuthImage.src})` }}>
          <p className="absolute bottom-2 right-3 text-sm lg:text-white text-dark">
            &copy; {currentYear.getFullYear()} Made with ❤️ by Formatify Team
          </p>
        </div>
      </div>
    </>
  );
};

export default Layout;
