import React from "react";
import Favourites from "../components/Favourites";

const FavouritesPage: React.FC = () => {
    return (
        <main className="main">
            <div className="container">
                <Favourites />
            </div>
        </main>
    )
};

export default FavouritesPage;
