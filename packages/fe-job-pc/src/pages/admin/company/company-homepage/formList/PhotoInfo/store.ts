import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../api'
import { getCookie } from '@/storage'

class Store {

    /** 公司相册信息 */
    public photoInfo = {}

    /** 获取公司相册信息 */
    getPhotoInfo = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const data: any = await Http(`${Api.photoInfo}/${organizationCode}`, 'get', {}) ?? {}
        this.photoInfo = {
            ...data,
            imgList: data.photoList.filter((item: any) => item.urlType === 1).map(item => ({
                ...item,
                name:item.urlName
            })),
            videoList: data.photoList.filter((item: any) => item.urlType === 2).map(item => ({
                ...item,
                name:item.urlName
            }))
        }
    }
    /** 编辑公司相册信息 */
    editPhotoInfo = async (data: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const { imgList, videoList } = data

        const photoList = [
            ...imgList.map((item: any) => ({
                url: item.url,
                urlName: item.name,
                urlType: 1
            })),
            ...videoList.map((item: any) => ({
                url: item.response?.url,
                urlName: item.name,
                urlType: 2
            }))
        ]
        await Http(Api.editPhotoInfo, 'post', {
            organizationCode,
            photoList
        })
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
