import React from "react";
import ButtonRoll from "./ButtonRoll";
import Dices from "./Dices";
import { useSelector } from "react-redux";
import { getState } from "../../../store/matchSlice";
import BuyCellField from "./BuyCellField";
import PayRentField from "./PayRentField";
import JailField from "./JailField";

const UIField = () => {
    const state = useSelector(getState);
    return (
        <div className="UI-field">
            {state === "buy" && <BuyCellField />}
            {state === "roll" && <ButtonRoll />}
            {state === 'arrested' && <JailField/>}
            {state === "pay" && <PayRentField/>} 
            <Dices />
        </div>
    );
};

export default UIField;
