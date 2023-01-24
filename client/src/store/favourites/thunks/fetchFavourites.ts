import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { IProduct } from "../../../models/products";
import axios from "axios";
import { authApi } from "../../../api";
import { logoutUser } from "../../user/userSlice";

export const fetchFavourites = createAppAsyncThunk<IProduct[], void>(
    "favourites/fetchFavourites",
    async function (_, { rejectWithValue, dispatch }) {
        try {
            const response = await authApi.get<IProduct[]>("favourites");
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    dispatch(logoutUser());
                    return rejectWithValue({ message: "Необходимо войти в аккаунт" });
                } else if (error.response) {
                    return rejectWithValue({message: "Не удалось получить данные с сервера" });
                } else {
                    return rejectWithValue({message: "Ошибка интернет соединения" });
                }
            }
            return rejectWithValue({ message: "Возникла техническая ошибка" });
        }
    }
);
