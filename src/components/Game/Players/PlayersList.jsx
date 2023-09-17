import React from "react";
import { useSelector } from "react-redux";
import { getActivePlayer, getPlayers } from "../../../store/matchSlice";
import PlayerCard from "./PlayerCard";
import { getCurrentUser } from "../../../store/userSlice";

const PlayersList = () => {
    const players = useSelector(getPlayers);
    const currentPlayer = useSelector(getCurrentUser);
    const activePlayer = useSelector(getActivePlayer);
    return (
        <div className="players-list">
            {players.players.map(player => <PlayerCard key={player.id} player={player} currentPlayer={currentPlayer} isActive={activePlayer.match_id === player.match_id}/>)}
        </div>
    );
};

export default PlayersList;
