import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { api } from "../../../api";
import { IBid, IBookingBid } from "../../../models/bid";

type KnownError = {
    message: string;
}

type FetchBidsParams = {
    limit?: number;
    query?: string;
}

type BidsResponse = {
    totalCount: string;
    data: (IBid | IBookingBid)[];
}

export const fetchBids = createAsyncThunk<BidsResponse, FetchBidsParams, { rejectValue: KnownError }>(
    'bids/fetchBids',
    async function({ query, limit = 10}, { rejectWithValue }) {
        try {
            const response = await api.get<(IBid | IBookingBid)[]>('bids?' + query, {
                params: {
                    _limit: limit,
                    _sort: 'date',
                    _order: 'desc'
                }
            });
            return ({
                data: response.data,
                totalCount: response.headers['x-total-count'] ?? '',
            });
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