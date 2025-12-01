import ExamineProgress from './components/ExamineProgress'
import LearningProgress from './components/LearningProgress'
import LearningProgressTop from './components/LessonProgressTop'
import LessonStat from './components/LessonStat'
import Team from './components/Team'
import TodoList from './components/TodoList'
import styles from './index.module.less'
import { history, useParams } from 'umi'
import { inject, observer, useLocalObservable } from 'mobx-react'
import type { PageProps } from '@/types'
import { BLACK_SYSTEM_IMAGE_LIST, WHITE_SYSTEM_IMAGE_LIST } from '@/types'
import Store from './store'
import TeamList from './components/TeamList'
import TeacherTodoList from './components/TeacherTodoList'
import ClassProgress from './components/ClassProgress'
import useJudgeTeacher from '@/components/useJudgeTeacher'
import { useEffect } from 'react'
import { useSaasTitle } from '@wotu/wotu-components'
import { LEVEL_MAP } from '../const'

const Index: React.FC<PageProps> = () => {
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const isTeacher = useJudgeTeacher()
    useSaasTitle(`${isTeacher ? '教学管理-课程' : '课程详情页'}`)
    const store = useLocalObservable(() => new Store())
    const {
        isTeamLeader,
        scheduleInfo,
        classCourseInfo,
        courseStatistics,
        studentStatistics,
        studentEvaluationStatistics,
        teacherTodo,
        classProgress,
        groupProgressRank,
        classScoreRanking,
        updateTeamInfo,
        getPersonExamineStatistics,
        getTeacherTodo,
        getClassProgress,
        getGroupProgressRank,
        getClassScoreRanking,
    } = store
    const { courseCode, classCode } = scheduleInfo || {}
    const { courseName, coverUrl, period, majorName, levelName, trainLevelEduName, semester } =
        classCourseInfo || {}

    const { learningProgress = {}, assessmentProgress = {} } = studentStatistics || {}

    useEffect(() => {
        if (isTeacher) {
            getTeacherTodo(scheduleCode)
            getClassProgress(scheduleCode)
        } else {
            getPersonExamineStatistics(scheduleCode)
        }
        getGroupProgressRank(scheduleCode)
        getClassScoreRanking(scheduleCode)
    }, [scheduleCode, isTeacher])

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                {/* 课程信息 */}
                <div className={styles.content_left}>
                    <div className={styles.content_left_image}>
                        <img
                            src={coverUrl || defaultImage}
                            alt=""
                            srcSet=""
                            onError={e => {
                                e.target.src = defaultImage
                            }}
                        />
                        {WHITE_SYSTEM_IMAGE_LIST.includes(coverUrl) && (
                            <div className={styles.course_image_title_white}>{courseName}</div>
                        )}
                        {BLACK_SYSTEM_IMAGE_LIST.includes(coverUrl) && (
                            <div className={styles.course_image_title_black}>{courseName}</div>
                        )}
                    </div>

                    {/* 课程简介 */}
                    <div className={styles.content_left_info}>
                        <div>课程名称：</div>
                        <span>{courseName}</span>
                    </div>
                    <div className={styles.content_left_info}>
                        <div>学时：</div>
                        <span>{period}学时</span>
                    </div>
                    <div className={styles.content_left_info}>
                        <div>所属专业：</div>
                        <span>{majorName}</span>
                    </div>
                    <div className={styles.content_left_info}>
                        <div>课程技能所属层级：</div>
                        <span>{LEVEL_MAP[levelName as unknown as keyof typeof LEVEL_MAP]}</span>
                    </div>
                    <div className={styles.content_left_info}>
                        <div>学制：</div>
                        <span>{trainLevelEduName}</span>
                    </div>
                    <div className={styles.content_left_info}>
                        <div>开课学期：</div>
                        <span>{semester}</span>
                    </div>

                    <div
                        className={styles.content_left_more}
                        onClick={() => {
                            history.push(
                                `/mine-lesson/${scheduleCode}/introduce?courseCode=${courseCode}`,
                            )
                        }}
                    >
                        <div>查看更多课程信息</div>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#right`} />
                        </svg>
                    </div>
                </div>

                <div className={styles.content_right}>
                    <div className={styles.content_right_top}>
                        {isTeacher ? <TeamList /> : <Team updateTeamInfo={updateTeamInfo} />}
                    </div>

                    <div className={styles.content_data_view}>
                        <div>
                            {isTeacher ? (
                                <>
                                    {/* 教师待办事项 */}
                                    <TeacherTodoList
                                        teacherTodo={teacherTodo}
                                        courseCode={courseCode!}
                                        classCode={classCode!}
                                    />
                                    {/* 教师课程统计 */}
                                    <LessonStat data={courseStatistics} />
                                    {/* 教师班级进度 */}
                                    <ClassProgress classProgress={classProgress} />
                                </>
                            ) : (
                                <>
                                    {/* 学生课程统计 */}
                                    <LessonStat data={courseStatistics} />
                                    {/* 学生学习进度 */}
                                    <LearningProgress data={learningProgress} />
                                    {/* 学生考核进度 */}
                                    <ExamineProgress data={assessmentProgress} />
                                </>
                            )}
                        </div>
                        <div>
                            {/* 学生待办事项 */}
                            {!isTeacher ? (
                                <TodoList
                                    isTeamLeader={isTeamLeader}
                                    studentEvaluationStatistics={studentEvaluationStatistics}
                                />
                            ) : null}
                            {/* 学习进度和考核成绩排行榜 */}
                            <LearningProgressTop
                                groupProgressRank={groupProgressRank}
                                classScoreRanking={classScoreRanking}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Index))
