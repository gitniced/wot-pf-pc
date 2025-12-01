import { Button } from 'antd'
import styles from './index.module.less'

interface Props {
    onClick: () => void
    text?: boolean
}

/** 查看更多按钮 */
const SeeMore: React.FC<Props> = ({ onClick, text }) => {
    return text ? (
        <span className={styles.button_text} onClick={onClick}>
            <span className={styles.text_text}>查看更多 {'>'}</span>
        </span>
    ) : (
        <Button className={styles.button} onClick={onClick}>
            <span className={styles.text}>查看更多</span>
            <svg className={`icon ${styles.icon}`}>
                <use className={styles.hover} xlinkHref={'#chakangengduoanniujiantou'} />
            </svg>
        </Button>
    )
}

export default SeeMore
