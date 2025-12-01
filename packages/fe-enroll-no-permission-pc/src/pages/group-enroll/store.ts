/* eslint-disable @typescript-eslint/no-shadow */
import { makeAutoObservable, toJS } from 'mobx'
import {
    getEnrollActivityConfig,
    getRecordInfo,
    getVerifyCode,
    getUserVerify,
    getApplicationConditions,
    getFieldEnum,
    getCollegeTypeList,
    checkFaceApi,
    listImportRecordByCode,
    getImportRecordByCode,
    updateImportRecord,
    getLastImportInfoApi,
    importSubmit,
} from './api'
import type {
    ActivityData,
    CategoryItem,
    CollegeTypeItem,
    CommonEnumItem,
    ExportUserItem,
    FieldConfig,
    FormValue,
    ImportUser,
    SubmitFormParams,
} from './interface'
import type { userDataType } from '@/stores/interface'
import type { StepProps, UploadFile } from 'antd'
import { Modal } from 'antd'
import globalApi from '@/servers/globalApi'
import http from '@/servers/http'
import { cloneDeep } from 'lodash'
import { APPROVE_STATUS_TYPE, FIELD_TYPE } from './constants'
import type { OptionProps } from 'antd/lib/select'
import { DATEPICKER, FORM_ITEM_TYPE, TIMEPICKER } from '@/components/PTFormItem/const'
import { getLocalStorage } from '@/storage'
import dayjs from 'dayjs'
import moment from 'moment'
import { history } from 'umi'

type OptionItem = Omit<OptionProps, 'children'> & {
    key?: string | number
}
class GroupEnroll {
    constructor() {
        makeAutoObservable(this)
    }

    /**是否正在提交 */
    public isPending: boolean = false
    /**活动code */
    public activityCode: string = ''
    /**活动基本信息 */
    public activityData: Partial<ActivityData> = {}

    /**批量报名人员列表 */
    public importUserList: ImportUser[] = []
    /**当前报名人员的表单数据 */
    public currentUserField: FieldConfig[] = []

    /**是否开启审核 */
    public openAudit: number = 0
    /**是否开启支付 */
    public openPay: number = 0
    /**活动状态 1未开始 2 进行中 3已结束 */
    public status: number = 2
    /**当前用户认证状态 */
    public auditStatus: any = null
    /**当前用户是否已验证手机号 */
    public isValidatePhone: boolean = false
    /**已认证的证件号码 */
    public idcardNo: string = ''
    /**已认证的证件类型 */
    public certificateType: number = 0

    /**报名项目类型 */
    public projectType: number | null = null
    /**接口是否正在请求中 */
    public loading: boolean = false
    /**是否需要实名认证 */
    public ndVerify: boolean = false
    /**是否已经实名认证 */
    public verify: boolean = false
    /**人脸识别或者电子签名的唯一code */
    public verifyCode: string = ''
    /**最终用来生成二维码的url */
    public finallyUrl: string = ''
    /**步骤数据*/
    public stepList: StepProps[] = []
    /**当前步骤*/
    public currentStep: number = 0
    /**openNotice是否开启报名须知：0否，1是*/
    public openNotice: number = 0
    /**openConfirm是否开启须知确认：0否，1是 批量报名默认开启，不受站点配置控制*/
    public openConfirm: number = 0
    /**needRead是否需要已阅须知：0否，1是*/
    public needRead: number = 0
    /**needFaceDetect是否需要人脸识别：0否，1是*/
    public needFaceDetect: number = 0
    /**needSign是否需要电子签名：0否，1是*/
    public needSign: number = 0
    /**报名须知确认情况，默认确认*/
    public enrollRuleConfirm: boolean = true
    /**
     * 实名认证Modal
     */
    public auditModal: any = null
    /**
     * 实名认证审核中Modal
     */
    public urgeAuditModal: any = null
    //@ts-ignore
    public userData: userDataType = {}

    // 第一步导入成功之后的code
    public importCode: string | null = null
    // 第一步导入成功之后的file，用来从第二步切换到第一步回显
    public importFile: UploadFile | undefined

    /** 第二步 表单字段  */
    public enrollFormMap: Record<number, Record<string, any>> = {
        [FIELD_TYPE.BASIC_INFO]: { name: '', list: [], sort: 1 }, // 基本信息
        [FIELD_TYPE.ENROLL_INFO]: { name: '', list: [], sort: 2 }, // 报名信息
        [FIELD_TYPE.WORK_INFO]: { name: '', list: [], sort: 3 }, // 工作信息
        [FIELD_TYPE.CERTIFICATE_INFO]: { name: '', list: [], sort: 4 }, // 证书信息
        [FIELD_TYPE.PROFESSIONAL]: { name: '', list: [], sort: 5 }, // "职称证书信息"
        [FIELD_TYPE.DIGITAL_PHOTO]: { name: '', list: [], sort: 6 }, // 电子照片
        [FIELD_TYPE.OTHER]: { name: '', list: [], sort: 7 }, // 其他
    }

    public commonEnumData: Record<string, OptionItem[]> = {
        SOURCE_CANDIDATES: [], // 学生来源
        EDUCATION_LEVEL: [], // 教育程度
        NATIONALITY: [], // 民族
        POLITICAL_STATUS: [], // 政治面貌
        TYPE_OF_CERTIFICATE: [], // 证件类型
        TYPE_OF_CERTIFICATE_COMMON: [], // 通用证件类型
        REGISTERED_RESIDENCE_NATURE: [], //户籍性质
        UNIT_NATURE: [], // 单位性质
        PERSONNEL_TYPE: [], // 人员类型
        IS_PAY_SOCIAL_SECURITY: [
            { label: '是', value: 1, key: 1 },
            { label: '否', value: 0, key: 0 },
        ], //是否缴纳社保
        IS_REGISTERED_UNEMPLOYMENT: [
            { label: '是', value: 1, key: 1 },
            { label: '否', value: 0, key: 0 },
        ], //是否办理过失业登记
        ORIGINAL_CERTIFICATE: [
            { label: '是', value: '1', key: 1 },
            { label: '否', value: '0', key: 0 },
        ], //证书
        PROFESSIONAL_TITLE_CERTIFICATE: [
            { label: '是', value: '1', key: 1 },
            { label: '否', value: '0', key: 0 },
        ], //"专业技术职称证书"
        COURSE_TYPE: [], // 课程
    }

    public studentTypeOptions: OptionItem[] = []

    // 表单字段
    public formValues: Record<string, FormValue> = {}
    // 表单回填
    public defaultFormValue: Record<string, FormValue> | null = null
    // 学员分类
    public categoryDtoList: CategoryItem[] = []

    public fieldUserDtoList: FieldConfig[] = []
    // 临时用户列表
    public userList: ExportUserItem[] = []
    // 选中的临时用户 code
    public selectUserCode: string = ''

    /**
     * 自行获取userData
     */
    getUserData = async () => {
        let userData: userDataType = (await http(
            globalApi.getUserInfo,
            'get',
            {},
            {
                repeatFilter: false,
            },
        )) as unknown as userDataType
        this.userData = userData
        return userData
    }

    /**更新步骤数据*/
    updateStepList = (finallyStepList: StepProps[]) => {
        this.stepList = finallyStepList
    }

    /**更新二维码*/
    updateFinallyUrl = (url: string) => {
        this.finallyUrl = url
    }

    /**更新当前步骤*/
    setCurrentStep = (currentStep: number) => {
        this.currentStep = currentStep
    }
    /**更新当前报名项目类型 */
    updateProjectType = (type: number) => {
        this.projectType = type
    }

    /**
     * @return {*}
     * @memberof GroupEnroll
     */
    getVerifyCode = async () => {
        const data = (await getVerifyCode()) || ''
        this.verifyCode = data as unknown as string
    }
    /**
     *
     * @param {string} code 报名类型为1（活动）时，为活动id；报名类型为2（机构）时，为机构id；报名类型为3（职业）时，为机构id，结合careerCode（职业id）获取数据；；报名类型为4（技能竞赛）时，为活动id
     * @return {*}
     * @memberof GroupEnroll
     */
    getInitPage = async (code: string, record: string) => {
        this.updateLoading(true)
        const userData = ((await this.getUserData()) || {}) as unknown as any
        const { code: userCode, auditStatus, isValidatePhone, certificateType } = userData || {}
        this.isValidatePhone = isValidatePhone
        this.auditStatus = auditStatus
        this.userData = userData

        if (certificateType) {
            const userVerifyData = ((await getUserVerify(certificateType)) || {}) as unknown as any
            const { idcardNo } = userVerifyData || {}
            this.certificateType = certificateType
            this.idcardNo = idcardNo
        }

        await this.getEnrollActivity(code, userCode, record)
    }

    /**
     * 获取报名记录的详情
     * @param {string} record 报名记录code
     * @return {*}
     * @memberof GroupEnroll
     */
    getRecordInfoByApi = (record: string) => {
        return new Promise((resolve, reject) => {
            if (record) {
                getRecordInfo(record)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            } else {
                resolve({})
            }
        })
    }

    /**
     * 获取活动报名相关的
     *      活动信息
     * @param {string} activityCode 活动code
     * @param {string} userCode 用户code
     * @return {*}
     * @memberof GroupEnroll
     */
    getEnrollActivity(activityCode: string, userCode: string, record: string) {
        this.activityCode = activityCode
        return Promise.all([
            getEnrollActivityConfig(activityCode, userCode),
            this.getRecordInfoByApi(record),
        ]).then(async resAll => {
            const [actRes = {}, recordRes = {}] = (resAll || []) as unknown as [any, any]
            console.log(actRes, recordRes)
            const {
                fieldUserDtoList: fieldList = [], // 机构端配置的用户端显示的字段
                verify, // 当前用户认证状态
                ndVerify, // 是否需要认证
                // dp, // 是否需要上传电子摘牌
                name, // 活动名称
                organizationName, // 机构名称
                activityStart, // 活动开始时间
                activityEnd, // 活动结束时间
                applyStartTime, // 报名开始时间
                applyEndTime, // 报名结束时间
                appliedNum, // 报名人数
                quota, // 总人数
                payEndTime, // 缴费截止时间
                categoryDtoList = [], // 报名分类
                openAudit, // 是否开启了审核
                openPay, // 是否开启了支付
                status, // 活动状态 1未开始 2进行中 3已结束
                type,
                openNotice,
                openConfirm,
                needRead,
                needFaceDetect,
                needSign,
            } = actRes ?? {}

            this.openNotice = openNotice
            this.openConfirm = openConfirm
            this.needRead = needRead
            this.needFaceDetect = needFaceDetect
            this.needSign = needSign

            this.updateProjectType(type)
            const fieldUserDtoList = fieldList.map((item: FieldConfig) => {
                if (item.customField) {
                    item.options = item?.customContent?.[0]?.options || []
                    item.extra = item?.customContent?.[0]?.extra
                }
                return item
            })

            this.fieldUserDtoList = fieldUserDtoList

            this.dealFormList(fieldUserDtoList)

            this.activityData = {
                ...actRes,
                name, // 活动名称
                organizationName, // 机构名称
                applyStartTime, //报名开始时间
                applyEndTime, // 报名结束时间
                activityStart, // 活动开始时间
                activityEnd, // 活动结束时间
                appliedNum, // 已报名人数
                quota, // 总人数
                payEndTime, // 缴费截止时间
            }

            // 报名分类
            this.categoryDtoList = categoryDtoList
            // 获取字段枚举
            this.getCommonFieldEnum(fieldUserDtoList)
            // 填充表单值
            this.fillFormValue(recordRes.fieldUserDtoList)

            this.verify = verify // 是否已经认证了
            this.ndVerify = ndVerify // 是否需要上传电子照片
            this.openAudit = openAudit // 是否开启了审核
            this.openPay = openPay // 是否开启了支付
            this.status = status // 活动状态 1未开始 2进行中 3已结束
        })
    }

    /**
     * 获取完报名相关信息后
     *    当为活动报名时，如果需要身份认证，则根据用户信息判断是否前往认证用户
     * @param {string} url 认证url
     * @return {*}
     * @memberof GroupEnroll
     */
    afterRequest(callback: () => void) {
        /**前往认证 */
        const toAudit = () => {
            this.auditModal = Modal.warning({
                width: 480,
                title: '温馨提示',
                content: '您报名的活动需要完成实名认证，请点击【前往处理】联系客服完成实名认证',
                okText: '前往处理',
                maskClosable: false,
                keyboard: false,
                onOk: () => {
                    callback()
                    // 机构弹框关闭
                    return Promise.reject()
                },
            })
        }

        if (this.ndVerify) {
            if (!this.verify) {
                toAudit()
            }
            return
        }
    }

    /**
     * 打开或者关闭loading
     * @param {boolean} load loading状态
     * @return {*}
     * @memberof GroupEnroll
     */
    updateLoading(load: boolean) {
        this.loading = load
    }

    /**
     * 更新报名须知确认状态
     * @param {boolean} value 确认结果
     * @return {*}
     * @memberof GroupEnroll
     */
    updateEnrollRule(value: boolean) {
        this.enrollRuleConfirm = value
    }

    /**
     * 根据选择的报名分类更新form表单
     * @memberof EnrollInformationStore
     */
    updateEnrollFormApplicationConditions = async (levelRelation: string) => {
        if (!levelRelation) return
        const res: any = (await getApplicationConditions(levelRelation)) || []
        const tempApplicationConditions = res?.map?.((item: any) => ({
            label: item?.applyCondition,
            value: item?.id?.toString?.(),
            key: item?.id?.toString?.(),
        }))
        const tempEnrollFormMap = cloneDeep(this.enrollFormMap)
        tempEnrollFormMap?.[1]?.list?.map((i: any) => {
            if (i.alias === 'APPLICATION_CONDITIONS') {
                i.options = tempApplicationConditions
                i.hidden = false
            }
        })
        this.enrollFormMap = tempEnrollFormMap
    }

    /**提交报名表单*/
    submitForm(params: Omit<SubmitFormParams, 'fieldDtoList' | 'categoryDtoList'>) {
        let finallyFormList: any[] = []
        const tempEnrollFormMap = toJS(this.enrollFormMap)
        Object.keys(tempEnrollFormMap).map((tempKey: any) => {
            finallyFormList = finallyFormList.concat(tempEnrollFormMap[tempKey].list)
        })
        let fieldDtoList = finallyFormList.map(item => ({
            ...item,
            // 处理value
            value: this.getFormItemValue(item.renderType, item.alias, item.name),
        }))

        let finallyFieldDtoList = fieldDtoList.map(item => {
            if (item.renderType === DATEPICKER || item.renderType === TIMEPICKER) {
                return {
                    alias: item.alias,
                    value: isNaN(item?.value) ? 0 : Number(item?.value),
                    customField: !!item.customField,
                }
            } else {
                return {
                    alias: item.alias,
                    value: item.value,
                    customField: !!item.customField,
                }
            }
        })

        // 空值筛除
        finallyFieldDtoList = finallyFieldDtoList.filter(item => {
            const { value } = item
            if (Object.prototype.toString.call(value).toLowerCase() === '[object object]') {
                return Boolean(Reflect.ownKeys(value))
            } else {
                return Boolean(String(value)) && Boolean(value)
            }
        })

        const finallyCategory =
            this.categoryDtoList.find(item => {
                if (item.levelRelationId)
                    return item.levelRelationId === this.formValues['报名分类']
                if (item.workId) return item.workId === this.formValues['报名分类']
                if (item.careerId) return item.careerId === this.formValues['报名分类']
                if (item.categoryId) return item.categoryId === this.formValues['报名分类']
            }) || {}

        const requestParams: any = {
            ...params,
            type: this.projectType,
            fieldDtoList: finallyFieldDtoList,
            category: finallyCategory,
        }

        if (this.projectType === 5) {
            requestParams.title = this.activityData.name
        }

        if (this.isValidatePhone) {
            requestParams.isMobileManual = false
        } else {
            requestParams.isMobileManual = true
        }

        if (Number(this.auditStatus) === APPROVE_STATUS_TYPE.PASS) {
            requestParams.isIdentifyManual = false
        } else {
            requestParams.isIdentifyManual = true
        }
        console.log(requestParams)
        return requestParams
        // return submitEnroll(requestParams)
    }

    /** 更新用户报名信息 */
    updateFormValues(values: Record<string, FormValue>) {
        this.formValues = { ...values }
    }

    /** 获取用户报名信息 */
    getFormValueByUser() {
        /** 获取表单数据 */
    }

    // 处理表单数据
    dealFormList = (data: any) => {
        let tempData = cloneDeep(data)
        tempData = tempData.filter((item: any) => item.alias !== 'ID_PHOTO')
        tempData.map((item: any) => {
            item.rule ? '' : (item.rule = {})
            // 不允许修改基本信息
            item.alias === 'NAME' ? (item.disabled = true) : ''
            item.alias === 'PHONE_NUMBER' ? (item.disabled = true) : ''
            item.alias === 'TYPE_OF_CERTIFICATE' ? (item.disabled = true) : ''
            item.alias === 'TYPE_OF_CERTIFICATE_COMMON' ? (item.disabled = true) : ''
            item.alias === 'ID_NUMBER' ? (item.disabled = true) : ''
            item.alias === 'ID_NUMBER_COMMON' ? (item.disabled = true) : ''
            item.alias === 'PARTICIPATING_REGIONS' ? (item.disabled = true) : ''
        })

        const tempEnrollFormMap = cloneDeep(this.enrollFormMap)

        tempData.map((item: any) => {
            const { fieldType, fieldTypeDesc } = item
            tempEnrollFormMap[fieldType].name = fieldTypeDesc
            tempEnrollFormMap[fieldType].list.push(item)
        })
        // 调换报名信息和基本信息顺序
        // const firstData = cloneDeep(tempEnrollFormMap[FIELD_TYPE.ENROLL_INFO])
        // const secondData = cloneDeep(tempEnrollFormMap[FIELD_TYPE.BASIC_INFO])
        // tempEnrollFormMap[FIELD_TYPE.ENROLL_INFO] = secondData
        // tempEnrollFormMap[FIELD_TYPE.BASIC_INFO] = firstData
        this.enrollFormMap = tempEnrollFormMap
    }

    // 获取字段枚举
    getCommonFieldEnum(fieldUserDtoList: FieldConfig[]) {
        // 是否有考生来源
        const hasSourceCandidates = fieldUserDtoList.find(
            item => item.alias === 'SOURCE_CANDIDATES',
        )
        hasSourceCandidates &&
            getFieldEnum('SOURCE_CANDIDATES').then((res: any) => {
                this.commonEnumData.SOURCE_CANDIDATES = (res || []).map((item: CommonEnumItem) => ({
                    label: item.name,
                    value: item.key,
                }))
            })

        // 是否有学员类型字段
        const hasStudentType = fieldUserDtoList.find(item => item.alias === 'STUDENT_TYPE')
        // 获取学员类型
        hasStudentType &&
            getCollegeTypeList(getLocalStorage('SID')).then((res: any) => {
                const { data = [] } = res ?? {}
                this.studentTypeOptions = data.map((item: CollegeTypeItem) => ({
                    ...item,
                    label: item.collegeType,
                    value: item.id,
                }))
            })

        // 是否有文化程度字段
        const hasEducationLevel = fieldUserDtoList.find(item => item.alias === 'EDUCATION_LEVEL')
        hasEducationLevel &&
            getFieldEnum('EDUCATION_LEVEL').then((res: any) => {
                this.commonEnumData.EDUCATION_LEVEL = (res ?? []).map((item: CommonEnumItem) => ({
                    label: item.name,
                    value: item.key,
                }))
            })

        // 是否有民族字段
        const hasNationality = fieldUserDtoList.find(item => item.alias === 'NATIONALITY')
        hasNationality &&
            getFieldEnum('NATIONALITY').then((res: any) => {
                this.commonEnumData.NATIONALITY = (res || []).map((item: CommonEnumItem) => ({
                    label: item.name,
                    value: item.key,
                }))
            })

        // 政治面貌字段
        const hasPoliticalStatus = fieldUserDtoList.find(item => item.alias === 'POLITICAL_STATUS')
        hasPoliticalStatus &&
            getFieldEnum('POLITICAL_STATUS').then((res: any) => {
                this.commonEnumData.POLITICAL_STATUS = (res || []).map((item: CommonEnumItem) => ({
                    label: item.name,
                    value: item.key,
                }))
            })

        // // 证件类型字段枚举
        // const hasCertificateType = fieldUserDtoList.find(
        //     item => item.alias === 'TYPE_OF_CERTIFICATE',
        // )
        // hasCertificateType &&
        //     getFieldEnum('TYPE_OF_CERTIFICATE').then((res: any) => {
        //         this.commonEnumData.TYPE_OF_CERTIFICATE = (res || []).map(
        //             (item: CommonEnumItem) => ({
        //                 label: item.name,
        //                 value: item.key,
        //                 key: item.key,
        //             }),
        //         )
        //     })
        const certificateTypes = [3, 8, 9].includes(this.projectType!)
            ? ['TYPE_OF_CERTIFICATE_COMMON']
            : ['TYPE_OF_CERTIFICATE']
        certificateTypes.forEach(type => {
            const hasType = fieldUserDtoList.find(item => item.alias === type)
            if (hasType) {
                getFieldEnum(type).then((res: any) => {
                    this.commonEnumData[type] = (res || []).map((item: CommonEnumItem) => ({
                        label: item.name,
                        value: item.key,
                        key: item.key,
                    }))
                })
            }
        })

        // 户籍性质字段枚举
        const hasDomicileType = fieldUserDtoList.find(
            item => item.alias === 'REGISTERED_RESIDENCE_NATURE',
        )
        hasDomicileType &&
            getFieldEnum('REGISTERED_RESIDENCE_NATURE').then((res: any) => {
                this.commonEnumData.REGISTERED_RESIDENCE_NATURE = (res || []).map(
                    (item: CommonEnumItem) => ({
                        label: item.name,
                        value: item.key,
                        key: item.key,
                    }),
                )
            })

        // 人员类型枚举
        const hasPersonType = fieldUserDtoList.find(item => item.alias === 'PERSONNEL_TYPE')
        hasPersonType &&
            getFieldEnum('PERSONNEL_TYPE').then((res: any) => {
                this.commonEnumData.PERSONNEL_TYPE = (res || []).map((item: CommonEnumItem) => ({
                    label: item.name,
                    value: item.key,
                    key: item.key,
                }))
            })
        // 单位性质
        const hasUnitNature = fieldUserDtoList.find(item => item.alias === 'UNIT_NATURE')
        hasUnitNature &&
            getFieldEnum('UNIT_NATURE').then((res: any) => {
                this.commonEnumData.UNIT_NATURE = (res || []).map((item: CommonEnumItem) => ({
                    label: item.name,
                    value: item.key,
                    key: item.key,
                }))
            })
        // 单位性质
        const hasCourse = fieldUserDtoList.find(item => item.alias === 'COURSE_TYPE')
        console.log(fieldUserDtoList)
        if (hasCourse) {
            this.commonEnumData.COURSE_TYPE = [
                {
                    label: this.activityData?.courseName,
                    value: this.activityData?.courseCode,
                    key: this.activityData?.courseCode,
                },
            ]
        }
        // hasCourse &&
        //     getlistCourseType({pageNo: 1, pageSize: 1000, sid: getLocalStorage('SID')}).then((res: any) => {
        //         this.commonEnumData.COURSE_TYPE = (res?.data || []).map((item: CommonEnumItem) => ({
        //             label: item.name,
        //             value: item.id,
        //             key: item.id,
        //         }))
        //     })
    }

    /**
     * 获取完报名相关信息后
     *    当为活动报名时，如果需要身份认证，则根据用户信息判断是否前往认证用户
     * @param {any} data 表单值
     * @return {*}
     * @memberof EnrollInformationStore
     */
    fillFormValue = (data: any) => {
        const fieldUserDtoList = data
        let formValues: any = {}

        for (let item in fieldUserDtoList) {
            const tempItem = fieldUserDtoList[item] || {}
            const { alias, value } = tempItem
            this.fieldUserDtoList.map((temp: any) => {
                if (temp.alias === alias) {
                    if (temp.renderType === 'CITY_CASCADER') {
                        formValues[temp.name] = value ? value.map((i: any) => i.code) : undefined
                    } else if (
                        temp.renderType === 'DATEPICKER' ||
                        temp.renderType === 'TIMEPICKER'
                    ) {
                        formValues[temp.name] = value ? moment(value) : undefined
                    } else if (
                        temp.renderType === 'FILE_UPLOAD' ||
                        temp.renderType === 'ID_PHOTO' ||
                        temp.renderType === 'IMAGE_UPLOAD'
                    ) {
                        // 电子照片特殊处理
                        if (alias === 'DIGITAL_PHOTO') {
                            formValues[temp.name] = [
                                { url: value, name: value, response: { url: value } },
                            ]
                            return
                        }
                        formValues[temp.name] = value
                            ? value.map((item: any) => ({ ...item, response: item }))
                            : undefined
                    }
                    // else if (
                    //     temp.renderType === 'IMAGE_UPLOAD'
                    // ) {
                    //     formValues[temp.name] = value
                    //         ? [{ url: value, name: value, response: {url: value} }]
                    //         : undefined
                    // }
                    else {
                        formValues[temp.name] = value
                    }
                }
            })

            if (alias === 'REGISTRATION_CATEGORY' || alias === 'REGISTRATION_CATEGORY_COMMON') {
                const tempCategory = JSON.parse(value || '{}')
                if (tempCategory.categoryId) {
                    formValues[tempItem.name] = tempCategory.categoryId
                }
                if (tempCategory.careerId) {
                    formValues[tempItem.name] = tempCategory.careerId
                }
                if (tempCategory.workId) {
                    formValues[tempItem.name] = tempCategory.workId
                }
                if (tempCategory.levelRelationId) {
                    formValues[tempItem.name] = tempCategory.levelRelationId
                }
            }
        }
        this.formValues = formValues
    }

    getFormItemValue(type: string, alias: string, name: string) {
        /** 递归遍历获取文件值 */
        const getFileValue = (data: any, stringList?: boolean) => {
            if (Object.prototype.toString.call(data) === '[object Array]') {
                return data.map((item: any) => {
                    return getFileValue(item, stringList)
                })
            } else {
                const { status, response } = data || {}
                if (status !== 'error') {
                    const { name, url } = response || {}
                    return stringList ? url : { name, url }
                } else {
                    return {}
                }
            }
        }

        switch (type) {
            case FORM_ITEM_TYPE.TIMEPICKER:
            case FORM_ITEM_TYPE.DATEPICKER:
                return this.formValues[name]
                    ? dayjs(this.formValues[name] as string).valueOf()
                    : undefined
            case FORM_ITEM_TYPE.RADIO_GROUP:
                if (alias === 'TYPE_OF_CERTIFICATE' || alias === 'TYPE_OF_CERTIFICATE_COMMON') {
                    return this.verify ? 0 : this.formValues[name]
                } else {
                    return this.formValues[name]
                }
            case FORM_ITEM_TYPE.CITY_CASCADER:
                if (alias === 'MAILING_ADDRESS') {
                    /** 通讯地址*/
                    return this.formValues.selectedAddress
                } else if (alias === 'PLACE_OF_AFFILIATION') {
                    /** 所属地*/
                    return this.formValues.selectedOptions
                } else if (alias === 'PARTICIPATING_REGIONS') {
                    /** 参赛地区*/
                    return this.formValues.selectedRegions
                } else if (alias === 'SOCIAL_SECURITY_JOIN_AREA') {
                    /** 参赛地区*/
                    return this.formValues.selectedSocial
                } else {
                    /** 户籍所在地*/
                    return this.formValues.selectedDomicile
                }
            // 图片上传字符串处理方式
            // return getFileValue(this.formValues[name], true)?.flat?.(Infinity)[0]
            case FORM_ITEM_TYPE.IMAGE_UPLOAD:
            case FORM_ITEM_TYPE.ID_PHOTO:
            case FORM_ITEM_TYPE.FILE_UPLOAD:
                if (alias === 'DIGITAL_PHOTO') {
                    return getFileValue(this.formValues[name], true)?.flat?.(Infinity)[0]
                }
                return getFileValue(this.formValues[name])?.flat?.(Infinity)
            default:
                return this.formValues[name]
        }
    }

    /** 获取临时人员列表 */
    getUserList(code: string) {
        return listImportRecordByCode(code).then((res: any) => {
            this.userList = res
            return res
        })
    }

    /** 获取临时人员详情 */
    getUserInfo(code: string) {
        return getImportRecordByCode(code).then((data: any) => {
            const { fieldJson } = data
            this.fillFormValue(fieldJson)
            for (let i = 0; i < fieldJson.length; i++) {
                if (
                    fieldJson[i].alias === 'REGISTRATION_CATEGORY' ||
                    fieldJson[i].alias === 'REGISTRATION_CATEGORY_COMMON'
                ) {
                    this.updateEnrollFormApplicationConditions(fieldJson[i].value)
                    return
                }
            }
        })
    }

    /** 更新临时用户人员详情 */
    updateUserInfo(data: any) {
        const { fieldDtoList, category } = this.submitForm(data)
        return updateImportRecord({
            code: data.code,
            fieldJson: fieldDtoList,
            category,
        })
    }

    /** 更新选中用户 */
    selectUser(code: string) {
        this.selectUserCode = code
    }

    /** 电子照片校验 */
    async checkFaceApi(url: string) {
        return checkFaceApi(url)
            ?.then(() => true)
            .catch(() => false)
    }

    // 获取上一次批量报名的联系人信息
    getLastImportInfo(activityCode: string) {
        return getLastImportInfoApi(activityCode)
    }

    // 重置importCode
    resetImportCode() {
        this.importCode = null
    }

    // 更新导入成功之后的code
    updateImportCode(importCode: string) {
        this.importCode = importCode
    }

    // 更新导入成功之后的file
    updateImportFile(file?: UploadFile) {
        this.importFile = file
    }

    /** 提交导入数据 */
    importSubmit() {
        if (!this.isPending) {
            this.isPending = true
            importSubmit(this.importCode!)
                .then(() => {
                    this.isPending = false
                    history.push(
                        `/enroll-succeeded?openAudit=${this.openAudit}&openPay=${this.openPay}&status=${this.status}&from=group&activityCode=${this.activityCode}`,
                    )
                })
                .catch(() => {
                    this.isPending = false
                })
        }
    }
}

export default GroupEnroll
