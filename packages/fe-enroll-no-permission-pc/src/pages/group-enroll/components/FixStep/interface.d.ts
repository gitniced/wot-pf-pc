import type SiteStore from '@/stores/siteStore'
import type { UserStore } from '@/stores/userStore'
import type { IRoute } from 'umi'

export interface TitleAdvanceProps extends IRoute {
    title: string
}

export interface EnrollRuleProps {
    store: any
    enrollType: number
    activityData: any
    applyChannel: string
    userStore?: UserStore
    siteStore?: SiteStore
    onPrev: (current: number) => void
}
export interface EnrollFormProps {
    store: any
    sidAlias: any
    siteStore: any
    // enrollType: number
    // activityData: any
    // applyChannel: string
    // onNext: (current: number) => void
}

export interface FixFormRef {
    getFieldsValue: () => any
    validateFields: () => Promise<any>
}

export interface UploadDigitalPhotoProps {
    store: any
    enrollType: number
    activityData: any
    applyChannel: string
    onPrev: (current: number) => void // 上一步
    sidAlias?: string
}

export interface FileUpload {
    file: File
    type: number
    isPrivate: boolean
}
