import { BID_STATUSE } from "../constants/bidStatuse";
import { BID_TYPE } from "../constants/bidType";

export interface IBid {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    status: BID_STATUSE;
    type: BID_TYPE;
    date: string;
    id?: string;
}

export interface IBookingBid extends IBid {
    comment: string;
    birthdate: string;
}
