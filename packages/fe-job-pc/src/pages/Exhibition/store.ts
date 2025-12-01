import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import api from './api'

interface JobLibrary {
    currentPage: number
    data: any[]
    hasNextPage: boolean
    hasPreviousPage: boolean
    isFirstPage: boolean
    isLastPage: boolean
    pageSize: number
    totalCount: number
}

class ExhibitionStore {
    public jobTreeStructure = []

    constructor() {
        makeAutoObservable(this)
    }

    getJobInfoLibrary = async (catalogId: string) => {
        const data = (await Http(
            api.getJobInfoLibrary,
            'post',
            {
                pageNo: 1,
                pageSize: 100,
                catalogId,
            },
            { repeatFilter: false },
        )) as unknown as JobLibrary

        return Promise.resolve(data.data)
    }

    getJobTreeByCatalog = async (pid = '25') => {
        const data = (await Http(
            api.getJobTreeByCatalog,
            'post',
            {
                name: '',
                pageNo: 1,
                pageSize: 100,
                pid,
            },
            { repeatFilter: false },
        )) as unknown as any[]

        return Promise.resolve(data.filter(item => item.id === pid)[0].children)
    }

    /**
     * @description 获取职位库一级
     * @author kaijiewang
     * @date 2023-08-23
     */
    getJobLibrary = async (pid = '25') => {
        const data = (await Http(
            api.getJobCatalogLibrary,
            'post',
            {
                name: '',
                order: 'ASC',
                orderBy: 'createdAt',
                pageNo: 1,
                pageSize: 10,
                pid,
            },
            { repeatFilter: false },
        )) as unknown as JobLibrary

        return Promise.resolve(data.data)
    }
}

export default ExhibitionStore
