import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import axios from "axios";
import { authApi } from "../../../api";
import { IBid, IBookingBid } from "../../../models/bid";
import { logoutUser } from "../../user/userSlice";

type FetchBidsParams = {
    limit?: number;
    query?: string;
};

type BidsResponse = {
    totalCount: string;
    data: (IBid | IBookingBid)[];
};

export const fetchBids = createAppAsyncThunk<BidsResponse, FetchBidsParams>(
    "bids/fetchBids",
    async function ({ query, limit = 10 }, { rejectWithValue, dispatch }) {
        try {
            const response = await authApi.get<(IBid | IBookingBid)[]>(
                "bids?" + query,
                {
                    params: {
                        _limit: limit,
                        _sort: "date",
                        _order: "desc",
                    },
                }
            );
            return {
                data: response.data,
                totalCount: response.headers["x-total-count"] ?? "",
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    dispatch(logoutUser());
                    return rejectWithValue({ message: "Необходимо войти в аккаунт" });
                } else if (error.response) {
                    return rejectWithValue({ message: "Не удалось получить данные с сервера" });
                } else {
                    return rejectWithValue({  message: "Ошибка интернет соединения" });
                }
            }
            return rejectWithValue({ message: "Возникла техническая ошибка" });
        }
    }
);
