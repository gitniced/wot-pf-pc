import type { CourseEvaluationDto, StudentScoreRowDto } from './types'

export const getScoreTableColumns = (headers: CourseEvaluationDto[]) => {
    const columns: any[] = [
        {
            title: '姓名',
            dataIndex: 'studentName',
            key: 'studentName',
            width: 120,
            fixed: 'left',
        },
    ]

    headers?.forEach((header, index) => {
        const { name, weight, code } = header
        columns.push({
            title: `${name} (${weight}%)`,
            dataIndex: ['scores', index, 'score'],
            key: code || `score_${index}`,
            width: 150,
            align: 'center',
            render: (_: any, record: StudentScoreRowDto) => {
                const scoreData = record.scores?.[index]
                if (!scoreData || scoreData.status === 0) {
                    return '未出分'
                }
                return scoreData.score ?? '未出分'
            },
        })
    })

    columns.push({
        title: '最终得分',
        dataIndex: 'finalScore',
        key: 'finalScore',
        width: 120,
        fixed: 'right',
        align: 'center',
        render: (_: any, record: StudentScoreRowDto) => {
            if (!record.finalScore || record.finalScore.status === 0) {
                return '未出分'
            }
            return record.finalScore.score ?? '未出分'
        },
    })

    return columns
}
