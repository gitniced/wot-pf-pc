import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import TitleBlock from '@/components/TitleBlock'
import { history } from 'umi'
import type { IRoute } from 'umi'
import Store from './store'
import { useEffect } from 'react'
import type { PageProps } from '@/types'
import { getDecodeInfo, useSaasTitle } from '@wotu/wotu-components'
import MineCourseItem from './components/MineCourseItem'
import CustomSpin from '@/components/CustomSpin'
import Empty from '@/components/Empty'
import { ACADEMIC_YEAR_TYPE_MAP, LEVEL_MAP, START_POINT_MAP } from './const'

const Index: React.FC<PageProps> = props => {
    const {
        userStore: { userData, studentData },
    } = props || {}
    const {
        classCode,
        semester,
        majorName,
        level,
        className,
        startPoint,
        academicYear,
        academicYearType,
        eduLen,
    } = studentData || {}

    const store = useLocalObservable(() => new Store())

    const {
        hasRequestStudentStatistics,
        hasRequestSemesterCourses,
        getSemesterCourses,
        getStudentStatisticsByClass,
        studentStatistics,
        semesterCourses,
    } = store
    const {
        totalCourseCount = 0,
        currentSemesterCourseCount = 0,
        totalPeriod = 0,
        currentSemesterPeriod = 0,
    } = studentStatistics || {}

    const rightContent = (
        <div
            className={styles.title_right}
            onClick={() => {
                history.push('/lesson')
            }}
        >
            全部课程
            <svg className="icon" aria-hidden="true">
                <use xlinkHref={`#right`} />
            </svg>
        </div>
    )

    useSaasTitle('我的课程')

    useEffect(() => {
        if (semester !== undefined && classCode !== undefined) {
            getStudentStatisticsByClass(String(semester), classCode)
            getSemesterCourses(String(semester), classCode)
        }
    }, [semester, classCode])

    useEffect(() => {
        const parentElement = document.querySelector('.section_layout_right')
        const childElements = parentElement?.getElementsByClassName('right_content') || []
        const childElement = childElements?.[0]
        if (childElement) {
            // @ts-ignore
            childElement.style.padding = 0
        }
        return () => {
            if (childElement) {
                // @ts-ignore
                childElement.style.padding = '24px'
            }
        }
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.page_content}>
                {/* 用户基本信息 */}
                <div className={styles.user_card}>
                    <div className={styles.user_card_avatar}>
                        <img
                            src={userData.avatar || defaultAvatar}
                            onError={e => {
                                e.target.src = defaultAvatar
                            }}
                            alt=""
                            srcSet=""
                        />
                    </div>
                    <div className={styles.user_card_info}>
                        <div className={styles.user_card_name}>
                            {getDecodeInfo(userData.name, '1')}
                        </div>
                        <div className={styles.user_card_class}>
                            {majorName}-{LEVEL_MAP[level as unknown as keyof typeof LEVEL_MAP]}-
                            {START_POINT_MAP[startPoint as unknown as keyof typeof START_POINT_MAP]}
                            {eduLen ? <>{eduLen}年</> : null}
                            <span>|</span>
                            {className}
                        </div>
                    </div>
                    <div className={styles.user_card_data}>
                        <div className={styles.user_card_data_title}>课程数量</div>
                        <div className={styles.user_card_data_value}>{totalCourseCount}</div>
                        <div className={styles.user_card_data_info}>
                            本学期{currentSemesterCourseCount}门
                        </div>
                    </div>
                    <div className={styles.user_card_data}>
                        <div className={styles.user_card_data_title}>总学时</div>
                        <div className={styles.user_card_data_value}>{totalPeriod}</div>
                        <div className={styles.user_card_data_info}>
                            本学期{currentSemesterPeriod}学时
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    {semester ? (
                        <TitleBlock
                            title={`第${semester || ''}学期(${academicYear || ''}${
                                ACADEMIC_YEAR_TYPE_MAP[
                                    academicYearType as unknown as keyof typeof ACADEMIC_YEAR_TYPE_MAP
                                ] || ''
                            })`}
                            rightContent={rightContent}
                        />
                    ) : null}
                    {/* 用户课程列表 */}
                    <div className={styles.content_list}>
                        {classCode === '' || semester === '' ? (
                            classCode === '' ? (
                                <Empty text="请先加入班级" />
                            ) : (
                                <Empty text="当前没有任何排课" />
                            )
                        ) : null}
                        {hasRequestStudentStatistics && hasRequestSemesterCourses ? (
                            semesterCourses.length > 0 ? (
                                semesterCourses.map(item => (
                                    <MineCourseItem
                                        key={item.scheduleCode}
                                        {...item}
                                        // classCode={classCode}
                                    />
                                ))
                            ) : (
                                <Empty />
                            )
                        ) : (
                            <CustomSpin />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Index)) as unknown as IRoute
