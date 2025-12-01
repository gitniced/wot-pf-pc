import { makeAutoObservable } from 'mobx'
import type { TaskListReq } from './interface'
import { getTaskList } from './api'

class TaskStore {
    constructor() {
        makeAutoObservable(this)
    }

    getTaskList = async (params: TaskListReq) => {
        const res: any = await getTaskList(params)
        const { data = [], totalCount = 0, success = true } = res ?? {}
        return {
            data,
            totalCount,
            success,
        }
    }
}

export default new TaskStore()
