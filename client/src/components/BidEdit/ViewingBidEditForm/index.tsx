import React from "react";
import { TBidStatus } from "../../../constants/bidStatuses";
import { IBid } from "../../../models/bid";
import { Formik } from "formik";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { patchBid } from "../../../store/bids/thunks/patchBid";
import { showNotion } from "../../../utils/showNotion";
import { NOTION_TYPES } from "../../../constants/notionTypes";
import { useParseISO } from "../../../hooks/useParseISO";
import ActionButton from "../../Buttons/ActionButton";
import { viewingEditScheme } from './viewingEditScheme';
import TextInput from "../../FormElements/TextInput";
import Select from "../../FormElements/Select";
import FormErrorMessage from "../../FormElements/FormErrorMessage";

import "./styles.scss";

export interface EditViewingValues {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: TBidStatus;
}

const ViewingBidEditForm: React.FC<IBid> = (bid) => {

    const parsedDate = useParseISO(bid.date);

    const initialState: EditViewingValues = {
        id: bid.id,
        firstName: bid.firstName,
        lastName: bid.lastName,
        email: bid.email,
        phone: bid.phone,
        status: bid.status,
    };

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={initialState}
            validationSchema={viewingEditScheme}
            onSubmit={async (values) => {
                try {
                    const response = await dispatch(patchBid(values)).unwrap();
                    showNotion(NOTION_TYPES.SUCCESS, response.message);
                    navigate(-1);
                } catch (error) {
                    const err = error as any;
                    showNotion(NOTION_TYPES.ERROR, err.message);
                }
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="bid-edit-viewing-form">
                    <div className="bid-edit-viewing-form__item">
                        <div className="bid-edit-viewing-form__item-name">ID:</div>
                        <div className="bid-edit-viewing-form__item-value">Заявка №{bid.id}</div>
                    </div>
                    <div className="bid-edit-viewing-form__item">
                        <div className="bid-edit-viewing-form__item-name">Дата создания:</div>
                        <div className="bid-edit-viewing-form__item-value">{parsedDate.day} {parsedDate.time}</div>
                    </div>
                    <div className="bid-edit-viewing-form__item">
                        <div className="bid-edit-viewing-form__item-name"> Услуга:</div>
                        <div className="bid-edit-viewing-form__item-value">{bid.type}</div>
                    </div>
                    <div className="bid-edit-viewing-form__item">
                        <label
                            className="bid-edit-viewing-form__item-name"
                            htmlFor="bid-firstName"
                        >
                            Имя:
                        </label>
                        <div className="bid-edit-viewing-form__input-wrapper">
                            <TextInput
                                className="bid-edit-viewing-form__input"
                                id="bid-firstName"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                disabled={isSubmitting}
                                placeholder={'Имя'}
                            />
                            {errors.firstName && touched.firstName && <FormErrorMessage text={errors.firstName} />}
                        </div>
                    </div>
                    <div className="bid-edit-viewing-form__item">
                        <label
                            className="bid-edit-viewing-form__item-name"
                            htmlFor="bid-lastName"
                        >
                            Фамилия:
                        </label>
                        <div className="bid-edit-viewing-form__input-wrapper">
                            <TextInput
                                className="bid-edit-viewing-form__input"
                                id="bid-lastName"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                disabled={isSubmitting}
                                placeholder={'Фамилия'}
                            />
                            {errors.lastName && touched.lastName && <FormErrorMessage text={errors.lastName} />}
                        </div>
                    </div>
                    <div className="bid-edit-viewing-form__item">
                        <label
                            className="bid-edit-viewing-form__item-name"
                            htmlFor="bid-email"
                        >
                            Email:
                        </label>
                        <div className="bid-edit-viewing-form__input-wrapper">
                            <TextInput
                                className="bid-edit-viewing-form__input"
                                id="bid-email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                disabled={isSubmitting}
                                placeholder={'Email'}
                            />
                            {errors.email && touched.email && <FormErrorMessage text={errors.email} />}
                        </div>
                    </div>
                    <div className="bid-edit-viewing-form__item">
                        <label
                            className="bid-edit-viewing-form__item-name"
                            htmlFor="bid-phone"
                        >
                            Телефон:
                        </label>
                        <div className="bid-edit-viewing-form__input-wrapper">
                            <TextInput
                                className="bid-edit-viewing-form__input"
                                id="bid-phone"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                disabled={isSubmitting}
                                placeholder={'Телефон'}
                            />
                            {errors.phone && touched.phone && <FormErrorMessage text={errors.phone} />}
                        </div>
                    </div>
                    <div className="bid-edit-viewing-form__item">
                        <label
                            className="bid-edit-viewing-form__item-name"
                            htmlFor="bid-status"
                        >
                            Статус заявки:
                        </label>
                        <div className="bid-edit-viewing-form__input-wrapper">
                            <Select
                                className="bid-edit-viewing-form__select"
                                id="bid-status"
                                name="status"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.status}
                                disabled={isSubmitting}
                            >
                                <option value="Новая">Новая</option>
                                <option value="В работе">В работе</option>
                                <option value="Завершенная">Завершенная</option>
                            </Select>
                        </div>
                    </div>
                    <div className="bid-edit-viewing-form__actions">
                        <ActionButton
                             color={'blue'} 
                             text={'Сохранить изменения'} 
                             type={'submit'} 
                             disabled={isSubmitting}
                        />
                        <ActionButton 
                            color={'yellow'} 
                            text={'Вернуться'}
                            type={'button'} 
                            onClick={() => navigate(-1)} 
                        />
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default ViewingBidEditForm;