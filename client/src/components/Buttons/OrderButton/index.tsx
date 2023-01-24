import React, { ButtonHTMLAttributes } from 'react'
import cn from 'classnames';

import './styles.scss';

interface OrderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small';
    text: string;
}

const OrderButton: React.FC<OrderButtonProps> = ({text, size, className, ...rest }) => {
    return (
        <button {...rest} className={cn('order-button', { 'order-button--small': size }, className)}>
            {text}
        </button>
    )
}

export default OrderButton