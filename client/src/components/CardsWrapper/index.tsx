import React from 'react'

import './styles.scss';

type CardsWrapperProps = {
    children: React.ReactNode;
    className?: string;
}

const CardsWrapper: React.FC<CardsWrapperProps> = ({ children, className = '' }) => {
    return (
        <div className={`cards-wrapper ${className}`}>
            {children}
        </div>
    )
}

export default CardsWrapper