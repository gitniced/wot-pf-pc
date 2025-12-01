import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import http from '@/servers/http'
import type { UserStore } from '@/stores/userStore'
import api from './api'
import { getNowType } from '@/utils/userUtils'
import { getCookie, getLocalStorage } from '@/storage'
import { COMPONENT_TYPE, USER_TYPE, getQuestionListData } from './const'
import type { DataCardItem, RequestMapItem } from './interface'
import { cloneDeep } from 'lodash'
class WorkStore {
    constructor(userStore: UserStore) {
        makeAutoObservable(this)
        this.userStore = userStore
        /** 绑定this 防止this丢失 */
        this.initData = this.initData.bind(this)
    }
    public userStore: UserStore
    // 基础的用户信息
    // 用户类型 1个人 2机构 3资源方
    public type = getNowType()

    /**右侧区域是否展示*/
    public rightVisible = false

    // 任务队列
    public promiseTask: (() => void)[] = []

    // 待办事项的数据
    public toDoList: any[] = []
    // 数据概览的数据
    public dataCardList: Record<string, DataCardItem[]> = {}
    // 月份事件的数据
    public calenderNowMonthMap: Record<string, true> = {}
    // 当天的日程
    public calenderDataSource = []
    // 机构的权限
    public organizationPermissionList = []
    // 用户的权限
    public userPermissionList = []
    // 用户的机构列表
    public organizationList = []
    // 当前的默认机构
    public defaultOrganization = ''
    // 当前选择的机构
    public selectedOrganization = getCookie('SELECT_ORG_CODE') || ''
    // 身份列表
    public userIdentityList = []
    // 当前选择的身份
    public selectedIdentity = ''
    // 默认的身份
    public defaultIdentity = ''
    // 门户信息
    public portalInfo = {}
    // 当前身份对应的组件
    public nowIdentityViewComponents: any[] = []
    // 标杆案例的数据
    public caseList = []
    //轮播广告位
    public carouselData = []
    // 轮播广告位的 显示与否
    public carlVisible = false
    // 成长中心的list
    public lessonList = []
    //常用功能Data
    public commonlyUsedData = []
    //常用功能Data
    public selectUsedData = []
    // 待选数据
    public toBeSelectedData: any = null
    //sid
    public sid: number | string = getLocalStorage('SID') || ''
    // userCode
    public userCode: unknown | string = getCookie('USER_CODE') || ''
    // 城市名
    public cityName: string = ''
    // 模块名对应
    public componentNameMap: any = {}

    // 问卷数据列表
    public questionList = []

    // 更新sid
    updateSid = (sid: string) => {
        this.sid = sid
    }

    // 获取ip地址
    getIpCity = () => {
        http(api.getIpCity, 'get', {}).then((res: any) => {
            const { city } = res || {}
            this.cityName = city || ''
        })
    }

    // 添加任务
    promiseTaskAdd(fn: () => void) {
        this.promiseTask.push(fn)
    }

    // 消费任务并且清空
    promiseTaskEmitAndClear() {
        this.promiseTask.forEach(item => {
            item()
        })
        this.promiseTask = []
    }
    // 消费任务但是不清空
    promiseTaskEmit() {
        this.promiseTask.forEach(item => {
            item()
        })
    }
    /**
     *
     * 设置机构 和身份
     * @param {*} organizationCode
     * @param {*} identityCode
     * @memberof WorkStore
     */
    onChangeOrganizationAndIdentity(organizationCode: string, identityCode: string) {
        return new Promise(resolve => {
            this.selectedOrganization = organizationCode
            this.selectedIdentity = identityCode
            resolve(undefined)
        })
    }
    /**
     *
     *  获取当前身份的视图组件
     * @return {*}
     * @memberof WorkStore
     */
    getNowIdentityViewComponents() {
        return http(api.nowIdentityViewComponents, 'get', {
            identityId: this.selectedIdentity,
        }).then((res: any) => {
            console.log('🍊 res:', res)
            console.log(res, '23356')
            const tempComponentNameMap: any = {}
            res?.map((item: any) => {
                tempComponentNameMap[item.componentAlias] = item.componentName
            })
            this.componentNameMap = tempComponentNameMap
            this.nowIdentityViewComponents = res || []
            this.getAreaVisible()
        })
    }
    /**
     *  判断右侧区域是否打开
     * 1、如果常用功能存在、并且不为个人用户 打开右侧区域
     * 2、常用功能不存在，但是存在广告位，根据广告位显隐展示右侧区域
     */
    getAreaVisible = () => {
        /**个人身份 不展示右边区域*/
        if (Number(this.type || 0) === 1 || Number(this.type || 0) === 4) {
            this.rightVisible = false
            return
        }

        /**机构身份 根据以下条件*/
        // 是否拥有常用功能
        const commonVisible = this.nowIdentityViewComponents.some(
            item => item.componentAlias === 'commonFunction',
        )
        // 是否拥有广告位
        const advertisementVisible = this.nowIdentityViewComponents.some(
            item => item.componentAlias === 'advertisement',
        )
        // 当拥有常用功能 直接展示
        if (commonVisible) {
            this.rightVisible = true
            return
        }
        // 当只拥有广告位 根据是否关闭广告位判断右侧区域是否打开
        if (advertisementVisible) {
            this.rightVisible = this.carlVisible
            return
        }
    }

    /**
     *
     *  判断当前组件是否存在在组件list
     * 1、个人身份时 配置的模块只展示个人卡片、天气和日程
     * 2、其他身份时 配置的模块全部展示
     * @param {string} 别名
     * @return {*}
     * @memberof WorkStore
     */
    isHideNowIdentityViewComponents(alias: string) {
        return !this.nowIdentityViewComponents.some(item => item.componentAlias === alias)
    }

    /**
     *
     * 获取待办列表
     * @return {*}
     * @memberof WorkStore
     */
    getToDoList() {
        let params = {
            type: this.type,
            identityId: this.selectedIdentity,
            sid: this.userStore.sid,
        }
        // 非个人登录需要加机构code
        if (this.type !== USER_TYPE.USER) {
            params.organizationCode = this.userStore.selectedOrganization
        }

        return http(api.getToDoList, 'post', params).then((res: any) => {
            this.toDoList = res
        })
    }
    /**
     *
     * 获取数据概览
     * @return {*}
     * @memberof WorkStore
     * @description 从后端获取需要请求的接口列表和对应的请求参数 组装requestMap对象
     * 然后通过便利requestMap请求数据 并与当前接口拼接出数据概览
     */
    getDataCard(alias: string) {
        //@ts-ignore
        let componentId = COMPONENT_TYPE?.[alias] || 0
        let params = {
            componentTypeList: [componentId],
            identityIdList: [this.userStore.selectedIdentity],
            sidList: [this.userStore.sid],
            targetTypeList: [this.type],
        }

        // 资源方携带fromSid
        if (this.type === USER_TYPE.MERCHANT) {
            //@ts-ignore
            params.fromSid = getLocalStorage('FROM_SID')
        }
        // 非个人登录需要加机构code
        // if (this.type !== USER_TYPE.USER) {
        //     params.targetCodeList = [this.userStore.selectedOrganization]
        // }

        return http(api.getDataCardList, 'post', params).then(res => {
            let requestMap: RequestMapItem = {}
            let dataMap: any = {}
            res?.map(
                (
                    item: { relationUrl: any; aliasCode: any; accessUrl: any; accessName: any },
                    index: any,
                ) => {
                    const {
                        relationUrl,
                        aliasCode,
                        accessUrl: redirectUrl,
                        accessName: name,
                    } = item
                    if (requestMap[relationUrl]) {
                        requestMap[relationUrl].push({ aliasCode, redirectUrl, name })
                    } else {
                        requestMap[relationUrl] = [{ aliasCode, redirectUrl, name }]
                    }

                    dataMap[aliasCode] = { redirectUrl, name, sort: index }
                },
            )

            this.getDataCardByApi(requestMap, dataMap, alias)
        })
    }
    /**
     * 根据接口返回获取数据概览
     * @param  {RequestMapItem} requestList 要请求的接口列表
     * @param  {any} dataMap 别名为key对应的数据
     */
    getDataCardByApi = async (requestList: RequestMapItem, dataMap: any, alias: string) => {
        let currentType = Number(getNowType() || 0)
        let tempDataMap = cloneDeep(dataMap)
        let tempDataList: any[] = []
        let customHeaders =
            currentType !== 1
                ? { customHeader: { 'X-Organization-Code': this.userStore.selectedOrganization } }
                : {}

        console.log('🍊 requestList:', requestList)
        console.log('🍊 dataMap:', dataMap)
        for await (const tempKey of Object.keys(requestList)) {
            const aliasList = requestList[tempKey].map(item => {
                return item.aliasCode
            })

            const aliasListData = await http(
                tempKey,
                'post',
                { aliasList, organizationCode: this.userStore.selectedOrganization },
                { ...customHeaders },
            )

            if (alias !== 'questionData') {
                aliasListData?.map((aliasListDataItem: any) => {
                    const { aliasCode } = aliasListDataItem || {}
                    if (aliasCode) {
                        tempDataMap[aliasCode] = { ...tempDataMap[aliasCode], ...aliasListDataItem }
                    }
                })
            } else {
                // 题库数据特殊处理
                //@ts-ignore
                tempDataList = getQuestionListData(aliasListData || {})
            }
        }

        if (alias !== 'questionData') {
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            Object.keys(tempDataMap).map(tempDataMapKey => {
                tempDataList.push(tempDataMap[tempDataMapKey])
            })
            tempDataList = tempDataList.sort((a, b) => {
                if (a.sort < b.sort) {
                    return -1
                }
                if (a.sort > b.sort) {
                    return 1
                }
                return 0
            })
        }

        this.dataCardList[alias] = tempDataList
    }

    /**
     *
     *  获取当前的月的日历事件点
     * @param {number} startTime
     * @param {number} endTime
     * @return {*}
     * @memberof WorkStore
     */
    getCalenderNowMonthMap(startTime: number, endTime: number) {
        const arrToMap = (arr: string[]) => {
            const map: Record<string, true> = {}
            arr.forEach(item => {
                map[item] = true
            })
            return map
        }

        const params = {
            type: this.type,
            identityId: this.selectedIdentity,
            organizationCode: this.selectedOrganization,
            sid: this.sid,
            startTime,
            endTime,
        }

        if (getCookie('SELECT_USER_TYPE') === 'user') {
            delete params.organizationCode
        }

        return http(api.getCalenderNowMonthMap, 'post', params).then((res: any) => {
            this.calenderNowMonthMap = arrToMap(res || [])
        })
    }

    /**
     * 获取本天的日程
     * @param {number} startTime
     * @param {number} endTime
     * @return {*}
     * @memberof WorkStore
     */
    getNowDayCalender(startTime: number, endTime: number) {
        const params = {
            type: this.type,
            identityId: this.selectedIdentity,
            sid: this.sid,
            startTime,
            endTime,
        }

        // 非个人登录需要加机构code
        if (this.type !== USER_TYPE.USER) {
            // @ts-ignore
            params.organizationCode = this.userStore.selectedOrganization
        }

        return http(api.getNowDayCalender, 'POST', params).then((res: any) => {
            this.calenderDataSource = res || []
        })
    }

    /**
     *
     * 获取机构权限列表
     * @return {*}
     * @memberof WorkStore
     */
    getOrganizationPermissionList() {
        let currentOrganization = this.selectedOrganization || getCookie('SELECT_ORG_CODE')
        if (!currentOrganization) return
        return http(api.organizationPermissionList, 'post', {
            organizationCode: currentOrganization,
            // type: 1,
        }).then((res: any) => {
            this.organizationPermissionList = res || []
        })
    }
    /**
     *
     *  获取用户的权限列表
     * @memberof WorkStore
     */
    getUserPermissionList() {
        return http(api.userPermissionList, 'post', {
            // type: this.type,
            identity: this.selectedIdentity,
        }).then((res: any) => {
            this.userPermissionList = res || []
        })
    }
    /**
     *
     * 获取标杆案例
     * @return {*}
     * @memberof WorkStore
     */
    getCaseList() {
        return http(
            api.recommendPage,
            'POST',
            {
                // 标杆案例的别名 特殊约定
                formAlias: 'SaaSWoktableBenchmarkingCases',
                pageNo: 1,
                pageSize: 100,
                identitys: [this.selectedIdentity],
                status: 0,
                order: '',
                orderBy: '',
                sid: getLocalStorage('SID'),
            },
            { repeatFilter: false },
        ).then((res: any) => {
            this.caseList = res?.data || []
            const codeList = res?.data?.map((item: any) => {
                return item?.customContent?.imageText
            })
            http(api.getImageTextList, 'POST', codeList).then((case_res: any) => {
                console.log(case_res, '标杆案例')
                this.caseList = case_res || []
            })
        })
    }
    /**
     *
     * 获取成长中心
     * @return {*}
     * @memberof WorkStore
     */
    getLessonList() {
        return http(
            api.recommendPage,
            'POST',
            {
                // 成长中心的别名 特殊约定
                formAlias: 'SaaSWoktableGrowthCenter',
                pageNo: 1,
                pageSize: 100,
                identitys: [this.selectedIdentity],
                sid: getLocalStorage('SID'),
                status: 0,
                order: '',
                orderBy: '',
            },
            { repeatFilter: false },
        ).then((res: any) => {
            this.lessonList = res?.data || []
        })
    }

    /**
     *
     * 组件请求map 对没有权限的组件不做请求
     * @param {string} alias
     * @memberof WorkStore
     */
    componentsRequestMapFn(alias: string) {
        const map: Record<string, any> = {
            weather: null, // 天气板块
            todoList: () => this.getToDoList(), // 待办事项
            dataOverview: () => this.getDataCard(alias), // 考评数据概览
            trainingData: () => this.getDataCard(alias), // 职培数据概览
            schedule: null, // 我的日程
            benchmark: () => this.getCaseList(), // 标杆案例
            development: () => this.getLessonList(), // 成长中心
            advertisement: () => this.getCarouselData(), // 广告轮播
            commonFunction: () => this.getUserList(), // 常用功能
            // questionData: () => this.getQuestionData(), // 题库数据
            questionData: () => this.getDataCard(alias), // 职培数据概览 // 题库数据
        }
        return map[alias]
    }

    /**
     *
     * 初始化的设置
     * @memberof WorkStore
     */
    initData(monthInit: () => void, dayInit: () => void) {
        // 没有权限的模块就不用掉接口了
        this.getNowIdentityViewComponents().then(() => {
            this.nowIdentityViewComponents?.forEach(item => {
                let { componentAlias = '' } = item
                this.componentsRequestMapFn(componentAlias)?.()
            })
        })
        this.promiseTaskEmit()
        this.getUserList()
        this.getCarouselData()
        this.getCarouselStatus()
        monthInit && monthInit()
        dayInit && dayInit()
    }

    /**
     * 获取轮播图数据
     */
    getCarouselData = async () => {
        const temp = {
            pageNo: 1,
            pageSize: 10,
            formAlias: 'SaaSWoktableCarousel',
            identitys: [this.selectedIdentity],
            status: 0,
        }

        const res = await http(api.recommendPage, 'POST', { ...temp }, {})
        const { data }: { data: any } = res || {}

        this.carouselData = data?.map((item: any) => {
            return {
                status: item?.status,
                imgUrl: item.customContent?.picture?.[0]?.url,
                linkUrl: item.customContent?.url,
            }
        })
    }

    /**
     * 获取常用功能列表
     * @param params
     */
    getUserList = async (params?: { sid: number; userCode: string | unknown }) => {
        const temp = {
            identityId: this.selectedIdentity,
            organizationCode: this.selectedOrganization,
            sid: this.sid,
            // sid: getLocalStorage('SID'),
            userCode: this.userCode,
        }

        const res: any = await http(api.commonlyUsedList, 'POST', { ...temp, ...params }, {})

        this.commonlyUsedData = res || []

        this.selectUsedData = res?.map((i: any) => {
            return {
                childMenulist: [],
                id: i.moduleId,
                name: i.moduleName,
                route: i.moduleRoute,
                isSelect: true,
            }
        })
    }

    /**
     * //获取待选所有菜单数据
     */
    getToDoAllList = async () => {
        let currentUserType = Number(getNowType() || 0)
        let temp = {
            userCode: this.userCode,
            identity: this.selectedIdentity,
        }

        let apiUrl = api.getUserUsualList

        if (currentUserType && currentUserType !== 1) {
            apiUrl = api.getOrgUsualList
            temp = {
                ...temp,
                // @ts-ignore
                organizationCode: this.selectedOrganization,
            }
        }

        const res: any = await http(apiUrl, 'POST', { ...temp }, {})

        res?.flatMap((item: { childMenuList: any[] }) => {
            item.childMenuList = item.childMenuList?.map((i: any) => {
                return {
                    ...i,
                    isSelect: false,
                }
            })
        })

        res.forEach((item: any) => {
            item.childMenuList.forEach((childItem: any) => {
                this.selectUsedData.map((i: any) => {
                    if (i.id === childItem.id) {
                        childItem.isSelect = true
                    }
                })
            })
        })
        this.toBeSelectedData = res || []
    }

    /**
     * 选择常用功能 弹窗确定事件
     * @param value
     */
    submitToDoList = async (value: any[]) => {
        if (value?.length === 0) {
            message.error('请添加常用功能')
            return
        }

        const functionList = value.map(values => {
            return {
                moduleId: values.id,
                moduleName: values.name,
                moduleRoute: values.route,
            }
        })
        const params = {
            functionList,
            identityId: this.selectedIdentity,
            organizationCode: this.selectedOrganization,
            sid: this.sid,
            userCode: this.userCode,
        }

        await http(api.commonlyUsed, 'POST', params, {})
        message.success('设置成功')
        this.toBeSelectedData = null
        this.getUserList({ sid: this.sid as number, userCode: this.userCode })
    }

    /**
     * 获取 sid 和 userCode
     * @param sid
     * @param userCode
     */
    getMessage = (sid: number | string, userCode: string | unknown) => {
        this.sid = sid || ''
        this.userCode = userCode ? userCode : ''
    }

    //获取当前用户轮播状态
    getCarouselStatus = async () => {
        const temp = {
            sid: this.sid,
            userCode: this.userCode,
        }

        const res: any = await http(api.carouselStatus, 'get', { ...temp }, {})

        this.carlVisible = res || false
    }

    /**
     * 关闭轮播图 /update
     */
    closeCarousel = async () => {
        await http(api.setCarouselStatus, 'POST', {}, {})
        this.carlVisible = false
    }
    /**
     * 获取题库数据
     */
    // getQuestionData = async () => {
    //     if (!this.selectedOrganization) return
    //     try {
    //         const response = await http(api.getQuestionList, 'post', {
    //             organizationCode: this.selectedOrganization,
    //         })
    //         this.questionList = getQuestionListData(response)
    //     } catch (error) {
    //         console.error('Failed to fetch question list:', error)
    //         throw error
    //     }
    // }
}

export default WorkStore
