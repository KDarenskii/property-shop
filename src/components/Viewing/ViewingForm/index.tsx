import React from "react";
import { HTTP_STATUS } from "../../../constants/httpStatuses";
import { IBid } from "../../../models/bid";
import { Formik } from "formik";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { BID_STATUSES } from "../../../constants/bidStatuses";
import { BID_TYPES } from "../../../constants/bidTypes";
import { postBid } from "../../../store/bids/thunks/postBid";
import { ViewingResult } from "..";
import { viewingScheme } from './viewingScheme';
import TextInput from "../../FormElements/TextInput";
import OrderButton from "../../Buttons/OrderButton";

import "./styles.scss";
import FormErrorMessage from "../../FormElements/FormErrorMessage";

type ViewingFormProps = {
    setResult: React.Dispatch<React.SetStateAction<ViewingResult>>;
};

interface Values {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

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
            validationSchema={viewingScheme}
            onSubmit={async (values) => {

                const bid: IBid = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phone: values.phone,
                    email: values.email,
                    status: BID_STATUSES.NEW,
                    type: BID_TYPES.VIEWING,
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
                <form onSubmit={handleSubmit} className="viewing-form">
                    <div className="viewing-form__input-group">
                        <label className="viewing-form__label">
                            Имя*
                            <TextInput
                                type="text"
                                className="viewing-form__input"
                                placeholder="Имя"
                                name="firstName"
                                onChange={handleChange}
                                value={values.firstName}
                                disabled={isSubmitting}
                                onBlur={handleBlur}
                            />
                            {errors.firstName && touched.firstName && <FormErrorMessage text={errors.firstName} />}
                        </label>
                        <label className="viewing-form__label">
                            Фамилия*
                            <TextInput
                                type="text"
                                className="viewing-form__input"
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
                    <div className="viewing-form__input-group">
                        <label className="viewing-form__label">
                            Телефон*
                            <TextInput
                                type="tel"
                                className="viewing-form__input"
                                placeholder="Номер"
                                name="phone"
                                onChange={handleChange}
                                value={values.phone}
                                disabled={isSubmitting}
                                onBlur={handleBlur}
                            />
                            {errors.phone && touched.phone && <FormErrorMessage text={errors.phone} />}
                        </label>
                        <label className="viewing-form__label">
                            Email*
                            <TextInput
                                type="email"
                                className="viewing-form__input"
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
                    <OrderButton 
                        size={'small'}
                        type="submit"
                        className="viewing-form__btn"
                        disabled={isSubmitting}
                        text={'Отправить'}
                     />
                </form>
            )}
        </Formik>
    );
};

export default ViewingForm;
