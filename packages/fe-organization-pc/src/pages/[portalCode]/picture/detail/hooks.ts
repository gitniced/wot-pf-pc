import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type { ListItemProps } from './interface'
import { message } from 'antd'
import { getLocalStorage } from '@/storage'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'

export default class baseHooks {
    public imageText: ListItemProps = {
        categoryCodeList: [],
        categoryList: [],
        categoryNameList: [],
        code: '',
        content: '',
        cover: '',
        organizationCode: '',
        organizationName: '',
        publishTime: 0,
        sid: 0,
        siteName: '',
        sort: 0,
        status: 0,
        title: '',
    }
    constructor() {
        makeAutoObservable(this)
    }

    initPage = async () => {
        this.getMicroNavData()
        this.getMicroPageData()
    }

    getMicroNavData = async () => {
        const organizationCode = getPortalCodeFromUrl()
        if (!organizationCode) return
        const microNav = await Http(api.getMicroNav, 'get', { organizationCode })
        // microNav?.map((item, index) => {
        //     if (index === 0) {
        //         const { linkUrl } = item || {}
        //         this.homeCode = linkUrl
        //     }
        // })
        this.microNav = microNav
    }

    getMicroPageData = async (code?: string) => {
        let tempCode: string = ''
        if (code) {
            tempCode = code!
        } else {
            tempCode = this.homeCode
        }
        const organizationCode = getPortalCodeFromUrl()
        if (!organizationCode) return
        const microData = await Http(api.getMicroPage, 'post', {
            sid: getLocalStorage('SID'),
            code: tempCode,
            organizationCode,
        })
        let { httpStatusCode, summaryMicropageRespDto } = microData || {}
        if (Number(httpStatusCode || 0) === 200) {
            this.microData = summaryMicropageRespDto || {}
        }
    }

    getImageTextDetail = async (code: string) => {
        const res = (await http(
            `${api.getImageTextDetail}${code}`,
            'get',
            {},
            {
                repeatFilter: false,
            },
        )) as unknown as ListItemProps

        this.imageText = res
        return res
    }

    // 文件预览
    previewHandler = async (url: string) => {
        if (/(?:jpg|jpeg|png|pdf|bmp)$/i.test(url.toLowerCase())) {
            await Http(api.getPreviewUrl, 'post', {
                url,
            }).then((res: any) => {
                window.open(res?.url, '_blank')
            })
        } else {
            message.info('当前文件格式暂不支持在线预览')
        }
    }
    // a标签，跨域download属性不生效，使用该方法下载指定文件名
    downloadFile = (fileUrl: string, fileName: string) => {
        if (!fileUrl) {
            message.error('文件下载失败')
            return
        }
        let x = new XMLHttpRequest()
        // 初始化请求
        x.open('GET', fileUrl, true)
        // 一个用于定义响应类型的枚举值
        x.responseType = 'blob'
        // XMLHttpRequest请求成功完成时触发。 也可以使用 load 属性。
        x.onload = function () {
            let url = window.URL.createObjectURL(x.response)
            let a = document.createElement('a')
            a.href = url
            a.download = fileName || fileUrl
            a.click()
        }
        // 发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。
        x.send()
    }
}
