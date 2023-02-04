import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { authApi } from "../../../api";
import { logoutUser } from "../../user/userSlice";
import { handleAuthError } from "../../../utils/handleAuthError";

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
        const { isAuthError, message } = handleAuthError(error);
        if (isAuthError){
            dispatch(logoutUser());
            return rejectWithValue({ message });
        }
        return rejectWithValue({ message: "Не удалось удалить заявку" });
    }
});
