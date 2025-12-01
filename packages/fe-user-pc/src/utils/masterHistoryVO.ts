import type { History } from 'umi'

let instance: MasterHistoryVO
export default class MasterHistoryVO {
    masterHistory: History | undefined
    initMasterHistory = (tempHistory: History) => {
        tempHistory.ppp = '颠三倒四'
        this.masterHistory = tempHistory
    }
}

// 单例模式 始终保持一个实例
export const getMasterHistory = (): MasterHistoryVO => {
    if (instance) {
        return instance
    } else {
        instance = new MasterHistoryVO()
        return instance
    }
}
