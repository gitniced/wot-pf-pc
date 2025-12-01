import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import api from './api'

class GeneralFormStore {
    // 教育枚举
    public educationOption = []

    // 经验枚举
    public experienceOption = []

    // 学位枚举
    public degressOption = []

    // 政治面貌枚举
    public politicalOption = []

    /**
     *Creates an instance of PersonalResumeStore.
     * @author kaijiewang
     * @date 2023-09-26
     * @memberof PersonalResumeStore
     */
    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @description 教育列表
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    education = async () => {
        const resp: any = await Http(api.education, 'get', {}, { repeatFilter: false })
        this.educationOption = resp?.map((item: any) => ({
            value: item.code,
            label: item.desc,
        })) as unknown as []
    }

    /**
     * @description  经验列表
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    experience = async () => {
        const resp: any = await Http(api.experience, 'get', {}, { repeatFilter: false })
        this.experienceOption = resp?.map((item: any) => ({
            value: item.code,
            label: item.desc,
        })) as unknown as []
    }

    /**
     * @description  学位列表
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    queryDegress = async () => {
        const resp: any = await Http(
            api.category,
            'get',
            { alias: 'degree' },
            { repeatFilter: false },
        )
        this.degressOption = resp?.map((item: any) => ({
            value: item.key,
            label: item.name,
        })) as unknown as []
    }

    /**
     * @description  政治面貌列表
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    queryPolitical = async () => {
        const resp: any = await Http(
            api.category,
            'get',
            { alias: 'political' },
            { repeatFilter: false },
        )
        this.politicalOption = resp?.map((item: any) => ({
            value: item.key,
            label: item.name,
        })) as unknown as []
    }
}

export default GeneralFormStore
