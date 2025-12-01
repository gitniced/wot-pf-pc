import type { TeacherAssessmentTodoDto } from '../../interface'
import styles from './index.module.less'
import { Link, useParams } from 'umi'

const TodoList: React.FC<{
    teacherTodo: TeacherAssessmentTodoDto
    courseCode: string
    classCode: string
}> = ({ teacherTodo, courseCode, classCode }) => {
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    console.log(scheduleCode)
    const {
        quizPendingCount = 0,
        homeworkPendingCount = 0,
        taskAssessmentPendingCount = 0,
    } = teacherTodo || {}
    return (
        <div className={styles.todo_list}>
            <div className={styles.todo_list_title}>待办事项</div>
            <div className={styles.todo_list_content}>
                <Link
                    className={styles.todo_list_content_item}
                    to={`/quiz?courseCode=${courseCode}&classCode=${classCode}`}
                >
                    <span>{quizPendingCount}项</span>
                    <span>课堂测验批改</span>
                </Link>
                <Link
                    className={styles.todo_list_content_item}
                    to={`/homework?courseCode=${courseCode}&classCode=${classCode}`}
                >
                    <span>{homeworkPendingCount}项</span>
                    <span>课后作业批改</span>
                </Link>
                <Link
                    className={styles.todo_list_content_item}
                    to={`/projects?courseCode=${courseCode}&classCode=${classCode}`}
                >
                    <span>{taskAssessmentPendingCount}项</span>
                    <span>任务考核评分</span>
                </Link>
            </div>
        </div>
    )
}

export default TodoList
