import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";

type KnownError = {
    message: string;
}

type Response = {
    id: string;
    message: string;
}

export const deleteBid = createAsyncThunk<Response, string, { rejectValue: KnownError }>(
    'bids/deleteBid',
    async function(id, { rejectWithValue }) {
        try {
            await api.delete<void>(`bids/${id}`);
            return ({ id, message: 'Заявка удалена' });
        } catch (error) {
            return rejectWithValue({ message: 'Не удалось удалить заявку' });
        }
    }
)