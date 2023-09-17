import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    acceptOfferAsync,
    changeOfferPlayer,
    changeState,
    changeStateAsync,
    clearOffer,
    denyOfferAsync,
    getCurrentPlayer,
    getOffer,
    getOfferPlayer,
    getPreviousPlayer,
    getPreviousState,
    getState,
    removeFromOffer,
    sendOffer,
    sendOfferAsync,
} from "../../../store/matchSlice";
import MatchBtn from "./MatchBtn";
import VerticalLine from "./VerticalLine";

const OfferField = () => {
    const currentPlayer = useSelector(getCurrentPlayer);
    const offerPlayer = useSelector(getOfferPlayer);
    const previous_state = useSelector(getPreviousState);
    const state = useSelector(getState);
    const offer = useSelector(getOffer);
    const previous_player = useSelector(getPreviousPlayer);
    const [money, setMoney] = useState({ currentPlayer: 0, offerPlayer: 0 });
    const dispatch = useDispatch();

    const currentPlayerMoneyChange = (e) => {
        if (currentPlayer.money > e.target.value) {
            setMoney({ ...money, currentPlayer: e.target.value });
        } else {
            setMoney({ ...money, currentPlayer: currentPlayer.money });
        }
    };

    const offerPlayerMoneyChange = (e) => {
        if (offerPlayer.money > e.target.value) {
            setMoney({ ...money, offerPlayer: e.target.value });
        } else {
            setMoney({ ...money, offerPlayer: offerPlayer.money });
        }
    };

    const closeOffer = () => {
        dispatch(changeOfferPlayer({}));
        dispatch(changeStateAsync(previous_state));
        dispatch(clearOffer());
    };

    const removeFromOfferHandle = (property) => {
        dispatch(removeFromOffer(property));
    };

    const sendOfferHandle = () => {
        dispatch(sendOfferAsync(money));
    };

    const acceptOfferHandle = () => {
        dispatch(acceptOfferAsync());
    }

    const denyOfferHandle = () => {
        dispatch(denyOfferAsync());
    };

    return (
        <div className="offer-field">
            <div className="offer-field__title">Договор</div>
            <div className="offer-field__columns">
                <div className="offer-field__column">
                    <div className="offer-field__column__title">Вы</div>
                    <div className="offer-field__column__subtitle">Отдаете</div>
                    <div className="offer-field__column__body">
                        <div className="offer-field__column__money">
                            <div className="offer-field__column__money__title">
                                Наличные:
                            </div>
                            <input
                                type="number"
                                className="offer-field__column__money__input"
                                value={state !== 'confirmation' ? money.currentPlayer : offer.money.offerPlayer}
                                onChange={currentPlayerMoneyChange}
                                disabled = {state === 'confirmation'}
                            />
                            $
                        </div>
                        {offer[state !== 'confirmation' ? 'offer_initiator' : 'offer_respondent'].map((property) => (
                            <div
                                className="offer-field__column__company"
                                key={property.id}
                            >
                                <div className="offer-field__column__company__img">
                                    <img src={property.img} alt="" />
                                </div>
                                <div className="offer-field__column__company__name">
                                    {property.name}
                                </div>
                                {state !== "confirmation" && (
                                    <button
                                        className="offer-field__column__company__btn"
                                        onClick={() =>
                                            removeFromOfferHandle(property)
                                        }
                                    >
                                        -
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <VerticalLine />
                <div className="offer-field__column">
                    <div className="offer-field__column__title">
                        {state !== 'confirmation' ? offerPlayer.name : previous_player.name}
                    </div>
                    <div className="offer-field__column__subtitle">
                        Получаете
                    </div>
                    <div className="offer-field__column__body">
                        <div className="offer-field__column__money">
                            <div className="offer-field__column__money__title">
                                Наличные:
                            </div>
                            <input
                                type="number"
                                className="offer-field__column__money__input"
                                value={state !== 'confirmation' ? money.offerPlayer : offer.money.currentPlayer}
                                onChange={offerPlayerMoneyChange}
                                disabled = {state === 'confirmation'}
                            />
                            $
                        </div>
                        {offer[state !== 'confirmation' ? 'offer_respondent' : 'offer_initiator'].map((property) => (
                            <div
                                className="offer-field__column__company"
                                key={property.id}
                            >
                                <div className="offer-field__column__company__img">
                                    <img src={property.img} alt="" />
                                </div>
                                <div className="offer-field__column__company__name">
                                    {property.name}
                                </div>
                                <button
                                    className="offer-field__column__company__btn"
                                    onClick={() =>
                                        removeFromOfferHandle(property)
                                    }
                                >
                                    -
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {state !== "confirmation" ? (
                <div className="offer-field__btns">
                    <MatchBtn onClick={sendOfferHandle}>Отправить</MatchBtn>
                    <MatchBtn onClick={closeOffer}>Отменить</MatchBtn>
                </div>
            ) : (
                <div className="offer-field__btns">
                    <MatchBtn onClick={acceptOfferHandle}>Принять</MatchBtn>
                    <MatchBtn onClick={denyOfferHandle}>Отклонить</MatchBtn>
                </div>
            )}
        </div>
    );
};

export default OfferField;
