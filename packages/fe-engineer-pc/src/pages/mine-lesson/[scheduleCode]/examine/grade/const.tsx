import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { NavLink } from 'umi'
import type { CourseEvaluationDto, ScoreCellDto, StudentScoreRowDto } from './interface'
import { Tooltip } from 'antd'
import styles from './index.module.less'

export const getGradeColumns = (scheduleCode: string, headers: CourseEvaluationDto[]) => {
    const tempColumns = headers.map(item => {
        const { type, taskCode } = item || {}
        const typeString = String(type)
        return {
            title: (
                <Tooltip title={`${item.name}(${item.weight}%)`}>
                    <div
                        className={styles.grade_column_title}
                    >{`${item.name}(${item.weight}%)`}</div>
                </Tooltip>
            ),
            // title: `${item.name}(${item.weight}%)`,
            dataIndex: item.code,
            key: item.code,
            width: 200,
            render: (_: ScoreCellDto, record: StudentScoreRowDto) => {
                const { score, status } = _ || {}
                const { studentUserCode } = record || {}
                const needLinkType = ['1', '2', '3']
                let linkUrl = ''

                switch (typeString) {
                    case '1':
                        // '成绩-课堂表现'
                        linkUrl = `/mine-lesson/${scheduleCode}/examine/performance?userCode=${studentUserCode}`
                        break
                    case '2':
                        // '成绩-课后作业'
                        linkUrl = `/mine-lesson/${scheduleCode}/examine/homework?userCode=${studentUserCode}`
                        break
                    case '3':
                        // '成绩-学习任务'
                        linkUrl = `/mine-lesson/${scheduleCode}/examine/grade/info?userCode=${studentUserCode}&taskCode=${taskCode}`
                        break
                    default:
                        linkUrl = ``
                }
                return needLinkType.includes(typeString) ? (
                    <NavLink to={linkUrl}>{String(status) === '0' ? '未出分' : score}</NavLink>
                ) : String(status) === '0' ? (
                    '未出分'
                ) : (
                    score
                )
            },
        }
    })
    /**  列  */
    const columns: ColumnsType<any> = [
        {
            title: '姓名',
            dataIndex: 'studentName',
            key: 'studentName',
            width: 200,
            fixed: 'left',
        },
        ...tempColumns,
        {
            title: '最终得分',
            dataIndex: 'finalScore',
            key: 'finalScore',
            width: 200,
            fixed: 'left',
            render: (finalScore: ScoreCellDto, _: any) => {
                const { score, status } = finalScore || {}
                return String(status) === '0' ? '未出分' : score
            },
        },
    ]
    return columns
}
