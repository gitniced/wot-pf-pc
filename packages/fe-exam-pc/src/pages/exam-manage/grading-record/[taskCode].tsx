// 阅卷记录
import Breadcrumbs from '@/components/Breadcrumbs'
import GradingDetail from '../components/GradingDetail'
import styles from './index.module.less'
import TitleBlock from '@/components/TitleBlock'
import { Spin } from 'antd'
import RecordList from './components/RecordList'
import MarkSettingStore from '../grading-settings/store'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect, useState } from 'react'
import type { IRouteParams } from './interface'
import { useParams } from 'umi'

import MarkSettingDetail from '../grading-settings/components/MarkSettingDetail'

const MarkRecord = () => {
    const store = useLocalObservable(() => MarkSettingStore)

    const { taskCode } = useParams() as IRouteParams
    const [visible, setVisible] = useState<boolean>(false)

    const handleShowSettingDetail = () => {
        setVisible(true)
    }

    useEffect(() => {
        document.title = '阅卷记录'
        store.getGradingDetail(taskCode)
    }, [])

    return (
        <Spin spinning={store.loading}>
            <div className={styles.page_mark_record}>
                <Breadcrumbs
                    crumbData={[
                        { link: '/exam-manage/grading-manage', name: '阅卷管理' },
                        { name: '阅卷记录' },
                    ]}
                />
                <GradingDetail {...store.gradingDetail} />

                <div className={styles.content_wrapper}>
                    <TitleBlock title="阅卷记录" />

                    <RecordList
                        taskCode={taskCode}
                        handleShowSettingDetail={handleShowSettingDetail}
                    />
                </div>

                <MarkSettingDetail open={visible} onCancel={() => setVisible(false)} />
            </div>
        </Spin>
    )
}

export default observer(MarkRecord)
