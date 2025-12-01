import { useParams } from 'umi'
import ClassInfoCard from '../../components/ClassInfoCard'
import CustomTitle from '@/components/CustomTitle'
import styles from './index.module.less'
import { useEffect, useState, useMemo, useRef } from 'react'
import { getClassDetailByScheduleCode, getClassScoreTable } from './service'
import type { IClass } from '../../class/types'
import type { ClassScoreTableDto } from './types'
import BusinessTable from '@/components/BusinessTable'
import { getScoreTableColumns } from './column'
import { useSaasTitle } from '@wotu/wotu-components'

const Index: React.FC = () => {
    useSaasTitle('查看成绩')
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const [classInfo, setClassInfo] = useState<IClass | null>(null)
    const [scoreTableData, setScoreTableData] = useState<ClassScoreTableDto | null>(null)
    const actionRef = useRef({
        reload: () => {},
    })

    useEffect(() => {
        if (!scheduleCode) return
        getClassDetailByScheduleCode(scheduleCode).then(res => {
            setClassInfo(res)
        })
    }, [scheduleCode])

    const columns = useMemo(() => {
        if (!scoreTableData?.headers) return []
        return getScoreTableColumns(scoreTableData.headers)
    }, [scoreTableData?.headers])

    const handleGetScoreList = async () => {
        if (!scheduleCode) {
            return {
                data: [],
                totalCount: 0,
                success: true,
            }
        }

        const res = await getClassScoreTable({ scheduleCode })
        setScoreTableData(res)

        return {
            data: res.studentRows || [],
            totalCount: res.studentRows?.length || 0,
            success: true,
        }
    }

    const getSemesterText = (semester?: number, academicYearType?: number) => {
        if (!semester) return ''
        const yearTypeMap: Record<number, string> = {
            1: '上半年',
            2: '下半年',
        }
        return `第${semester}学期 (${scoreTableData?.academicYear}${
            yearTypeMap[academicYearType || 1]
        })`
    }

    return (
        <div className={styles.page}>
            <CustomTitle title="查看成绩" marginBottom={24} />

            <ClassInfoCard classInfo={classInfo} />

            <div className={styles.course_info}>
                <div>
                    <span>课程名称：</span>
                    <span>{scoreTableData?.courseName || '-'}</span>
                </div>
                <div>
                    <span>授课教师：</span>
                    <span>{scoreTableData?.teacherName || '-'}</span>
                </div>
                <div>
                    <span>学期：</span>
                    <span>
                        {getSemesterText(
                            scoreTableData?.semester,
                            scoreTableData?.academicYearType,
                        )}
                    </span>
                </div>
            </div>

            <BusinessTable
                actionRef={actionRef}
                search={false}
                columns={columns}
                request={handleGetScoreList}
                rowKey="studentUserCode"
                scroll={{ x: 'max-content' }}
                pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (total: number) => `总共 ${total} 个项目`,
                }}
            />
        </div>
    )
}

export default Index
