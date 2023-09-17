import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login">
            <LoginForm />
            <div className="login-to_reg">
                Еще нет аккаунта?{" "}
                <Link to="/reg" className="myLink">
                    Зарегистрироваться
                </Link>
            </div>
        </div>
    );
};

export default Login;
