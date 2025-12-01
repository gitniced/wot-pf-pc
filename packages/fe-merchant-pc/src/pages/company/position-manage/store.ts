import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import api from './api'
import { getCookie } from '@/storage'

interface ProfessionListFrontDto {
    /** 地址code */
    addressCode?: string
    /** 审核状态  0 待审核 1 审核通过 2 审核不通过 */
    auditStatus?: string
    /** 城市名称 */
    cityName?: string
    /** 职位code */
    code?: string
    /** 职位描述 */
    desc?: string
    /** 教育程度 */
    education?: number
    /** 经验 */
    experience?: number
    /** 行业code */
    industryCode?: string
    /** 组织code */
    organizationCode?: string
    /** 职位名称 */
    professionName?: string
    /** 职位类型Id */
    professionTypeId?: string
    /**  招聘类型 0 默认 1 社招 2 校招 3 实习 4 兼职 */
    recruitType?: string
    /** 最高月薪 */
    salaryMax?: number
    /** 最低月薪 */
    salaryMin?: number
    /** 薪水类型 1 元/时  2 元/天  3 元/周  4 元/月 */
    salaryType?: number
    /** 站点id */
    sid?: number
    /** 来源默认0 未知 1 平台  2  职培 3 考评 4 创培 */
    source?: string
    /** 签到状态 默认 0 待发布 1 已发布 2 下架 */
    status?: string
    /** 职业类型 1 企业 2 校企合作 3 其他 */
    type?: number
}

interface ProfessionPage {
    /** 当前页码 */
    currentPage?: number
    /** 数据 */
    data?: ProfessionListFrontDto[]
    /** 每页记录数 */
    pageSize?: number
    /** 总页数 */
    pages?: number
    /** 总数 */
    totalCount?: number
}

interface ProfessionStatus {
    /** 全部 */
    allCount?: number
    /** 关闭 */
    closedCount?: number
    /** 招聘中 */
    recruitCount?: number
    /** 待发布 */
    unPublishCount?: number
}

const items = ({
    allCount = 0,
    recruitCount = 0,
    unPublishCount = 0,
    closedCount = 0,
}: ProfessionStatus) => [
    {
        key: '',
        label: `全部职位(${allCount})`,
    },
    {
        key: '1',
        label: `招聘中(${recruitCount})`,
    },
    {
        key: '0',
        label: `待发布(${unPublishCount})`,
    },
    {
        key: '2',
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

    // 职位列表信息
    public dataSource: ProfessionPage = {}

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @description 查询权限
     * @param {type}
     * @return {*}
     * @memberof PositionManageStore
     */
    auth = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const data = await Http(`${api.auth}/${organizationCode}`, 'get', { repeatFilter: false })
        return data
    }

    /**
     *  查询分类数量
     */
    queryCount = async (params: any) => {
        const data = await Http(api.query_count, 'post', { ...params }, { repeatFilter: false })

        this.tabs = items(data as ProfessionStatus)
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageStore
     */
    profession_page = async (params: any) => {
        const resp = await Http(
            api.profession_page,
            'post',
            { pageNo: 1, pageSize: 10, ...params },
            { repeatFilter: false },
        )
        this.dataSource = resp as ProfessionPage
    }

    /**
     * @description 批量删除岗位
     * @author kaijiewang
     * @date 2023-09-20
     * @memberof PositionManageStore
     */
    deleteByCodes = async (professionCodeList: string[]) => {
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
}

export default PositionManageStore
