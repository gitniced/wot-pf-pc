import { useParams } from 'umi'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import BusinessTable from '@/components/BusinessTable'
import { useMemo, useRef } from 'react'
import { getClassPerformanceColumns } from './const'
import Store from '../store'

const Index: React.FC = observer(() => {
    const store = useLocalObservable(() => new Store())
    const { courseClassInfo, getClassPerformanceList } = store
    const { classCode, courseCode } = courseClassInfo || {}
    const { scheduleCode } = useParams<{ scheduleCode: string }>()

    console.log(courseClassInfo, classCode, courseCode)

    const actionRef = useRef({
        reload: () => {},
        getTableInfo: () => {},
    })

    const memoTableRequest = useMemo(() => {
        return {
            columns: getClassPerformanceColumns(),
            request: getClassPerformanceList,
        }
    }, [scheduleCode, classCode, courseCode])

    return (
        <div className={styles.page}>
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
                rowKey="stageCode"
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
