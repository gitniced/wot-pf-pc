import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { useEffect, useRef } from 'react'
import { useLocation, useRouteMatch } from 'umi'
import CustomSpin from '@/components/CustomSpin'
import { STAGE, STEP, TASK } from './const'
import TaskComponents from '../components/TaskComponents'
import StageComponents from '../components/StageComponents'
import StepComponents from '../components/StepComponents'
// import { getCookie } from '@/storage'
import useJudgeTeacher from '@/components/useJudgeTeacher'
import { useSaasTitle } from '@wotu/wotu-components'

const Index: React.FC = observer(() => {
    // /**
    //  * 当前身份code
    //  * 教师身份 14
    //  * 学生身份 15
    //  */
    // const currentIdentity = getCookie('SELECT_IDENTITY_CODE')
    const routeMatch = useRouteMatch()
    const routeQuery = useLocation()
    const {
        //@ts-ignore
        params: { scheduleCode },
    } = routeMatch || {}
    const {
        //@ts-ignore
        query: currentQuery = {},
    } = routeQuery || {}

    const store = useLocalObservable(() => new Store())

    // const [isTeacher, setIsTeacher] = useState<boolean>(false)
    const isTeacher = useJudgeTeacher()

    const {
        hasRequest,
        updateCourseCode,
        componentType,
        getTaskDetail,
        getStageDetail,
        getStepDetail,
        taskDetail,
        stageDetail,
        stepDetail,
    } = store

    const lessonRef = useRef({ id: null })

    // useEffect(() => {
    //     if (currentIdentity) {
    //         if (currentIdentity === '14') {
    //             setIsTeacher(true)
    //         } else if (currentIdentity === '15') {
    //             setIsTeacher(false)
    //         }
    //     }
    // }, [currentIdentity])

    useEffect(() => {
        if (lessonRef.current.id !== scheduleCode) {
            lessonRef.current.id = scheduleCode
            updateCourseCode(scheduleCode)
        }
    }, [scheduleCode])

    useEffect(() => {
        const keys = Reflect.ownKeys(currentQuery)
        keys.map(i => {
            switch (i) {
                case 'taskCode':
                    getTaskDetail(currentQuery[i])
                    break
                case 'stageCode':
                    getStageDetail(currentQuery[i])
                    break
                case 'stepCode':
                    getStepDetail(currentQuery[i])
                    break
                default:
                //todo
            }
        })
    }, [currentQuery])

    useSaasTitle(`${isTeacher ? '教学-学习任务' : '学习-学习任务'}`)

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                {!hasRequest ? <CustomSpin /> : null}
                {hasRequest ? (
                    <>
                        {componentType === TASK ? (
                            <TaskComponents {...taskDetail} isTeacher={isTeacher} />
                        ) : null}
                        {componentType === STAGE ? (
                            <StageComponents {...stageDetail} isTeacher={isTeacher} />
                        ) : null}
                        {componentType === STEP ? (
                            <StepComponents {...stepDetail} isTeacher={isTeacher} />
                        ) : null}
                    </>
                ) : null}
            </div>
        </div>
    )
})

export default Index
