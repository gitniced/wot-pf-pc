import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import Api from '../api'

class Store {

    /** 页脚文案 */
    public footerCopy: any[] = []

    /** 获取页脚文案管理 */
    getFooterCopy = async (sid: string) => {
        const res = await Http(Api.recommendPage, 'post', {
            formAlias: 'PagefooterCopywritingManage',
            status: 0,
            pageSize: 10,
            pageNo: 1,
            sid,
        })
        this.footerCopy = res?.data ?? []
    }

    /** 页脚资质 */
    public FooterQualification: any[] = []

    /** 获取页脚资质管理 */
    getFooterQualification = async (sid: string) => {
        const res = await Http(Api.recommendPage, 'post', {
            formAlias: 'PagefooterQualificationsManage',
            status: 0,
            pageSize: 10,
            pageNo: 1,
            sid,
        })
        this.FooterQualification = res?.data ?? []
    }

    constructor() {
        makeAutoObservable(this)
    }

}

export default Store