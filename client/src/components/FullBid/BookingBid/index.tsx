import React from "react";
import { IBookingBid } from "../../../models/bid";
import { BID_STATUS_VALUES } from "../../../constants/bidStatuse";
import { BID_TYPE_VALUE } from "../../../constants/bidType";
import { parseISO } from "../../../utils/parseISO";
import BidInfoRaw from "../BidInfoRaw";
import { formatDate } from "../../../utils/formatDate";

import "./styles.scss";

const BookingBid: React.FC<IBookingBid> = (bid) => {
    
    const parsedDate = parseISO(bid.date);

    return (
        <>
            <BidInfoRaw rawClassName="booking-bid-raw" rawName={"ID:"} rawValue={`Заявка №${bid.id}`} />
            <BidInfoRaw rawClassName="booking-bid-raw" rawName={"Дата создания:"} rawValue={`${parsedDate.day} ${parsedDate.time}`} />
            <BidInfoRaw rawClassName="booking-bid-raw" rawName={"Услуга:"} rawValue={BID_TYPE_VALUE[bid.type]} />
            <BidInfoRaw rawClassName="booking-bid-raw" rawName={"Имя:"} rawValue={bid.firstName} />
            <BidInfoRaw rawClassName="booking-bid-raw" rawName={"Фамилия:"} rawValue={bid.lastName} />
            <BidInfoRaw rawClassName="booking-bid-raw" rawName={"Email:"} rawValue={bid.email} />
            <BidInfoRaw rawClassName="booking-bid-raw" rawName={"Телефон:"} rawValue={bid.phone} />
            <BidInfoRaw rawClassName="booking-bid-raw" rawName={"Дата рождения:"} rawValue={formatDate(bid.birthdate)} />
            <BidInfoRaw rawClassName="booking-bid-raw" rawName={"Статус заявки:"} rawValue={BID_STATUS_VALUES[bid.status]} />
            <BidInfoRaw rawClassName="booking-bid-raw" rawName={"Сообщение:"} rawValue={bid.comment} />
        </>
    );
};

export default BookingBid;
