// 阅卷任务

import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'
import TaskList from './components/TaskList'
import { observer, useLocalObservable } from 'mobx-react'
import TaskStore from './store'
import { Spin } from 'antd'
import { useEffect } from 'react'

const GradingTasks = () => {
    const store = useLocalObservable(() => TaskStore)

    useEffect(() => {
        document.title = '阅卷任务'
    }, [])

    return (
        <Spin spinning={store.loading}>
            <div className={styles.page_mark_tasks}>
                <TitleBlock title="阅卷任务" />

                <TaskList />
            </div>
        </Spin>
    )
}

export default observer(GradingTasks)
