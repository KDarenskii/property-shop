import { RooteState } from "..";

export const selectFavourites = (state: RooteState) => state.favourites;
export const selectFavouriteById = (state: RooteState, id: string) =>
    state.favourites.list.find((fav) => fav.id === id);
