import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { IProductsInfo } from "../../../models/products";
import { api } from "../../../api";
import { handleDefaultError } from "../../../utils/handleDefaultError";

export const fetchProductsInfo = createAppAsyncThunk<IProductsInfo, undefined>(
    "products/fetchProductsInfo",
    async function (_, { rejectWithValue }) {
        try {
            const response = await api.get<IProductsInfo>("productsInfo");
            return response.data;
        } catch (error) {
            const message = handleDefaultError(error);
            return rejectWithValue({ message });
        }
    }
);
