/* eslint-disable @typescript-eslint/no-shadow */
import { getLocalStorage } from '@/storage'
import type { OptionProps } from 'antd/lib/select'
import dayjs from 'dayjs'
import { makeAutoObservable, toJS } from 'mobx'
import {
    getCareerInfo,
    getCollegeTypeList,
    getEnrollActivityConfig,
    getEnrollForm,
    getFieldEnum,
    getOrganizationInfo,
    getRecordInfo,
    getVerifyCode,
    getUserVerify,
    submitEnroll,
    getApplicationConditions,
    // getlistCourseType,
} from './api'
import { APPROVE_STATUS_TYPE, FIELD_TYPE } from './constants'
import type {
    ActivityData,
    CategoryItem,
    CollegeTypeItem,
    CommonEnumItem,
    FieldConfig,
    FormValue,
    SubmitFormParams,
} from './interface'
import { ENROLL_TYPE, EVENT_KIND, EVENT_KIND_VALUE } from '@/types'
import type { userDataType } from '@/stores/interface'
import { Modal } from 'antd'
import { cloneDeep } from 'lodash'
import { DATEPICKER, FORM_ITEM_TYPE, TIMEPICKER } from '@/components/PTFormItem/const'
import globalApi from '@/servers/globalApi'
import http from '@/servers/http'
import moment from 'moment'
// import { getCookie } from '@wotu/wotu-components'

type OptionItem = Omit<OptionProps, 'children'> & {
    key?: string | number
}
class EnrollInformationStore {
    constructor() {
        makeAutoObservable(this)
    }
    public projectType: number | null = null // 报名项目类型

    public digitalPhoto: string = '' // 电子照片url
    public auditStatus: any = null // 当前用户认证状态
    public isValidatePhone: boolean = false // 当前用户是否已验证手机号
    public loading: boolean = false // 接口是否正在请求中
    public ndVerify: boolean = false // 是否需要实名认证
    public verify: boolean = false // 是否已经实名认证
    // public dp: boolean = false // 是否需要上传电子照片
    public dp: any = null // 上传电子照片表单
    public openAudit: number = 0 // 是否开启审核
    public openPay: number = 0 // 是否开启支付
    public status: number = 2 // 活动状态 1未开始 2 进行中 3已结束
    public activityData: Partial<ActivityData> = {} // 活动基本信息
    public categoryDtoList: CategoryItem[] = [] // 学员分类
    /**人脸识别或者电子签名的唯一code */
    public verifyCode: string = ''
    /**最终用来生成二维码的url */
    public finallyUrl: string = ''

    public fieldUserDtoList: FieldConfig[] = []

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

    public enrollFormMap: Record<number, Record<string, any>> = {
        [FIELD_TYPE.BASIC_INFO]: { name: '', list: [], sort: 1 }, // 基本信息
        [FIELD_TYPE.ENROLL_INFO]: { name: '', list: [], sort: 2 }, // 报名信息
        [FIELD_TYPE.WORK_INFO]: { name: '', list: [], sort: 3 }, // 工作信息
        [FIELD_TYPE.CERTIFICATE_INFO]: { name: '', list: [], sort: 4 }, // 证书信息
        [FIELD_TYPE.PROFESSIONAL]: { name: '', list: [], sort: 5 }, // 现证书
        [FIELD_TYPE.DIGITAL_PHOTO]: { name: '', list: [], sort: 6 }, // 电子照片
        [FIELD_TYPE.OTHER]: { name: '', list: [], sort: 7 }, // 其他
    }

    // 表单字段
    public formValues: Record<string, FormValue> = {}
    // 表单回填
    public defaultFormValue: Record<string, FormValue> | null = null
    // 已认证的证件号码
    public idcardNo: string = ''
    // 已认证的证件类型
    public certificateType: number = 0

    /**步骤数据*/
    public stepList: any[] = []

    /**当前步骤*/
    public currentStep: number = 0

    /**openNotice是否开启报名须知：0否，1是*/
    public openNotice: number = 0

    /**openConfirm是否开启须知确认：0否，1是*/
    public openConfirm: number = 0

    /**needRead是否需要已阅须知：0否，1是*/
    public needRead: number = 0

    /**needFaceDetect是否需要人脸识别：0否，1是*/
    public needFaceDetect: number = 0

    /**needSign是否需要电子签名：0否，1是*/
    public needSign: number = 0

    /**
     * 报名须知确认情况
     */
    public enrollRuleConfirm: boolean = false

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
    updateStepList = (finallyStepList: any[]) => {
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

    // 处理表单数据
    dealFormList = (data: any) => {
        let tempData = cloneDeep(data)

        tempData = tempData.filter((item: { alias: string }) => item.alias !== 'ID_PHOTO')
        tempData.map((item: { rule: {}; alias: string; disabled: boolean; value: string }) => {
            item.rule ? '' : (item.rule = {})
            // 当用户实名状态为已认证时 不允许修改姓名
            if (Number(this.auditStatus) === APPROVE_STATUS_TYPE.PASS) {
                item.alias === 'NAME' ? (item.disabled = true) : ''
                item.alias === 'TYPE_OF_CERTIFICATE' ? (item.disabled = true) : ''
                item.alias === 'TYPE_OF_CERTIFICATE_COMMON' ? (item.disabled = true) : ''
                item.alias === 'ID_NUMBER'
                    ? ((item.disabled = true), (item.value = this.idcardNo))
                    : ''
                item.alias === 'ID_NUMBER_COMMON'
                    ? ((item.disabled = true), (item.value = this.idcardNo))
                    : ''
            }
            // 当有手机号时 不允许修改
            if (this.userData?.mobile) {
                item.alias === 'PHONE_NUMBER' ? (item.disabled = true) : ''
            }

            // 当已有认证时 不允许修改
            if (this.certificateType) {
                item.alias === 'TYPE_OF_CERTIFICATE' ? (item.disabled = true) : ''
                item.alias === 'TYPE_OF_CERTIFICATE_COMMON' ? (item.disabled = true) : ''
            }

            // 当证件id存在时 不允许修改
            if (this.idcardNo) {
                item.alias === 'ID_NUMBER' ? (item.disabled = true) : ''
                item.alias === 'ID_NUMBER_COMMON' ? (item.disabled = true) : ''
            }
        })

        const tempEnrollFormMap = cloneDeep(this.enrollFormMap)

        tempData.map((item: { fieldType: any; fieldTypeDesc: any; alias: any }) => {
            const { fieldType, fieldTypeDesc, alias } = item
            if (alias !== 'DIGITAL_PHOTO') {
                tempEnrollFormMap[fieldType].name = fieldTypeDesc
                tempEnrollFormMap[fieldType].list.push(item)
            } else {
                this.dp = item
            }
        })
        // 调换报名信息和基本信息顺序
        const firstData = cloneDeep(tempEnrollFormMap[FIELD_TYPE.ENROLL_INFO])
        const secondData = cloneDeep(tempEnrollFormMap[FIELD_TYPE.BASIC_INFO])
        tempEnrollFormMap[FIELD_TYPE.ENROLL_INFO] = secondData
        tempEnrollFormMap[FIELD_TYPE.BASIC_INFO] = firstData
        this.enrollFormMap = tempEnrollFormMap
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
        tempEnrollFormMap?.[2]?.list?.map(
            (i: { alias: string; options: any; hidden?: boolean }) => {
                if (i.alias === 'APPLICATION_CONDITIONS') {
                    i.options = tempApplicationConditions
                    i.hidden = false
                }
            },
        )
        this.enrollFormMap = tempEnrollFormMap
    }
    /**
     * @return {*}
     * @memberof EnrollInformationStore
     */
    getVerifyCode = async () => {
        const data = (await getVerifyCode()) || ''
        this.verifyCode = data as unknown as string
    }
    /**
     *
     * @param {string} code 报名类型为1（活动）时，为活动id；报名类型为2（机构）时，为机构id；报名类型为3（职业）时，为机构id，结合careerCode（职业id）获取数据；
     * @param {number} enrollType 报名类型
     * @param {string} careerCode 职业id
     * @return {*}
     * @memberof EnrollInformationStore
     */
    getInitPage = async (
        code: string,
        enrollType: number,
        careerCode?: string,
        record?: string,
    ) => {
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

        switch (enrollType) {
            case ENROLL_TYPE.ACTIVITY:
                return this.getEnrollActivity(code, userCode, record)
            case ENROLL_TYPE.ORGANIZATION:
                return this.getEnrollOrganization(code, record)
            case ENROLL_TYPE.CAREER:
                return this.getEnrollCareer(code, careerCode, record)
            default:
                console.log(enrollType)
        }
    }

    /**
     * 获取报名记录的详情
     * @param {string} record 报名记录code
     * @return {*}
     * @memberof EnrollInformationStore
     */
    getRecordInfoByApi = (record?: string) => {
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
     * @memberof EnrollInformationStore
     */
    getEnrollActivity(activityCode: string, userCode: string, record?: string) {
        return Promise.all([
            getEnrollActivityConfig(activityCode, userCode),
            this.getRecordInfoByApi(record),
        ]).then(async resAll => {
            const [actRes = {}, recordRes = {}] = (resAll || []) as unknown as [any, any]
            const {
                fieldUserDtoList = [], // 机构端配置的用户端显示的字段
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

            const { fieldUserDtoList: fieldUserDtoListValues = [] } = recordRes ?? {}

            // 当报名表单中存在「申报条件」且为「报名记录」页面时，获取记录中选择的「报名分类」根据报名分类填充「申报条件」数据
            const hasApplicationConditionsObj =
                fieldUserDtoList?.find?.(
                    (i: { alias: string }) => i.alias === 'APPLICATION_CONDITIONS',
                ) || undefined
            if (fieldUserDtoListValues.length > 0 && hasApplicationConditionsObj) {
                const registrationCategory =
                    fieldUserDtoListValues?.find?.(
                        (i: { alias: string }) =>
                            i.alias === 'REGISTRATION_CATEGORY' ||
                            i.alias === 'REGISTRATION_CATEGORY_COMMON',
                    ) || {}
                const registrationCategoryValue = JSON.parse(registrationCategory?.value || '{}')
                const { levelRelationId, workId, careerId, categoryId } =
                    registrationCategoryValue || {}
                const applicationConditionsOptions: any =
                    (await getApplicationConditions(
                        levelRelationId || workId || careerId || categoryId,
                    )) || []
                const tempApplicationConditionsOptions = applicationConditionsOptions?.map?.(
                    (item: any) => ({
                        label: item?.applyCondition,
                        value: item?.id?.toString?.(),
                        key: item?.id?.toString?.(),
                    }),
                )
                // 回显时，申报条件表单的hidden改为false
                fieldUserDtoList.map((i: { alias: string; hidden: boolean; options: any }) => {
                    if (i.alias === 'APPLICATION_CONDITIONS') {
                        i.hidden = false
                        i.options = tempApplicationConditionsOptions
                    }
                })
            }

            this.openNotice = openNotice
            this.openConfirm = openConfirm
            this.needRead = needRead
            this.needFaceDetect = needFaceDetect
            this.needSign = needSign

            this.updateProjectType(type)
            this.fieldUserDtoList = fieldUserDtoList

            this.dealFormList(fieldUserDtoList)

            this.verify = verify // 是否已经认证了
            this.ndVerify = ndVerify // 是否需要上传电子照片
            this.openAudit = openAudit // 是否开启了审核
            this.openPay = openPay // 是否开启了支付
            this.status = status // 活动状态 1未开始 2进行中 3已结束
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
            this.fillFormValue(recordRes)
        })
    }

    /**
     * 获取机构报名相关的
     *      机构信息
     *      机构表单信息
     * @param {string} organizationCode 机构code
     * @return {*}
     * @memberof EnrollInformationStore
     */
    getEnrollOrganization(organizationCode: string, record?: string) {
        return Promise.all([
            getOrganizationInfo(organizationCode),
            getEnrollForm(EVENT_KIND_VALUE[EVENT_KIND.ORGANIZATION]),
            this.getRecordInfoByApi(record),
        ]).then(resAll => {
            const [orgRes = {}, formRes = [], recordRes = {}] = (resAll || []) as unknown as [
                any,
                FieldConfig[],
                any,
            ]

            this.activityData = {
                ...orgRes,
            }

            this.fieldUserDtoList = formRes

            this.dealFormList(formRes)

            // 获取字段枚举
            this.getCommonFieldEnum(formRes)

            // 填充表单值
            this.fillFormValue(recordRes)
        })
    }

    /**
     * 获取职业报名相关的
     *      机构信息
     *      职业信息
     *      职业表单信息
     * @param {string} organizationCode 机构code
     * @param {string} careerCode 职业code
     * @return {*}
     * @memberof EnrollInformationStore
     */
    getEnrollCareer(organizationCode: string, careerCode?: string, record?: string) {
        return Promise.all([
            getOrganizationInfo(organizationCode),
            getCareerInfo(careerCode),
            getEnrollForm(EVENT_KIND_VALUE[EVENT_KIND.CAREER]),
            this.getRecordInfoByApi(record),
        ]).then(resAll => {
            const [orgRes = {}, careerRes = {}, formRes = [], recordRes = {}] = (resAll ||
                []) as unknown as [any, any, FieldConfig[], any]

            const { address } = orgRes || {}

            const organizationName = orgRes?.name || ''

            this.activityData = {
                ...careerRes,
                organizationName,
                address,
            }

            this.fieldUserDtoList = formRes

            this.dealFormList(formRes)

            // 获取字段枚举
            this.getCommonFieldEnum(formRes)

            // 填充表单值
            this.fillFormValue(recordRes)
        })
    }

    /**
     * 获取完报名相关信息后
     *    当为活动报名时，如果需要身份认证，则根据用户信息判断是否前往认证用户
     * @param {any} data 表单值
     * @return {*}
     * @memberof EnrollInformationStore
     */
    fillFormValue = (data: any) => {
        const { fieldUserDtoList } = data || {}
        let formValues: any = {}

        for (let item in fieldUserDtoList) {
            const tempItem = fieldUserDtoList[item] || {}
            const { alias, value, renderType } = tempItem
            this.fieldUserDtoList.map(temp => {
                if (temp.alias === alias) {
                    formValues[temp.name] = value
                }
            })
            if (renderType === 'CITY_CASCADER') {
                formValues[tempItem.name] = value.map((i: { code: any }) => i.code)
            }
            if (alias === 'DIGITAL_PHOTO') {
                this.digitalPhoto = value
            }
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
            // 处理时间回显
            if (renderType === 'DATEPICKER') {
                formValues[tempItem.name] = value ? moment(value) : undefined
            }
            // 图片回显
            if (['FILE_UPLOAD', 'ID_PHOTO', 'IMAGE_UPLOAD'].includes(renderType)) {
                formValues[tempItem.name] = value
                    ? value.map((item: any) => ({ ...item, response: item }))
                    : undefined
            }
        }
        console.log(formValues)
        this.defaultFormValue = formValues
    }

    /**
     * 获取完报名相关信息后
     *    当为活动报名时，如果需要身份认证，则根据用户信息判断是否前往认证用户
     * @param {string} url 认证url
     * @return {*}
     * @memberof EnrollInformationStore
     */
    afterRequest(url: string) {
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
                    window.open(url)
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
     * @memberof EnrollInformationStore
     */
    updateLoading(load: boolean) {
        this.loading = load
    }

    updateFormValues(values: Record<string, FormValue>) {
        this.formValues = { ...values }
    }
    updateDigitalPhoto(digitalPhoto: any) {
        this.digitalPhoto = digitalPhoto
    }
    /**
     * 更新报名须知确认状态
     * @param {boolean} value 确认结果
     * @return {*}
     * @memberof EnrollInformationStore
     */
    updateEnrollRule(value: boolean) {
        this.enrollRuleConfirm = value
    }

    // 提交报名表单
    submitForm(params: Omit<SubmitFormParams, 'fieldDtoList' | 'categoryDtoList'>) {
        let finallyFormList: any[] = []
        const tempEnrollFormMap = toJS(this.enrollFormMap)
        Object.keys(tempEnrollFormMap).map(tempKey => {
            // @ts-ignore
            finallyFormList = finallyFormList.concat(tempEnrollFormMap[tempKey].list)
        })
        let fieldDtoList = finallyFormList.map(item => ({
            ...item,
            // 处理value
            value: this.getFormItemValue(item.renderType, item.alias, item.name),
        }))

        if (this.dp) {
            const digitalPhotoObj = cloneDeep(this.dp)
            if (this.digitalPhoto) {
                digitalPhotoObj.value = this.digitalPhoto
            }

            fieldDtoList = fieldDtoList.concat(digitalPhotoObj)
        }

        let finallyFieldDtoList = fieldDtoList.map(item => {
            if (item.renderType === DATEPICKER || item.renderType === TIMEPICKER) {
                return {
                    alias: item.alias,
                    value: isNaN(item?.value) ? 0 : Number(item?.value),
                    customField: !!item?.customField,
                }
            } else {
                return {
                    alias: item.alias,
                    value: item.value,
                    customField: !!item?.customField,
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

        // 已认证的人 去除证件类型和证件号码 填充空值
        if (this.idcardNo) {
            finallyFieldDtoList = finallyFieldDtoList.filter(
                item =>
                    ![
                        'TYPE_OF_CERTIFICATE',
                        'ID_NUMBER',
                        'TYPE_OF_CERTIFICATE_COMMON',
                        'ID_NUMBER_COMMON',
                    ].includes(item.alias),
            )
            const aliases = [8, 9, 3].includes(this.projectType!)
                ? []
                : ['TYPE_OF_CERTIFICATE', 'ID_NUMBER']

            if ([8, 9, 3].includes(this.projectType!)) {
                const targetAliases = ['TYPE_OF_CERTIFICATE_COMMON', 'ID_NUMBER_COMMON']

                this.fieldUserDtoList.forEach(i => {
                    if (targetAliases.includes(i.alias)) {
                        aliases.push(i.alias)
                    }
                })

                aliases.forEach(alias =>
                    finallyFieldDtoList.push({ alias, value: '', customField: false }),
                )
            } else {
                aliases.forEach(alias =>
                    finallyFieldDtoList.push({ alias, value: '', customField: false }),
                )
            }
        }

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
        return submitEnroll(requestParams)
    }

    getFormItemValue(type: string, alias: string, name: string) {
        /** 递归遍历获取文件值 */
        const getFileValue = (data: any) => {
            console.log(Object.prototype.toString.call(data) === '[object Array]')
            if (Object.prototype.toString.call(data) === '[object Array]') {
                return data.map((item: any) => {
                    return getFileValue(item)
                })
            } else {
                const { status, response } = data || {}
                if (status !== 'error') {
                    const { name, url } = response || {}
                    return { name, url }
                } else {
                    return {}
                }
            }
        }

        switch (type) {
            case FORM_ITEM_TYPE.TIMEPICKER:
            case FORM_ITEM_TYPE.DATEPICKER:
                return this.formValues?.[name]
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
                } else if (alias === 'HOUSEHOLD_REGISTRATION_LOCATION') {
                    /** 户籍所在地*/
                    return this.formValues.selectedDomicile
                } else if (alias === 'PARTICIPATING_REGIONS') {
                    // 参赛地区
                    return this.formValues.selectedRegions
                } else {
                    // 社保参保地
                    return this.formValues.selectedSocial
                }
            case FORM_ITEM_TYPE.ID_PHOTO:
            case FORM_ITEM_TYPE.IMAGE_UPLOAD:
            case FORM_ITEM_TYPE.FILE_UPLOAD:
                return getFileValue(this.formValues[name])?.flat?.(Infinity)
            default:
                return this.formValues[name]
        }
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

        // 单位性质枚举值
        const hasUnitNature = fieldUserDtoList.find(item => item.alias === 'UNIT_NATURE')
        hasUnitNature &&
            getFieldEnum('UNIT_NATURE').then((res: any) => {
                this.commonEnumData.UNIT_NATURE = (res || []).map((item: CommonEnumItem) => ({
                    label: item.name,
                    value: item.key,
                    key: item.key,
                }))
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

        // 单位性质枚举值
        const hasCourse = fieldUserDtoList.find(item => item.alias === 'COURSE_TYPE')
        if (hasCourse) {
            this.commonEnumData.COURSE_TYPE = [
                {
                    label: this.activityData?.courseName,
                    value: this.activityData?.courseCode,
                    key: this.activityData?.courseCode,
                },
            ]
        }

        // getlistCourseType({ pageNo: 1, pageSize: 9999, sid: getLocalStorage('SID')}).then((res: any) => {
        //     this.commonEnumData.COURSE_TYPE = (res?.data || []).map((item: CommonEnumItem) => ({
        //         label: item.name,
        //         value: item.id,
        //         key: item.id,
        //     }))
        // })
    }
}

export default EnrollInformationStore
