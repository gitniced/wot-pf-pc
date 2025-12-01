import { makeAutoObservable } from 'mobx'
import type { FormDataType, FormPropsType } from './interface'
import http from '@/servers/http'
import api from './api'
import { message } from 'antd'

class ProposerStore {
    constructor() {
        makeAutoObservable(this)
    }
    // 申请人页列表
    proposeList: FormDataType[] = []
    // 部门编码
    departmentCode: string = ''
    // 机构编码
    organizationCode: string = ''
    // 页码
    pageNo: number = 1
    // 单页显示数量
    pageSize = 10
    pageTotal: number = 0
    public btnLoading: boolean = false //查询按钮loading状态

    // form的values
    formValues: FormPropsType = {}

    enterPage = (query: any, code: any) => {
        this.organizationCode = code
        this.departmentCode = query.departmentCode
    }

    pageHandler = (pageNo: number, pageSize: number) => {
        this.pageNo = pageNo ?? this.pageNo
        this.pageSize = pageSize ?? this.pageSize
        this.getProposeList()
    }
    // SizeChange
    changeSize = (pageNo: number, pageSize?: number) => {
        this.pageNo = pageNo ?? this.pageNo
        this.pageSize = pageSize ?? this.pageSize
    }

    //   查询分页列表

    getProposeList = (pageNo?: number, values?: any) => {
        this.pageNo = pageNo ?? this.pageNo
        values && (this.formValues = values)
        this.btnLoading = true
        http(
            api.propose,
            'post',
            {
                ...this.formValues,
                organizationCode: this.organizationCode,
                departmentCode: this.departmentCode,
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            },
            {
                repeatFilter: false,
            },
        )
            .then((res: unknown) => {
                this.pageTotal = res?.totalCount || 0
                res?.data?.map((item: FormDataType) => {
                    item.key = item?.code
                })
                this.proposeList = res?.data || []

                if (window?.update_page_size && res?.pageSize) {
                    window?.update_page_size?.(res?.pageSize)
                }
            })
            .finally(() => {
                this.btnLoading = false
            })
    }

    // 处理申请
    deleteRole = async (code: string, status: string) => {
        await http(`${api.dispose}`, 'POST', {
            code,
            status,
            organizationCode: this.organizationCode,
        })

        this.getProposeList()
        message.success('处理成功')
    }

    // 删除申请
    deleteApply = async (inviteCode: React.Key[]) => {
        console.log('inviteCode', inviteCode)
        const res: any = await http(
            api.deleteApply,
            'POST',
            {
                inviteCode,
                organizationCode: this.organizationCode,
            },
            { form: true },
        )
        const { success } = res || {}

        if (success) {
            this.getProposeList()
            message.success('删除成功')
        } else {
            message.error(res.message)
        }
    }
}

export default ProposerStore
