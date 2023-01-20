import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";

type KnownError = {
    message: string;
}

type Response = {
    id: string;
    message: string;
}

export const deleteFavourite = createAsyncThunk<Response, string, { rejectValue: KnownError }>(
    'favourites/deleteFavourite',
    async function(id, { rejectWithValue }) {
        try {
            await api.delete<void>('favourites/' + id);
            return ({ id, message: 'Объект удален из избранного' });
        } catch (error) {
            return rejectWithValue({ message: 'Не удалось удалить из избранного' });
        }
    }
)