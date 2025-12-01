import { makeAutoObservable, runInAction } from 'mobx'

import Http from '@/servers/http'

interface IGenerateResumeAttachment {
    url: string
    customCookies: object
    customLocalstorages: object
}

class Store {
    /** 附件简历个数 */
    public attachmentCount: number = 0

    constructor() {
        makeAutoObservable(this)
        this.getResumeAttachmentList()
    }

    /** 获取附件简历个数 */
    getResumeAttachmentList = async () => {
        const data = (await Http(
            '/job/resume/list',
            'post',
            {},
            { repeatFilter: false },
        )) as unknown as []

        runInAction(() => {
            this.attachmentCount = (data.length as number) || 0
        })
    }

    // 生成临时的附件简历，预览
    generateTempResumeAttachment = (params: IGenerateResumeAttachment) => {
        return Http(
            '/job/resume/create_temp_resume_file_detail',
            'post',
            { ...params },
            { repeatFilter: false },
        )
    }

    /**  生成简历附件  */
    generateResumeAttachment = (params: IGenerateResumeAttachment) => {
        return Http(
            '/job/resume/create_resume_file_detail',
            'post',
            { ...params },
            { repeatFilter: false },
        )
    }
}

export default Store
