import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { CommentItemDto, ProjectScoreMatrixDto } from './interface'

class store {
    constructor() {
        makeAutoObservable(this)
        if (!store.instance) {
            store.instance = this
        }
        return store.instance
    }
    /**是否请求成功 */
    public hasRequest: boolean = false

    /**学生考核项目多维度评分矩阵 */
    public matrixByStudent: ProjectScoreMatrixDto = {}

    /**学生考核项目多维度评分矩阵 */
    public matrixByComments: CommentItemDto[] = []

    /**获取学生考核项目多维度评分矩阵 */
    getMatrixByStudent = async (
        scheduleCode: string,
        projectCode: string,
        studentUserCode: string,
    ) => {
        http(api.getMatrixByStudent, 'post', {
            scheduleCode,
            projectCode,
            studentUserCode,
        })
            .then(data => {
                this.matrixByStudent = (data || {}) as unknown as ProjectScoreMatrixDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
    /**获取学生考核项目多维度评分矩阵（自评/组内/组间/师评） */
    getMatrixByComments = async (
        scheduleCode: string,
        projectCode: string,
        studentUserCode: string,
    ) => {
        http(api.getMatrixByComments, 'post', {
            scheduleCode,
            projectCode,
            studentUserCode,
        })
            .then(data => {
                this.matrixByComments = (data || {}) as unknown as CommentItemDto[]
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
