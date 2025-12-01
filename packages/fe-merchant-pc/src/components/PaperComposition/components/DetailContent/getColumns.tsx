import { Tooltip } from 'antd'
import type { ColumnsProps, QuestionItem } from './interface'
import type { ColumnsType } from 'antd/lib/table'
import { InfoCircleOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { questionType } from './const'
import { SCORE_SETTING_TYPE } from '@/components/PaperExamine/const'

/**
 * 题型结构columns
 * @param props {
 *  scoreType: 分值设置类型
 *  isEdit: 是否可编辑
 * }
 * @returns
 */
const getColumns = (props: ColumnsProps) => {
    const { scoreType, isEdit } = props || {}

    const columns: ColumnsType<QuestionItem> = [
        {
            title: '题型',
            align: 'center',
            dataIndex: 'questionType',
            key: 'questionType',
            render: text => <>{questionType[text]}</>,
        },
        {
            title: (
                <div>
                    <span>题目数量</span>
                    <Tooltip
                        title={
                            isEdit ? '试卷所需试题数 / 可参与本次组卷的试题数' : '试卷所需试题数'
                        }
                    >
                        <InfoCircleOutlined className={styles.pdl_5} />
                    </Tooltip>
                </div>
            ),
            align: 'center',
            dataIndex: 'needNumber',
            key: 'needNumber',
            render: (text, record) => {
                const { count } = record || {}
                return isEdit ? (
                    <span>
                        {text} / <span className={text > count ? styles.red : null}>{count}</span>
                    </span>
                ) : (
                    text
                )
            },
        },
    ]
    // 分值设置为按题型设置时
    if (scoreType === SCORE_SETTING_TYPE.QUESTION_TYPE) {
        columns.push(
            {
                title: '分值',
                align: 'center',
                dataIndex: 'score',
                key: 'score',
            },
            {
                title: '分数',
                align: 'center',
                key: 'allScore',
                render: (_, record) => {
                    const { needNumber, score } = record || {}
                    return <span>{needNumber * score}分</span>
                },
            },
        )
    }
    return columns
}
export default getColumns
