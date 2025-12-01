import { makeAutoObservable } from 'mobx'
import API, { ApiMap } from './api'
import Http from '@/servers/http'
import type { ActivityUserDetailDto } from '@/@types/apply'
import dayjs from 'dayjs'
import { TYPE_TAG_TRANSFORMED } from '../event-management/components/superTables/const'
import { message } from 'antd'
import { PUBLISH_STATUS_ENUM, SOURCE_MAP } from './const'
import { getCookie, getLocalStorage } from '@/storage'
// import { history } from 'umi'
import _, { cloneDeep } from 'lodash'
import type { EVENT_KIND } from '@/types'
import { EVENT_KIND_VALUE, BUSINESS_KIND } from '@/types'
import { Modal } from 'antd'
import type { FIELD_TYPE_NAME } from './components/CustomFieldModal/const'

interface CategoryItem {
    name: string[]
    value: string[]
    types: string[]
}

class SettingStore {
    // 内容 富文本
    public editorText: string = ''
    // 设置详情
    public enrollSetDetail: ActivityUserDetailDto = {}
    /**  回显的数据  */
    public echoDetail: ActivityUserDetailDto = {}

    /** 选择分类选择确定选择的值   */
    public cateSelectName: string = ''
    /**  modal选择分类的  */
    public modalSelectValue?: Partial<CategoryItem> | undefined = undefined
    public selectedCategoryList: Partial<CategoryItem>[] = []
    // 最后一级分类
    public isLastCate: boolean = false
    /** 按钮loading   */
    public btnLoading: boolean = false
    /** 报名项目options    */
    public ApplyProjectOptions: any = []
    /**  是否是编辑还是新增  */
    public isEdit: boolean = false
    /**  业务线传过来的code bizCode   保存的时候需要传给后端  */
    public bizCode: string = ''
    /**  业务线传过来的报名表单  优先覆盖默认报名表单*/
    public bizFieldDtoList: any[] = []
    public fields: any[] = []
    public detailFieldList: any[] = []
    /**  锁定的分类数据  */
    public lockCategory: any[] = []
    /**  锁定字段的map对象  */
    public lockMap: Record<string, boolean> = {}
    /**  锄禾站点 平台配置 报名设置 是否启用报名缴费  */
    public isOpenEnrollPay: boolean = false
    /**  业务来源（若业务线编码非空，则该字段必填）：1考评，2职培  */
    public source: number | string = ''
    // 添加新的状态
    public customFieldModalVisible: boolean = false
    public customFieldType: string = ''
    public customFieldTypeDesc: string = ''
    public customFieldLoading: boolean = false
    public editingField: any = null // 当前正在编辑的字段

    // 机构信息
    public PortalInfoDetail = {}

    constructor() {
        makeAutoObservable(this)
    }
    setDetailFieldList = async (list: any) => {
        this.detailFieldList = list
    }
    getEnrollFormSetting = async (type: number, code: any) => {
        // 需要区分是新建页面还是详情页面
        const res: any = await Http(
            `${API.getEnrollFormSetttingList}?entryCodeInteger=${type}`,
            'get',
            {},
        )
        let list: any[] = []
        if (code) {
            // 编辑情况下，需要把详情的数据同步到filed里面
            // this.detailFieldList
            res?.forEach((item: { name: any; fieldType: any }) => {
                const target =
                    this.detailFieldList.find(
                        detailField =>
                            detailField.name === item.name &&
                            detailField.fieldType === item.fieldType,
                    ) || {}
                if (!_.isEmpty(target)) {
                    list.push({
                        ...item,
                        openType: target.openType,
                        requiredType: target.requiredType,
                    })
                } else {
                    // 说明没找到
                    list.push(item)
                }
            })
        } else {
            list = res as unknown as []
        }
        // this.fields = list
        this.initFieldList(list)
    }
    updateField = async (field: string, value: string | number, pos: number) => {
        const newField = _.cloneDeep(this.fields)
        newField.forEach((item, index) => {
            if (index === pos) {
                let finalValue = value ? 1 : 0 // 布尔值转 0 1
                item[field] = finalValue
                if (field === 'openType' && finalValue === 0) {
                    item.requiredType = 0
                }
            }
        })
        this.fields = newField
    }

    /**  获取业务线活动接口  */
    getBizEvent = (query: any) => {
        let { bizType } = query || {}
        /**业务线标识 */
        let bizKey: BUSINESS_KIND = BUSINESS_KIND.EXAM
        /**业务线接口地址 */
        let bizApi: string = ''
        /**业务线活动类型 */
        let bizEventType: (typeof EVENT_KIND_VALUE)[EVENT_KIND] = 1
        Object.keys(query).map(key => {
            if (ApiMap[key]) {
                bizKey = key as unknown as BUSINESS_KIND
                bizApi = ApiMap[key]
            }
        })
        bizEventType = EVENT_KIND_VALUE[bizType as keyof typeof EVENT_KIND_VALUE]
        this.bizCode = query[bizKey]
        return {
            url: `${bizApi}${query[bizKey]}`,
            params: {
                bizCode: query[bizKey],
                type: bizEventType,
            },
        }
    }

    /** 获取业务线活动详情 */
    getBizEventDetails = async (query: any) => {
        const bizParams = this.getBizEvent(query)
        if (!bizParams?.params?.bizCode) return
        const params = new URLSearchParams(window.location.search)
        if (params.has(BUSINESS_KIND.CAREER)) {
            // 职培接口请求  /career_main/class/active_detail/xxxx
            // @ts-ignore
            bizParams.params = {}
            this.source = SOURCE_MAP.VOCATIONAL
        }
        if (params.has(BUSINESS_KIND.EXAM)) {
            this.source = SOURCE_MAP.EVALUATE
        }

        const res: any = await Http(bizParams.url, 'get', { ...bizParams.params })

        const { categoryList = [], fieldDtoList = [] } = res || {}
        this.bizFieldDtoList = fieldDtoList
        this.enrollSetDetail = res
        this.getLockMap(res)
        this.lockCategory = categoryList || []
        this.transformData(res)
    }

    /** 获取平台活动详情 */
    getEnrollSetDetail = async (code: string) => {
        const res: any = await Http(API.EnrollSet, 'post', { code }, { repeatFilter: false })
        this.isEdit = true
        this.enrollSetDetail = res as any
        this.getLockMap(res)
        this.transformData(res)
    }

    /**初始化报名表单 */
    initFieldList = (list: any[]) => {
        const {
            fieldDtoList = [],
            appliedNum = 0,
            customFieldDtoList = [],
        } = this.enrollSetDetail || {}
        const cloneFields = cloneDeep(list) || []
        const mergeFields = cloneFields.map(platItem => {
            // todo 合并自定义字段
            this.bizFieldDtoList.map(bizItem => {
                if (platItem?.alias?.toString() === bizItem?.alias?.toString()) {
                    // eslint-disable-next-line no-param-reassign
                    platItem = { ...bizItem, sort: platItem?.sort }
                }
            })
            return platItem
        })
        /**  自定义字段列表  */
        const customFieldList: any[] = customFieldDtoList.map((item: any) => {
            item.customContent?.forEach((content: Record<string, any>) => {
                Object.keys(content).forEach((key: string) => {
                    if (key === 'options') {
                        item[key] = content[key].map((i: any) => i.value)
                    } else {
                        item[key] = content[key]
                    }
                })
            })
            if (Number(appliedNum) > 0) {
                item.editType = 0
                item.closeType = 0
            }
            return { ...item, max: item?.rule?.max, maxSize: item?.rule?.maxSize }
        })

        mergeFields.forEach(item => {
            if (this.isEdit) {
                item.openType = 0
            }
            ;(fieldDtoList as unknown as any).map((selItem: any) => {
                if (item?.alias?.toString() === selItem?.alias?.toString()) {
                    // eslint-disable-next-line no-param-reassign
                    item.openType = selItem.openType
                }
            })
            if (Number(appliedNum) > 0) {
                item.editType = 0
                item.closeType = 0
            }
        })

        mergeFields.forEach(item => {
            if (item.openType.toString() === '0') {
                item.requiredType = 0
            }
        })

        // 合并 mergeFields 和 customFieldList，按 fieldType 分组排序
        const allFields = [...mergeFields, ...customFieldList]

        // 按 fieldType 分组
        const groupedMap = allFields.reduce((acc: Record<string, any[]>, curr) => {
            const fieldType = curr.fieldType
            if (!acc[fieldType]) {
                acc[fieldType] = []
            }
            // 避免重复添加
            const exists = acc[fieldType].some(item => item.alias === curr.alias)
            if (!exists) {
                acc[fieldType].push({
                    ...curr,
                    fieldTypeDesc: curr?.fieldTypeDesc || acc[fieldType]?.[0]?.fieldTypeDesc,
                })
            }
            return acc
        }, {})

        // 将分组后的数据按 fieldType 从小到大排序,并展平为数组
        const groupedFields = Object.keys(groupedMap)
            .sort((a, b) => groupedMap[a]?.[0]?.fieldTypeSort - groupedMap[b]?.[0]?.fieldTypeSort)
            .reduce((acc: any[], fieldType) => {
                return [...acc, ...groupedMap[fieldType]]
            }, [])

        this.fields = groupedFields
    }

    /** 获取锁定字段map */
    getLockMap = (data: any) => {
        const { nonEditableFields = [] } = data || {}
        nonEditableFields.map((item: string) => {
            this.lockMap = { ...this.lockMap, ...{ [item]: true } }
        })
    }
    /**
     * @description: 设置富文本内容
     */
    setEditorText = (content: string) => {
        this.editorText = content
    }

    /** 关闭报名  */
    closeActivity = async (code: string) => {
        const res = await Http(`${API.closeActivity}?code=${code}`, 'post', {})
        return res
    }

    /**  处理一下数据 为了回显  */
    transformData = (data: any) => {
        /** entryCode  报名项目 */
        if (data?.entryCode) {
            data.entryCodeInteger = TYPE_TAG_TRANSFORMED[data.entryCode]
        }
        /**  封面  */
        // data.cover = data.cover
        //     ? [
        //         {
        //             uid: '-1',
        //             name: 'image.png',
        //             status: 'done',
        //             url: data.cover,
        //         },
        //     ]
        //     : []

        /**  时间处理  */
        const dateFields = [
            'activityEnd',
            'activityStart',
            'applyEndTime',
            'applyStartTime',
            'payEndTime',
            'cancelEnd',
        ]
        dateFields.forEach(field => {
            data[field] = data[field] ? dayjs(data[field]) : undefined
        })
        /**  附件材料处理  */

        const filesLists = (data?.attachmentJson ? JSON.parse(data.attachmentJson) : []).reduce(
            (acc: any, field: any, index: number) => {
                acc.push({
                    uid: `-${index + 1}`,
                    name: `${field.name}`,
                    status: 'done',
                    url: `${field.url}`,
                })
                return acc
            },
            [],
        )

        if (filesLists.length > 0) {
            data.filesLists = filesLists
        }

        // 最大报名人数-1就是没填
        data.quota = data.quota === -1 ? undefined : data.quota

        data.courseCode = data.courseCode
            ? { label: data.courseName, value: data.courseCode }
            : undefined

        /**  下面是选择分类的一些操作 处理数据格式  为的是编辑的时候可以修改分类  */
        /**  ids  types */
        let res: any = data?.categoryCode ? JSON.parse(data?.categoryCode) : []
        const idRes =
            res?.map((item: any) => {
                const { categoryId, careerId, workId, levelRelationId } = item || {}
                const valueArr = [categoryId, careerId]
                const typesArr = ['categoryId', 'careerId']

                if (workId) {
                    valueArr.push(workId)
                    typesArr.push('work')
                }

                if (levelRelationId) {
                    valueArr.push(levelRelationId)
                    typesArr.push('level')
                }

                return { value: valueArr, types: typesArr }
            }) || []
        /**  names  */
        let names = data?.categoryName || []
        const namesRes =
            names?.map((item: string) => {
                const parts = item.split('/')
                return { name: parts }
            }) || []

        const result =
            idRes?.reduce((acc: any, item: any, index: number) => {
                return [...acc, { ...item, ...namesRes[index] }]
            }, []) || []
        this.selectedCategoryList = result || []
        // 处理选择分类的数据
        this.echoDetail = data
    }

    /**  报存  */
    onSave = async (values: any, isRelease: number) => {
        if (this.btnLoading) return
        this.btnLoading = true
        let params = this.transformSaveData(values)
        /**  新建的时候点保存  */
        if (!this.isEdit && isRelease === 0) {
            params.publishStatus = PUBLISH_STATUS_ENUM.DRAFT
        }
        // 发布状态
        if (isRelease === 1) {
            params.publishStatus = PUBLISH_STATUS_ENUM.RELEASE
        } else if (isRelease === 2) {
            params.publishStatus = PUBLISH_STATUS_ENUM.DRAFT
        }

        //openPay :  0。 不要传这两个值payEndTime :  0 price :  0
        if (!params.openPay) {
            Reflect.deleteProperty(params, 'payEndTime')
            Reflect.deleteProperty(params, 'price')
        }
        if (this.bizCode) {
            params = { ...params, bizCode: this.bizCode }
        }
        // openType === 0 过滤不传，减少带宽
        let fields = this.fields.filter(item => item.openType === 1 || item.customField)
        // let fields = this.fields
        fields = fields.map(i => {
            if (i?.requiredType === 1) {
                return {
                    ...i,
                    rule: {
                        ...i.rule,
                        required: true,
                    },
                }
            } else {
                return {
                    ...i,
                    rule: {
                        ...i.rule,
                        required: false,
                    },
                }
            }
        })
        try {
            let data
            if (!this.isEdit) {
                // 新增
                const sid = this.source ? getLocalStorage('SID') : ''
                const source = this.source ? this.source : ''

                data = await Http(API.save, 'POST', {
                    ...params,
                    fieldDtoList: fields,
                    sid,
                    source,
                })
            } else {
                //   编辑
                // 不需要传
                delete params.categoryName
                delete params.categoryCode
                // delete params.categoryList
                await Http(API.release, 'POST', {
                    ...params,
                    code: this.echoDetail.code,
                    fieldDtoList: fields,
                })
            }
            this.btnLoading = false
            return Promise.resolve(data)
        } catch (error) {
            /* empty */
            this.btnLoading = false
            return Promise.reject()
        }
    }

    /**  处理保存的数据  */
    transformSaveData = (values: any) => {
        const params = { ...values, categoryList: this.handlerClassification() }

        delete params.categoryCode

        /**  时间处理 精确到秒 */
        const dateFields = ['applyEndTime', 'applyStartTime', 'payEndTime', 'cancelEnd']
        dateFields.forEach(field => {
            params[field] = values[field] ? dayjs(values[field]).unix() * 1000 : undefined
        })
        /**  时间处理 精确到毫秒 */
        const dateFields_activity = ['activityEnd', 'activityStart']
        dateFields_activity.forEach(field => {
            params[field] = values[field] ? dayjs(values[field]).valueOf() : undefined
        })

        /**  封面  */
        // params.cover = values?.cover?.[0]?.response?.url || values?.cover?.[0]?.url

        /**  附件材料处理  */
        params.attachmentJson = JSON.stringify(
            values.filesLists?.map((item: any) => ({
                name: item.name,
                url: item?.response?.url ?? item.url,
            })),
        )

        params.quota = params.quota || null
        params.organizationCode = getCookie('SELECT_ORG_CODE')

        params.quota ? '' : Reflect.deleteProperty(params, 'quota')
        Reflect.deleteProperty(params, 'filesLists')

        /**  报名缴费  根据站点配置是否启用报名缴费， 不启用时，不展示【报名缴费】字段，默认选择【关闭】 ==> openPay 0  */
        params.openPay = params?.openPay || 0

        params.detail = params.detail === '<p><br></p>' ? '' : params.detail

        return { ...this.echoDetail, ...params }
    }

    /**
     * 处理择分类的数据
     * @returns 分类，职业，工种，等级 对象
     */
    handlerClassification = () => {
        // 当拥有业务线传入的分类 直接使用业务线返回的分类
        if (this.lockCategory.length > 0) {
            return this.lockCategory
        }

        if (!this.selectedCategoryList.length) {
            // return {}
            return ''
        }

        const values: Record<string, string>[] = []

        this.selectedCategoryList.map(item => {
            const { types = [], value = [] } = item ?? {}
            const currentCategory: Record<string, string> = {}

            types.forEach((type: string, index: number) => {
                if (type === 'categoryId') {
                    currentCategory.categoryId = value[index]
                } else if (type === 'careerId') {
                    currentCategory.careerId = value[index]
                } else if (type === 'work') {
                    currentCategory.workId = value[index]
                } else if (type === 'level') {
                    currentCategory.levelRelationId = value[index]
                }
            })

            values.push(currentCategory)
        })

        return values?.filter(Boolean)
    }

    /** 查询站点详情
     *  看站点平台配置  报名设置
     */
    getSiteDetail = async () => {
        const sid = getLocalStorage('SID')

        const data: any = await Http(`${API.siteDetail}`, 'POST', { sid }, {})
        const { configList = [] } = data || {}
        //   reviews_plan 评价计划  training_plan 班级报名  training_class 培训班级
        const applyOptions: any = []

        const addItem = (key: string, label: string, value: number) => {
            const item = configList.find(
                (i: { key: string; value: string }) => i?.key === key && i?.value === '1',
            )
            if (item) {
                applyOptions.push({ label, value })
            }
        }

        addItem('reviews_plan', '评价计划', 2)
        addItem('training_plan', '班级报名', 3)
        addItem('training_class', '培训班级', 4)
        addItem('skills_competition', '技能竞赛', 6)
        addItem('common', '通用', 8)
        addItem('course_apply', '课程报名', 9)

        this.ApplyProjectOptions = [...applyOptions]

        const isOpenPayItem = !!configList.find(
            (item: { key: string; value: string }) =>
                item?.key === 'enable_apply_pay' && item?.value === '1',
        )
        this.isOpenEnrollPay = isOpenPayItem
    }

    /**  获取选择分类的name  */
    changeSelectClassify = (val?: Partial<CategoryItem>) => {
        this.modalSelectValue = val
    }

    /**  是否是最后一级  */
    changeIsLastCate = (val: boolean) => {
        this.isLastCate = val
    }

    /**  确认选中分类修改分类名  */
    changeCateName = (nameList: string[]) => {
        this.cateSelectName = nameList.join(' > ')
    }

    changeSelectedCategoryList = (currentModalSelectValue: Partial<CategoryItem>) => {
        this.selectedCategoryList.push(currentModalSelectValue)
    }

    /**  删除某个已选分类  */
    deleteSelectedCategoryList = (currentModalSelectValue: Partial<CategoryItem>) => {
        const tempSelectedCategoryList = this.selectedCategoryList.filter(item => {
            return item.value?.toString() !== currentModalSelectValue.value?.toString()
        })
        this.selectedCategoryList = tempSelectedCategoryList
    }

    // 重置分类
    resetForm = () => {
        this.selectedCategoryList = []
        this.cateSelectName = ''
    }

    // 显示添加自定义字段弹窗
    showCustomFieldModal = (fieldType: string, fieldTypeDesc: string) => {
        this.customFieldModalVisible = true
        // 保存当前字段类型信息
        this.customFieldType = fieldType
        this.customFieldTypeDesc = fieldTypeDesc
    }

    // 隐藏添加自定义字段弹窗
    hideCustomFieldModal = () => {
        this.customFieldModalVisible = false
        this.customFieldType = ''
        this.customFieldTypeDesc = ''
        this.editingField = null // 清空编辑状态
    }

    // 添加新的自定义字段
    addCustomField = (values: {
        renderType: keyof typeof FIELD_TYPE_NAME
        name: string
        options?: string[]
        max?: number
        maxSize?: number
        extra?: string
    }) => {
        this.customFieldLoading = true
        try {
            // 检查相同字段类型中是否存在相同名称
            const hasSameNameInType = this.fields.some(
                item =>
                    // item.fieldType === this.customFieldType && // 相同字段类型
                    item.name === values.name && // 相同名称
                    (!this.editingField || item.alias !== this.editingField.alias), // 排除编辑时的自身
            )

            if (hasSameNameInType) {
                message.error('该活动下已存在相同的字段名称')
                this.customFieldLoading = false
                return false // 返回 false 表示添加失败
            }

            if (this.editingField) {
                // 编辑模式
                const newFields = this.fields.map(item => {
                    if (item.alias === this.editingField.alias) {
                        return {
                            ...item,
                            ...values,
                            // 保持原有的字段类型不变，只更新渲染类型
                            renderType: values.renderType,
                            alias: values.name,
                            customContent: [
                                {
                                    options: values.options?.map((text: string) => ({
                                        value: text,
                                        label: text,
                                    })),
                                    extra: values.extra,
                                },
                            ],
                            rule: { required: true, max: values?.max, maxSize: values?.maxSize },
                        }
                    }
                    return item
                })
                this.fields = newFields
                message.success('编辑成功')
            } else {
                // 添加模式
                const newField = {
                    // 字段类型保持不变
                    fieldType: this.customFieldType,
                    fieldTypeDesc: this.customFieldTypeDesc,
                    ...values,
                    customField: true,
                    customContent: [
                        {
                            options: values.options?.map((item: string) => ({
                                value: item,
                                label: item,
                            })),
                            extra: values.extra,
                        },
                    ],
                    rule: { required: true, max: values?.max, maxSize: values?.maxSize },
                    openType: 1,
                    requiredType: 1,
                    alias: values.name,
                    editType: 1,
                    closeType: 1,
                }

                // 找到相同字段类型的最后一个位置
                const lastIndex = this.fields.findIndex(
                    (item, index) =>
                        item.fieldType === this.customFieldType &&
                        this.fields[index + 1]?.fieldType !== this.customFieldType,
                )

                const newFields = [...this.fields]
                if (lastIndex === -1) {
                    newFields.push(newField)
                } else {
                    newFields.splice(lastIndex + 1, 0, newField)
                }
                this.fields = newFields
                message.success('添加成功')
            }

            this.hideCustomFieldModal()
            return true // 返回 true 表示添加成功
        } catch (error) {
            message.error(this.editingField ? '编辑失败' : '添加失败')
            return false // 返回 false 表示添加失败
        } finally {
            this.customFieldLoading = false
        }
    }

    // 显示编辑弹窗
    showEditFieldModal = (record: any) => {
        this.editingField = record
        this.customFieldType = record.fieldType
        this.customFieldTypeDesc = record.fieldTypeDesc
        this.customFieldModalVisible = true
    }

    // 显示删除确认框
    showDeleteConfirm = (record: any) => {
        Modal.confirm({
            title: '删除自定义字段',
            content: '删除后无法找回，是否确定删除？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.deleteCustomField(record)
            },
        })
    }

    // 删除自定义字段
    deleteCustomField = (record: any) => {
        try {
            const newFields = this.fields.filter(item => item.alias !== record.alias)
            this.fields = newFields
            message.success('删除成功')
        } catch (error) {
            message.error('删除失败')
        }
    }

    // 获取机构招生设置详情
    getPortalInfo = async () => {
        const res: any = (await Http(`${API.getPortalInfo}`, 'get', {})) || {}
        this.PortalInfoDetail = res
    }
}

export default SettingStore
