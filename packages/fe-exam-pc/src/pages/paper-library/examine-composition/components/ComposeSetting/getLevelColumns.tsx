import { InputNumber, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { InfoCircleOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import type { ColumnsProps } from './interface'
import type { TestPaperDifficultyConfigDto } from '../FormSetting/interface'
import { CREATE_VOLUME_LIBRARY_TYPE } from '@/pages/paper-library/[type]/const'
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
const getLevelColumns = (props: ColumnsProps) => {
    const { type, inputChange, templateInputChange } = props || {}

    const columns: ColumnsType<TestPaperDifficultyConfigDto> = [
        {
            title: '难易程度',
            align: 'center',
            dataIndex: 'levelName',
            key: 'levelName',
            width: 160,
        },
        {
            title: (
                <div>
                    <span>题目数量</span>
                    <Tooltip title="试卷所需试题数/可参与本次组卷的试题数">
                        <InfoCircleOutlined className={styles.pdl_5} />
                    </Tooltip>
                </div>
            ),
            align: 'center',
            dataIndex: 'needNumber',
            key: 'needNumber',
            render: (_, record) => {
                const { count, needNumber, level } = record || {}
                return type !== CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION ? (
                    <>
                        <InputNumber
                            value={needNumber}
                            placeholder="请输入"
                            //@ts-ignore
                            formatter={value => value && parseInt(value)}
                            min={0}
                            max={count}
                            onChange={value => inputChange(value, level! as number)}
                        />
                        / {count}
                    </>
                ) : (
                    <>
                        <InputNumber
                            value={needNumber}
                            placeholder="请输入"
                            //@ts-ignore
                            formatter={value => value && parseInt(value)}
                            min={0}
                            max={count}
                            onChange={value => templateInputChange(value, level! as number)}
                        />
                    </>
                )
            },
        },
    ]

    return columns
}
export default getLevelColumns
