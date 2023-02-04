import React from "react";
import { IBid, IBookingBid } from "../../models/bid";
import { useNavigate } from "react-router-dom";
import Badge from "../Badge";
import { BADGE, BADGE_VALUE } from "../../constants/badge";
import { BID_TYPE_VALUE } from "../../constants/bidType";
import { parseISO } from "../../utils/parseISO";

import "./styles.scss";

const TableBid: React.FC<IBookingBid | IBid> = (bid) => {
    const navigate = useNavigate();
    return (
        <tr onClick={() => navigate(`/property-shop/bid/${bid.id}`)} className="table-bid">
            <td className="table-bid__td" data-label="ID">
                {bid.id}
            </td>
            <td className="table-bid__td" data-label="Дата">
                {parseISO(bid.date).day}
            </td>
            <td className="table-bid__td" data-label="Услуга">
                {BID_TYPE_VALUE[bid.type]}
            </td>
            <td className="table-bid__td" data-label="Имя">
                <p>
                    {bid.firstName} {bid.lastName}
                </p>
            </td>
            <td className="table-bid__td" data-label="Email">
                {bid.email}
            </td>
            <td className="table-bid__td" data-label="Телефон">
                {bid.phone}
            </td>
            <td className="table-bid__td" data-label="Статус">
                <Badge type={BADGE[bid.status]} text={BADGE_VALUE[bid.status]} />
            </td>
        </tr>
    );
};

export default TableBid;
