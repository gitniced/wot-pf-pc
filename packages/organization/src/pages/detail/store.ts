import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import { message } from 'antd'
import type { DetailType, FormValuesType, UploadImage } from './interface'
import api from './api'
import globalApi from '@/servers/globalApi'
import { ORG_CERTIFY_STATUS_TYPE } from '@wotu/wotu-components/dist/esm/Types'

class CustomerStore {
    constructor() {
        makeAutoObservable(this)
    }
    public avatar: string = ''
    public avatarList: UploadImage[] = []
    // 是否正在上传
    public isUpload: boolean = false
    public orgDetail: FormValuesType = { addressList: [], industry: [] }

    getOrgDetail = async (code: React.Key) => {
        if (!code) return
        const res: DetailType = (await http(
            `${api.detail}/${code}`,
            'get',
            {},
        )) as unknown as DetailType
        this.orgDetail = res
        // 省市区 code
        this.orgDetail.addressList = [res?.province, res?.city, res?.area]
        // 机构规模
        this.orgDetail.scale = String(res?.scale || '')
        // 机构logo
        res?.logo && (this.avatar = res.logo)
        // 所属行业
        this.orgDetail.industry = res?.industryList
        // 认证状态
        this.orgDetail.certifyStatus ??= ORG_CERTIFY_STATUS_TYPE.UNVERIFIED
        //认证主体和证件类型
        this.orgDetail.certifyCompanyType = res?.certifyCompanyType
        this.orgDetail.certifyDocumentType = res?.certifyDocumentType
        this.orgDetail.creditImage = res?.creditImage
        this.orgDetail.companyCode = res?.companyCode
    }

    toggleUploading = (upload: boolean) => {
        this.isUpload = upload
    }

    editOrg = (
        values: FormValuesType,
        code: string,
        updateCurrentOrganization: (code?: string) => void,
    ) => {
        if (Array.isArray(values?.industry)) {
            values.industryId = values.industry[1]?.id
                ? Number(values.industry[1]?.id)
                : Number(values.industry[1])
            delete values.industry
        }
        values.province = Number(values.addressList?.[0])
        values.city = Number(values.addressList?.[1])
        values.area = Number(values.addressList?.[2])
        delete values.addressList
        values.scale = Number(values.scale)
        //认证主体和证件类型
        values.certifyCompanyType = this.orgDetail.certifyCompanyType
        values.certifyDocumentType = this.orgDetail.certifyDocumentType
        values.creditImage = this.orgDetail.creditImage
        values.companyCode = this.orgDetail.companyCode
        values.logo = this.avatar

        http(api.edit, 'post', { ...values, code }).then(() => {
            message.success('机构信息修改成功')
            updateCurrentOrganization?.(code)
        })
    }

    /**
     * 上传图片文件 并填充对应key
     */
    imageUpload = async ({ image }: { image: File }) => {
        // tempEvent.map(item => clearTimeout(item))
        // let loadEvent = setTimeout(() => {
        //     this.toggleUploading(true)
        // }, 2000)
        // tempEvent.push(loadEvent)
        this.toggleUploading(true)
        const imageData = await http(
            globalApi.upload,
            'post',
            { file: image, isPrivate: false, type: 9 },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                delayTime: 60000,
            },
        )

        // tempEvent.map(item => clearTimeout(item))
        this.toggleUploading(false)

        const { url, name, ext } = imageData || {}

        const tempImage = {
            uid: url,
            name: `${name}.${ext}`,
            status: 'done',
            url,
            thumbUrl: url,
        }
        const tempAvatarList = JSON.parse(JSON.stringify(this.avatarList))
        tempAvatarList.push(tempImage)
        this.avatarList = tempAvatarList
        this.avatar = url
    }

    /**
     * 删除对应key中的图片
     */
    removeImage = ({ image }: { image: UploadImage }) => {
        let tempAvatarList = JSON.parse(JSON.stringify(this.avatarList))
        tempAvatarList = tempAvatarList.filter((item: UploadImage) => {
            return item.uid !== image.uid
        })
        this.avatarList = tempAvatarList
    }
}

export default CustomerStore
