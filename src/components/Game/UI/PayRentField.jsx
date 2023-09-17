import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCell, getDices, payRentAsync } from "../../../store/matchSlice";
import MatchBtn from "./MatchBtn";

const PayRentField = () => {
    const currentCell = useSelector(getCurrentCell);
    const dices = useSelector(getDices);
    const dispatch = useDispatch();
    const rent = currentCell.subtype !== 'communal' ? currentCell.rent : dices.sum * 6

    const payRent = () => {
        dispatch(payRentAsync());
    }
    
    return (
        <div className="pay-rent">
            <div className="pay-rent__title">Заплатить ренту в размере {rent}$</div>
            <MatchBtn className="pay-rent__btn" onClick={payRent}>Заплатить</MatchBtn>
        </div>
    );
};

export default PayRentField;
