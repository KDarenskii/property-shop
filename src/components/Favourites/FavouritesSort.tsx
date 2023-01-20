import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectFavouritesLength } from "../../store/favourites/selectors";
import Sort from "../Sort";

const FavouritesSort: React.FC = () => {
    const favLength = useAppSelector(selectFavouritesLength);

    return (
        <>
            {favLength > 0 && (
                <div className="view-options-wrapper">
                    <div className="container p-0">
                        <div className="view-options">
                            <Sort />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FavouritesSort;
