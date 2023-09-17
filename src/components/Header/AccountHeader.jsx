import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUser, isLogin } from "../../store/userSlice";
import MyButton from "../UI/MyButton";
import { Link } from "react-router-dom";

const AccountHeader = () => {
    const accountSVG = (
        <svg
            className="account_svg"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11 14H9.31765C8.83513 14 8.59387 14 8.37806 14.0461C7.63116 14.2056 6.9853 14.7661 6.62346 15.569C6.51891 15.8009 6.44262 16.0765 6.29003 16.6278C6.10668 17.2901 6.01501 17.6213 6.00261 17.8884C5.95888 18.8308 6.46818 19.6817 7.22441 19.9297C7.43875 20 7.72864 20 8.30844 20H11.5M11 14L12 15L13 14M11 14H13M13 14H14.6824C15.1649 14 15.4061 14 15.6219 14.0461C16.3688 14.2056 17.0147 14.7661 17.3765 15.569C17.4811 15.8009 17.5574 16.0765 17.71 16.6278C17.8933 17.2901 17.985 17.6213 17.9974 17.8884C18.0411 18.8308 17.5318 19.6817 16.7756 19.9297C16.5613 20 16.2714 20 15.6916 20H12.5M11.5 20L12 16.5L12.5 20M11.5 20H12.5M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
                stroke="current"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
    const userInfo = useSelector(getCurrentUser);

    const isAuth = useSelector(isLogin);

    return (
        <div className="header_account">
            {isAuth ? (
                <Link to="/account" className="header_account-img">
                    <img src={userInfo.photo} alt={userInfo.name} />
                </Link>
            ) : (
                <Link to="/login" className="header_account-login">
                    Войти
                </Link>
            )}
        </div>
    );
};

export default AccountHeader;
