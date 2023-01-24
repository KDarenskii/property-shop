import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import './styles.scss';

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ text, className, ...rest }) => {
    return (
        <button {...rest} className={cn('back-button', className)}>{text}</button>
    )
}

export default BackButton