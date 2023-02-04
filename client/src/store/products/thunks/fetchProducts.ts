import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { IProduct } from "../../../models/products";
import { api } from "../../../api";
import { handleDefaultError } from "../../../utils/handleDefaultError";

type FetchProductsParams = {
    limit?: number;
    query?: string;
};

type ProductsResponse = {
    totalCount: string;
    data: IProduct[];
};

export const fetchProducts = createAppAsyncThunk<
    ProductsResponse,
    FetchProductsParams
>(
    "products/fetchProducts",
    async function ({ query = "", limit = 10 }, { rejectWithValue }) {
        try {
            const response = await api.get<IProduct[]>(
                `products?_limit=${limit}&` + query,
                {
                    params: {
                        _limit: limit,
                    },
                }
            );
            return {
                data: response.data,
                totalCount: response.headers["x-total-count"] ?? "",
            };
        } catch (error) {
            const message = handleDefaultError(error);
            return rejectWithValue({ message });
        }
    }
);
