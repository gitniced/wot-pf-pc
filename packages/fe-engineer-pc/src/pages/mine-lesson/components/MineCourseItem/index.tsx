import { history } from 'umi'
import type { SemesterCourseDetailDto } from '../../interface'
import styles from './index.module.less'
import type { ContentInfoItemProps } from './interface'
import { BLACK_SYSTEM_IMAGE_LIST, WHITE_SYSTEM_IMAGE_LIST } from '../../../../types'
const Index: React.FC<SemesterCourseDetailDto> = props => {
    const {
        courseName = '',
        coverUrl = defaultImage,
        period = 0,
        learningProgress = {},
        assessmentProgress = {},
        scheduleCode = '',
    } = props || {}
    /**进度项 */
    const ContentInfoItem: React.FC<ContentInfoItemProps> = ({ count, total, score, title }) => {
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
            {/* 课程信息卡片 */}
            <div
                className={styles.content_list_item_left}
                onClick={e => {
                    e.stopPropagation()
                    history.push(`/mine-lesson/${scheduleCode}`)
                }}
            >
                <div className={styles.content_list_item_left_image}>
                    <img
                        src={coverUrl || defaultImage}
                        onError={e => (e.target.src = defaultImage)}
                        alt=""
                        srcSet=""
                    />
                    {WHITE_SYSTEM_IMAGE_LIST.includes(coverUrl) && (
                        <div className={styles.course_image_title_white}>{courseName}</div>
                    )}
                    {BLACK_SYSTEM_IMAGE_LIST.includes(coverUrl) && (
                        <div className={styles.course_image_title_black}>{courseName}</div>
                    )}
                </div>
                <div className={styles.content_list_item_left_title}>{courseName}</div>
                <div className={styles.content_list_item_left_info}>{period}学时</div>
            </div>
            <div className={styles.content_list_item_right}>
                {/* 学习进度 */}
                <div className={styles.content_list_item_right_item}>
                    <div className={styles.content_list_item_right_item_title}>学习进度</div>
                    <div className={styles.content_list_item_right_item_content}>
                        <div className={styles.content_list_item_right_item_content_gray}>
                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="课堂测验"
                                    count={learningProgress.completedTests || 0}
                                    total={learningProgress.totalTests || 0}
                                />
                            </div>

                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="学习成果"
                                    count={learningProgress.completedOutcome || 0}
                                    total={learningProgress.totalOutcome || 0}
                                />
                            </div>

                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="课后作业"
                                    count={learningProgress.completedHomework || 0}
                                    total={learningProgress.totalHomework || 0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 考核进度 */}
                <div className={styles.content_list_item_right_item}>
                    <div className={styles.content_list_item_right_item_title}>考核进度</div>
                    <div className={styles.content_list_item_right_item_content}>
                        <div className={styles.content_list_item_right_item_content_gray}>
                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="课堂表现"
                                    count={assessmentProgress.classPerformanceScored || 0}
                                    total={assessmentProgress.classPerformanceTotal || 0}
                                />
                            </div>

                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="课后作业"
                                    count={assessmentProgress.homeworkScored || 0}
                                    total={assessmentProgress.homeworkTotal || 0}
                                />
                            </div>

                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="任务考核"
                                    count={assessmentProgress.taskAssessmentScored || 0}
                                    total={assessmentProgress.taskAssessmentTotal || 0}
                                />
                            </div>
                            <div className={styles.content_list_item_right_item_content_gray_item}>
                                <ContentInfoItem
                                    title="终结性考核"
                                    score={
                                        assessmentProgress.finalAssessmentStatus === 0
                                            ? '未出分'
                                            : assessmentProgress.finalAssessmentScore || 0
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles.content_list_item_right_item_content_blue}>
                            <ContentInfoItem
                                title="最终得分"
                                score={
                                    assessmentProgress.finalScoreStatus === 0
                                        ? '未出分'
                                        : assessmentProgress.finalScore || 0
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
