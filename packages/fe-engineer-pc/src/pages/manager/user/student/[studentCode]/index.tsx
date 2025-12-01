import { Avatar, Empty, Timeline } from 'antd'
import MineCourseItem from '../components/MineCourseItem'
import styles from './index.module.less'
import CustomTitle from '@/components/CustomTitle'
import { useParams } from 'umi'
import { useEffect, useMemo, useState } from 'react'
import { getStudentCourses } from './service'
import type { StudentStatisticsRespDto } from './types'
import { TRAIN_LEVEL_MAP, START_POINT_MAP } from '../../teacher/[teacherCode]/const'
import { useSaasTitle } from '@wotu/wotu-components'

const Index: React.FC = () => {
    useSaasTitle('学生详情')
    const { studentCode } = useParams<{ studentCode: string }>()
    const [studentCourse, setStudentCourse] = useState<StudentStatisticsRespDto | null>(null)

    useEffect(() => {
        if (!studentCode) return
        getStudentCourses(studentCode).then(res => {
            setStudentCourse(res || null)
        })
    }, [studentCode])

    const majorLevelEduText = useMemo(() => {
        if (!studentCourse) return ''
        const majorName = studentCourse?.majorName || ''
        const trainLevel = TRAIN_LEVEL_MAP[studentCourse?.trainLevel || 0] || ''
        const startPoint = START_POINT_MAP[studentCourse?.startPoint || 0] || ''
        const eduLen = studentCourse?.eduLen || ''

        return `${majorName} - ${trainLevel} - ${startPoint}${eduLen}年`
    }, [studentCourse])

    return (
        <div className={styles.page}>
            <CustomTitle title="学生详情" marginBottom={32} />

            <div className={styles.content}>
                <div className={styles.info_title}>
                    <div className={styles.info_title_left}>
                        <Avatar src={studentCourse?.avatar || defaultAvatar} size={64} />
                        <div className={styles.info_title_left_content}>
                            <div className={styles.info_title_left_content_title}>
                                {studentCourse?.userName || ''}
                            </div>
                            <div className={styles.info_title_left_content_value}>
                                <span>{majorLevelEduText}</span>
                                <span className={styles.info_title_left_content_value_separator} />
                                <span>{studentCourse?.className || ''}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.info_title_right}>
                        <div className={styles.info_title_right_item}>
                            <div className={styles.info_title_right_item_title}>课程数量</div>
                            <div className={styles.info_title_right_item_value}>
                                {studentCourse?.totalCourseCount || 0}
                            </div>
                        </div>
                        <div className={styles.info_title_right_item}>
                            <div className={styles.info_title_right_item_title}>总学时</div>
                            <div className={styles.info_title_right_item_value}>
                                {studentCourse?.totalPeriod || 0}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.hr_line} />

                <Timeline className={styles.timeline}>
                    {studentCourse?.courselist?.length ? (
                        studentCourse?.courselist?.map(item => (
                            <Timeline.Item className={styles.timeline_item} key={item.semester}>
                                <div className={styles.timeline_item_title}>
                                    {item.semesterText}
                                </div>
                                <div className={styles.timeline_item_content}>
                                    {item.courses?.map(course => (
                                        <MineCourseItem course={course} key={course.scheduleCode} />
                                    ))}
                                </div>
                            </Timeline.Item>
                        ))
                    ) : (
                        <Empty description="暂无课程数据" />
                    )}
                </Timeline>
            </div>
        </div>
    )
}

export default Index
