import React, { useEffect } from 'react'
import type { CourseListItem } from './interface'
import { getDefaultEnrollListApi } from './api'
import { getCookie } from '@/storage'
export default function DefaultEnrollList({
    // value = [],
    onChange,
}: {
    value?: CourseListItem[]
    onChange?: (value: CourseListItem[]) => void
}) {
    // const [selectedEnrollList, setSelectedEnrollList] = useState<CourseListItem[]>([])
    let organizationCode = getCookie('SELECT_ORG_CODE')
    const getDefaultEnrollList = async () => {
        const res: any = await getDefaultEnrollListApi({
            organizationCode,
            pageSize: 10,
            pageNo: 1,
            publishStatus: 1,
            statusList: [1, 2],
        })
        let { data = [] } = res

        // setSelectedEnrollList(data)
        onChange?.(data)
    }
    useEffect(() => {
        getDefaultEnrollList()
    }, [organizationCode])

    return (
        <>
            {/* {Boolean(selectedEnrollList?.length) &&
                selectedEnrollList?.map(item => {
                    return (
                        <PTEnrollCard
                            type="mobile"
                            key={item.id}
                            course={item}
                        />
                    )
                })} */}
        </>
    )
}
