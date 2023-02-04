import { RootState } from "..";

export const selectFavourites = (state: RootState) => state.favourites;
export const selectFavouriteById = (state: RootState, id: string) => state.favourites.list.find((fav) => fav.id === id);
