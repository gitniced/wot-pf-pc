import http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import API from './api'

class useHook {
    /** 页脚文案 */
    public footerCopy: any[] = []
    /** 页脚资质 */
    public FooterQualification: any[] = []

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * 获取页脚文案管理
     */
    getFooterCopy = async (sid: string) => {
        const res = await http(API.recommendList, 'post', {
            formAlias: 'PagefooterCopywritingManage',
            status: 0,
            sid,
        })
        this.footerCopy = res?? []
    }

    /**
     * 获取页脚资质管理
     */
    getFooterQualification = async (sid: string) => {
        const res = await http(API.recommendList, 'post', {
            formAlias: 'PagefooterQualificationsManage',
            status: 0,
            sid,
        })
        this.FooterQualification = res ?? []
    }
}

export default useHook
