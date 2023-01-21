import React, { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom';

import './styles.scss';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'red' | 'yellow' | 'blue';
    text: string;
    to?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ color, text, to,...props }) => {
    return (
        <>
            {to ? (
                    <Link 
                        to={to}
                        className={`action-button action-button--${color} ${props.className ?? ''}`}
                    >
                        {text}
                    </Link>
                ) : (
                    <button
                        {...props}
                        className={`action-button action-button--${color} ${props.className ?? ''}`}
                    >
                        {text}
                    </button>
                )
            }
        </>
    )
}

export default ActionButton