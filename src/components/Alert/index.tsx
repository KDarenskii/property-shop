import React from 'react'
import { TAlert } from '../../constants/alertTypes';

import './styles.scss';

type AlertProps = {
    message: string;
    type: TAlert;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
    return (
        <div className={`alert alert--${type}`}>{message}</div>
    )
}

export default Alert