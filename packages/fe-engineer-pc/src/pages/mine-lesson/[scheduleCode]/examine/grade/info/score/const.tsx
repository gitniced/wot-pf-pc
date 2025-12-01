import type { ProjectScoreMatrixItemDto, ScoreCell } from './interface'
import CommentDetail from './components/CommentDetail'
import { CustomMarkdown } from '@/components/AIComp/components/CustomMarkdown'

export const getScoreTableColumns = (
    selfWeight: number,
    intraGroupWeight: number,
    interGroupWeight: number,
    teacherWeight: number,
    studentUserCode: string,
    projectCode: string,
) => {
    return [
        {
            title: '评价项目',
            dataIndex: 'evaluatedRubric',
            key: 'evaluatedRubric',
            align: 'center' as const,
            onCell: (_: any, index?: number) => {
                if (index === 5) {
                    return {
                        colSpan: 2,
                        style: {
                            backgroundColor: 'rgba(0,0,0,0.03)',
                        },
                    }
                }
                return {}
            },
            render: (value: string) => {
                return <CustomMarkdown>{value}</CustomMarkdown>
            },
        },
        {
            title: '评价标准',
            dataIndex: 'evaluatorCriteria',
            key: 'evaluatorCriteria',
            width: '30%',
            onCell: (_: any, index?: number) => {
                if (index === 5) {
                    return {
                        colSpan: 0,
                    }
                }
                return {}
            },
            render: (value: string) => {
                return <CustomMarkdown>{value}</CustomMarkdown>
            },
        },
        {
            title: (
                <>
                    <div>配分</div>
                    {/* <div>（%）</div> */}
                </>
            ),
            dataIndex: 'weight',
            key: 'weight',
            align: 'center' as const,
            render: (value: number | undefined) => (value === undefined ? '未出分' : value),
        },
        {
            title: (
                <>
                    <div>自评</div>
                    <div>（{selfWeight}%）</div>
                </>
            ),
            dataIndex: 'selfScore',
            key: 'selfScore',
            align: 'center' as const,
            render: (value: ScoreCell) => {
                const { score, status } = value || {}
                return String(status) === '0'
                    ? String(selfWeight) === '0'
                        ? '-'
                        : '未出分'
                    : score
            },
        },
        {
            title: (
                <>
                    <div>组内互评</div>
                    <div>（{intraGroupWeight}%）</div>
                </>
            ),
            dataIndex: 'intraGroupScore',
            key: 'intraGroupScore',
            align: 'center' as const,
            render: (value: ScoreCell, _: ProjectScoreMatrixItemDto) => {
                const { criterionCode } = _ || {}
                return (
                    <CommentDetail
                        type={'intraGroup'}
                        weight={intraGroupWeight}
                        scoreCell={value}
                        criterionCode={criterionCode!}
                        studentUserCode={studentUserCode}
                        projectCode={projectCode}
                    />
                )
            },
        },
        {
            title: (
                <>
                    <div>组间互评</div>
                    <div>（{interGroupWeight}%）</div>
                </>
            ),
            dataIndex: 'interGroupScore',
            key: 'interGroupScore',
            align: 'center' as const,
            render: (value: ScoreCell, _: ProjectScoreMatrixItemDto) => {
                const { criterionCode } = _ || {}
                return (
                    <CommentDetail
                        type={'interGroup'}
                        weight={interGroupWeight}
                        scoreCell={value}
                        criterionCode={criterionCode!}
                        studentUserCode={studentUserCode}
                        projectCode={projectCode}
                    />
                )
            },
        },
        {
            title: (
                <>
                    <div>师评</div>
                    <div>（{teacherWeight}%）</div>
                </>
            ),
            dataIndex: 'teacherScore',
            key: 'teacherScore',
            align: 'center' as const,
            render: (value: ScoreCell) => {
                const { score, status } = value || {}
                return String(teacherWeight) === '0'
                    ? '-'
                    : String(status) === '0'
                    ? '未出分'
                    : score
            },
        },
        {
            title: '得分',
            dataIndex: 'finalScore',
            key: 'finalScore',
            align: 'center' as const,
            render: () => {
                return '-'
            },
        },
    ]
}

export const scoreTableData = [
    {
        project: '报告内容完整性',
        standard:
            '报告是否涵盖了设备的注意结构、工作原理、装配步骤等关键内容。各部分内容是否详细、完整，无遗漏。',
        share: 30,
        self: 20,
        inner: 20,
        inter: 20,
        teacher: 20,
        score: undefined,
    },
    {
        project: '报告逻辑性',
        standard:
            '报告结构是否合理，各部分内容之间的逻辑关系是否清晰。阐述是否条理分明，易于理解。',
        share: 20,
        self: 18,
        inner: 18,
        inter: 18,
        teacher: 18,
        score: 18,
    },
    {
        project: ' 图文并茂程度',
        standard:
            '报告是否使用了适当的图示和说明来辅助文字阐述。 图细示是否清晰、准确，与文字内容是否相符。',
        share: 20,
        self: 18,
        inner: 18,
        inter: 18,
        teacher: 18,
        score: 18,
    },
    {
        project: '创新能力与见解',
        standard:
            '报告中是否体现了学生对装配任务的深入理解和独特见解。 是否提出了创新性的改进建议或解决方案。',
        share: 15,
        self: 15,
        inner: 15,
        inter: 15,
        teacher: 15,
        score: 15,
    },
    {
        project: '报告规范性',
        standard: '报告格式是否符合要求，排版是否整洁美观。 语言是否通顺，有无错别字和语法错误。',
        share: 15,
        self: 15,
        inner: 15,
        inter: 15,
        teacher: 15,
        score: 15,
    },
    {
        project: '合计',
        standard: '',
        share: 100,
        self: undefined,
        inner: 86,
        inter: 86,
        teacher: 86,
        score: 86,
    },
]
