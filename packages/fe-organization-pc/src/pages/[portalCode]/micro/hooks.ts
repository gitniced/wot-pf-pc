import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import { getLocalStorage } from '@/storage'
import {
    getCognList,
    getCourseList,
    getImageText,
    getPlanList,
    judgeIsPcOrMobile,
    getEnrollList,
    getPracticeList,
    getClassList,
} from '@/utils/getMicroList'
import { getStrongData } from '@wotu/wotu-components'
import { SHOW_TYPE_ENUM } from './const'

export default class baseHooks {
    public microData: any = {}
    public homeCode: string = ''
    constructor() {
        makeAutoObservable(this)
    }

    initPage = async (code?: string) => {
        await this.getMicroPageData(code)
    }

    getMicroPageData = async (code?: string) => {
        let tempCode: string = ''
        if (code) {
            tempCode = code!
        } else {
            tempCode = this.homeCode
        }
        const organizationCode = getPortalCodeFromUrl()
        if (!organizationCode) return
        const microData: any = await Http(api.getMicroPage, 'post', {
            sid: getLocalStorage('SID'),
            code: tempCode,
            organizationCode,
        })
        let { httpStatusCode, summaryMicropageRespDto } = microData || {}
        if (Number(httpStatusCode || 0) === 200) {
            let { customContent, backgroundColor, name } = summaryMicropageRespDto || {}
            customContent = JSON.parse(customContent || '[]') || []
            customContent = customContent.map((temp: any) => getStrongData(temp))

            let ImageDefault = await getImageText(customContent, 'default').catch(() => [])
            let PlanDefault = await getPlanList(customContent, 'default').catch(() => [])
            let CognizanceDefault = await getCognList(customContent, 'default').catch(() => [])
            let CourseDefault = await getCourseList(customContent, 'default').catch(() => [])
            let EnrollDefault = await getEnrollList(customContent, 'default').catch(() => [])
            let PracticeDefault = await getPracticeList(customContent, 'default').catch(() => [])

            customContent = await Promise.all(
                customContent?.map(async (item: any) => {
                    const typeHandlers: Record<string, () => Promise<any>> = {
                        image_text: async () => {
                            let codesList: any = []
                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: async () => {
                                    return ImageDefault
                                },
                                custom: async () => {
                                    return await getImageText(
                                        customContent,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    return await getImageText(
                                        customContent,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                            }

                            codesList = await ruleHandlers?.[item?.rule]?.()

                            return {
                                ...item,
                                codes: Array.isArray(codesList) ? codesList : [],
                            }
                        },
                        plan_formula: async () => {
                            let codesList: any = []
                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: () => {
                                    return PlanDefault?.slice(0, 4) || []
                                },
                                custom: async () => {
                                    return await getPlanList(
                                        customContent,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                custom_rule: async () => {
                                    return await getPlanList(
                                        customContent,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    let byCategoryList = await getPlanList(
                                        customContent,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                    return judgeIsPcOrMobile(1, byCategoryList)
                                },
                            }
                            codesList = await ruleHandlers?.[item?.rule]?.()

                            return { ...item, content: codesList }
                        },
                        identification_result: async () => {
                            let contentList: any = []

                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: () => CognizanceDefault?.slice(0, 4) || [],
                                custom: async () => {
                                    return await getCognList(
                                        customContent,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    let byCategoryList = await getCognList(
                                        customContent,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                    return judgeIsPcOrMobile(1, byCategoryList)
                                },
                            }
                            contentList = await ruleHandlers?.[item?.rule]?.()

                            return { ...item, content: contentList }
                        },
                        course: async () => {
                            const { showType = SHOW_TYPE_ENUM.SINGLE } = item || {}
                            let codesList: any = []
                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: () => CourseDefault || [],
                                custom: async () => {
                                    return await getCourseList(
                                        customContent,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    return await getCourseList(
                                        customContent,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                group: async () => {
                                    return await getCourseList(
                                        customContent,
                                        'group',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                            }

                            if (showType === SHOW_TYPE_ENUM.SINGLE) {
                                codesList = await ruleHandlers?.[item?.rule]?.()
                                return { ...item, lessonContent: codesList }
                            } else {
                                codesList = await ruleHandlers.group()
                                return { ...item, lessonGroup: codesList }
                            }
                        },
                        enroll_card: async () => {
                            let codesList: any = []
                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: async () => {
                                    return EnrollDefault
                                },
                                custom: async () => {
                                    return await getEnrollList(
                                        customContent,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    return await getEnrollList(
                                        customContent,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                            }
                            codesList = await ruleHandlers?.[item?.rule]?.()
                            return {
                                ...item,
                                codes: Array.isArray(codesList) ? codesList : [],
                            }
                        },
                        practice: async () => {
                            let codesList: any = []
                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: async () => {
                                    return PracticeDefault || []
                                },
                                custom: async () => {
                                    return await getPracticeList(
                                        customContent,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    return await getPracticeList(
                                        customContent,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                            }
                            codesList = await ruleHandlers?.[item?.rule]?.()
                            return {
                                ...item,
                                codes: codesList,
                            }
                        },
                        class: async () => {
                            let data = await getClassList().catch(() => [])
                            return {
                                ...item,
                                classData: data,
                            }
                        },
                    }

                    const typeHandler = typeHandlers?.[item?.type]
                    if (typeHandler) {
                        return typeHandler()
                    } else {
                        return item
                    }
                }),
            )
            this.microData = { ...this.microData, customContent, backgroundColor, name }
        }
    }
}
