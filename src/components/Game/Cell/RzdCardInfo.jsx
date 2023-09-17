import React from "react";

const RzdCardInfo = ({ cell }) => {
    return (
        <>
            <div className="cell-card__item">
                <div className="cell-card__attribute">Рента:</div>
                <div className="cell-card__price">{cell.rent}</div>
            </div>
            <div className="cell-card__item">
                <div className="cell-card__attribute">Рента за 2:</div>
                <div className="cell-card__price">{cell.rent * 9}</div>
            </div>
            <div className="cell-card__item">
                <div className="cell-card__attribute">Рента за 3:</div>
                <div className="cell-card__price">{cell.rent * 15}</div>
            </div>
            <div className="cell-card__item">
                <div className="cell-card__attribute">Залоговая стоимость:</div>
                <div className="cell-card__price">
                    {Math.round(cell.price / 2)}
                </div>
            </div>
            <div className="cell-card__item">
                <div className="cell-card__attribute">Выкуп залога:</div>
                <div className="cell-card__price">
                    {Math.round((cell.price / 2) * 1.1)}
                </div>
            </div>
        </>
    );
};

export default RzdCardInfo;
