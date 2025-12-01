import { runInAction, makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import type { createAuthPropsType, addAuthQueryType } from './interface'
import { message, Modal } from 'antd'
import { history } from 'umi'
import styles from './index.module.less'
import { SOURCE_TYPE_MAPPING } from '@wotu/wotu-components/dist/esm/Types'
import { getLocalStorage } from '@/storage'

class AuthStore {
    constructor() {
        makeAutoObservable(this)
    }
    // 机构id 'ORG220727W1FBX8G'
    organizationCode: string = ''
    // 部门列表
    departmentTree: any[] = []
    // 当前选中部门编码
    departmentCode: string[] = []
    // 角色列表
    roleList: any[] = []
    // 默认角色
    defaultAuth: string = ''
    // 新增or编辑成员
    operationAuth: string = ''
    // 编辑的成员
    selectUserCode: string = ''

    // 用户信息是否可编辑
    isInfoDisabled: boolean = false

    btnLoading: boolean = false //查询按钮loading状态
    btnLoading2: boolean = false //查询按钮loading状态

    // 获取机构 code
    getOrganizationCode = (code: any) => {
        this.organizationCode = code
    }

    // 进入成员编辑、新增
    enterAuth = (query: addAuthQueryType) => {
        query.type === 'addition'
            ? (this.operationAuth = '添加成员')
            : (this.operationAuth = '编辑成员')
        // this.departmentCode = query.departmentCode
        if (query.idCard) {
            this.selectUserCode = query.idCard
            this.isInfoDisabled = true
        }
    }

    // 新增or编辑成员
    setOperationAuth = (query: addAuthQueryType) => {
        this.operationAuth = query.type
    }

    // 新建成员
    createAuth = async (props: createAuthPropsType) => {
        let { idCard, mobile, name, roleCode, departmentCode = [] } = props
        departmentCode = departmentCode[departmentCode.length - 1] || ''
        this.btnLoading = true
        const sourceType = getLocalStorage('SOURCE_TYPE')
        const res: any = await http(
            api.createAuth,
            'POST',
            {
                departmentCode,
                idCard,
                mobile,
                name,
                roleCode,
                organizationCode: this.organizationCode,
                certificateType: 1,
                fromSid: getLocalStorage('FROM_SID'),
                sourceType: SOURCE_TYPE_MAPPING[sourceType] ? sourceType : '',
            },
            { form: true },
        ).finally(() => {
            this.btnLoading = false
        })
        const { success, message: mess, data } = res || {}
        if (success) {
            if (data?.name || data?.nickName) {
                Modal.confirm({
                    width: 480,
                    title: '该手机号已存在用户，确定将其要加入成员列表吗？',
                    content: (
                        <div className={styles.confirm_wrapper}>
                            <div>
                                昵称：<span>{data?.nickName}</span>
                            </div>
                            <div>
                                姓名：<span>{data?.name || '暂无'}</span>
                            </div>
                        </div>
                    ),
                    onOk: () => {
                        http(api.createStaffSendMessage, 'post', {
                            departmentCode,
                            mobile,
                            roleCode,
                            sourceType: SOURCE_TYPE_MAPPING[sourceType] ? sourceType : '',
                            fromSid: getLocalStorage('FROM_SID'),
                            organizationCode: this.organizationCode,
                        }).then(() => {
                            message.success(`${this.operationAuth}成功`)
                            history.goBack()
                        })
                    },
                })
                return
            }
            runInAction(() => {
                message.success(`${this.operationAuth}成功`)
                history.goBack()
            })
        } else {
            message.error(mess)
        }
    }

    //编辑成员
    editAuth = async (props: createAuthPropsType) => {
        let { roleCode, departmentCode = [] } = props
        this.btnLoading = true
        let tempDepartmentCode = departmentCode[departmentCode.length - 1] || ''
        const res: any = await http(
            api.editAuth,
            'POST',
            {
                departmentCode: tempDepartmentCode,
                roleCode,
                userCode: this.selectUserCode,
                organizationCode: this.organizationCode,
                certificateType: 1,
            },
            { form: true },
        ).finally(() => {
            this.btnLoading = false
        })
        const { success, message: mess } = res || {}

        if (success) {
            runInAction(() => {
                message.success(`${this.operationAuth}成功`)
                history.goBack()
            })
        } else {
            message.error(mess)
        }
    }

    //获取角色列表 roleList

    getRoleList = async () => {
        const res: any = await http(
            `${api.roleList}${this.organizationCode}`,
            'get',
            {
                organizationCode: this.organizationCode,
            },
            { form: true },
        )
        const { data, success } = res || {}
        if (success) {
            runInAction(() => {
                this.roleList = data || []
            })
        } else {
            message.error(res.message)
        }
    }

    flatDepartmentTree: any = (list: any) => {
        const res = []
        for (const item of list) {
            const { children } = item
            res.push(item)
            if (children && children?.length) {
                res.push(...this.flatDepartmentTree(children))
            }
        }
        return res
    }

    findParentDepartment = (list: any, lastDepartment: string) => {
        let finallyList = [lastDepartment]
        const loop = (tempDepartment: string) => {
            const findObj = list.find((i: any) => i.key === tempDepartment)
            const { parentCode } = findObj || {}
            if (parentCode) {
                finallyList.unshift(parentCode)
                loop(parentCode)
            }
        }
        loop(lastDepartment)
        return finallyList
    }

    //获取部门列表 roleList
    getDepartmentTree = async (lastDepartment?: string) => {
        const res: any = await http(
            `${api.getDepartmentTree}${this.organizationCode}`,
            'get',
            {},
            { form: true, repeatFilter: false },
        )
        const { data, success } = res || {}
        if (success) {
            runInAction(() => {
                if (lastDepartment) {
                    let temp = this.flatDepartmentTree(data.children)
                    let tempDepartment = this.findParentDepartment(temp, lastDepartment)
                    this.departmentCode = tempDepartment
                    // console.log(tempDepartment)
                }
                this.departmentTree = data.children
            })
        } else {
            message.error(res.message)
        }
    }
}

export default AuthStore
