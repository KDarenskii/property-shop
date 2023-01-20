import React from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import BidLoader from "../components/BidLoader";
import BookingBid from "../components/BookingBid";
import ViewingBid from "../components/ViewingBid";
import { ALERT_TYPES } from "../constants/alertTypes";
import { BID_TYPES } from "../constants/bidTypes";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { IBid, IBookingBid } from "../models/bid";
import { fetchBidById } from "../store/bids/thunks/fetchBidById";

const BidPage: React.FC = () => {
    const { id = "" } = useParams();

    const [bid, setBid] = React.useState<IBid | IBookingBid | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        setIsLoading(true);
        dispatch(fetchBidById(id))
            .unwrap()
            .then((data) => {
                setBid(data);
                setError(null);
            })
            .catch((error) => {
                setBid(null);
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }, [dispatch, id]);

    return (
        <>
            {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
            {isLoading && <BidLoader />}
            {!isLoading && bid && (
                <>
                    {bid.type === BID_TYPES.BOOKING && <BookingBid {...(bid as IBookingBid)} />}
                    {bid.type === BID_TYPES.VIEWING && <ViewingBid {...bid} />}
                </>
            )}
        </>
    );
};

export default BidPage;
