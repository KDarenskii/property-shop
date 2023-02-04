import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { authApi } from "../../../api";
import { IBid, IBookingBid } from "../../../models/bid";
import { logoutUser } from "../../user/userSlice";
import { handleAuthError } from "../../../utils/handleAuthError";

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
            const { isAuthError, message } = handleAuthError(error);
            if (isAuthError) dispatch(logoutUser());
            return rejectWithValue({ message });
        }
    }
);
