import React from "react";
import { IBid } from "../../../models/bid";
import { BID_STATUS_VALUES } from "../../../constants/bidStatuse";
import { BID_TYPE_VALUE } from "../../../constants/bidType";
import { parseISO } from "../../../utils/parseISO";
import BidInfoRaw from "../BidInfoRaw";

import "./styles.scss";

const ViewingBid: React.FC<IBid> = (bid) => {
    const parsedDate = parseISO(bid.date);
    return (
        <>
            <BidInfoRaw rawClassName="viewing-bid-raw" rawName={"ID:"} rawValue={`Заявка №${bid.id}`} />
            <BidInfoRaw
                rawClassName="viewing-bid-raw"
                rawName={"Дата создания:"}
                rawValue={`${parsedDate.day} ${parsedDate.time}`}
            />
            <BidInfoRaw rawClassName="viewing-bid-raw" rawName={"Услуга:"} rawValue={BID_TYPE_VALUE[bid.type]} />
            <BidInfoRaw rawClassName="viewing-bid-raw" rawName={"Имя:"} rawValue={bid.firstName} />
            <BidInfoRaw rawClassName="viewing-bid-raw" rawName={"Фамилия:"} rawValue={bid.lastName} />
            <BidInfoRaw rawClassName="viewing-bid-raw" rawName={"Email:"} rawValue={bid.email} />
            <BidInfoRaw rawClassName="viewing-bid-raw" rawName={"Телефон:"} rawValue={bid.phone} />
            <BidInfoRaw
                rawClassName="viewing-bid-raw"
                rawName={"Статус заявки:"}
                rawValue={BID_STATUS_VALUES[bid.status]}
            />
        </>
    );
};

export default ViewingBid;
