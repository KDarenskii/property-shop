import React from "react";
import cn from "classnames";

import "./styles.scss";

type ProductParamsItemProps = {
    definition: string;
    value: string;
    className?: string;
};

const ProductParamsItem: React.FC<ProductParamsItemProps> = ({ definition, value, className }) => {
    return (
        <div className={cn("params-item", className)}>
            <div className="params-item__definition">{definition}</div>
            <div className="params-item__value">{value}</div>
        </div>
    );
};

export default ProductParamsItem;
