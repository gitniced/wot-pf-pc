import { useParams } from 'umi'
import styles from './_layout.module.less'
import Breadcrumbs from '@/components/Breadcrumbs'
import TabBar from './components/TabBar'
import { useEffect, useState } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import type { PageProps } from '@/types'
import useJudgeTeacher from '@/components/useJudgeTeacher'
import { getDecodeInfo } from '@wotu/wotu-components'
import useHighlight from './components/useHighlight'
import aiStore from '@/modules/ai/store'
import { ChatModal } from '../../../components/AIComp'

const Index: React.FC = (props: PageProps) => {
    // /**
    //  * 当前身份code
    //  * 教师身份 14
    //  * 学生身份 15
    //  */
    // const currentIdentity = getCookie('SELECT_IDENTITY_CODE').toString()
    // const [isTeacher, setIsTeacher] = useState<boolean>(false)
    const isTeacher = useJudgeTeacher()
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const [crumbData, setCrumbData] = useState<any>([])
    const store = useLocalObservable(() => new Store())
    const { userStore } = props
    const { studentData = {}, userData = {} } = userStore! || {}
    const {
        getScheduleInfo,
        getCourseStatistics,
        getStudentStatistics,
        getClassCourseInfo,
        scheduleInfo,
        classCourseInfo,
    } = store
    const { courseCode = '' } = scheduleInfo || {}
    const { courseName, period } = classCourseInfo || {}
    const [aiModalOpen, setAiModalOpen] = useState(false)

    const { render } = useHighlight(courseCode)

    useEffect(() => {
        getScheduleInfo(scheduleCode)
        getClassCourseInfo(scheduleCode)
        !isTeacher && getStudentStatistics(scheduleCode)
    }, [scheduleCode])

    useEffect(() => {
        if (courseCode) {
            getCourseStatistics(courseCode)
            aiStore.setExchangeData({ courseCode })
        }
    }, [courseCode])

    // 身份判断
    useEffect(() => {
        if (isTeacher) {
            setCrumbData([
                {
                    link: '/mine-class',
                    name: '我的班级',
                },
                {
                    name: '教学管理',
                },
            ])
        } else {
            setCrumbData([
                {
                    link: '/mine-lesson',
                    name: '我的课程',
                },
                {
                    name: '课程详情页',
                },
            ])
        }
    }, [isTeacher])

    return (
        <div className={styles.page}>
            {render()}
            <Breadcrumbs crumbData={crumbData} />
            <div className={styles.content}>
                {/* 用户基本信息 */}
                {!isTeacher ? (
                    <div className={styles.user_card}>
                        <div className={styles.user_card_data}>
                            <div className={styles.user_card_data_title}>
                                <div>{courseName}</div>
                                <img
                                    src={
                                        'https://static.zpimg.cn/public/fe-engineer-pc/images/button%EF%BC%8Fai%E5%8A%A9%E6%95%99%402x.png'
                                    }
                                    alt=""
                                    srcSet=""
                                    onError={e => {
                                        e.target.src = defaultImage
                                    }}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setAiModalOpen(true)}
                                />
                            </div>
                            <div className={styles.user_card_data_info}>{period}学时</div>
                        </div>

                        <div className={styles.user_card_info}>
                            <div className={styles.user_card_name}>
                                {getDecodeInfo(studentData.name, '1')}
                            </div>
                            <div className={styles.user_card_class}>{studentData.className}</div>
                        </div>

                        <div className={styles.user_card_avatar}>
                            <img
                                src={userData.avatar || defaultAvatar}
                                alt=""
                                srcSet=""
                                onError={e => {
                                    e.target.src = defaultAvatar
                                }}
                            />
                        </div>
                    </div>
                ) : null}
                <div className={styles.children_content_bg} />
                <TabBar isTeacher={isTeacher} />
                <div className={styles.children_content}>{props.children}</div>
            </div>
            <ChatModal
                params={{ courseCode: aiStore?.exchangeData?.courseCode }}
                open={aiModalOpen}
                onCancel={() => setAiModalOpen(false)}
            />
        </div>
    )
}

export default inject('userStore')(observer(Index))
