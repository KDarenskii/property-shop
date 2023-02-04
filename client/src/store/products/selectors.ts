import { RootState } from "..";

export const selectProductsInfo = (state: RootState) => state.products.productsInfo;
export const selectProducts = (state: RootState) => state.products.productsItems;
export const selectListView = (state: RootState) => state.products.listView;
