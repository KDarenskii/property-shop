import React from "react";
import PanelFilter from "../PanelFilter";
import ProductsPanelsList from "../Products/ProductsPanelsList";

const Panel: React.FC = () => {
    return (
        <>
            <PanelFilter />
            <ProductsPanelsList />
        </>
    );
};

export default Panel;
