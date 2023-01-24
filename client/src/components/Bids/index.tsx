import React from "react";
import BidsTable from "../BidsTable";
import BidsFilter from "../BidsFilter";
import MainTitle from "../MainTitle";

import "./styles.scss";

const Bids: React.FC = () => {
    return (
        <section className="bids">
            <div className="bids__content">
                <MainTitle text={'Все заявки'} className={'bids__title'} />
                <BidsFilter />
                <BidsTable />
            </div>
        </section>
    );
};

export default Bids;
