import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { IBid, IBookingBid } from "../../../models/bid";

type KnownError = {
    message: string;
}

type Response = {
    data: IBookingBid | IBid;
    message: string;
}

export const postBid = createAsyncThunk<Response, IBookingBid | IBid, { rejectValue: KnownError }>(
    'bids/postBid',
    async function(bid, { rejectWithValue }) {
        try {
            const response = await api.post<IBookingBid | IBid>('bids', bid);
            return ({
                data: response.data,
                message: 'Заявка успешно отправлена'
            });
        } catch (error) {
            return rejectWithValue({ message: 'Не удалось отправить заявку' });
        }
    }
)