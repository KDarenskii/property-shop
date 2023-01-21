import React from 'react'
import { NOTION_TYPES } from '../../constants/notionTypes';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IProduct } from '../../models/products';
import { selectFavouriteById } from '../../store/favourites/selectors';
import { deleteFavourite } from '../../store/favourites/thunks/deleteFavourite';
import { postFavourite } from '../../store/favourites/thunks/postFavourite';
import { showNotion } from '../../utils/showNotion';
import FavouriteButton from '../Buttons/FavouriteButton';

type ProductFavouriteButtonProps = IProduct;

const ProductFavouriteButton: React.FC<ProductFavouriteButtonProps> = (product) => {

    const fav = useAppSelector((state) => selectFavouriteById(state, product.id));
    let [isSubmitting, setIsSubmitting] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleFavouriteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();
        event.stopPropagation();

        setIsSubmitting(true);

        if (fav) {
            dispatch(deleteFavourite(product.id))
                .unwrap()
                .then((response) =>
                    showNotion(NOTION_TYPES.SUCCESS, response.message)
                )
                .catch((error) => showNotion(NOTION_TYPES.ERROR, error.message))
                .finally(() => (setIsSubmitting(false)));
        } else {
            dispatch(postFavourite(product))
                .unwrap()
                .then((response) =>
                    showNotion(NOTION_TYPES.SUCCESS, response.message)
                )
                .catch((error) => showNotion(NOTION_TYPES.ERROR, error.message))
                .finally(() => (setIsSubmitting(false)));
        }
    };
    
    return (
        <FavouriteButton isFav={Boolean(fav)} onClick={handleFavouriteClick} disabled={isSubmitting} />
    )
}

export default ProductFavouriteButton