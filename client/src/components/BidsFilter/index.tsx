import React from "react";
import BidsFilterStatuses from "./BidsFilterStatuses";
import BidsFilterTypes from "./BidsFilterTypes";

import "./styles.scss";

const BidsFilter: React.FC = () => {
    return (
        <div className="bids-filter">
            <BidsFilterStatuses />
            <BidsFilterTypes />
        </div>
    );
};

export default BidsFilter;
