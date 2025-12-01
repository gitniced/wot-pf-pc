import { List, Timeline } from 'antd'
import styles from './index.module.less'
import Breadcrumbs from '@/components/Breadcrumbs'
import TitleBlock from '@/components/TitleBlock'
import CourseItem from '@/components/CourseItem'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import { useEffect } from 'react'
import Empty from '@/components/Empty'
import { history } from 'umi'
import CustomSpin from '@/components/CustomSpin'
import { useSaasTitle } from '@wotu/wotu-components'
import type { SemesterCourseDetailDto } from './interface'

const Index: React.FC = () => {
    useSaasTitle(`我的课程-全部课程`)

    const store = useLocalObservable(() => new Store())

    const { hasRequest, allSemesterCourse } = store
    console.log(allSemesterCourse)

    useEffect(() => {
        store.getAllCourses()
    }, [])

    return (
        <div className={styles.page}>
            <Breadcrumbs
                crumbData={[
                    {
                        link: '/mine-lesson',
                        name: '我的课程',
                    },
                    {
                        name: '全部课程',
                    },
                ]}
            />
            <div className={styles.content}>
                <TitleBlock title="全部课程" />
                <div className={styles.timeline}>
                    {!hasRequest ? <CustomSpin /> : null}
                    {hasRequest ? (
                        allSemesterCourse.length > 0 ? (
                            <Timeline>
                                {allSemesterCourse.map(item => {
                                    const { semester, semesterText, courses = [] } = item || {}
                                    return (
                                        <Timeline.Item key={semester}>
                                            <div className={styles.timeline_item}>
                                                <div className={styles.timeline_item_title}>
                                                    {semesterText}
                                                </div>
                                                <List
                                                    grid={{
                                                        gutter: 24,
                                                        column: 4,
                                                    }}
                                                    dataSource={courses}
                                                    className={styles.list_wrap_4}
                                                    renderItem={(data: SemesterCourseDetailDto) => (
                                                        <List.Item>
                                                            <CourseItem
                                                                {...data}
                                                                clickHandler={(
                                                                    courseCode: string,
                                                                    scheduleCode: string,
                                                                ) => {
                                                                    history.push(
                                                                        `/mine-lesson/${scheduleCode}`,
                                                                    )
                                                                }}
                                                            />
                                                        </List.Item>
                                                    )}
                                                />
                                            </div>
                                        </Timeline.Item>
                                    )
                                })}
                            </Timeline>
                        ) : (
                            <Empty />
                        )
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default inject('userStore')(observer(Index))
