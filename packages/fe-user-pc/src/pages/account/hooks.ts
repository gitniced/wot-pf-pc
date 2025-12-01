import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import type { AccountBindItem, AccountLogItem, AccountOrgItem, AccountGroupItem } from './interface'

import type { UserInfo } from '@/stores/interface'
import { history } from 'umi'
import { VERIFY_TYPE } from './const'
import { AUDIT_STATUS_TYPE } from '../bind/const'

import { isDisableEmailSite } from '@/utils/isEmailSite'
import { getDecodeInfo } from '@wotu/wotu-components'

export default class accountHooks {
    public userInfo: UserInfo
    public accountBind: AccountBindItem[] = [
        {
            name: '手机号码绑定',
            statusStr: '',
            unStatusStr: '未认证',
            status: VERIFY_TYPE.UNBIND,
            toolStr: '去认证',
            key: 'isValidatePhone',
            mindTitle: '手机号码未认证',
            mindInfo: '手机号做为用户登录的重要标识及密码找回重要依据，需要及时进行认证',
            encodeType: '2',
        },
        {
            name: '实名认证',
            statusStr: '账号身份已认证',
            unStatusStr: '账号身份暂未认证',
            status: AUDIT_STATUS_TYPE.FAIL,
            toolStr: '去认证',
            key: 'auditStatus',
            mindTitle: '账号身份未认证',
            mindInfo: '账号身份暂未认证,为保证账号的安全性,请及时完成实名认证!',
        },
        {
            name: '登录密码',
            statusStr: '密码已设置',
            unStatusStr: '未设置',
            status: VERIFY_TYPE.UNBIND,
            toolStr: '去更换',
            key: 'isInitPassword',
            mindTitle: '初始密码设置',
            mindInfo: '平台生成账号的初始密码并不安全，需要重新设置登录密码保证账号的安全性',
        },
        {
            name: '邮箱绑定',
            statusStr: '',
            unStatusStr: '未绑定',
            status: VERIFY_TYPE.UNBIND,
            toolStr: '去绑定',
            key: 'email',
            mindTitle: '邮箱绑定',
            mindInfo: '邮箱做为次级安全验证的辅助手段，需要完善保证手机不可用时用邮箱复制验证',
            encodeType: '3',
        },
    ]

    public accountLog: AccountLogItem[] = []
    public accountGroup: AccountGroupItem[] = []
    public accountOrg: AccountOrgItem[] = []

    public bindModalVisible = false

    constructor() {
        makeAutoObservable(this)

        this.userInfo = {
            avatar: '',
            code: '',
            email: '',
            gender: 0,
            idCardNo: '',
            isInitPassword: false,
            auditStatus: AUDIT_STATUS_TYPE.FAIL,
            // @ts-ignore
            certificateType: false,
            isValidatePhone: false,
            lastLoginTs: 0,
            mobile: '',
            name: '',
            nickname: '',
            username: '',
        }
    }

    setBindModalVisible = () => {
        this.bindModalVisible = !this.bindModalVisible
    }

    toLoginLog = () => {
        history.push('/recode')
    }

    toBaseInfo = () => {
        history.push('/baseinfo')
    }

    fixBind = async (key?: string, info?: string, userData?: UserInfo) => {
        switch (key) {
            case 'isValidatePhone':
                if (userData?.isValidatePhone) {
                    this.setBindModalVisible()
                } else {
                    history.push('/bind/phone?type=create')
                }
                break
            case 'auditStatus':
                history.push('/bind/idcard')
                break
            case 'certificateType':
                history.push('/bind/idcard')
                break
            case 'isInitPassword':
                history.push('/password')
                break
            case 'email':
                {
                    let isDisable = await isDisableEmailSite()
                    !isDisable && history.push('/bind/email')
                }

                break
            default:
                console.log(key)
        }
    }
    getBindUrl = (key: string, info?: string, userData?: UserInfo) => {
        switch (key) {
            case 'isValidatePhone':
                if (userData?.isValidatePhone) {
                    return undefined
                }
                return '/bind/phone?type=create'
            case 'auditStatus':
                return '/bind/idcard'
            case 'certificateType':
                return '/bind/idcard'
            case 'isInitPassword':
                return '/password'
            default:
                return undefined
        }
    }

    getAccountBind = async (userInfo: UserInfo) => {
        this.accountBind.map(item => {
            switch (item.key) {
                case 'isInitPassword':
                    item.status = Number(!userInfo[item.key])
                    break
                case 'email':
                    item.status = userInfo[item.key] ? VERIFY_TYPE.BIND : VERIFY_TYPE.UNBIND
                    break

                default:
                    item.status = Number(userInfo?.[item.key])
                    break
            }

            switch (item.key) {
                case 'email':
                    item.statusStr = getDecodeInfo(userInfo.email || '', '3')
                    if (item.status === VERIFY_TYPE.BIND) {
                        item.toolStr = '已绑定'
                    }
                    break
                case 'isValidatePhone':
                    item.statusStr = getDecodeInfo(userInfo.mobile || '', '2')
                    item.unStatusStr = getDecodeInfo(userInfo.mobile || '', '2')
                    if (item.status === VERIFY_TYPE.BIND) {
                        item.toolStr = '去更换'
                    }
                    break
                case 'auditStatus':
                    if (item.status === AUDIT_STATUS_TYPE.WAIT) {
                        //   审核中无需页面跳转
                        item.noneSkip = true
                        item.toolStr = '审核中'
                    } else if (item.status === VERIFY_TYPE.BIND) {
                        item.toolStr = '已认证'
                    }
                    break
                case 'certificateType':
                    if (item.status === VERIFY_TYPE.BIND) {
                        item.toolStr = '已认证'
                    }
                    break
                case 'isInitPassword':
                    if (item.status === VERIFY_TYPE.BIND) {
                        item.toolStr = '已设置'
                    } else {
                        item.toolStr = '去设置'
                    }
                    break
                default:
                    console.log(item.key)
            }
        })
    }

    getAccountLog = async () => {
        let logData = await Http(
            `${api.getAccountLog}/1`,
            'post',
            {
                pageNo: 1,
                pageSize: 2,
            },
            { repeatFilter: true },
        )
        let { data } = logData || []

        this.accountLog = data as unknown as AccountLogItem[]
    }

    getAccountGroup = async () => {
        let groupData: AccountGroupItem[] = (await Http(
            api.getAccountGroup,
            'get',
            {},
        )) as unknown as AccountGroupItem[]
        this.accountGroup = groupData || []
    }
    getAccountOrg = async () => {
        let orgData: AccountOrgItem[] = (await Http(
            api.getAccountOrg,
            'get',
            {},
        )) as unknown as AccountOrgItem[]
        this.accountOrg = orgData || []
    }
}
