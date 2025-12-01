import { makeAutoObservable } from 'mobx'
import type { TaskListData, TaskListItem, TaskListReq } from './interface'
import { getTaskList } from './api'
import { GRADING_TASK_ENUM } from './constants'
import { omit } from 'lodash'

class TaskStore {
    constructor() {
        makeAutoObservable(this)
    }

    // 待阅卷列表
    public toBeGradedList: TaskListItem[] = []

    // 待提交成绩
    public toBeSubmitList: TaskListItem[] = []

    public loading: boolean = false

    async getTaskList(params: TaskListReq, activeTab: number) {
        const taskLists: any = await getTaskList(params)

        this.toBeGradedList = taskLists?.find(
            (item: TaskListData) => item.state === GRADING_TASK_ENUM.WAITING,
        ).taskList

        this.toBeSubmitList = taskLists?.find(
            (item: TaskListData) => item.state === GRADING_TASK_ENUM.SUBMITTING,
        ).taskList

        const currentList =
            activeTab === GRADING_TASK_ENUM.WAITING ? this.toBeGradedList : this.toBeSubmitList
        // 前端分页
        const { pageNo, pageSize } = params
        const start = (pageNo - 1) * pageSize
        const end = start + pageSize

        const data = currentList.slice(start, end)

        return { data, totalCount: currentList.length, success: true }
    }
}

export default new TaskStore()
