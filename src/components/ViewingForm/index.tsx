import React from "react";
import { HTTP_STATUS } from "../../constants/httpStatuses";
import { IBid } from "../../models/bid";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { BID_STATUSES } from "../../constants/bidStatuses";
import { BID_TYPES } from "../../constants/bidTypes";
import { postBid } from "../../store/bids/thunks/postBid";
import { phoneRegExp } from "../../constants/regExp";
import { ViewingResult } from "../Viewing";

import "./styles.scss";

type ViewingFormProps = {
    setResult: React.Dispatch<React.SetStateAction<ViewingResult>>;
};

interface Values {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

const ViewingSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Минимальное количество символов: 2")
        .max(35, "Превышено максимальное количество символов")
        .required("Обязательное поле"),
    lastName: Yup.string()
        .min(2, "Минимальное количество символов: 2")
        .max(35, "Превышено максимальное количество символов")
        .required("Обязательное поле"),
    phone: Yup.string()
        .matches(phoneRegExp, "Не корректный номер телефона")
        .required("Обязательное поле"),
    email: Yup.string()
        .email("Не корректный email")
        .required("Обязательное поле"),
});

const ViewingForm: React.FC<ViewingFormProps> = ({ setResult }) => {
    const dispatch = useAppDispatch();

    const initialValues: Values = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ViewingSchema}
            onSubmit={(values) => {
                console.log(values);

                const bid: IBid = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone,
                    email: values.email,
                    status: BID_STATUSES.NEW,
                    type: BID_TYPES.VIEWING,
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
                <form onSubmit={handleSubmit} className="viewing-form">
                    <div className="viewing-form__input-group">
                        <label className="viewing-form__label">
                            Имя*
                            <input
                                type="text"
                                className="viewing-form__input input control"
                                placeholder="Имя"
                                name="firstName"
                                onChange={handleChange}
                                value={values.firstName}
                                disabled={isSubmitting}
                                onBlur={handleBlur}
                            />
                            {errors.firstName && touched.firstName && (
                                <p className="viewing-form__error">
                                    {errors.firstName}
                                </p>
                            )}
                        </label>
                        <label className="viewing-form__label label">
                            Фамилия*
                            <input
                                type="text"
                                className="viewing-form__input input control"
                                placeholder="Фамилия"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                disabled={isSubmitting}
                            />
                            {errors.lastName && touched.lastName && (
                                <p className="viewing-form__error">
                                    {errors.lastName}
                                </p>
                            )}
                        </label>
                    </div>
                    <div className="viewing-form__input-group">
                        <label className="viewing-form__label label">
                            Телефон*
                            <input
                                type="tel"
                                className="viewing-form__input input control"
                                placeholder="Номер"
                                name="phone"
                                onChange={handleChange}
                                value={values.phone}
                                disabled={isSubmitting}
                                onBlur={handleBlur}
                            />
                            {errors.phone && touched.phone && (
                                <p className="viewing-form__error">
                                    {errors.phone}
                                </p>
                            )}
                        </label>
                        <label className="viewing-form__label label">
                            Email*
                            <input
                                type="email"
                                className="viewing-form__input input control"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                disabled={isSubmitting}
                            />
                            {errors.email && touched.email && (
                                <p className="viewing-form__error">
                                    {errors.email}
                                </p>
                            )}
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="viewing-form__btn button-order button-order--small"
                        disabled={isSubmitting}
                    >
                        Отправить
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default ViewingForm;
