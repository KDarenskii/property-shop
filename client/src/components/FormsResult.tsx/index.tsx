import React from "react";
import { HOME_ROUTE } from "../../constants/routesPathNames";
import { BookingResult } from "../Booking";
import { HTTP_STATUS } from "../../constants/httpStatuses";
import ActionButton from "../Buttons/ActionButton";
import successIconSrc from "../../assets/img/icons/success-icon.png";
import errorIconSrc from '../../assets/img/icons/error-icon.png';

import "./styles.scss";

const FormsResult: React.FC<BookingResult> = ({ status, message }) => {

    const isSuccess = status === HTTP_STATUS.RESOLVED;

    return (
        <section className="forms-result">
            <div className={`forms-result__content ${!isSuccess ? "forms-result__content--error" : ""}`}>
                {isSuccess ? (
                    <>
                        <img className="forms-result__img" src={successIconSrc} alt="Success"/>
                        <p className="forms-result__text">{message}</p>
                        <p className="forms-result__text">Наши сотрудники через некоторое время с вами свяжутся.</p>
                    </>
                ) : (
                    <>
                        <img className="forms-result__img" src={errorIconSrc} alt="Error"/>
                        <p className="forms-result__text">{message}</p>
                        <p className="forms-result__text">Попробуйте снова через некоторое время.</p>
                    </>
                )}
                <ActionButton to={HOME_ROUTE} text={'На главную'} color={'blue'} className={'forms-result__btn'} />
            </div>
        </section>
    );
};

export default FormsResult;
