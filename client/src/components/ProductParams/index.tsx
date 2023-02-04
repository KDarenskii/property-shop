import React from "react";
import cn from "classnames";

import "./styles.scss";

type ProductParamsProps = {
    children: React.ReactNode;
    className?: string;
};

const ProductParams: React.FC<ProductParamsProps> = ({ children, className }) => {
    return <div className={cn("params", className)}>{children}</div>;
};

export default ProductParams;
