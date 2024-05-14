import React, { ReactNode } from "react";
import AuthImage from '../../images/bg_image.png'


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const currentYear = new Date()
  return (
    <div className="h-screen flex">


      <div className=" flex justify-center items-center lg:w-3/5 w-screen lg:pl-36 lg:pr-0 py-14 px-20">
        {children}
      </div>
      <div className=" lg:w-2/5 bg-contain bg-no-repeat bg-right" style={{ backgroundImage: `url(${AuthImage.src})` }}>
        <p className="absolute bottom-2 right-3 text-sm text-white">
          &copy; {currentYear.getFullYear()} Made with ❤️ by Formatify Team
        </p>
      </div>
    </div>
  );
};

export default Layout;
