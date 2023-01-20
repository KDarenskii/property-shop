import React from "react";
import { TBidStatus } from "../../constants/bidStatuses";
import { IBookingBid } from "../../models/bid";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { phoneRegExp } from "../../constants/regExp";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { patchBid } from "../../store/bids/thunks/patchBid";
import { showNotion } from "../../utils/showNotion";
import { NOTION_TYPES } from "../../constants/notionTypes";
import { useNavigate } from "react-router-dom";
import { useParseISO } from "../../hooks/useParseISO";

import "./styles.scss";

export interface EditBookingValues {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: TBidStatus;
}

const schema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Минимальное количество символов: 2')
        .max(35, 'Превышено максимальное количество символов')
        .required('Обязательное поле'),
    lastName: Yup.string()
        .min(2, 'Минимальное количество символов: 2')
        .max(35, 'Превышено максимальное количество символов')
        .required('Обязательное поле'),
    email: Yup.string()
        .email('Не корректный email')
        .required('Обязательное поле'),
    phone: Yup.string()
        .matches(phoneRegExp, 'Не корректный номер телефона')
        .required('Обязательное поле'),
})

const BookingBidEditForm: React.FC<IBookingBid> = (bid) => {

    const parsedDate = useParseISO(bid.date);

    const initialState: EditBookingValues = {
        id: bid.id,
        firstName: bid.firstName,
        lastName: bid.lastName,
        email: bid.email,
        phone: bid.phone,
        status: bid.status,
    }

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={initialState}
            validationSchema={schema}
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
            { ({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="bid-edit-booking-form">
                    <div className="bid-edit-booking-form__item">
                        <div className="bid-edit-booking-form__item-name">ID:</div>
                        <div className="bid-edit-booking-form__item-value">Заявка №{bid.id}</div>
                    </div>
                    <div className="bid-edit-booking-form__item">
                        <div className="bid-edit-booking-form__item-name">Дата создания:</div>
                        <div className="bid-edit-booking-form__item-value">{parsedDate.day} {parsedDate.time}</div>
                    </div>
                    <div className="bid-edit-booking-form__item">
                        <div className="bid-edit-booking-form__item-name">Услуга:</div>
                        <div className="bid-edit-booking-form__item-value">{bid.type}</div>
                    </div>
                    <div className="bid-edit-booking-form__item">
                        <label className="bid-edit-booking-form__item-name label" htmlFor="bid-firstName">Имя:</label>
                        <input
                            className="bid-edit-booking-form__input input control" 
                            id="bid-firstName"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="bid-edit-booking-form__item">
                        <label className="bid-edit-booking-form__item-name label" htmlFor="bid-lastName">Фамилия:</label>
                        <input
                            className="bid-edit-booking-form__input input control" 
                            id="bid-lastName"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="bid-edit-booking-form__item">
                        <label className="bid-edit-booking-form__item-name label" htmlFor="bid-email">Email:</label>
                        <input
                            className="bid-edit-booking-form__input input control" 
                            id="bid-email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="bid-edit-booking-form__item">
                        <label className="bid-edit-booking-form__item-name label" htmlFor="bid-phone">Телефон:</label>
                        <input
                            className="bid-edit-booking-form__input input control" 
                            id="bid-phone"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="bid-edit-booking-form__item">
                        <div className="bid-edit-booking-form__item-name">Дата рождения:</div>
                        <div className="bid-edit-booking-form__item-value">{bid.birthdate}</div>
                    </div>
                    <div className="bid-edit-booking-form__item">
                        <label className="bid-edit-booking-form__item-name label" htmlFor="bid-status">Статус заявки:</label>
                        <select
                            className="custom-select bid-edit-booking-form__select select control"
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
                        </select>
                    </div>
                    <div className="bid-edit-booking-form__item">
                        <div className="bid-edit-booking-form__item-name">Сообщение:</div>
                        <div className="bid-edit-booking-form__item-value">{bid.comment}</div>
                    </div>
                    <div className="bid-edit-booking-form__actions">
                        <button
                            type='submit' 
                            className="button-action button-action--blue"
                            disabled={isSubmitting}
                        >
                            Сохранить изменения
                        </button>
                        <button 
                            onClick={() => navigate(-1)}
                            className="button-action button-action--yellow"
                            type="button"
                        >
                            Вернуться
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default BookingBidEditForm;
