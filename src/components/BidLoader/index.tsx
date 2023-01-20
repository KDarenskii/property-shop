import React from 'react';
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import './styles.scss';

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderWidth: "3px",
};

const BidLoader: React.FC = () => {
    return (
        <div className='bid-loader'>
            <ClipLoader
                loading={true}
                cssOverride={override}
                color={"#dc0909"}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                speedMultiplier={0.6}
            />
        </div>
    )
}

export default BidLoader;