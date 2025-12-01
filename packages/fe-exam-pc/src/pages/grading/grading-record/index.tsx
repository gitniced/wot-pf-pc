// 阅卷记录

import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'
import TaskList from './components/TaskList'
import { observer } from 'mobx-react'
import { useEffect } from 'react'

const GradingRecord = () => {
    useEffect(() => {
        document.title = '阅卷记录'
    }, [])

    return (
        <div className={styles.page_grading_record}>
            <TitleBlock title="阅卷记录" />
            <TaskList />
        </div>
    )
}

export default observer(GradingRecord)
