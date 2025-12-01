import styles from './index.module.less'
import { Form, Input, Modal, Radio, Switch } from 'antd'
import { DatePicker } from '@/components/Picker'
import { history } from 'umi'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { ACTIVITY_STEP_ENUM, ACTIVITY_TYPE_ENUM } from './const'
import TitleAdvance from '@/components/TitleAdvance'
import type ActivityCreateStore from './store'
import ImageUpload from '@/components/ImageUpload'
import SelectActivityAdress from '../components/SelectActivityAdress'
import MyEditorValueChange from '../components/MyEditorValueChange'
import { addFormParams, disabledTime } from './utils'
import CheckInTimeRange from '../components/CheckInTimeRange'
import CheckInRange from '../components/CheckInRange'
import MoreSelectUpdate from '@/components/MoreSelectUpdate'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { getCookie } from '@/storage'

export function hooks(
    currentStep: number,
    form: any,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    code: string,
    store: ActivityCreateStore,
    cannotEdit: boolean,
    setFormSid: React.Dispatch<React.SetStateAction<any>>,
    formSid: any,
    monFormat: number,
    relatedPositions: number,
    activityFormat: string,
    activityCheckIn: number,
    location: number,
) {
    const { createCode } = history.location.query as any

    /**  取消  上一步  */
    const handleCancel = () => {
        if (currentStep === ACTIVITY_STEP_ENUM.FIRST) {
            Modal.confirm({
                centered: true,
                title: '取消后无法找回本次已填写的内容， 是否确定取消？',
                onOk: () => {
                    form.resetFields()
                    history.push('/activity-management')
                },
            })
            return
        } else {
            setCurrentStep(currentStep - 1)
            // form.resetFields()
        }
    }

    /**  下一步  */
    const handleSaveAndNext = async () => {
        let data = await form.validateFields()
        let flag: any = null
        if (code) {
            await store.editActivity({ ...data, currentStep, checkFlag: 1, code })
        } else {
            flag = await store.saveActivity({
                ...data,
                currentStep,
                checkFlag: 1,
                code: createCode,
            })
        }

        /**  记录选择的活动形式到url上 sid */
        if (currentStep === ACTIVITY_STEP_ENUM.FIRST) {
            if (!createCode) {
                addFormParams('createCode', flag?.code)
            }

            addFormParams('activityFormat', data?.activityForm)
        }

        if (currentStep === ACTIVITY_STEP_ENUM.THIRD) {
            history.push('/activity-management')
        } else {
            setCurrentStep(currentStep + 1)
        }
    }

    /**  保存，暂不发布 点击后不校验必填项  */
    const handleSaveDraft = async () => {
        const draftData = form.getFieldsValue()
        await store.saveActivity({
            ...draftData,
            currentStep,
            checkFlag: 0,
            code: code || createCode || undefined,
        })
        history.push('/activity-management')
    }
    /**  限制修改字段  */
    const judgeEdit = (time: any) => {
        dayjs.extend(isSameOrBefore)

        let today = dayjs().startOf('day')
        let flag = dayjs(time).isSameOrBefore(today, 'day') || false
        if (cannotEdit && flag) {
            return true
        } else {
            return false
        }
    }
    /**  第一步 表单内容  */
    const firstStepContent = () => {
        const firstStepFormItems = [
            {
                attr: {
                    label: '站点',
                    name: 'sids',
                },
                isShow: true,
                hidden: true,
                render: () => <Input value={getCookie('SID')} />,
            },
            {
                attr: {
                    label: '活动名称',
                    name: 'activityName',
                },
                isShow: true,
                rules: [{ required: true, message: '请输入活动名称' }],
                render: () => <Input placeholder="请输入" maxLength={50} showCount />,
            },
            {
                attr: {
                    label: '封面',
                    name: 'coverUrl',
                },
                isShow: true,
                rules: [{ required: true, message: '请上传封面' }],
                render: () => (
                    <ImageUpload
                        listType="picture-card"
                        type={11}
                        otherProps={{
                            maxCount: 1,
                            size: 100,
                            accept: ['image/jpeg', 'image/png', 'image/jpg'],
                        }}
                    />
                ),
                extra: '请上传文件格式为png、jpg、jpeg的图片，建议图片比例为16：9',
                valuePropName: 'fileList',
                getValueFromEvent: (e: { fileList: any }) => {
                    if (Array.isArray(e)) {
                        return e
                    }
                    return e && e.fileList
                },
            },
            {
                attr: {
                    label: '分类',
                    name: 'activityCatalogCode',
                },
                isShow: true,
                rules: [
                    { required: true, message: '' },
                    {
                        validator(_: any, value: any) {
                            if (!value?.value) {
                                return Promise.reject(new Error('请选择分类'))
                            }

                            return Promise.resolve()
                        },
                    },
                ],
                render: () => (
                    <MoreSelectUpdate
                        all={false}
                        placeholder="请选择分类"
                        valueKey="code"
                        labelKey="catalogName"
                        requestUrl="/activity/front/activity/page_activity_catalog"
                        repeatFilter={false}
                        labelInValue
                        requestParams={{
                            sid: getCookie('SID'),
                            openStatus: 1,
                        }}
                        allowClear
                    />
                ),
            },
            {
                attr: {
                    label: '主办方',
                    name: 'sponsorName',
                },
                isShow: true,
                render: () => <Input placeholder="请输入" maxLength={50} showCount />,
            },
            {
                attr: {
                    label: '活动开始时间',
                    name: 'startTime',
                },
                isShow: true,
                rules: [
                    {
                        required: true,
                        message: '请选择开始时间',
                    },
                ],
                render: () => (
                    <DatePicker
                        getPopupContainer={target => target.parentNode as any}
                        showTime={{
                            format: 'HH:mm',
                        }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder="请选择时间"
                        style={{ width: '100%' }}
                        disabledTime={disabledTime as any}
                        disabledDate={(cur: Dayjs) => cur && cur < dayjs().startOf('day')}
                        disabled={judgeEdit(form.getFieldValue('startTime'))}
                    />
                ),
            },
            {
                attr: {
                    label: '活动结束时间',
                    name: 'endTime',
                },
                isShow: true,
                rules: [
                    {
                        required: true,
                        message: '请选择结束时间',
                    },
                    {
                        validator(_: any, value: string) {
                            let end = dayjs(value).valueOf()
                            let start = form.getFieldValue('startTime')
                            if (start) {
                                start = dayjs(start).valueOf()
                            }
                            if (start >= end) {
                                return Promise.reject(new Error('结束时间必须大于开始时间'))
                            }
                            return Promise.resolve()
                        },
                    },
                ],
                render: () => (
                    <DatePicker
                        getPopupContainer={target => target.parentNode as any}
                        showTime={{
                            format: 'HH:mm',
                        }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder="请选择时间"
                        style={{ width: '100%' }}
                        disabledTime={disabledTime as any}
                        disabledDate={(cur: Dayjs) => {
                            const { activityStart } = form.getFieldsValue()
                            // 如果没有设置开始时间，则可设置今天及以后的时间
                            if (!activityStart) {
                                // @ts-ignore
                                return cur < dayjs().startOf('day')
                            }
                            // 如果设置了开始时间，则可设置【开始时间】及以后的时间
                            // @ts-ignore
                            return cur < dayjs(activityStart).startOf('day')
                        }}
                        disabled={judgeEdit(form.getFieldValue('endTime'))}
                    />
                ),
            },
            {
                attr: {
                    label: '形式',
                    name: 'activityForm',
                },
                isShow: true,
                initialValue: ACTIVITY_TYPE_ENUM.ONLINE,
                rules: [{ required: true, message: '请选择形式' }],
                render: () => (
                    <Radio.Group
                        onChange={e => {
                            if (e.target.value === ACTIVITY_TYPE_ENUM.ONLINE) {
                                form.resetFields(['eventLocation'])
                            }
                        }}
                        disabled={cannotEdit}
                    >
                        <Radio value={ACTIVITY_TYPE_ENUM.ONLINE}>线上</Radio>
                        <Radio value={ACTIVITY_TYPE_ENUM.OFFLINE}>线下</Radio>
                        <Radio value={ACTIVITY_TYPE_ENUM.ONLINE_OFFLINE}>线上+线下</Radio>
                    </Radio.Group>
                ),
                className: styles.forms,
            },
            {
                attr: {
                    label: '活动地点',
                    name: 'address',
                },
                isShow: monFormat !== ACTIVITY_TYPE_ENUM.ONLINE,
                rules: [{ required: true, message: '请选择地点' }],
                render: () => <SelectActivityAdress />,
            },
        ]
        return (
            <div className={styles.first_content_wrapper}>
                <TitleAdvance title="基本信息">
                    {firstStepFormItems.map(i => {
                        if (!i.isShow) return null
                        return (
                            <>
                                <Form.Item
                                    label={i.attr.label}
                                    name={i.attr.name}
                                    {...i}
                                    className={i.className}
                                >
                                    {i.render()}
                                </Form.Item>
                            </>
                        )
                    })}
                </TitleAdvance>
            </div>
        )
    }
    /**  第2步 表单内容  */
    const secondStepContent = () => {
        const secondStepFormItems = [
            {
                attr: {
                    label: '活动简介',
                    name: 'activityIntroduce',
                },
                isShow: true,
                rules: [
                    {
                        required: true,
                    },
                    {
                        validator(_: any, value: string) {
                            if (value === '<p><br></p>') {
                                return Promise.reject(new Error('请输入活动简介'))
                            }
                            return Promise.resolve()
                        },
                    },
                ],
                render: () => <MyEditorValueChange />,
            },
        ]

        return (
            <div className={styles.second_content_wrapper}>
                <TitleAdvance title="活动介绍">
                    {secondStepFormItems.map(i => {
                        if (!i.isShow) return null
                        return (
                            <>
                                <Form.Item label={i.attr.label} name={i.attr.name} {...i}>
                                    {i.render()}
                                </Form.Item>
                            </>
                        )
                    })}
                </TitleAdvance>
            </div>
        )
    }
    /**  第3步 表单内容  */
    const fourthStepContent = () => {
        const checkInSettings = [
            {
                attr: {
                    label: '活动打卡',
                    name: 'relateSignStatus',
                },
                isShow: true,
                rules: [{ required: true, message: '请选择活动打卡' }],
                render: () => (
                    <Switch
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        disabled={Number(activityFormat) === ACTIVITY_TYPE_ENUM.ONLINE}
                        onChange={e => {
                            if (e === false) {
                                form.resetFields([
                                    'signMinute',
                                    'locationStatus',
                                    'signDistanceRange',
                                ])
                            }
                        }}
                    />
                ),
                initialValue: false,
                valuePropName: 'checked',
            },
            {
                attr: {
                    label: '签到时间范围',
                    name: 'signMinute',
                },
                isShow: activityCheckIn,
                rules: [{ required: true, message: '请选择签到时间范围' }],
                render: () => <CheckInTimeRange />,
                initialValue: [0, 0],
            },
            {
                attr: {
                    label: '定位',
                    name: 'locationStatus',
                },
                isShow: activityCheckIn,
                rules: [{ required: true, message: '请选择定位' }],
                render: () => (
                    <Switch
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        onChange={e => {
                            if (e === false) {
                                form.resetFields(['signDistanceRange'])
                            }
                        }}
                    />
                ),
                initialValue: false,
                valuePropName: 'checked',
            },
            {
                attr: {
                    label: '打卡范围',
                    name: 'signDistanceRange',
                },
                isShow: location,
                rules: [{ required: true, message: '请选择打卡范围' }],
                render: () => <CheckInRange />,
                initialValue: 1,
            },
        ]
        const registrationSettings = [
            {
                attr: {
                    label: '报名开始时间',
                    name: 'signStartTime',
                },
                isShow: true,
                rules: [
                    {
                        required: true,
                        message: '请选择报名开始时间',
                    },
                ],
                render: () => (
                    <DatePicker
                        getPopupContainer={target => target.parentNode as any}
                        showTime={{
                            format: 'HH:mm',
                        }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder="请选择时间"
                        style={{ width: '100%' }}
                        disabledTime={disabledTime as any}
                        disabledDate={(cur: Dayjs) => cur && cur < dayjs().startOf('day')}
                    />
                ),
            },
            {
                attr: {
                    label: '报名结束时间',
                    name: 'signEndTime',
                },
                isShow: true,
                rules: [
                    {
                        required: true,
                        message: '请选择报名结束时间',
                    },
                    {
                        validator(_: any, value: string) {
                            let end = dayjs(value).valueOf()
                            let start = form.getFieldValue('signStartTime')
                            if (start) {
                                start = dayjs(start).valueOf()
                            }
                            if (start >= end) {
                                return Promise.reject(new Error('结束时间必须大于开始时间'))
                            }
                            return Promise.resolve()
                        },
                    },
                ],
                render: () => (
                    <DatePicker
                        getPopupContainer={target => target.parentNode as any}
                        showTime={{
                            format: 'HH:mm',
                        }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder="请选择时间"
                        style={{ width: '100%' }}
                        disabledTime={disabledTime as any}
                        disabledDate={(cur: Dayjs) => {
                            const { activityStart } = form.getFieldsValue()
                            // 如果没有设置开始时间，则可设置今天及以后的时间
                            if (!activityStart) {
                                // @ts-ignore
                                return cur < dayjs().startOf('day')
                            }
                            // 如果设置了开始时间，则可设置【开始时间】及以后的时间
                            // @ts-ignore
                            return cur < dayjs(activityStart).startOf('day')
                        }}
                    />
                ),
            },
            {
                attr: {
                    label: '最大报名人数',
                    name: 'signMaxPeople',
                },
                rules: [
                    {
                        pattern: /^[1-9]\d*$/,
                        message: '请输入正整数',
                    },
                ],
                isShow: true,
                render: () => <Input placeholder="请输入" />,
            },
            {
                attr: {
                    label: '报名审核',
                    name: 'signAuditStatus',
                },
                isShow: true,
                rules: [{ required: true, message: '请选择报名审核' }],
                render: () => <Switch checkedChildren="开启" unCheckedChildren="关闭" />,
                initialValue: false,
                valuePropName: 'checked',
            },
        ]

        return (
            <div className={styles.four_content_wrapper}>
                <TitleAdvance title="打卡设置">
                    {checkInSettings.map(i => {
                        if (!i.isShow) return null
                        return (
                            <>
                                <Form.Item label={i.attr.label} name={i.attr.name} {...i}>
                                    {i.render()}
                                </Form.Item>
                            </>
                        )
                    })}
                </TitleAdvance>
                <TitleAdvance title="报名设置">
                    {/* <Alert
                message="更多报名设置，请创建完活动后进入【报名设置】操作!"
                type="info"
                showIcon
                style={{
                    width: '750px',
                    margin: '0 auto 24px',
                }}
            /> */}
                    {/* {cannotEdit ? (
                        <>请在列表点击【报名设置】进行操作</>
                    ) : ( */}
                    {registrationSettings.map(i => {
                        if (!i.isShow) return null
                        return (
                            <>
                                <Form.Item label={i.attr.label} name={i.attr.name} {...i}>
                                    {i.render()}
                                </Form.Item>
                            </>
                        )
                    })}
                    {/* )} */}
                </TitleAdvance>
            </div>
        )
    }

    const renderStep = (t: number) => {
        switch (t) {
            case ACTIVITY_STEP_ENUM.FIRST:
                return firstStepContent
            case ACTIVITY_STEP_ENUM.SECOND:
                return secondStepContent
            case ACTIVITY_STEP_ENUM.THIRD:
                return fourthStepContent
            default:
                return null
        }
    }
    return {
        renderStep,
        handleCancel,
        handleSaveDraft,
        handleSaveAndNext,
    }
}
