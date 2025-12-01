import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import type { BatchDetailDto } from '@/@types/auth/index'
import { getLocalStorage } from '@/storage/localStorage'
import type {
    SearchParams,
    TableData,
    ImportParams,
    TableItem,
    ExtraSearchParams,
} from './interface'
import { initSearchParams } from './const'
import dayjs from 'dayjs'
import API from './api'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import { BELONG_TYPE_ENUM } from '@/constants'

class useHook {
    /** 请求参数 */
    public searchParams =
        getLocalStorage('QUESTIONSEARCHPARAMS')?.searchParams ||
        (initSearchParams as unknown as SearchParams)
    public extraSearchParams: ExtraSearchParams = {}
    /** 试题数据 */
    public tableData = {} as TableData
    /** 导入参数  */
    public importParams = {} as ImportParams
    /** 导入结果  */
    public importData = {} as BatchDetailDto & { successCount: number }
    /** 预览数据  */
    public previewData = null as TableItem | null
    public lastOrganizationCode: string | undefined

    constructor() {
        makeAutoObservable(this)
        makePersistable(this, {
            name: 'questionSearchParams', // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
            properties: ['searchParams'], // 要保存的字段，这些字段会被保存在name对应的storage中，注意：不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
            storage: window.localStorage, // 保存的位置：看自己的业务情况选择，可以是localStorage，sessionstorage
        })
    }

    // 当页面load完成，get数据计算完成之后，isHydrated会置为true
    // 从本地同步数据到store是异步的 所以最好在页面useEffect添加store.isHydrated依赖 在里面判断isHydrated为true 之后再去做一些数据处理 防止数据错误
    get isHydrated() {
        return isHydrated(this)
    }

    updateLastOrganizationCode = (e: string) => {
        this.lastOrganizationCode = e
    }

    /**
     * 获取表格数据
     * @param params 请求参数
     */
    getTableData = async (params: any) => {
        const res: any = (await http(API.questionPage, 'post', {
            ...params,
        })) as unknown as TableData

        const { data = [], totalCount = 0, success = true } = res
        return { data, totalCount, success }
    }

    /**
     * 上传文件修改导入参数
     */
    updateImportParams = (importParams: ImportParams) => {
        this.importParams = {
            ...this.importParams,
            ...importParams,
        }
    }

    /**
     * 开始批量导入
     * @param params 导入参数
     */
    excelImport = async (subject?: number) => {
        return await http(API.excelImport, 'post', {
            subject,
            fileName: this.importParams?.name,
            fileUrl: this.importParams?.url,
            type: 3, // 1 组织成员导入 2 批量删除 3 试题导入
            organizationCode: this.lastOrganizationCode,
            belongType: BELONG_TYPE_ENUM.MERCHANT,
        })
    }

    /**
     * 获得导入结果
     */
    getImportData = async (code: string) => {
        const res: any =
            ((await http(`${API.excelResult}/${code}`, 'get', {})) as unknown as BatchDetailDto & {
                successCount: number
            }) || {}
        res.successCount = res?.totalCount - res?.failCount || 0
        this.importData = res
        return res
    }

    /**
     * 更新预览数据
     */
    updatePreviewData = (data: TableItem | null) => {
        this.previewData = data
    }

    /**
     * 删除表格数据
     */
    deleteTableItem = async (code: string) => {
        await http(`${API.deleteTableItem}/${code}`, 'post', {})
    }
}

export default useHook
