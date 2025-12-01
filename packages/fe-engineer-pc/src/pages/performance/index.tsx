import { inject, observer, useLocalObservable } from 'mobx-react'
import type { PageProps } from '@/types'
import CustomTitle from '@/components/CustomTitle'
import BusinessTable from '@/components/BusinessTable'
import { getClassPerformanceColumns } from './const'
import Store from './store'
import styles from './index.module.less'
import { useMemo, useRef, useState } from 'react'
import { useSaasTitle } from '@wotu/wotu-components'
import type { FormInstance } from 'antd'
import { isEqual } from 'lodash'

const Index: React.FC<PageProps> = () => {
    useSaasTitle('课堂表现')
    const [formValue, setFormValue] = useState({})
    const store = useLocalObservable(() => new Store())
    const { getClassPerformance } = store
    const formRef = useRef<FormInstance>(null)
    const actionRef = useRef({
        reload: () => {},
    })
    const formValueRef = useRef({ value: {} })

    const classPerformanceColumns = useMemo(() => {
        return getClassPerformanceColumns(formValue)
    }, [JSON.stringify(formValue)])

    return (
        <div className={styles.page}>
            <CustomTitle title="课堂表现" marginBottom={32} />
            <div className={styles.content}>
                <BusinessTable
                    actionRef={actionRef}
                    toolBar={false}
                    columns={classPerformanceColumns}
                    request={getClassPerformance as any}
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
                    rowKey="stepCode"
                    onReset={() => {
                        setFormValue({})
                    }}
                />
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Index))
