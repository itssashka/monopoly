import React from "react";

const CompanyCardInfo = ({ cell }) => {
    return (
        <>
            <div className="cell-card__item">
                <div className="cell-card__attribute">Рента:</div>
                <div className="cell-card__price">{cell.rent}</div>
            </div>
            <div className="cell-card__item">
                <div className="cell-card__attribute">Рента за все:</div>
                <div className="cell-card__price">{cell.rent * 2}</div>
            </div>
            <div className="cell-card__item">
                <div className="cell-card__attribute">1 дом:</div>
                <div className="cell-card__price">{cell.rentWith1House}</div>
            </div>
            <div className="cell-card__item">
                <div className="cell-card__attribute">2 дома:</div>
                <div className="cell-card__price">{cell.rentWith2Houses}</div>
            </div>
            <div className="cell-card__item">
                <div className="cell-card__attribute">3 дома:</div>
                <div className="cell-card__price">{cell.rentWith3Houses}</div>
            </div>
            <div className="cell-card__item">
                <div className="cell-card__attribute">4 дома:</div>
                <div className="cell-card__price">{cell.rentWith4Houses}</div>
            </div>
            <div className="cell-card__item">
                <div className="cell-card__attribute">Отель:</div>
                <div className="cell-card__price">{cell.rentWithHotel}</div>
            </div>
            <div className="cell-card__item">
                <div className="cell-card__attribute">Стоимость здания:</div>
                <div className="cell-card__price">{cell.buildingCost}</div>
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

export default CompanyCardInfo;
