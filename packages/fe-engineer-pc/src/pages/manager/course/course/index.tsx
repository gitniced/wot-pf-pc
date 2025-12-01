import React, { useRef, useState, useEffect } from 'react'
import { Tabs, message } from 'antd'
import { useSaasTitle } from '@wotu/wotu-components'
import BusinessTable from '@/components/BusinessTable'
import CustomTitle from '@/components/CustomTitle'
import styles from './index.module.less'
import type { ICourse, ICoursePageQuery } from './types'
import {
    getCourseList,
    updateCourseTemplateStatus,
    updateCourseQualityStatus,
    getCourseNum,
} from './service'
import { getCourseTableColumns } from './column'

const { TabPane } = Tabs

const Index: React.FC = () => {
    useSaasTitle('课程管理')
    const actionRef = useRef({
        reload: () => {},
    })

    const [_loading, _setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<string>('0')
    const [statusCounts, setStatusCounts] = useState<Record<string, number>>({
        '0': 0,
        '1': 0,
        '2': 0,
    })

    // 获取课程数量统计
    const fetchCourseNum = async () => {
        try {
            const res = await getCourseNum()
            setStatusCounts({
                '0': res.courseNum || 0,
                '1': res.designCourseNum || 0,
                '2': res.useCourseNum || 0,
            })
        } catch (error) {
            console.error('获取课程数量失败:', error)
        }
    }

    // 组件挂载时获取课程数量
    useEffect(() => {
        fetchCourseNum()
    }, [])

    const _handleGetCourseList = async (params: ICoursePageQuery) => {
        _setLoading(true)
        try {
            const { tags, ...otherParams } = params
            const queryParams = {
                ...otherParams,
                status: activeTab === '0' ? undefined : Number(activeTab),
                // 处理标签查询参数转换
                qualityStatus: tags === 'quality' ? 1 : undefined,
                templateStatus: tags === 'template' ? 1 : undefined,
            }

            const res = await getCourseList(queryParams)
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

    const handleTemplateStatusChange = async (checked: boolean, record: ICourse) => {
        await updateCourseTemplateStatus({
            code: record.code,
            templateStatus: checked ? 1 : 0,
        })
        message.success(`${checked ? '已设为模版课程' : '已取消模版课程'}`)
        actionRef.current.reload()
        fetchCourseNum()
    }

    const handleQualityStatusChange = async (checked: boolean, record: ICourse) => {
        await updateCourseQualityStatus({
            code: record.code,
            qualityStatus: checked ? 1 : 0,
        })
        message.success(`${checked ? '已设为优质课程' : '已取消优质课程'}`)
        actionRef.current.reload()
        fetchCourseNum()
    }

    const handleTabChange = (key: string) => {
        setActiveTab(key)
        setTimeout(() => {
            actionRef.current.reload()
        }, 0)
    }

    const columns = getCourseTableColumns(handleTemplateStatusChange, handleQualityStatusChange)

    return (
        <div className={styles.page}>
            <CustomTitle title="课程管理" marginBottom={32} />

            <div className={styles.content}>
                <BusinessTable
                    actionRef={actionRef}
                    search={{}}
                    scroll={{ x: 1400 }}
                    columns={columns}
                    request={_handleGetCourseList as any}
                    rowKey="code"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total: number) => `共 ${total} 个课程`,
                    }}
                    renderOptionBar={() => (
                        <Tabs
                            activeKey={activeTab}
                            onChange={handleTabChange}
                            className={styles.tabs}
                        >
                            <TabPane tab={`全部`} key="0" />
                            <TabPane tab={`设计中 (${statusCounts['1']})`} key="1" />
                            <TabPane tab={`使用中 (${statusCounts['2']})`} key="2" />
                        </Tabs>
                    )}
                />
            </div>
        </div>
    )
}

export default React.memo(Index)
