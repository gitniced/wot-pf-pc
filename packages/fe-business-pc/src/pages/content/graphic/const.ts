//----------------------------------------------------------------

export enum statusEnum {
    draft = 0,
    release = 1,
}

export const STATUS_RELEASE: Record<string, string> = {
    [statusEnum.draft]: '草稿',
    [statusEnum.release]: '发布',
}

export enum newStatusEnum {
    preservation = '1',
    release = '2',
}
export const NEW_STATUS: Record<string, string> = {
    [newStatusEnum.preservation]: '保存草稿',
    [newStatusEnum.release]: '发布',
}

export type statusType = 'success' | 'default'
export const statusMap: Record<number, statusType> = {
    [statusEnum.draft]: 'default',
    [statusEnum.release]: 'success',
}
