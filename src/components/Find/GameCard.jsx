import React, { useEffect } from "react";
import MyButton from "../UI/MyButton";
import { useDispatch } from "react-redux";
import { joinGame, joinGameAsync, leftGame } from "../../store/gamesSlice";
import Loader from "../UI/Loader";
import Line from "../UI/Line";

const GameCard = ({ game, isCurrent = false, playerId = null}) => {
    const plusSVG = (
        <svg
            viewBox="0 0 256 256"
            id="Flat"
            xmlns="http://www.w3.org/2000/svg"
            className="plus_svg"
        >
            <path d="M128,28A100,100,0,1,0,228,128,100.113,100.113,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.10447,92.10447,0,0,1,128,220Zm44-92a4.0002,4.0002,0,0,1-4,4H132v36a4,4,0,0,1-8,0V132H88a4,4,0,0,1,0-8h36V88a4,4,0,0,1,8,0v36h36A4.0002,4.0002,0,0,1,172,128Z" />
        </svg>
    );
    const crossSVG = (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cross_svg"
        >
            <path
                d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                fill="current"
            />
        </svg>
    );

    let emptySlotsCount = game.maxPlayers - game.playersList.length;
    const dispatch = useDispatch();

    const joinGameHandle = () => {
        dispatch(joinGameAsync(game.id));
        window.scrollTo(0, 0);
    };

    const leftGameHandle = () => {
        dispatch(leftGame(game.id));
    }


    return (
        <div className="game_card">
            <div className="card_title">Игра {game.gameName}</div>
            <div className="card_players">
                {game.playersList.map((player) => (
                    <div className="card_players-item" key={player.id}>
                        <div className="player_img">
                            <img src={player.photo} alt="player" />
                        </div>
                        <div className="player_name user_name">{player.id !== playerId ? player.name : <div>Вы</div>}</div>
                        {player.id === playerId && <div onClick={leftGameHandle}>{crossSVG}</div>}
                    </div>
                ))}
                {[...Array(emptySlotsCount)].map((_, index) =>
                    !isCurrent ? (
                        <div key={index} onClick={joinGameHandle} className="card_slot">
                            {plusSVG}
                            <p>Вступить</p>
                        </div>
                    ) : (
                        <div key={index} className="card_slot"><Loader /><p>Ожидание</p></div>                        
                    )
                )}
            </div>
        </div>
    );
};

export default GameCard;
