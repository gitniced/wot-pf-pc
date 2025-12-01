import globalApi from '@/servers/globalApi'
import Http from '@/servers/http'
import { message } from 'antd'
import { makeAutoObservable, toJS } from 'mobx'
import api from './api'
import { CERTIFICATE_TYPE } from './const'
import type { UserInfo } from '@/stores/interface'
import type { IDCardType } from './interface'
import { getLocalStorage } from '@/storage'
import { history } from 'umi'

interface UploadImage {
    uid: string
    name: string
    status: string
    url: string
    thumbUrl: string
}

export default class idcardHooks {
    public idCardImageList = {
        front: [],
        back: [],
    }

    public idcardBack: string = ''
    public idcardFront: string = ''
    public idcardNo: string = ''
    public remark: string = ''
    public userCode: string = ''
    public showFix: boolean = false
    public btnLoading: boolean = false
    constructor() {
        makeAutoObservable(this)
    }

    // 设置提交按钮的loading状态
    setBtnLoading = (bool: boolean) => {
        this.btnLoading = bool
    }
    /**
     * 上传图片文件 并填充对应key
     */
    imageUpload = async ({ image, key }: { image: File; key: string }) => {
        const imageData = await Http(
            globalApi.upload,
            'post',
            { file: image, isPrivate: false, type: 7 },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                delayTime: 60000,
            },
        )

        const { url, name, ext } = imageData || {}

        const tempImage = {
            uid: url,
            name: `${name}.${ext}`,
            status: 'done',
            url,
            thumbUrl: url,
        }
        const tempSiteImageList = JSON.parse(JSON.stringify(this.idCardImageList))
        tempSiteImageList[key].push(tempImage)
        this.idCardImageList = tempSiteImageList

        console.log(toJS(this.idCardImageList))
    }
    /**
     * 添加对应key中的图片
     */
    addImage = ({ image, key }: { image: any; key: string }) => {
        console.log(image, key)
        const { url, name, ext } = image || {}
        const tempImage = {
            uid: url,
            name: `${name}.${ext}`,
            status: 'done',
            url,
            thumbUrl: url,
        }
        const tempSiteImageList = JSON.parse(JSON.stringify(this.idCardImageList))
        tempSiteImageList[key].push(tempImage)
        this.idCardImageList = tempSiteImageList
    }

    /**
     * 删除对应key中的图片
     */
    removeImage = ({ image, key }: { image: UploadImage; key: string }) => {
        const tempSiteImageList = JSON.parse(JSON.stringify(this.idCardImageList))
        tempSiteImageList[key] = tempSiteImageList[key].filter((item: UploadImage) => {
            return item.uid !== image.uid
        })
        this.idCardImageList = tempSiteImageList
    }
    // 绑定身份证信息
    bindIdCard = (certificateType: CERTIFICATE_TYPE, values: any, getUserData: any) => {
        this.btnLoading = true
        const { front, back } = this.idCardImageList
        let idcardFront = front[0]?.url
        let idcardBack = back[0]?.url
        const { force } = values || {}
        let auditParams = { ...values, idCardNo: values.code }
        delete auditParams.code
        let requestParams: Record<string, any> = {}
        switch (certificateType) {
            case CERTIFICATE_TYPE.IDCARD:
                requestParams = {
                    certificateType,
                    idcardFront,
                    idcardBack,
                }
                break

            default:
                this.onAuditApply(certificateType, auditParams).catch(() => {
                    this.btnLoading = false
                })

                return
        }

        ;(requestParams.force = force),
            Http(api.bindCertificate, 'post', requestParams, { form: true })
                .then(res => {
                    const { success, data } = res
                    if (!success) {
                        message.error(res.message)
                    } else {
                        switch (Number(data || 0)) {
                            case 0:
                                // 待审核
                                message.error('证件验证未通过')
                                break
                            case 1:
                                // 已通过
                                message.success('证件上传成功')
                                this.showFix = true
                                getUserData?.()

                                break
                            case 2:
                                // 未通过
                                message.error('证件验证未通过')
                                break
                            default:
                        }
                    }
                    this.btnLoading = false
                })
                .catch(() => {
                    this.btnLoading = false
                })
    }

    // 用户提交审核
    onAuditApply = async (certificateType: CERTIFICATE_TYPE, idCardInfo?: IDCardType) => {
        let sid = getLocalStorage('SID') || ''
        const { front, back } = this.idCardImageList
        let cardFrontUrl = front[0]?.url
        let cardBackUrl = back[0]?.url
        await Http(api.onAuditApply, 'post', {
            sid,
            cardFrontUrl,
            cardBackUrl,
            certificateType,
            ...idCardInfo,
        })

        message.success('提交成功，请耐心等待审核')
        history.replace('/bind')
    }

    // 身份证OCR识别
    ocrIdCard = async () => {
        this.btnLoading = true
        const { front, back } = this.idCardImageList
        let idcardFront = front[0]?.url
        let idcardBack = back[0]?.url
        return (await Http(
            api.ocrIdCard,
            'post',
            {
                idcardFront,
                idcardBack,
            },
            { form: true },
        )) as unknown as { data: IDCardType; success: boolean; message: string }
    }

    getIdCardImage = async () => {
        const { idcardBack, idcardFront } = (await Http(api.getIdCardImage, 'get', {})) || {}
        this.idcardBack = idcardBack
        this.idcardFront = idcardFront
    }

    getCertificate = async (certificateType: string, userData: UserInfo) => {
        // const { idcardBack, idcardFront, idcardNo, remark, userCode } =
        //     (await Http(`${api.getCertificate}/${certificateType}`, 'get', {})) || {}
        // this.idcardBack = idcardBack
        // this.idcardFront = idcardFront
        // this.idcardNo = idcardNo
        // this.remark = remark
        // this.userCode = userCode

        const bindInfo = await Http(`${api.getCertificate}/${certificateType}`, 'get', {})
        if (bindInfo === null) {
            this.idcardNo = userData.idCardNo
        } else {
            const { idcardBack, idcardFront, idcardNo, remark, userCode } = (bindInfo as any) || {}
            this.idcardBack = idcardBack
            this.idcardFront = idcardFront
            this.idcardNo = idcardNo
            this.remark = remark
            this.userCode = userCode
        }
    }
}
