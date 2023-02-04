export enum BADGE {
    NEW = 'NEW',
    IN_WORK = 'IN_WORK',
    COMPLETED = 'COMPLETED'
}
export const BADGE_VALUE: { [key in BADGE]: string } = {
    [BADGE.NEW]: 'Новая',
    [BADGE.IN_WORK]: 'В работе',
    [BADGE.COMPLETED]: 'Завершенная'
}