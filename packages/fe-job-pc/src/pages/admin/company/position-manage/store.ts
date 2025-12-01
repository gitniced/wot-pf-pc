import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import api from './api'
import type { ProfessionStatus } from './interface'
import { omit } from 'lodash'

const items = ({
    allCount = 0,
    recruitCount = 0,
    unPublishCount = 0,
    closedCount = 0,
}: ProfessionStatus) => [
    {
        key: null,
        label: `全部职位(${allCount})`,
    },
    {
        key: 1,
        label: `招聘中(${recruitCount})`,
    },
    {
        key: 0,
        label: `待发布(${unPublishCount})`,
    },
    {
        key: 2,
        label: `已关闭(${closedCount})`,
    },
]

class PositionManageStore {
    // 教育经历下拉列表
    public educationOption = []
    // 经验下拉列表
    public experienceOption = []

    // tabs标签
    public tabs = items({ allCount: 0, recruitCount: 0, unPublishCount: 0, closedCount: 0 })

    // pagination
    public pagination = { pageNo: 1, pageSize: 10 }
    // totalCount
    public totalCount = 0

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    education = async () => {
        const resp = await Http(api.education, 'get', {}, { repeatFilter: false })
        this.educationOption = resp as unknown as []
    }

    /**
     * @description  经验列表
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    experience = async () => {
        const resp = await Http(api.experience, 'get', {}, { repeatFilter: false })
        this.experienceOption = resp as unknown as []
    }

    /**
     *  查询分类数量
     */
    queryCount = async () => {
        const data = await Http(api.query_count, 'post', {}, { repeatFilter: false })

        this.tabs = items(data as ProfessionStatus)
    }

    onChangePagination = (pageNo: number, pageSize: number) => {
        this.pagination = { ...this.pagination, pageNo, pageSize }
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageStore
     */
    profession_page = async (params: any) => {
        const { pageNo, pageSize } = this.pagination

        let omitParams = { ...params }

        if (params.status === null) {
            omitParams = omit(params, 'status')
        }

        const resp: any = await Http(
            api.profession_page,
            'post',
            { ...omitParams, pageNo, pageSize },
            { repeatFilter: false },
        )

        const { data, totalCount = 0, success = true } = resp
        this.totalCount = totalCount
        return { data, totalCount, success }
    }

    /**
     * @description 批量删除岗位
     * @author kaijiewang
     * @date 2023-09-20
     * @memberof PositionManageStore
     */
    deleteByCodes = async (professionCodeList: string[] = []) => {
        const resp = await Http(
            api.delete_by_codes,
            'post',
            { professionCodeList },
            { repeatFilter: false },
        )
        return resp
    }

    /**
     * @description 更新岗位状态
     * @author kaijiewang
     * @date 2023-09-20
     * @memberof PositionManageStore
     */
    updateStatus = async ({ code, status }: { code: string; status: number }) => {
        const resp = await Http(
            api.update_status,
            'post',
            { code, status },
            { repeatFilter: false },
        )
        return resp
    }
}

export default new PositionManageStore()
