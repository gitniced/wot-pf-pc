/**
 * @ Author: congrong
 * @ Create Time: 2022-12-22 11:10:13
 * @ Modified by: rong-log
 * @ Modified time: 2023-02-08 20:03:01
 */
import { runInAction, makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import type { PayAbleListType, PayAbleObjType } from './interface'
import { Modal, message } from 'antd'

class PayAbleStore {
    constructor() {
        makeAutoObservable(this)
    }
    PayAbleObj: PayAbleObjType = {
        pageNo: 1, // 页码
        pageSize: 10, // 单页显示数量
        companiesPageTotal: 0, //企业总数
        personPageTotal: 0, // 个人总数
    }

    // 企业列表数据
    companiesList: PayAbleListType[] = []
    // 个人列表数据
    personList: PayAbleListType[] = []
    // 定义单选按钮的值
    radioVal: number = 1
    // 点击编辑的时候不让select修改
    editForSelect: boolean = false

    // 分页查询抬头列表
    getImportList = async () => {
        const res: any = await http(
            api.importList,
            'POST',
            {
                type: this.radioVal,
            },
            { repeatFilter: false, form: true },
        )
        const { data, success } = res || {}
        if (success) {
            runInAction(() => {
                if (this.radioVal === 1) {
                    // 企业
                    this.companiesList = data || []
                } else if (this.radioVal === 2) {
                    // 个人
                    this.personList = data || []
                }
            })
        }
    }
    // 新增抬头
    addTitle = async (values: PayAbleListType) => {
        const res: any =
            (await http(api.addTitle, 'POST', values, {
                repeatFilter: false,
                form: true,
            })) || {}
        return res
    }
    // 编辑抬头
    editTitle = async (values: PayAbleListType) => {
        const res: any =
            (await http(api.editTitle, 'POST', values, {
                repeatFilter: false,
            })) || {}
        return res
    }

    //删除抬头
    deleteTitle = (code: string) => {
        Modal.confirm({
            type: 'warning',
            content: `是否确认删除该抬头信息？`,
            cancelText: '取消',
            okText: '确认',
            centered: true,
            onOk: () => {
                return http(`${api.deleteTitle}?code=${code}`, 'post', {}, {}).then(() => {
                    message.success('删除成功')
                    this.getImportList()
                })
            },
        })
    }
}

export default PayAbleStore
