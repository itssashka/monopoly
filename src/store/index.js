import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import userReducer from "./userSlice";
import matchReducer from "./matchSlice";


export const store = configureStore({
    reducer:{games: gamesReducer, currentUser: userReducer, match: matchReducer},
})