import React from "react";
import { HTTP_STATUS, THtppStatus } from "../../constants/httpStatuses";
import BookingForm from "./BookingForm";
import ObjectFormsResult from "../FormsResult.tsx";

import "./styles.scss";

export type BookingResult = {
    status: THtppStatus;
    message: string;
};

const Booking: React.FC = () => {
    
    const [result, setResult] = React.useState<BookingResult>({
        status: HTTP_STATUS.IDLE,
        message: "",
    });

    return (
        <section className="booking">
            <h4 className="booking__title">Анкета бронирования</h4>
            {result.status === HTTP_STATUS.IDLE ? <BookingForm setResult={setResult} /> : <ObjectFormsResult {...result} />}
        </section>
    );
};

export default Booking;
