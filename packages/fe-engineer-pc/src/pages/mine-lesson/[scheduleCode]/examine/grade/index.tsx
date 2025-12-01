import styles from './index.module.less'
import { getGradeColumns } from './const'
import { useParams } from 'umi'
import { useEffect, useMemo } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import ExamTabBar from '../../components/ExamTabBar'
import BusinessTable from '@/components/BusinessTable'
import { useSaasTitle } from '@wotu/wotu-components'

const Index: React.FC = observer(() => {
    useSaasTitle('考核-查看成绩')
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const store = useLocalObservable(() => new Store())
    const { tableRequest, headers = [], studentRows = [] } = store
    const gradeColumns = useMemo(
        () => getGradeColumns(scheduleCode, headers),
        [scheduleCode, headers],
    )

    useEffect(() => {
        tableRequest(scheduleCode)
    }, [scheduleCode])

    return (
        <div className={styles.grade}>
            <ExamTabBar />
            <div className={styles.grade_table}>
                <BusinessTable
                    search={false}
                    toolBar={false}
                    columns={gradeColumns}
                    dataSource={studentRows}
                    layout="inline"
                    rowKey={'studentUserCode'}
                    pagination={false}
                />
            </div>
        </div>
    )
})

export default Index
