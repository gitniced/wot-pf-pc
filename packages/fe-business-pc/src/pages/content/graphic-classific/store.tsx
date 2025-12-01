import { makeAutoObservable } from 'mobx'
import API from './api'
import Http from '@/servers/http'
import type { graphicType, nameObjType } from './interface'
import { message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { getCookie } from '@/storage'

export default class {
    // 分页数据
    public dataSource: graphicType[] = []
    //总数
    public totalCount = 0
    //获取organizationCode
    public orgCode = getCookie('SELECT_ORG_CODE')
    // 页码
    public pageNo: number = 1
    // 单页显示数量
    public pageSize: number = 10
    // name 搜索的参数
    public titleName: string = ''

    constructor() {
        makeAutoObservable(this)
    }
    //搜索
    searchData = (name: nameObjType) => {
        this.titleName = name?.name
        this.getGraphicClassData()
    }
    // 重置
    resetData = () => {
        this.pageNo = 1
        this.pageSize = 10
        this.titleName = ''
        this.getGraphicClassData()
    }
    //页码查询
    pageHandelr = (pageNo?: number, pageSize?: number) => {
        this.pageNo = pageNo ?? this.pageNo
        this.pageSize = pageSize ?? this.pageSize
        this.getGraphicClassData()
    }
    //获取数据
    getGraphicClassData = async () => {
        const res: any =
            (await Http(API.getGraphicClassData, 'POST', {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                organizationCode: this.orgCode,
                name: this.titleName,
            })) || {}

        const { currentPage, pageSize, pages, totalCount, data } = res || {}
        this.totalCount = totalCount
        this.dataSource = data
        // 判断删除第二页的最后一个的时候, 去请求第一页的数据
        if (pages && pages < currentPage) {
            this.pageHandelr(pages, pageSize)
        }
    }

    // 新增图文分类
    addClass = async (values: nameObjType) => {
        const res: any =
            (await Http(API.add, 'POST', values, {
                repeatFilter: false,
            })) || {}
        return res
    }
    // 编辑图文分类
    editClass = async (values: graphicType) => {
        const res: any =
            (await Http(API.edit, 'POST', values, {
                repeatFilter: false,
            })) || {}
        return res
    }
    //删除图文分类
    deleteClass = async (code: string) => {
        const res: any = (await Http(`${API.delete}/${code}`, 'POST', {}, {})) || {}
        if (res) {
            message.success(`删除成功`)
            this.getGraphicClassData()
        }
    }

    //:确认删除
    confirm = (codes: string) => {
        Modal.confirm({
            title: '确定要删除该页面吗，该操作不可逆。',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                return this.deleteClass(codes)
            },
        })
    }
}
