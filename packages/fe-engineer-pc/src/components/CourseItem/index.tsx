import React from 'react'
import styles from './index.module.less'
import type { SemesterCourseDetailDto } from './interface'
import { BLACK_SYSTEM_IMAGE_LIST, WHITE_SYSTEM_IMAGE_LIST } from '../../types'

const CourseItem = (props: SemesterCourseDetailDto) => {
    const {
        courseCode,
        scheduleCode,
        coverUrl = defaultImage,
        courseName = '',
        period = 0,
        finalScore = 0,
        clickHandler,
    } = props || {}
    return (
        <a onClick={() => clickHandler(courseCode, scheduleCode)} className={styles.course_item}>
            <div className={styles.course_image}>
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
            <div className={styles.course_title}>{courseName}</div>
            <div className={styles.course_info}>
                <div className={styles.course_info_item}>{period}学时</div>
                <div className={styles.course_info_item}>
                    {finalScore ? (
                        <>
                            考核<span>{finalScore}分</span>
                        </>
                    ) : null}
                </div>
            </div>
        </a>
    )
}

export default CourseItem
