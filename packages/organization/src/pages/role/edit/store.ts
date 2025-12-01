import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from '../api'
import type { RoleQueryType } from './interface'
import { message } from 'antd'
import { history } from 'umi'

class RoleStore {
    constructor() {
        makeAutoObservable(this)
    }
    // 角色名称
    name: string = ''
    // 角色描述
    description: string = ''
    // 阶段
    step: number = 0
    public btnLoading: boolean = false //查询按钮loading状态
    // 机构code
    organizationCode: string = ''
    // 角色列表
    roleCode: string = ''

    pageTitle: string = ''
    operationRole: string = ''
    permissionIds: string[] = []

    checkChange = (data: any) => {
        let checkList: string[] = []
        data?.map?.((items: any) => {
            items?.children?.map((first: any) => {
                if (first?.has) {
                    checkList.push(first.key)
                }
                first?.children?.map((second: any) => {
                    if (second?.has) {
                        checkList.push(second.key)
                    }
                    second?.children?.map((third: any) => {
                        if (third?.has) {
                            checkList.push(third?.key)
                        }
                        third?.children?.map((fourth: any) => {
                            if (fourth?.has) {
                                checkList.push(fourth?.key)
                            }
                        })
                    })
                })
            })
        })
        const permissionIds = Array.from(new Set(checkList))
        this.permissionIds = permissionIds
    }

    // 进入角色编辑、新增
    enterAuth = (query: RoleQueryType, code: string) => {
        if (query.code) {
            this.roleCode = query.code
        }
        this.organizationCode = code
        this.operationRole = query.type
        query.type === 'new' ? (this.pageTitle = '角色新增') : (this.pageTitle = '角色编辑')
    }

    // 获取角色详情
    getRoleDetail = (roleCode: string) => {
        return http(`${api.getRoleDetail}${roleCode}`, 'get', { roleCode }).then((res: any) => {
            const { name, description } = res || {}
            this.name = name
            this.description = description
        })
    }

    updateStep = (num: number) => {
        this.step = num
    }

    // 新增角色
    createRole = (data: any) => {
        this.btnLoading = true
        http(api.createRole, 'POST', {
            ...data,
            organizationCode: this.organizationCode,
            permissionIds: this.permissionIds,
        })
            .then(() => {
                message.success(`${this.pageTitle}成功`)
                history.goBack()
            })
            .finally(() => {
                this.btnLoading = false
            })
    }

    // edit角色
    editRole = (data: any) => {
        this.btnLoading = true
        http(api.editRole, 'POST', {
            ...data,
            code: this.roleCode,
            organizationCode: this.organizationCode,
            permissionIds: this.permissionIds,
        })
            .then(() => {
                message.success(`${this.pageTitle}成功`)
                history.goBack()
            })
            .finally(() => {
                this.btnLoading = false
            })
    }
}

export default RoleStore
