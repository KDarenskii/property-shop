export enum BID_TYPE {
    BOOKING = 'BOOKING',
    VIEWING = 'VIEWING'
}

export const BID_TYPE_VALUE: { [key in BID_TYPE]: string } = {
    [BID_TYPE.BOOKING]: 'Бронирование',
    [BID_TYPE.VIEWING]: 'Просмотр'
}
