import { NavLink } from 'umi'
import type { CourseEvaluationDto, ScoreCell } from './interface'
import { getCookie } from '@/storage'

/**
 * 考核评价类型
 */
export enum EXAMINE_COMMENT_TYPE {
    /** 自评 */
    selfEvaluationCount = 'selfEvaluationCount',
    /** 组内互评 */
    intraGroupPeerCount = 'intraGroupPeerCount',
    /** 组间互评 */
    interGroupPeerCount = 'interGroupPeerCount',
}

/**
 * 考核评价类型
 */
export const EXAMINE_COMMENT_TYPE_VALUE = {
    /** 自评 */
    [EXAMINE_COMMENT_TYPE.selfEvaluationCount]: 1,
    /** 组内互评 */
    [EXAMINE_COMMENT_TYPE.intraGroupPeerCount]: 2,
    /** 组间互评 */
    [EXAMINE_COMMENT_TYPE.interGroupPeerCount]: 3,
}

/**
 * 考核评价类型标签
 */
export const EXAMINE_COMMENT_TYPE_LABEL = {
    [EXAMINE_COMMENT_TYPE.selfEvaluationCount]: '自评',
    [EXAMINE_COMMENT_TYPE.intraGroupPeerCount]: '组内互评',
    [EXAMINE_COMMENT_TYPE.interGroupPeerCount]: '组间互评',
}

/**
 * 考核评价类型选项
 */
export const examineCommentTypeOptions = Object.entries(EXAMINE_COMMENT_TYPE_LABEL).map(
    ([key, value]) => ({
        label: value,
        key: key,
        value: undefined,
    }),
)

export const getExamineScoreColumns = (
    scheduleCode: string,
    performanceItemNum: number = 0,
    homeworkItemNum: number = 0,
    taskItemNum: number = 0,
) => {
    const processItemsRowNum = performanceItemNum + homeworkItemNum + taskItemNum
    return [
        {
            title: '考核类型',
            dataIndex: 'groupName',
            key: 'groupName',
            align: 'center' as const,
            width: 100,
            onCell: (_: CourseEvaluationDto, index: number) => {
                if (processItemsRowNum) {
                    if (index === 0) {
                        return { rowSpan: processItemsRowNum }
                    } else if (index === processItemsRowNum) {
                        return { rowSpan: 1 }
                    } else {
                        return { rowSpan: 0 }
                    }
                } else {
                    return { rowSpan: 1 }
                }
            },
        },
        {
            title: '学习任务考核',
            dataIndex: 'type',
            key: 'type',
            align: 'center' as const,
            colSpan: 0,
            width: 100,
            onCell: (_: CourseEvaluationDto, index: number) => {
                const { type } = _ || {}
                const strType = String(type)
                switch (strType) {
                    case '1':
                    case '2':
                    case '4':
                        return { colSpan: 0, rowSpan: 0 }
                    case '3':
                        if (index === performanceItemNum + homeworkItemNum) {
                            return { colSpan: 1, rowSpan: taskItemNum }
                        } else {
                            return { colSpan: 0, rowSpan: 0 }
                        }
                    default:
                        return { colSpan: 0, rowSpan: 0 }
                }
            },
            render: (_: number, record: CourseEvaluationDto) => {
                const { type } = record || {}
                const strType = String(type)
                if (['3'].includes(strType)) {
                    return '学习任务考核'
                } else if (['4'].includes(strType)) {
                    return '-'
                } else {
                    return ''
                }
            },
        },
        {
            title: '考核组成',
            dataIndex: 'type',
            key: 'type',
            align: 'center' as const,
            colSpan: 2,
            width: 200,
            onCell: (_: CourseEvaluationDto) => {
                const { type } = _ || {}
                const strType = String(type)
                if (strType === '3') {
                    return { colSpan: 1 }
                } else {
                    return { colSpan: 2 }
                }
            },
            render: (_: number, record: CourseEvaluationDto) => {
                const { type, name } = record || {}
                const strType = String(type)
                if (['4'].includes(strType)) {
                    return '-'
                } else {
                    return name
                }
            },
        },
        {
            title: '权重（%）',
            dataIndex: 'weight',
            align: 'center' as const,
            width: 100,
        },
        {
            title: '得分',
            dataIndex: 'score',
            align: 'center' as const,
            width: 100,
            render: (score: ScoreCell, record: CourseEvaluationDto) => {
                const { type, taskCode } = record || {}
                const { score: scoreValue, status } = score || {}
                const strStatus = String(status)
                const strType = String(type)
                let scoreText = strStatus === '0' ? '未出分' : scoreValue
                const needLinkType = ['1', '2', '3']
                let linkUrl = ''

                switch (strType) {
                    case '1':
                        // '课堂表现'
                        linkUrl = `/mine-lesson/${scheduleCode}/examine/performance?userCode=${getCookie(
                            'USER_CODE',
                        )}`
                        break
                    case '2':
                        // '课后作业'
                        linkUrl = `/mine-lesson/${scheduleCode}/examine/homework?userCode=${getCookie(
                            'USER_CODE',
                        )}`
                        break
                    case '3':
                        // '学习任务'
                        linkUrl = `/mine-lesson/${scheduleCode}/examine/grade/info?userCode=${getCookie(
                            'USER_CODE',
                        )}&taskCode=${taskCode}`
                        break
                    default:
                        linkUrl = ``
                }
                return needLinkType.includes(strType) ? (
                    <NavLink to={linkUrl}>{scoreText}</NavLink>
                ) : (
                    scoreText
                )
            },
        },
    ]
}
