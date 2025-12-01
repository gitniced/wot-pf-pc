import { makeAutoObservable, runInAction } from 'mobx'
import API from './api'
import Http from '@/servers/http'
import type { NAV_OBJECT, linkObjType, DataObj } from './interface'
import { message } from 'antd'
import { getCookie } from '@/storage'
// import { LinkEnum } from './const'
import { v4 as uuidv4 } from 'uuid'

export default class {
    public gloablNav: NAV_OBJECT[] = [] //table数据
    public url = {}
    public deleteArr: string[] = [] //删除的code, 当保存后在去删除
    public rowLength: number = 2
    public orgCode = getCookie('SELECT_ORG_CODE') || '' //获取机构Code
    public linkObjArr: linkObjType[] = [] //存取修改链接的数据
    public themeColor = '#1890FF' //默认主题色
    /**  选择跳转链接数据  */
    public customLinkList: any[] = []

    constructor() {
        makeAutoObservable(this)
    }

    /**  获取跳转链接数据  */
    getLinkList = (list = []) => {
        this.customLinkList = list
    }

    // 获取门户信息
    getPortalInfo = async (organizationCode: string) => {
        const res: any = (await Http(`${API.getPortalInfo}`, 'get', { organizationCode })) || {}
        const { themeColor } = res || {}
        this.themeColor = themeColor || '#1890FF'
    }

    //获取数据
    getNavigationData = async (org: string) => {
        let res: any =
            (await Http(`${API.getNavigationData}`, 'get', { organizationCode: org }, {})) || []
        res = res.filter((n: any) => n) //去除为null的
        res.map((item: any) => {
            Object.assign(item, { operateCode: [], id: uuidv4() })
        })
        runInAction(() => {
            this.gloablNav = res
        })
    }

    //修改后去保存所有的数据
    saveAllData = async (data: DataObj[]) => {
        this.linkObjArr &&
            this.linkObjArr.forEach(linkObj => {
                data.forEach(dataObj => {
                    if (linkObj.key === dataObj.id) {
                        Object.assign(dataObj, {
                            linkName: linkObj.value.label,
                            linkType: linkObj.value.type,
                            linkUrl: linkObj.value?.code || linkObj.value?.route,
                            ids: linkObj.key,
                        })
                    }
                })
            })
        await Http(API.saveAll, 'POST', data, {})
        message.success('保存成功')
    }

    //删除导航
    deleteNav = async (code: string) => {
        await Http(`${API.deleteNav}/${code}`, 'post', {}, {})
        this.getNavigationData(this.orgCode)
    }

    //修改tabBar
    editTextTabBar = async (list: any) => {
        ;(await Http(API.editTextTabBar, 'post', list, {})) || {}
    }
    editWeiTabBar = async (list: any) => {
        ;(await Http(API.editWeiTabBar, 'post', list, {})) || {}
    }
}
