import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../api'
import { useLocation } from 'umi'
import { getCookie, getLocalStorage } from '@/storage'
import { message } from 'antd'
class Store {
    public code = useLocation().query?.code

    /** 职位详情 */
    public JobData: any = {}
    public professionCode?: string

    /** 获取职位详情 */
    getJobData = async () => {
        const data = (await Http(`${Api.jobDetail}/${this.code}`, 'get', {})) ?? {}
        this.JobData = data
    }

    /** 相似职位 */
    public similarList: any = []

    /** 获取相似职位 */
    getSimilarList = async () => {
        const data = await Http(Api.similarList, 'post', {
            notInclude: this.code,
            professionTypeId: this.JobData?.professionTypeId,
        })
        this.similarList = data
    }

    /** 企业卡片 */
    public orgCard = {}

    /** 获取企业卡片 */
    getOrgCard = async () => {
        const data = await Http(Api.orgCard, 'post', {
            notInclude: this.code,
            organizationCode: this.JobData?.organizationCode,
        })
        this.orgCard = data
    }

    /** 附件简历 */
    public resumeList: any = []

    /** 投递简历 */
    submitResume = (data: any) => {
        const resumeFileCode = this.resumeList.find((item: any) => item.code === data.code)?.code

        // 投递简历附件
        return Http(Api.deliverPdfResume, 'post', {
            jobCode: this.JobData?.code,
            organizationCode: this.JobData?.organizationCode,
            customCookies: {
                [`h5Token${getLocalStorage('SID')}`]: getCookie('TOKEN'),
            },
            customLocalstorages: {
                openKey: '',
            },
            resumeFileCode,
        })
    }

    /** 获取附件简历 */
    getResumeList = async (code?: string) => {
        if (!getCookie('TOKEN')) return
        this.professionCode = code
        const data = (await Http(Api.resumeList, 'post', { professionCode: code })) ?? []
        this.resumeList = data
    }

    /** 上传附件简历 */
    uploadResumeFile = (val: any) => {
        const { status, response } = val?.[val.length - 1] ?? {}
        if (status === 'done') {
            message.success('上传成功')
            Http(Api.uploadResumeFile, 'post', { url: response?.url }).then(() => {
                this.getResumeList(this.professionCode)
            })
        }
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
