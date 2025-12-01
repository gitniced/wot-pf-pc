import { makeAutoObservable } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import { message } from 'antd'
import * as Storage from '@/storage'
import type { UserInfo, UserAccount, UserOrgItem, UserGroupItem, UserPermission } from './interface'
import Http from '@/servers/http'
import globalApi from '@/servers/globalApi'
import { getCookie } from '@/storage'
import { getLocalStorage } from '@/storage'
import { encode } from 'js-base64'
import { getMasterHistory } from '@/utils/masterHistoryVO'

export default class UserStore {
    public userAccount: UserAccount | undefined
    public userData: UserInfo | undefined
    public userOrg: UserOrgItem[] = []
    public userGroup: UserGroupItem[] = []
    public userPermissionList: string[] = []
    public currentOrgCode: string = ''
    // 当前选中机构详情
    public currentOrgInfo: UserOrgItem = {}
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
        makePersistable(this, {
            name: 'OrgStore', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: [
                'userData',
                'userAccount',
                'userOrg',
                'currentOrgCode',
                'userGroup',
                'userPermissionList',
                'currentOrgInfo',
            ], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })
    }

    /**
     * 更新用户信息
     */
    updateUserData = (data: UserInfo) => {
        this.userData = data
    }

    /**
     * 获取机构详情
     */
    getOrganizationDetail = async (data: string | undefined) => {
        let orgCode = data || this.currentOrgCode
        if (!orgCode) return
        this.currentOrgInfo = (await Http(`${globalApi.orgDetail}/${orgCode}`, 'get', {
            repeatFilter: false,
        })) as unknown as UserOrgItem
        return this.currentOrgInfo
    }

    /**
     * 更新当前机构
     */
    updateCurrentOrgCode = async (data: string | undefined) => {
        if (!data) return
        ;(await Http(
            `${globalApi.updateOrg}/${data}`,
            'post',
            {
                organizationCode: data,
            },
            { repeatFilter: true },
        )) as unknown as UserInfo
        if (this.userData) {
            this.userData.lastOrganizationCode = data
        }
        this.currentOrgCode = data
        Storage.setCookie('SELECT_ORG_CODE', data)
    }

    /**
     * 更新当前角色
     */
    update_user_role = (roleName: string | undefined) => {
        if (roleName) {
            Storage.setCookie('SELECT_ROLE_NAME', encode(roleName))
        } else {
            if (Storage.getCookie('SELECT_ROLE_NAME')) {
                Storage.delCookie('SELECT_ROLE_NAME')
            }
        }
    }

    /**
     * 用户机构下权限列表
     */
    getUserPermissionList = async (code: string | undefined) => {
        if (!code) return
        let userPermission: UserPermission[] = (await Http(
            globalApi.userPermission,
            'post',
            {
                organizationCode: code,
                type: 1,
            },
            {
                repeatFilter: false,
            },
        )) as unknown as UserPermission[]

        const flatten = (arr: UserPermission[]) => {
            let result: string[] = []
            arr.forEach(item => {
                if (Array.isArray(item.children)) {
                    result.push(item.route)
                    result = result.concat(flatten(item.children))
                } else {
                    result.push(item.route)
                }
            })
            return result
        }
        this.userPermissionList = flatten(userPermission)
    }

    /**
     * 获取用户信息
     */
    getUserData = async () => {
        let userData: UserInfo = (await Http(
            globalApi.getUserInfo,
            'get',
            {},
            {
                repeatFilter: false,
            },
        )) as unknown as UserInfo
        this.updateUserData(userData)
    }

    /**
     * 获取用户机构
     */
    getUserOrganization = async () => {
        if (!getCookie('TOKEN')) return
        let userOrg: UserOrgItem[] = (await Http(
            globalApi.getUserOrg,
            'get',
            {},
            {
                repeatFilter: true,
            },
        )) as unknown as UserOrgItem[]

        this.userOrg = userOrg
    }

    /**
     * 退出登录
     */
    login_out = () => {
        Http(globalApi.loginOut, 'get', {})
            .then(() => {
                const masterHistoryVO = getMasterHistory()
                const siteStore = getLocalStorage('SITE_STORE')
                let { baseInfo, sid = '' } = siteStore?.siteData?.data || {}
                Storage.delCookie('TOKEN')
                if (sid.toString() === '1') {
                    // TODO暂时写死 测试前往https://es.wozp.cn 预发未知 后期1.10更新版本
                    masterHistoryVO?.masterHistory?.replace(`/seller/login`)
                } else {
                    if (baseInfo?.pcDomain) {
                        window.location.replace(baseInfo?.pcDomain)
                    } else {
                        masterHistoryVO?.masterHistory?.replace('/account/user/login')
                    }
                }

                Storage.delLocalStorage('USER_STORE')
                this.userData = undefined
                message.success('退出成功')

                Storage.delCookie('USER_CODE')
                Storage.delCookie('SELECT_ORG_CODE')
                Storage.delCookie('SELECT_ROLE_NAME')
                Storage.delCookie('SELECT_USER_TYPE')
                // 从业务方登录后，退出登录跳回业务方工作台

                this.initStore()
            })
            .catch(() => {})
    }

    /**
     * 数据重置
     */
    initStore = () => {
        this.userAccount = undefined
        this.userData = undefined
        this.userGroup = []
        // this.currentOrgCertify = ORG_CERTIFY_STATUS_TYPE.UNVERIFIED
        this.currentOrgCode = ''
        this.userOrg = []
        this.userPermissionList = []
    }

    // 当页面load完成，get数据计算完成之后，isHydrated会置为true
    // 从本地同步数据到store是异步的 所以最好在页面useEffect添加store.isHydrated依赖 在里面判断isHydrated为true 之后再去做一些数据处理 防止数据错误
    get isHydrated() {
        return isHydrated(this)
    }
}
