/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-case-declarations */
//报名表单

import { Button, Col, Form, Row, Select, Space, Spin, Tooltip, message } from 'antd'
import TitleAdvance from './TitleAdvance'

import styles from './index.module.less'
import { GENDER_OPTIONS } from '../constants'
import type { EnrollFormProps } from './interface'
import { observer } from 'mobx-react'

import { history } from 'umi'
import type { CityItem, FormValue, IRouteQuery } from '../interface'
import type { DefaultOptionType } from 'antd/lib/select'
import { getCityListByParentCode } from '../api'
import { useEffect, useState } from 'react'
import { ENROLL_CHANNEL_NUM } from '@/types/enroll-const'
import { ENROLL_TYPE, EVENT_KIND, EVENT_KIND_VALUE } from '@/types'
import PTFormItem from '@/components/PTFormItem'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { toJS } from 'mobx'
import { findSiteData, getDecodeInfo } from '@wotu/wotu-components'
import extractNumbers, { getAgeFromIdCard, isInScope } from '@/utils/extractNumber'
import dayjs from 'dayjs'
import { ExclamationCircleOutlined } from '@ant-design/icons'
//@ts-ignore
const EnrollForm = ({
    store,
    siteStore,
    enrollType,
    activityData,
    applyChannel,
    onNext,
    enrollFormMap,
}: EnrollFormProps) => {
    const { entryCode, activityEnd } = activityData || {}

    const { activityCode, organizationCode, careerCode } =
        (history.location.query as unknown as IRouteQuery) ?? {}

    /** 所属地 */
    const [cityOptions, setCityOptions] = useState<DefaultOptionType[]>([])
    const [selectedOptions, setSelectedOptions] = useState<CityItem[]>([])

    /** 通讯地址 */
    const [addressOptions, setAddressOptions] = useState<DefaultOptionType[]>([])
    const [selectedAddress, setSelectedAddress] = useState<CityItem[]>([])

    /** 户籍所在地 */
    const [domicileOptions, setDomicileOptions] = useState<DefaultOptionType[]>([])
    const [selectedDomicile, setSelectedDomicile] = useState<CityItem[]>([])

    // 参赛地区
    const [regionsOptions, setRegionsOptions] = useState<DefaultOptionType[]>([])
    const [selectedRegions, setSelectedRegion] = useState<CityItem[]>([])

    // 社保参保地
    const [socialOptions, setSocialOptions] = useState<DefaultOptionType[]>([])
    const [selectedSocial, setSelectedSocial] = useState<CityItem[]>([])
    const [isPending, setIsPending] = useState<boolean>(false)

    const [form] = Form.useForm()

    /** 初始化表单数据 */
    const initFormValues = () => {
        let { name, mobile, birthDay, gender } = store.userData || {}
        let { defaultFormValue = {} } = toJS(store) || {}

        let initValue: Record<string, any> = {
            姓名: getDecodeInfo(name || ''),
            手机号: getDecodeInfo(mobile || ''),
        }

        initValue['证件类型'] = String(store.certificateType)
        initValue['证件号码'] = getDecodeInfo(store.idcardNo || '')

        if (defaultFormValue) {
            initValue = {
                ...initValue,
                ...defaultFormValue,
            }
        }

        if (Reflect.ownKeys(store.formValues).length > 0) {
            initValue = {
                ...initValue,
                ...store.formValues,
            }
        }

        gender ? (initValue['性别'] = gender) : ''
        birthDay ? (initValue['出生日期'] = moment(birthDay)) : ''

        if (initValue['所属地']) {
            handleDefaultCityOption(initValue['所属地'], 'PLACE_OF_AFFILIATION')
        }
        if (initValue['通讯地址']) {
            handleDefaultCityOption(initValue['通讯地址'], 'MAILING_ADDRESS')
        }
        if (initValue['户籍所在地']) {
            handleDefaultCityOption(initValue['户籍所在地'], 'HOUSEHOLD_REGISTRATION_LOCATION')
        }
        if (initValue['参赛地区']) {
            handleDefaultCityOption(initValue['参赛地区'], 'PARTICIPATING_REGIONS')
        }
        if (initValue['社保参保地']) {
            handleDefaultCityOption(initValue['社保参保地'], 'SOCIAL_SECURITY_JOIN_AREA')
        }

        form.setFieldsValue(initValue)
    }

    /** 根据报名项目类型获取报名的详细type */
    const getFinallyParams = () => {
        switch (enrollType) {
            case ENROLL_TYPE.ORGANIZATION:
                return {
                    type: EVENT_KIND_VALUE[EVENT_KIND.ORGANIZATION],
                    activityCode: organizationCode,
                    applyChannel: ENROLL_CHANNEL_NUM[applyChannel],
                    organizationCode,
                }
            case ENROLL_TYPE.ACTIVITY:
                return {
                    //@ts-ignore
                    type: EVENT_KIND_VALUE[EVENT_KIND[entryCode]],
                    activityCode,
                    applyChannel: ENROLL_CHANNEL_NUM[applyChannel],
                    organizationCode: activityData.organizationCode,
                }
            case ENROLL_TYPE.CAREER:
                return {
                    type: EVENT_KIND_VALUE[EVENT_KIND.CAREER],
                    activityCode: careerCode,
                    applyChannel: ENROLL_CHANNEL_NUM[applyChannel],
                    organizationCode,
                }
            default:
                return {}
        }
    }

    useEffect(() => {
        initFormValues()
    }, [
        store.commonEnumData.TYPE_OF_CERTIFICATE,
        store.commonEnumData.TYPE_OF_CERTIFICATE_COMMON,
        store.defaultFormValue,
        store.idcardNo,
        store.certificateType,
    ])

    useEffect(() => {
        /** 请求身份parentCode为0 */
        getCityListByParentCode(0).then((res: any) => {
            const result = (res || []).map((item: CityItem) => ({
                label: item.name,
                value: item.code,
                level: item.level,
                /** 不为叶子结点，可以请求下一级数据 */
                isLeaf: false,
            }))

            setCityOptions(cloneDeep(result))
            setAddressOptions(cloneDeep(result))
            setDomicileOptions(cloneDeep(result))
            setRegionsOptions(cloneDeep(result))
            setSocialOptions(cloneDeep(result))
        })

        return () => {
            /** 页面/组件卸载之前form表单和数据 */
            form.resetFields()

            setSelectedOptions([])
            setSelectedAddress([])
            setSelectedDomicile([])
            setSelectedRegion([])
            setSelectedSocial([])

            setCityOptions([])
            setAddressOptions([])
            setDomicileOptions([])
            setRegionsOptions([])
            setSocialOptions([])
        }
    }, [])

    /** 下一步 */
    const handleNextOrSubmit = () => {
        form.validateFields().then((values: Record<string, FormValue>) => {
            console.log(values)
            /** 校验年龄限制 */
            const { 证件号码, 证件类型, 原证书获证时间 } = values
            const { siteData } = siteStore
            const rule = findSiteData(siteData, 'apply_age_limit_rule', {
                findKey: 'configList',
            })?.value
            if (证件类型 === '1' && rule) {
                const age = getAgeFromIdCard(`${证件号码}`)
                if (!isInScope(rule, age)) {
                    return message.error('当前年龄不符合报名要求')
                }
            }
            /** 校验获证时间与活动结束时间 */
            const dateRule = findSiteData(
                siteData,
                'original_certificates_date_interval_limit_rule',
                { findKey: 'configList' },
            )?.value
            if (dateRule && 原证书获证时间) {
                const isMidStart = dateRule.startsWith('[')
                let [day] = extractNumbers(dateRule)
                day = isMidStart ? day : day + 1
                const diffInDays = dayjs(activityEnd).diff(
                    // @ts-ignore
                    dayjs(原证书获证时间?.format('YYYY-MM-DD') as any),
                    'day',
                )
                console.log(diffInDays, 原证书获证时间)
                if (day > diffInDays) {
                    return message.error('距离原证书获证时间过短不符合报名要求 ')
                }
            }

            store.updateFormValues({
                ...values,
                selectedOptions,
                selectedAddress,
                selectedDomicile,
                selectedRegions,
                selectedSocial,
            })
            /** 当前阶段不是最后阶段时，跳转到下一步 */
            if (store.currentStep !== store.stepList.length - 1) {
                return onNext(store.currentStep + 1)
            }
            const finallyParams = getFinallyParams()

            if (!isPending) {
                setIsPending(true)
                /** 请求提交表单接口 */
                //@ts-ignore
                store
                    .submitForm(finallyParams)
                    .then(() => {
                        setIsPending(false)
                        history.push(
                            `/enroll-succeeded?openAudit=${store.openAudit}&openPay=${store.openPay}&status=${store.status}&activityCode=${finallyParams.activityCode}`,
                        )
                    })
                    .catch(() => {
                        setIsPending(false)
                    })
            }
        })
    }

    /** 处理报名分类*/
    const getCategoryOptions = () => {
        return store.categoryDtoList.map(
            (item: {
                categoryName: any
                categoryId: any
                careerId: any
                workId: any
                levelRelationId: any
            }) => {
                if (item.levelRelationId) {
                    return {
                        ...item,
                        label: item.categoryName,
                        value: item.levelRelationId,
                    }
                }
                if (item.workId) {
                    return {
                        ...item,
                        label: item.categoryName,
                        value: item.workId,
                    }
                }
                if (item.careerId) {
                    return {
                        ...item,
                        label: item.categoryName,
                        value: item.careerId,
                    }
                }
                if (item.categoryId) {
                    return {
                        ...item,
                        label: item.categoryName,
                        value: item.categoryId,
                    }
                }
            },
        )
    }

    // 动态加载级联选择器的数据
    const handleLoadCascaderData = (_selectedOptions: DefaultOptionType[], type: string) => {
        const targetOption = _selectedOptions[_selectedOptions.length - 1]

        const { value, level: parentLevel } = targetOption

        // value不为空或者等级小于2才能获取下一级数据（只允许请求三级数据）
        if (value && parentLevel <= 2) {
            getCityListByParentCode(Number(value)).then((res: any) => {
                targetOption.children = (res || []).map((item: CityItem) => ({
                    label: item.name,
                    value: item.code,
                    level: item.level,
                    // 第三级为叶子结点
                    isLeaf: parentLevel === 2,
                }))

                const fillData = (list: any[]) => {
                    list.map(item => {
                        if (item?.children?.length > 0) {
                            fillData(item.children)
                        }
                        if (item.value === targetOption.value) {
                            item.children = targetOption.children
                        }
                    })
                }

                // 所属地
                if (type === 'cityOptions') {
                    handleLoadCityData(fillData)
                }
                // 通讯地址
                if (type === 'addressOptions') {
                    handleLoadAddressData(fillData)
                }
                // 户籍所在地
                if (type === 'domicileOptions') {
                    handleLoadDomicileData(fillData)
                }
                // 参赛地区
                if (type === 'regionsOptions') {
                    handleLoadRegionsData(fillData)
                }
                // 参赛地区
                if (type === 'socialOptions') {
                    handleLoadSocialData(fillData)
                }
            })
        }
    }

    /** 动态加载城市/区域*/
    const handleLoadCityData = (fillData: (list: any[]) => void) => {
        const tempCityOptions = cloneDeep(cityOptions)
        fillData(tempCityOptions)
        // 修改state 触发render，更新视图
        setCityOptions(tempCityOptions)
    }

    /** 动态加载城市/区域*/
    const handleLoadAddressData = (fillData: (list: any[]) => void) => {
        const tempAddressOptions = cloneDeep(addressOptions)
        fillData(tempAddressOptions)
        // 修改state 触发render，更新视图
        setAddressOptions(tempAddressOptions)
    }
    /** 动态加载城市/区域*/
    const handleLoadDomicileData = (fillData: (list: any[]) => void) => {
        const tempDomicileOptions = cloneDeep(domicileOptions)
        fillData(tempDomicileOptions)
        // 修改state 触发render，更新视图
        setDomicileOptions(tempDomicileOptions)
    }

    /** 动态参赛地区*/
    const handleLoadRegionsData = (fillData: (list: any[]) => void) => {
        const tempRegionsOptions = cloneDeep(regionsOptions)
        fillData(tempRegionsOptions)
        // 修改state 触发render，更新视图
        setRegionsOptions(tempRegionsOptions)
    }

    /** 动态社保参保地"*/
    const handleLoadSocialData = (fillData: (list: any[]) => void) => {
        const tempSocialOptions = cloneDeep(socialOptions)
        fillData(tempSocialOptions)
        // 修改state 触发render，更新视图
        setSocialOptions(tempSocialOptions)
    }

    /** 超简单的回显省市区*/
    const handleDefaultCityOption = async (_selectedOptions: string[], alias: string) => {
        const [provinceCode, cityCode, areaCode] = _selectedOptions
        let provinceName,
            cityName,
            areaName = ''

        const getName = (data: any[], code: string) => {
            const tempData = data.find((item: CityItem) => item.code.toString() === code.toString())
            return tempData?.name || ''
        }
        const doOptionItem = (data: any[], bool: boolean) => {
            const tempData = data.map((item: CityItem) => ({
                label: item.name,
                value: item.code,
                level: item.level,
                // 第三级为叶子结点
                isLeaf: bool,
            }))
            return tempData
        }
        const injectChild = (father: any[], fatherCode: string, child: any) => {
            return father.map(i => {
                if (i?.value?.toString?.() === fatherCode?.toString()) {
                    i.children = child
                }
                return i
            })
        }
        const provinceRes = (await getCityListByParentCode(0)) as unknown as any[]
        const cityRes = (await getCityListByParentCode(Number(provinceCode))) as unknown as any[]
        const areaRes = (await getCityListByParentCode(Number(cityCode))) as unknown as any[]
        let tempProvinceOptions = doOptionItem(provinceRes, false)
        let tempCityOptions = doOptionItem(cityRes, false)
        let tempAreaOptions = doOptionItem(areaRes, true)
        provinceName = getName(provinceRes, provinceCode)
        cityName = getName(cityRes, cityCode)
        areaName = getName(areaRes, areaCode)
        const selectOption: any = [
            { code: provinceCode, name: provinceName },
            { code: cityCode, name: cityName },
            {
                code: areaCode,
                name: areaName,
            },
        ]
        tempCityOptions = injectChild(tempCityOptions, cityCode, tempAreaOptions)
        tempProvinceOptions = injectChild(tempProvinceOptions, provinceCode, tempCityOptions)
        switch (alias) {
            /** 所属地*/
            case 'PLACE_OF_AFFILIATION':
                setCityOptions(tempProvinceOptions)
                setSelectedOptions(selectOption)
                break
            /** 户籍所在地*/
            case 'HOUSEHOLD_REGISTRATION_LOCATION':
                setDomicileOptions(tempProvinceOptions)
                setSelectedDomicile(selectOption)
                break
            /** 通讯地址*/
            case 'MAILING_ADDRESS':
                setAddressOptions(tempProvinceOptions)
                setSelectedAddress(selectOption)
                break
            // 参赛地区
            case 'PARTICIPATING_REGIONS':
                setRegionsOptions(tempProvinceOptions)
                setSelectedRegion(selectOption)
                break
            // 社保参保地
            case 'SOCIAL_SECURITY_JOIN_AREA':
                setSocialOptions(tempProvinceOptions)
                setSelectedSocial(selectOption)
                break
        }
    }

    /** 选择所属地*/
    const handleChangeCity = (_: any, _selectedOptions: DefaultOptionType[]) => {
        const result: CityItem[] = _selectedOptions?.map(item => ({
            name: item.label as string,
            code: item.value as string,
        }))

        setSelectedOptions(result)
    }

    /** 选择通讯地址*/
    const handleSelectAddress = (_: any, _selectedOptions: DefaultOptionType[]) => {
        const result: CityItem[] = _selectedOptions?.map(item => ({
            name: item.label as string,
            code: item.value as string,
        }))

        setSelectedAddress(result)
    }

    /** 选择户籍所在地*/
    const handleSelectDomicile = (_: any, _selectedOptions: DefaultOptionType[]) => {
        const result: CityItem[] = _selectedOptions?.map(item => ({
            name: item.label as string,
            code: item.value as string,
        }))

        setSelectedDomicile(result)
    }

    // 选择参赛地址
    const handleSelectRegion = (_: any, _selectedOptions: DefaultOptionType[]) => {
        const result: CityItem[] = _selectedOptions?.map(item => ({
            name: item.label as string,
            code: item.value as string,
        }))

        setSelectedRegion(result)
    }

    // 社保参保地
    const handleSelectSocial = (_: any, _selectedOptions: DefaultOptionType[]) => {
        const result: CityItem[] = _selectedOptions?.map(item => ({
            name: item.label as string,
            code: item.value as string,
        }))

        setSelectedSocial(result)
    }

    /** 根据别名，给数据填充options*/
    const getOptionsByAlias = (alias: any, data: any) => {
        const { siteData } = siteStore

        // 从站点信息中获取原证书截图文案说明
        const original_certificate_explain = findSiteData(siteData, 'original_certificate_explain')

        switch (alias) {
            /** 报名分类*/
            case 'REGISTRATION_CATEGORY':
            case 'REGISTRATION_CATEGORY_COMMON':
                data.options = getCategoryOptions()
                data.onChange = (e: string) => {
                    const allValue = form.getFieldsValue()
                    if (Object.keys(allValue).includes('申报条件')) {
                        form.setFieldValue('申报条件', undefined)
                    }
                    store.updateEnrollFormApplicationConditions(e)
                }
                return data
            /** 申报条件*/
            case 'APPLICATION_CONDITIONS':
                return data
            /** 考生来源*/
            case 'SOURCE_CANDIDATES':
                data.options = store.commonEnumData[alias]
                return data
            // 学员类型
            case 'PERSONNEL_TYPE':
                data.options = store.commonEnumData[alias]
                return data

            /** 性别*/
            case 'GENDER':
                data.options = GENDER_OPTIONS
                return data
            /** 学员类型*/
            case 'STUDENT_TYPE':
                // data.options = store.studentTypeOptions
                data.options = undefined
                data.children = store.studentTypeOptions.map(item => {
                    return (
                        <Select.Option value={item.value} label={item.label}>
                            <div className={styles.select_student_option}>
                                <div>{item.label}</div>
                                <div className={styles.select_Student_option__desc}>
                                    {item?.description}
                                </div>
                            </div>
                        </Select.Option>
                    )
                })

                return data
            /** 文化程度*/
            case 'EDUCATION_LEVEL':
                data.options = store.commonEnumData[alias]
                return data
            /** 民族*/
            case 'NATIONALITY':
                data.options = store.commonEnumData[alias]
                return data
            /** 政治面貌*/
            case 'POLITICAL_STATUS':
                data.options = store.commonEnumData[alias]
                return data
            /** 户籍性质*/
            case 'REGISTERED_RESIDENCE_NATURE':
                data.options = store.commonEnumData[alias]
                return data
            /** 证件类型*/
            case 'TYPE_OF_CERTIFICATE':
            case 'TYPE_OF_CERTIFICATE_COMMON':
                data.options = store.commonEnumData[alias]
                return data
            // 单位性质
            case 'UNIT_NATURE':
                data.options = store.commonEnumData[alias]
                return data
            // "是否缴纳社保"
            case 'IS_PAY_SOCIAL_SECURITY':
                data.options = store.commonEnumData[alias]
                return data
            // "是否办理过失业登记"
            case 'IS_REGISTERED_UNEMPLOYMENT':
                data.options = store.commonEnumData[alias]
                return data
            case 'ORIGINAL_CERTIFICATE':
            case 'PROFESSIONAL_TITLE_CERTIFICATE':
                data.options = store.commonEnumData[alias]
                return data
            // 课程
            case 'COURSE_TYPE':
                data.options = store.commonEnumData[alias]
                return data
            /** 职业工龄*/
            case 'WORK_AGE':
                return data
            /** 通讯地址*/
            case 'MAILING_ADDRESS':
                data.options = addressOptions
                data.loadData = (options: DefaultOptionType[]) =>
                    handleLoadCascaderData(options, 'addressOptions')
                data.onChange = handleSelectAddress
                return data
            /** 所属地*/
            case 'PLACE_OF_AFFILIATION':
                data.options = cityOptions
                data.loadData = (options: DefaultOptionType[]) =>
                    handleLoadCascaderData(options, 'cityOptions')
                data.onChange = handleChangeCity
                return data
            /** 户籍所在地*/
            case 'HOUSEHOLD_REGISTRATION_LOCATION':
                data.options = domicileOptions
                data.loadData = (options: DefaultOptionType[]) =>
                    handleLoadCascaderData(options, 'domicileOptions')
                data.onChange = handleSelectDomicile
                return data
            // 参赛地区
            case 'PARTICIPATING_REGIONS':
                data.options = regionsOptions
                data.loadData = (options: DefaultOptionType[]) =>
                    handleLoadCascaderData(options, 'regionsOptions')
                data.onChange = handleSelectRegion
                return data
            // 社保参保地
            case 'SOCIAL_SECURITY_JOIN_AREA':
                data.options = socialOptions
                data.loadData = (options: DefaultOptionType[]) =>
                    handleLoadCascaderData(options, 'socialOptions')
                data.onChange = handleSelectSocial
                return data
            /** 上传电子照片*/
            case 'DIGITAL_PHOTO':
                return data
            // 原证书截图说明文案
            case 'CERTIFICATE_PHOTO':
                data.label = (
                    <Space>
                        原证书截图
                        {original_certificate_explain?.value && (
                            <Tooltip title={original_certificate_explain.value}>
                                <ExclamationCircleOutlined />
                            </Tooltip>
                        )}
                    </Space>
                )
                data.extra = `支持jpg、jpeg、png格式`
                return data
            /** 附件材料*/
            case 'ATTACHMENT_DOC':
                data.extra = `请上传相关附件材料，最多上传${data?.rule?.max || 1}个`
                return data
            case 'CURRENT_PROFESSIONAL_JOB_CERTIFICATE':
            case 'EDUCATION_LEVEL_CERTIFICATE':
            case 'EMPLOYMENT_CERTIFICATE':
            case 'SOCIAL_SECURITY_CERTIFICATE':
                data.extra = `支持jpg、jpeg、png、pdf格式，限${data?.rule?.max || 1}份`
                data.accept = ['image', 'pdf']
                return data
            default:
                // 自定义字段的options
                if (data?.customField) {
                    data.options = data?.customContent?.[0]?.options || []
                    data.extra = data?.customContent?.[0]?.extra
                    return data
                }
                return data
        }
    }

    /** 根据组件类型，给数据填充rule*/
    const getRuleByRenderType = (type: any, data: any): any => {
        const { rule = {}, errorMsg = '' } = data || {}
        /**将数据中的rule转换为组件需要格式 */
        let tempRules: unknown = []
        /**将数据中的requiredType生成必选rule */
        const requiredObj = rule?.required
            ? { required: !!rule?.required, message: errorMsg }
            : { required: false }
        switch (type) {
            case 'INPUT':
            case 'INPUT_NUMBER':
            case 'TEXTAREA':
                // @ts-ignore
                tempRules = [requiredObj].concat(tempRules)
                data.tempRules = tempRules
                return data
            case 'SELECT':
            case 'MULTI_SELECT':
            case 'DATEPICKER':
            case 'TIMEPICKER':
            case 'CITY_CASCADER':
            case 'IMAGE_UPLOAD':
                tempRules = [requiredObj]
                data.tempRules = tempRules
                return data
            case 'RADIO_GROUP':
            case 'MULTI_CHOICE':
                tempRules = [requiredObj]
                data.tempRules = tempRules
                return data
            case 'ID_PHOTO':
                const idPhotoType = form.getFieldValue('证件类型') || 0
                /** 身份证照片校验规则*/
                const idCardRule = () => ({
                    validator(_: any, value: string | any[]) {
                        if (requiredObj.required) {
                            if (value?.length < 2) {
                                return Promise.reject(new Error(`请上传证件照片`))
                            }
                            if (value[0].length === 0) {
                                return Promise.reject(new Error(`请上传身份证正面照片`))
                            }
                            if (value[1].length === 0) {
                                return Promise.reject(new Error(`请上传身份证反面照片`))
                            }
                            return Promise.resolve()
                        } else {
                            return Promise.resolve()
                        }
                    },
                })
                /** 护照照片校验规则*/
                const passportRule = () => ({
                    validator(_: any, value: string | any[]) {
                        if (requiredObj.required) {
                            if (value?.length < 1) {
                                return Promise.reject(new Error(`请上传护照照片`))
                            }
                            if (value[0].length === 0) {
                                return Promise.reject(new Error(`请上传护照照片`))
                            }
                            return Promise.resolve()
                        } else {
                            return Promise.resolve()
                        }
                    },
                })
                /** 其他照片校验规则*/
                const otherRule = () => ({
                    validator(_: any, value: string | any[]) {
                        if (requiredObj.required) {
                            if (value?.length < 1) {
                                return Promise.reject(new Error(`请上传证件照片`))
                            }
                            if (value[0].length === 0) {
                                return Promise.reject(new Error(`请上传证件照片`))
                            }
                            return Promise.resolve()
                        } else {
                            return Promise.resolve()
                        }
                    },
                })

                let idPhotoRule: unknown = idCardRule
                Number(idPhotoType) === 208 ? (idPhotoRule = idCardRule) : ''
                Number(idPhotoType) === 209 ? (idPhotoRule = passportRule) : ''
                Number(idPhotoType) === 210 ? (idPhotoRule = otherRule) : ''
                // @ts-ignore
                tempRules = [requiredObj].concat([idPhotoRule])
                data.tempRules = tempRules
                return data
            case 'FILE_UPLOAD':
                const max = data?.rule?.max || 1
                const fileRule = () => ({
                    validator(_: any, value: string | any[]) {
                        if (value?.length > max) {
                            return Promise.reject(new Error(`最多只能上传${max}个附件`))
                        }
                        return Promise.resolve()
                    },
                })
                // @ts-ignore
                tempRules = [requiredObj].concat([fileRule])
                data.tempRules = tempRules
                return data
            case 'LINK':
                const urlRule = () => ({
                    validator(_: any, value: string) {
                        if (!value) return Promise.resolve()

                        // URL正则表达式
                        const urlPattern =
                            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

                        if (!urlPattern.test(value)) {
                            return Promise.reject(new Error('请输入合法的链接地址'))
                        }
                        return Promise.resolve()
                    },
                })
                // @ts-ignore
                tempRules = [requiredObj].concat([urlRule])
                data.tempRules = tempRules
                return data
            default:
                // @ts-ignore
                tempRules = [requiredObj].concat(tempRules)
                data.tempRules = tempRules
                return data
        }
    }

    /** 根据组件类型，给数据填充placeholder*/
    const getPlaceholderByRenderType = (type: any, data: any) => {
        switch (type) {
            case 'INPUT':
            case 'INPUT_NUMBER':
            case 'TEXTAREA':
                data.placeholder = `请输入${data.name}`
                data.errorMsg = `请输入${data.name}`
                return data
            case 'SELECT':
            case 'RADIO_GROUP':
            case 'DATEPICKER':
            case 'TIMEPICKER':
            case 'CITY_CASCADER':
            case 'MULTI_SELECT':
            case 'MULTI_CHOICE':
                data.placeholder = `请选择${data.name}`
                data.errorMsg = `请选择${data.name}`
                return data
            case 'ID_PHOTO':
            case 'FILE_UPLOAD':
                data.placeholder = `请上传${data.name}`
                data.errorMsg = `请上传${data.name}`
                return data
            case 'IMAGE_UPLOAD':
                data.placeholder = `${data.name}`
                data.errorMsg = `请上传${data.name}`
                return data
            case 'LINK':
                data.placeholder = `请输入`
                data.errorMsg = `请输入${data.name}`
                return data
            default:
                return data
        }
    }

    // 在文件开头添加依赖关系配置
    const FIELD_DEPENDENCIES: any = {
        // 父字段为单选按钮(是/否)时的配置
        // key是父字段alias，value是{dependValue: 触发值, children: 子字段列表}
        原证书: {
            dependValue: '1', // 选择"是"时显示子字段
            children: [
                '原证书职业',
                '原证书工种',
                '原证书等级',
                '原证书编号',
                '原证书截图',
                '原证书获证时间',
                '原证书发证单位',
            ],
        },
        专业技术职称证书: {
            dependValue: '1',
            children: [
                '现职称名称',
                '现职称等级',
                '现职称证书编号',
                '现职称发证日期',
                '现职称证书发证单位',
                '现职称岗位证明',
            ],
        },
    }

    const getFromByData = () => {
        return Object.keys(enrollFormMap)
            .sort((a: any, b: any) => enrollFormMap[a]?.sort - enrollFormMap[b]?.sort)
            .map(temp => {
                const enrollFormMapItem = enrollFormMap[temp] || {}
                if (enrollFormMapItem.list.length === 0) {
                    return null
                } else {
                    return (
                        <TitleAdvance key={enrollFormMapItem.name} title={enrollFormMapItem.name}>
                            <Row gutter={[32, 8]}>
                                {enrollFormMapItem.list.map(
                                    (item: { id: any; name: any; alias: any; renderType: any }) => {
                                        const { id, name, alias, renderType } = item

                                        let tempItem = getPlaceholderByRenderType(renderType, item)
                                        tempItem = getRuleByRenderType(renderType, item)
                                        tempItem = getOptionsByAlias(alias, item)

                                        delete tempItem.value

                                        return (
                                            <Col
                                                key={`${enrollFormMapItem.name}_${id}_${name}`}
                                                span={
                                                    alias === 'REMARK' ||
                                                    alias === 'APPLICATION_CONDITIONS'
                                                        ? 24
                                                        : 8
                                                }
                                            >
                                                <Form.Item
                                                    noStyle
                                                    shouldUpdate={(prevValues, curValues) => {
                                                        // 添加对父字段值变化的监听
                                                        const parentFields =
                                                            Object.keys(FIELD_DEPENDENCIES)
                                                        return (
                                                            prevValues?.['证件类型'] !==
                                                                curValues?.['证件类型'] ||
                                                            prevValues?.['报名分类'] !==
                                                                curValues?.['报名分类'] ||
                                                            parentFields.some(
                                                                field =>
                                                                    prevValues?.[field] !==
                                                                    curValues?.[field],
                                                            )
                                                        )
                                                    }}
                                                >
                                                    {() => {
                                                        const classify =
                                                            form.getFieldValue('报名分类')

                                                        // 检查当前字段是否是某个父字段的子字段
                                                        const parentField = Object.entries(
                                                            FIELD_DEPENDENCIES,
                                                        ).find(([, config]: any) =>
                                                            config.children.includes(name),
                                                        )

                                                        // 如果是子字段，检查父字段的值是否满足显示条件
                                                        if (parentField) {
                                                            const [parentAlias, config]: any =
                                                                parentField
                                                            const parentValue =
                                                                form.getFieldValue(parentAlias)
                                                            if (
                                                                parentValue !== config.dependValue
                                                            ) {
                                                                return null // 不满足条件时不显示
                                                            }
                                                        }

                                                        if (name === '申报条件') {
                                                            if (!classify) return null

                                                            return (
                                                                <Form.Item
                                                                    label={name}
                                                                    name={name}
                                                                    rules={tempItem.tempRules}
                                                                    extra={tempItem.extra}
                                                                    hidden={
                                                                        tempItem.hidden ===
                                                                        undefined
                                                                            ? true
                                                                            : false
                                                                    }
                                                                >
                                                                    <PTFormItem {...tempItem} />
                                                                </Form.Item>
                                                            )
                                                        } else {
                                                            tempItem.idPhotoType =
                                                                form.getFieldValue('证件类型')
                                                            // 为父字段添加onChange事件，清空子字段的值
                                                            if (FIELD_DEPENDENCIES[name]) {
                                                                const originalOnChange =
                                                                    tempItem.onChange
                                                                tempItem.onChange = (
                                                                    value: string,
                                                                ) => {
                                                                    if (
                                                                        value !==
                                                                        FIELD_DEPENDENCIES[name]
                                                                            .dependValue
                                                                    ) {
                                                                        // 当父字段选择"否"时，清空所有子字段的值
                                                                        FIELD_DEPENDENCIES[
                                                                            name
                                                                        ].children.forEach(
                                                                            (childField: any) => {
                                                                                form.setFieldValue(
                                                                                    childField,
                                                                                    undefined,
                                                                                )
                                                                            },
                                                                        )
                                                                    }
                                                                    originalOnChange?.(value)
                                                                }
                                                            }
                                                            return (
                                                                <Form.Item
                                                                    label={tempItem.label || name}
                                                                    name={name}
                                                                    rules={tempItem.tempRules}
                                                                    extra={tempItem.extra}
                                                                >
                                                                    <PTFormItem {...tempItem} />
                                                                </Form.Item>
                                                            )
                                                        }
                                                    }}
                                                </Form.Item>
                                            </Col>
                                        )
                                    },
                                )}
                            </Row>
                        </TitleAdvance>
                    )
                }
            })
    }

    return (
        <Spin spinning={store.loading}>
            <div className={styles.component_enroll_form}>
                <Form form={form} layout="vertical" validateTrigger={'onBlur'}>
                    {getFromByData()}
                    <div className={styles.next_step_btn}>
                        <Button type="primary" onClick={handleNextOrSubmit} disabled={isPending}>
                            {store.stepList.length > 1 ? '下一步' : '提交'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Spin>
    )
}

export default observer(EnrollForm)
