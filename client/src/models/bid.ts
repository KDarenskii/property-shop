import { TBidStatus } from "../constants/bidStatuses";
import { TBidType } from "../constants/bidTypes";

export interface IBid {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    status: TBidStatus;
    type: TBidType;
    date: string;
    id?: string;
}

export interface IBookingBid extends IBid {
    comment: string;
    birthdate: string;
}

