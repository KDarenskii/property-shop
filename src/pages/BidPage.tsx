import React from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import BidLoader from "../components/BidLoader";
import FullBid from "../components/FullBid";
import { ALERT_TYPES } from "../constants/alertTypes";
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
            {!isLoading && bid && <FullBid {...bid} />}
        </>
    );
};

export default BidPage;
