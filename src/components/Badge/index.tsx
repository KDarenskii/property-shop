import React from 'react';
import { TBadge } from '../../constants/badgeTypes';

import './styles.scss';

type BadgeProps = {
    type: TBadge;
    text: string;
}

const Badge: React.FC<BadgeProps> = ({ type, text }) => {
    return (
        <span className={`badge badge--${type}`}>{text}</span>
    )
}

export default Badge