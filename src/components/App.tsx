import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { LOGIN_ROUTE, SIGN_UP_ROUTE, BIDS_ROUTE, FAVOURITES_ROUTE, PRODUCT_ROUTE, BID_ROUTE, HOME_ROUTE, BID_EDIT_ROUTE, RESET_PASSWORD_ROUTE,
} from "../constants/routesPathNames";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import BidLayout from "../layouts/BidLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import PageLoader from "./PageLoader";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchFavourites } from "../store/favourites/thunks/fetchFavourites";
import { useAppSelector } from "../hooks/useAppSelector";
import { selectFavoritesIsLoading } from "../store/favourites/selectors";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../store/user/userSlice";

const Product = lazy(() => import(/*webpackChunkName: Product*/'../pages/ProductPage'));
const Favourites = lazy(() => import(/*webpackChunkName: Favourites*/'../pages/FavouritesPage'));
const Bids = lazy(() => import(/*webpackChunkName: Bids*/'../pages/BidsPage'));
const Bid = lazy(() => import(/*webpackChunkName: Bid*/'../pages/BidPage'));
const BidEdit = lazy(() => import(/*webpackChunkName: BidEdit*/'../pages/BidEditPage'));


const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const isFavoritesLoading = useAppSelector(selectFavoritesIsLoading);
    const [isUserLoading, setIsUserLoading] = React.useState(true);
    const [isAppLoading, setIsAppLoading] = React.useState(true);

    React.useEffect(() => {
        if (!isFavoritesLoading && !isUserLoading) setIsAppLoading(false);
    }, [isFavoritesLoading, isUserLoading]);

    React.useEffect(() => {
        dispatch(fetchFavourites());

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch(
                setUser({
                    email: user?.email ?? null,
                    uid: user?.uid ?? null,
                })
            );
            setIsUserLoading(false);
        });
        return unsubscribe;
    }, [dispatch]);

    if (isAppLoading) return <PageLoader />;

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path={HOME_ROUTE} element={<MainLayout />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path={PRODUCT_ROUTE} element={<Product />}></Route>
                    <Route path={FAVOURITES_ROUTE} element={<Favourites />}></Route>
                    <Route path={BIDS_ROUTE} element={<Bids />}></Route>
                    <Route path={BID_ROUTE} element={<BidLayout />}>
                        <Route index element={<Bid />}></Route>
                        <Route path={BID_EDIT_ROUTE} element={<BidEdit />}></Route>
                    </Route>
                    <Route element={<AuthLayout />}>
                        <Route path={LOGIN_ROUTE} element={<LoginPage />}></Route>
                        <Route path={RESET_PASSWORD_ROUTE} element={<ResetPasswordPage />}></Route>
                        <Route path={SIGN_UP_ROUTE} element={<SignUpPage />}></Route>
                    </Route>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
