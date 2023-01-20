import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { IProduct } from "../../../models/products";
import axios, { AxiosError } from 'axios';


type FetchProductsParams = {
    limit?: number;
    query?: string;
}

type ProductsResponse = {
    totalCount: string;
    data: IProduct[]
}

type RegectedError = {
    message: string;
}

export const fetchProducts = createAsyncThunk<ProductsResponse, FetchProductsParams, { rejectValue: RegectedError}>(
    'products/fetchProducts',
    async function({ query = '', limit = 10 }, { rejectWithValue }) {
        try {
            const response = await api.get<IProduct[]>(`products?_limit=${limit}&` + query, {
                params: {
                    _limit: limit,
                }
            });
            return ({
                data: response.data,
                totalCount: response.headers['x-total-count'] ?? '',
            });
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