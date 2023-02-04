import React from "react";
import Pagination from "../Pagination";
import PanelFilter from "../PanelFilter";
import ProductCardLoader from "../ProductCard/ProductCardLoader";
import ProductCard from "../ProductCard";
import PanelLoader from "../ProductPanel/PanelLoader";
import ProductPanel from "../ProductPanel";
import ViewOptions from "../ViewOptions";
import Alert from "../Alert";
import Filter from "../Filter";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {  selectListView, selectProducts } from "../../store/products/selectors";
import { fetchProducts } from "../../store/products/thunks/fetchProducts";
import { useSearchParams } from "react-router-dom";
import { ALERT } from "../../constants/alertTypes";
import CardsWrapper from "../CardsWrapper";
import MainTitle from "../MainTitle";

import "./styles.scss";

const Products: React.FC = () => {

    const listView = useAppSelector(selectListView);
    const { list, isLoading, error, totalCount, limit } = useAppSelector(selectProducts);

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const totalPages = Math.ceil(Number(totalCount) / limit);

    React.useEffect(() => {
        if (!searchParams.has("_page")) {
            searchParams.set("_page", "1");
        }
    }, [searchParams]);

    React.useEffect(() => {
        dispatch(fetchProducts({ query: searchParams.toString(), limit }));
    }, [dispatch, searchParams, limit]);

    return (
        <>
            <div className="products">
                <MainTitle text={'Выбор квартир'} className={'products__title'} />
                <Filter />
                <ViewOptions />
                <div className="products__list">
                    {error && <Alert type={ALERT.ERROR} message={error} />}
                    {!error && (
                        <>
                            {listView === "cards" 
                                ? (
                                    <CardsWrapper>
                                        {isLoading && [...new Array(6)].map((_, index) => <ProductCardLoader key={index} />)}
                                        {!isLoading && list.map((product) => <ProductCard key={product.id} {...product} />)}
                                    </CardsWrapper>
                                )
                                : (
                                    <>
                                        <PanelFilter />
                                        {isLoading && [...new Array(4)].map((_, index) => <PanelLoader key={index} className={'products__panel-loader'} />)}
                                        {!isLoading && list.map((product) => <ProductPanel key={product.id} {...product} />)}
                                    </>
                                )
                            }
                        </>
                    )}
                </div>
                {!isLoading && (
                    <>
                        {totalPages > 1 && <Pagination limit={limit} totalPages={totalPages} />}
                        {totalPages < 1 && !error && <Alert type={ALERT.INFO} message={ "К сожалению, подходящих товаров нет в наличии." } />}
                    </>
                )}
            </div>
        </>
    );
};

export default Products;
