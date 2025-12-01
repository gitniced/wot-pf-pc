// 导入状态
export enum IMPORT_STATUS_ENUM {
    NONE = 0, // 初始化
    BEFORE = 1, // 导入前
    LOADING = 5, // 导入中
    RESOLVED = 20, // 导入成功
    REJECTED = 10, // 导入失败
}

// 上传文件限制
export const ACCEPT =
    'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

// 上传大小限制
export const MAX_SIZE = 5 * 1024 * 1024
