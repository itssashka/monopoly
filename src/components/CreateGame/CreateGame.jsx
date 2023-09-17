import React, { useState } from "react";
import MySection from "../Section/MySection";
import MyInput from "../UI/MyInput";
import MyButton from "../UI/MyButton";
import MyCheckbox from "../UI/MyCheckbox";
import MyRange from "../UI/MyRange";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createGame, createGameAsync } from "../../store/gamesSlice";

const CreateGame = () => {
    const [gameData, setGameData] = useState({gameName: '', gamePassword: '', isPrivate: false, maxPlayers: 3});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmitHandle = (e) => {
        e.preventDefault();
        dispatch(createGameAsync(gameData));
        navigate('/find')
    }

    return (
        <div className="create-section section">
            <div className="section_title">Создание игры</div> 
            <div className="create_game">
                <form action="#" className="create_game-form" onSubmit={onSubmitHandle}>
                    <MyInput name='Название лобби' type='text' value={gameData.gameName} onChange={(e) => setGameData({...gameData, gameName: e.target.value})}/>
                    <MyInput name='Пароль' type='text' value={gameData.gamePassword} onChange={(e) => setGameData({...gameData, gamePassword: e.target.value})} disabled={!gameData.isPrivate}/>
                    <MyCheckbox title='Частная игра' onChange={() => setGameData({...gameData, isPrivate: !gameData.isPrivate})}/>
                    <MyRange min={2} max={5} value={gameData.maxPlayers} setValue={(e) => setGameData({...gameData, maxPlayers: e.target.value})} title='Количество мест'/>
                    <MyButton style={{alignSelf: "center"}}>Создать</MyButton>
                </form>
            </div>
        </div>
    );
};

export default CreateGame;
