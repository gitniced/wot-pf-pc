import HTTP from '@/servers/http'
import API from './api'
import { makeAutoObservable } from 'mobx'
import { message } from 'antd'

class AuditStore {
    /** 审核详情 */
    public auditDetail: Partial<any> = {}
    /** 申报条件 */
    public applicationConditions: Record<string, any> = {}

    constructor() {
        makeAutoObservable(this)
    }

    /** 获取审核详情 */
    getDetail = async (code: string) => {
        let res = (await HTTP(`${API.getDetail}?code=${code}`, 'GET', {})) || {}

        const { fieldUserDtoList } = res as any
        const applicationConditionsObj =
            fieldUserDtoList?.find?.(
                (i: { alias: string }) => i.alias === 'APPLICATION_CONDITIONS',
            ) || undefined
        if (applicationConditionsObj) {
            const registrationCategory =
                fieldUserDtoList?.find?.(
                    (i: { alias: string }) =>
                        i.alias === 'REGISTRATION_CATEGORY' ||
                        i.alias === 'REGISTRATION_CATEGORY_COMMON',
                ) || {}
            const registrationCategoryValue = JSON.parse(registrationCategory?.value || '{}')
            const { levelRelationId, workId, careerId, categoryId } =
                registrationCategoryValue || {}
            const levelRelation = levelRelationId || workId || careerId || categoryId
            if (levelRelation) {
                const applicationConditions =
                    (await HTTP(`${API.getApplicationConditions}`, 'GET', {
                        levelRelationId: levelRelation,
                    })) || {}
                let applicationConditionsMap = {}
                //@ts-ignore
                applicationConditions?.map?.(i => {
                    //@ts-ignore
                    i.id && (applicationConditionsMap[i.id.toString()] = i.applyCondition)
                })
                this.applicationConditions = applicationConditionsMap
            }
        }
        this.auditDetail = res
    }

    /**
     * 审核 submit
     */
    onAuditSubmit = async (params: any, setAuditVisible: any) => {
        const res = await HTTP(API.onAuditSubmit, 'POST', params)
        if (res) {
            message.success('审核成功')
            setAuditVisible(false)
            this.getDetail(params.code)
        } else {
            message.error('审核失败')
        }
    }
}

export default AuditStore
