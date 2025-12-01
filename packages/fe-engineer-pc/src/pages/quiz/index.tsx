import { inject, observer, useLocalObservable } from 'mobx-react'
import type { PageProps } from '@/types'
import CustomTitle from '@/components/CustomTitle'
import BusinessTable from '@/components/BusinessTable'
import { getClassQuizColumns } from './const'
import Store from './store'
import styles from './index.module.less'
import { useMemo, useRef, useState } from 'react'
import type { FormInstance, TabsProps } from 'antd'
import { Badge, Tabs } from 'antd'
import { useSaasTitle } from '@wotu/wotu-components'
import { isEqual } from 'lodash'
import { useLocation } from 'umi'

const Index: React.FC<PageProps> = () => {
    useSaasTitle(`课堂测验`)
    const { query } = useLocation<{
        query: { courseCode: string; classCode: string }
    }>()
    const [formValue, setFormValue] = useState(query || {})
    const store = useLocalObservable(() => new Store())
    const { pendingGradeCount, getClassQuestionPage } = store
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

    const formValueRef = useRef({ value: query || {} })

    const classHomeworkColumnsMemo = useMemo(() => {
        return getClassQuizColumns(formValue)
    }, [JSON.stringify(formValue)])

    return (
        <div className={styles.page}>
            <CustomTitle title="课堂测验" marginBottom={32} />
            <div className={styles.content}>
                <BusinessTable
                    actionRef={actionRef}
                    toolBar={false}
                    columns={classHomeworkColumnsMemo}
                    params={{
                        tabStatus: String(currentKey) === '1' ? 2 : 1,
                        // courseCode,
                        // classCode,
                    }}
                    request={getClassQuestionPage as any}
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
                                'status',
                            ]
                            // lodash 中可以使用 _.reduce 或 _.keys/_.difference 等方法实现，以下为直接方案：
                            // 获取 all 和 currentValues 的所有 key
                            const allKeys = Object.keys({ ...all, ...currentValues })
                            // 获取两个对象值不相等的字段名
                            const diffFields = allKeys.filter(
                                key => !isEqual(all[key], currentValues[key]),
                            )
                            console.log('diffFields', diffFields)
                            // diffFields 就是所有变更了的字段名数组 区分是否是手动触发
                            if (!isEqual(all, currentValues) && diffFields.length === 1) {
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
                                let resetList = itemList.slice(resetEndIndex + 1)
                                resetList.length > 0 && formRef.current.resetFields(resetList)
                                setFormValue({ ...currentValues })
                            } else if (diffFields.length > 1) {
                                setFormValue(all)
                                formValueRef.current.value = all
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
