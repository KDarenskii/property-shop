import React from "react";
import { IBid, IBookingBid } from "../../models/bid";
import { useNavigate } from "react-router-dom";
import { useParseISO } from "../../hooks/useParseISO";

import './styles.scss';

const bageStatuses = {
    'Новая': 'new',
    'В работе': 'inwork',
    'Завершенная': 'completed'
}

const TableBid: React.FC<IBookingBid | IBid> = (bid) => {

    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate(`/bid/${bid.id}`)} className="table-bid">
            <td className="table-bid__td" data-label="ID">{bid.id}</td>
            <td className="table-bid__td" data-label="Дата">{useParseISO(bid.date).day}</td>
            <td className="table-bid__td" data-label="Услуга">{bid.type}</td>
            <td className="table-bid__td" data-label="Имя"><p>{bid.firstName} {bid.lastName}</p></td>
            <td className="table-bid__td" data-label="Email">{bid.email}</td>
            <td className="table-bid__td" data-label="Телефон">{bid.phone}</td>
            <td className="table-bid__td" data-label="Статус">
                <span className={`bids-status bids-status--${bageStatuses[bid.status]}`}>{bid.status}</span>
            </td>
        </tr>
    );
};

export default TableBid;