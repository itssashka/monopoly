import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    createGameSup,
    gamesList,
    joinGameSup,
    leftGameSup,
} from "../common/gamesSup";

export const joinGameAsync = createAsyncThunk(
    "games/joinGameAsync",
    async (game, { dispatch, getState }) => {
        if (!getState().currentUser.isLogin) {
            console.log("join game");
            return alert("Вы не авторизованы");
        }
        console.log("join game");
        dispatch(joinGame(game));
    }
);

export const createGameAsync = createAsyncThunk(
    "games/joinGameAsync",
    async (game, { dispatch, getState }) => {
        if (!getState().currentUser.isLogin) return alert("Вы не авторизованы");
        dispatch(createGame(game));
    }
);

const initialState = {
    gamesList,
};

const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        joinGame: (state, action) => {
            if (Object.keys(state.gamesList.current).length > 0) {
                return alert("Вы уже в игре");
            }
            joinGameSup(action.payload);
            state.gamesList = gamesList;
        },
        leftGame: (state, action) => {
            leftGameSup(action.payload);
            state.gamesList = gamesList;
        },
        createGame: (state, { payload }) => {
            if (Object.keys(state.gamesList.current).length > 0) {
                return alert("Вы уже в игре");
            }
            createGameSup(payload);
            state.gamesList = gamesList;
        },
    },
});

export default gamesSlice.reducer;
export const getGames = (state) => state.games.gamesList;
export const { joinGame, leftGame, createGame } = gamesSlice.actions;
