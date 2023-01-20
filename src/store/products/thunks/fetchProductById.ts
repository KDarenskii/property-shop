import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { api } from "../../../api";
import { IProduct } from "../../../models/products";

type KnownError = {
    message: string;
}

export const fetchProductById = createAsyncThunk<IProduct, string, { rejectValue: KnownError }>(
    'products/fetchProductById',
    async function(id, { rejectWithValue }) {
        try {
            const response = await api.get<IProduct>('products/' + id);
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