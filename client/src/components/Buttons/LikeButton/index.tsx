import React, { ButtonHTMLAttributes } from "react";
import cn from 'classnames';

import "./styles.scss";

interface LikeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLiked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, className, ...rest }) => {
    return (
        <button {...rest} className={cn('favourite-like', { 'favourite-like--active': isLiked }, className)}>
            <i className="fas fa-heart"></i>
        </button>
    );
};

export default LikeButton;