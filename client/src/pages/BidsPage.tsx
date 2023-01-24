import React from "react";
import Bids from "../components/Bids";
import Container from "../components/Container";

const BidsPage: React.FC = () => {
    return (
        <main className="main">
            <Container type={'fluid'}>
                <Bids />
            </Container>
        </main>
    )
};

export default BidsPage;
