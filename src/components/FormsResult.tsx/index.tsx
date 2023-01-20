import React from "react";
import { HOME_ROUTE } from "../../constants/routesPathNames";
import { Link } from "react-router-dom";
import { BookingResult } from "../Booking";
import { HTTP_STATUS } from "../../constants/httpStatuses";

import "./styles.scss";

const FormsResult: React.FC<BookingResult> = ({ status, message }) => {
    const isSuccess = status === HTTP_STATUS.RESOLVED;

    return (
        <section className="forms-result">
            <div className={`forms-result__content ${!isSuccess ? "forms-result__content--error" : ""}`}>
                {isSuccess ? (
                    <>
                        <img className="forms-result__img" src="/img/icons/success-icon.png" alt="Success"/>
                        <p className="forms-result__text">{message}</p>
                        <p className="forms-result__text">Наши сотрудники через некоторое время с вами свяжутся.</p>
                    </>
                ) : (
                    <>
                        <img className="forms-result__img" src="/img/icons/error-icon.png" alt="Error"/>
                        <p className="forms-result__text">{message}</p>
                        <p className="forms-result__text">Попробуйте снова через некоторое время.</p>
                    </>
                )}
                <Link to={HOME_ROUTE} className="forms-result__btn button-order button-order--small">
                    На главную
                </Link>
            </div>
        </section>
    );
};

export default FormsResult;
