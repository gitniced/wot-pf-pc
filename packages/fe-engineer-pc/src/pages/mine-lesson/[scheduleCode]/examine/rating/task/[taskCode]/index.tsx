import { useParams } from 'umi'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import BusinessTable from '@/components/BusinessTable'
import { useMemo, useRef } from 'react'
import Store from '../../store'
import { getClassTaskExamColumns } from './const'

const Index: React.FC = observer(() => {
    const store = useLocalObservable(() => new Store())
    const { courseClassInfo, getTaskExamList } = store
    const { classCode, courseCode } = courseClassInfo || {}
    const { scheduleCode, taskCode } = useParams<{ scheduleCode: string; taskCode: string }>()

    const actionRef = useRef({
        reload: () => {},
        getTableInfo: () => {},
    })

    const memoTableColumns = useMemo(() => {
        return getClassTaskExamColumns()
    }, [scheduleCode])

    return (
        <div className={styles.page}>
            <BusinessTable
                actionRef={actionRef}
                search={false}
                toolBar={false}
                columns={memoTableColumns}
                request={getTaskExamList as any}
                params={{
                    scheduleCode,
                    classCode,
                    courseCode,
                    taskCode,
                }}
                rowKey="id"
                pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (total: number) => `共 ${total} 个项目`,
                }}
            />
        </div>
    )
})

export default Index
