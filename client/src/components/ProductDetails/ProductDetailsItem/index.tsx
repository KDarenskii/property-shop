import React from "react";
import cn from "classnames";

import "./styles.scss";

type ProductDetailsItemProps = {
    name: string;
    value: string;
    valueClassName?: string;
};

const ProductDetailsItem: React.FC<ProductDetailsItemProps> = ({ name, value, valueClassName }) => {
    return (
        <div className="details-item">
            <div className="details-item__name">{name}</div>
            <div className={cn("details-item__value", valueClassName)}>{value}</div>
        </div>
    );
};

export default ProductDetailsItem;