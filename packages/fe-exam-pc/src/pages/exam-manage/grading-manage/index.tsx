import styles from './index.module.less'
import GradingList from './components/GradingList'
import TitleBlock from '@/components/TitleBlock'
import { observer } from 'mobx-react'
import { useEffect } from 'react'

const MarkManage = () => {
    useEffect(() => {
        document.title = '阅卷管理'
    })

    return (
        <div className={styles.page_mark_manage}>
            <TitleBlock title="阅卷管理" />
            {/* 任务列表 */}
            <GradingList />
        </div>
    )
}

export default observer(MarkManage)
