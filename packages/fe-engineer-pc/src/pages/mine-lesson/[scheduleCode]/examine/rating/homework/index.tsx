import { useParams } from 'umi'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import BusinessTable from '@/components/BusinessTable'
import { useMemo, useRef } from 'react'
import { getClassHomeworkColumns } from './const'
import Store from '../store'

const Index: React.FC = observer(() => {
    const store = useLocalObservable(() => new Store())
    const { courseClassInfo, getHomeworkList } = store
    const { classCode, courseCode } = courseClassInfo || {}
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const actionRef = useRef({
        reload: () => {},
        getTableInfo: () => {},
    })

    const memoTableRequest = useMemo(() => {
        return {
            columns: getClassHomeworkColumns(),
            request: getHomeworkList,
        }
    }, [scheduleCode, classCode, courseCode])

    return (
        <div className={styles.rating}>
            <BusinessTable
                actionRef={actionRef}
                search={false}
                toolBar={false}
                columns={memoTableRequest.columns}
                request={memoTableRequest.request as any}
                params={{
                    scheduleCode,
                    classCode,
                    courseCode,
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
