import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductsInfo, IProduct } from '../../models/products';
import { fetchProductsInfo } from './thunks/fetchProductsInfo';
import { fetchProducts } from './thunks/fetchProducts';

type IProductsItems = {
    list: IProduct[];
    error: string | null;
    isLoading: boolean;
    totalCount: string;
    limit: number;
}

type InitialState = {
    productsInfo: IProductsInfo;
    listView: 'cards' | 'panels';
    productsItems: IProductsItems;
}

const initialState: InitialState = {
    productsInfo: {
        priceMin: '',
        priceMax: '',
        squareMin: '',
        squareMax: '',
        complexNames: [],
        roomValues: [],
    },
    productsItems: {
        list: [],
        error: null,
        isLoading: true,
        totalCount: '0',
        limit: 6
    },
    listView: JSON.parse(localStorage.getItem('listView') as string) || 'cards',
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setListView: (state, action: PayloadAction<'cards' | 'panels'>) => {
            state.listView = action.payload;
            localStorage.setItem('listView', JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsInfo.fulfilled, (state, action) => {
                state.productsInfo = action.payload;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.productsItems.isLoading = true;
                state.productsItems.list = [];
                state.productsItems.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productsItems.error = null;
                state.productsItems.list = action.payload.data;
                state.productsItems.totalCount = action.payload.totalCount;
                state.productsItems.isLoading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.productsItems.list = [];
                state.productsItems.isLoading = false;
                if (action.payload) {
                    state.productsItems.error = action.payload.message;
                } else {
                    state.productsItems.error = action.error.message ?? 'Возникла техническая ошибка';
                }
            })
    }
})

export const { setListView } = productSlice.actions;
export default productSlice.reducer;