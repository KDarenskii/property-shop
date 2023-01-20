import React from "react";
import ProductCard from "../ProductCard";
import ProductCardLoader from "../ProductCard/ProductCardLoader";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectProducts } from "../../store/products/selectors";

const ProductsCardsList: React.FC = () => {
    const { list, isLoading } = useAppSelector(selectProducts);

    return (
        <div className="cards-wrapper">
            {isLoading &&
                [...new Array(6)].map((_, index) => (
                    <ProductCardLoader key={index} />
                ))}
            {!isLoading &&
                list.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
        </div>
    );
};

export default ProductsCardsList;
