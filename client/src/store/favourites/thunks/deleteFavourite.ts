import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { authApi } from "../../../api";
import { logoutUser } from "../../user/userSlice";
import { handleAuthError } from "../../../utils/handleAuthError";

type Response = {
    id: string;
    message: string;
};

export const deleteFavourite = createAppAsyncThunk<Response, string>(
    "favourites/deleteFavourite",
    async function (id, { rejectWithValue, dispatch }) {
        try {
            await authApi.delete<void>("favourites/" + id);
            return { id, message: "Объект удален из избранного" };
        } catch (error) {
            const { isAuthError, message } = handleAuthError(error);
            if (isAuthError) {
                dispatch(logoutUser());
                return rejectWithValue({ message });
            }
            return rejectWithValue({ message: "Не удалось удалить из избранного" });
        }
    }
);
