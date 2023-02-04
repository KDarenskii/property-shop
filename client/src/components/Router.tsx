import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {
    LOGIN_ROUTE,
    SIGN_UP_ROUTE,
    BIDS_ROUTE,
    FAVOURITES_ROUTE,
    PRODUCT_ROUTE,
    BID_ROUTE,
    HOME_ROUTE,
    BID_EDIT_ROUTE,
    UNAUTHORIZED_ROUTE,
    MISSING_ROUTE,
} from "../constants/routesPathNames";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import BidLayout from "../layouts/BidLayout";
import SignUpPage from "../pages/SignUpPage";
import PageLoader from "./PageLoader";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import MissingPage from "../pages/MissingPage";
import { ROLES } from "../constants/roles";


const Product = lazy(() => import(/*webpackChunkName: "Product"*/ "../pages/ProductPage"));
const Favourites = lazy(() => import(/*webpackChunkName: "Favourites"*/ "../pages/FavouritesPage"));
const Bids = lazy(() => import(/*webpackChunkName: "Bids"*/ "../pages/BidsPage"));
const Bid = lazy(() => import(/*webpackChunkName: "Bid"*/ "../pages/BidPage"));
const BidEdit = lazy(() => import(/*webpackChunkName: "BidEdit"*/ "../pages/BidEditPage"));

const Router: React.FC = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path={UNAUTHORIZED_ROUTE} element={<UnauthorizedPage />} />

                <Route path={HOME_ROUTE} element={<MainLayout />}>
                    {/* --------------- PUBLIC ROUTES ------------------- */}
                    <Route index element={<HomePage />} />
                    <Route path={PRODUCT_ROUTE} element={<Product />} />
                    <Route element={<AuthLayout />}>
                        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
                        <Route path={SIGN_UP_ROUTE} element={<SignUpPage />} />
                    </Route>

                    {/* --------------- AUTH USER ROUTES ----------------- */}
                    <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
                        <Route path={FAVOURITES_ROUTE} element={<Favourites />} />
                    </Route>

                    {/* --------------- PROTECTED ADMIN ROUTES ----------------- */}
                    <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
                        <Route path={BIDS_ROUTE} element={<Bids />} />
                        <Route path={BID_ROUTE} element={<BidLayout />}>
                            <Route index element={<Bid />} />
                            <Route path={BID_EDIT_ROUTE} element={<BidEdit />} />
                        </Route>
                    </Route>
                </Route>
                <Route path={MISSING_ROUTE} element={<MissingPage />} />
            </Routes>
        </Suspense>
    );
};

export default Router;
