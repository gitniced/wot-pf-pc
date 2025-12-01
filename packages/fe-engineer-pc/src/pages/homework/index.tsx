import { inject, observer, useLocalObservable } from 'mobx-react'
import type { PageProps } from '@/types'
import CustomTitle from '@/components/CustomTitle'
import BusinessTable from '@/components/BusinessTable'
import { getClassHomeworkColumns } from './const'
import Store from './store'
import styles from './index.module.less'
import { useMemo, useRef, useState } from 'react'
import type { FormInstance, TabsProps } from 'antd'
import { Badge, Tabs } from 'antd'
import { useSaasTitle } from '@wotu/wotu-components'
import { isEqual } from 'lodash'

const Index: React.FC<PageProps> = () => {
    useSaasTitle(`课后作业`)
    // const {
    //     query: { courseCode, classCode },
    // } = useLocation<{
    //     query: { courseCode: string; classCode: string }
    // }>()
    const [formValue, setFormValue] = useState({})
    const store = useLocalObservable(() => new Store())
    const { pendingGradeCount, getHomeWorkList } = store
    const [currentKey, setCurrentKey] = useState('1')
    const tabsItems = useMemo<TabsProps['items']>(
        () => [
            {
                key: 'all',
                label: '全部',
            },
            {
                key: '1',
                label: (
                    <div className={styles.badge_container}>
                        <div className={styles.badge_text}>待批改</div>
                        <Badge count={pendingGradeCount} overflowCount={99} />
                    </div>
                ),
            },
        ],
        [pendingGradeCount],
    )

    const formRef = useRef<FormInstance>(null)

    const actionRef = useRef({
        reload: () => {},
    })

    const formValueRef = useRef({ value: {} })

    const classHomeworkColumnsMemo = useMemo(() => {
        return getClassHomeworkColumns(formValue)
    }, [JSON.stringify(formValue)])

    return (
        <div className={styles.page}>
            <CustomTitle title="课后作业" marginBottom={32} />
            <div className={styles.content}>
                <BusinessTable
                    actionRef={actionRef}
                    toolBar={false}
                    columns={classHomeworkColumnsMemo}
                    params={{
                        pendingGrade: String(currentKey) === '1' ? true : undefined,
                        // courseCode,
                        // classCode,
                    }}
                    request={getHomeWorkList as any}
                    formProps={{
                        ref: formRef,
                        onValuesChange: (_, all) => {
                            let currentValues = formValueRef.current.value || {}
                            const itemList = [
                                'courseCode',
                                'classCode',
                                'taskCode',
                                'stageCode',
                                'stepCode',
                                'activityCode',
                                'homeworkCode',
                                'status',
                            ].reverse()

                            if (!isEqual(all, currentValues)) {
                                let resetEndIndex: number = 0
                                itemList.some((key, index) => {
                                    if (all[key] && all[key] !== currentValues[key]) {
                                        currentValues[key] = all[key]
                                        resetEndIndex = index
                                        return true
                                    } else {
                                        if (Object.prototype.hasOwnProperty.call(all, key)) {
                                            currentValues[key] = all[key]
                                        }
                                        return false
                                    }
                                })
                                console.log('all', all)
                                console.log('currentValues', currentValues)
                                let resetList = itemList.slice(0, resetEndIndex)
                                resetList.length > 0 && formRef.current.resetFields(resetList)
                                setFormValue({ ...currentValues })
                            }
                        },
                    }}
                    rowKey="homeworkCode"
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: total => `共 ${total} 个项目`,
                    }}
                    renderOptionBar={() => {
                        return (
                            <Tabs
                                className={styles.tabs}
                                activeKey={currentKey}
                                items={tabsItems}
                                onChange={e => {
                                    setCurrentKey(e)
                                }}
                            />
                        )
                    }}
                    onReset={() => {
                        setFormValue({})
                    }}
                />
            </div>
        </div>
    )
}

const observerIndex = inject('userStore')(observer(Index))

observerIndex.title = '课后作业'

export default observerIndex
