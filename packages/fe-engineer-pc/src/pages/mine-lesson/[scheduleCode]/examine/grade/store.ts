import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { ClassScoreTableDto, CourseEvaluationDto, StudentScoreRowDto } from './interface'

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

    /** 表头信息 */
    public headers: CourseEvaluationDto[] = []

    /** 学生分数行数据 */
    public studentRows: StudentScoreRowDto[] = []

    /**  分页获取成绩列表  */
    tableRequest = async (scheduleCode: string) => {
        http(
            api.getGradeList,
            'get',
            {
                scheduleCode,
            },
            { repeatFilter: false },
        )
            .then(data => {
                const { headers = [], studentRows = [] } = (data ||
                    {}) as unknown as ClassScoreTableDto
                const newStudentRows = studentRows.map(item => {
                    const { finalScore = {}, scores = [] } = item || {}
                    scores.map(score => {
                        item[score.columnCode!] = score
                    })
                    item[finalScore.columnCode!] = finalScore
                    return item
                })
                this.headers = headers.filter(item => String(item.weight) !== '0')
                this.studentRows = newStudentRows
                console.log(newStudentRows)
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
}

export default store
