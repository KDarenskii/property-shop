import React from "react";
import cn from "classnames";

import "./styles.scss";

type BidEditRawProps = {
    rawName: string;
    rawValue: string;
    rawClassName?: string;
}

const BidInfoRaw: React.FC<BidEditRawProps> = ({ rawName, rawValue, rawClassName }) => {
    return (
        <div className={cn('bid-info-raw', rawClassName)}>
            <div className="bid-info-raw__name">{rawName}</div>
            <div className="bid-info-raw__value">{rawValue}</div>
        </div>
    )
};

export default BidInfoRaw;
