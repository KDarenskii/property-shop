interface Types {
    BOOKING: 'Бронирование';
    VIEWING: 'Просмотр';
}

export const BID_TYPES: Types = {
    BOOKING: 'Бронирование',
    VIEWING: 'Просмотр',
}

export type TBidType = typeof BID_TYPES.BOOKING | typeof BID_TYPES.VIEWING;