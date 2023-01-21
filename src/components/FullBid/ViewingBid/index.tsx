import React from "react";
import { BID_EDIT_ROUTE } from "../../../constants/routesPathNames";
import { useParseISO } from "../../../hooks/useParseISO";
import { IBid } from "../../../models/bid";
import ActionButton from "../../Buttons/ActionButton";
import DeleteBidButton from "../DeleteBidButton";

import "./styles.scss";

const ViewingBid: React.FC<IBid> = (bid) => {

    const parsedDate = useParseISO(bid.date);

    return (
        <article className="viewing-bid">
            <div className="viewing-bid__item">
                <div className="viewing-bid__item-name">ID:</div>
                <div className="viewing-bid__item-value">Заявка №{bid.id}</div>
            </div>
            <div className="viewing-bid__item">
                <div className="viewing-bid__item-name">Дата создания:</div>
                <div className="viewing-bid__item-value">{parsedDate.day} {parsedDate.time}</div>
            </div>
            <div className="viewing-bid__item">
                <div className="viewing-bid__item-name">Услуга:</div>
                <div className="viewing-bid__item-value">{bid.type}</div>
            </div>
            <div className="viewing-bid__item">
                <div className="viewing-bid__item-name">Имя:</div>
                <div className="viewing-bid__item-value">{bid.firstName}</div>
            </div>
            <div className="viewing-bid__item">
                <div className="viewing-bid__item-name">Фамилия:</div>
                <div className="viewing-bid__item-value">{bid.lastName}</div>
            </div>
            <div className="viewing-bid__item">
                <div className="viewing-bid__item-name">Email:</div>
                <div className="viewing-bid__item-value">{bid.email}</div>
            </div>
            <div className="viewing-bid__item">
                <div className="viewing-bid__item-name">Телефон:</div>
                <div className="viewing-bid__item-value">{bid.phone}</div>
            </div>
            <div className="viewing-bid__item">
                <div className="viewing-bid__item-name">Статус заявки:</div>
                <div className="viewing-bid__item-value">{bid.status}</div>
            </div>
            <div className="viewing-bid__actions">
                <ActionButton
                    color={"blue"}
                    text={"Редактировать"}
                    to={BID_EDIT_ROUTE}
                />
                <DeleteBidButton id={bid.id as string} />
            </div>
        </article>
    );
};

export default ViewingBid;
