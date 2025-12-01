/**
 * 导入状态
 */
export enum ImportStatus {
    padding, // 准备开始导入
    resolved, // 全部导入成功
    rejected, // 部分失败或者全部失败
    loading, // 导入中
}
