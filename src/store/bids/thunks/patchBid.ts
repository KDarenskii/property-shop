import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { EditBookingValues } from "../../../components/BidEdit/BookingBidEditForm";

type KnownError = {
    message: string;
};

type Response = {
    message: string;
};

export const patchBid = createAsyncThunk<
    Response,
    EditBookingValues,
    { rejectValue: KnownError }
>("bids/patchBid", async function (body, { rejectWithValue }) {
    try {
        await api.patch<void>(`bids/${body.id}`, body);
        return { message: "Изменения сохранены" };
    } catch (error) {
        return rejectWithValue({ message: "Не удалось удалить заявку" });
    }
});
