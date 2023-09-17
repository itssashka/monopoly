import React from "react";
import MySection from "../Section/MySection";
import MyButton from "../UI/MyButton";
import { useDispatch } from "react-redux";
import { logOutAsync } from "../../store/userSlice";

const UserInfo = ({ userInfo }) => {
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logOutAsync());
    }

    return (
        <div className="account-container">
            <MySection title="Информация о пользователе">
                <div className="account-info">
                    <div className="user_img">
                        <img
                            src={userInfo.photo}
                            alt="Фотография пользователя"
                        />
                    </div>
                    <div className="user_info">
                        <div className="user_info-username">
                            {userInfo.name}
                        </div>
                        <div className="user_info-desc">
                            Игры: {userInfo.gamesCount}
                        </div>
                        <div className="user_info-desc">
                            Победы: {userInfo.gamesWon}
                        </div>
                        <div className="user_info-desc">
                            Поражения: {userInfo.gamesCount - userInfo.gamesWon}
                        </div>
                    </div>
                </div>
                <MyButton style={{margin: 'auto'}} onClick={logOut}>Выйти</MyButton>
            </MySection>
        </div>
    );
};

export default UserInfo;
