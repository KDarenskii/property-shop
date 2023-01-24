import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { LOGIN_ROUTE, SIGN_UP_ROUTE, BIDS_ROUTE, FAVOURITES_ROUTE, PRODUCT_ROUTE, BID_ROUTE, HOME_ROUTE, BID_EDIT_ROUTE, UNAUTHORIZED_ROUTE } from "../constants/routesPathNames";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import BidLayout from "../layouts/BidLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import PageLoader from "./PageLoader";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedPage from "../pages/UnauthorizedPage";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchFavourites } from "../store/favourites/thunks/fetchFavourites";
import { setIsAuth } from "../store/user/userSlice";
import { refreshUser } from "../store/user/thunks/refreshUser";
import { Roles } from "../constants/Roles";

const Product = lazy(() => import(/*webpackChunkName: "Product"*/ "../pages/ProductPage"));
const Favourites = lazy(() => import(/*webpackChunkName: "Favourites"*/ "../pages/FavouritesPage"));
const Bids = lazy(() => import(/*webpackChunkName: "Bids"*/ "../pages/BidsPage"));
const Bid = lazy(() => import(/*webpackChunkName: "Bid"*/ "../pages/BidPage"));
const BidEdit = lazy(() => import(/*webpackChunkName: "BidEdit"*/ "../pages/BidEditPage"));

const App: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const [isAppLoading, setIsAppLoading] = React.useState(true);

    React.useEffect(() => {
        const checkAuth = async () => {
            setIsAppLoading(true);

            const token = localStorage.getItem('token');

            if (token) {
                try {
                    await dispatch(refreshUser()).unwrap();
                    dispatch(setIsAuth(true));
                    await dispatch(fetchFavourites());
                } catch (error) {
                    dispatch(setIsAuth(false));
                }
            } else {
                setIsAuth(false);
            }
            setIsAppLoading(false);
        }  
        checkAuth();
    }, []);

    if (isAppLoading) return <PageLoader />;

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path={UNAUTHORIZED_ROUTE} element={<UnauthorizedPage />}></Route>
                <Route path={HOME_ROUTE} element={<MainLayout />}>

                    {/* --------------- PUBLIC ROUTES ------------------- */}
                    <Route index element={<HomePage />}></Route>
                    <Route path={PRODUCT_ROUTE} element={<Product />}></Route>
                    <Route element={<AuthLayout />}>
                        <Route path={LOGIN_ROUTE} element={<LoginPage />}></Route>
                        <Route path={SIGN_UP_ROUTE} element={<SignUpPage />}></Route>
                    </Route>

                    {/* --------------- PROTECTED USER ROUTES ----------------- */}
                    <Route element={<ProtectedRoute allowedRoles={[Roles.User]} />}>
                        <Route path={FAVOURITES_ROUTE} element={<Favourites />}></Route>
                    </Route>

                    {/* --------------- PROTECTED ADMIN ROUTES ----------------- */}
                    <Route element={<ProtectedRoute allowedRoles={[Roles.Admin]} />}>
                        <Route path={BIDS_ROUTE} element={<Bids />}></Route>
                        <Route path={BID_ROUTE} element={<BidLayout />}>
                            <Route index element={<Bid />}></Route>
                            <Route path={BID_EDIT_ROUTE} element={<BidEdit />}></Route>
                        </Route>
                    </Route>
                    
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
