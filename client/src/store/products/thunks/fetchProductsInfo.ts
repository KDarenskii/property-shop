import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { IProductsInfo } from "../../../models/products";
import axios from 'axios';
import { api } from "../../../api";

export const fetchProductsInfo = createAppAsyncThunk<IProductsInfo, undefined>(
    'products/fetchProductsInfo',
    async function(_, { rejectWithValue }) {
        try {
            const response = await api.get<IProductsInfo>('productsInfo');
            return response.data;
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