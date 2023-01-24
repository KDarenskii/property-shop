import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import axios from "axios";
import { authApi } from "../../../api";
import { IBid, IBookingBid } from "../../../models/bid";
import { logoutUser } from "../../user/userSlice";

export const fetchBidById = createAppAsyncThunk<IBid | IBookingBid, string>(
    "bids/fetchBidById", async function (id, { rejectWithValue, dispatch }) {
    try {
        const response = await authApi.get<IBid | IBookingBid>(`bids/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                dispatch(logoutUser());
                return rejectWithValue({ message: "Необходимо войти в аккаунт" });
            } else if (error.response) {
                return rejectWithValue({ message: "Не удалось получить данные с сервера" });
            } else {
                return rejectWithValue({ message: "Ошибка интернет соединения" });
            }
        }

        return rejectWithValue({ message: "Возникла техническая ошибка" });
    }
});
