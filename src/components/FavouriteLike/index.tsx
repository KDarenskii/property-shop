import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectFavouriteById } from "../../store/favourites/selectors";
import { showNotion } from "../../utils/showNotion";
import { NOTION_TYPES } from "../../constants/notionTypes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { deleteFavourite } from "../../store/favourites/thunks/deleteFavourite";
import { postFavourite } from "../../store/favourites/thunks/postFavourite";
import { IProduct } from "../../models/products";

import './styles.scss';

type FavouritesBtnProps = IProduct;

const FavouriteLike: React.FC<FavouritesBtnProps> = (product) => {

    const fav = useAppSelector((state) => selectFavouriteById(state, product.id));
    const dispatch = useAppDispatch();
    let isLoading = false;

    const handleFavouriteClick = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (fav && !isLoading) {
            isLoading = true;
            dispatch(deleteFavourite(product.id)).unwrap()
                .then((response) => showNotion(NOTION_TYPES.SUCCESS, response.message))
                .catch((error) => showNotion(NOTION_TYPES.ERROR, error.message))
                .finally(() => isLoading = false);
        }

        if (!fav && !isLoading) {
            isLoading = true;
            dispatch(postFavourite(product)).unwrap()
                .then((response) => showNotion(NOTION_TYPES.SUCCESS, response.message))
                .catch((error) => showNotion(NOTION_TYPES.ERROR, error.message))
                .finally(() => isLoading = false);
        }
    }

    return (
        <div
            className={`favourite-like ${fav ? 'favourite-like--active' : ''}`}
            onClick={handleFavouriteClick}
        >
            <i className="fas fa-heart"></i>
        </div>
    );
}

export default FavouriteLike