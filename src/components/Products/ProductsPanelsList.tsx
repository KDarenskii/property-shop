import React from "react";
import ProductPanel from "../ProductPanel";
import PanelLoader from "../ProductPanel/PanelLoader";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectProducts } from "../../store/products/selectors";

const ProductsPanelsList: React.FC = () => {
    const { isLoading, list } = useAppSelector(selectProducts);

    return (
        <>
            {isLoading && [...new Array(4)].map((_, index) => <PanelLoader key={index} />)}
            {!isLoading && list.map((product) => <ProductPanel key={product.id} {...product} />)}
        </>
    );
};

export default ProductsPanelsList;
