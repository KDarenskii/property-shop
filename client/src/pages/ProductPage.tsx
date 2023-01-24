import React from "react";
import Container from "../components/Container";
import SingleProduct from "../components/FullProduct";

const ProductPage: React.FC = () => {
    return (
        <main className="main">
            <Container>
                <SingleProduct />
            </Container>
        </main>
    )
};

export default ProductPage;
