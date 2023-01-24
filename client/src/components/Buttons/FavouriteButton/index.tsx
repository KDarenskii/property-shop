import React, { ButtonHTMLAttributes } from "react";
import cn from 'classnames';

import "./styles.scss";

interface FavouriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isFav: boolean;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ isFav, className, ...rest }) => {
    return (
        <>
            <button {...rest} className={cn('button-favourite', { 'button-favourite--active': isFav }, className)}>
                <span>{isFav ? 'В избранном' : 'В избранное'}</span>
                <i className={cn('fas fa-heart button-favourite__icon', { 'button-favourite__icon--active': isFav })}></i>
            </button>
        </>
    );
};

export default FavouriteButton;