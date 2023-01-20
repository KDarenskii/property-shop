import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { IProduct } from "../../../models/products";

type KnownError = {
    message: string;
}

type Response = {
    data: IProduct;
    message: string;
}

export const postFavourite = createAsyncThunk<Response, IProduct, { rejectValue: KnownError }>(
    'favourites/postFavourites',
    async function(favItem, { rejectWithValue }) {
        try {
            const response = await api.post<IProduct>('favourites', favItem);
            return ({
                data: response.data,
                message: 'Объект добавлен в избранное'
            });
        } catch (error) {
            return rejectWithValue({ message: 'Не удалось добавить в избранное' });
        }
    }
)
