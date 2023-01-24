import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import axios from "axios";
import { authApi } from "../../../api";
import { setIsAuth } from "../userSlice";

export const refreshUser = createAppAsyncThunk<void, undefined>(
    "user/refreshUser", async function (_, { rejectWithValue, dispatch }) {
    try {
        await authApi.get<void>("refresh");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                dispatch(setIsAuth(false));
                return rejectWithValue({
                    message: "Необходимо войти в аккаунт",
                });
            }
        }
        return rejectWithValue({ message: "Возникла техническая ошибка" });
    }
});
