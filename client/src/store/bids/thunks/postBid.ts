import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { authApi } from "../../../api";
import { IBid, IBookingBid } from "../../../models/bid";
import { logoutUser } from "../../user/userSlice";
import { handleAuthError } from "../../../utils/handleAuthError";

type Response = {
    data: IBookingBid | IBid;
    message: string;
};

export const postBid = createAppAsyncThunk<Response, IBookingBid | IBid>(
    "bids/postBid", async function (bid, { rejectWithValue, dispatch }) {
    try {
        const response = await authApi.post<IBookingBid | IBid>("bids", bid);
        return {
            data: response.data,
            message: "Заявка успешно отправлена",
        };
    } catch (error) {
        const { isAuthError, message } = handleAuthError(error);
        if (isAuthError){
            dispatch(logoutUser());
            return rejectWithValue({ message });
        }
        return rejectWithValue({ message: "Не удалось отправить заявку" });
    }
});
