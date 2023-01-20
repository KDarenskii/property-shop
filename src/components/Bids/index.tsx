import React from "react";
import BidsTable from "../BidsTable";
import BidsFilter from "../BidsFilter";

import "./styles.scss";

const Bids: React.FC = () => {
    return (
        <section className="bids">
            <div className="bids__content">
                <h2 className="main-title main-title--mb">Все заявки</h2>
                <BidsFilter />
                <BidsTable />
            </div>
        </section>
    );
};

export default Bids;
