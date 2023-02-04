import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { IProduct } from "../../../models/products";
import { authApi } from "../../../api";
import { logoutUser } from "../../user/userSlice";
import { handleAuthError } from "../../../utils/handleAuthError";

export const fetchFavourites = createAppAsyncThunk<IProduct[], void>(
    "favourites/fetchFavourites",
    async function (_, { rejectWithValue, dispatch }) {
        try {
            const response = await authApi.get<IProduct[]>("favourites");
            return response.data;
        } catch (error) {
            const { isAuthError, message } = handleAuthError(error);
            if (isAuthError) dispatch(logoutUser());
            return rejectWithValue({ message });
        }
    }
);
