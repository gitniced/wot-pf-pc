import { QuestionCircleOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { Tooltip } from 'antd'

const SubTitle = ({
    title,
    description,
    subStyle = {},
    tip = '',
}: {
    title: string
    description?: string
    subStyle?: object
    tip?: string
}) => {
    return (
        <div className={styles.sub} style={subStyle}>
            <div className={styles.sub_title}>
                {title}{' '}
                {tip && (
                    <Tooltip title={tip}>
                        <QuestionCircleOutlined className={styles.circleIcon} />
                    </Tooltip>
                )}
            </div>
            {description ? <div className={styles.sub_desc}>{description}</div> : null}
        </div>
    )
}

export default SubTitle
