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
const getLevelColumns = (isEdit: boolean = true) => {
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
                const { count = 0, needNumber = 0 } = record || {}
                if (isEdit) {
                    if (needNumber > count) {
                        return (
                            <>
                                {needNumber} / <span className={styles.red}>{count}</span>
                            </>
                        )
                    } else {
                        return (
                            <>
                                {needNumber} / {count}
                            </>
                        )
                    }
                } else {
                    return <>{needNumber}</>
                }
            },
        },
    ]

    return columns
}
export default getLevelColumns
