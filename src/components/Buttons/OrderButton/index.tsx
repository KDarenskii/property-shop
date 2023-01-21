import React, { ButtonHTMLAttributes } from 'react'

import './styles.scss';

interface OrderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small';
    text: string;
}

const OrderButton: React.FC<OrderButtonProps> = ({ ...rest }) => {
    return (
        <button {...rest} className={`order-button ${rest.size ? 'order-button--small' : ''} ${rest.className ?? ''}`}>
            {rest.text}
        </button>
    )
}

export default OrderButton