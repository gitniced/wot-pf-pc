// 上传文件限制
export const ACCEPT_MAP: Record<string, string> = {
    excel: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    word: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    img: 'image/jpeg,image/png,image/gif,image/bmp',
}

// 上传大小限制
export const MAX_SIZE = 5 * 1024 * 1024

// 上传文件类型限制
export const ACCEPTED_XLSX_ACCEPT =
    'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
export const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/gif,image/bmp'
export const ACCEPTED_ZIP_TYPES = 'application/zip,application/x-zip-compressed,application/x-zip'

export enum ACTION_STATUS_TYPE {
    BEFORE = -1,
    // 未进行
    WAITING = 0,
    // 进行中
    PENDING = 1,
    // 已完成 已完成有两种状态，status为2或者3
    COMPLETE = 2,
    // 格式错误 状态为3
    FORMAT_ERROR = 3,
}

export enum SHOW_STATUS_TYPE {
    // 存在错误
    ERROR = 0,
    // 成功
    SUCCESS = 1,
}
