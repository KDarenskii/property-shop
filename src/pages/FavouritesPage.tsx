import React from "react";
import Container from "../components/Container";
import Favourites from "../components/Favourites";

const FavouritesPage: React.FC = () => {
    return (
        <main className="main">
            <Container>
                <Favourites />
            </Container>
        </main>
    )
};

export default FavouritesPage;
