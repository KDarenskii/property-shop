interface Types {
    SUCCESS: 'success';
    ERROR: 'error';
}

export const NOTION_TYPES: Types = {
    SUCCESS: 'success',
    ERROR: 'error'
}

export type TNotion = typeof NOTION_TYPES.SUCCESS | typeof NOTION_TYPES.ERROR;