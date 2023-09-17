import React from "react";
import MySection from "../Section/MySection";

const GamesHistory = ({ userInfo }) => {
    
    return (
        <MySection title="История матчей">
            <div className="account_history">
                {userInfo.gamesList.map((game) => (
                    <div key={game.id} className="account_history_item">
                        <div className="history_item-gameName">
                            Игра <span>{game.title}</span>
                        </div>
                        <div className="history_item-date">
                            {game.date}
                        </div>
                        <div className={game.hasWon ? 'history_item-hasWon win' : 'history_item-hasWon loose'}>
                            {game.hasWon ? 'Победа' : 'Поражение'}
                        </div>
                    </div>
                ))}
            </div>
        </MySection>
    );
};

export default GamesHistory;
