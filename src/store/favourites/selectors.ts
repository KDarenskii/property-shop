import { RooteState } from "../store";

export const selectFavourites = (state: RooteState) => (
    {
        list: state.favourites.list,
        error: state.favourites.error
    }
)
export const selectFavouriteById = (state: RooteState, id: string) => state.favourites.list.find(fav => fav.id === id);
export const selectFavoritesIsLoading = (state: RooteState) => state.favourites.isLoading;
export const selectFavouritesLength = (state: RooteState) => state.favourites.list.length;