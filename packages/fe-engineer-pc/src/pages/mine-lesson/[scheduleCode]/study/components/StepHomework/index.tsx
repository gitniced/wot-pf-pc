import React from 'react'
import styles from './index.module.less'
import type { StudentHomeworkDto } from './interface'
import HomeWorkItem from '../StepHomeworkItem'
import type { HomeworkStatusStatisticsDto } from '../StepComponents/interface'
import Empty from '@/components/Empty'

const StepHomework = ({
    homeworkList,
    homeworkStats = [],
    isTeacher,
}: {
    homeworkList: StudentHomeworkDto[]
    /** 课后作业状态统计-教师用 */
    homeworkStats: HomeworkStatusStatisticsDto[]
    isTeacher: boolean
}) => {
    if (homeworkList.length === 0) {
        return <Empty type="component" style={{ paddingTop: '20px' }} />
    }
    return (
        <div className={styles.homework_content}>
            {homeworkList.map(item => {
                const { homeworkCode } = item || {}
                const homeworkStat = homeworkStats.find(stat => stat.homeworkCode === homeworkCode)
                return (
                    <HomeWorkItem
                        key={homeworkCode}
                        homework={item}
                        isTeacher={isTeacher}
                        homeworkStat={homeworkStat || {}}
                    />
                )
            })}
        </div>
    )
}

export default StepHomework
