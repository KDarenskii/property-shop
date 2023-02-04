import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/products";
import { fetchFavourites } from "./thunks/fetchFavourites";
import { postFavourite } from "./thunks/postFavourite";
import { deleteFavourite } from "./thunks/deleteFavourite";

type TInitialState = {
    list: IProduct[];
    isLoading: boolean;
    error: null | string;
}

const initialState: TInitialState = {
    list: [],
    isLoading: false,
    error: null,
}

const favouriteSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavourites.pending, (state) => {
                state.error = null;
                state.isLoading = true;
                state.list = [];
            })
            .addCase(fetchFavourites.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchFavourites.rejected, (state, action) => {
                state.isLoading = false;
                state.list = [];
                if (action.payload) {
                    state.error = action.payload.message;
                } else {
                    state.error = action.error.message ?? null;
                }
            })
            .addCase(postFavourite.fulfilled, (state, action) => {
                state.list = [action.payload.data, ...state.list];
            })
            .addCase(deleteFavourite.fulfilled, (state, action) => {
                state.list = state.list.filter(favItem => favItem.id !== action.payload.id);
            })
    }
})

export default favouriteSlice.reducer;