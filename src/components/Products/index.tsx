import React from "react";
import Panel from "../Panel";
import ProductsCardsList from "./ProductsCardsList";
import ViewOptions from "../ViewOptions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectProductsError, selectListView, selectProductsTotalCount } from "../../store/products/selectors";
import { fetchProducts } from "../../store/products/thunks/fetchProducts";
import Alert from "../Alert";
import { useSearchParams } from "react-router-dom";
import Filter from "../Filter";
import { ALERT_TYPES } from "../../constants/alertTypes";
import Pagination from "../Pagination";
import { selectFavoritesIsLoading } from "../../store/favourites/selectors";

import "./styles.scss";

const Products: React.FC = () => {

    const listView = useAppSelector(selectListView);
    const error = useAppSelector(selectProductsError);
    const totalCount = useAppSelector(selectProductsTotalCount);
    const isLoading = useAppSelector(selectFavoritesIsLoading);

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const limit: number = 6;
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
                <h2 className="main-title main-title--mb">Выбор квартир:</h2>
                <Filter />
                <ViewOptions />
                <div className="products__list">
                    {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
                    {!error && (
                        <>
                            {listView === "cards" 
                                ?<ProductsCardsList />
                                : <Panel />
                            }
                        </>
                    )}
                </div>
                {totalPages > 1 && !isLoading && <Pagination limit={limit} totalPages={totalPages} />}
                {totalPages < 1 && <Alert type={ALERT_TYPES.INFO} message={ "К сожалению, подходящих товаров нет в наличии." } />}
            </div>
        </>
    );
};

export default Products;
