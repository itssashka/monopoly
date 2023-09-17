import React from "react";
import { useDispatch } from "react-redux";
import { rollDiceAsync } from "../../../store/matchSlice";
import MatchBtn from "./MatchBtn";

const ButtonRoll = () => {
    const dispatch = useDispatch();

    const rollDice = () => {
        dispatch(rollDiceAsync());
    };

    return (
        <MatchBtn onClick={rollDice}>
            Бросить кубик
        </MatchBtn>
    );
};

export default ButtonRoll;
