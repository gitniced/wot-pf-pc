// 阅卷记录详情
import Breadcrumbs from '@/components/Breadcrumbs'
import styles from './index.module.less'
import TitleBlock from '@/components/TitleBlock'
import type { RecordListItem, IRouteParams, LocationParams } from './interface'
import dayjs from 'dayjs'
import { observer, useLocalObservable } from 'mobx-react'
import RecordDetailStore from './store'
import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'umi'
import BusinessTable from '@/components/BusinessTable'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'

const RecordDetail = () => {
    const store = useLocalObservable(() => RecordDetailStore)
    const { taskCode } = useParams() as IRouteParams
    const { query: routeQuery } = useLocation() as unknown as LocationParams

    useEffect(() => {
        document.title = '阅卷记录详情'
    }, [])

    const [columns] = useState([
        {
            title: '试卷名称',
            dataIndex: 'paperTitle',
            ellipsis: true,
        },
        {
            title: '考卷序号',
            dataIndex: 'submitSort',
            width: 120,
        },
        {
            title: '交卷时间',
            dataIndex: 'submitTime',
            render: submitTime => dayjs(submitTime).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: '阅卷人',
            dataIndex: 'teacherName',
            ellipsis: true,
        },
        {
            title: '成绩提交时间',
            dataIndex: 'teacherSubmitTime',
            render: scoreSubmitTime => dayjs(scoreSubmitTime).format('YYYY-MM-DD HH:mm:ss'),
        },
    ] as ColumnsTypeItem<RecordListItem>[])

    return (
        <div className={styles.page_record_detail}>
            <Breadcrumbs
                crumbData={[
                    { link: '/grading/grading-record', name: '阅卷记录' },
                    { name: '详情' },
                ]}
            />

            <div className={styles.content_wrapper}>
                <TitleBlock title="详情" />

                <BusinessTable
                    params={{
                        taskCode,
                        examCode: routeQuery?.examCode,
                    }}
                    columns={columns}
                    // @ts-ignore
                    request={store.getRecordDetailList}
                    search={false}
                />
            </div>
        </div>
    )
}

export default observer(RecordDetail)
