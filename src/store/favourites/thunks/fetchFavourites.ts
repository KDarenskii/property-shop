import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { IProduct } from "../../../models/products";
import { AxiosError } from 'axios';
import axios from 'axios';

type KnownError = {
    message: string;
}

export const fetchFavourites = createAsyncThunk<IProduct[], void, { rejectValue: KnownError }>(
    "favourites/fetchFavourites",
    async function(_, { rejectWithValue }) {
        try {
            const response = await api.get<IProduct[]>('favourites');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError;
                if (serverError && serverError.response) {
                    return rejectWithValue({ message: 'Не удалось получить данные с сервера' });
                } else {
                    return rejectWithValue({ message: 'Ошибка интернет соединения' })
                }
            }
            return rejectWithValue({ message: 'Возникла техническая ошибка' })
        }
    }
)