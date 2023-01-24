import React, { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom';
import cn from 'classnames';

import './styles.scss';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'red' | 'yellow' | 'blue';
    text: string;
    to?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ color, text, to, className, ...props }) => {

    return (
        <>
            {to ? (
                    <Link 
                        to={to}
                        className={cn('action-button', `action-button--${color}`, className)}
                    >
                        {text}
                    </Link>
                ) : (
                    <button
                        {...props}
                        className={cn('action-button', `action-button--${color}`, className)}
                    >
                        {text}
                    </button>
                )
            }
        </>
    )
}

export default ActionButton