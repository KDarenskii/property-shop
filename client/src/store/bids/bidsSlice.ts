import { createSlice } from "@reduxjs/toolkit";
import { IBid, IBookingBid } from "../../models/bid";
import { fetchBids } from "./thunks/fetchBids";
import { postBid } from "./thunks/postBid";
import { deleteBid } from "./thunks/deleteBid";

type InitialState = {
    list: (IBookingBid | IBid)[];
    isLoading: boolean;
    error: string | null;
    totalCount: string;
}

const initialState: InitialState = {
    list: [],
    isLoading: true,
    error: null,
    totalCount: '0'
}


const bidsSlice = createSlice({
    name: 'bids',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBids.pending, (state) => {
                state.list = [];
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBids.fulfilled, (state, action) => {
                state.list = action.payload.data;
                state.totalCount = action.payload.totalCount;
                state.error = null;
                state.isLoading = false;
            })
            .addCase(fetchBids.rejected, (state, action) => {
                state.list = [];
                state.isLoading = false;
                if (action.payload) {
                    state.error = action.payload.message;
                } else {
                    state.error = action.error.message ?? 'Возникла техническая ошибка';
                }
            })
            .addCase(postBid.fulfilled, (state, action) => {
                state.list = [action.payload.data, ...state.list];
            })
            .addCase(deleteBid.fulfilled, (state, action) => {
                state.list = state.list.filter(bid => bid.id !== action.payload.id);
            })
    }
})

export default bidsSlice.reducer;
