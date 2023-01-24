import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import axios from "axios";
import { authApi } from "../../../api";
import { logoutUser } from "../../user/userSlice";

type Response = {
    id: string;
    message: string;
};

export const deleteBid = createAppAsyncThunk<Response, string>(
    "bids/deleteBid", async function (id, { rejectWithValue, dispatch }) {
    try {
        await authApi.delete<void>(`bids/${id}`);
        return { id, message: "Заявка удалена" };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                dispatch(logoutUser());
                return rejectWithValue({ message: "Необходимо войти в аккаунт" });
            }
        }
        return rejectWithValue({ message: "Не удалось удалить заявку" });
    }
});
