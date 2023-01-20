import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import PageLogo from "../components/PageLogo";

const MainLayout: React.FC = () => {
    return (
        <div className="content-wrapper">
            <Header />
            <PageLogo />
            <ToastContainer />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
