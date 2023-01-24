import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { IProduct } from "../../../models/products";
import axios from 'axios';
import { api } from "../../../api";

type FetchProductsParams = {
    limit?: number;
    query?: string;
}

type ProductsResponse = {
    totalCount: string;
    data: IProduct[]
}

export const fetchProducts = createAppAsyncThunk<ProductsResponse, FetchProductsParams>(
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
                if (error.response) {
                    return rejectWithValue({ message: 'Не удалось получить данные с сервера' });
                } else {
                    return rejectWithValue({ message: 'Ошибка интернет соединения' })
                }
            }
            return rejectWithValue({ message: 'Возникла техническая ошибка' })
        }
    }
)