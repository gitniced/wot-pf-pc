import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type {
    EvaluationStatisticsDto,
    ScoreCell,
    StudentScoreTableDto,
    StudentTeamInfoDto,
} from './interface'

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

    /**课程统计信息 */
    public personExamineStatistics: Partial<EvaluationStatisticsDto> = {}

    /**学生个人考核分数表 */
    public studentScoreTable: Partial<StudentScoreTableDto> = {}

    /**课堂表现考核数量 */
    public performanceItemNum: number = 0
    /**课后作业考核数量 */
    public homeworkItemNum: number = 0
    /**任务考核数量 */
    public taskItemNum: number = 0

    /**学生个人考核分数表 */
    public tableData: Partial<any>[] = []

    /**最终得分 */
    public finalScore: Partial<ScoreCell> = {}
    /**是否是组长 */
    public isLeader: boolean = false

    /**获取我的团队 */
    getTeamInfo = async (scheduleCode: string) => {
        const teamInfo = (await http(api.getTeamInfo, 'post', {
            scheduleCode,
        })) as unknown as StudentTeamInfoDto
        if (teamInfo) {
            const { role } = teamInfo || {}
            if (String(role) === '1') {
                this.isLeader = true
            }
        }
    }
    /**获取个人评价任务统计 */
    getPersonExamineStatistics = async (scheduleCode: string) => {
        http(api.getPersonExamineStatistics, 'get', {
            scheduleCode,
        })
            .then(data => {
                this.personExamineStatistics = (data || []) as unknown as EvaluationStatisticsDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**获取学生个人考核分数表 */
    getStudentScoreTable = async (scheduleCode: string) => {
        http(api.getStudentScoreTable, 'get', {
            scheduleCode,
        })
            .then(data => {
                const { finalScore = {}, items = [] } = (data ||
                    {}) as unknown as StudentScoreTableDto
                const tableData = items.map(item => {
                    const { type = 0 } = item || {}
                    const StrType = String(type)
                    return {
                        ...item,
                        groupName: ['1', '2', '3'].includes(StrType) ? '过程性考核' : '终结性考核',
                    }
                })

                const performance = tableData.filter(i => String(i.type) === '1') || []
                const homework = tableData.filter(i => String(i.type) === '2') || []
                const task = tableData.filter(i => String(i.type) === '3') || []
                const exam = tableData.filter(i => String(i.type) === '4') || []
                this.performanceItemNum = performance.length || 0
                this.homeworkItemNum = homework.length || 0
                this.taskItemNum = task.length || 0
                this.tableData = [...performance, ...homework, ...task, ...exam]
                this.finalScore = finalScore
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
