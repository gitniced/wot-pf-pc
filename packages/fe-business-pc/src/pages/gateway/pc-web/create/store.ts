import _PageStore from '@/pages/gateway/web/create/store'

import { cloneDeep } from 'lodash'

import { makeObservable } from 'mobx'

export enum UPDATE_TYPE {
    ADD = 'add',
    EDIT = 'edit',
    DELETE = 'delete',
    FIX = 'fix',
    COVER = 'cover',
}

let instance: PcPageStore | null

/**
 * 继承基础的微页面 store 进行扩展
 */
export default class PcPageStore extends _PageStore {
    constructor() {
        super('pc')
        makeObservable(this, {})
    }

    /**
     *  根据id删除组件list里面的某一个元素
     *  删除完成之后移位
     * @param id  组件id
     */
    deletePreviewList = (id: number) => {
        const tempPreviewList = cloneDeep(this.previewList)
        const dataIndex = tempPreviewList.findIndex(item => item.id === id)
        tempPreviewList.splice(dataIndex, 1)
        if (tempPreviewList[dataIndex]) {
            tempPreviewList[dataIndex].active = true
        } else if (tempPreviewList[dataIndex - 1]) {
            tempPreviewList[dataIndex - 1].active = true
        }
        this.previewList = tempPreviewList
    }
    clearInstance() {
        instance = null
    }
}

/**
 * 单例模式 始终保持一个实例
 * @returns
 */
export const getViewStore = () => {
    return instance ? instance : ((instance = new PcPageStore()), instance)
}
