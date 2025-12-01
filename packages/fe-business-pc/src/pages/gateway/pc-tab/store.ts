import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import { message } from 'antd'
import { getNowSelectOrgCode } from '@/utils/parseValue'
import { v4 as uuidv4 } from 'uuid'
import { TEMPLATE_ENUM, mobileObj, weChatObj, weiboObj } from './components/FooterSettings/const'
import type { UpdateUsingPOSTRequest } from '@/@types/business'
import { INTERACTION_TYPE, NAME_SHOW } from './const'

export default class {
    /**导航list */
    public navList = []
    /** 门户信息 */
    public getawayData: Record<string, string> = {}
    /**  页脚选择的模板  */
    public footerTemplateKey: number = 1
    /**  页脚设置  友情链接的list  */
    public friendshipLinksList = []
    /**  页脚设置  营销链接的list  */
    public marketingLinksList = []
    /**  页脚的导航设置  */
    public navigationLinksList = []

    /**  悬浮窗列表  */
    public suspendedWindowList = []
    /**  选择跳转链接数据  */
    public customLinkList: any[] = []

    constructor() {
        makeAutoObservable(this)
    }

    /**  获取跳转链接数据  */
    getLinkList = (list = []) => {
        this.customLinkList = list
    }

    /**
     *  获取所有的导航数据
     * @param organizationCode
     */
    getNavData(organizationCode: string) {
        http(api.getNav, 'GET', { organizationCode }).then((res: any) => {
            this.navList = res || []
        })
    }

    /**
     *  新增导航
     * @param params
     */
    addNav(params: Record<string, any>) {
        http(api.addNav, 'POST', { ...params, organizationCode: getNowSelectOrgCode() }).then(
            () => {
                message.success('导航新增成功')
                this.getNavData(getNowSelectOrgCode())
            },
        )
    }

    /**
     *  编辑导航信息
     * @param params
     */
    editNav(params: Record<string, any>) {
        http(api.editNav, 'POST', { ...params, organizationCode: getNowSelectOrgCode() }).then(
            () => {
                // message.success('导航新增成功')
                this.getNavData(getNowSelectOrgCode())
            },
        )
    }

    /**
     *  删除导航
     * @param id
     */
    deleteNav(id: string) {
        http(`${api.deleteNav}?code=${id}`, 'POST', {}).then(() => {
            message.success('删除成功')
            this.getNavData(getNowSelectOrgCode())
        })
    }

    /**
     *  改变位置 然后重新掉接口
     * @param params
     */
    changePosition = (params: Record<string, any>) => {
        http(api.editNav, 'POST', { ...params, organizationCode: getNowSelectOrgCode() }).then(
            () => {
                this.getNavData(getNowSelectOrgCode())
            },
        )
    }

    /**
     *  更新门户logo
     * @param params
     */
    upDataGateway(navLogo: string, navigationImgType: 0 | 1) {
        this.getGatewayData().then((res: any) => {
            http(api.upDataGateway, 'POST', {
                ...res,
                navigationImgType,
                naviLogo: navLogo,
                organizationCode: getNowSelectOrgCode(),
            }).then(() => this.getGatewayData())
        })
    }

    /**
     * 获取门户信息
     */
    getGatewayData() {
        return http(api.getGateway, 'GET', {
            organizationCode: getNowSelectOrgCode(),
        }).then((res: any) => {
            this.getawayData = res || {}
            return res
        })
    }

    /**  新增友情链接  */
    onAddFriendshipLinks = (data: any) => {
        const flag = this.friendshipLinksList.some(item => item.title === data.title)
        if (flag) {
            message.error('链接名称不可重复')
            return
        } else {
            this.friendshipLinksList = [...this.friendshipLinksList, data] || []
        }
    }

    /**  编辑友情链接  */
    onEditFriendshipLinks = (data: any) => {
        const flag = this.friendshipLinksList.some(
            item => item.title === data.title && item.id !== data.id,
        )
        if (flag) {
            message.error('链接名称不可重复')
            return
        } else {
            this.friendshipLinksList =
                this.friendshipLinksList.map((item: any) =>
                    item?.id === data?.id ? data : item,
                ) || []
        }
    }

    /**  删除友情链接  */
    onDeleteFriendshipLinks = (id: string) => {
        this.friendshipLinksList = this.friendshipLinksList.filter(i => i?.id !== id) || []
    }

    /**  更新 store.friendshipLinksList 数据  */
    updateFriendshipLinksList = (data: any) => {
        this.friendshipLinksList = data || []
    }

    /** 模板4 新增导航链接  */
    onAddNavLinks = (data: any) => {
        const flag = this.navigationLinksList.some(item => item.title === data.title)
        if (flag) {
            message.error('链接名称不可重复')
            return
        } else {
            this.navigationLinksList = [...this.navigationLinksList, data] || []
        }
    }

    /** 模板4 编辑导航链接  */
    onEditNavLinks = (data: any) => {
        const flag = this.navigationLinksList.some(
            item => item.title === data.title && item.id !== data.id,
        )
        if (flag) {
            message.error('链接名称不可重复')
            return
        } else {
            this.navigationLinksList =
                this.navigationLinksList.map((item: any) =>
                    item?.id === data?.id ? data : item,
                ) || []
        }
    }

    /** 模板4 删除导航链接  */
    onDeleteNavLinks = (id: string) => {
        this.navigationLinksList = this.navigationLinksList.filter(i => i?.id !== id) || []
    }
    /** 模板4 删除导航链接  */
    updateNavLinksList = (data: any) => {
        this.navigationLinksList = data || []
    }

    /**  获取悬浮窗列表  */
    getSuspendedWindowList = async () => {
        let res: any = await http(
            `${api.getSuspendedWindowList}/${getNowSelectOrgCode()}`,
            'GET',
            {},
        )

        res = res.map((item: any, index: number) => ({
            ...item,
            sort: index + 1,
        }))

        this.suspendedWindowList = res
    }

    /**  处理数据  */
    processTempData = data => {
        const organizationCode = getNowSelectOrgCode()
        const uploadImg = data.uploadImg?.[0]?.response?.url || data.uploadImg?.[0]?.url || ''

        let tempData = {
            organizationCode,
            ...data,
            uploadImg,
        }

        if (tempData?.actionCustomLink) {
            const { code, label, type } = tempData.actionCustomLink || {}

            tempData = {
                ...tempData,
                actionUrl: code,
                actionUrlTitle: label,
                actionUrlType: type,
            }

            delete tempData.actionCustomLink
        }

        return tempData
    }
    /**  根据选择的类型 删除不需要的值的字段  */
    deleteTempData = tempData => {
        /**  当名称为隐藏的时候 清空name值  */
        if (tempData.nameType === NAME_SHOW.HIDE) {
            tempData.name = undefined
        }
        /** 当交互为悬浮出现图片的时候 清空 文案 和 跳转链接  */
        if (tempData.actionType === INTERACTION_TYPE.IMAGE) {
            tempData.actionUrl = undefined
            tempData.actionUrlTitle = undefined
            tempData.actionUrlType = undefined
            tempData.actionText = undefined
        }
        /** 当交互为悬浮出现文案的时候 清空 图片 图片描述 和 跳转链接  */
        if (tempData.actionType === INTERACTION_TYPE.TEXT) {
            tempData.actionUrl = undefined
            tempData.actionUrlTitle = undefined
            tempData.actionUrlType = undefined
            tempData.uploadImg = undefined
            tempData.uploadImgText = undefined
        }
        /** 当交互为点击跳转链接的时候 清空 图片 图片描述 和 文案  */
        if (tempData.actionType === INTERACTION_TYPE.LINK) {
            tempData.uploadImg = undefined
            tempData.uploadImgText = undefined
            tempData.actionText = undefined
        }

        return tempData
    }

    /**  创建悬浮窗  */
    createSusWindow = async (data: any, closeModel: () => void) => {
        let tempData = this.processTempData(data)
        tempData = this.deleteTempData(tempData) || {}
        await http(api.createSuspendedWindow, 'post', tempData)
        message.success('悬浮窗添加成功')
        closeModel()
        this.getSuspendedWindowList()
    }
    /**  编辑悬浮窗  */
    editSusWindow = async (data: any, closeModel: () => void) => {
        let tempData = this.processTempData(data) || {}
        tempData = this.deleteTempData(tempData) || {}

        await http(api.editSuspendedWindow, 'post', tempData)
        message.success('悬浮窗编辑成功')
        closeModel()
        this.getSuspendedWindowList()
    }
    /**  删除悬浮窗  */
    deleteSusWindow = async (code: string) => {
        await http(api.deleteSuspendedWindow, 'post', { code })
        message.success('悬浮窗删除成功')
        this.getSuspendedWindowList()
    }
    /**  更新悬浮窗排序  */
    updateSusWindowSort = async (data: any) => {
        let tempData = data?.map(i => {
            return {
                code: i.code,
                sort: i.sort,
            }
        })
        await http(api.updateSuspendedWindowSort, 'post', tempData)
        message.success('悬浮窗排序成功')
        this.getSuspendedWindowList()
    }

    /**  查询页脚配置   */
    findFooterConfig = async () => {
        let res: any = await http(`${api.findFooterConfig}/${getNowSelectOrgCode()}`, 'GET', {})
        let {
            type = 1,
            friendshipLinks = [],
            marketingLinks = [],
            navigationLinks = [],
        } = res || {}
        /**  页脚选择的模板  */
        this.footerTemplateKey = type
        /**  页脚设置  友情链接的list  */
        this.friendshipLinksList = friendshipLinks.map(i => {
            return {
                ...i,
                id: uuidv4(),
            }
        })
        /**  页脚设置  营销链接的list  */
        const itemsToAdd = [
            { marketingType: 'mobile', obj: mobileObj },
            { marketingType: 'weChat', obj: weChatObj },
            { marketingType: 'weibo', obj: weiboObj },
        ]

        itemsToAdd.forEach(item => {
            if (!marketingLinks.find(i => i.marketingType === item.marketingType)) {
                marketingLinks = [...marketingLinks, item.obj]
            }
        })

        this.marketingLinksList = marketingLinks
        /**  页脚的导航设置  */
        this.navigationLinksList = navigationLinks.map(i => ({
            ...i,
            id: uuidv4(),
        }))
    }

    /**  更新页脚选择的模板  */
    upDataFooterTemplateKey = (key: number) => {
        this.footerTemplateKey = key
    }
    /**  更新页脚 营销链接数据预览  实时预览  */
    upDataMarketingLinksList = (flag: string, data) => {
        const updateLink = link => {
            if (link.marketingType === flag) {
                return {
                    ...link,
                    link: data,
                }
            }
            return link
        }

        if (flag === 'checkbox') {
            this.marketingLinksList.forEach(link => {
                /**  1代表勾选  0代表未勾选  */
                link.disableState = data.includes(link?.marketingType) ? 1 : 0
            })
        } else {
            this.marketingLinksList = this.marketingLinksList?.map(updateLink)
        }
    }
    /** 保存的时候 处理成后端需要的格式  更新营销链接的数据  */
    updateMarketingLinks = res => {
        this.marketingLinksList = []
        let { checkbox = [], mobile = [], weChat = [], weibo = '' } = res || {}
        const addToMarketingLinksList = (
            marketingType: string, //mobile代表移动端  weChat代表微信公众号  weibo代表微博
            disableState: number, // 1代表已勾选的 0未勾选
            title: string, // 移动端  微信公众号  官方微博
            link: string, // 图片url 或者微博链接
        ) => {
            this.marketingLinksList = [
                ...this.marketingLinksList,
                {
                    marketingType,
                    disableState,
                    title,
                    link,
                },
            ]
        }

        if (checkbox.includes('mobile')) {
            addToMarketingLinksList(
                'mobile',
                mobile?.length ? 1 : 0,
                '移动端',
                mobile?.[0]?.response?.url || mobile?.[0]?.url || '',
            )
        }

        if (checkbox.includes('weChat')) {
            addToMarketingLinksList(
                'weChat',
                weChat?.length ? 1 : 0,
                '微信公众号',
                weChat?.[0]?.response?.url || weChat?.[0]?.url || '',
            )
        }

        if (checkbox.includes('weibo')) {
            addToMarketingLinksList('weibo', weibo ? 1 : 0, '官方微博', weibo || '')
        }

        /** disableState= 1  代表已勾选的   */
        this.marketingLinksList = this.marketingLinksList?.filter(i => i.disableState === 1)
    }

    /** 保存 更新页脚配置  */
    updateFooterConfig = async () => {
        let params: UpdateUsingPOSTRequest = {
            organizationCode: getNowSelectOrgCode(),
            type: this.footerTemplateKey,
        }

        /**  模板二  */
        if (this.footerTemplateKey === TEMPLATE_ENUM.TWO) {
            params.friendshipLinks = this.friendshipLinksList || []
        }
        /**  模板三  */
        if (this.footerTemplateKey === TEMPLATE_ENUM.THREE) {
            params.friendshipLinks = this.friendshipLinksList || []
            params.marketingLinks = this.marketingLinksList || []
        }
        /**  模板四  */
        if (this.footerTemplateKey === TEMPLATE_ENUM.FOUR) {
            params.friendshipLinks = this.friendshipLinksList || []
            params.marketingLinks = this.marketingLinksList || []
            params.navigationLinks = this.navigationLinksList || []
        }

        await http(api.updateFooterConfig, 'POST', params)
        message.success('保存页脚配置成功')
    }
}
