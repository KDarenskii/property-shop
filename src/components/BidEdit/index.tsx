import React from 'react'
import { BID_TYPES } from '../../constants/bidTypes'
import { IBid, IBookingBid } from '../../models/bid'
import BookingBidEditForm from './BookingBidEditForm'
import ViewingBidEditForm from './ViewingBidEditForm'

type BidEditProps = IBid | IBookingBid;

const BidEdit: React.FC<BidEditProps> = (bid) => {
    return (
        <>
            {bid.type === BID_TYPES.BOOKING && <BookingBidEditForm {...(bid as IBookingBid)} />}
            {bid.type === BID_TYPES.VIEWING && <ViewingBidEditForm {...bid} />}
        </>
    )
}

export default BidEdit