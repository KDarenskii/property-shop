interface IBageTypes {
    'Новая': 'new';
    'В работе': 'inwork';
    'Завершенная': 'completed';
}

export const BadgeTypes: IBageTypes = {
    'Новая': 'new',
    'В работе': 'inwork',
    'Завершенная': 'completed'
}

export type TBadge = typeof BadgeTypes['В работе'] 
                   | typeof BadgeTypes['Завершенная'] 
                   | typeof BadgeTypes['Новая'];