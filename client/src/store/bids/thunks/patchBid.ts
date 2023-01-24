import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import axios from "axios";
import { authApi } from "../../../api";
import { EditBookingValues } from "../../../components/BidEdit/BookingBidEditForm";
import { logoutUser } from "../../user/userSlice";

type Response = {
    message: string;
};

export const patchBid = createAppAsyncThunk<Response, EditBookingValues>(
    "bids/patchBid", async function (body, { rejectWithValue, dispatch }) {
    try {
        await authApi.patch<void>(`bids/${body.id}`, body);
        return { message: "Изменения сохранены" };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                dispatch(logoutUser());
                return rejectWithValue({ message: "Необходимо войти в аккаунт" });
            }
        }
        return rejectWithValue({ message: "Не удалось сохранить изменения" });
    }
});
