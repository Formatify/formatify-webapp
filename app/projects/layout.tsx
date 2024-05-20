import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div>
            <div>Navbar Here</div>
            <div>{children}</div>
        </div>
    );
};

export default Layout;
