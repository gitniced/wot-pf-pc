import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import Api from '../../api'
import { getCookie } from '@/storage'

class Store {

    /** 人才发展信息 */
    public talentDevelopmentInfo = {}

    /** 获取人才发展信息 */
    getTalentDevelopmentInfo = async () => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const data: any = await Http(`${Api.talentDevelopmentInfo}/${organizationCode}`, 'get', {}) ?? {}
        const { abilityTraining, promotionSystem, talentIncentive } = data
        this.talentDevelopmentInfo = {
            ...data,
            abilityTraining: abilityTraining.split(','),
            promotionSystem: promotionSystem.split(','),
            talentIncentive: talentIncentive.split(',')
        }
    }

    /** 编辑人才发展信息 */
    editTalentDevelopmentInfo = async (data: any) => {
        const organizationCode = getCookie('SELECT_ORG_CODE')
        const { abilityTraining, promotionSystem, talentIncentive } = data
        await Http(Api.editTalentDevelopmentInfo, 'post', {
            organizationCode,
            ...data,
            abilityTraining: abilityTraining.join(','),
            promotionSystem: promotionSystem.join(','),
            talentIncentive: talentIncentive.join(',')
        })
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default Store
