import React from "react";
import Products from "../components/Products";

const HomePage: React.FC = () => {

    return (
        <>
            <main className="main">
                <div className="container">
                    <Products />
                </div>
            </main>
        </>
    );
};

export default HomePage;
