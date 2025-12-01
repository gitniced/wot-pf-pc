import { makeAutoObservable } from 'mobx'
import Http from '@/servers/http'
import api from './api'
import { connectWS } from '@/utils/chatWS'
import type { UserConfigItem } from './interface'

class PersonalResumeStore {
    // 求职者信息
    public candidateInfo: any = {}
    public intention: number = 1

    // 教育枚举
    public educationOption: any = []

    // 经验枚举
    public experienceOption: any = []

    // 学位枚举
    public degressOption: any = []

    // 入职时间枚举
    public joinTimeOption: any = []

    // 政治面貌枚举
    public politicalOption: any = []

    // 省市
    public cityCascade: any = []

    // 用户教育经历
    public userEducationList: any = []

    // 用户实习经历
    public userPracticeList: any = []

    // 用户资格证书
    public userCertificateList: any = []

    // 用户兴趣爱好
    public userHobbyList: any = []

    // 用户志愿者
    public userVolunteer: Record<string, any> = {}

    // 社团和组织经历
    public userSchoolExperienceList = [] as any[]

    // 学术经历
    public userScienceList = [] as any[]

    // 获奖经历
    public userAwardList = [] as any[]

    // 图片作品
    public userImgList = [] as any[]
    // 视频作品
    public userVideoList = [] as any[]
    // 社交主页
    public userSocial = [] as any[]
    // 左侧模块配置
    public userMenuConfig: UserConfigItem[] = []

    // 用户工作经历
    public userWorkExperienceList = [] as any[]

    // 用户项目经验
    public userProjectExperienceList = [] as any[]

    // 用户求职意向列表
    public userJobIntention = [] as any[]

    // 用户附件简历列表
    public userAttachmentList = [] as any[]

    // 用户自定义模块
    public userSelfDefine = [] as any[]

    // 获取行业列表
    public industryList = [] as any[]

    // 语言等级
    public language: any = null
    // 专业技能
    public skill: any = null
    // 个人优势
    public advantage: any = null

    // ai 服务的code
    public sessionCode = ''

    // websocket 实例
    public ws = null as unknown as WebSocket

    // 职位类型
    public capacityTree: any = []

    // 商圈字典
    public workArea: any = []

    // 分数
    public score: number = 0

    // 简历是否被修改
    public resumeHasChanged: boolean = false

    /**
     *Creates an instance of PersonalResumeStore.
     * @author kaijiewang
     * @date 2023-09-26
     * @memberof PersonalResumeStore
     */
    constructor() {
        makeAutoObservable(this)
        this.getIndustryList('0')
        this.getFirstCapacity(0)
        // this.getSessionCode()
        this.queryBusinessArea()
        this.getJoinTime()
        this.queryWorkExperience()
    }

    get menuActive() {
        return {
            candidate: this.candidateInfo && Object.keys(this.candidateInfo).length > 0,
            jobTime: this.candidateInfo && this.candidateInfo.joinTime !== null,
            jobExpect: Array.isArray(this.userJobIntention) && this.userJobIntention.length > 0,
            educationList:
                Array.isArray(this.userEducationList) && this.userEducationList.length > 0,
            practiceExperienceList:
                Array.isArray(this.userPracticeList) && this.userPracticeList.length > 0,
            certificateList:
                Array.isArray(this.userCertificateList) && this.userCertificateList.length > 0,
            hobbyList: Array.isArray(this.userHobbyList) && this.userHobbyList.length > 0,
            schoolExperienceList:
                Array.isArray(this.userSchoolExperienceList) &&
                this.userSchoolExperienceList.length > 0,
            scienceList: Array.isArray(this.userScienceList) && this.userScienceList.length > 0,
            awardsList: Array.isArray(this.userAwardList) && this.userAwardList.length > 0,
            workExperienceList:
                Array.isArray(this.userWorkExperienceList) &&
                this.userWorkExperienceList.length > 0,
            projectExperienceList:
                Array.isArray(this.userProjectExperienceList) &&
                this.userProjectExperienceList.length > 0,
            volunteer: this.userVolunteer && this?.userVolunteer?.description,
            advantage: this.advantage && this?.advantage?.description,
            language: this.language && this?.language?.description,
            social: Array.isArray(this.userSocial) && this?.userSocial?.length > 0,
            skill: this.skill && this?.skill?.description,
            imgList: Array.isArray(this.userImgList) && this.userImgList.length > 0,
            videoList: Array.isArray(this.userVideoList) && this.userVideoList.length > 0,
            selfDefine: Array.isArray(this.userSelfDefine) && this.userSelfDefine.length > 0,
        }
    }

    get menuConfigObj() {
        return this.userMenuConfig.reduce(
            (acc, cur) => ({ ...acc, [cur.key]: cur.open === 1 }),
            {},
        ) as any
    }

    resumeDetail = async () => {
        const resp: any = await Http(api.resume_detail, 'post', {}, { repeatFilter: false })
        const {
            // 获奖经历
            awardsList,
            // 资格证书
            certificateList,
            /** 求职者基本信息 */
            candidate,
            /** 教育经历 */
            educationList,
            /** 兴趣爱好+证书信息 */
            _hobbyCertificate,
            /** 求职期望 */
            _jobExpectList,
            /** 实习经验 */
            practiceExperienceList,
            /** 项目经验 */
            projectExperienceList,
            /** 校园经历 */
            schoolExperienceList,

            /** 工作经验 */
            workExperienceList,
            // 兴趣爱好
            hobbyList,
            // 志愿者经历
            volunteer,
            // 学术经历
            scienceList,
            // 图片作品
            imgList,
            // 视频作品
            videoList,
            // 社交主页
            social,
            // 语言能力
            language,
            // 专业技能
            skill,
            // 个人优势
            advantage,
            // 自定义
            selfDefine,
            // 分数
            score,
        } = resp
        this.userEducationList = educationList
        this.userPracticeList = practiceExperienceList
        this.userCertificateList = certificateList
        this.userHobbyList = hobbyList
        this.userVolunteer = volunteer
        this.userSchoolExperienceList = schoolExperienceList
        this.userScienceList = scienceList
        this.userWorkExperienceList = workExperienceList
        this.userProjectExperienceList = projectExperienceList
        this.userSelfDefine = selfDefine
        this.language = language
        this.skill = skill
        this.advantage = advantage
        this.userAwardList = awardsList

        // 图片作品
        this.userImgList = imgList
        // 视频作品
        this.userVideoList = videoList
        // 社交主页
        this.userSocial = social
        this.score = score

        await this.queryCitys('0')
        if (candidate?.province) {
            this.queryCitys(candidate.province)
        }
        this.candidateInfo = {
            ...candidate,
            age: candidate?.age || '',
            workExperience: candidate?.workExperience || '',
        }
        // this.educationOption = resp as unknown as []
        return Promise.resolve(resp)
    }

    /**
     * @description 教育列表
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    education = async () => {
        const resp = await Http(api.education, 'get', {}, { repeatFilter: false })
        this.educationOption = resp as unknown as []
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
     * @description 获取求职者信息
     * @author kaijiewang
     * @date 2023-09-26
     * @memberof PersonalResumeStore
     */
    queryCandidateInfo = async () => {
        const resp: any = await Http(api.candidate_info, 'post', {}, { repeatFilter: false })
        await this.queryCitys('0')
        if (resp?.province) {
            this.queryCitys(resp.province)
        }
        this.candidateInfo = resp
    }

    /**
     * @description 保存求职者信息
     * @author kaijiewang
     * @date 2023-09-26
     * @memberof PersonalResumeStore
     */
    saveCandidateInfo = async (param: any) => {
        const resp = await Http(
            api.candidate_save,
            'post',
            { ...param, showMessage: '保存成功' },
            { repeatFilter: false },
        )
        this.queryCandidateInfo()
        return resp
    }

    /**
     * @description  工作经验列表
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    queryWorkExperience = async () => {
        const resp: any = await Http(
            api.category,
            'get',
            { alias: 'work_experience' },
            { repeatFilter: false },
        )

        this.experienceOption = resp?.map((item: any) => ({
            value: Number(item.key),
            label: item.name,
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
            value: Number(item.key),
            label: item.name,
        })) as unknown as []
    }

    /**
     * @description  入职时间枚举
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    getJoinTime = async () => {
        const resp: any = await Http(
            api.category,
            'get',
            { alias: 'join_time' },
            { repeatFilter: false },
        )
        this.joinTimeOption = resp?.map((item: any) => ({
            value: Number(item.key),
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
            value: Number(item.key),
            label: item.name,
        })) as unknown as []
    }

    /**
     * @description  查询城市列表
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    queryCitys = async (parentCode: string | string[]) => {
        const resp: any = await Http(api.city, 'get', { parentCode }, { repeatFilter: false })
        if (parentCode === '0') {
            this.cityCascade = resp?.map((item: any) => ({
                label: item.name,
                value: item.code,
                isLeaf: false,
            }))
        } else {
            const children = resp?.map((item: { name: any; code: any }) => ({
                label: item.name,
                value: item.code,
            }))
            this.cityCascade = this.cityCascade.map((item: { value: string | string[] }) =>
                item.value === parentCode ? { ...item, children } : item,
            )
        }

        return Promise.resolve(true)
    }

    /**
     * @description  获取用户教育经历列表
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    getEducationList = async () => {
        const resp = await Http(api.get_education_list, 'post', {}, { repeatFilter: false })
        this.userEducationList = resp as unknown as []
    }

    /**
     * @description  保存用户教育经历
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    saveEducation = async (params: any) => {
        const resp = await Http(api.save_education, 'post', { ...params }, { repeatFilter: false })
        this.getEducationList()
        this.setResumeHasChanged()
        return resp
    }

    /**
     * @description  保存用户教育经历
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    deleteEducation = async (code: string) => {
        const resp = await Http(api.delete_education, 'post', { code }, { repeatFilter: false })
        this.getEducationList()
        return resp
    }

    /**
     * @description  搜索大学专业
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    searchSpeciality = async (keyword: string) => {
        const resp: any = await Http(
            api.search_speciality,
            'post',
            { keyword },
            { repeatFilter: false },
        )
        return Promise.resolve(
            resp?.map((item: { name: any; code: any }) => ({ label: item.name, value: item.code })),
        )
    }

    // 搜索大学名称
    searchUniversity = async (keyword: string) => {
        const resp: any = await Http(
            api.search_university,
            'post',
            { keyword, alias: 'UNIVERSITY' },
            { repeatFilter: false },
        )
        return Promise.resolve(
            resp?.map((item: { name: any; id: any }) => ({ label: item.name, value: item.name })),
        )
    }

    /**
     * @description  获取用户实习经历列表
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    getPracticeExperienceList = async () => {
        const resp = await Http(api.practice_experience_list, 'post', {}, { repeatFilter: false })
        this.userPracticeList = resp as unknown as []
    }

    /**
     * @description  保存实习经验
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    savePracticeExperience = async (param: any) => {
        const resp = await Http(
            api.save_practice_experience,
            'post',
            { ...param, showMessage: '保存成功' },
            { repeatFilter: false },
        )

        this.getPracticeExperienceList()
        this.setResumeHasChanged()

        return resp
    }

    /**
     * @description  删除用户实习经验
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    deletePracticeExperience = async (code: string) => {
        const resp = await Http(
            api.delete_practice_experience,
            'post',
            { code, showMessage: '删除成功' },
            { repeatFilter: false },
        )

        this.getPracticeExperienceList()

        return resp
    }

    /**
     * @description 获取兴趣爱好
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getHobby = async () => {
        const resp = await Http(api.get_hobby, 'post', {}, { repeatFilter: false })
        this.userHobbyList = resp as unknown as []
    }

    /**
     * @description  修改兴趣爱好
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveHobby = async (param: any) => {
        const resp = await Http(
            api.save_hobby,
            'post',
            { ...param, showMessage: '保存成功' },
            { repeatFilter: false },
        )
        this.getHobby()
        this.setResumeHasChanged()
        return resp
    }

    /**
     * @description  查询用户经历 1志愿者经历 2个人优势 3语言能力 5专业技能
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getExperience = async (type: number) => {
        const resp = await Http(api.get_experience, 'post', { type }, { repeatFilter: false })
        if (type === 1) {
            this.userVolunteer = resp
        } else if (type === 2) {
            this.advantage = resp as unknown as null
        } else if (type === 3) {
            this.language = resp as unknown as null
        } else if (type === 5) {
            this.skill = resp as unknown as null
        }

        return resp
    }

    /**
     * @description  保存用户经历 1志愿者经历 2个人优势 3语言能力 5专业技能
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveExperience = async (param: any) => {
        const resp = await Http(
            api.save_experience,
            'post',
            { ...param, showMessage: '保存成功' },
            { repeatFilter: false },
        )

        this.getExperience(param?.type)
        this.setResumeHasChanged()

        return resp
    }

    /**
     * @description  查询用户经历 1社团组织经历 2学术经历
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getAcademicSocieties = async (type: number) => {
        const resp: any = await Http(
            api.get_school_experience_list,
            'post',
            { type },
            { repeatFilter: false },
        )
        if (type === 1) {
            this.userSchoolExperienceList = resp
        } else if (type === 2) {
            this.userScienceList = resp
        }

        return resp
    }

    /**
     * @description  保存用户经历 1社团组织经历 2学术经历
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveAcademicSocieties = async (param: any) => {
        const resp = await Http(
            api.save_school_experience,
            'post',
            { ...param, showMessage: '保存成功' },
            { repeatFilter: false },
        )

        this.getAcademicSocieties(param?.type)
        this.setResumeHasChanged()

        return resp
    }

    /**
     * @description  删除用户经历 1社团组织经历 2学术经历
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    deleteAcademicSocieties = async (param: any) => {
        const resp = await Http(
            api.delete_school_experience,
            'post',
            { ...param, showMessage: '删除成功' },
            { repeatFilter: false },
        )

        this.getAcademicSocieties(param?.type)

        return resp
    }

    /**
     * @description  查询用户获奖经历
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getAwardExperience = async () => {
        const resp = await Http(api.get_awards_list, 'post', {}, { repeatFilter: false })

        this.userAwardList = resp as unknown as []

        return resp
    }

    /**
     * @description  保存用户获奖经历
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveAwardExperience = async (param: any) => {
        const resp = await Http(
            api.save_awards,
            'post',
            { ...param, showMessage: '保存成功' },
            { repeatFilter: false },
        )

        this.getAwardExperience()
        this.setResumeHasChanged()

        return resp
    }

    /**
     * @description  删除用户获奖经历
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    deleteAwardExperience = async (param: any) => {
        const resp = await Http(
            api.del_awards,
            'post',
            { ...param, showMessage: '删除成功' },
            { repeatFilter: false },
        )

        this.getAwardExperience()

        return resp
    }

    /**
     * @description  查询用户作品 1图片作品 2视频作品 3社交主页
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getWorks = async (type: number) => {
        const resp = await Http(api.get_works, 'post', { type }, { repeatFilter: false })
        if (type === 1) {
            this.userImgList = resp as unknown as []
        } else if (type === 2) {
            this.userVideoList = resp as unknown as []
        } else if (type === 3) {
            this.userSocial = resp as unknown as []
        }

        return resp
    }

    /**
     * @description  保存用户作品
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveWorks = async (param: any) => {
        const resp = await Http(
            api.save_works,
            'post',
            { ...param, showMessage: '保存成功' },
            { repeatFilter: false },
        )

        this.getWorks(param?.type)
        this.setResumeHasChanged()

        return resp
    }

    /**
     * @description  删除用户作品
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    deleteWorks = async (param: any) => {
        const resp = await Http(
            api.del_works,
            'post',
            { ...param, showMessage: '删除成功' },
            { repeatFilter: false },
        )

        this.getWorks(param?.type)

        return resp
    }

    /**
     * @description  更新用户图片作品
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveImgWorks = async (param: any) => {
        const resp = await Http(
            api.save_img_works,
            'post',
            { ...param, showMessage: '保存成功' },
            { repeatFilter: false },
        )

        this.getWorks(1)
        this.setResumeHasChanged()

        return resp
    }

    /**
     * @description  获取左侧模块配置
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getMenuConfig = async () => {
        const resp = await Http(api.menu_config, 'post', {}, { repeatFilter: false })

        this.userMenuConfig = resp as unknown as []

        return Promise.resolve(resp)
    }

    /**
     * @description  保存左侧模块配置
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveMenuConfig = async (param: any) => {
        await Http(api.save_config, 'post', { ...param }, { repeatFilter: false })

        this.getMenuConfig()
    }

    /**
     * @description  查询工作经验列表
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getWorkExperienceList = async () => {
        const resp = await Http(api.work_experience_list, 'post', {}, { repeatFilter: false })
        this.userWorkExperienceList = resp as unknown as []

        return resp
    }

    /**
     * @description  保存工作经验
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveWorkExperience = async (param: any) => {
        const resp = await Http(
            api.save_work_experience,
            'post',
            { ...param, showMessage: '保存成功' },
            { repeatFilter: false },
        )

        this.getWorkExperienceList()
        this.setResumeHasChanged()

        return resp
    }

    /**
     * @description  删除用户工作经验
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    deleteWorkExperience = async (code: string) => {
        const resp = await Http(
            api.delete_work_experience,
            'post',
            { code, showMessage: '删除成功' },
            { repeatFilter: false },
        )

        this.getWorkExperienceList()

        return resp
    }

    /**
     * @description  查询项目经验列表
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getProjectExperienceList = async () => {
        const resp = await Http(api.project_experience_list, 'post', {}, { repeatFilter: false })

        this.userProjectExperienceList = resp as unknown as []

        return resp
    }

    /**
     * @description  保存工作经验
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveProjectExperience = async (param: any) => {
        const resp = await Http(
            api.save_project_experience,
            'post',
            { ...param, showMessage: '保存成功' },
            { repeatFilter: false },
        )

        this.getProjectExperienceList()
        this.setResumeHasChanged()

        return resp
    }

    /**
     * @description  删除用户工作经验
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    deleteProjectExperience = async (code: string) => {
        const resp = await Http(
            api.delete_project_experience,
            'post',
            { code, showMessage: '删除成功' },
            { repeatFilter: false },
        )

        this.getProjectExperienceList()

        return resp
    }

    /**
     * @description  求职期望列表
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getJobExpectList = async () => {
        const resp = await Http(api.get_job_expect_list, 'post', {}, { repeatFilter: false })

        this.userJobIntention = resp as unknown as []

        return resp
    }

    /**
     * @description  保存求职期望
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveJobExpect = async (param: any) => {
        const resp = await Http(
            api.save_job_expect,
            'post',
            {
                ...param,
                showMessage: '保存成功',
            },
            { repeatFilter: false },
        )

        this.getJobExpectList()
        this.setResumeHasChanged()

        return resp
    }

    /**
     * @description  删除求职期望
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    deleteJobExpect = async (code: string) => {
        const resp = await Http(
            api.delete_job_expect,
            'post',
            { code, showMessage: '删除成功' },
            { repeatFilter: false },
        )

        this.getJobExpectList()

        return resp
    }

    /**
     * @description  求职者附件简历
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getAttachmentFileList = async () => {
        const resp = await Http(api.attachment_list, 'post', {}, { repeatFilter: false })

        this.userAttachmentList = resp as unknown as []

        return resp
    }

    /**
     * @description  上传简历附件
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveAttachmentFile = async (url: string) => {
        const resp = await Http(
            api.upload_attachment_file,
            'post',
            { url },
            { repeatFilter: false },
        )

        this.getAttachmentFileList()

        return resp
    }

    /**
     * @description  求职者附件简历
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    deleteAttachmentFile = (code: string) => {
        Http(
            api.delete_attachment,
            'post',
            { code, bizCode: '', openKey: '' },
            { repeatFilter: false },
        ).then(() => {
            this.getAttachmentFileList()
        })

        return Promise.resolve()
    }

    // 简历重命名
    renameResume = (code: string, name: string) => {
        Http(api.rename_attachment, 'post', { code, name, bizCode: '', openKey: '' }).then(() => {
            this.getAttachmentFileList()
        })
        return Promise.resolve()
    }

    /**
     * @description  自定义模块列表
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getCustomizeList = async () => {
        const resp = await Http(api.get_customize_list, 'post', {}, { repeatFilter: false })

        this.userSelfDefine = resp as unknown as []
    }

    // save_customize
    /**
     * @description  保存自定义模块
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveCustomModule = async (params: object) => {
        const resp = await Http(api.save_customize, 'post', { ...params }, { repeatFilter: false })

        this.getCustomizeList()
        this.setResumeHasChanged()
        return resp
    }

    /**
     * @description  保存自定义模块
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    deleteCustomModule = async (code: string) => {
        const resp = await Http(api.delete_customize, 'post', { code }, { repeatFilter: false })

        this.getCustomizeList()
        return resp
    }

    /**
     * @description
     * @author kaijiewang
     * @date 2023-10-01
     * @param {type} params
     */
    getIndustryList = async (parentCode: string) => {
        const resp: any = await Http(
            `${api.get_industry_list}/${parentCode}`,
            'get',
            {},
            { repeatFilter: false },
        )

        if (parentCode === '0') {
            this.industryList = resp?.map((item: { name: any; id: any }) => ({
                label: item.name,
                value: item.id,
                isLeaf: false,
            }))
        } else {
            const children = resp?.map((item: { name: any; id: any }) => ({
                label: item.name,
                value: item.id,
            }))
            this.industryList = this.industryList.map(item =>
                item.value === parentCode ? { ...item, children } : item,
            )
        }

        return Promise.resolve(true)
    }

    /**
     * @description  获取职位列表
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getFirstCapacity = async (pid: number) => {
        const resp: any = await Http(
            `${api.list_by_pid}/${pid}`,
            'get',
            {},
            { repeatFilter: false },
        )

        this.capacityTree = resp?.map((item: { name: any; id: any }) => ({
            label: item.name,
            value: item.id,
            isLeaf: false,
        })) as unknown as []

        return resp
    }

    /**
     * @description 获取职位类型
     * @author kaijiewang
     * @date 2023-09-18
     * @memberof PositionManageAddStore
     */
    getTree = async (id: number) => {
        const data: any = await Http(`${api.list_tree}/${id}`, 'get', {}, { repeatFilter: false })

        this.capacityTree = this.capacityTree.map((item: { value: number }) =>
            item.value === id
                ? {
                      ...item,
                      children: data.map((item1: { name: any; id: any; childList: any[] }) => ({
                          label: item1.name,
                          value: item1.id,
                          children: item1.childList.map(item2 => ({
                              label: item2.name,
                              value: item2.id,
                          })),
                      })),
                  }
                : item,
        )
        return data
    }

    /**
     * @description  获取证书
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    getCertificate = async () => {
        const resp = await Http(api.get_certificate, 'post', {}, { repeatFilter: false })

        this.userCertificateList = resp as unknown as []

        return resp
    }

    /**
     * @description  修改资格证书
     * @author kaijiewang
     * @date 2023-09-28
     * @param {type} params
     */
    saveCertificate = async (params: string[]) => {
        const resp = await Http(
            api.save_certificate,
            'post',
            { ...params },
            { repeatFilter: false },
        )

        this.getCertificate()
        this.setResumeHasChanged()

        return resp
    }

    /**
     * @description 获取ai的sessionCode
     * @author kaijiewang
     * @date 2023-10-02
     * @param {type} params
     */
    getSessionCode = () => {
        const ws = connectWS()
        this.ws = ws
    }

    /**
     * @description 根据岗位查询
     * @author kaijiewang
     * @date 2023-09-19
     * @memberof PositionManageAddStore
     */
    capacityList = async (idList: []) => {
        const resp = await Http(api.capacity_list, 'post', { idList }, { repeatFilter: false })
        return resp
    }

    /**
     * @description 根据专业id查询专业
     * @author kaijiewang
     * @date 2023-09-19
     * @memberof PositionManageAddStore
     */
    specialityList = async (codeList: []) => {
        const resp = await Http(api.speciality_list, 'post', { codeList }, { repeatFilter: false })
        return resp
    }

    /**
     * @description 获取ai的sessionCode
     * @author kaijiewang
     * @date 2023-10-02
     * @param {type} params
     */
    getAIChat = async (content: string, title?: string) => {
        this.getSessionCode()
        const data: any = await Http(
            api.ai_send,
            'post',
            { content, title, isNoLimit: true },
            { repeatFilter: false },
        )

        return data?.sessionCode
    }

    /**
     * @description 查询商圈列表
     * @author kaijiewang
     * @date 2023-09-19
     * @memberof PositionManageAddStore
     */
    queryBusinessArea = async () => {
        const resp: any = await Http(
            api.category,
            'get',
            { alias: 'work_area' },
            { repeatFilter: false },
        )
        this.workArea = resp?.map((item: { key: any; name: any }) => ({
            value: item.key,
            label: item.name,
        })) as unknown as []
    }

    /**
     * @description 修改入职时间
     * @author kaijiewang
     * @date 2023-09-19
     * @memberof PositionManageAddStore
     */
    saveJoinTime = async (joinTime: number) => {
        const resp = await Http(api.change_join_time, 'post', { joinTime }, { repeatFilter: false })

        this.setResumeHasChanged()
        return resp
    }

    // 简历是否被修改
    setResumeHasChanged = () => {
        this.resumeHasChanged = !this.resumeHasChanged
    }
}

export default PersonalResumeStore
