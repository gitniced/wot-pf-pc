import styles from './index.module.less'
import CustomTitle from '@/components/CustomTitle'
import { getSessionStorage } from '@/storage'
import type { StepProps } from 'antd'
import { Button, Col, Row, Space, Steps, Tooltip, message } from 'antd'
import { inject, observer, useLocalObservable } from 'mobx-react'
import GroupEnrollStore from './store'
import type { GroupEnrollQuery } from './interface'
// @ts-ignore
import { findSiteData, PTHistory } from '@wotu/wotu-components'
import { useEffect, useRef } from 'react'
// import dayjs from 'dayjs'
import { BASIC_STEP, CONFIRM_STEP, RULE_STEP } from './constants'
import { history } from 'umi'
import ImportStep from './components/ImportStep'
import FixStep from './components/FixStep'
import RuleStep from './components/RuleStep'
import type { UserStore } from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
import ChangeUserSwipe from './components/ChangeUserSwipe'
import type { FixFormRef } from './components/FixStep/interface'
import { EVENT_KIND, EVENT_KIND_VALUE } from '@/types'

/**
 * 批量报名
 * @query activityCode 活动code
 * @query record 批量报名记录record
 * @eg 批量报名url: /group-enroll?activityCode=xxxx&record=xxxx
 * @description 当record存在时 获取记录详情 并回填第一步数据
 * @return {*}
 */
const GroupEnroll = ({ userStore, siteStore }: { userStore: UserStore; siteStore: SiteStore }) => {
    const platform = getSessionStorage('PLATFORM')
    const store = useLocalObservable(() => new GroupEnrollStore())
    const { activityData, stepList, currentStep } = store
    const { activityCode, record } = (history.location.query as unknown as GroupEnrollQuery) ?? {}
    /**是否开启报名须知 */
    const hasRule = store.openNotice.toString() === '1'
    /**是否展示二维码 */
    const showQrCode = store.needFaceDetect.toString() === '1' || store.needSign.toString() === '1'
    /**站点别名 */
    const sidAlias = findSiteData(siteStore?.siteData, 'alias', { findKey: 'baseInfo' }) || ''
    const fixStepRef = useRef<FixFormRef>(null)

    const importStepRef = useRef<{
        handleStartImport: () => {}
        validate: () => Promise<void>
    }>()

    useEffect(() => {
        if (showQrCode) {
            store.getVerifyCode()
        }
    }, [showQrCode])

    /** 根据站点配置和表单设置中的电子照片项 更新步骤数据 */
    useEffect(() => {
        let finallyStep: StepProps[] = [
            { title: '批量导入报名信息', disabled: true },
            { title: '确认报名信息', disabled: true },
        ]

        if (hasRule) {
            finallyStep.push({
                title: RULE_STEP,
                disabled: true,
            })
        }
        store.updateStepList(finallyStep)
    }, [hasRule])

    /** 根据报名项目类型 获取页头标题 */
    const getTitleByType = () => {
        return activityData.name
    }

    /** 时间戳处理 */
    // const renderActivityTime = () => {
    //     if (activityData.activityEnd) {
    //         return `${dayjs(activityData.activityStart).format('YYYY-MM-DD HH:mm')} 至 ${dayjs(
    //             activityData.activityEnd,
    //         ).format('YYYY-MM-DD HH:mm')}`
    //     }

    //     return activityData.activityStart
    //         ? `${dayjs(activityData.activityStart).format('YYYY-MM-DD HH:mm')} 至 待定`
    //         : ''
    // }

    /** 不同类型的活动渲染不同的标题 */
    // const renderActivityLabel = () => {
    //     //@ts-ignore
    //     const { type = 0 } = activityData
    //     switch (Number(type)) {
    //         case EVENT_KIND_VALUE[EVENT_KIND.TRAINING_CLASS]:
    //         case EVENT_KIND_VALUE[EVENT_KIND.TRAINING_PLAN]:
    //             return '培训时间'
    //         case EVENT_KIND_VALUE[EVENT_KIND.REVIEWS_PLAN]:
    //             return '认定考试时间'
    //         case EVENT_KIND_VALUE[EVENT_KIND.COMPETITION]:
    //             return '技能竞赛时间'
    //         case EVENT_KIND_VALUE[EVENT_KIND.COMMON]:
    //             return '活动时间'
    //     }
    // }

    /** 根据报名类型 获取页头信息 */
    const getSummaryByType = () => {
        const { type = 0 } = activityData
        return [
            {
                label: '机构名称',
                value: (
                    <Tooltip title={activityData.organizationName} placement="topLeft">
                        {activityData.organizationName}
                    </Tooltip>
                ),
                className: 'organization_name',
                hidden:
                    type === EVENT_KIND_VALUE[EVENT_KIND.EVENTS] && !activityData.organizationName,
            },
            {
                label: '联系方式',
                value: activityData.contract,
                hidden: !activityData.contract,
            },
            // {
            //     label: renderActivityLabel(),
            //     value: renderActivityTime(),
            // },
            // {
            //     label: '报名开始时间',
            //     value: activityData.applyStartTime
            //         ? dayjs(activityData.applyStartTime).format('YYYY-MM-DD HH:mm')
            //         : '',
            // },
            // {
            //     label: '报名结束时间',
            //     value: activityData.applyEndTime
            //         ? dayjs(activityData.applyEndTime).format('YYYY-MM-DD HH:mm')
            //         : '待定',
            // },
            // {
            //     label: '报名人数',
            //     value: (
            //         <Space size={0}>
            //             <Typography.Link>{activityData.appliedNum}</Typography.Link>
            //             {activityData.quota && activityData.quota !== -1 && (
            //                 <Typography>/{activityData.quota}</Typography>
            //             )}
            //         </Space>
            //     ),
            // },
            // {
            //     label: '报名费用',
            //     value: <Typography.Link>{activityData.price ?? 0}元</Typography.Link>,
            //     hidden: !activityData.price,
            // },
            // {
            //     label: '缴费截止时间',
            //     value: dayjs(activityData.payEndTime).format('YYYY-MM-DD HH:mm'),
            //     hidden: Boolean(!activityData.payEndTime),
            // },
        ]
    }

    /** 获取页头信息 */
    const summaryList = getSummaryByType()

    const frontVisible = () => {
        if (document.visibilityState === 'visible') {
            store.getUserData()
        }
    }

    /** 页面初始化判断是否需要弹出上传证件照片的弹窗 */
    useEffect(() => {
        const getBindUrl = () => {
            switch (platform) {
                case 'portal':
                    PTHistory.push('location', '/user-center/bind/idcard')
                    break
                default:
                    PTHistory.push('location', '/bind/idcard', 'user-center')
            }
        }

        store
            .getInitPage(activityCode, record!)
            ?.then(() => {
                store.updateLoading(false)
                //@ts-ignore
                store.afterRequest(getBindUrl)
            })
            .catch(() => {
                store.updateLoading(false)
            })
        document.addEventListener('visibilitychange', frontVisible)
        return () => {
            document.removeEventListener('visibilitychange', frontVisible)
            store.auditModal ? store.auditModal?.destroy?.() : ''
            store.urgeAuditModal ? store.urgeAuditModal?.destroy?.() : ''
        }
    }, [])

    useEffect(() => {
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' })
        document.title = `${getTitleByType()}-${siteName}`
    }, [getTitleByType(), siteStore.siteData])

    // 导入并下一步
    const handleStartImport = () => {
        // 如果已经导入过了(importCode存在)，直接下一步，否则校验当前表单
        if (store.importCode) {
            return store.setCurrentStep(1)
        }
        importStepRef.current?.validate().then(() => {
            importStepRef.current?.handleStartImport()
        })
    }
    // 第二步上一步
    const fixStepPrev = async () => {
        const data = await fixStepRef.current?.getFieldsValue()
        store.updateUserInfo({ code: store.selectUserCode, ...data }).then(() => {
            store.setCurrentStep(0)
        })
    }

    // 第二步下一步
    const fixStepNext = async () => {
        const data = await fixStepRef.current?.validateFields()
        store.updateUserInfo({ code: store.selectUserCode, ...data }).then(() => {
            store.getUserList(store.importCode!).then(list => {
                const errList = list.filter((item: any) => item.isError)
                if (errList.length) {
                    message.error(
                        `${errList
                            .map((item: any) => item.name)
                            .join('、')}信息不完整，请完整填写后再继续`,
                    )
                } else if (hasRule) {
                    store.setCurrentStep(2)
                } else {
                    store.importSubmit()
                }
            })
        })
    }

    // 滚动到顶部
    useEffect(() => {
        if (document.getElementById('scroll_content')) {
            document.getElementById('scroll_content')!.scrollTop = 0
        }
    }, [store.currentStep])

    return (
        <div
            className={styles.page_enroll_information_bg}
            style={{
                paddingBottom: store.stepList[store.currentStep]?.title === CONFIRM_STEP ? 200 : 90,
            }}
        >
            <div className={styles.page_enroll_information} id="scroll_content">
                <div className={styles.page_enroll_information_wrapper}>
                    <div className={styles.enroll_information_header}>
                        <CustomTitle title={getTitleByType()!} />
                        {/* 报名活动公共信息 */}
                        <div className={styles.information_summary}>
                            <Row gutter={[32, 16]}>
                                {summaryList
                                    .filter(item => !item.hidden)
                                    .map((item, index) => (
                                        <Col key={`col_${index + 1}`} span={8}>
                                            <Space align={'baseline'}>
                                                <span className={styles.label}>{item.label}：</span>
                                                <span
                                                    className={`${styles.value} ${
                                                        styles[item.className!]
                                                    }`}
                                                >
                                                    {item.value}
                                                </span>
                                            </Space>
                                        </Col>
                                    ))}
                            </Row>
                        </div>
                    </div>

                    {store.stepList.length > 1 && (
                        <div className={styles[`enroll_information_step_${store.stepList.length}`]}>
                            <Steps
                                current={currentStep}
                                items={stepList}
                                onChange={store.setCurrentStep}
                            />
                        </div>
                    )}
                    <div className={styles.enroll_information_step_content}>
                        {/* 第一步-导入 */}
                        {store.stepList[store.currentStep]?.title === BASIC_STEP ? (
                            <ImportStep store={store} userStore={userStore} ref={importStepRef} />
                        ) : null}
                        {/* 第二步-更正报名信息 */}
                        {store.stepList[store.currentStep]?.title === CONFIRM_STEP ? (
                            <FixStep
                                ref={fixStepRef}
                                store={store}
                                sidAlias={sidAlias}
                                siteStore={siteStore}
                            />
                        ) : null}
                        {/* 第三步-报名须知确认 */}
                        {store.stepList[store.currentStep]?.title === RULE_STEP ? (
                            <RuleStep siteStore={siteStore} store={store} />
                        ) : null}
                    </div>
                </div>
            </div>

            <div className={styles.page_enroll_footer_wrapper}>
                <div className={styles.footer_inner}>
                    {store.stepList[store.currentStep]?.title === CONFIRM_STEP ? (
                        <div className={styles.fix_step_wrapper}>
                            <ChangeUserSwipe
                                store={store}
                                onClick={async (item: any) => {
                                    const data = await fixStepRef.current?.getFieldsValue()
                                    console.log(item, data)
                                    store
                                        .updateUserInfo({ code: store.selectUserCode, ...data })
                                        .then(() => {
                                            store.getUserList(store.importCode!)
                                            store.getUserInfo(item.code)
                                            store.selectUser(item.code)
                                        })
                                }}
                            />
                            <Space
                                className={styles.footer_inner}
                                style={{ marginTop: 12 }}
                                size={16}
                            >
                                <Button type="ghost" onClick={fixStepPrev}>
                                    上一步
                                </Button>
                                <Button
                                    type="primary"
                                    disabled={store.isPending}
                                    onClick={fixStepNext}
                                >
                                    {hasRule ? '下一步' : '提交'}
                                </Button>
                            </Space>
                        </div>
                    ) : null}
                    {store.stepList[store.currentStep]?.title === BASIC_STEP ? (
                        <Button type="primary" onClick={handleStartImport}>
                            导入并下一步
                        </Button>
                    ) : null}
                    {store.stepList[store.currentStep]?.title === RULE_STEP ? (
                        <div className={styles.fix_step_wrapper}>
                            <Space
                                className={styles.footer_inner}
                                style={{ marginTop: 12 }}
                                size={16}
                            >
                                <Button type="ghost" onClick={() => store.setCurrentStep(0)}>
                                    上一步
                                </Button>
                                <Button
                                    type="primary"
                                    disabled={store.isPending}
                                    onClick={() => store.importSubmit()}
                                >
                                    提交
                                </Button>
                            </Space>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(GroupEnroll))
