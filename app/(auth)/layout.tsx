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
      {/* <Link className="absolute top-11 left-7" href={'/'} title="Back to Home">
        <div className="flex items-center gap-2 hover:bg-slate-200 px-4 py-2 rounded-full"><MdArrowBackIos /> </div>
      </Link> */}

      <div className="h-screen flex gap-28">
        <div className=" flex  items-center lg:w-3/5 w-screen 
      
        
        ">


          <div>
            <div className="flex items-center gap-5 mb-10 ml-5 ">

              <div>
                <Link
                  href={'/'} title="Back to Home">
                  <div className="flex items-center gap-2 hover:bg-slate-200 p-2 justify-center  size-7 rounded-full"><MdArrowBackIos /> </div>
                </Link>
              </div>

              <div className='flex gap-5'>
                <Link className='border-2 border-black px-5 py-1 rounded-full text-sm' href={'/signin'}>Sign In</Link>
                <Link className='bg-black border-2 border-black text-white px-5 py-1 rounded-full text-sm' href={'/signup'}>Sign Up</Link>

              </div>



            </div>
            {children}

          </div>



        </div>
        <div className=" lg:w-2/5 bg-contain border-l-2 bg-no-repeat bg-right" style={{ backgroundImage: `url(${AuthImage.src})` }}>




          <p className="absolute bottom-2 right-3 text-sm lg:text-white text-dark">
            &copy; {currentYear.getFullYear()} Made with ❤️ by Formatify Team
          </p>
        </div>
      </div>
    </>
  );
};

export default Layout;
