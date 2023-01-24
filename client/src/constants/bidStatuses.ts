interface Status {
    NEW: 'Новая';
    COMPLETED: 'Завершенная';
    IN_WORK: 'В работе';
}

export const BID_STATUSES: Status = {
    NEW: 'Новая',
    COMPLETED: 'Завершенная',
    IN_WORK: 'В работе'
}

export type TBidStatus = typeof BID_STATUSES.IN_WORK 
                        | typeof BID_STATUSES.NEW 
                        | typeof BID_STATUSES.COMPLETED;