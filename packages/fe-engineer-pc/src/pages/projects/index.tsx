import { inject, observer, useLocalObservable } from 'mobx-react'
import type { PageProps } from '@/types'
import CustomTitle from '@/components/CustomTitle'
import BusinessTable from '@/components/BusinessTable'
import { getClassTaskExamColumns } from './const'
import Store from './store'
import styles from './index.module.less'
import { useMemo, useRef, useState } from 'react'
import type { FormInstance } from 'antd'
import { Badge, Tabs } from 'antd'
import { useSaasTitle } from '@wotu/wotu-components'
import { isEqual } from 'lodash'

const Index: React.FC<PageProps> = () => {
    useSaasTitle('任务考核')
    const [formValue, setFormValue] = useState({})
    const store = useLocalObservable(() => new Store())
    const { pendingGradeCount = 0, getClassTaskExamList } = store
    const [currentKey, setCurrentKey] = useState('1')
    const actionRef = useRef({
        reload: () => {},
    })
    const formRef = useRef<FormInstance>(null)
    const formValueRef = useRef({ value: {} })

    const classTaskExamColumnsMemo = useMemo(() => {
        return getClassTaskExamColumns(formValue)
    }, [JSON.stringify(formValue)])

    const tabsItems = useMemo(() => {
        return [
            {
                key: 'all',
                label: '全部',
            },
            {
                key: '1',
                label: (
                    <div className={styles.badge_container}>
                        <div className={styles.badge_text}>待评分</div>
                        <Badge count={pendingGradeCount} overflowCount={99} />
                    </div>
                ),
            },
        ]
    }, [pendingGradeCount])

    return (
        <div className={styles.page}>
            <CustomTitle title="任务考核" marginBottom={32} />
            <div className={styles.content}>
                <BusinessTable
                    actionRef={actionRef}
                    toolBar={false}
                    columns={classTaskExamColumnsMemo}
                    params={{
                        pendingGrade: String(currentKey) === '1' ? true : undefined,
                    }}
                    request={getClassTaskExamList as any}
                    formProps={{
                        ref: formRef,
                        onValuesChange: (_, all) => {
                            let currentValues = formValueRef.current.value || {}
                            const itemList = [
                                'courseCode',
                                'classCode',
                                'taskCode',
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
                                let resetList = itemList.slice(0, resetEndIndex)
                                resetList.length > 0 && formRef.current.resetFields(resetList)
                                setFormValue({ ...currentValues })
                            }
                        },
                    }}
                    rowKey="projectCode"
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: total => `共 ${total} 个项目`,
                    }}
                    renderOptionBar={() => {
                        return (
                            <Tabs
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

export default observerIndex
