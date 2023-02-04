import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { authApi } from "../../../api";
import { IBid, IBookingBid } from "../../../models/bid";
import { logoutUser } from "../../user/userSlice";
import { handleAuthError } from "../../../utils/handleAuthError";

export const fetchBidById = createAppAsyncThunk<IBid | IBookingBid, string>(
    "bids/fetchBidById", async function (id, { rejectWithValue, dispatch }) {
    try {
        const response = await authApi.get<IBid | IBookingBid>(`bids/${id}`);
        return response.data;
    } catch (error) {
        const { isAuthError, message } = handleAuthError(error);
        if (isAuthError) dispatch(logoutUser());
        return rejectWithValue({ message });
    }
});
