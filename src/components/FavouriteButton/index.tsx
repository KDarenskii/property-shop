import React from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { selectFavouriteById } from '../../store/favourites/selectors'
import { deleteFavourite } from '../../store/favourites/thunks/deleteFavourite';
import { postFavourite } from '../../store/favourites/thunks/postFavourite';
import { showNotion } from '../../utils/showNotion';
import { NOTION_TYPES } from '../../constants/notionTypes';
import { IProduct } from '../../models/products';

import './styles.scss';

type FavouritesBtnProps = IProduct;

const FavouritesBtn: React.FC<FavouritesBtnProps> = (product) => {

    const fav = useAppSelector((state) => selectFavouriteById(state, product.id));
    let isLoading = false;
    const dispatch = useAppDispatch();

    const handleFavouriteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <>
            {!fav ? (
                <button onClick={handleFavouriteClick} className="button-favourite">
                    <i className="fas fa-heart button-favourite__icon"></i>{" "}
                    <span className='button-favourite__text'>В избранное</span>
                </button>
            ) : (
                <button onClick={handleFavouriteClick} className="button-favourite button-favourite--active">
                    <i className="fas fa-heart button-favourite__icon button-favourite__icon--active"></i>{" "}
                    <span className='button-favourite__text'>В избранном</span>
                </button>
            )}
        </>
    )
}

export default FavouritesBtn