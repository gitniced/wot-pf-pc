import Http from '@/servers/http'
import { makeAutoObservable } from 'mobx'
import globalApi from '@/servers/globalApi'
import type { UserInfo } from '@/stores/interface'

interface UploadImage {
    uid: string
    name: string
    status: string
    url: string
    thumbUrl: string
}

export default class baseHooks {
    public avatar: string = ''
    public avatarList: UploadImage[] = []
    public visible: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    getBaseInfo = async (userData: UserInfo | undefined, form: any) => {
        const { avatar, nickname, username } = userData || {}
        const tempImageObj: any = {
            uid: avatar,
            name: 'avatar',
            status: 'done',
            url: avatar,
            thumbUrl: avatar,
        }
        this.avatarList.push(tempImageObj)
        this.avatar = avatar
        form.setFieldsValue({
            nickname,
            username,
        })
    }

    getParams = () => {}

    /**
     * 上传图片文件 并填充对应key
     */
    imageUpload = async ({ image }: { image: File }) => {
        const imageData = await Http(
            globalApi.upload,
            'post',
            { file: image, isPrivate: false, type: 2 },
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
