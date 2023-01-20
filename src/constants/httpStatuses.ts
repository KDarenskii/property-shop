interface RequestStatus {
    IDLE: 'IDLE';
    PENDING: 'LOADING';
    RESOLVED: 'SUCCESS';
    REJECTED: 'FAIL';
}

export const HTTP_STATUS: RequestStatus = {
    IDLE: 'IDLE',
    PENDING: 'LOADING',
    RESOLVED: 'SUCCESS',
    REJECTED: 'FAIL'
}

export type THtppStatus = typeof HTTP_STATUS.IDLE 
                    | typeof HTTP_STATUS.PENDING
                    | typeof HTTP_STATUS.REJECTED
                    | typeof HTTP_STATUS.RESOLVED;