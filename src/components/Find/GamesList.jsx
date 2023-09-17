import React, { useEffect } from "react";
import MySection from "../Section/MySection";
import GameCard from "./GameCard";
import { useSelector } from "react-redux";
import { getGames } from "../../store/gamesSlice";
import { getCurrentUser } from "../../store/userSlice";

const GamesList = () => {
    const games = useSelector(getGames);
    const currentUser = useSelector(getCurrentUser);
    
    return (
        <div className="find_games_list">
            {Object.keys(games.current).length > 0 && (
                <MySection title={"Ваша игра"}>
                    <GameCard key={games.current.id} game={games.current} isCurrent={true} playerId={currentUser.id}/>
                </MySection>
            )}
            <MySection title={"Список игр"}>
                {games.games.map(
                    (game) =>
                        game.id !== games.current.id && (
                            <GameCard key={game.id} game={game} />
                        )
                )}
            </MySection>
        </div>
    );
};

export default GamesList;
