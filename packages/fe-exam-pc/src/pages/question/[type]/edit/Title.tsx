import EditorInput from '@/components/EditorInput'
import styles from './index.module.less'
import { Divider } from 'antd'
import type { TitleProps } from './interface'


const Title = ({ title = '题目', value, onChange }: TitleProps) => {
    return (
        <div className={`${styles.title_like} ${styles.flex}`}>
            <div className={styles.label}>{title}</div>

            <div className={styles.content}>
                <EditorInput placeholder="点击编辑（必填）" value={value} onChange={onChange} />
                <Divider dashed />
            </div>
        </div>
    )
}

export default Title
