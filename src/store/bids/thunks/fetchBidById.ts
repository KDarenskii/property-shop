import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { api } from "../../../api";
import { IBid, IBookingBid } from "../../../models/bid";

type KnownError = {
    message: string;
}

export const fetchBidById = createAsyncThunk<(IBid | IBookingBid), string, { rejectValue: KnownError }>(
    'bids/fetchBidById',
    async function(id, { rejectWithValue }) {
        try {
            const response = await api.get<(IBid | IBookingBid)>(`bids/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError;
                if (serverError && serverError.response) {
                    return rejectWithValue({ message: 'Не удалось получить данные с сервера' });
                } else {
                    return rejectWithValue({ message: 'Ошибка интернет соединения' })
                }
            }
            return rejectWithValue({ message: 'Возникла техническая ошибка' })
        }
    }
)