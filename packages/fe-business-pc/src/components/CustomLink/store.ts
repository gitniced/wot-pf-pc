import { makeAutoObservable } from 'mobx'
import type { urlItem, RESTYPE, LinkProps } from './interface'
import { LinkEnum } from './interface'
import { getCookie } from '@/storage'
import type { PlanListItem } from '@/pages/gateway/components/IdentifyResult/interface'

import { ENROLL_TYPE_MAP_STR, TYPE_TAG_TRANSFORMED } from '../EnrollModal/const'

class LinkStore {
    // label文字
    public linkText = ''
    // extra文字
    //控制选择图文详情的模态显示隐藏
    public pictureVisible = false
    //控制选择微页面详情的模态显示隐藏
    public weiVisible = false
    //控制选择链接的modal框
    public linkVisible = false
    //控制选择课程的modal框
    public courseOpen = false
    // 认定结果详情弹窗
    public identifyResultVisible = false
    /**  报名modal  */
    public enrollOpen: {
        visible: boolean
        type: 'project' | 'details' // 报名项目 | 报名详情
    } = {
        visible: false,
        type: 'project',
    }
    //计划公示弹窗
    public planFormulaVisible = false
    public menuList: RESTYPE[] = [] //请求数据拿到的list
    public menuItems: any[] = [] //children的items
    // TRAINING 培训的菜单数据
    public trainingMenuList: RESTYPE[] = []
    /**  报名 菜单数据  */
    public enrollMenuList: RESTYPE[] = []
    /**  学习平台 菜单数据  */
    public studyMenuList: RESTYPE[] = []
    public objUrl: Record<string, string> = {}

    // 返回的urlItem
    public urlItem: urlItem = { label: '' }
    // orgCode
    public orgCode: string = getCookie('SELECT_ORG_CODE')

    /**  判断是pc还是移动端  */
    public type

    /**  图文分类  */
    public categoryVisible = false
    /**  练习练习数据  */
    public practiceMenuList: RESTYPE[] = []
    /**  练习详情的modal 显示  */
    public practiceVisible = false

    constructor(type: LinkProps['type'] = 'mobile') {
        makeAutoObservable(this)
        this.type = type
    }

    /**
     *  返回的urlItem
     * @param item
     * @param callback
     */
    setUrlItem = (item: urlItem, callback?: (item: urlItem) => void) => {
        this.urlItem = item
        callback?.(item)
    }

    /**
     *  选择label文字
     * @param label
     */
    setLinkText = (label: string) => {
        this.linkText = label
    }
    /** 控制选择练习详情的模态显示隐藏  */
    setPracticeVisible = (visible: boolean) => {
        this.practiceVisible = visible
    }

    /**
     *  控制选择图文详情的模态显示隐藏
     * @param visible
     */
    setPictureVisible = (visible: boolean) => {
        this.pictureVisible = visible
    }
    /**
     *  控制选择微页面详情的模态显示隐藏
     * @param visible
     */
    setWeiVisible = (visible: boolean) => {
        this.weiVisible = visible
    }

    /**
     *  控制选择课程详情的模态显示隐藏
     * @param visible
     */
    setCourseModalOpen = (visible: boolean) => {
        this.courseOpen = visible
    }

    /**  报名modal的变量  */
    setEnrollModalOpen = (visible: boolean, flag?: 'project' | 'details') => {
        this.enrollOpen.visible = visible
        this.enrollOpen.type = flag!
    }

    /**
     *  控制选择微页面详情的模态显示隐藏
     * @param visible
     */
    setCategoryVisible = (visible: boolean) => {
        this.categoryVisible = visible
    }

    /**
     *  拿到选择的课程code
     * @param imageItem
     * @param callback
     */
    getCourseCodes = (courseItem: any, callback?: (item: urlItem) => void) => {
        this.setCourseModalOpen(false)

        const label = '培训 | 课程详情页 | ' + courseItem?.[0]?.title || ''
        this.setLinkText(label)
        this.setUrlItem(
            {
                type: LinkEnum.COURSE_DETAIL,
                label: this.linkText,
                code: courseItem?.[0]?.id || '',
            },
            callback,
        )
    }
    /**
     *  控制选择链接的modal框
     * @param visible
     */
    setLinkVisible = (visible: boolean) => {
        this.linkVisible = visible
    }

    /**
     *  控制选择认定结果的modal框
     * @param visible
     */
    setIdentifyResultVisible = (visible: boolean) => {
        this.identifyResultVisible = visible
    }

    /**
     *  控制选择计划公示的modal框
     * @param visible
     */
    setPlanFormulaVisible = (visible: boolean) => {
        this.planFormulaVisible = visible
    }

    /**  练习详情modal 确定事件  */
    getPracticeCodes = (item: any, callback?: (item: urlItem) => void) => {
        this.setPracticeVisible(false)
        const label = '练习 | ' + item?.[0]?.title || ''
        this.setLinkText(label)
        this.setUrlItem(
            {
                type: LinkEnum.PRACTICE_DETAILS,
                label: this.linkText,
                code: item?.[0]?.code || '',
            },
            callback,
        )
    }

    /**
     *  拿到选择的图文code
     * @param imageItem
     * @param callback
     */
    getImageCodes = (imageItem: any, callback?: (item: urlItem) => void) => {
        this.setPictureVisible(false)
        const label = '图文 |  ' + imageItem?.[0]?.title || ''
        this.setLinkText(label)
        this.setUrlItem(
            {
                type: LinkEnum.IMAGE_TEXT,
                label: this.linkText,
                code: imageItem?.[0]?.code || '',
            },
            callback,
        )
    }

    /**
     *  拿到选择的微页面code
     * @param microItem
     * @param callback
     */
    getMicroCodes = (microItem: any, callback?: (item: urlItem) => void) => {
        this.setWeiVisible(false)
        const label = '微页面 | ' + microItem?.[0]?.name || ''
        this.setLinkText(label)
        this.setUrlItem(
            {
                type: LinkEnum.MiCRO,
                label: this.linkText,
                code: microItem?.[0]?.code || '',
            },
            callback,
        )
    }
    /**  获取图文分类的数据  */
    getCategoryCode = (category: any, callback?: (item: urlItem) => void) => {
        this.setCategoryVisible(false)
        const label = `图文 ｜图文分类列表 ｜ ${category?.[0].name}`
        this.setLinkText(label)
        this.setUrlItem(
            {
                type: LinkEnum.IMAGE_CATEGORY,
                label: this.linkText,
                code: category?.[0]?.id || '',
            },
            callback,
        )
    }

    /**
     * @param PlanListItem 选择评价计划
     * @param callback 选择成功之后的回调函数
     */
    getIdentifyResult = (planList: PlanListItem[], callback?: (item: urlItem) => void) => {
        this.setIdentifyResultVisible(false)
        const selectedPlan = planList[0]

        const { id, appraise } = selectedPlan

        const linkUrl =
            this.type === 'pc'
                ? `/exam/gateway/result-publicity/2/${id}`
                : `/assessment/resultPublicity/detail?plan_id=${id}`

        const label = `考试评价 ｜认定结果详情 ｜ ${appraise.name}`
        this.setLinkText(label)
        this.setUrlItem(
            {
                type: LinkEnum.IDENTIFICATION_RESULT_DETAIL,
                label: this.linkText,
                code: linkUrl,
            },
            callback,
        )
    }

    /**  获取选择后的报名  */
    getEnrollResult = (
        list: any[],
        callback?: (item: urlItem) => void,
        type?: 'project' | 'details', //报名项目 ||  报名详情
    ) => {
        this.setEnrollModalOpen(false)
        const projectLabel =
            '报名 | 报名项目列表 | ' + TYPE_TAG_TRANSFORMED?.[list?.[0]?.name] || ''
        const detailsLabel = '报名 | 报名详情页 | ' + list?.[0]?.name || ''

        const label = type === 'project' ? projectLabel : detailsLabel
        const typeItem =
            type === 'project'
                ? LinkEnum.REGISTRATION_PROJECT_LIST
                : LinkEnum.REGISTRATION_DETAILS_PAGE

        const codes = type === 'project' ? ENROLL_TYPE_MAP_STR[list?.[0]?.name] : list?.[0]?.code

        this.setLinkText(label)
        this.setUrlItem(
            {
                type: typeItem,
                label: this.linkText,
                code: codes || '',
            },
            callback,
        )
    }

    /**
     * @param rows 选择的评价计划row
     * @param keys 选择的评价计划key
     */
    getPlanFormula = (
        rows: { id: string; appraise: { name: string } }[],
        keys: any[],
        callback = () => {},
    ) => {
        this.setPlanFormulaVisible(false)
        const selectedObj = rows[0]
        const { id } = selectedObj
        const linkUrl =
            this.type === 'pc'
                ? `/exam/gateway/plan-publicity/1/${id}`
                : `/assessment/planPublicity/detail?plan_id=${id}`

        const label = `考试评价 ｜ 计划公示详情 ｜ ${selectedObj.appraise.name}`
        this.setLinkText(label)
        this.setUrlItem(
            {
                type: LinkEnum.PLAN_FORMULA_DETAIL,
                label: this.linkText,
                code: linkUrl,
            },
            callback,
        )
    }

    /**
     *  value 改变的回调
     * @param value
     * @param callback
     */
    onLinkValueChange = (value: { link: string }, callback?: (item: urlItem) => void) => {
        this.setLinkVisible(false)
        this.setLinkText(`链接 | ` + value?.link)
        this.setUrlItem({
            type: LinkEnum.CUSTOM_LINK,
            label: this.linkText,
            code: value?.link || '',
        })
        callback?.(this.urlItem)
    }

    /**
     * 获取itemList
     */
    getItemList = async (res: any[]) => {
        /**  考试评价  */
        let ExamEvalItem =
            res.find((item: any) => item.alias === 'KP_EXAM_EVALUATION') || ({} as any)
        this.menuList = ExamEvalItem?.children || []
        // 培训
        let trainingMenu = res.find((item: any) => item.alias === 'TRAINING') || ({} as any)
        this.trainingMenuList = trainingMenu?.children || []
        /**  练习  */
        // 培训
        let practiceMenu = res.find((item: any) => item.alias === 'PRACTICE') || ({} as any)
        this.practiceMenuList = practiceMenu?.children || []

        /**  报名  */
        let enrollMenu = res.find((item: any) => item.alias === 'SIGN_UP') || ({} as any)
        this.enrollMenuList = enrollMenu?.children || []

        /**  学习平台  */
        let studyMenu = res.find((item: any) => item.alias === 'STUDY_PLATFORM') || ({} as any)
        this.studyMenuList = studyMenu?.children || []

        //获取每个考试评价的url
        const urlMap: Record<string, string> = {
            KP_MENU_CERT_QUERY: 'KP_MENU_CERT_QUERY',
            KP_MENU_PERFORMANCE_QUERY: 'KP_MENU_PERFORMANCE_QUERY',
            KP_COGN_EXAM: 'KP_COGN_EXAM',
            KP_MENU_EVA_PLAN_LIST: 'KP_MENU_EVA_PLAN_LIST',
            KP_MENU_EXAM_INTENTION_SIGN: 'KP_MENU_EXAM_INTENTION_SIGN',
            IDENTIFICATION_RESULT_LIST: 'IDENTIFICATION_RESULT_LIST',
            IDENTIFICATION_RESULT_DETAIL: 'IDENTIFICATION_RESULT_DETAIL',
            PLAN_FORMULA_LIST: 'PLAN_FORMULA_LIST',
            PLAN_FORMULA_DETAIL: 'PLAN_FORMULA_DETAIL',
        }

        ExamEvalItem?.children &&
            ExamEvalItem?.children.forEach((item: { route: string; alias: string }) => {
                const key = urlMap[item.alias]
                if (key) {
                    this.objUrl[key] = item.route
                }
            })
    }
}

export default LinkStore
