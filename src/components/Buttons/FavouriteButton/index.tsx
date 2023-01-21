import React, { ButtonHTMLAttributes } from "react";

import "./styles.scss";

interface FavouriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isFav: boolean;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ isFav, className = '', ...rest }) => {

    return (
        <>
            <button {...rest} className={`button-favourite ${isFav ? 'button-favourite--active' : ''} ${className}`}>
                <span>{isFav ? 'В избранном' : 'В избранное'}</span>
                <i className={`fas fa-heart button-favourite__icon ${isFav ? 'button-favourite__icon--active' : ''}`}></i>
            </button>
        </>
    );
};

export default FavouriteButton;