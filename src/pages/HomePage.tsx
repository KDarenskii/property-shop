import React from "react";
import Container from "../components/Container";
import Products from "../components/Products";

const HomePage: React.FC = () => {

    return (
        <>
            <main className="main">
                <Container>
                    <Products />
                </Container>
            </main>
        </>
    );
};

export default HomePage;
