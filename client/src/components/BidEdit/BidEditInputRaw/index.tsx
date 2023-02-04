import React from "react";
import cn from "classnames";

import "./styles.scss";

type BidEditInputRawProps = {
    labelText: string;
    htmlFor: string;
    children: React.ReactNode;
    rawClassName?: string;
};

const BidEditInputRaw: React.FC<BidEditInputRawProps> = ({ labelText, htmlFor, rawClassName, children }) => {
    return (
        <div className={cn("bid-edit-input-raw", rawClassName)}>
            <label className="bid-edit-input-raw__name" htmlFor={htmlFor}>
                {labelText}
            </label>
            <div className="bid-edit-input-raw__wrapper">{children}</div>
        </div>
    );
};

export default BidEditInputRaw;
