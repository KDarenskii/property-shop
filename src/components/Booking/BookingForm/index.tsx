import React from "react";
import { HTTP_STATUS } from "../../../constants/httpStatuses";
import { Formik } from "formik";
import { BID_STATUSES } from "../../../constants/bidStatuses";
import { BID_TYPES } from "../../../constants/bidTypes";
import { IBookingBid } from "../../../models/bid";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { postBid } from "../../../store/bids/thunks/postBid";
import { BookingResult } from "..";
import TextInput from "../../FormElements/TextInput";
import OrderButton from "../../Buttons/OrderButton";
import Textarea from "../../FormElements/Textarea";
import { bookingScheme } from "./bookingScheme";

import "./styles.scss";
import FormErrorMessage from "../../FormElements/FormErrorMessage";

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
            validationSchema={bookingScheme}
            onSubmit={async (values) => {

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

                try {
                    const response = await dispatch(postBid(bid)).unwrap();
                    setResult({ status: HTTP_STATUS.RESOLVED, message: response.message })
                } catch (error) {
                    const err = error as any;
                    setResult({ status: HTTP_STATUS.REJECTED, message: err?.message })
                }

            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="booking-form__input-group">
                        <label className="booking-form__label">
                            Имя*
                            <TextInput
                                type="text"
                                className="booking-form__input"
                                placeholder="Имя"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                disabled={isSubmitting}
                            />
                            {errors.firstName && touched.firstName && <FormErrorMessage text={errors.firstName} />}
                        </label>
                        <label className="booking-form__label">
                            Фамилия*
                            <TextInput
                                type="text"
                                className="booking-form__input"
                                placeholder="Фамилия"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                disabled={isSubmitting}
                            />
                            {errors.lastName && touched.lastName && <FormErrorMessage text={errors.lastName} />}
                        </label>
                    </div>
                    <div className="booking-form__input-group">
                        <label className="booking-form__label">
                            Телефон*
                            <TextInput
                                type="tel"
                                className="booking-form__input"
                                placeholder="Номер"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                disabled={isSubmitting}
                            />
                            {errors.phone && touched.phone && <FormErrorMessage text={errors.phone} />}
                        </label>
                        <label className="booking-form__label">
                            Email*
                            <TextInput
                                type="email"
                                className="booking-form__input"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                disabled={isSubmitting}
                            />
                            {errors.email && touched.email && <FormErrorMessage text={errors.email} />}
                        </label>
                    </div>
                    <label className="booking-form__label booking-form__label--thin">
                        Дата рождения*
                        <TextInput
                            type="date"
                            className="booking-form__input"
                            name="birthdate"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.birthdate}
                            disabled={isSubmitting}
                        />
                        {errors.birthdate && touched.birthdate && <FormErrorMessage text={errors.birthdate} />}
                    </label>
                    <label className="booking-form__label label">
                        Комментарий
                        <Textarea
                            className="booking-form__textarea"
                            placeholder="Текст..."
                            name="comment"
                            onChange={handleChange}
                            value={values.comment}
                            disabled={isSubmitting}
                        />
                    </label>
                    <label className="booking-form__agreement-label">
                        <TextInput
                            type="checkbox"
                            className="booking-form__checkbox"
                            name="agreement"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                        />
                        <span className="booking-form__agreement-text">С политикой конфиденциальности ознакомлен и согласен.*</span>
                        {errors.agreement && touched.agreement && <FormErrorMessage text={errors.agreement} />}
                    </label>
                    <OrderButton 
                        size={'small'} 
                        text={'Отправить'} 
                        className={'booking-form__btn'} 
                        type={'submit'} 
                        disabled={isSubmitting} 
                    />
                </form>
            )}
        </Formik>
    );
};

export default BookingForm;
