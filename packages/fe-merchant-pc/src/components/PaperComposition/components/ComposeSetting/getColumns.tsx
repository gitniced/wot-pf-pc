import { InputNumber, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { InfoCircleOutlined } from '@ant-design/icons'
import { QuestionType, decimalCheck } from './const'
import styles from './index.module.less'
import type { ColumnsProps } from './interface'
import type { QuestionItem } from '../FormSetting/interface'
import {
    COMPOSITION_WAY,
    CREATE_VOLUME_LIBRARY_TYPE,
    SCORE_SETTING_TYPE,
} from '@/components/PaperExamine/const'
/**
 *
 * @param props {
 *  type: 新建类型 template-组卷、examine_create-试卷
 *  composition: 组卷方式
 *  scoreType: 分值设置方式
 *  inputChange: 新建类型为试卷时，输入框的回调
 *  templateInputChange: 新建类型为组卷时，输入框的回调
 * }
 * @returns
 */
const getColumns = (props: ColumnsProps) => {
    const { type, composition, scoreType, inputChange, templateInputChange } = props || {}

    const columns: ColumnsType<QuestionItem> = [
        {
            title: '题型',
            align: 'center',
            dataIndex: 'questionType',
            key: 'questionType',
            render: text => <>{QuestionType[text]}</>,
        },
        {
            title: (
                <div>
                    <span>题目数量</span>
                    <Tooltip title="试卷所需试题数">
                        <InfoCircleOutlined rev={undefined} className={styles.pdl_5} />
                    </Tooltip>
                </div>
            ),
            align: 'center',
            dataIndex: 'needNumber',
            key: 'needNumber',
            render: (_, record) => {
                const { count, needNumber, questionType } = record || {}
                return (
                    <>
                        {composition === COMPOSITION_WAY.FROM_FILE ? (
                            <>{needNumber}</>
                        ) : type !== CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION ? (
                            <>
                                <InputNumber
                                    value={needNumber}
                                    placeholder="请输入"
                                    //@ts-ignore
                                    formatter={value => value && parseInt(value)}
                                    min={0}
                                    max={count}
                                    onChange={value =>
                                        inputChange(value, questionType, 'needNumber')
                                    }
                                />
                                / {count}
                            </>
                        ) : (
                            <InputNumber
                                value={needNumber}
                                placeholder="请输入"
                                //@ts-ignore
                                formatter={value => value && parseInt(value)}
                                min={0}
                                onChange={value =>
                                    templateInputChange(value, questionType, 'needNumber')
                                }
                            />
                        )}
                    </>
                )
            },
        },
    ]
    // 分值设置为按题型设置时需要加上这两列
    if (scoreType === SCORE_SETTING_TYPE.QUESTION_TYPE) {
        columns.push(
            {
                title: '分值',
                align: 'center',
                dataIndex: 'score',
                key: 'score',
                render: (_, record) => {
                    const { score, questionType } = record || {}
                    return (
                        <InputNumber
                            value={score}
                            onChange={value =>
                                type !== CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION
                                    ? inputChange(value, questionType, 'score')
                                    : templateInputChange(value, questionType, 'score')
                            }
                            placeholder="请输入"
                            min={0}
                            max={1000}
                            // @ts-ignore
                            formatter={decimalCheck}
                            parser={decimalCheck}
                        />
                    )
                },
            },
            {
                title: '分数',
                align: 'center',
                key: 'allScore',
                width: 120,
                render: (_, record) => {
                    const { needNumber, score } = record || {}
                    return (
                        <p className={styles.score}>
                            {needNumber && score
                                ? Number(Number(needNumber) * Number(score)).toFixed(1)
                                : '-'}
                            分
                        </p>
                    )
                },
            },
        )
    }
    return columns
}
export default getColumns
