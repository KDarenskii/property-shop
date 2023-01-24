import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import './styles.scss';

interface PreviewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    hasIcon?: boolean;
}

const PreviewButton: React.FC<PreviewButtonProps> = ({ text, hasIcon = false, className, ...rest }) => {
    return (
        <button {...rest} className={cn('preview-button', { 'preview-button--back': hasIcon }, className)}>
            {text}
            {hasIcon && <img className="preview-button__img" src="/img/icons/return-icon.png" alt="back"/>}
        </button>
    )
}

export default PreviewButton