import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../store/userSlice";
import { changeOfferPlayer, changeStateAsync, createOffer, getCurrentPlayer } from "../../../store/matchSlice";

const PlayerCard = ({ player, isActive }) => {
    const svgs = {
        dealSVG: (
            <svg
                version="1.1"
                id="Layer_1"
                viewBox="0 0 403.051 403.051"
                className="deal_svg"
            >
                <g id="XMLID_308_">
                    <path
                        id="XMLID_309_"
                        d="M144.957,148.066l31.82-31.82l-21.213-21.213L49.498,201.1l144.951,144.953
		c0.001,0.001,0.003,0.003,0.004,0.004c5.85,5.849,15.367,5.849,21.215,0.001c2.834-2.834,4.395-6.601,4.395-10.607
		c0-4.002-1.559-7.767-4.388-10.599c-0.002-0.003-0.005-0.004-0.007-0.006c-0.001-0.001-0.002-0.003-0.004-0.005l-21.21-21.209
		c-5.858-5.858-5.858-15.355-0.001-21.213c5.857-5.857,15.355-5.858,21.214,0l21.214,21.213c0.002,0.002,0.004,0.005,0.007,0.008
		c5.85,5.84,15.36,5.838,21.206-0.007c5.848-5.849,5.849-15.365,0-21.213c-0.004-0.005-0.008-0.01-0.014-0.015l-21.199-21.199
		c-5.857-5.858-5.857-15.355,0-21.213c5.857-5.857,15.355-5.858,21.213-0.001l21.209,21.208c0.005,0.005,0.009,0.01,0.014,0.015
		c5.849,5.836,15.353,5.835,21.199-0.005c0.002-0.002,0.004-0.003,0.005-0.005l0.01-0.01c2.826-2.833,4.384-6.595,4.384-10.597
		c0.001-4.001-1.555-7.761-4.381-10.592l-7.084-7.085c-0.002-0.002-0.004-0.004-0.006-0.007l-53.026-53.026l-31.82,31.82
		c-0.001,0.001-0.001,0.001-0.001,0.001c-8.772,8.771-20.295,13.158-31.818,13.158c-11.524,0-23.047-4.387-31.82-13.16
		c-17.541-17.542-17.543-46.083-0.008-63.63C144.951,148.073,144.954,148.069,144.957,148.066z"
                    />
                    <polygon
                        id="XMLID_311_"
                        points="129.886,78.287 134.352,73.821 113.137,52.607 0,165.745 21.213,186.958 	"
                    />
                    <path
                        id="XMLID_312_"
                        d="M208.607,126.842c-0.004,0.004-0.007,0.008-0.011,0.012c-0.004,0.004-0.008,0.007-0.012,0.01
		l-42.413,42.415c-0.002,0.001-0.002,0.001-0.003,0.002c-5.847,5.85-5.846,15.365,0.001,21.212
		c5.85,5.848,15.366,5.849,21.215-0.001l42.426-42.426c2.813-2.813,6.629-4.394,10.606-4.394c3.979,0,7.794,1.581,10.606,4.394
		l63.637,63.637c0,0.001,0.002,0.001,0.002,0.001l7.069,7.069c0.001,0.001,0.001,0.001,0.003,0.002
		c0.001,0.001,0.002,0.003,0.004,0.005l10.602,10.602l21.213-21.213L240.416,95.033L208.607,126.842z"
                    />

                    <rect
                        id="XMLID_333_"
                        x="247.339"
                        y="108.318"
                        transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 480.1409 445.516)"
                        width="170.001"
                        height="30"
                    />
                </g>
            </svg>
        ),
        surrenderSVG: (
            <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                className="surrender_svg"
            >
                <path
                    d="M5 21V3.90002C5 3.90002 5.875 3 8.5 3C11.125 3 12.875 4.8 15.5 4.8C18.125 4.8 19 3.9 19 3.9V14.7C19 14.7 18.125 15.6 15.5 15.6C12.875 15.6 11.125 13.8 8.5 13.8C5.875 13.8 5 14.7 5 14.7"
                    stroke="current"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        menuSVG: (
            <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                className="menu_svg"
            >
                <path
                    d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
                    fill="current"
                />
                <path
                    d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
                    fill="current"
                />
                <path
                    d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                    fill="current"
                />
            </svg>
        ),
    };

    const currentPlayer = useSelector(getCurrentPlayer);
    const dispatch = useDispatch();
    const cardClasses = isActive ? 'player-card player-card_active' : 'player-card'
    const [isMenuOpen, setIsOpen] = useState(false);
    const menuClasses = isMenuOpen
        ? "player-card__dropdown player-card__dropdown_active"
        : "player-card__dropdown";
    const menuRef = useRef(null);

   
    const handleClickOutside = (e) => {
        if(menuRef.current && !menuRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }    

    const handleClick = (e) => {
        setIsOpen(!isMenuOpen);
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside,true);
        return () => document.removeEventListener("click", handleClickOutside,true);
    }, []);

    const createOfferHandle = () => {
        console.log(1);
        dispatch(createOffer({player}))
    }

    return (
        <div className={cardClasses}>
            <div
                className="player-card__img"
                style={{ border: "3px solid " + player.color }}
            >
                <img src={player.img} alt="" />
            </div>
            <div className="player-card__body">
                <div className="player-card__name">{player.name}</div>
                <div className="player-card__cash">{player.money}$</div>
            </div>
            <div
                className="player-card__menu"
                onClick={handleClick}
                ref={menuRef}
            >
                {svgs.menuSVG}
                <div className={menuClasses} onClick={e=>e.stopPropagation()}>
                    <div className="player-card__item">Профиль</div>
                    {currentPlayer.id !== player.id && <div className="player-card__item" onClick={createOfferHandle}>Сделка</div>}
                    {currentPlayer.id === player.id && <div className="player-card__item">Сдаться</div>}
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
