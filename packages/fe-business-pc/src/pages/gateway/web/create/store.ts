import api from './api'
import http from '@/servers/http'
import { getCookie, getLocalStorage } from '@/storage'
// @ts-ignore
import { cloneDeep } from 'lodash'
import { action, makeObservable, observable } from 'mobx'
import { COMPONENT_TYPE, SAVE_TYPE } from '../../components/const'
import type { ComponentsItem, PreviewItem } from '../../components/utils/interface'
import { parsePortalType, parseType } from '@/utils/parseValue'
import { dieUser } from '@/utils/urlUtils'
import { getDefaultCourseListApi } from '../../components/Course/api'
import {
    getCognList,
    getCourseList,
    getImageText,
    getPlanList,
    judgeIsPcOrMobile,
    getEnrollList,
    getPracticeList,
} from '@/utils/getMicroList'
import { ADD_TYPE_ENUM, SHOW_TYPE_ENUM } from './components/ActionBar/Course/const'
import { findSiteData } from '@wotu/wotu-components'
import { message } from 'antd'

export enum UPDATE_TYPE {
    ADD = 'add',
    EDIT = 'edit',
    DELETE = 'delete',
    FIX = 'fix',
    COVER = 'cover',
}

let instance: PageStore | null

export default class PageStore {
    /**  选择跳转链接数据  */
    public customLinkList: any[] = []
    /**  页面标题 */
    public pageTitle: string = '页面标题'

    /** 页面颜色 */
    public pageColor: string = '#ffffff'

    /** 预览code的暂存 */
    public microCode: string = ''

    /** 左侧的待拖动组件列表 */
    public componentsList: ComponentsItem[] = []

    /** 视图组件列表 */
    public previewList: PreviewItem[] = []

    /** 图文的默认内容 */
    public defaultContent: any[] = []

    /** 计划公示的默认内容 */
    public defaultPlanContent: any[] = []

    /**评价计划类型枚举列表 */
    public planTypeList: any[] = []

    /** 微页面的状态：草稿或者发布 */
    public organizationCode: string = ''

    /** 微页面的状态：草稿或者发布 */
    public status: SAVE_TYPE = 0

    /** 是否未保存 如果未保存 退出时提示 */
    public unSave: boolean = false

    /** 是否正在进行中 用于loading效果 */
    public ispadding: boolean = false
    /** 图文 选择分类的选择的数据  */
    public imgTextCategory = {}

    /**
     * 图文内容 会根据另外一个codeList 对应的查出来
     * @memberof PageStore
     */
    public imageTexts = []
    public courseList = []
    public type: 'pc' | 'mobile'

    /**  刷题的默认规则的默认内容 默认展示最近的4个已发布的刷题  */
    public defaultBrushQuestContent: any[] = []

    constructor(type: 'pc' | 'mobile' = 'mobile') {
        this.type = type
        // makeAutoObservable(this)
        /**
         * 由于mobx makeAutoObservable 不支持继承
         * 所以使用 makeObservable 来对每一个 public 属性进行 observable
         */
        makeObservable(this, {
            ispadding: observable,
            unSave: observable,
            status: observable,
            organizationCode: observable,
            defaultContent: observable,
            defaultPlanContent: observable,
            previewList: observable,
            componentsList: observable,
            microCode: observable,
            pageColor: observable,
            pageTitle: observable,
            defaultBrushQuestContent: observable,
            customLinkList: observable,
            getLinkList: action,
        })
    }

    /**  获取跳转链接数据  */
    getLinkList = (list = []) => {
        this.customLinkList = list
    }

    // 获取组件列表
    getComponentList = async () => {
        const selectOrgCode = getCookie('SELECT_ORG_CODE')
        const { siteData } = getLocalStorage('SITE_STORE') || {}
        const alias =
            getCookie('ALIAS') || findSiteData(siteData, 'alias', { findKey: 'baseInfo' }) || ''
        const orgCode = ['ORG17095685BU41LSE8', 'ORG17095685BTA7G3CW']

        const params = {
            organizationCode: selectOrgCode,
            type: parsePortalType(this.type),
            accessType: 3,
            identity: getCookie('SELECT_IDENTITY_CODE'),
        }

        let data: any = (await http(api.getComponentList, 'get', params)) || []
        if (orgCode.includes(selectOrgCode) && alias === 'gyxx') {
            this.componentsList = data
        } else {
            let copyData = cloneDeep(data)
            // let contentComponent =
            //     copyData?.find((item: { alias: string }) => item.alias === 'CONTENT_COMPONENT') ||
            //     {}
            // contentComponent.children = contentComponent.children.slice(0, -1)
            this.componentsList = copyData
        }
    }
    /**
     * 设置是否正在进行中
     * @param flag
     */
    setIspadding(flag: boolean) {
        this.ispadding = flag
    }
    /**
     * 更新页面的颜色
     * @param color
     */
    updatePageColor = (color: string) => {
        this.unSave = true
        this.pageColor = color
    }
    /**
     *  更新页面标题
     * @param title  标题
     */
    updatePageTitle = (title: string) => {
        this.unSave = true
        this.pageTitle = title
    }

    /**
     * 获取现在正在选中的元素
     * @returns PreviewItem
     */
    getNowActive = (): PreviewItem | undefined => {
        return this.previewList?.find?.(i => !!i.active)
    }
    /**
     *  重置现有的元素的 选中状态
     */
    resetActive = () => {
        this.previewList.forEach(item => {
            item.active = false
        })
    }

    /**
     *  更新微页面的列表组件
     *  采用类似于 redux的 dispatch的方式对函数进行派发
     * @param {keyof UPDATE_TYPE} type UPDATE_TYPE 派发的key
     * @param param1
     */
    updatePreviewList = (
        type: UPDATE_TYPE[keyof UPDATE_TYPE],
        {
            list,
            previewItem,
            from,
            to,
            id,
        }: {
            list?: PreviewItem[]
            previewItem?: PreviewItem
            from?: number
            to?: number
            id?: number
        },
    ) => {
        switch (type) {
            case UPDATE_TYPE.ADD:
                this.unSave = true
                this.addPreviewList(previewItem as PreviewItem, to as number)
                break
            case UPDATE_TYPE.DELETE:
                this.unSave = true
                this.deletePreviewList(id as number)
                break
            case UPDATE_TYPE.EDIT:
                this.unSave = true
                this.editPreviewList(from as number, to as number)
                break
            case UPDATE_TYPE.FIX:
                this.unSave = true
                this.fixPreviewList(previewItem as PreviewItem)
                break
            case UPDATE_TYPE.COVER:
                this.coverPreviewList(list as PreviewItem[])
                break
            default:
        }
    }
    /**
     * 在指定位置新增 一个新的组件元素
     * @param previewItem  组件
     * @param to 插入位置
     */
    addPreviewList = (previewItem: PreviewItem, to: number) => {
        previewItem.id = new Date().getTime()
        const tempPreviewList: PreviewItem[] = cloneDeep(this.previewList)
        this.resetActive()
        previewItem.active = true

        console.log(tempPreviewList, previewItem)
        /** 单独处理联系客服1.放到第一个2.不允许重复添加 */
        if (previewItem.type === COMPONENT_TYPE.CUSTOMER) {
            if (this.previewList?.[0]?.type !== COMPONENT_TYPE.CUSTOMER) {
                console.log(tempPreviewList)
                tempPreviewList.splice(0, 0, previewItem)
                this.previewList = tempPreviewList
            } else {
                message.error('不允许重复添加联系客服')
            }
            return
        }

        tempPreviewList.map(item => (item.active = false))
        tempPreviewList.splice(to, 0, previewItem)
        this.previewList = tempPreviewList
    }
    /**
     *  根据id删除组件list里面的某一个元素
     * @param id  组件id
     */
    deletePreviewList = (id: number) => {
        let tempPreviewList: PreviewItem[] = cloneDeep(this.previewList)
        tempPreviewList = tempPreviewList.filter(tempPreviewItem => tempPreviewItem.id !== id)
        this.previewList = tempPreviewList.map((item, i) => {
            return { ...item, active: i === 0 }
        })
    }

    /**
     * 组件list 位置交换
     * @param from  来源
     * @param to  去处
     */
    editPreviewList = (from: number, to: number) => {
        const tempPreviewList: PreviewItem[] = cloneDeep(this.previewList)
        const fromItem = cloneDeep(this.previewList[from])
        tempPreviewList.map(item => (item.active = false))
        fromItem.active = true
        if (from > to) {
            tempPreviewList.splice(to, 0, fromItem)
            tempPreviewList.splice(from + 1, 1)
        } else {
            tempPreviewList.splice(to + 1, 0, fromItem)
            tempPreviewList.splice(from, 1)
        }

        this.previewList = tempPreviewList
    }

    /**
     *  根据id 替换列表中的 某一项组件
     * @param previewItem 组件列表
     */
    fixPreviewList = (previewItem: PreviewItem) => {
        const tempPreviewItem = cloneDeep(previewItem)
        const tempPreviewList: PreviewItem[] = cloneDeep(this.previewList)
        tempPreviewList.map(item => (item.active = false))
        this.previewList = tempPreviewList.map(item => {
            if (item.id === tempPreviewItem.id) {
                return tempPreviewItem
            }
            return item
        })
    }

    /**
     *  直接覆盖整个组件list
     * @param list
     */
    coverPreviewList = (list: PreviewItem[]) => {
        this.previewList = list
    }

    /**
     * 清除所有的选中状态
     */
    cleanActive = () => {
        const tempPreviewList: PreviewItem[] = cloneDeep(this.previewList)
        tempPreviewList.map(item => (item.active = false))
        this.previewList = tempPreviewList
    }
    /**
     *  保存草稿
     * @returns
     */
    saveDraft = () => {
        return this.savePreviewData(SAVE_TYPE.DRAFT)
    }

    /**
     *  获取用户中心传递到当前机构code
     *  或者当编辑状态获取到了当前微页面绑定到this.organizationCode
     *  发布 和保存草稿
     * @param status
     * @returns
     */
    savePreviewData = (status: SAVE_TYPE) => {
        const selectOrgCode = getCookie('SELECT_ORG_CODE')
        let currentOrganizationCode = selectOrgCode

        if (this.organizationCode) {
            currentOrganizationCode = this.organizationCode
        }
        let tempCustomContent = cloneDeep(this.previewList)

        /**
         *  处理图文组件的codes
         *  处理图文导航组件的loading
         */

        tempCustomContent = tempCustomContent.map((item: any) => {
            if (item.type === 'image_text' || item.type === 'content') {
                const arr = item?.codes || item?.content || []
                delete item.sort
                delete item.content

                let codes =
                    arr?.map((codeObj: { code: any }) => codeObj?.code)?.filter(Boolean) || []
                // /**  跟 彭用美定的规范 当是按分类选择的时候 不传codes  */
                /**  跟 彭用美定的规范 当是按分类选择的时候 不传codes  */
                // codes = item?.rule === 'by_category' ? [] : codes

                item.type = 'image_text'

                // @ts-ignore
                item.selectCategory =
                    item.selectCategory
                        ?.map(i => {
                            return {
                                id: i.id,
                                name: i.name,
                            }
                        })
                        ?.filter(Boolean) || []

                return { ...item, codes }
            } else if (item.type === 'tab') {
                delete item.sort
                item?.list?.forEach((_item: { loading: any; sort: any; url: any }) => {
                    delete _item.loading
                    delete _item.sort
                    delete _item?.url?.url
                })
                return { ...item }
            } else if (item.type === 'course') {
                delete item.lessonGroup
                delete item.lessonContent
                delete item.courseList
                item.showType === SHOW_TYPE_ENUM.GROUP ? (item.rule = 'custom') : ''
                return { ...item }
            } else if (['identification_result', 'plan_formula'].includes(item.type)) {
                item.rule = item.rule === 'custom_rule' ? 'custom' : item.rule
                const codeList =
                    (item.type === 'identification_result'
                        ? item.content
                        : item.codes || []
                    )?.filter(Boolean) || []
                const codes =
                    codeList?.map((content: any) => content.code || content.id)?.filter(Boolean) ||
                    []

                // 去掉多余的字段
                delete item.sort
                delete item.content

                return { ...item, codes }
            } else if (item.type === 'practice') {
                const codeList = item.codes || []
                const codes = codeList?.map((codeObj: any) => codeObj?.code).filter(Boolean) || []
                return { ...item, codes }
            } else if (item.type === 'enroll_card') {
                delete item.content
                item.codes = item.codes?.map((i: any) => i.code)?.filter(Boolean) || []
                return { ...item }
            } else {
                delete item?.sort

                return item
            }
        })

        // 处理认定结果的
        const requestParams: Record<string, unknown> = {
            backgroudColor: this.pageColor,
            name: this.pageTitle,
            organizationCode: currentOrganizationCode,
            customContent: tempCustomContent,
            status,
            type: parseType(this.type),
        }
        if (this.microCode) {
            requestParams.code = this.microCode
        }

        let saveApi: string = ''

        // 判断是发布还是保存草稿
        saveApi = status === SAVE_TYPE.DRAFT ? api.micropageInsert : api.micropagePublish

        return http(saveApi, 'POST', { ...requestParams })
            .then(res => {
                this.unSave = false
                return Promise.resolve(res)
            })
            .catch(err => {
                return Promise.reject(err)
            })
    }

    /**
     *  获取页面的 数据
     *  没有权限的话就跳转 user/login 或者 404
     * @param code
     * @returns
     */
    getPreviewData = async (code: string) => {
        if (!code) return
        this.microCode = code
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const sid = getLocalStorage('SID')

        return http(`${api.micropageDetail}`, 'POST', {
            sid,
            code,
            organizationCode,
        }).then(async res => {
            const { httpStatusCode, summaryMicropageRespDto } = (res || {}) as any
            /**
             * 没有权限的逻辑
             * 会直接跳转到 登录页 没有登录页的话 就404
             */
            if (httpStatusCode === '401') {
                return dieUser()
            }

            const {
                backgroundColor,
                customContent,
                name,
                status,
                organizationCode: realOrganizationCode,
                type: MicroType,
            } = (summaryMicropageRespDto || {}) as any

            /**
             * 页面内容解出来
             */
            this.pageColor = backgroundColor ? backgroundColor : this.pageColor
            this.pageTitle = name ? name : this.pageTitle
            this.status = status ?? this.status
            this.organizationCode = realOrganizationCode

            /*
                临时的 页面list  后面要做处理 
             */
            let templatePreviewList: any[]
            /**
             * 解析json 串
             */
            try {
                templatePreviewList = customContent ? JSON.parse(customContent || '[]') : []
            } finally {
                templatePreviewList ||= []
            }

            let ImageDefault = await getImageText(templatePreviewList, 'default').catch(() => [])
            let PlanDefault = await getPlanList(templatePreviewList, 'default').catch(() => [])
            let CognizanceDefault = await getCognList(templatePreviewList, 'default').catch(
                () => [],
            )
            let CourseDefault = await getCourseList(templatePreviewList, 'default').catch(() => [])
            let EnrollDefault = await getEnrollList(templatePreviewList, 'default').catch(() => [])
            let PracticeDefault = await getPracticeList(templatePreviewList, 'default').catch(
                () => [],
            )

            templatePreviewList = await Promise.all(
                templatePreviewList?.map(async (item: any) => {
                    const typeHandlers: Record<string, () => Promise<any>> = {
                        image_text: async () => {
                            if (item?.selectMode === 2 || item.rule === 'custom_rule') {
                                item.rule = 'custom'
                            } else if (item?.selectMode === 1) {
                                item.rule = 'default'
                            }

                            let codesList: any = []
                            /**  type 1移动 2pc  */
                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: async () => {
                                    return judgeIsPcOrMobile(MicroType, ImageDefault)
                                },
                                custom: async () => {
                                    return await getImageText(
                                        templatePreviewList,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    let byCategoryList = await getImageText(
                                        templatePreviewList,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                    return judgeIsPcOrMobile(MicroType, byCategoryList)
                                },
                            }

                            codesList = await ruleHandlers?.[item?.rule]()

                            delete item?.selectMode
                            return {
                                ...item,
                                codes: Array.isArray(codesList) ? codesList : [],
                            }
                        },
                        plan_formula: async () => {
                            let codesList: any = []
                            item.rule = item.rule === 'custom_rule' ? 'custom' : item.rule
                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: () => {
                                    return PlanDefault?.slice(0, 4) || []
                                },
                                custom: async () => {
                                    return await getPlanList(
                                        templatePreviewList,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    let byCategoryList = await getPlanList(
                                        templatePreviewList,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                    return judgeIsPcOrMobile(1, byCategoryList)
                                },
                            }
                            codesList = await ruleHandlers?.[item?.rule]()

                            return { ...item, codes: codesList }
                        },
                        identification_result: async () => {
                            let contentList: any = []
                            item.rule = item.rule === 'custom_rule' ? 'custom' : item.rule

                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: () => CognizanceDefault?.slice(0, 4) || [],
                                custom: async () => {
                                    return await getCognList(
                                        templatePreviewList,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    let byCategoryList = await getCognList(
                                        templatePreviewList,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                    return judgeIsPcOrMobile(1, byCategoryList)
                                },
                            }
                            contentList = await ruleHandlers?.[item?.rule]()

                            return { ...item, content: contentList }
                        },
                        course: async () => {
                            const {
                                showType = SHOW_TYPE_ENUM.SINGLE,
                                rule = ADD_TYPE_ENUM.DEFAULT,
                            } = item || {}
                            let codesList: any = []
                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: () => CourseDefault || [],
                                custom: async () => {
                                    return await getCourseList(
                                        templatePreviewList,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    return await getCourseList(
                                        templatePreviewList,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                group: async () => {
                                    return await getCourseList(
                                        templatePreviewList,
                                        'group',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                            }

                            if (showType === SHOW_TYPE_ENUM.SINGLE) {
                                codesList = await ruleHandlers?.[rule]?.()
                                return { ...item, lessonContent: codesList }
                            } else {
                                codesList = await ruleHandlers.group()
                                return { ...item, lessonGroup: codesList }
                            }
                        },
                        enroll_card: async () => {
                            let codesList: any = []
                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: () => EnrollDefault || [],
                                custom: async () => {
                                    return await getEnrollList(
                                        templatePreviewList,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    return await getEnrollList(
                                        templatePreviewList,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                            }
                            codesList = await ruleHandlers?.[item?.rule]()

                            item.content = MicroType === 1 && codesList

                            return { ...item, codes: codesList, content: codesList }
                        },
                        practice: async () => {
                            let codesList: any = []
                            const ruleHandlers: Record<string, () => Promise<any>> = {
                                default: async () => {
                                    return judgeIsPcOrMobile(MicroType, PracticeDefault)
                                },
                                custom: async () => {
                                    return await getPracticeList(
                                        templatePreviewList,
                                        'custom',
                                        item.codes,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                                by_category: async () => {
                                    return await getPracticeList(
                                        templatePreviewList,
                                        'by_category',
                                        item.selectCategory,
                                    ).catch(() => {
                                        return []
                                    })
                                },
                            }
                            codesList = await ruleHandlers?.[item?.rule]()
                            return {
                                ...item,
                                codes: codesList,
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

            this.previewList = templatePreviewList

            return res
        })
    }

    /**
     * 课程组件 获取默认课程
     */
    getDefaultCourse = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        let res = await getDefaultCourseListApi({
            organizationCode,
        })
        return res
    }

    /**
     * 图文组件 获取默认图文
     */
    getGraphicData = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const response = await http(
            `${api.getGraphicData}`,
            'post',
            {
                organizationCode,
                pageSize: 10,
                pageNo: 1,
                status: 1,
            },
            {
                repeatFilter: false,
            },
        )

        if (this.type === 'mobile') {
            let tempContent = response?.data?.slice(0, 4) || []
            this.defaultContent = tempContent
        } else {
            this.defaultContent = response?.data || []
        }

        return this.defaultContent
    }

    /**
     * 计划公示组件 获取默认评价计划
     */
    getPlanData = () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        http(`${api.getPlanData}`, 'post', {
            orgCode: organizationCode,
            pageSize: 10,
            currentPage: 1,
            type: 'plan_formula',
        }).then((res: any) => {
            const tempContent = res?.records?.slice(0, 4) || []
            this.defaultPlanContent = tempContent
        })
    }

    /**  获取刷题默认内容  */
    getBrushQuestData = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const response = await http(`${api.getBrushList}`, 'post', {
            organizationCode,
            pageSize: 10,
            pageNo: 1,
            /**  已发布  */
            publishStatus: 1,
        })
        let tempContent = response?.data?.slice(0, 4) || []
        this.defaultBrushQuestContent = tempContent
        return tempContent
    }

    /**
     * 计划公示组件 获取默认评价计划
     */
    getPlanTypeCategory = () => {
        http(`${api.getPlanTypeCategory}`, 'get', {}).then((res: any) => {
            this.planTypeList = res || []
        })
    }

    /**
     * @description 根据courseIds批量获取课程
     * @author kaijiewang
     * @date 2023-09-01
     */
    getBatchLessonByJobClass = (courseIds = []) => {
        http(`${api.getBatchLessonByJobClass}`, 'post', {
            courseIds,
        }).then(() => {})
    }

    /**  获取报名组件默认数据  */
    getEnrollData = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const response = await http(`${api.getEnrollData}`, 'post', {
            organizationCode,
            pageSize: 10,
            pageNo: 1,
            publishStatus: 1,
            statusList: [1, 2, 3],
        })
        const { data = [] } = response || {}
        return data
    }

    /**
     * 清除数据当前实例的所有数据  在create 销毁的时候进行执行
     */
    clearData() {
        this.previewList = []
        this.unSave = false
        this.pageTitle = '页面标题'
        this.pageColor = '#ffffff'
        this.microCode = ''
        this.componentsList = []
        this.previewList = []
        this.defaultContent = []
        this.organizationCode = ''
        this.status = 0
        this.unSave = false
        this.ispadding = false
        this.imageTexts = []
        this.customLinkList = []
        instance = null
    }
}

/**
 *  单例模式 始终保持一个实例
 * @param mode
 * @returns
 */
export const getViewStore = (mode: 'pc' | 'mobile' = 'mobile') => {
    return instance ? instance : ((instance = new PageStore(mode)), instance)
}
