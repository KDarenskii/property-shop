import React from "react";
import { BID_TYPES } from "../../constants/bidTypes";
import { IBid, IBookingBid } from "../../models/bid";
import BookingBid from "./BookingBid";
import ViewingBid from "./ViewingBid";

type FullBidProps = IBid | IBookingBid;

const FullBid: React.FC<FullBidProps> = (bid) => {
    return (
        <>
            {bid.type === BID_TYPES.BOOKING && <BookingBid {...(bid as IBookingBid)} />}
            {bid.type === BID_TYPES.VIEWING && <ViewingBid {...bid} />}
        </>
    );
};

export default FullBid;
