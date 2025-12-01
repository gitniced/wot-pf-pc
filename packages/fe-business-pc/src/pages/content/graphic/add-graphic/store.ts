import { makeAutoObservable } from 'mobx'
import API from '../api'
import Http from '@/servers/http'
import { message } from 'antd'
import { getCookie } from '@/storage'
import type { Objtype, ItemType } from './interface'
import { history } from 'umi'

export default class {
    // 分页数据
    public dataSource: ItemType[] = []
    // 页码
    public pageNo: number = 1
    // 单页显示数量
    public pageSize: number = 10
    // 内容 富文本
    public editorText: string = ''
    //获取organizationCode
    public orgCode = getCookie('SELECT_ORG_CODE') || ''
    //总数
    public totalCount = 0
    // 图文标题
    public title: string = ''
    // 分类
    public categoryCode = null
    //封面
    public coverUrl: string = ''
    //点击编辑获取编辑的数据
    public editDetail: Partial<Objtype> = {}

    // 提交按钮的loading状态
    public btnLoading = false

    // 改变提交按钮的loading状态
    setBtnLoading = (loading: boolean) => {
        this.btnLoading = loading
    }

    setEditorText = (content: string) => {
        this.editorText = content
    }

    constructor() {
        makeAutoObservable(this)
    }

    //页码查询
    pageHandelr = (pageNo?: number, pageSize?: number) => {
        this.pageNo = pageNo ?? this.pageNo
        this.pageSize = pageSize ?? this.pageSize
        this.getGraphicData()
    }

    //获取数据
    getGraphicData = async () => {
        const res: any =
            (await Http(API.getGraphicData, 'POST', {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                organizationCode: this.orgCode,
                title: this.title,
                categoryCode: this.categoryCode,
            })) || {}

        const { currentPage, pageSize, pages, totalCount, data } = res || {}
        this.totalCount = totalCount
        this.dataSource = data
        // 判断删除第二页的最后一个的时候, 去请求第一页的数据
        if (pages && pages < currentPage) {
            this.pageHandelr(pages, pageSize)
        }
    }

    getVal = (values: Objtype) => {
        if (this.editorText === '<p><br></p>') {
            values.content = ''
        } else {
            values.content = this.editorText // 富文本 内容简介
        }
        values.cover = values?.cover?.[0]?.response?.url || values?.cover?.[0]?.url //封面
        const tempVal = { ...values, organizationCode: this.orgCode }
        return tempVal
    }
    getMessage = (type: number) => {
        switch (type) {
            case 1:
                message.success(`保存草稿成功`)
                break
            case 2:
                message.success(`保存成功`)
                break
            case 3:
                message.success(`发布成功`)
                break
            default:
                break
        }
        history.push('/content/graphic')
        this.getGraphicData()
    }

    //新建图文      状态0草稿1发布   status	状态0草稿1发布
    addText = async (values: Objtype) => {
        let tempVal = this.getVal(values)
        ;(await Http(API.addText, 'POST', tempVal, {
            repeatFilter: false,
            form: true,
        })) || {}
        this.getMessage(1)
    }

    // 修改
    editText = async (values: Objtype) => {
        let tempVal = this.getVal(values)
        ;(await Http(API.editText, 'POST', tempVal, {
            repeatFilter: false,
            form: true,
        })) || {}

        this.getMessage(2)
    }

    // 发布
    publishText = async (values: Objtype) => {
        let tempVal = this.getVal(values)
        ;(await Http(`${API.publishText}`, 'POST', tempVal, { repeatFilter: false })) || {}
        this.getMessage(3)
    }

    //通过code获取编辑的数据
    getEditDetail = async (code: string) => {
        const res = (await Http(`${API.getTextDetail}/${code}`, 'get', {}, {})) || {}

        // 将附件json处理为antd上传组件的格式
        let attachmentList
        try {
            attachmentList = JSON.parse(res?.attachmentJson || '[]')
        } catch (error) {
            console.log(error)
        }

        let attachment = attachmentList.map(element => {
            const { name, url } = element || {}
            return {
                name: name,
                status: 'done',
                url: url,
                uid: url,
                thumbUrl: url,
                response: {
                    name: name,
                    url: url,
                },
            }
        })

        console.log('attachment', attachment)

        this.editDetail = { ...res, attachment }
        console.log('this.editDetail', this.editDetail)

        return this.editDetail
    }
}
