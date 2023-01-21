import React from "react";
import BidsTable from "../BidsTable";
import BidsFilter from "../BidsFilter";

import "./styles.scss";
import MainTitle from "../MainTitle";

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
