import React from "react";
import cn from "classnames";

type ProductDetailsProps = {
    children: React.ReactNode;
    className?: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ children, className }) => {
    return <div className={cn("details", className)}>{children}</div>;
};

export default ProductDetails;
