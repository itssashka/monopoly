import React from "react";
import Logo from "../Logo/Logo";
import Nav from "./Nav";
import AccountHeader from "./AccountHeader";
import { useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/match" && (
                <div className="header">
                    <div className="header_container container">
                        <Logo />
                        <Nav />
                        <AccountHeader />
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
