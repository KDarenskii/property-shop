import React from "react";
import FavouritesList from "./FavouritesList";

import "./styles.scss";

const Favourites: React.FC = () => {
    return (
        <section className="favourites">
            <h2 className="main-title main-title--mb">Избранное:</h2>
            <FavouritesList />
        </section>
    );
};

export default Favourites;
