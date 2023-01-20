import { RooteState } from "../store";

export const selectProductsInfo = (state: RooteState) => state.products.productsInfo;
export const selectProducts = (state: RooteState) => (
    {
        list: state.products.productsItems.list,
        isLoading: state.products.productsItems.isLoading,
    }
);
export const selectProductsError = (state: RooteState) => state.products.productsItems.error;
export const selectProductsTotalCount = (state: RooteState) => state.products.productsItems.totalCount;
export const selectListView = (state: RooteState) => state.products.listView;
export const selectProductsIsLoading = (state: RooteState) => state.products.productsItems.isLoading;