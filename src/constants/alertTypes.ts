interface Types {
    INFO: 'warning';
    SUCCESS: 'success';
    ERROR: 'error';
}

export const ALERT_TYPES: Types = {
    INFO: 'warning',
    SUCCESS: 'success',
    ERROR: 'error'
}

export type TAlert = typeof ALERT_TYPES.ERROR 
                        | typeof ALERT_TYPES.INFO 
                        | typeof ALERT_TYPES.SUCCESS;
