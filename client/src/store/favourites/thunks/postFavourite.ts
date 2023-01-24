import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import axios from "axios";
import { authApi } from "../../../api";
import { IProduct } from "../../../models/products";
import { logoutUser } from "../../user/userSlice";

type Response = {
    data: IProduct;
    message: string;
};

export const postFavourite = createAppAsyncThunk<Response, IProduct>(
    "favourites/postFavourites",
    async function (favItem, { rejectWithValue, dispatch }) {
        try {
            const response = await authApi.post<IProduct>("favourites", favItem);
            return {
                data: response.data,
                message: "Объект добавлен в избранное",
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    dispatch(logoutUser());
                    return rejectWithValue({ message: "Необходимо войти в аккаунт" });
                }
            }
            return rejectWithValue({ message: "Не удалось добавить в избранное" });
        }
    }
);
