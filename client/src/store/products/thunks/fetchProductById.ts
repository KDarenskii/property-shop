import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { api } from "../../../api";
import { IProduct } from "../../../models/products";
import { handleDefaultError } from "../../../utils/handleDefaultError";

export const fetchProductById = createAppAsyncThunk<IProduct, string>(
    "products/fetchProductById",
    async function (id, { rejectWithValue }) {
        try {
            const response = await api.get<IProduct>("products/" + id);
            return response.data;
        } catch (error) {
            const message = handleDefaultError(error);
            return rejectWithValue({ message });
        }
    }
);
