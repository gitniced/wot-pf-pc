import CoverNameCombine from '@/components/CoverNameCombine'
import styles from './index.module.less'
import type { SemesterCourseDetailDto } from '../../[studentCode]/types'

interface MineCourseItemProps {
    course: SemesterCourseDetailDto
}

const Index: React.FC<MineCourseItemProps> = props => {
    const { course } = props || {}

    const ContentInfoItem: React.FC<{
        count?: number
        total?: number
        score?: number | string
        title: string
    }> = ({ count, total, score, title }) => {
        return (
            <div className={styles.content_info_item}>
                <p>
                    {score !== undefined ? (
                        score
                    ) : (
                        <>
                            <span>{count}</span>/{total}
                        </>
                    )}
                </p>
                <div>{title}</div>
            </div>
        )
    }

    return (
        <div className={styles.content_list_item}>
            <div className={styles.content_list_item_left}>
                <div className={styles.content_list_item_left_image}>
                    <CoverNameCombine
                        name={course.courseName || ''}
                        coverUrl={course.coverUrl || ''}
                        width={298}
                    />
                </div>
                <div className={styles.content_list_item_left_title}>{course.courseName || ''}</div>
                <div className={styles.content_list_item_left_info}>{course.period || 0}学时</div>
            </div>

            <div className={styles.content_list_item_right}>
                <div className={styles.content_list_item_right_item}>
                    <div className={styles.content_list_item_right_item_title}>学习进度</div>
                    <div className={styles.content_list_item_right_item_content}>
                        <div className={styles.content_list_item_right_item_content_gray}>
                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="课堂测验"
                                    count={course.learningProgress?.completedTests || 0}
                                    total={course.learningProgress?.totalTests || 0}
                                />
                            </div>

                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="学习成果"
                                    count={course.learningProgress?.completedOutcome || 0}
                                    total={course.learningProgress?.totalOutcome || 0}
                                />
                            </div>

                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="课后作业"
                                    count={course.learningProgress?.completedHomework || 0}
                                    total={course.learningProgress?.totalHomework || 0}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.content_list_item_right_item}>
                    <div className={styles.content_list_item_right_item_title}>考核进度</div>
                    <div className={styles.content_list_item_right_item_content}>
                        <div className={styles.content_list_item_right_item_content_gray}>
                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="课堂表现"
                                    count={course.assessmentProgress?.classPerformanceScored || 0}
                                    total={course.assessmentProgress?.classPerformanceTotal || 0}
                                />
                            </div>

                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="课后作业"
                                    count={course.assessmentProgress?.homeworkScored || 0}
                                    total={course.assessmentProgress?.homeworkTotal || 0}
                                />
                            </div>

                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="任务考核"
                                    count={course.assessmentProgress?.taskAssessmentScored || 0}
                                    total={course.assessmentProgress?.taskAssessmentTotal || 0}
                                />
                            </div>
                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="终结性考核"
                                    score={
                                        course.assessmentProgress?.finalAssessmentStatus === 0
                                            ? '未出分'
                                            : course.assessmentProgress?.finalAssessmentScore || 0
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles.content_list_item_right_item_content_blue}>
                            <ContentInfoItem
                                title="最终得分"
                                score={
                                    course.assessmentProgress?.finalScoreStatus === 0
                                        ? '未出分'
                                        : course.assessmentProgress?.finalScore || 0
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
