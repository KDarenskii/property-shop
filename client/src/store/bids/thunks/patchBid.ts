import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { authApi } from "../../../api";
import { EditBookingValues } from "../../../components/BidEdit/BookingBidEditForm";
import { logoutUser } from "../../user/userSlice";
import { handleAuthError } from "../../../utils/handleAuthError";

type Response = {
    message: string;
};

export const patchBid = createAppAsyncThunk<Response, EditBookingValues>(
    "bids/patchBid", async function (body, { rejectWithValue, dispatch }) {
    try {
        await authApi.patch<void>(`bids/${body.id}`, body);
        return { message: "Изменения сохранены" };
    } catch (error) {
        const { isAuthError, message } = handleAuthError(error);
        if (isAuthError){
            dispatch(logoutUser());
            return rejectWithValue({ message });
        }
        return rejectWithValue({ message: "Не удалось сохранить изменения" });
    }
});
