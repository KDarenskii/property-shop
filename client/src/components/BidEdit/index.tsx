import React from "react";
import { BID_TYPE } from "../../constants/bidType";
import { IBid, IBookingBid } from "../../models/bid";
import BookingBidEditForm from "./BookingBidEditForm";
import ViewingBidEditForm from "./ViewingBidEditForm";

type BidEditProps = IBid | IBookingBid;

const BidEdit: React.FC<BidEditProps> = (bid) => {
    return (
        <>
            {bid.type === BID_TYPE.BOOKING && <BookingBidEditForm {...(bid as IBookingBid)} />}
            {bid.type === BID_TYPE.VIEWING && <ViewingBidEditForm {...bid} />}
        </>
    );
};

export default BidEdit;
