import { QUESTION_TYPE_ENUM } from '@/constants'
import styles from './index.module.less'
import { PlusOutlined, InfoCircleFilled } from '@ant-design/icons'

type MoreOptionProps = {
    type: QUESTION_TYPE_ENUM
    click: any
}

const MoreOption: React.FC<MoreOptionProps> = ({ type, click }) => {
    const getText = () => {
        if (type === QUESTION_TYPE_ENUM.BLANK) {
            return '新增填空'
        } else {
            return '新增选项'
        }
    }
    const getDes = () => {
        if (type === QUESTION_TYPE_ENUM.BLANK) {
            return '若一个空有多个正确答案，每个答案间用“,”分隔，学员答案匹配任意一个都算正确'
        } else {
            return ''
        }
    }
    return (
        <div className={styles.more_option_com}>
            <div className={styles.more_option_content} onClick={click}>
                <PlusOutlined className={styles.more_option_icon} />
                <div className={styles.more_option_text}>{getText()}</div>
            </div>
            {getDes() ? (
                <div className={styles.more_option_des}>
                    <InfoCircleFilled className={styles.more_option_des_icon} />
                    <div className={styles.more_option_des_text}>{getDes()}</div>
                </div>
            ) : null}
        </div>
    )
}
export default MoreOption
