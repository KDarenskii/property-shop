import React from "react";
import { useNavigate } from "react-router-dom";
import { BID_TYPE } from "../../constants/bidType";
import { IBid, IBookingBid } from "../../models/bid";
import BookingBid from "./BookingBid";
import ViewingBid from "./ViewingBid";
import ActionButton from "../Buttons/ActionButton";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { deleteBid } from "../../store/bids/thunks/deleteBid";
import { showNotion } from "../../utils/showNotion";
import { NOTION } from "../../constants/notion";
import BidFooter from "./BidFooter";

type FullBidProps = IBid | IBookingBid;

const FullBid: React.FC<FullBidProps> = (bid) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleDeleteBid = async () => {
        setIsSubmitting(true);
        try {
            const response = await dispatch(deleteBid(bid.id as string)).unwrap();
            showNotion(NOTION.SUCCESS, response.message);
            navigate(-1);
        } catch (error) {
            const err = error as any;
            showNotion(NOTION.ERROR, err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {bid.type === BID_TYPE.BOOKING && <BookingBid {...(bid as IBookingBid)} />}
            {bid.type === BID_TYPE.VIEWING && <ViewingBid {...bid} />}
            <BidFooter>
                <ActionButton to={`/property-shop/bid/${bid.id}/edit`} color={"blue"} text={"Редактировать"} />
                <ActionButton onClick={handleDeleteBid} disabled={isSubmitting} color={"red"} text={"Удалить"} />
            </BidFooter>
        </>
    );
};

export default FullBid;