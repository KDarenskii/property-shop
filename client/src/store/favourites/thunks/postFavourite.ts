import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { authApi } from "../../../api";
import { IProduct } from "../../../models/products";
import { logoutUser } from "../../user/userSlice";
import { handleAuthError } from "../../../utils/handleAuthError";

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
            const { isAuthError, message } = handleAuthError(error);
            if (isAuthError) {
                dispatch(logoutUser());
                return rejectWithValue({ message });
            }
            return rejectWithValue({ message: "Не удалось добавить в избранное" });
        }
    }
);