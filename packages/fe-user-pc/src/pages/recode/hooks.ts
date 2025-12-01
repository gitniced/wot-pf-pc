import Http from '@/servers/http'
// import type SiteStore from '@/stores/siteStore'
// import type UserStore from '@/stores/userStore'
import { makeAutoObservable } from 'mobx'
// import { history } from 'umi'
import api from './api'
import type { AccountLogItem } from './interface'

export default class recodeHooks {
    public accountLog: AccountLogItem[] = []

    public pageParma = {
        pageNo: 1,
        pageSize: 10,
        pages: 1,
        totalCount: 0,
    }

    constructor() {
        makeAutoObservable(this)
    }

    pageHandelr = (pageNo: number, pageSize: number) => {
        this.pageParma = {
            ...this.pageParma,
            pageNo,
            pageSize,
        }

        this.getAccountLog()
    }

    getAccountLog = async () => {
        let logData: AccountLogItem[] = (await Http(`${api.getAccountLog}/2`, 'post', {
            pageNo: this.pageParma.pageNo,
            pageSize: this.pageParma.pageSize,
        })) as unknown as AccountLogItem[]

        const { data, totalCount, pages, pageSize } = logData

        this.pageParma = {
            ...this.pageParma,
            pages,
            totalCount,
        }
        if (update_page_size) {
            update_page_size(pageSize)
        }
        this.accountLog = data
    }
}
