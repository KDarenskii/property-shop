import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import favouritesReducer from "./favourites/favouritesSlice";
import bidsReducer from "./bids/bidsSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
    reducer: {
        products: productsReducer,
        favourites: favouritesReducer,
        bids: bidsReducer,
        user: userReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;