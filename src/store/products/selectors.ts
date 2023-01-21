import { RooteState } from "../store";

export const selectProductsInfo = (state: RooteState) => state.products.productsInfo;
export const selectProducts = (state: RooteState) => state.products.productsItems;
export const selectListView = (state: RooteState) => state.products.listView;