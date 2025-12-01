import { TYPE_TAG_TRANSFORMED_NUMBER } from '@/components/EnrollModal/const'
import Http from '@/servers/http'
import { getCookie, getLocalStorage } from '@/storage'

const organizationCode = getCookie('SELECT_ORG_CODE')

/**  手动选择的数据 根据传的arr 返回对应的顺序  */
const sortRes = (arr: string[], res: any) => {
    let map = new Map()
    arr.forEach((code: string, index: number) => {
        map.set(code, index)
    })
    // 根据arr数组的顺序对res数组进行排序
    res.sort((a: any, b: any) => map?.get(a.code) - map?.get(b.code))
    return res
}

/** 判断是h5还是pc   1h5     2pc    */
export const judgeIsPcOrMobile = (type: string | number, list: any[]) => {
    if (Number(type) === 1) {
        return list?.slice(0, 4) || []
    } else {
        return list || []
    }
}

/**  判断list 存不存在有一项是 默认 | 手动 | 按分类   */
export const judgeHaveType = (list: any, type = '', rule = '', isGroup = false) => {
    if (isGroup) {
        return true
    } else {
        let flag = list.some((item: any) => item.type === type && item.rule === rule)
        return flag
    }
}

/**  图文  */
export const getImageText = async (templatePreviewList: any, type: string, cds?: string[]) => {
    const flags: Record<string, boolean> = {
        default: judgeHaveType(templatePreviewList, 'image_text', 'default'),
        custom: judgeHaveType(templatePreviewList, 'image_text', 'custom'),
        by_category: judgeHaveType(templatePreviewList, 'image_text', 'by_category'),
    }

    const actions: Record<string, any> = {
        default: async () => {
            const res = await Http(
                '/business/front/imagetext/page',
                'post',
                {
                    organizationCode,
                    pageSize: 10,
                    pageNo: 1,
                    status: 1,
                },
                { repeatFilter: false },
            )
            const { data = [] } = res || {}
            return data
        },
        custom: async (item: any) => {
            const res = await Http(
                '/business/front/imagetext/imagetext_list_by_codes',
                'post',
                {
                    codes: item,
                },
                { repeatFilter: false },
            )
            return res || []
        },
        by_category: async (item: any) => {
            const res = await Http(
                '/business/front/imagetext/page',
                'post',
                {
                    organizationCode,
                    pageSize: 10,
                    pageNo: 1,
                    status: 1,
                    categoryCodes: [item?.[0]?.id],
                },
                { repeatFilter: false },
            )
            const { data = [] } = res || {}
            return data || []
        },
    }

    if (flags[type]) {
        return await actions[type](cds)
    } else {
        return []
    }
}

/**  计划公示  */
export const getPlanList = async (templatePreviewList: any[], type: string, cds?: string[]) => {
    const flags: Record<string, boolean> = {
        default: judgeHaveType(templatePreviewList, 'plan_formula', 'default'),
        custom: judgeHaveType(templatePreviewList, 'plan_formula', 'custom'),
        by_category: judgeHaveType(templatePreviewList, 'plan_formula', 'by_category'),
    }

    const actions: Record<string, any> = {
        default: async () => {
            const res: any = await Http(
                '/exam_main/plan/componentPlanList',
                'post',
                {
                    orgCode: organizationCode,
                    pageSize: 10,
                    currentPage: 1,
                    type: 'plan_formula',
                },
                { repeatFilter: false },
            )
            const { records = [] } = res || {}
            return records
        },
        custom: async (item: any[]) => {
            const res: any = await Http(
                '/exam_main/plan/componentPlans',
                'post',
                {
                    codes: item,
                    orgCode: organizationCode,
                    rule: 'custom',
                    limit: 1000,
                    type: 'plan_formula',
                },
                { repeatFilter: false },
            )
            return res || []
        },
        by_category: async (item: any) => {
            const res: any = await Http(
                '/exam_main/plan/componentPlansByCategory',
                'post',
                {
                    codes: [item?.[0]?.id],
                    orgCode: organizationCode,
                    rule: 'by_category',
                    type: 'plan_formula',
                    limit: 1000,
                },
                { repeatFilter: false },
            )
            return res || []
        },
    }

    if (flags[type]) {
        return await actions[type](cds)
    } else {
        return []
    }
}

/**  认定结果  */
export const getCognList = async (templatePreviewList: any[], type: string, cds?: string[]) => {
    const flags: Record<string, boolean> = {
        default: judgeHaveType(templatePreviewList, 'identification_result', 'default'),
        custom: judgeHaveType(templatePreviewList, 'identification_result', 'custom'),
        by_category: judgeHaveType(templatePreviewList, 'identification_result', 'by_category'),
    }

    const actions: Record<string, any> = {
        default: async () => {
            const res: any = await Http(
                '/exam_main/plan/componentPlanList',
                'post',
                {
                    orgCode: organizationCode,
                    pageSize: 10,
                    currentPage: 1,
                    type: 'identification_result',
                },
                { repeatFilter: false },
            )
            const { records = [] } = res || {}
            return records
        },
        custom: async (item: any[]) => {
            const res: any = await Http(
                '/exam_main/plan/componentPlans',
                'post',
                {
                    codes: item,
                    orgCode: organizationCode,
                    rule: 'custom',
                    limit: 1000,
                    type: 'identification_result',
                },
                { repeatFilter: false },
            )
            return res || []
        },
        by_category: async (item: any) => {
            const res: any = await Http(
                '/exam_main/plan/componentPlansByCategory',
                'post',
                {
                    codes: [item?.[0]?.id],
                    orgCode: organizationCode,
                    rule: 'by_category',
                    type: 'identification_result',
                    limit: 1000,
                },
                { repeatFilter: false },
            )
            return res || []
        },
    }

    if (flags[type]) {
        return await actions[type](cds)
    } else {
        return []
    }
}

/**  课程  */
export const getCourseList = async (templatePreviewList: any[], type: string, cds?: string[]) => {
    const flags: Record<string, boolean> = {
        default: judgeHaveType(templatePreviewList, 'course', 'default'),
        custom: judgeHaveType(templatePreviewList, 'course', 'custom'),
        by_category: judgeHaveType(templatePreviewList, 'course', 'by_category'),
        group: judgeHaveType(templatePreviewList, 'course', 'group', true),
    }

    const actions: Record<string, any> = {
        default: async () => {
            const res: any = await Http(
                '/career_main/course/batch_detail_by_organization',
                'post',
                {
                    organizationCode,
                },
                { repeatFilter: false },
            )
            return res || []
        },
        custom: async (arr: any) => {
            const res: any = await Http(
                '/career_main/course/batch_course_detail',
                'post',
                {
                    courseIds: arr,
                },
                { repeatFilter: false },
            )
            return res || []
        },
        by_category: async (arr: any[]) => {
            const ids = arr
                ?.map((i: { courseIds: number[] }) => {
                    return i?.courseIds || []
                })
                ?.filter(Boolean)
                ?.flat()
            const res: any = await Http(
                '/career_main/course/batch_course_detail',
                'post',
                {
                    courseIds: ids,
                },
                { repeatFilter: false },
            )
            return res || []
        },
        group: async (arr: any) => {
            if (arr.length === 0) return []
            const res: any = await Http(
                '/career_main/course/course_group_detail',
                'post',
                {
                    groupList: arr,
                    organizationCode,
                },
                { repeatFilter: false },
            )
            const tempGroup = (arr || []).map((i: string) => {
                const tempMap = (res || []).find((t: any) => t?.id?.toString?.() === i.toString())
                if (tempMap) {
                    return {
                        key: tempMap.id,
                        label: tempMap.name,
                        ...tempMap,
                    }
                } else {
                    return undefined
                }
            })

            return tempGroup.filter(Boolean)
        },
    }

    if (flags[type]) {
        return await actions[type](cds)
    } else {
        return []
    }
}

/**  报名  */
export const getEnrollList = async (templatePreviewList: any, type: string, cds?: string[]) => {
    const flags: Record<string, boolean> = {
        default: judgeHaveType(templatePreviewList, 'enroll_card', 'default'),
        custom: judgeHaveType(templatePreviewList, 'enroll_card', 'custom'),
        by_category: judgeHaveType(templatePreviewList, 'enroll_card', 'by_category'),
    }
    const selectedOrganizationDetail =
        getLocalStorage('USER_STORE')?.selectedOrganizationDetail || {}
    const { logo: organizationLogo, name: organizationName } = selectedOrganizationDetail || {}
    const actions: Record<string, any> = {
        default: async () => {
            const response: any = await Http(
                '/apply/front/activity/page',
                'post',
                {
                    organizationCode,
                    pageSize: 10,
                    pageNo: 1,
                    publishStatus: 1,
                    statusList: [1, 2, 3],
                },
                { repeatFilter: false },
            )
            const { data = [] } = response || {}
            return data?.map((item: any) => ({ ...item, organizationLogo, organizationName }))
        },
        custom: async (arr: any) => {
            const res: any = await Http(
                '/apply/front/activity/list_activity_saas',
                'post',
                {
                    codeList: arr,
                },
                { repeatFilter: false },
            )
            return sortRes(
                arr,
                res?.map((item: any) => ({ ...item, organizationLogo, organizationName })),
            )
        },
        by_category: async (arr: any[]) => {
            let n = TYPE_TAG_TRANSFORMED_NUMBER[arr?.[0]?.name]

            const res: any = await Http(
                '/apply/front/activity/page',
                'post',
                {
                    pageNo: 1,
                    pageSize: 10,
                    publishStatus: 1,
                    organizationCode,
                    statusList: [1, 2, 3],
                    entryCodeInteger: n,
                },
                { repeatFilter: false },
            )
            return (
                res.data?.map((item: any) => ({ ...item, organizationLogo, organizationName })) ||
                []
            )
        },
    }

    if (flags[type]) {
        return await actions[type](cds)
    } else {
        return []
    }
}

/**  练习  */
export const getPracticeList = async (templatePreviewList: any, type: string, cds?: string[]) => {
    const flags: Record<string, boolean> = {
        default: judgeHaveType(templatePreviewList, 'practice', 'default'),
        custom: judgeHaveType(templatePreviewList, 'practice', 'custom'),
        by_category: judgeHaveType(templatePreviewList, 'practice', 'by_category'),
    }
    const actions: Record<string, any> = {
        default: async () => {
            const response = await Http(
                '/question/front/practice/page',
                'post',
                {
                    organizationCode,
                    pageSize: 10,
                    pageNo: 1,
                    /**  已发布  */
                    publishStatus: 1,
                },
                { repeatFilter: false },
            )
            let tempContent = response?.data || []
            return tempContent
        },
        custom: async (item: any) => {
            const res: any = await Http(
                '/question/front/practice/list',
                'post',
                {
                    codeList: item,
                },
                { repeatFilter: false },
            )

            const { detailList = [] } = res || {}

            return detailList
        },
    }

    if (flags[type]) {
        return await actions[type](cds)
    } else {
        return []
    }
}
