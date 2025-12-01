import styles from './index.module.less'

import CustomTitle from '@/components/CustomTitle'
import { Col, Row, Space, Steps, Tooltip } from 'antd'
import { useEffect } from 'react'
import { BASIC_DESC, DIGITAL_PHOTO_DESC, RULE_DESC } from './constants'
import EnrollForm from './components/EnrollForm'
import UploadDigitalPhoto from './components/UploadDigitalPhoto'
import { history } from 'umi'
import { inject, observer, useLocalObservable } from 'mobx-react'
import EnrollInformationStore from './store'
import type { IRouteQuery } from './interface'
// import dayjs from 'dayjs'
import { getPortalCodeFromUrl } from '@/utils/getPortalCodeFromUrl'
import type { UserStore } from '@/stores/userStore'
import { getSessionStorage } from '@/storage'
import { ENROLL_TYPE, EVENT_KIND, EVENT_KIND_VALUE } from '@/types'
import { ENROLL_CHANNEL, ENROLL_CHANNEL_ENUM } from '@/types/enroll-const'
import { findSiteData } from '@wotu/wotu-components'
import type SiteStore from '@/stores/siteStore'
import EnrollRule from './components/EnrollRule'

/**
 * @query applyChannel 指定报名的渠道
 *          applyChannel有值时 使用指定的值
 *          applyChannel无值时 根据主应用表示（platform）判断值
 * @query careerCode 职业报名的职业id
 * @query organizationCode 机构报名的机构id
 * @query activityCode 活动报名的活动id
 * @query record 报名记录的id
 * @eg 机构报名url: /enroll-information?organizationCode=xxxx
 * @eg 活动报名url: /enroll-information?activityCode=xxxx
 * @eg 职业报名url: /enroll-information?careerCode=xxxx&organizationCode=xxxx
 * @return {*}
 */
const EnrollInformation = ({
    // userStore,
    siteStore,
}: {
    userStore: UserStore
    siteStore: SiteStore
}) => {
    const platform = getSessionStorage('PLATFORM')
    const store = useLocalObservable(() => new EnrollInformationStore())
    const { activityData, enrollFormMap } = store
    const { applyChannel, careerCode, organizationCode, activityCode, record } =
        (history.location.query as unknown as IRouteQuery) ?? {}
    /**是否开启报名须知 */
    const hasRule = store.openNotice.toString() === '1'
    /**是否展示二维码 */
    const showQrCode = store.needFaceDetect.toString() === '1' || store.needSign.toString() === '1'

    const sidAlias = findSiteData(siteStore?.siteData, 'alias', { findKey: 'baseInfo' }) || ''

    useEffect(() => {
        if (showQrCode) {
            store.getVerifyCode()
        }
    }, [showQrCode])

    /** 获取最终的报名渠道
     *  推广链接中会携带applyChannel字段
     *  非推广链接的话 根据当前为机构门户还是站点门户来获取applyChannel
     */
    const getFinallyApplyChannel = () => {
        if (applyChannel) {
            return applyChannel
        } else {
            switch (platform) {
                case 'portal':
                    return ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.ORGANIZATION]
                default:
                    return ENROLL_CHANNEL_ENUM[ENROLL_CHANNEL.SITE]
            }
        }
    }

    /** 获取报名类型
     * @约定
     * 1机构 2评价计划 3班级报名 4培训班级 5职业
     */
    const getEnrollType = () => {
        if (activityCode) return ENROLL_TYPE.ACTIVITY
        if (organizationCode && !careerCode) {
            store.updateProjectType(1)
            return ENROLL_TYPE.ORGANIZATION
        }
        if (careerCode) {
            store.updateProjectType(5)
            return ENROLL_TYPE.CAREER
        }
    }

    /** 报名类型 */
    const enrollType = getEnrollType() || 0

    /** 获取报名需要的Code */
    const getEnrollCode = () => {
        switch (enrollType) {
            case ENROLL_TYPE.ORGANIZATION:
                return organizationCode
            case ENROLL_TYPE.CAREER:
                return organizationCode
            default:
                return activityCode
        }
    }

    /** 根据报名项目类型 获取页头标题 */
    const getTitleByType = () => {
        return activityData.name
    }

    /** 主Code */
    const code = getEnrollCode()

    /** 报名渠道 */
    const finallyApplyChannel = getFinallyApplyChannel()

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
    //         case EVENT_KIND_VALUE[EVENT_KIND.EVENTS]:
    //         case EVENT_KIND_VALUE[EVENT_KIND.COMMON]:
    //             return '活动时间'
    //     }
    // }

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

    /** 根据报名类型 获取页头信息 */
    const getSummaryByType = () => {
        const { type = 0 } = activityData
        switch (enrollType) {
            case ENROLL_TYPE.ACTIVITY:
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
                            type === EVENT_KIND_VALUE[EVENT_KIND.EVENTS] &&
                            !activityData.organizationName,
                    },
                    {
                        label: '联系方式',
                        value: activityData?.contract,
                        hidden: !activityData?.contract,
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
            case ENROLL_TYPE.ORGANIZATION:
                return [
                    {
                        label: '地址',
                        value: activityData?.address || '待定',
                    },
                ]
            case ENROLL_TYPE.CAREER:
                return [
                    {
                        label: '机构名称',
                        value: (
                            <Tooltip title={activityData.organizationName} placement="topLeft">
                                {activityData.organizationName}
                            </Tooltip>
                        ),
                        className: 'organization_name',
                    },
                    {
                        label: '地址',
                        value: activityData?.address || '待定',
                    },
                ]
            default:
                return []
        }
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
            const alias = getPortalCodeFromUrl({ isGetDomain: true })
            const loginUrl = findSiteData(siteStore?.siteData || {}, 'pcDomain', {
                findKey: 'baseInfo',
            })

            switch (platform) {
                case 'portal':
                    return `${window.location.origin}/${alias}/user-center/bind/idcard`
                default:
                    return `${loginUrl}/account/bind/idcard`
            }
        }

        store
            .getInitPage(code!, enrollType, careerCode, record)
            ?.then(() => {
                store.updateLoading(false)
                //@ts-ignore
                store.afterRequest(getBindUrl())
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

    /** 根据站点配置和表单设置中的电子照片项 更新步骤数据 */
    useEffect(() => {
        let finallyStep = [
            {
                title: BASIC_DESC,
                disabled: true,
            },
        ]

        if (store.dp) {
            finallyStep.push({
                title: DIGITAL_PHOTO_DESC,
                disabled: true,
            })
        }

        if (hasRule) {
            finallyStep.push({
                title: RULE_DESC,
                disabled: true,
            })
        }
        store.updateStepList(finallyStep)
    }, [hasRule, store.dp])

    useEffect(() => {
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' })
        document.title = `${getTitleByType()}-${siteName}`
    }, [getTitleByType(), siteStore.siteData])

    return (
        <div className={styles.page_enroll_information_bg}>
            <div className={styles.page_enroll_information}>
                <div className={styles.enroll_information_header}>
                    <CustomTitle title={getTitleByType()!} />
                    <div className={styles.information_summary}>
                        <Row gutter={[32, 16]}>
                            {summaryList
                                // @ts-ignore
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
                            current={store.currentStep}
                            items={store.stepList}
                            onChange={store.setCurrentStep}
                        />
                    </div>
                )}
                <div className={styles.enroll_information_step_content}>
                    {store.stepList[store.currentStep]?.title === BASIC_DESC ? (
                        <div className={styles.first_step_content}>
                            <EnrollForm
                                store={store}
                                enrollType={enrollType}
                                activityData={activityData}
                                applyChannel={finallyApplyChannel}
                                enrollFormMap={enrollFormMap}
                                onNext={store.setCurrentStep}
                                siteStore={siteStore}
                            />
                        </div>
                    ) : null}

                    {store.stepList[store.currentStep]?.title === DIGITAL_PHOTO_DESC ? (
                        <div className={styles.second_step_content}>
                            <UploadDigitalPhoto
                                store={store}
                                enrollType={enrollType}
                                activityData={activityData}
                                applyChannel={finallyApplyChannel}
                                onPrev={store.setCurrentStep}
                                sidAlias={sidAlias}
                            />
                        </div>
                    ) : null}

                    {store.stepList[store.currentStep]?.title === RULE_DESC ? (
                        <div className={styles.second_step_content}>
                            <EnrollRule
                                store={store}
                                enrollType={enrollType}
                                activityData={activityData}
                                applyChannel={finallyApplyChannel}
                                onPrev={store.setCurrentStep}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(EnrollInformation))
