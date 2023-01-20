import React from "react";
import { IBookingBid } from "../../models/bid";
import { Link } from "react-router-dom";
import { BID_EDIT_ROUTE } from "../../constants/routesPathNames";
import DeleteBidButton from "../DeleteBidButton";
import { useParseISO } from "../../hooks/useParseISO";

import "./styles.scss";

const BookingBid: React.FC<IBookingBid> = (bid) => {
    
    const parsedDate = useParseISO(bid.date);

    return (
        <div className="booking-bid">
            <div className="booking-bid__item">
                <div className="booking-bid__item-name">ID:</div>
                <div className="booking-bid__item-value">Заявка №{bid.id}</div>
            </div>
            <div className="booking-bid__item">
                <div className="booking-bid__item-name">Дата создания:</div>
                <div className="booking-bid__item-value">
                    {parsedDate.day} {parsedDate.time}
                </div>
            </div>
            <div className="booking-bid__item">
                <div className="booking-bid__item-name">Услуга:</div>
                <div className="booking-bid__item-value">{bid.type}</div>
            </div>
            <div className="booking-bid__item">
                <div className="booking-bid__item-name">Имя:</div>
                <div className="booking-bid__item-value">{bid.firstName}</div>
            </div>
            <div className="booking-bid__item">
                <div className="booking-bid__item-name">Фамилия:</div>
                <div className="booking-bid__item-value">{bid.lastName}</div>
            </div>
            <div className="booking-bid__item">
                <div className="booking-bid__item-name">Email:</div>
                <div className="booking-bid__item-value">{bid.email}</div>
            </div>
            <div className="booking-bid__item">
                <div className="booking-bid__item-name">Телефон:</div>
                <div className="booking-bid__item-value">{bid.phone}</div>
            </div>
            <div className="booking-bid__item">
                <div className="booking-bid__item-name">Дата рождения:</div>
                <div className="booking-bid__item-value">{bid.birthdate}</div>
            </div>
            <div className="booking-bid__item">
                <div className="booking-bid__item-name">Статус заявки:</div>
                <div className="booking-bid__item-value">{bid.status}</div>
            </div>
            <div className="booking-bid__item">
                <div className="booking-bid__item-name">Сообщение:</div>
                <div className="booking-bid__item-value">{bid.comment}</div>
            </div>
            <div className="booking-bid__actions">
                <Link to={BID_EDIT_ROUTE} className="button-action button-action--blue">
                    Редактировать
                </Link>
                <DeleteBidButton id={bid.id as string} />
            </div>
        </div>
    );
};

export default BookingBid;
