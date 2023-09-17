import React from "react";
import { Link } from "react-router-dom";
import MyButton from "../UI/MyButton";

const MainTop = () => {
    return (
        <div className="main_top">
            <div className="container main_top_container">
                <div className="main_top-item">
                    <img src="./imgs/main/field.jpg" alt="monopoly" />
                </div>
                <div className="main_top-item">
                    <div className="item_text">Начни играть прямо сейчас!</div>
                    <Link to="/find">
                        <MyButton>Найти игру</MyButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MainTop;
