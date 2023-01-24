import React from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectProductsInfo } from "../../store/products/selectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchProductsInfo } from "../../store/products/thunks/fetchProductsInfo";
import Complexes from "./Complexes";
import Rooms from "./Rooms";
import Square from "./Square";
import Prices from "./Prices";
import Alert from "../Alert";
import ClipLoader from "react-spinners/ClipLoader";
import { ALERT_TYPES } from "../../constants/alertTypes";
import Collapsible from 'react-collapsible';
import FilterResetButton from "./FilterResetButton";
import CircleLoader from "../CircleLoader";

import "./styles.scss";

const Filter: React.FC = React.memo(() => {

    const productsInfo = useAppSelector(selectProductsInfo);
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        setIsLoading(true);
        dispatch(fetchProductsInfo())
            .unwrap()
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
    }, [dispatch]);

    return (
        <section className="filter">
            <h3 className="visually-hidden">Фильтр</h3>
            {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
            {isLoading && (
                <div className="filter__loader-wrapper">
                    <CircleLoader />
                </div>
            )}
            {!error && !isLoading && (
                <Collapsible 
                    trigger="Фильтр"
                    open={true}
                    transitionTime={200}
                    easing={'ease-in-out'}
                    classParentString={'collabsible-filter'}
                >
                    <div className="filter__wrapper">
                        <div className="filter__controls">
                            <Complexes complexNames={productsInfo.complexNames}/>
                            <Rooms rooms={productsInfo.roomValues} />
                            <Square squareMin={productsInfo.squareMin} squareMax={productsInfo.squareMax} />
                            <Prices priceMin={productsInfo.priceMin} priceMax={productsInfo.priceMax} />
                        </div>
                        <FilterResetButton />
                    </div>
                </Collapsible>
            )}
        </section>
    );
});

export default Filter;
