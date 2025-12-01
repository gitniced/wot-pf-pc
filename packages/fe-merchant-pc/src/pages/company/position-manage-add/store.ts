import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import api from './api'
import { connectWS } from '@/utils/chatWS'
import { getCookie, getLocalStorage } from '@/storage'

const sid = getLocalStorage('SID')

class PositionManageAddStore {
    // 教育经历下拉列表
    public educationOption = []
    // 经验下拉列表
    public experienceOption = []
    // 薪酬范围下拉列表
    public salaryTypeOption = []
    // 结算方式下拉列表
    public settlementTypeOption = []
    // 一级岗位
    public firstLevelJob = []
    // 当前职业下的标签
    public professionTags = []
    // 根据组织查询所有的地址
    public organizationAddress = []
    // 标签
    public tagNames = []
    // 商圈列表
    public businessArea = []

    // ai 服务的code
    public sessionCode = ''

    // websocket 实例
    public ws = null as unknown as WebSocket
    // 显示创建地址
    public showAddAddress = false

    constructor() {
        makeAutoObservable(this)
        this.getSessionCode()
    }

    // 更正创建地址弹框
    updateShowAddAddress = (bool: boolean) => {
        this.showAddAddress = bool
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    getTree = (id: number) => {
        return Http(`${api.list_tree}/${id}`, 'get', {}, { repeatFilter: false })
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
     * @description 薪水类型
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    salaryType = async () => {
        const resp = await Http(api.salary_type, 'get', {}, { repeatFilter: false })
        this.salaryTypeOption = resp as unknown as []
    }

    /**
     * @description 支付方式
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    settlementType = async () => {
        const resp = await Http(api.settlement_type, 'get', {}, { repeatFilter: false })
        this.settlementTypeOption = resp as unknown as []
    }

    /**
     * @description 企业新增职位
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    jobAdd = async (params: object) => {
        const resp = await Http(api.job_add, 'post', { ...params, sid }, { repeatFilter: false })
        return resp
    }

    /**
     * @description 企业新增职位
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    jobEdit = async (params: object) => {
        const resp = await Http(api.add_edit, 'post', { ...params, sid }, { repeatFilter: false })
        return resp
    }

    /**
     * @description 企业更新职位状态
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    updateStatus = async ({ code, status }: { code: string; status: number }) => {
        const resp = await Http(
            api.update_status,
            'post',
            { code, status },
            { repeatFilter: false },
        )
    }

    /**
     * @description 获取二三级岗位树
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    jobTree = async (id: number) => {
        const resp = await Http(`${api.list_tree}/${id}`, 'get', {}, { repeatFilter: false })
    }

    /**
     * @description 获取一级岗位树
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    jobFirstLevel = async (pid: number) => {
        const resp = await Http(`${api.list_by_pid}/${pid}`, 'get', {}, { repeatFilter: false })
        this.firstLevelJob = resp as unknown as []
    }

    /**
     * @description 根据职业类型获取职业标签
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    professTypeTag = async (professionTypeId: string) => {
        const resp = await Http(
            `${api.tag_profess_type}`,
            'get',
            { professionTypeId },
            { repeatFilter: false },
        )
        this.professionTags = resp as unknown as []
        return resp
    }

    /**
     * @description 根据职业类型获取职业标签
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    professDetail = async (code: string) => {
        const resp = await Http(
            `${api.enterprise_info}/${code}`,
            'get',
            {},
            { repeatFilter: false },
        )
        return resp
    }

    /**
     * @description 新增地址信息
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    addWorkAddress = async (params: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const resp = await Http(
            api.add_work_address,
            'post',
            { ...params, organizationCode },
            { repeatFilter: false },
        )
        return resp
    }

    /**
     * @description 新增地址信息
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    queryWorkAddress = async (params: any) => {
        const resp = await Http(
            api.add_work_address,
            'post',
            { ...params },
            { repeatFilter: false },
        )
    }

    /**
     * @description 查询组织下所有地址
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    queryOrganizationAddress = async () => {
        const selectOrgCode = getCookie('SELECT_ORG_CODE')
        const resp = await Http(
            `${api.organization_address}/${selectOrgCode}`,
            'get',
            {},
            { repeatFilter: false },
        )
        this.organizationAddress = resp as unknown as []

        return resp
    }

    /**
     * @description 根据岗位查询
     * @author kaijiewang
     * @date 2023-09-19
     * @memberof PositionManageAddStore
     */
    capacityList = (idList: []) => {
        return Http(api.capacity_list, 'post', { idList }, { repeatFilter: false })
    }

    /**
     * @description 标签列表
     * @author kaijiewang
     * @date 2023-09-19
     * @memberof PositionManageAddStore
     */
    queryTagName = async (param: object) => {
        const resp = await Http(api.tag_name, 'post', { ...param }, { repeatFilter: false })
        this.tagNames = resp as unknown as []

        return resp
    }

    /**
     * @description 标签列表
     * @author kaijiewang
     * @date 2023-09-19
     * @memberof PositionManageAddStore
     */
    queryCustomTagName = async (param: object) => {
        const resp = await Http(api.tag_name, 'post', { ...param }, { repeatFilter: false })
        return resp
    }

    /**
     * @description 单个添加标签
     * @author kaijiewang
     * @date 2023-09-19
     * @memberof PositionManageAddStore
     */
    tagAdd = async (params: object) => {
        const resp = await Http(api.tag_add, 'post', { ...params }, { repeatFilter: false })
        return resp
    }

    /**
     * @description 查询商圈列表
     * @author kaijiewang
     * @date 2023-09-19
     * @memberof PositionManageAddStore
     */
    queryBusinessArea = async () => {
        const resp = await Http(
            api.category,
            'get',
            { alias: 'work_area' },
            { repeatFilter: false },
        )
        this.businessArea = resp as unknown as []
    }

    /**
     * @description 获取ai的sessionCode
     * @author kaijiewang
     * @date 2023-10-02
     * @param {type} params
     */
    getAIChat = async (content: string) => {
        const data: any = await Http(
            api.ai_send,
            'post',
            { content, isNoLimit: true },
            { repeatFilter: false },
        )

        return data?.sessionCode
    }

    /**
     * @description 获取ai的sessionCode
     * @author kaijiewang
     * @date 2023-10-02
     * @param {type} params
     */
    getSessionCode = async () => {
        const ws = connectWS()
        this.ws = ws
    }
}

export default PositionManageAddStore
