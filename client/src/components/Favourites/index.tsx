import React from "react";
import { ALERT } from "../../constants/alertTypes";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectFavourites } from "../../store/favourites/selectors";
import Alert from "../Alert";
import CardsWrapper from "../CardsWrapper";
import MainTitle from "../MainTitle";
import PageLoader from "../PageLoader";
import ProductCard from "../ProductCard";

import "./styles.scss";

const Favourites: React.FC = () => {
    const { list, error, isLoading } = useAppSelector(selectFavourites);

    if (isLoading) return <PageLoader />;

    return (
        <section className="favourites">
            <MainTitle text={"Избранное"} className={"favourites__title"} />
            <CardsWrapper>
                {error && <Alert type={ALERT.ERROR} message={error} />}
                {!error &&
                    (list.length > 0 ? (
                        list.map((favItem) => <ProductCard key={favItem.id} {...favItem} />)
                    ) : (
                        <Alert
                            type={ALERT.INFO}
                            message={"К сожалению, вы не добавили ни одного товара в избранное."}
                        />
                    ))}
            </CardsWrapper>
        </section>
    );
};

export default Favourites;
