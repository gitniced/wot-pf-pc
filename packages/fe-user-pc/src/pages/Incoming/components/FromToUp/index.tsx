/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { observer, inject, useLocalObservable } from 'mobx-react'
import { Steps, message, Alert, Button, Space, Form, Spin } from 'antd'
import { Empty } from '@wotu/wotu-components'
import { SyncOutlined } from '@ant-design/icons'
import GeneratorFrom from '../GeneratorFrom'
import SuccessView from './../SuccessView'
import { DatePicker } from '@/components/Global/Picker'
import Hooks, { bankUploadBeforeFile } from './mobxStore'
import style from './index.module.less'
import { transFromResponse } from './transFormUtil'
import { useGroupLoading } from './hooks'
import {
    globalRuls,
    globalRulsNotWhitespace,
    menberNo,
    getBemEmptyObj,
    getBemObjKeyToArr,
    getPreName,
} from './fromConfig'
import { moveZero } from './transFromToRequest'
import { classificationStatusText, MARGINTOP_KEY } from './const'
import { getBaseFromJson, getMidFromJson } from './fromJson'
import { history } from 'umi'
import _ from 'lodash'
import CustomTitle from '@/components/CustomTitle'
// import Subtitle from '../Subtitle';
// import FilletTitle from '../FilletTitle/';

import type SiteStore from '@/stores/siteStore'
import classNames from 'classnames'

const { RangePicker } = DatePicker
const { Step } = Steps

/**
 *
 *  根据name字段批量生成 表格
 * @param {string} name
 * @param {boolean} [rules=true]
 * @return {*}
 */
const getBlockJson = (name: string, rules: boolean = true) => {
    const jsonArr = [
        {
            key: 'nativeName',
            label: '姓名',
            type: 'input',
            props: {
                placeholder: '请输入',
                maxLength: 64,
            },
            rules: [...globalRuls],
        },
        {
            key: 'nativeIdentityType',
            label: '证件类型',
            type: 'select',
            valueEnum: [
                {
                    value: 1,
                    label: '身份证',
                },
                {
                    value: 2,
                    label: '军官证',
                },
                {
                    value: 3,
                    label: '护照',
                },
                {
                    value: 4,
                    label: '户口簿',
                },
                {
                    value: 5,
                    label: '士兵证',
                },
                {
                    value: 6,
                    label: '港澳来往内地通行证',
                },
                {
                    value: 7,
                    label: '台湾同胞来往内地通行证',
                },
                {
                    value: 8,
                    label: '临时身份证',
                },
                {
                    value: 9,
                    label: '外国人居留证',
                },
                {
                    value: 10,
                    label: '警官证',
                },
                {
                    value: 11,
                    label: '其他',
                },
            ],
            props: {
                placeholder: '请选择',
            },
            rules: [...globalRulsNotWhitespace],
        },
        {
            key: 'nativeIdentityNo',
            label: '证件号码',
            type: 'input',
            props: {
                placeholder: '请输入',
                maxLength: 64,
            },
            rules: [...globalRuls],
        },
        {
            key: 'nativeIdentityEffect',
            label: '证件有效期',
            rules: [...globalRulsNotWhitespace],
            formItemRender() {
                return <RangePicker />
            },
        },
    ]
    return jsonArr.map(i => ({ ...i, key: `${i.key}_${name}`, rules: rules ? i.rules : [] }))
}

function FromToUp(props: { siteStore: SiteStore }) {
    const { siteStore } = props
    const [loading, toLoadingPromise] = useGroupLoading()

    // 证件类型的form显示和隐藏
    const [identityType, setIdentityType] = useState<number>(-1)
    const [settlementCode, setSettlementCode] = useState<string>('')
    const [profitPeople, setProfitPeople] = useState<string>('')
    const [, setProfitPeopleIsValue] = useState<string>('')
    const [classification, setClassification] = useState(0)
    const [isProfitPeople, setIsProfitPeople] = useState('1')
    const [isLoad, setIsLoad] = useState(false)

    // 初始的内容
    const [initialValues] = useState({
        isProfitPeople: isProfitPeople,
        sameLegal_profitPeople: '1',
    })
    // 表单
    const [form] = Form.useForm()
    const hooks = useLocalObservable(() => new Hooks())

    /**
     * 断言受益人存在并且设置 视图的显示隐藏
     */
    const assertTypeAndSetType = (result: any) => {
        const item = result?.merchantNativeInfoList?.find(i => String(i.nativeType) === '4')
        const isShow = item?.sameLegal || item?.nativeAddress ? '1' : '0'
        setIsProfitPeople(isShow)
        return isShow
    }
    /**
     *
     * 获取初始化的数据
     */
    const initData = () => {
        return new Promise((resolve, reject) => {
            hooks.getOrgOrgCode().then(() => {
                const configs = _.get(siteStore, 'siteData.data.configList', [])
                const settlementCongig =
                    configs.find(config => config.key === 'settlement_object') || {}
                setSettlementCode(settlementCongig.value)
                // 有关联的结算主体就去调进件详情接口
                if (settlementCongig.value) {
                    hooks.getSouceData(settlementCongig.value).then((_res: any) => {
                        const res = transFromResponse(_res || {}) // 内容转换
                        // 删除 指定key 如果为0
                        moveZero(res, getBemObjKeyToArr('nativeIdentityType'))

                        res.identityType = res.identityType || null
                        unstable_batchedUpdates(() => {
                            setIdentityType(res.identityType) // 设置是否是三证合一的项目
                            setProfitPeople(res.sameLegal_profitPeople)
                            setClassification(res.bizType)
                            assertTypeAndSetType(res)
                            res.openingBankAddress?.length &&
                                hooks.getCityList(res.openingBankAddress) // 获取地址信息

                            console.log(res, 'response')

                            form.setFieldsValue({
                                ...initialValues,
                                ...res,
                                isProfitPeople: assertTypeAndSetType(res),
                            }) //form 表单设置值
                            resolve(res)
                        })
                    }, reject)
                }
            }, reject)
        }).finally(() => {
            setIsLoad(true)
        })
    }

    useEffect(() => {
        initData()
    }, [])
    /** @type {*} */
    const validator = {
        // isBeneficiaryIdentityL: () =>
        /** 判断站点是否关联了结算主体 */
        isRelateSettlement: () => !!settlementCode,
        /**
         *
         * @returns 是否到了第一步
         */
        isOnceStep: () => hooks.stepsCurrent === 0,
        /**
         *
         * @returns 是否到了第二步
         */
        isTwoStep: () => hooks.stepsCurrent === 1,
        /**
         *
         * @returns 是否生成表单
         */
        isShowForm: () => hooks.detail.status !== 2,
        /**
         *
         * @returns 是否是三证合一的机构
         */
        isShowOrgFrom: () => identityType === 1,
        /**
         *
         * @returns 是否展示法人的表单填写
         */
        // isShowNativeFrom: () => sameLegal === 0,
        /**
         *
         * @returns 受益人的表单显示和隐藏
         */
        isShowProfitPeopleFrom: () => profitPeople === '0',
        /**
         * 是否展示正在进行中的头部
         * @param _status
         * @returns
         */
        isShowStepHeader: (_status: number) => _status === -1,
        /**
         *
         * @param _status
         * @returns 是否展示成功的头部
         */
        isShowSuccessHeader: (_status: number) => _status === 2,
        /**
         *
         * @param _status
         * @returns 是否展示拒绝的头部
         */
        isShowRejectHeader: (_status: number) => _status === 3,

        /**
         *  是否展示受益人的填写信息
         * @returns
         */
        isProfitPeople: () => String(isProfitPeople) === '1',
    }

    // 获取证件类型的视图的form
    const getFormBlockData = () => {
        if (validator.isShowOrgFrom()) {
            return [
                {
                    key: 'orgCode',
                    label: '机构代码',
                    type: 'input',
                    props: {
                        placeholder: '请输入',
                        maxLength: 64,
                    },
                    rules: [...globalRuls],
                },
                {
                    key: 'orgCodeEffect',
                    label: '机构代码有效期',
                    rules: [...globalRulsNotWhitespace],
                    formItemRender() {
                        return <RangePicker />
                    },
                },
                {
                    key: 'taxCode',
                    label: '税务登记证号',
                    type: 'input',
                    props: {
                        placeholder: '请输入',
                        maxLength: 64,
                    },
                    rules: [...globalRuls],
                },
                {
                    key: 'taxCodeEffect',
                    label: ' 税务登记证有效期',
                    rules: [...globalRulsNotWhitespace],
                    formItemRender() {
                        return <RangePicker />
                    },
                },
            ]
        }
        return []
    }
    /**
     * 非同法人的受益人填写表单
     * @returns
     */
    const getProfitPeopleJson = () => {
        if (validator.isShowProfitPeopleFrom()) {
            return getBlockJson('profitPeople')
        }
        return []
    }
    /**
     *  受益人信息的表单
     * @returns
     */
    const isShowProfitPeopleJson = () => {
        if (validator.isProfitPeople()) {
            return [
                {
                    key: 'sameLegal_profitPeople',
                    label: '是否同法人',
                    type: 'radio',
                    valueEnum: [
                        {
                            value: '1',
                            label: '是',
                        },
                        {
                            value: '0',
                            label: '否',
                        },
                    ],
                    props: {
                        onChange({ target: { value } }) {
                            setProfitPeople(value)
                            setProfitPeopleIsValue(value)
                            if (value === '1') {
                                form.setFieldsValue(getBemEmptyObj('profitPeople', ['sameLegal']))
                            }
                        },
                    },
                    rules: [...globalRuls],
                },
                ...getProfitPeopleJson(),
                {
                    key: 'nativeAddress_profitPeople',
                    label: '地址',
                    type: 'input',
                    props: {
                        maxLength: 64,
                        placeholder: '请输入',
                        onChange({ target: { value } }) {
                            setProfitPeopleIsValue(value)
                        },
                    },
                    rules: [...globalRuls],
                },
            ]
        }
        return []
    }
    /** 附件展示受益人身份证 */
    const isBeneficiaryIdentityJson = () => {
        if (profitPeople === '0' && isProfitPeople === '1') {
            return [
                {
                    key: 'beneficiaryIdentity',
                    type: 'ImgUpload',
                    label: '受益人身份证',
                    props: {
                        // className: style.upload_piker,
                        placeholder: '上传人像面',
                        amount: 1,
                        mode: 'many',
                        manyCount: 2,
                        manyConfig: [
                            {
                                desc: '上传人像面',
                                key: '1',
                            },
                            {
                                desc: '上传国徽面',
                                key: '2',
                            },
                        ],
                        beforeFile: ({ file }: { file: Blob }) =>
                            bankUploadBeforeFile(file, settlementCode),
                    },
                    formItemProps: {
                        extra: '图片要求：文件大小≤10MB，文件格式JPG、PNG、JPEG',
                    },
                    rules: [...globalRulsNotWhitespace],
                },
            ]
        }
        return []
    }
    /**
     * 生成基础的from
     */
    const baseFromJson = getBaseFromJson({
        bizTypeOnChange(value) {
            setClassification(value)
        },
        identityTypeOnChange(value) {
            setIdentityType(value)
        },
    })
    /**
     * 生成中间的表单from
     */
    const midFromJson = getMidFromJson()

    /**
     * from 生成的json
     * @returns
     */
    const fromJson = () => [
        ...baseFromJson,
        ...getFormBlockData(),
        ...midFromJson,
        {
            type: 'miniTitle-4',
            label: '业务联系人',
            // key: 'miniTitle_vocational',
            key: MARGINTOP_KEY.MINITITLE_VOCATIONAL,
        },
        {
            key: 'nativePhone_vocational',
            label: '联系电话',
            type: 'input',
            props: {
                maxLength: 64,
                placeholder: '请输入',
            },
            rules: [...globalRuls, ...menberNo],
        },
        {
            type: 'miniTitle-4',
            label: '受益人',
            // key: 'miniTitle_profitPeople',
            key: MARGINTOP_KEY.MINITITLE_PROFITPEOPLE,
            desc: '他行进件（即结算账户非招行对公卡)，受益人信息必填，受益人指：直接或间接持股累计超过25%以上的自然人',
        },
        {
            key: 'isProfitPeople',
            label: '是否有受益人',
            type: 'radio',
            valueEnum: [
                {
                    value: '1',
                    label: '是',
                },
                {
                    value: '0',
                    label: '否',
                },
            ],
            props: {
                onChange({ target: { value } }: any) {
                    setIsProfitPeople(value)
                    if (String(value) === '0') {
                        form.resetFields(getPreName('profitPeople'))
                    }
                },
            },
            rules: [...globalRuls],
        },
        ...isShowProfitPeopleJson(),
        {
            type: 'miniTitle',
            label: '商户账户信息',
            key: 'miniTitle-4',
        },
        {
            key: 'account',
            label: '结算账号',
            type: 'input',
            props: {
                maxLength: 64,
                placeholder: '请输入',
            },
            rules: [...globalRuls],
        },
        {
            key: 'accountName',
            label: '结算账号户名',
            type: 'input',
            props: {
                maxLength: 32,
                placeholder: '请输入',
            },
            rules: [...globalRuls],
        },
        {
            key: 'accountType',
            label: '结算账号类型',
            type: 'select',
            valueEnum: [
                {
                    value: 1,
                    label: '个人结算账户',
                },
                {
                    value: 2,
                    label: '单位结算账户',
                },
            ],
            props: {
                placeholder: '请选择',
            },
            rules: [...globalRulsNotWhitespace],
        },
        {
            key: 'openingBankName',
            label: '结算账号开户行名称',
            type: 'input',
            props: {
                maxLength: 64,
                placeholder: '请输入',
            },
            rules: [...globalRuls],
        },
        {
            key: 'openingBankAddress',
            label: '结算账户开户行所在地',
            type: 'cascader',
            props: {
                type: 'city',
                placeholder: '请选择',
                onChange(value: string[]) {
                    hooks.getCityList(value)
                },
            },
            rules: [...globalRulsNotWhitespace],
        },
        {
            type: 'miniTitle',
            label: '附件上传',
            key: 'miniTitle-5',
        },
        {
            key: 'legalIdentity',
            type: 'ImgUpload',
            label: '法人代表身份证',
            props: {
                className: style.upload_piker,
                placeholder: '上传人像面',
                amount: 1,
                mode: 'many',
                manyCount: 2,
                manyConfig: [
                    {
                        desc: '上传人像面',
                        key: '1',
                    },
                    {
                        desc: '上传国徽面',
                        key: '2',
                    },
                ],
                beforeFile: ({ file }: { file: Blob }) =>
                    bankUploadBeforeFile(file, settlementCode),
            },
            formItemProps: {
                extra: '图片要求：文件大小≤10MB，文件格式JPG、PNG、JPEG',
            },
            rules: [...globalRulsNotWhitespace],
        },
        ...isBeneficiaryIdentityJson(),
        {
            key: 'bizLicensePic',
            type: 'ImgUpload',
            label: '营业执照',
            props: {
                className: style.upload_piker,
                amount: 1,
                cardStyles: 'card',
                beforeFile: ({ file }: { file: Blob }) =>
                    bankUploadBeforeFile(file, settlementCode),
            },
            formItemProps: {
                extra: '图片要求：文件大小≤10MB，文件格式JPG、PNG、JPEG',
            },
            rules: [...globalRulsNotWhitespace],
        },
        {
            key: 'bizPlacePic',
            type: 'ImgUpload',
            label: '经营场所影像',
            // extra: '图片要求：文件大小≤2MB，文件格式JPG、PNG、JPEG',
            props: {
                className: style.upload_piker,
                amount: 5,
                beforeFile: ({ file }: { file: Blob }) =>
                    bankUploadBeforeFile(file, settlementCode),
            },
            formItemProps: {
                extra: classificationStatusText[classification || 1],
            },
            rules: [
                { required: true, message: '这个是必填的' },
                {
                    validator(_: unknown, value: unknown[]) {
                        if (value?.length >= 3) {
                            return Promise.resolve()
                        } else {
                            return Promise.reject(new Error('至少需要上传三张'))
                        }
                    },
                },
                {
                    validator(_: unknown, value: unknown[]) {
                        // return Promise.reject("xxx")
                        if (!value?.length) {
                            return Promise.resolve()
                        }
                        if (value?.every(i => i.status === 'done')) {
                            return Promise.resolve()
                        } else {
                            return Promise.reject(new Error('请稍等 目前还有图片正在上传中'))
                        }
                    },
                },
            ],
        },
    ]

    // 第一步内容的显隐
    const stepsCurrentOne = (flag: boolean) => {
        let content: string | JSX.Element = ''
        if (!flag) return content
        if (!validator.isRelateSettlement()) return
        if (validator.isShowForm()) {
            // 如果状态不是成功（2），就展示form表单
            content = (
                <>
                    <GeneratorFrom
                        json={fromJson()}
                        form={form}
                        initialValues={initialValues}
                        formProps={{
                            labelCol: { span: 6 },
                        }}
                    />
                    <div className={style.bottom_line_option}>
                        <Space size={16}>
                            <Button
                                onClick={() => {
                                    history.goBack()
                                }}
                            >
                                取消
                            </Button>
                            <Button
                                loading={loading}
                                onClick={() => {
                                    // toLoadingPromise(() => {
                                    return hooks
                                        .saveDraft(form.getFieldsValue(true), settlementCode)
                                        .then(() => {
                                            message.success('草稿保存成功')
                                            initData()
                                            return form.setFields([
                                                {
                                                    name: 'name',
                                                    errors: undefined,
                                                },
                                            ])
                                        })
                                    // })
                                }}
                            >
                                保存草稿
                            </Button>
                            <Button
                                type="primary"
                                loading={loading}
                                onClick={() => {
                                    form.validateFields(undefined).then(() => {
                                        toLoadingPromise(() => {
                                            return hooks
                                                .savePublish(
                                                    form.getFieldsValue(true),
                                                    settlementCode,
                                                )
                                                .then(() => {
                                                    initData().then((_res: any) => {
                                                        if (Number(_res.status) !== 3) {
                                                            hooks.toNextStep()
                                                        }
                                                    })
                                                })
                                        })
                                    })
                                }}
                            >
                                下一步
                            </Button>
                        </Space>
                    </div>
                </>
            )
        } else {
            content = <SuccessView settlementCode={settlementCode} code={hooks.merchantOrgCode} />
        }
        return content
    }
    const CopyUrl = () => {
        const input = document.createElement('input')
        input.value = hooks.detail?.signUrl
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        message.success('复制成功')
    }
    const Copy = () => {
        if (!hooks.detail?.signUrl) return
        return (
            <>
                （
                <span className={style.copy} onClick={CopyUrl}>
                    复制签约链接
                </span>
                ）
            </>
        )
    }
    // 第二步内容的显隐
    const stepsCurrentTwo = (flag: boolean) => {
        if (flag) {
            return (
                <div className={style.return_content}>
                    <svg className={classNames('icons', style.icon)} aria-hidden="true">
                        <use xlinkHref={`#Check-Circle-Fill1`} />
                    </svg>
                    <div className={style.tips}>请在手机端完成签约</div>
                    <div className={style.text_box}>
                        签约链接已通过短信方式发送至法人手机号码{Copy()}，若链接失效可点击按钮
                        <Button
                            type="text"
                            onClick={() => {
                                hooks.resetContract().then(() => {
                                    message.success('签约短信正在重新发送，请注意查收')
                                })
                            }}
                        >
                            <SyncOutlined /> 重新获取
                        </Button>
                        <br />
                        手机端完成签约后，工作人员将在若干个工作日内完成审核，请耐心等待。
                    </div>
                </div>
            )
        }
    }

    /**
     *  获取步骤条
     * @param flag
     * @returns
     */
    const getStepHeader = (flag: boolean) => {
        if (flag) {
            return (
                <Steps current={hooks.stepsCurrent} className={style.steps_line}>
                    <Step title="填写信息" />
                    <Step title="线上签约" />
                </Steps>
            )
        }
    }
    /**
     * 获取成功状态的头部
     * @param flag
     * @returns
     */
    const getSuccessHeader = (flag: boolean) => {
        if (flag) {
            return <Alert message="签约成功" type="success" showIcon className={style.alter} />
        }
    }
    /**
     *  获取被拒绝状态的头部
     * @param flag
     * @returns
     */
    const getRejectHeader = (flag: boolean) => {
        if (flag) {
            return (
                <Alert
                    message={`审核失败：${hooks.detail.failReason}`}
                    type="error"
                    showIcon
                    className={style.alter}
                />
            )
        }
    }

    /**
     * 获取头部
     * @param _status
     * @returns
     */
    const getHeader = (_status: number) => {
        const status = Number(_status)
        if (!validator.isRelateSettlement()) {
            return (
                <>
                    <Empty text="暂未配置结算主体，请联系工作人员或客服反馈" />
                </>
            )
        } else if (validator.isShowStepHeader(status)) {
            return getStepHeader(true)
        } else if (validator.isShowSuccessHeader(status)) {
            return getSuccessHeader(true)
        } else if (validator.isShowRejectHeader(status) && validator.isOnceStep()) {
            return getRejectHeader(true)
        }
    }

    if (!isLoad)
        return (
            <div className={style.loading_page}>
                <Spin />
            </div>
        )

    return (
        <>
            <CustomTitle title="线上进件" />
            {getHeader(hooks.selfStatus)}
            {stepsCurrentOne(validator.isOnceStep())}
            {stepsCurrentTwo(validator.isTwoStep())}
        </>
    )
}

export default inject('userStore', 'siteStore')(observer(FromToUp))
