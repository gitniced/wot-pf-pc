import http from '@/servers/http'
import api from './api'
import type { IPagination } from '@/types/http'
import type {
    ICreateResourceBody,
    IGetResourceListBody,
    IRenameResourceBody,
    IResource,
    IResourceDetail,
    IStatResourceCountByMajor,
    IStatResourceCountByMajorBody,
    IUpdateResourceBody,
} from './types'
import globalApi from '@/servers/globalApi'
import { getCookie } from '@/storage'

export const getResourceList = async (data: IGetResourceListBody, userCode?: string) => {
    return await http<IGetResourceListBody, IPagination<IResource>>(
        api.getResourceList,
        'post',
        data,
        {
            query: {
                userCode,
            },
        },
    )
}

export const getResourceDetail = (code: string) => {
    return http<any, IResourceDetail>(api.getResourceDetail, 'get', {}, { query: { code } })
}

export const createResource = (data: ICreateResourceBody, userCode?: string) => {
    return http<ICreateResourceBody, string>(api.createResource, 'post', data, {
        query: {
            userCode,
        },
    })
}

export const updateResource = (data: IUpdateResourceBody, userCode?: string) => {
    return http<IUpdateResourceBody, string>(
        api.updateResource,
        'post',
        {
            ...data,
            identity: getCookie('SELECT_IDENTITY_CODE')
                ? Number(getCookie('SELECT_IDENTITY_CODE'))
                : undefined,
        },
        {
            query: {
                userCode,
            },
        },
    )
}

export const deleteResource = (code: string, userCode?: string) => {
    return http<any, string>(
        api.deleteResource,
        'post',
        {},
        {
            params: {
                code,
                userCode,
                identity: getCookie('SELECT_IDENTITY_CODE')
                    ? Number(getCookie('SELECT_IDENTITY_CODE'))
                    : undefined,
            },
        },
    )
}

export const renameResource = (data: IRenameResourceBody, userCode?: string) => {
    return http<IRenameResourceBody, string>(api.renameResource, 'post', data, {
        query: {
            userCode,
        },
    })
}

export const statResourceCountByMajor = (data: IStatResourceCountByMajorBody) => {
    return http<IStatResourceCountByMajorBody, IStatResourceCountByMajor[]>(
        api.statResourceCountByMajor,
        'get',
        data,
    )
}

export const uploadResourceFile = (image: File) => {
    return http<
        any,
        {
            ext: string
            hash: string
            name: string
            size: number
            url: string
            urlOriginal: string
        }
    >(
        globalApi.upload,
        'post',
        { file: image, isPrivate: false, type: 28 },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            delayTime: 60000,
            repeatFilter: false,
        },
    )
}
