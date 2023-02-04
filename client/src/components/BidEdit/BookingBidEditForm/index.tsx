import React from "react";
import { BID_STATUSE } from "../../../constants/bidStatuse";
import { IBookingBid } from "../../../models/bid";
import { Formik } from "formik";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { patchBid } from "../../../store/bids/thunks/patchBid";
import { showNotion } from "../../../utils/showNotion";
import { NOTION } from "../../../constants/notion";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../Buttons/ActionButton";
import { bookingEditScheme } from "./bookingEditScheme";
import TextInput from "../../FormElements/TextInput";
import Select from "../../FormElements/Select";
import FormErrorMessage from "../../FormElements/FormErrorMessage";
import { BID_TYPE_VALUE } from "../../../constants/bidType";
import BidInfoRaw from "../../FullBid/BidInfoRaw";
import { parseISO } from "../../../utils/parseISO";
import BidFooter from "../../FullBid/BidFooter";
import BidEditInputRaw from "../BidEditInputRaw";

import "./styles.scss";

export interface EditBookingValues {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: BID_STATUSE;
}

const BookingBidEditForm: React.FC<IBookingBid> = (bid) => {
    const parsedDate = parseISO(bid.date);

    const initialState: EditBookingValues = {
        id: bid.id,
        firstName: bid.firstName,
        lastName: bid.lastName,
        email: bid.email,
        phone: bid.phone,
        status: bid.status,
    };

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values: EditBookingValues) => {
        try {
            const response = await dispatch(patchBid(values)).unwrap();
            showNotion(NOTION.SUCCESS, response.message);
            navigate(-1);
        } catch (error) {
            const err = error as any;
            showNotion(NOTION.ERROR, err.message);
        }
    };

    return (
        <Formik initialValues={initialState} validationSchema={bookingEditScheme} onSubmit={handleSubmit}>
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="bid-edit-booking-form">
                    <BidInfoRaw
                        rawClassName="bid-edit-booking-form__info-raw"
                        rawName={"ID:"}
                        rawValue={`Заявка №${bid.id}`}
                    />
                    <BidInfoRaw
                        rawClassName="bid-edit-booking-form__info-raw"
                        rawName={"Дата создания:"}
                        rawValue={`${parsedDate.day} ${parsedDate.time}`}
                    />
                    <BidInfoRaw
                        rawClassName="bid-edit-booking-form__info-raw"
                        rawName={"Услуга:"}
                        rawValue={BID_TYPE_VALUE[bid.type]}
                    />

                    <BidEditInputRaw
                        rawClassName="bid-edit-booking-form__input-raw"
                        labelText="Имя:"
                        htmlFor="bid-firstName"
                    >
                        <TextInput
                            className="bid-edit-booking-form__input"
                            id="bid-firstName"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            disabled={isSubmitting}
                            placeholder="Имя"
                        />
                        {errors.firstName && touched.firstName && <FormErrorMessage text={errors.firstName} />}
                    </BidEditInputRaw>

                    <BidEditInputRaw
                        rawClassName="bid-edit-booking-form__input-raw"
                        labelText="Фамилия:"
                        htmlFor="bid-lastName"
                    >
                        <TextInput
                            className="bid-edit-booking-form__input"
                            id="bid-lastName"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            disabled={isSubmitting}
                            placeholder="Фамилия"
                        />
                        {errors.lastName && touched.lastName && <FormErrorMessage text={errors.lastName} />}
                    </BidEditInputRaw>

                    <BidEditInputRaw
                        rawClassName="bid-edit-booking-form__input-raw"
                        labelText="Email:"
                        htmlFor="bid-email"
                    >
                        <TextInput
                            className="bid-edit-booking-form__input"
                            id="bid-email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            disabled={isSubmitting}
                            placeholder="Email"
                        />
                        {errors.email && touched.email && <FormErrorMessage text={errors.email} />}
                    </BidEditInputRaw>

                    <BidEditInputRaw
                        rawClassName="bid-edit-booking-form__input-raw"
                        labelText="Телефон:"
                        htmlFor="bid-phone"
                    >
                        <TextInput
                            className="bid-edit-booking-form__input"
                            id="bid-phone"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            disabled={isSubmitting}
                            placeholder="Телефон"
                        />
                        {errors.phone && touched.phone && <FormErrorMessage text={errors.phone} />}
                    </BidEditInputRaw>

                    <BidInfoRaw
                        rawClassName="bid-edit-booking-form__info-raw"
                        rawName={"Дата рождения:"}
                        rawValue={bid.birthdate}
                    />

                    <BidEditInputRaw
                        rawClassName="bid-edit-booking-form__input-raw"
                        labelText="Статус заявки:"
                        htmlFor="bid-phone"
                    >
                        <Select
                            className="bid-edit-booking-form__select"
                            id="bid-status"
                            name="status"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                            disabled={isSubmitting}
                        >
                            <option value="NEW">Новая</option>
                            <option value="IN_WORK">В работе</option>
                            <option value="COMPLETED">Завершенная</option>
                        </Select>
                    </BidEditInputRaw>

                    <BidInfoRaw
                        rawClassName="bid-edit-booking-form__info-raw"
                        rawName={"Сообщение:"}
                        rawValue={bid.comment}
                    />

                    <BidFooter>
                        <ActionButton
                            color={"blue"}
                            text={"Сохранить изменения"}
                            type={"submit"}
                            disabled={isSubmitting}
                        />
                        <ActionButton
                            color={"yellow"}
                            text={"Вернуться"}
                            type={"button"}
                            onClick={() => navigate(-1)}
                        />
                    </BidFooter>
                </form>
            )}
        </Formik>
    );
};

export default BookingBidEditForm;
