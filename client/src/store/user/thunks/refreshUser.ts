import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { authApi } from "../../../api";
import { logoutUser } from "../userSlice";
import { handleAuthError } from "../../../utils/handleAuthError";

export const refreshUser = createAppAsyncThunk<void, undefined>(
    "user/refreshUser", async function (_, { rejectWithValue, dispatch }) {
    try {
        await authApi.get<void>("refresh");
    } catch (error) {
        const { isAuthError, message } = handleAuthError(error);
        if (isAuthError) dispatch(logoutUser());
        return rejectWithValue({ message });
    }
});
