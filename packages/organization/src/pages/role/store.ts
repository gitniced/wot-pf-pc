import { runInAction, makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import { message } from 'antd'

class RoleStore {
    constructor() {
        makeAutoObservable(this)
    }
    // 机构code ORGANIZATION_CODE
    organizationCode: string = ''

    // 机构详情
    organizationDetail: any = {}

    // 角色列表
    roleList: any[] = []
    pageSize = 10
    pageNo = 1
    pageTotal = 0

    // 获取机构 code
    getOrganizationCode = (code: any) => {
        this.organizationCode = code
    }

    pageHandler = (pageNo: number, pageSize: number) => {
        if (pageNo) this.pageNo = pageNo
        if (pageSize) this.pageSize = pageSize
        this.getRoleList()
    }

    getRoleList = async () => {
        const res: any = await http(
            api.rolePageList,
            'post',
            {
                organizationCode: this.organizationCode,
                pageSize: this.pageSize,
                pageNo: this.pageNo,
            },
            { form: true, repeatFilter: false },
        )
        const { data, success } = res || {}

        if (success) {
            runInAction(() => {
                this.roleList = []
                this.pageTotal = data?.totalCount || 0
                data?.data?.map((item: any, index: number) => {
                    let { code, name, description, type } = item || {}
                    code = String(code) ?? '-'
                    name ??= ''
                    description ??= ''

                    let serial = index + (Number(this.pageNo) - 1) * this.pageSize + 1
                    this.roleList.push({
                        code,
                        serial,
                        name,
                        description,
                        type,
                    })
                })
            })
        } else {
            message.error(data?.message)
        }
        if (window?.update_page_size && data?.pageSize) {
            window?.update_page_size?.(data?.pageSize)
        }
    }

    // 删除角色 /{code}
    deleteRole = async (code: string) => {
        return http(`${api.deleteRole}`, 'POST', {
            organizationCode: this.organizationCode,
            roleCode: code,
        }).then(() => {
            this.getRoleList()
            message.success('删除成功')
        })
    }

    // 创建角色
    createRole = async (info: any, code: string) => {
        const res: any = await http(
            api.createRole,
            'POST',
            {
                description: info.description,
                name: info.name,
                code,
                organizationCode: this.organizationCode,
            },
            { form: true },
        )
        const { success, message: mess } = res || {}

        if (success) {
            runInAction(() => {
                this.getRoleList()
                message.success('创建成功')
            })
        } else {
            message.error(mess)
        }
    }

    // 机构详情
    getOrganizationDetail = async () => {
        const res: any = await http(
            `${api.organizationDetail}${this.organizationCode}`,
            'get',
            {},
            { form: true },
        )
        const { data, success } = res || {}

        if (success) {
            this.organizationDetail = data || {}
        } else {
            message.error(data?.message)
        }
    }

    isHasUser = async (roleCode: string) => {
        return http(`${api.roleHasUser}${roleCode}`, 'GET', {
            roleCode,
        })
    }
}

export default RoleStore
