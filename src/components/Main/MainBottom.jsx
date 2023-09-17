import React from "react";
import MyButton from "../UI/MyButton";
import { Link } from "react-router-dom";

const MainBottom = () => {
    const bottomItems = [
        {
            title: "Цель игры",
            body: "Остаться в игре после того, как все остальные игроки обанкротятся.",
            img: "./imgs/main/cup.png",
            alt: "cup",
        },
        {
            title: "Как это сделать?",
            body: "Скупать всю собственность и взымать с других игроков арендную плату. Покупать комплекты собственности для увеличения стоимости аренды",
            img: "./imgs/main/house.png",
            alt: "house",
        },
        {
            title: "Кто ходит первым",
            body: "Каждый игрок бросает два белых кубика. Первым ходит тот, кто выбросил наибольшее количество баллов.",
            img: "./imgs/main/rocket.png",
            alt: "rocket",
        },
    ];

    return (
        <div className="main_bottom container">
            {bottomItems.map((item) => (
                <div className="main_bottom-item">
                    <div className="item-desc">
                        <div className="item-desc_title">{item.title}</div>
                        <div className="item-desc_body">{item.body}</div>
                    </div>
                    <div className="item-img">
                        <img src={item.img} alt={item.alt} />
                    </div>
                </div>
            ))}
            <Link to='/find'><MyButton>Начать игру</MyButton></Link>
        </div>
    );
};

export default MainBottom;
