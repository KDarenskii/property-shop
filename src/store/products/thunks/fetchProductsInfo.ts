import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { IProductsInfo } from "../../../models/products";
import axios, { AxiosError } from 'axios';

type KnownError = {
    message: string;
}

export const fetchProductsInfo = createAsyncThunk<IProductsInfo, undefined, { rejectValue: KnownError }>(
    'products/fetchProductsInfo',
    async function(_, { rejectWithValue }) {
        try {
            const response = await api.get<IProductsInfo>('productsInfo');
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