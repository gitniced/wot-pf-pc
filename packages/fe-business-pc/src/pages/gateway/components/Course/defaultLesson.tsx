import { PTCourseView } from '@wotu/pt-components'
import { MOBILE_LAYOUT_ENUM } from '@wotu/pt-components/dist/esm/PTCourseView/mobile/const'
import React, { useEffect, useState } from 'react'
import type { CourseListItem } from './interface'
import { getDefaultCourseListApi } from './api'
import { getCookie } from '@/storage'
export default function DefaultLesson({
    // value = [],
    onChange,
}: {
    value?: CourseListItem[]
    onChange?: (value: CourseListItem[]) => void
}) {
    const [selectedCourses, setSelectedCourses] = useState<CourseListItem[]>([])
    let organizationCode = getCookie('SELECT_ORG_CODE')
    const getDefalutCourseList = async () => {
        const res: any = await getDefaultCourseListApi({
            organizationCode,
        })

        setSelectedCourses(res)
        onChange?.(res)
    }
    useEffect(() => {
        getDefalutCourseList()
    }, [organizationCode])

    return (
        <>
            {Boolean(selectedCourses?.length) &&
                selectedCourses?.map(item => {
                    return (
                        <PTCourseView
                            type="mobile"
                            {...item}
                            key={item.id}
                            course={item}
                            layoutStyle={MOBILE_LAYOUT_ENUM.VIEW}
                        />
                    )
                })}
        </>
    )
}
