import React from "react";
import { HTTP_STATUS } from "../../constants/httpStatuses";
import * as Yup from "yup";
import { Formik } from "formik";
import { BID_STATUSES } from "../../constants/bidStatuses";
import { BID_TYPES } from "../../constants/bidTypes";
import { IBookingBid } from "../../models/bid";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { postBid } from "../../store/bids/thunks/postBid";
import { phoneRegExp } from "../../constants/regExp";
import { BookingResult } from "../Booking";

import "./styles.scss";

type BookingFormProps = {
    setResult: React.Dispatch<React.SetStateAction<BookingResult>>;
};

interface Values {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthdate: string;
    agreement: boolean;
    comment: string;
}

const BookingSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Минимальное количество символов: 2")
        .max(35, "Превышено максимальное количество символов")
        .required("Обязательное поле"),
    lastName: Yup.string()
        .min(2, "Минимальное количество символов: 2")
        .max(35, "Превышено максимальное количество символов")
        .required("Обязательное поле"),
    email: Yup.string()
        .email("Не корректный email")
        .required("Обязательное поле"),
    phone: Yup.string()
        .matches(phoneRegExp, "Не корректный номер телефона")
        .required("Обязательное поле"),
    birthdate: Yup.date().required("Обязательное поле"),
    agreement: Yup.boolean().oneOf([true], "Обязательное поле"),
});

const BookingForm: React.FC<BookingFormProps> = ({ setResult }) => {
    const dispatch = useAppDispatch();

    const initialState: Values = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthdate: "",
        comment: "",
        agreement: false,
    };

    return (
        <Formik
            initialValues={initialState}
            validationSchema={BookingSchema}
            onSubmit={(values) => {
                const bid: IBookingBid = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    birthdate: values.birthdate,
                    phone: values.phone,
                    email: values.email,
                    comment: values.comment,
                    status: BID_STATUSES.NEW,
                    type: BID_TYPES.BOOKING,
                    date: new Date().toISOString(),
                };
                dispatch(postBid(bid))
                    .unwrap()
                    .then((response) =>
                        setResult({
                            status: HTTP_STATUS.RESOLVED,
                            message: response.message,
                        })
                    )
                    .catch((error) =>
                        setResult({
                            status: HTTP_STATUS.REJECTED,
                            message: error.message,
                        })
                    );
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="booking-form__input-group">
                        <label className="booking-form__label label">
                            Имя*
                            <input
                                type="text"
                                className="booking-form__input input control"
                                placeholder="Имя"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                disabled={isSubmitting}
                            />
                            {errors.firstName && touched.firstName && (
                                <p className="booking-form__error">
                                    {errors.firstName}
                                </p>
                            )}
                        </label>
                        <label className="booking-form__label label">
                            Фамилия*
                            <input
                                type="text"
                                className="booking-form__input input control"
                                placeholder="Фамилия"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                disabled={isSubmitting}
                            />
                            {errors.lastName && touched.lastName && (
                                <p className="booking-form__error">
                                    {errors.lastName}
                                </p>
                            )}
                        </label>
                    </div>
                    <div className="booking-form__input-group">
                        <label className="booking-form__label label">
                            Телефон*
                            <input
                                type="tel"
                                className="booking-form__input input control"
                                placeholder="Номер"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                disabled={isSubmitting}
                            />
                            {errors.phone && touched.phone && (
                                <p className="booking-form__error">
                                    {errors.phone}
                                </p>
                            )}
                        </label>
                        <label className="booking-form__label label">
                            Email*
                            <input
                                type="email"
                                className="booking-form__input input control"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                disabled={isSubmitting}
                            />
                            {errors.email && touched.email && (
                                <p className="booking-form__error">
                                    {errors.email}
                                </p>
                            )}
                        </label>
                    </div>
                    <label className="booking-form__label booking-form__label--thin label">
                        Дата рождения*
                        <input
                            type="date"
                            className="booking-form__input input control"
                            name="birthdate"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.birthdate}
                            disabled={isSubmitting}
                        />
                        {errors.birthdate && touched.birthdate && (
                            <p className="booking-form__error">
                                {errors.birthdate}
                            </p>
                        )}
                    </label>
                    <label className="booking-form__label label">
                        Комментарий
                        <textarea
                            className="booking-form__textarea textarea control"
                            placeholder="Текст..."
                            name="comment"
                            onChange={handleChange}
                            value={values.comment}
                            disabled={isSubmitting}
                        ></textarea>
                    </label>
                    <label className="booking-form__agreement-label label">
                        <input
                            type="checkbox"
                            className="booking-form__checkbox"
                            name="agreement"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                        />
                        <span className="booking-form__agreement-text">
                            С политикой конфиденциальности ознакомлен и
                            согласен.*
                        </span>
                        {errors.agreement && touched.agreement && (
                            <p className="booking-form__error">
                                {errors.agreement}
                            </p>
                        )}
                    </label>
                    <button
                        type="submit"
                        className="booking-form__btn button-order button-order--small"
                        disabled={isSubmitting}
                    >
                        Отправить
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default BookingForm;
