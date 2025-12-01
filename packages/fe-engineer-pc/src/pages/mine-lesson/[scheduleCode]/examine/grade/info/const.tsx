import { Button } from 'antd'
import { history } from 'umi'

export const getInfoTableColumns = (scheduleCode: string, userCode: string) => [
    {
        title: '考核项目',
        dataIndex: 'projectName',
        key: 'projectName',
        align: 'center' as const,
        onCell: (_: any, index?: number) => {
            if (index === 6) {
                return { style: { backgroundColor: 'rgba(0,0,0,0.03)' } }
            }

            return {}
        },
        render: (_val: string, _: any) => {
            const { projectCode, taskCode } = _ || {}
            return (
                <Button
                    type="link"
                    onClick={() => {
                        history.push(
                            `/mine-lesson/${scheduleCode}/examine/description?taskCode=${taskCode}&projectCode=${projectCode}&userCode=${userCode}`,
                        )
                    }}
                >
                    {_val}
                </Button>
            )
        },
    },
    {
        title: '配分',
        dataIndex: 'weight',
        key: 'weight',
        align: 'center' as const,
    },
    {
        title: '得分',
        dataIndex: 'score',
        key: 'score',
        align: 'center' as const,
        render: (_val: string, _: any) => {
            const { score, status, projectCode, taskCode } = _ || {}
            let scoreText = ''
            switch (status) {
                case 0:
                    scoreText = '未出分'
                    break
                case 1:
                    scoreText = score
                    break
                default:
                    scoreText = score
                    break
            }

            return (
                <Button
                    type="link"
                    onClick={() => {
                        history.push(
                            `/mine-lesson/${scheduleCode}/examine/grade/info/score?taskCode=${taskCode}&projectCode=${projectCode}&userCode=${userCode}`,
                        )
                    }}
                >
                    {scoreText}
                </Button>
            )
        },
    },
]
