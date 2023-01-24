import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import axios from "axios";
import { api } from "../../../api";
import { IProduct } from "../../../models/products";

export const fetchProductById = createAppAsyncThunk<IProduct, string>(
    'products/fetchProductById',
    async function(id, { rejectWithValue }) {
        try {
            const response = await api.get<IProduct>('products/' + id);
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