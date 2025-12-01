import EditorInput from '@/components/EditorInput'
import styles from './index.module.less'
import { Divider } from 'antd'
import type { AnalysisProps } from './interface'

const Analysis = ({ value, onChange }: AnalysisProps) => {
    return (
        <div className={`${styles.analysis} ${styles.flex}`}>
            <div className={styles.label}>解析</div>
            <div className={styles.content}>
                <EditorInput placeholder="点击编辑（选填）" value={value} onChange={onChange} />
                <Divider dashed />
            </div>
        </div>
    )
}

export default Analysis
