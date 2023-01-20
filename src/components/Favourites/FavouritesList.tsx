import React from "react";
import ProductCard from "../ProductCard";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectFavourites } from "../../store/favourites/selectors";
import Alert from "../Alert";
import { ALERT_TYPES } from "../../constants/alertTypes";

const FavouritesList: React.FC = () => {
    
    const { list, error } = useAppSelector(selectFavourites);

    return (
        <div className="cards-wrapper">
            {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
            {!error &&
                (list.length > 0 
                    ? list.map((favItem) => <ProductCard key={favItem.id} {...favItem} />)
                    : <Alert type={ALERT_TYPES.INFO} message={"К сожалению, вы не добавили ни одного товара в избранное."}/>
                )
            }
        </div>
    );
};

export default FavouritesList;
