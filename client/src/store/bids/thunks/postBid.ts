import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import axios from "axios";
import { authApi } from "../../../api";
import { IBid, IBookingBid } from "../../../models/bid";
import { logoutUser } from "../../user/userSlice";

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
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                dispatch(logoutUser());
                return rejectWithValue({ message: "Необходимо войти в аккаунт" });
            }
        }
        return rejectWithValue({ message: "Не удалось отправить заявку" });
    }
});
