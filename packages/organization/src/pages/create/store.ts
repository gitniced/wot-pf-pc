import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import { message } from 'antd'
import type { FormValuesType } from './interface'
import globalApi from '@/servers/globalApi'
import { getCookie, getLocalStorage } from '@/storage'
// import { getLocalStorage } from '@/storage'
// import { history } from 'umi'
interface UploadImage {
    uid: string
    name: string
    status: string
    url: string
    thumbUrl: string
}

// let tempEvent: NodeJS.Timeout[] = []
class CreatedStore {
    public randomKey = ''

    // 机构名称
    nameValue: string = ''
    // 验证码btn
    public codeBtnStr = '发送验证码'
    public avatar: string = ''
    public avatarList: UploadImage[] = []
    public visible: boolean = false
    public codeEventTime: number = 60
    // 是否正在上传
    public isUpload: boolean = false
    constructor() {
        makeAutoObservable(this)
        this.getRandomKey()
    }
    // 步骤
    currentStep: number = 0
    // 步骤title
    steps = [
        // {
        //     title: '手机号验证',
        //     content: 'First-content',
        // },
        {
            title: '机构信息',
            content: 'Second-content',
        },
        {
            title: '机构认证',
            content: 'Last-content',
        },
    ]

    codeEvent: any[] = []
    authCode: string = ''
    currentCode: string = ''

    btnLoading: boolean = false

    getRandomKey = () => {
        this.randomKey = new Date().getTime() + Math.random().toString(36).slice(-8)
    }
    // 绑定手机
    bindMobile = async (values: FormValuesType) => {
        this.btnLoading = true
        await http(api.bindMobile, 'post', {
            mobile: values.mobile,
            verifyCode: values.security,
            randomKey: this.randomKey,
        })
            .then(() => {
                this.currentStep += 1
            })
            .finally(() => {
                this.btnLoading = false
            })
    }

    // 创建机构
    createdOrganization = (
        values: any,
        updateCurrentOrganization: (code: string, name: string) => void,
    ) => {
        this.btnLoading = true
        this.nameValue = values.name
        let userType = getCookie('SELECT_USER_TYPE')
        // 资源方创建机构 添加fromSid 来源站点
        if (userType === 'merchant') {
            values.fromSid = getLocalStorage('FROM_SID')
        }

        http(
            api.created,
            'post',
            {
                ...values,
                randomKey: this.randomKey,
            },
            {
                form: true,
            },
        )
            .then(res => {
                let { success, data } = res || {}
                if (success) {
                    data ||= ''
                    this.currentCode = data as any

                    updateCurrentOrganization?.(data, '创建者')
                    this.currentStep++
                } else {
                    message.error(res?.message || '')
                }
                this.btnLoading = false
            })
            .finally(() => {
                this.btnLoading = false
            })
    }

    toggleUploading = (upload: boolean) => {
        this.isUpload = upload
    }

    getCode = async (account: any) => {
        if (this.codeEventTime === 60) {
            // 发送验证码之后，重新获取randomKey
            this.getRandomKey()
            let res: any = await http(api.getCode, 'post', {
                account,
                key: this.randomKey,
                type: 1,
            })
            this.doCodeEvent()

            this.authCode = res || ''
        }
    }
    verifyOld = (value: FormValuesType) => {
        this.btnLoading = true
        http(api.verfiyCode, 'post', {
            account: value.mobile,
            verifyCode: value.security,
            key: this.randomKey,
        })
            .then(() => {
                this.currentStep += 1
            })
            .finally(() => {
                this.btnLoading = false
            })
    }
    getCustomKey = () => {
        let customKey = ''
        for (let i = 0; i < 10; i++) {
            customKey += String(Math.floor(Math.random() * 10))
        }
        return customKey
    }

    doCodeEvent = () => {
        this.codeEvent?.map(i => {
            window.clearInterval(i)
        })
        this.codeEvent = []
        this.codeBtnStr = `(${this.codeEventTime})重新发送`
        const codeEventItem = window.setInterval(() => {
            this.codeEventTime--
            if (this.codeEventTime !== 0) {
                this.codeBtnStr = `(${this.codeEventTime})重新发送`
            } else {
                this.codeEvent.map(i => {
                    window.clearInterval(i)
                })
                this.codeBtnStr = `发送验证码`
                this.codeEventTime = 60
            }
        }, 1000)
        this.codeEvent.push(codeEventItem)
    }

    serverVerify = (ticket: string, randstr: string) => {
        return http(
            'https://api.cloud.wozp.cn/captcha/ticket/validate',
            'post',
            { ticket, randstr }, //data中携带ticket和randstr
            { ticket }, //headers中携带ticket
        )
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
        this.visible = true
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

export default CreatedStore
