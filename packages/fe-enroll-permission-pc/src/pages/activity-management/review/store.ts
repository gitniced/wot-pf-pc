import { makeAutoObservable } from 'mobx'
import API from '../api'
import Http from '@/servers/http'
import type { Objtype } from './interface'

export default class {
    // 内容 富文本
    public editorText: string = ''
    // 图文标题
    public title: string = ''

    //点击编辑获取编辑的数据
    public editDetail: Partial<Objtype> = {}

    // 提交按钮的loading状态
    public btnLoading = false

    // 改变提交按钮的loading状态
    setBtnLoading = (loading: boolean) => {
        this.btnLoading = loading
    }

    setEditorText = (content: string) => {
        this.editorText = content
    }

    constructor() {
        makeAutoObservable(this)
    }

    saveReview = async (data: any) => {
        const res: any = (await Http(`${API.saveUpdateActivityReview}`, 'post', data, {})) || {}
        return res
    }

    //通过code获取编辑的数据
    getDetail = async (code: string) => {
        const res: any =
            (await Http(`${API.activityReviewInfo}`, 'post', { activityCode: code }, {})) || {}

        const { attachment: resAttachment } = res || {}
        const attachmentList = resAttachment ? resAttachment.split(',') : []

        const attachment = attachmentList.map(url => {
            return {
                name: 'image.png',
                status: 'done',
                url: url,
                uid: url,
                thumbUrl: url,
                response: {
                    name: 'image.png',
                    url: url,
                },
            }
        }, [])

        this.editDetail = { ...res, attachment }
        return { ...res, attachment }
    }
}
