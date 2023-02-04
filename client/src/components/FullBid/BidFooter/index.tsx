import React from 'react'

import "./styles.scss";

type BidFooterProps = {
    children: React.ReactNode;
}

const BidFooter: React.FC<BidFooterProps> = ({ children }) => {
    return (
        <footer className="bid-footer">
            {children}
        </footer>
    )
}

export default BidFooter