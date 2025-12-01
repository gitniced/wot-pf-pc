import React, { useRef, useState } from 'react'
import { useSaasTitle } from '@wotu/wotu-components'
import BusinessTable from '@/components/BusinessTable'
import CustomTitle from '@/components/CustomTitle'
import styles from './index.module.less'
import type { ITeacherScheduleQuery } from './types'
import { getTeacherScheduleList } from './service'
import { getTeacherScheduleColumns } from './column'
import { useParams } from 'umi'

const Index: React.FC = () => {
    useSaasTitle('授课情况')
    const params = useParams<{ teacherCode: string }>()
    const { teacherCode } = params

    const actionRef = useRef({
        reload: () => {},
    })

    const [_loading, _setLoading] = useState(false)

    const _handleGetTeacherScheduleList = async (queryParams: ITeacherScheduleQuery) => {
        _setLoading(true)
        try {
            const res = await getTeacherScheduleList({
                ...queryParams,
                teacherCode,
            })
            _setLoading(false)
            return {
                data: res.data || [],
                totalCount: res.totalCount || 0,
                success: true,
            }
        } catch (error) {
            _setLoading(false)
            return {
                data: [],
                totalCount: 0,
                success: false,
            }
        }
    }

    const columns = getTeacherScheduleColumns()

    return (
        <div className={styles.page}>
            <CustomTitle title="授课情况" marginBottom={32} />

            <div className={styles.content}>
                <BusinessTable
                    actionRef={actionRef}
                    search={{}}
                    scroll={{ x: 1200 }}
                    columns={columns}
                    request={_handleGetTeacherScheduleList as any}
                    rowKey="courseCode"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total: number) => `共 ${total} 条授课记录`,
                    }}
                    formProps={{
                        labelCol: { span: 6 },
                        wrapperCol: { span: 18 },
                        labelAlign: 'right',
                    }}
                />
            </div>
        </div>
    )
}

export default React.memo(Index)
