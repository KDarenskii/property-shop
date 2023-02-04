export enum BID_STATUSE {
    NEW = 'NEW',
    COMPLETED = 'COMPLETED',
    IN_WORK = 'IN_WORK'
}

export const BID_STATUS_VALUES: { [key in BID_STATUSE]: string } = {
    [BID_STATUSE.NEW]: 'Новая',
    [BID_STATUSE.IN_WORK]: 'В работе',
    [BID_STATUSE.COMPLETED]: 'Завершенная'
}