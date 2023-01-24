import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NOTION_TYPES } from '../../constants/notionTypes';
import { LOGIN_ROUTE } from '../../constants/routesPathNames';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useUser } from '../../hooks/useUser';
import { IProduct } from '../../models/products';
import { selectFavouriteById } from '../../store/favourites/selectors';
import { deleteFavourite } from '../../store/favourites/thunks/deleteFavourite';
import { postFavourite } from '../../store/favourites/thunks/postFavourite';
import { showNotion } from '../../utils/showNotion';
import FavouriteButton from '../Buttons/FavouriteButton';

type ProductFavouriteButtonProps = IProduct;

const ProductFavouriteButton: React.FC<ProductFavouriteButtonProps> = (product) => {

    const fav = useAppSelector((state) => selectFavouriteById(state, product.id));
    const { isAuth } = useUser();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleFavouriteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();
        event.stopPropagation();

        if (!isAuth) {
            navigate(LOGIN_ROUTE);
            return;
        }

        setIsSubmitting(true);
        if (Boolean(fav)) {
            try {
                const response = await dispatch(deleteFavourite(product.id)).unwrap();
                showNotion(NOTION_TYPES.SUCCESS, response.message);
            } catch (error) {
                console.log(error)
                const err = error as any;
                showNotion(NOTION_TYPES.ERROR, err.message);
            }
        } else {
            try {
                const response = await dispatch(postFavourite(product)).unwrap();
                showNotion(NOTION_TYPES.SUCCESS, response.message)
            } catch (error) {
                console.log(error)
                const err = error as any;
                showNotion(NOTION_TYPES.ERROR, err.message);
            }
        }
        setIsSubmitting(false);
    };
    
    return (
        <FavouriteButton isFav={Boolean(fav)} onClick={handleFavouriteClick} disabled={isSubmitting} />
    )
}

export default ProductFavouriteButton