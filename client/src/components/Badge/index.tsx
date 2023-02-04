import React from "react";
import { BADGE } from "../../constants/badge";

import "./styles.scss";

type BadgeProps = {
    type: BADGE;
    text: string;
};

const Badge: React.FC<BadgeProps> = ({ type, text }) => {
    return <span className={`badge badge--${type}`}>{text}</span>;
};

export default Badge;
