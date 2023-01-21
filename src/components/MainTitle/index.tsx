import React from 'react';

import './styles.scss';

type MainTitleProps = {
    text: string;
    className?: string;
}

const MainTitle: React.FC<MainTitleProps> = ({ text, className = '' }) => {
    return <h2 className={`main-title ${className}`}>{text}</h2>
}

export default MainTitle