import React from 'react'

import './styles.scss';

type ContainerProps = {
    children: React.ReactNode;
    type?: 'fluid'
}

const Container: React.FC<ContainerProps> = ({ children, type }) => {
    return (
        <div className={`container ${type ? `container--${type}` : ''}`}>{children}</div>
    )
}

export default Container