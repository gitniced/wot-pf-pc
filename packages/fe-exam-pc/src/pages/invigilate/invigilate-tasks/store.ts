import { makeAutoObservable } from 'mobx'
import type { InvigilationItem,InvigilationTasksParams,} from './interface'
import {getInvigilationTaskList} from './api'
import {EXAM_STATE_ENUM} from './constants'
class InvigilateStore {
    constructor() {
        makeAutoObservable(this)
    }

    public loading: boolean = false

    public invigilateList: Partial<InvigilationItem>[] = []


    public defaultListParams: Partial<InvigilationTasksParams> = {
        pageNo: 1,
        pageSize: 10,
        signType: -1,
        examState:EXAM_STATE_ENUM.ALL
    }

    // 列表总数
    public totalCount: number = 0

    // 搜索条件
    public searchParams: Partial<InvigilationTasksParams> = this.defaultListParams


    handleSubmit = () => {

    }

    // 获取监考任务列表
    _getInvigilationTaskList = (params?: any) => {
        // this.loading = true
        // this.searchParams = { ...this.searchParams, ...params }
        return getInvigilationTaskList(params)
            // .then((res: any) => {
            //     const { data = [], totalCount } = res
            //     this.totalCount = totalCount
            //     this.invigilateList = data
            // })
            // .finally(() => {
            //     this.loading = false
            // })
    }
    
}

export default new InvigilateStore()
