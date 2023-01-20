import React from "react";
import Bids from "../components/Bids";

const BidsPage: React.FC = () => {
    return (
        <main className="main">
            <div className="container container--fluid">
                <Bids />
            </div>
        </main>
    )
};

export default BidsPage;
