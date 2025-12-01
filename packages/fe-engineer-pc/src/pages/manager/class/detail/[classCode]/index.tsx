import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Tabs } from 'antd'
import { useSaasTitle } from '@wotu/wotu-components'
import CustomTitle from '@/components/CustomTitle'
import BusinessTable from '@/components/BusinessTable'
import { getClassDetail } from '../../class/service'
import { getClassStudents, getClassCourses } from './service'
import { getStudentColumns, getCourseColumns } from './column'
import type { ICourseScheduleQuery } from '@/pages/manager/class/schedule/[classCode]/types'
import type { IClass } from '../../class/types'
import styles from './index.module.less'
import { useParams } from 'umi'
import ClassInfoCard from '../../components/ClassInfoCard'
import type { IStudentQueryDto } from './types'

const { TabPane } = Tabs

const Index: React.FC = () => {
    useSaasTitle('班级详情')
    const { classCode } = useParams<{ classCode: string }>()

    const studentActionRef = useRef({
        reload: () => {},
    })

    const courseActionRef = useRef({
        reload: () => {},
    })

    const [classInfo, setClassInfo] = useState<IClass | null>(null)
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('students')

    const fetchClassDetail = useCallback(async () => {
        if (!classCode) return

        try {
            setLoading(true)
            const detail = await getClassDetail(classCode)
            setClassInfo(detail)
        } finally {
            setLoading(false)
        }
    }, [classCode])

    const handleGetStudentList = useCallback(
        async (params: IStudentQueryDto) => {
            if (!classCode) {
                return {
                    data: [],
                    totalCount: 0,
                    success: false,
                }
            }

            try {
                const res = await getClassStudents({
                    ...params,
                    classCode,
                })

                return {
                    data: res.data || [],
                    totalCount: res.totalCount || 0,
                    success: true,
                }
            } catch (error) {
                return {
                    data: [],
                    totalCount: 0,
                    success: false,
                }
            }
        },
        [classCode],
    )

    const handleGetCourseList = useCallback(
        async (params: ICourseScheduleQuery) => {
            if (!classCode) {
                return {
                    data: [],
                    totalCount: 0,
                    success: false,
                }
            }

            try {
                const res = await getClassCourses({
                    ...params,
                    classCode,
                    status: 2,
                })

                return {
                    data: res.data || [],
                    totalCount: res.totalCount || 0,
                    success: true,
                }
            } catch (error) {
                return {
                    data: [],
                    totalCount: 0,
                    success: false,
                }
            }
        },
        [classCode],
    )

    const handleTabChange = (key: string) => {
        setActiveTab(key)
    }

    useEffect(() => {
        fetchClassDetail()
    }, [fetchClassDetail])

    if (loading || !classInfo) {
        return <div>加载中...</div>
    }

    return (
        <div className={styles.page}>
            <CustomTitle title="班级详情" marginBottom={24} />

            <ClassInfoCard classInfo={classInfo} />

            <div className={styles.content}>
                <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    className={styles.tabs_container}
                    destroyInactiveTabPane
                >
                    <TabPane tab="学生" key="students">
                        <BusinessTable
                            actionRef={studentActionRef}
                            search={false}
                            scroll={{ x: 1000 }}
                            columns={getStudentColumns(classCode || '')}
                            request={handleGetStudentList as any}
                            rowKey="code"
                            desensitizationList={[
                                { key: 'name', type: '1', sign: true },
                                { key: 'mobile', type: '2', sign: false },
                                { key: 'idCard', type: '3', sign: false },
                            ]}
                            pagination={{
                                showQuickJumper: true,
                                showSizeChanger: true,
                                showTotal: (total: number) => `共 ${total} 个学生`,
                            }}
                        />
                    </TabPane>
                    <TabPane tab="课程" key="courses">
                        <BusinessTable
                            actionRef={courseActionRef}
                            search={false}
                            scroll={{ x: 1200 }}
                            columns={getCourseColumns()}
                            request={handleGetCourseList as any}
                            rowKey="code"
                            pagination={{
                                showQuickJumper: true,
                                showSizeChanger: true,
                                showTotal: (total: number) => `共 ${total} 个课程`,
                            }}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default React.memo(Index)
