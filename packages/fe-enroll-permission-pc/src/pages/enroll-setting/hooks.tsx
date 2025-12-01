import { UploadOutlined } from '@ant-design/icons'
import { Button, Col, Form, Select } from 'antd'
// import ImageUpload from '@/components/ImageUpload'
import type SettingStore from './store'
import GlobalUpload from '@/components/GlobalUpload'
import styles from './index.modules.less'
import { StatusTypeNum, TYPE_ENUM } from '../event-management/components/superTables/const'
import { useState } from 'react'
import getItemByType from './components/GetItemByType'
import { ITEM_TYPE_ENUM } from './components/GetItemByType/const'
import CategoryItem from './components/FormCategory'
// import { ENROLL_END_TIME_MAP, ENROLL_START_TIME_MAP } from './const'
// import { findSiteData } from '@wotu/wotu-components'
// import { getLocalStorage } from '@/storage'
import React from 'react'
import MoreSelect from '@/components/NewMoreSelect'
import { getLocalStorage } from '@/storage'
import dayjs from 'dayjs'

// const itemLayout = {
//     labelCol: { span: 9 },
//     wrapperCol: { span: 15 },
// }

interface IProps {
    setSelectClassify: (value: boolean) => void
    store: SettingStore
    form: any
    setSelectKey: any
    entryCodeInteger: number // 报名项目
    isOpenEnrollPay: boolean // 是否启用报名缴费
}

export const Hooks = (props: IProps) => {
    let { setSelectClassify, store, setSelectKey, entryCodeInteger = 0, isOpenEnrollPay } = props
    entryCodeInteger = Number(entryCodeInteger)

    const [disBtn, setDisBtn] = useState(false)
    // const { siteData } = getLocalStorage('SITE_STORE') || {}

    /**
     * 滚动到锚点
     * @param anchorName
     */
    const scrollToAnchor = (anchorName: string) => {
        if (anchorName) {
            setSelectKey(anchorName)
            // 找到锚点
            let anchorElement = document.getElementById(anchorName)
            let content = document.getElementsByClassName('right_content')?.[0]
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                const leftNum = anchorElement.offsetLeft
                const topNum = anchorElement.offsetTop
                content.scrollTo(leftNum, topNum + 50)
            }
        }
    }

    /**
     * 内容校验
     */
    const checkContent = () => {
        if (store.editorText && store.editorText !== '<p><br></p>') {
            return Promise.resolve()
        }
        return Promise.reject(new Error('请输入活动详情'))
    }
    /**
     * 内容校验
     */
    const checkPhone = (_: any, value: any) => {
        // 座机号正则（区号+号+电话号码+分机号）
        const telReg = /^(\d{3,4}-)?\d{6,11}(\(\d{1,4}\))?$/
        // 手机号正则（中国大陆）
        const phoneReg = /^1[3-9]\d{9}$/
        if (value) {
            if (telReg.test(value) || phoneReg.test(value)) {
                return Promise.resolve()
            } else {
                return Promise.reject(new Error('请填写正确的联系方式'))
            }
        } else {
            return Promise.resolve()
        }
    }

    /**  是否控制 disabled  */
    const isDisabled = (type: string) => {
        if (type === 'openPay') {
            // 暂时先关闭报名缴费
            return store.echoDetail?.appliedNum
        }
        if (!store.isEdit) {
            // 非编辑模式时候 根据lockMap判断当前字段是否不可编辑
            return !!store.lockMap?.[type]
        }

        // 编辑模式时 当当前字段存在于lockMap中 直接锁定不可编辑
        if (store.lockMap?.[type]) return true

        // 编辑模式时 当前字段不存在于lockMap中 根据活动状态约定锁定一些字段
        const status = Number(store.enrollSetDetail?.status)
        switch (type) {
            case 'applyStartTime':
                return status !== StatusTypeNum.draft
            case 'applyEndTime':
            case 'quota':
            case 'openAudit':
            case 'openPay':
                return status === StatusTypeNum.end
            default:
                return false
        }
    }

    /**
     * 报名信息 Form.Item 的配置
     * openPay 报名缴费  1开启0 关闭
     * cancelFlags 取消报名 1开启0 关闭
     *  @type {*} */
    const serachList = (openPay: number, cancelFlags: number) => [
        {
            attr: {
                label: '报名开始时间',
                name: 'applyStartTime',
            },
            extra: '填写后，达到报名开始时间可以报名；不填写，则报名活动发布后即可报名',
            // rules: [
            //     {
            //         required: true,
            //         message: '请选择报名开始时间',
            //     },
            // ],
            itemType: ITEM_TYPE_ENUM.DATEPICKER,
            itemOptions: {
                showTime: { format: 'HH:mm', defaultValue: dayjs('00:00', 'HH:mm') },
                format: 'YYYY-MM-DD HH:mm',
                placeholder: '请选择报名开始时间',
                disabledDate: true,
                // @ts-ignore
                disabledTime: true,
                style: { width: '100%' },
                disabled: isDisabled('applyStartTime'),
            },
        },
        {
            attr: {
                label: '报名结束时间',
                name: 'applyEndTime',
            },
            // rules: [
            //     {
            //         required: true,
            //         message: '请选择报名结束时间',
            //     },
            // ],
            extra: '填写后，达到报名结束时间不可在线报名；不填写，则需手动关闭报名方不可报名',
            itemType: ITEM_TYPE_ENUM.DATEPICKER,
            itemOptions: {
                showTime: { format: 'HH:mm', defaultValue: dayjs('00:00', 'HH:mm') },
                format: 'YYYY-MM-DD HH:mm',
                placeholder: '请选择报名结束时间',
                disabledDate: true,
                disabledTime: true,
                style: { width: '100%' },
                disabled: isDisabled('applyEndTime'),
            },
        },
        {
            attr: {
                label: '报名审核',
                name: 'openAudit',
            },
            extra: '若开启了报名审核，审核通过算作报名成功',
            rules: [
                {
                    required: true,
                },
            ],
            itemType: ITEM_TYPE_ENUM.RADIO,
            itemOptions: {
                disabled: isDisabled('openAudit'),
                options: [
                    { label: '开启', value: 1 },
                    { label: '关闭', value: 0 },
                ],
            },
        },
        {
            attr: {
                label: '最大报名人数',
                name: 'quota',
            },
            extra: '填写后，达到最大报名人数不可在线报名；不填写，没有报名人数限制',
            rules: [
                {
                    pattern: /^[1-9]\d*$/, // 正整数
                    message: '请输入正整数',
                },
            ],
            itemType: ITEM_TYPE_ENUM.INPUT,
            itemOptions: {
                placeholder: '请输入',
                disabled: isDisabled('quota'),
            },
        },
        {
            attr: {
                label: '取消报名',
                name: 'cancelFlag',
            },
            extra: '若开启了取消报名，允许用户自主取消报名；若用户已经缴费，取消报名会给用户退费',
            rules: [
                {
                    required: true,
                },
            ],
            itemType: ITEM_TYPE_ENUM.RADIO,
            itemOptions: {
                defaultValue: 0,
                options: [
                    { label: '开启', value: 1 },
                    { label: '关闭', value: 0 },
                ],
            },
        },
        {
            attr: {
                label: <span>取消报名截止时间&nbsp;</span>,
                name: 'cancelEnd',
            },
            isShow: cancelFlags === 0,
            extra: '报名成功的用户，到达截止取消报名时间不可进行取消报名',
            rules: [
                {
                    required: true,
                    message: '请选择取消报名截止时间',
                },
            ],
            itemType: ITEM_TYPE_ENUM.DATEPICKER,
            itemOptions: {
                showTime: { format: 'HH:mm:ss' },
                format: 'YYYY-MM-DD HH:mm:ss',
                placeholder: '请选择取消报名截止时间',
                disabledDate: true,
                disabledTime: true,
                style: { width: '100%' },
            },
        },
        {
            attr: {
                label: '报名缴费',
                name: 'openPay',
            },
            isShow: !isOpenEnrollPay,
            extra: '若开启了报名审核，审核通过用户才可进行报名缴费',
            rules: [
                {
                    required: true,
                },
            ],
            itemType: ITEM_TYPE_ENUM.RADIO,
            itemOptions: {
                defaultValue: 1,
                options: [
                    { label: '开启', value: 1 },
                    { label: '关闭', value: 0 },
                ],
            },
        },
        {
            attr: {
                label: '报名费用',
                name: 'price',
            },
            isShow: !isOpenEnrollPay || openPay === 0,
            rules: [
                {
                    required: true,
                },
                {
                    pattern: /^(?!0+(\.0+)?$)([1-9]\d*|0)(\.\d{1,2})?$/, // 正数，最多两位小数
                    message: '请输入正确的报名费用',
                },
            ],
            extra: '最多支持两位小数',
            itemType: ITEM_TYPE_ENUM.INPUT,
            itemOptions: { placeholder: '请输入', suffix: <span>元</span> },
        },
        {
            attr: {
                label: <span>缴费截止时间&nbsp;</span>,
                name: 'payEndTime',
            },
            extra: '达到缴费截止时间不可进行缴费',
            isShow: !isOpenEnrollPay || openPay === 0,
            rules: [
                {
                    required: true,
                    message: '请选择缴费截止时间',
                },
            ],
            itemType: ITEM_TYPE_ENUM.DATEPICKER,
            itemOptions: {
                showTime: { format: 'HH:mm:ss' },
                format: 'YYYY-MM-DD HH:mm:ss',
                placeholder: '请选择缴费截止时间',
                disabledDate: true,
                disabledTime: true,
                style: { width: '100%' },
            },
        },
    ]

    /**
     * 获取表单的配置 报名信息
     * openPay 报名缴费  1开启0 关闭
     * cancelFlags 取消报名 1开启0 关闭
     */
    const getFields = (openPay: number, cancelFlags: number) => {
        // const getNewArr = () => {
        /* 报名缴费开启等于1 */
        // if (openPay === 1) {
        //     if (cancelFlags === 1) {
        //         return serachList || []
        //     } else {
        //         // 删除最后一个
        //         serachList.splice(-1, 1)
        //         return serachList
        //     }
        // } else {
        //     if (cancelFlags === 1) {
        //         // 倒数后面第四个 删除2个
        //         serachList.splice(-4, 2)
        //         return serachList || []
        //     } else {
        //         // 删除最后一个  在从倒数后面第三个 删除2个
        //         serachList.splice(-1, 1)
        //         serachList.splice(-3, 2)
        //         return serachList || []
        //     }
        // }
        // }
        // console.log(openPay, cancelFlags)
        return (
            <>
                {serachList(openPay, cancelFlags).map(
                    // @ts-ignore
                    ({ attr, render, rules, extra, itemType, itemOptions, isShow }) => {
                        if (isShow) return null

                        return (
                            <React.Fragment key={attr.name}>
                                <Form.Item {...attr} rules={rules} extra={extra}>
                                    {render
                                        ? render()
                                        : getItemByType(itemType, {
                                              ...itemOptions,
                                              // @ts-ignore
                                              disabled: isDisabled(attr.name),
                                          })}
                                </Form.Item>
                            </React.Fragment>
                        )
                    },
                )}
            </>
        )
    }

    /**
     *  基本信息list
     */
    // let isOpen = store.fields.filter(item => item.alias === 'CERTIFICATION_TIME')[0]?.openType === 1
    // const endTimeRequired =
    //     isOpen &&
    //     findSiteData(siteData, 'enable_original_certificates_date_interval_limit', {
    //         findKey: 'configList',
    //     })?.value === '1'

    const basicInformationList = [
        {
            attr: {
                label: '报名项目',
                name: 'entryCodeInteger',
            },
            isShow: true,
            render: () => {
                return (
                    <Select
                        options={store.ApplyProjectOptions}
                        disabled={
                            Number(store.echoDetail?.appliedNum) > 0
                                ? true
                                : store.lockMap?.entryCode
                                ? true
                                : false
                        }
                        placeholder="请选择"
                    />
                )
            },
            rules: [
                {
                    required: true,
                    message: '请选择报名项目',
                },
            ],
        },
        {
            attr: {
                label: '标题',
                name: 'name',
            },
            isShow: true,
            rules: [
                {
                    required: true,
                    message: '请输入标题',
                },
            ],
            itemType: ITEM_TYPE_ENUM.INPUT,
            itemOptions: {
                placeholder: '请输入',
                maxLength: 50,
                showCount: true,
            },
        },
        {
            attr: {
                label: '选择分类',
                name: 'categoryCode',
            },
            isShow:
                entryCodeInteger &&
                ![TYPE_ENUM.COURSE_APPLY, TYPE_ENUM.TRAIN].includes(Number(entryCodeInteger)),
            rules: [
                {
                    // 报名项目 为通用8 选择分类为非必填
                    required: entryCodeInteger
                        ? [TYPE_ENUM.COMMON, TYPE_ENUM.COURSE_APPLY].includes(
                              Number(entryCodeInteger),
                          )
                            ? false
                            : true
                        : false,
                    message: '请选择分类',
                },
            ],
            render: () => {
                let tempList = store.selectedCategoryList || []

                /** saas1.19版本 新建编辑都支持修改  但是编辑修改的前提是没有报名人数   业务线跳过来不能编辑 */
                const judgerIsEdit = () => {
                    if (store.lockMap?.categoryCode) {
                        return false
                    } else {
                        return !store.echoDetail?.appliedNum
                    }
                }

                return (
                    <>
                        {judgerIsEdit() ? (
                            <Button
                                className={tempList.length > 0 ? styles.add_cate_btn : ''}
                                onClick={() => {
                                    setSelectClassify(true)
                                    store.changeSelectClassify()
                                }}
                            >
                                选择分类
                            </Button>
                        ) : null}
                        {tempList.length > 0 ? (
                            <CategoryItem
                                list={tempList}
                                deleteHandler={judgerIsEdit() && store.deleteSelectedCategoryList}
                            />
                        ) : null}
                    </>
                )
            },
        },
        {
            attr: {
                label: '选择课程',
                name: 'courseCode',
            },
            isShow: entryCodeInteger === TYPE_ENUM.COURSE_APPLY,
            rules: [
                {
                    // 报名项目 为通用8 选择分类为非必填
                    required: true,
                    message: '请选择课程',
                },
            ],
            render: () => {
                return (
                    <MoreSelect
                        placeholder="请选择"
                        labelKey="name"
                        valueKey={'id'}
                        requestUrl={'/apply/front/list_course_type'}
                        requestParams={{ sid: getLocalStorage('SID') }}
                        requestMethod="post"
                        all={false}
                        labelInValue
                    />
                )
            },
        },
        // {
        //     attr: {
        //         label: ENROLL_START_TIME_MAP?.[entryCodeInteger],
        //         name: 'activityStart',
        //     },
        //     rules: [
        //         {
        //             required: true,
        //             message: '请选择开始时间',
        //         },
        //     ],
        //     itemType: ITEM_TYPE_ENUM.DATEPICKER,
        //     itemOptions: {
        //         showTime: { format: 'HH:mm' },
        //         format: 'YYYY-MM-DD HH:mm',
        //         placeholder: '请选择开始时间',
        //         disabledDate: true,
        //         disabledTime: true,
        //         style: { width: '100%' },
        //         disabled: isDisabled('activityStart'),
        //     },
        //     isShow: !!entryCodeInteger,
        // },
        // {
        //     attr: {
        //         label: ENROLL_END_TIME_MAP?.[entryCodeInteger],
        //         name: 'activityEnd',
        //     },
        //     rules: [
        //         {
        //             required: endTimeRequired,
        //             message: '请选择结束时间',
        //         },
        //     ],
        //     itemType: ITEM_TYPE_ENUM.DATEPICKER,
        //     itemOptions: {
        //         showTime: { format: 'HH:mm' },
        //         format: 'YYYY-MM-DD HH:mm',
        //         placeholder: '请选择结束时间',
        //         disabledDate: true,
        //         disabledTime: true,
        //         style: { width: '100%' },
        //     },
        //     isShow: !!entryCodeInteger,
        // },
        // {
        //     attr: {
        //         label: '地点',
        //         name: 'address',
        //     },

        //     itemType: ITEM_TYPE_ENUM.INPUT,
        //     itemOptions: {
        //         placeholder: '请输入地点',
        //         style: { width: '100%' },
        //         maxLength: 50,
        //         showCount: true,
        //     },
        //     isShow: true,
        // },
        // {
        //     attr: {
        //         label: '封面',
        //         name: 'cover',
        //     },
        //     isShow: true,
        //     render: () => (
        //         <ImageUpload
        //             type={11}
        //             listType="picture-card"
        //             otherProps={{
        //                 maxCount: 1,
        //                 size: 100,
        //                 accept: ['image/jpeg', 'image/png', 'image/jpg'],
        //             }}
        //             // @ts-ignore
        //             disabled={isDisabled('cover')}
        //         />
        //     ),
        //     extra: '请上传文件格式为png、jpg、jpeg的图片，建议图片比例为16：9',
        //     valuePropName: 'fileList',
        //     getValueFromEvent: (e: { fileList: any }) => {
        //         if (Array.isArray(e)) {
        //             return e
        //         }
        //         return e && e.fileList
        //     },
        // },
    ]
    /**
     * 获取表单的配置
     * 基本信息list
     */
    const getBasicInformation = () => {
        return (
            <>
                {basicInformationList.map(
                    ({
                        attr,
                        render,
                        rules,
                        extra,
                        valuePropName,
                        getValueFromEvent,
                        itemType,
                        itemOptions,
                        isShow,
                    }) => {
                        if (!isShow) return null
                        return (
                            <React.Fragment key={attr.name}>
                                <Form.Item
                                    {...attr}
                                    rules={rules}
                                    extra={extra}
                                    valuePropName={valuePropName}
                                    getValueFromEvent={getValueFromEvent}
                                >
                                    {render
                                        ? render()
                                        : getItemByType(itemType, {
                                              ...itemOptions,
                                              // @ts-ignore
                                              disabled: isDisabled(attr.name),
                                          })}
                                </Form.Item>
                            </React.Fragment>
                        )
                    },
                )}
            </>
        )
    }

    /**
     * 报名详情
     */
    const enrollDetailsList = [
        {
            attr: {
                label: '联系方式',
                name: 'contract',
            },
            rules: [
                {
                    validator: checkPhone,
                },
            ],
            extra: '填写联系方式，方便用户报名咨询',
            itemType: ITEM_TYPE_ENUM.INPUT,
            itemOptions: {
                placeholder: '请输入',
                maxLength: 50,
            },
        },
        {
            attr: {
                label: '活动简介',
                name: 'intro',
            },
            rules: [
                {
                    required: true,
                    message: '请输入活动简介',
                },
            ],
            itemType: ITEM_TYPE_ENUM.TEXTAREA,
            itemOptions: {
                placeholder: '请输入报名活动简介，填写内容将会在招生海报展示',
                maxLength: 200,
                autoSize: { minRows: 3, maxRows: 5 },
                showCount: true,
            },
        },
        {
            attr: {
                label: '活动详情',
                name: 'detail',
            },
            rules: [
                {
                    required: true,
                    message: '',
                },
                {
                    validator: checkContent,
                },
            ],

            itemType: ITEM_TYPE_ENUM.EDITOR,
            itemOptions: {
                setEditorText: store.setEditorText,
                editorText: store.editorText,
                autoFocus: false,
            },
        },
        {
            attr: {
                label: '附件材料',
                name: 'filesLists',
            },
            extra: '请上传附件，支持word、pdf、PPT、excel格式',
            valuePropName: 'fileList',
            getValueFromEvent: (e: { fileList: any }) => {
                if (Array.isArray(e)) {
                    return e
                }
                return e && e.fileList
            },
            render: () => {
                return (
                    <GlobalUpload
                        amount={5}
                        size={20}
                        accept={['excel', 'pdf', 'word', 'ppt']}
                        drag={false}
                        type={3}
                        onCustomRequestEnd={() => {
                            setDisBtn(false)
                        }}
                        onCustomRequestStart={() => {
                            setDisBtn(true)
                        }}
                        // @ts-ignore
                        disabled={isDisabled('attachmentJson')}
                    >
                        {/* @ts-ignore */}
                        <Button icon={<UploadOutlined />} disabled={isDisabled('attachmentJson')}>
                            上传附件
                        </Button>
                    </GlobalUpload>
                )
            },
        },
    ]

    /**
     * 获取表单的配置
     * 报名详情
     * @returns {*}
     */
    const getEnrollDetails = () => {
        return (
            <>
                {enrollDetailsList.map(({ attr, render, rules, extra, itemType, itemOptions }) => (
                    <Col key={attr.name}>
                        <Form.Item {...attr} rules={rules} extra={extra}>
                            {render
                                ? render()
                                : getItemByType(itemType, {
                                      ...itemOptions,
                                      // @ts-ignore
                                      disabled: isDisabled(attr.name),
                                  })}
                        </Form.Item>
                    </Col>
                ))}
            </>
        )
    }

    return {
        getFields,
        scrollToAnchor,
        getBasicInformation,
        getEnrollDetails,
        disBtn,
    }
}
