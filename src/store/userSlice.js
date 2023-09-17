import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginReguser } from "../common/gamesSup";
import { leftGame } from "./gamesSlice";

export const logOutAsync = createAsyncThunk('currentuser/logOut', async (_, {dispatch, getState}) => {
    const currentGame = getState().games.gamesList. current;

    if(Object.keys(currentGame).length > 0) {
        await dispatch(leftGame(currentGame.id));
    }
    dispatch(logOut())
})

const initialState = {
    currentUser: {
        name: "qwe",
        email: "qwe@gmail.com",
        password: "qwe@gmail.com",
        id: 13,
        photo: "./imgs/player.png",
        gamesCount: 0,
        gamesWon: 0,
        gamesList: [
            {
                title: 'asd',
                id: 5325321,
                place: 1,
                hasWon: true,
                date: '04.05.2023'
            },
            {
                title: 'asd',
                id: 3421,
                place: 3,
                hasWon: false,
                date: '04.05.2023'
            },
            {
                title: 'asd',
                id: 12341,
                place: 5,
                hasWon: false,
                date: '04.05.2023'
            },
            {
                title: 'asd',
                id: 34321,
                place: 1,
                hasWon: true,
                date: '04.05.2023'
            }
        ]
    },
    isLogin: false,
};

const userSlice = createSlice({
    name: "currentuser",
    initialState,
    reducers: {
        loginUser(state, { payload }) {
            state.isLogin = true;
            const currentPlayer = {
                name: "player",
                email: payload.playerEmail,
                photo: "./imgs/player.png",
                id: new Date().getMilliseconds(),
                password: "qwe@gmail.com",
                photo: "./imgs/player.png",
                gamesCount: 0,
                gamesWon: 0,
                gamesList: [
                    {
                        title: 'asd',
                        id: 5325321,
                        place: 1,
                        hasWon: true,
                        date: '04.05.2023'
                    },
                    {
                        title: 'asd',
                        id: 3421,
                        place: 3,
                        hasWon: false,
                        date: '04.05.2023'
                    },
                    {
                        title: 'asd',
                        id: 12341,
                        place: 5,
                        hasWon: false,
                        date: '04.05.2023'
                    },
                    {
                        title: 'asd',
                        id: 34321,
                        place: 1,
                        hasWon: true,
                        date: '04.05.2023'
                    }
                ]
            }
            loginReguser(currentPlayer);
            state.currentUser = currentPlayer;
        },
        logOut(state, { payload }) {
            state.isLogin = false;
            state.currentUser = {};
        },
        regUser(state, { payload }) {
            console.log("Регистрация прошла успешно");
        },
    },
});

export default userSlice.reducer;
export const getCurrentUser = (state) => state.currentUser.currentUser;
export const isLogin = (state) => state.currentUser.isLogin;
export const { loginUser, logOut, regUser } = userSlice.actions;
