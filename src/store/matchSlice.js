import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { cells, currentPlayer, players } from "../common/cells";
import { messages } from "../common/messages";
import axios from "axios";
import { luckyCards } from "../common/luckyCards";

export const sendMessageAsync = createAsyncThunk(
    "match/sendMessage",
    async (message, { dispatch, getState }) => {
        try {
            const { current_player, messages } = getState().match;
            const newMessage = {
                message: message.message,
                id: messages.messages.length + 1,
                username: current_player.name,
                user_id: current_player.id,
                type: message.type,
            };

            dispatch(sendMessage(newMessage));

            // const resp = await axios({
            //     method: "POST",
            //     url: "api/matches/:id/messages",
            //     data: newMessage,
            // });

            // if(resp.status === 201) {
            //     dispatch(sendMessage(newMessage));
            // } else {
            //     throw new Error('Произошла ошибка: ' + resp.message)
            // }
        } catch (error) {
            console.error(error.message);
        }
    }
);

export const luckyCardsAsync = createAsyncThunk(
    "match/luckyCardsAsync",
    async (_, { dispatch }) => {
        const randomCardNum = Math.round(Math.random() * 3);
        const randomCard = luckyCards[randomCardNum].type;
        const cardActions = {
            money: () => {
                const money = Math.round(Math.random() * 150 + 50);
                dispatch(giveMoneyAsync(money));
            },
            jail: () => {
                dispatch(goToCellAsync(10));
            },
            goTo: () => {
                dispatch(goToCellAsync());
            },
            reroll: () => {
                const message = {
                    message: "Игрок выигрывает шанс бросить кубик еще раз",
                    type: "alert",
                };

                dispatch(sendMessageAsync(message));
                dispatch(changeStateAsync("roll"));
            },
        };

        cardActions[randomCard]();
    }
);

export const goToCellAsync = createAsyncThunk(
    "match/goToAsync",
    async (cell_id, { dispatch, getState }) => {
        try {
            const { cells, current_player, players } = JSON.parse(
                JSON.stringify(getState().match)
            );
            const currentCell = cells.cells[current_player.cell_id];
            const currentCellNum = currentCell.id;
            const newCellNum = cell_id || Math.round(Math.random() * 39);
            let isNewCircle = currentCellNum > newCellNum && newCellNum !== 10; // 10 = тюрьма

            const newMessage = {
                message: `Игрок ${current_player.name} отправляется на поле ${cells.cells[newCellNum].name}`,
                type: "alert",
            };

            players.players[current_player.match_id].cell_id = newCellNum;
            cells.cells[currentCellNum].players = cells.cells[
                currentCellNum
            ].players.filter(
                (player) => player.match_id !== current_player.match_id
            );
            cells.cells[newCellNum].players.push(current_player);

            dispatch(sendMessageAsync(newMessage));
            dispatch(
                moveChip({
                    newPlayers: players,
                    newCells: cells,
                    newCellNum,
                    isNewCircle,
                })
            );
            dispatch(checkCellAsync());

            // const resp = await axios({
            //     mathod: 'post',
            //     url: 'api/v1/match/:id/',
            //     body: {cells, players},
            // })

            // if(resp.status === 201) {
            //     dispatch(sendMessageAsync(newMessage));
            //     dispatch(moveChip({newPlayers:players, newCells: cells, newCellNum, isNewCircle}));
            //     dispatch(checkCellAsync());
            // } else {
            //     throw new Error('Произошла ошибка:'+ resp.message)
            // }
        } catch (error) {
            console.error(error);
        }
    }
);

export const sendOfferAsync = createAsyncThunk(
    "match/sendOffer",
    async (money, { dispatch, getState }) => {
        const { offer_player, current_player, offer, players, state } = JSON.parse(
            JSON.stringify(getState().match)
        );
        const previous_state = state;

        const newMessage = {
            message: `Игрок ${current_player.name} отправляет предложение обмена ${offer_player.name}`,
            type: "alert",
        };

        players.players[offer_player.match_id].state = "confirmation";
        // current_player.state = 'idle';
        offer.money = money;

        dispatch(sendMessageAsync(newMessage));
        //временно
        dispatch(sendOffer({ players, offer, previous_state }));

        // offer.initiator_id = currentPlayer.match_id;
        // offer.respondent_id = offerPlayer.match_id;

        // try {
        //     const resp = await axios({
        //         method: "POST",
        //         url: 'api/v1/match/:id/offers/:id',
        //         body: offer,
        //     })

        //     if(resp.status === 200) {

        //     } else {
        //         throw new Error('Не удалось создать предложение обмена')
        //     }
        // } catch (error) {
        //     console.error(error)
        // }
    }
);

export const acceptOfferAsync = createAsyncThunk(
    "match/acceptOffer",
    async (_, { dispatch, getState }) => {
        const { offer, players, cells } = JSON.parse(
            JSON.stringify(getState().match));
        const initiatorCellsId = offer.offer_initiator.map((cell) => cell.id);
        const respondetCellsId = offer.offer_respondent.map((cell) => cell.id);

        const newMessage = {
            message: `Игрок ${players.players[offer.respondent_id].name} принимает обмен с ${players.players[offer.initiator_id].name}`,
            type: "alert",
        };

        function swapProperty (playerId, cellsId, property, addMoney, takeMoney) {
            players.players[playerId].properties = players.players[offer.initiator_id].properties.filter(property => !cellsId.includes(property.id));
            players.players[playerId].properties = players.players[offer.initiator_id].properties.concat(property);
            players.players[playerId].money -= +takeMoney;
            players.players[playerId].money += +addMoney;
        }

        swapProperty(offer.initiator_id, initiatorCellsId, offer.offer_respondent, offer.money.offerPlayer, offer.money.currentPlayer);
        swapProperty(offer.respondent_id, respondetCellsId, offer.offer_initiator, offer.money.currentPlayer, offer.money.offerPlayer);

        const current_player = players.players[offer.initiator_id];
        const active_player = players.players[offer.initiator_id];

        cells.cells = cells.cells.map(cell => {
            if(initiatorCellsId.includes(cell.id)) {
                cell.owner = {
                    match_id: players.players[offer.respondent_id].match_id,
                    color: players.players[offer.respondent_id].color,
                    name: players.players[offer.respondent_id].name,
                }
            } else if (respondetCellsId.includes(cell.id)) {
                cell.owner = {
                    match_id: players.players[offer.initiator_id].match_id,
                    color: players.players[offer.initiator_id].color,
                    name: players.players[offer.initiator_id].name,
                }
            }

            return cell;
        })

        dispatch(sendMessageAsync(newMessage));
        dispatch(acceptOffer({players, active_player, current_player, cells}));
        // initiator_id: null,
        // respondent_id: null,
        // offer_initiator: [],
        // offer_respondent: [],
    }
);

export const denyOfferAsync = createAsyncThunk('match/denyOffer', async (_, { dispatch, getState }) => {
    const {offer,players} = getState().match.offer;

    const newMessage = {
        message: `Игрок ${players.players[offer.respondent_id].name} отклонет предложение обмена ${players.players[offer.initiator_id].name}`
    }
    
    const current_player = players.players[offer.initiator_id];
    const active_player = players.players[offer.initiator_id];

    dispatch(sendMessageAsync(newMessage));
    dispatch(updatePlayers({current_player, active_player}));
})


export const changeStateAsync = createAsyncThunk(
    "match/changeStateAsync",
    async (state, { dispatch, getState }) => {
        const { players, current_player } = JSON.parse(
            JSON.stringify(getState().match)
        );
        players.players[current_player.match_id].state = state;
        current_player.state = state;
        dispatch(changeState({ players, state }));
    }
);

export const buyoutAsync = createAsyncThunk(
    "match/buyoutAsync",
    async (_, { dispatch, getState }) => {
        const { players, current_player } = JSON.parse(
            JSON.stringify(getState().match)
        );

        players.players[current_player.match_id].money -= 500;
        current_player.money -= 500;

        const message = {
            message: "выкупается из тюрмы за 500$",
            type: "alert",
        };

        dispatch(sendMessageAsync(message));
        dispatch(changeStateAsync("roll" ));
        dispatch(buyout({ current_player, players }));

        // try {
        //     const resp = await axios({
        //         method: 'POST',
        //         url: 'api/match/:id/players',
        //         body: players,
        //     })

        //     await dispatch(changeStateAsync('roll'));
        //     dispatch(updatePlayers({currentPlayer, players}));

        // } catch (error) {
        //     console.error(error)
        // }
    }
);

export const rollDiceAsync = createAsyncThunk(
    "match/rollDice",
    async (_, { dispatch, getState }) => {
        try {
            const dice_1 = Math.round(Math.random() * 5 + 1);
            const dice_2 = Math.round(Math.random() * 5 + 1);
            const state = getState().match.state;
            const messages = {
                common: `бросает кубик, выпадает ${dice_1 + dice_2}`,
                unsuccessful: `попытался выйти из тюрьмы, выпадает ${dice_1} + ${dice_2}`,
                successful: `удачно бросает кубик и выходит из тюрьмы, выпадает ${dice_1} + ${dice_2}`,
            };

            const message =
                state !== "arrested"
                    ? messages.common
                    : dice_1 !== dice_2
                    ? messages.unsuccessful
                    : messages.successful;

            let newMessage = {
                message: message,
                type: "alert",
            };

            dispatch(rollDice({ dice_1, dice_2, sum: dice_1 + dice_2 }));
            dispatch(sendMessageAsync(newMessage));

            if (state !== "arrested") {
                dispatch(changeStateAsync("idle"));
                dispatch(moveChipAsync(dice_1 + dice_2));
            } else if (dice_1 !== dice_2) {
                dispatch(changePlayerAsync());
            } else {
                dispatch(changeStateAsync("idle"));
                dispatch(moveChipAsync(dice_1 + dice_2));
            }

            // const resp = await axios({
            //     method: "POST",
            //     url: 'api/matches/:id/dices',
            //     data: {
            //         dice_1: dice_1,
            //         dice_2: dice_2,
            //         players_id: currentUser.id
            //     }
            // });

            // if(resp.status === 200) {
            //     dispatch(rollDice({dice_1, dice_2}))
            //     await dispatch(sendMessageAsync(newMessage));
            // } else {
            //     throw new Error('Не удалось отправить запрос, попробуйте еще раз')
            // }
            // вывод сообщения о ходе
        } catch (error) {
            console.error(error);
        }
    }
);

export const updateCellsAsync = createAsyncThunk(
    "match/updateCells",
    async (_, { dispatch, getState }) => {
        try {
            const resp = await axios({
                method: "GET",
                url: "api/matches/:id/cells",
            });
            const cells = getState().match.cells;
            const isEqual = JSON.stringify(cells) === JSON.stringify(resp.data);
            if (resp.status === 200) {
                if (!isEqual) {
                    dispatch(updateCells(resp.data));
                }
            } else {
                throw new Error(
                    "Что-то пошло не так попробуйте обновить страницу"
                );
            }
        } catch (error) {
            console.error(error);
        }
    }
);

export const updateMessagesAsync = createAsyncThunk(
    "match/updateMessages",
    async (_, { dispatch, getState }) => {
        try {
            // const resp = await axios({
            //     method: "GET",
            //     url: 'api/matches/:id/messages'
            // })
            // const messages = getState().match.messages;
            // const isEqual = JSON.stringify(messages) === JSON.stringify(resp.data);
            // if(resp.status === 200) {
            //     dispatch(updateMessages(resp.data));
            // } else {
            //     throw new Error('Что-то пошло не так')
            // }
        } catch (error) {
            console.error(error);
        }
    }
);

export const updatePlayersAsync = createAsyncThunk(
    "match/updateMessages",
    async (_, { dispatch, getState }) => {
        try {
            const resp = await axios({
                method: "GET",
                url: "api/matches/:id/players",
            });
            const players = getState().match.players;
            const isEqual =
                JSON.stringify(players) === JSON.stringify(resp.data);
            if (resp.status === 200) {
                dispatch(updateMessages(resp.data));
            } else {
                throw new Error("Что-то пошло не так");
            }
        } catch (error) {
            console.error(error);
        }
    }
);

export const changePlayerAsync = createAsyncThunk(
    "match/changePlayer",
    async (_, { dispatch, getState }) => {
        try {
            const { players: newPlayers, active_player: activePlayer } =
                JSON.parse(JSON.stringify(getState().match));
            let previousPlayer = activePlayer;
            let nextPlayerMatchId = activePlayer.match_id + 1;
            const activePlayerMatchId = activePlayer.match_id;

            if (nextPlayerMatchId + 1 > newPlayers.count) {
                nextPlayerMatchId -= newPlayers.count;
            }

            let currentPlayerState =
                newPlayers.players[activePlayer.match_id].state;
            let nextPlayerState = newPlayers.players[nextPlayerMatchId].state;

            const newPlayersActions = {
                arrested: (id, state) => {
                    currentPlayerState !== "arrested" &&
                        (newPlayers.players[activePlayer.match_id].state =
                            "idle");
                    newPlayers.players[nextPlayerMatchId].state = "roll";

                    //временно
                    dispatch(changeStateAsync("roll"));
                },
                other: () => {},
            };

            //old player change state
            if (currentPlayerState !== "arrested") {
                newPlayers.players[activePlayerMatchId].state = "idle";
            }

            //next player change state
            if (nextPlayerState !== "arrested") {
                newPlayers.players[nextPlayerMatchId].state = "roll";
                //временно
                dispatch(changeStateAsync("roll"));
            } else {
                //временно
                dispatch(changeStateAsync("arrested"));
            }

            const nextPlayer = newPlayers.players[nextPlayerMatchId];
            dispatch(changePlayer({ newPlayers, nextPlayer, previousPlayer }));

            // const resp = await axios({
            //     method: "POST",
            //     url: 'api/match/:id/players',
            //     body: {players, activePlayer},
            // })
        } catch (error) {
            console.error(error);
        }
    }
);

export const buyCellAsync = createAsyncThunk(
    "match/buyCell",
    async (_, { dispatch, getState }) => {
        const { current_cell_num, cells, players, current_player } = JSON.parse(
            JSON.stringify(getState().match)
        );

        try {
            // update money and properties of player
            cells.cells[current_cell_num].owner = {
                match_id: current_player.match_id,
                color: current_player.color,
                name: current_player.name,
            };
            current_player.money -= cells.cells[current_cell_num].price;
            players.players[current_player.match_id].money =
                current_player.money;
            players.players[current_player.match_id].properties.push({
                id: current_cell_num,
            });
            current_player.properties.push({ id: current_cell_num });

            const newMessage = {
                message: `покупает ${cells.cells[current_cell_num].name}`,
                type: "alert",
            };

            dispatch(buyCell({ cells, players, current_player }));
            dispatch(sendMessageAsync(newMessage));
            dispatch(endOfRollAsync());

            // const resp = await axios({
            //     method: 'POST',
            //     url: 'api/match/:id/players/:id'
            // })

            // if(resp === 201) {
            //     dispatch(buyCell({ cells, players, currentPlayer }));
            //     dispatch(sendMessageAsync(newMessage));
            //     dispatch(endOfRollAsync());
            // } else {
            //     throw new Error('Что-то пошло не так')
            // }
        } catch (error) {
            console.error(error);
        }
    }
);

export const sellCellAsync = createAsyncThunk('match/sellCellasync', (id, {dispatch, getState}) => {
    const {cells, players, current_player} = JSON.parse(JSON.stringify(getState().match));
    cells.cells[id].owner = {};

    console.log(cells);
    players.players[current_player.match_id].properties = players.players[current_player.match_id].properties.filter(property => property.id !== id);
    players.players[current_player.match_id].money += Math.round(cells.cells[id].price / 2);

    console.log(players);
    console.log('qwe');
    current_player.properties = players.players[current_player.match_id].properties;

    dispatch(sellCell({}));
})

export const payRentAsync = createAsyncThunk(
    "match/payRent",
    async (_, { dispatch, getState }) => {
        const { players, current_player, current_cell, dices } = JSON.parse(
            JSON.stringify(getState().match)
        );


        const rent = {
            company: () => current_cell.rent,
            rzd: () => current_cell.rent,
            communal: () => dices.sum * 6,
        };

        const newMessage = {
            message: `Платит ренту игроку ${
                current_cell.owner.name
            } в размере ${rent[current_cell.subtype]()}`,
            type: "alert",
        };

        //update players money
        current_player.money -= rent[current_cell.subtype]();
        players.players[current_player.match_id].money -=
            rent[current_cell.subtype]();
        players.players[current_cell.owner.match_id].money +=
            rent[current_cell.subtype]();

        dispatch(changeMoney({ current_player, players }));
        dispatch(sendMessageAsync(newMessage));
        dispatch(changePlayerAsync());

        // try {
        //     const resp = await axios({
        //         method: 'POST',
        //         url: 'api/match/:id/players/:match_id',
        //         body: players,
        //     })
        // } catch (error) {
        //     console.error(error);
        // }
    }
);

export const giveMoneyAsync = createAsyncThunk(
    "match/giveMoneyAsync",
    async (money, { dispatch, getState }) => {
        try {
            const { players, current_player } = JSON.parse(
                JSON.stringify(getState().match)
            );
            const messages = {
                get: {
                    message: `получает ${money}$`,
                    type: "alert",
                },
                pays: {
                    message: `платить в общественную казну ${money}$`,
                    type: "alert",
                },
            };
            players.players[current_player.match_id].money += money;
            current_player.money += money;

            dispatch(changeMoney({ players, current_player }));
            dispatch(
                sendMessageAsync(money > 0 ? messages.get : messages.pays)
            );
            dispatch(changePlayerAsync());
        } catch (error) {
            console.error(error);
        }

        // try {
        //     const resp = await axios({
        //         method: "POST",
        //         url: "api/match/:id/players",
        //         body: players
        //     })
        // } catch (error) {
        //     console.error(error);
        // }
    }
);

export const checkCellAsync = createAsyncThunk(
    "match/checkCellAsync",
    async (_, { dispatch, getState }) => {
        try {
            const { current_cell_num, cells } = getState().match;
            //временно пока нет api
            const current_cell_type = cells.cells[current_cell_num].type;
            const cellActions = {
                property: () => {
                    Object.keys(cells.cells[current_cell_num]?.owner).length ===
                    0
                        ? dispatch(changeStateAsync("buy"))
                        : dispatch(changeStateAsync("pay"));
                },
                money: () => {
                    const money =
                        Math.round((Math.random() * 500 + 100) / 50) * 50;
                    dispatch(giveMoneyAsync(money));
                },
                police: () => {
                    dispatch(changeStateAsync("arrested"));
                    dispatch(moveChipAsync(20));
                },
                jail: () => {
                    const message = {
                        message: "попадает в тюрьму",
                        type: "alert",
                    };
                    dispatch(sendMessageAsync(message));
                    dispatch(changeStateAsync("arrested"));
                    dispatch(changePlayerAsync());
                },
                chest: () => {
                    const money =
                        Math.round((Math.random() * 500 - 500) / 50) * 50;
                    dispatch(giveMoneyAsync(money));
                },
                chance: () => {
                    dispatch(luckyCardsAsync());
                },
            };

            cellActions.hasOwnProperty(current_cell_type)
                ? cellActions[current_cell_type]()
                : dispatch(changePlayerAsync());

            // dispatch(changePlayerAsync());
            // const resp = await axios({
            //     method: 'GET',
            //     url: 'api/match/:id/cells/:id'
            // });

            // if(resp.status === 200){

            // } else {
            //     throw new Error('Что-то пошло не так')
            // }
        } catch (error) {
            console.error(error);
        }
    }
);

//конец хода
export const endOfRollAsync = createAsyncThunk(
    "match/endOfRoll",
    async (_, { dispatch, getState }) => {
        try {
            const state = getState().match.state;
            if (state === "idle");

            dispatch(changePlayerAsync());
        } catch (error) {
            console.error(error);
        }
    }
);

export const moveChipAsync = createAsyncThunk(
    "match/moveChip",
    async (step, { dispatch, getState }) => {
        try {
            const {
                cells,
                current_player,
                players: newPlayers,
                cells: newCells,
            } = JSON.parse(JSON.stringify(getState().match));
            const currentCell = current_player.cell_id;
            let newCellNum = currentCell + step;
            let isNewCircle = false;
            if (newCellNum > 39) {
                newCellNum -= 40;
                isNewCircle = true;
            }

            const cellPlayer = {
                match_id: current_player.match_id,
                color: current_player.color,
                name: current_player.name,
            };

            // обновляем id текущей ячейки у игрока на новую
            newPlayers.players[current_player.match_id].cell_id = newCellNum;

            // проверяем новый круг или нет
            if (isNewCircle) {
                newPlayers.players[current_player.match_id].money += 1200;
                const message = {
                    message: "проходит круг и получает 1200$",
                    type: "alert",
                };
                dispatch(sendMessageAsync(message));
            }

            // удаление игрока из текущей ячейки
            newCells.cells[currentCell].players = cells.cells[
                currentCell
            ].players.filter(
                (player) => player.match_id !== current_player.match_id
            );

            //добавление игрока в новую ячейку
            newCells.cells[newCellNum].players = [
                ...cells.cells[newCellNum].players,
                cellPlayer,
            ];

            dispatch(
                moveChip({ newPlayers, newCells, newCellNum, isNewCircle })
            );
            dispatch(checkCellAsync());
        } catch (error) {
            console.error(error);
        }

        // try {
        //     const resp = await axios({
        //         method: "POST",
        //         url: "api/match/:id/cells",
        //         data: newCells,
        //     });

        //     if (resp.status === 200) {
        //     } else {
        //         throw new Error("Что-то пошло не так");
        //     }
        // } catch (error) {
        //     console.error(error);
        // }

        // try {
        //     const resp = await axios({
        //         method: "POST",
        //         url: "api/match/:id/players",
        //         data: newPlayers,
        //     });

        //     if (resp.status === 200) {
        //     } else {
        //         throw new Error("Что-то пошло не так");
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    }
);

const initialState = {
    cells: cells,
    current_cell_num: 0,
    current_cell: {},
    players: players,
    messages: messages,
    dices: { dice_1: 0, dice_2: 0, sum: 0 },
    state: "roll", // buy/pay/idle/offer/arrested/confirmation/surrendered
    monopolies: [],
    offer: {
        initiator_id: null,
        respondent_id: null,
        offer_initiator: [],
        offer_respondent: [],
    },
    current_player: players.players[0],
    active_player: players.players[0],
    previous_player: players.players[0],
    offer_player: {},
    previous_state: "",
};

const matchSlice = createSlice({
    name: "match",
    initialState,
    reducers: {
        addToOffer: (state, { payload }) => {
            let isCompanyInOffer = false;
            const cellInfo = {
                id: payload.id,
                img: payload.img,
                name: payload.name,
                owner_match_id: payload.owner.match_id,
            };

            if (state.current_player.match_id === payload.owner.match_id) {
                isCompanyInOffer =
                    state.offer.offer_initiator.filter(
                        (company) => company.id === payload.id
                    ).length > 0;
                !isCompanyInOffer && state.offer.offer_initiator.push(cellInfo);
            } else {
                isCompanyInOffer =
                    state.offer.offer_respondent.filter(
                        (company) => company.id === payload.id
                    ).length > 0;
                !isCompanyInOffer &&
                    state.offer.offer_respondent.push(cellInfo);
            }
        },
        removeFromOffer: (state, { payload }) => {
            console.log("qwe");
            if (state.current_player.match_id === payload.owner_match_id) {
                state.offer.offer_initiator =
                    state.offer.offer_initiator.filter(
                        (company) => company.id !== payload.id
                    );
            } else {
                state.offer.offer_respondent =
                    state.offer.offer_respondent.filter(
                        (company) => company.id !== payload.id
                    );
            }
        },
        createOffer: (state, { payload }) => {
            state.previous_state = state.state;
            state.offer = {
                initiator_id: state.current_player.match_id,
                respondent_id: payload.player.match_id,
                offer_initiator: [],
                offer_respondent: [],
            };
            state.offer_player = payload.player;
            state.state = "offer";
        },
        sendOffer: (state, { payload }) => {
            state.players = payload.players;

            // временно
            state.state = "confirmation";
            state.current_player.state = "confirmation";
            state.current_player =
                payload.players.players[payload.offer.respondent_id];
            state.active_player =
                payload.players.players[payload.offer.respondent_id];
            state.previous_player =
                payload.players.players[payload.offer.initiator_id];
            state.offer = payload.offer;
        },
        clearOffer: (state, { payload }) => {
            state.offer = {
                initiator_id: null,
                respondent_id: null,
                offer_initiator: [],
                offer_respondent: [],
            };
        },
        acceptOffer: (state, {payload}) => {
            state.players = payload.players;
            state.current_player = payload.current_player;
            state.active_player = payload.active_player;
            state.cells = payload.cells;

            state.state = state.previous_state;
        },
        changePlayer: (state, { payload }) => {
            state.players = payload.newPlayers;
            state.active_player = payload.nextPlayer;
            state.current_cell = payload.currentCell;
            state.previous_player = payload.previousPlayer;

            //временно пока нет бека
            state.current_player = payload.nextPlayer;
        },
        updateCells: (state, { payload }) => {
            state.cells = payload;
        },
        changeState: (state, { payload }) => {
            state.previous_state = state.state;
            state.players = payload.players;
            state.state = payload.state;
        },
        updateMessages: (state, payload) => {
            state.messages = payload;
        },
        moveChip: (state, { payload }) => {
            state.players = payload.newPlayers;
            state.cells = payload.newCells;
            state.current_cell_num = payload.newCellNum;
            state.current_cell = payload.newCells.cells[payload.newCellNum];
            state.current_player.cell_id = payload.newCellNum;
            if (payload.isNewCircle) {
                state.current_player.money += 1200;
            }
        },
        rollDice: (state, { payload }) => {
            state.dices = payload;
        },
        sendMessage: (state, { payload }) => {
            state.messages.messages = [...state.messages.messages, payload];
        },
        addMove: (state, { payload }) => {
            state.moves = [...state.moves, payload];
        },
        buyCell: (state, { payload }) => {
            state.players = payload.players;
            state.current_player = payload.current_player;
            state.cells = payload.cells;
        },
        sellCell: (state, {payload}) => {
            state.players = payload.players;
            state.cells = payload.cells;
            state.current_player = payload.current_player;

            //временно
            state.active_player = payload.current_player;
        },
        changeMoney: (state, { payload }) => {
            state.current_player = payload.current_player;
            state.players = payload.players;
        },
        updatePlayers: (state, { payload }) => {
            // state.players = payload.players;
            state.current_player = payload.current_player;
            state.active_player = payload.current_player;
        },
        changeOfferPlayer: (state, { payload }) => {
            state.offer_player = payload;
        },
        buyout: (state, {payload}) => {
            state.players = payload.players;
            state.current_player = payload.current_player;

            // временно
            state.active_player = payload.current_player;
        }
    },
});

export default matchSlice.reducer;
export const getCells = (state) => state.match.cells;
export const getPlayers = (state) => state.match.players;
export const getDices = (state) => state.match.dices;
export const getMessages = (state) => state.match.messages;
export const getMonopolies = (state) => state.match.monopolies;
export const getActivePlayer = (state) => state.match.active_player;
export const getState = (state) => state.match.state;
export const getCurrentCellNum = (state) => state.match.current_cell_num;
export const getCurrentCell = (state) => state.match.current_cell;
export const getCurrentPlayer = (state) => state.match.current_player;
export const getOfferPlayer = (state) => state.match.offer_player;
export const getOffer = (state) => state.match.offer;
export const getPreviousState = (state) => state.match.previous_state;
export const getPreviousPlayer = (state) => state.match.previous_player;
export const {
    sendMessage,
    addMove,
    rollDice,
    updateCells,
    updateMessages,
    updatePlayers,
    moveChip,
    changePlayer,
    changeState,
    buyCell,
    sellCell,
    changeMoney,
    changeOfferPlayer,
    addToOffer,
    clearOffer,
    removeFromOffer,
    createOffer,
    sendOffer,
    buyout,
    acceptOffer
} = matchSlice.actions;
