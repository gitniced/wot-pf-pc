import { inject, observer } from 'mobx-react'
import styles from './index.module.less'
import type { EnrollRuleProps } from './interface'
import { findSiteData } from '@wotu/wotu-components'
import { Button, Checkbox, Space, message } from 'antd'
import { history } from 'umi'
import { ENROLL_TYPE, EVENT_KIND, EVENT_KIND_VALUE } from '@/types'
import { ENROLL_CHANNEL_NUM } from '@/types/enroll-const'
import type { IRouteQuery } from '../interface'
import type { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { useEffect } from 'react'
import QRCode from 'qrcode.react'
import { getCookie } from '@/storage'

const EnrollRule = ({
    store,
    onPrev,
    enrollType,
    applyChannel,
    activityData,
    siteStore,
}: EnrollRuleProps) => {
    const { activityCode, organizationCode, careerCode } =
        (history.location.query as unknown as IRouteQuery) ?? {}

    /**报名须知内容 */
    const ruleContent = store.activityData.notice || '<div></div>'
    /**h5链接地址 */
    const h5BaseUrl =
        findSiteData(siteStore?.siteData || {}, 'wapLoginUrl', {
            findKey: 'baseInfo',
        }) || ''

    /**勾选已阅 */
    const needRead = store.needRead.toString() === '1'
    /**人脸识别 */
    const needFace = store.needFaceDetect.toString() === '1'
    /**电子签名 */
    const needSign = store.needSign.toString() === '1'

    /**是否展示二维码 */
    const showQrCode = needFace || needSign

    useEffect(() => {
        if (store.verifyCode) {
            const randomCode = getCookie('RANDOM_CODE')
            /**最终用来生成二维码的url */
            let finallyUrl = ''
            /**人脸识别地址 */
            let faceUrl = `${h5BaseUrl}/face/verify?recordAuthCode=${store.verifyCode}`
            /**电子签名地址 */
            let signUrl = `${h5BaseUrl}/autograph?recordAuthCode=${store.verifyCode}`
            if (needFace) {
                if (needSign) {
                    finallyUrl = `${faceUrl}&successUrl=${encodeURIComponent(
                        signUrl,
                    )}&randomCode=${randomCode}`
                } else {
                    finallyUrl = `${faceUrl}&randomCode=${randomCode}`
                }
            } else {
                finallyUrl = `${signUrl}&randomCode=${randomCode}`
            }

            console.log(finallyUrl)
            store.updateFinallyUrl(finallyUrl)
        }
    }, [store.verifyCode, needFace, needSign])

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
                    type: EVENT_KIND_VALUE[EVENT_KIND[activityData.entryCode]],
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

    const onChange = (e: CheckboxChangeEvent) => {
        const {
            target: { checked },
        } = e
        store.updateEnrollRule(checked)
    }

    /** 提交报名 */
    const handleSubmit = () => {
        const authInfo: any = {}

        if (needRead) {
            if (!store.enrollRuleConfirm) {
                return message.error('请先确认报名须知')
            }
            authInfo.confirmed = store.enrollRuleConfirm
        }

        if (showQrCode) {
            authInfo.code = store.verifyCode
        }

        let finallyParams = getFinallyParams()

        //@ts-ignore
        finallyParams = { ...finallyParams, authInfo }

        if (
            !finallyParams.organizationCode &&
            store.projectType.toString() !== EVENT_KIND_VALUE[EVENT_KIND.EVENTS].toString()
        ) {
            message.error('未获取到机构信息')
            return
        }

        //@ts-ignore
        store.submitForm(finallyParams).then(() => {
            history.push(
                `/enroll-succeeded?openAudit=${store.openAudit}&openPay=${store.openPay}&status=${store.status}&activityCode=${finallyParams.activityCode}`,
            )
        })
    }

    const getBtnDisabled = () => {
        if (needRead) {
            if (store.enrollRuleConfirm) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }

    const getStrByConfig = () => {
        if (needSign && needFace) return '完成人脸识别校验和在线签名'
        if (needFace) return '完成人脸识别校验'
        if (needSign) return '完成在线签名'
    }

    return (
        <div className={styles.component_enroll_rule}>
            <div className={styles.component_enroll_rule_content}>
                <div className={styles.component_enroll_rule_left}>
                    <div className={styles.component_enroll_rule_left_title}>报名须知</div>

                    <div
                        className={styles.component_enroll_rule_left_content}
                        dangerouslySetInnerHTML={{ __html: ruleContent }}
                    />

                    {needRead ? (
                        <div className={styles.component_enroll_rule_left_check_content}>
                            <Checkbox onChange={onChange}>我已完整阅读以上报名须知内容</Checkbox>
                        </div>
                    ) : null}
                </div>
                {showQrCode ? (
                    <div className={styles.component_enroll_rule_right}>
                        <QRCode
                            value={store.finallyUrl}
                            renderAs="svg"
                            className={styles.component_enroll_rule_right_qrcode}
                        />
                        <div className={styles.component_enroll_rule_right_text}>
                            请使用手机扫码
                            <br />
                            {getStrByConfig()}
                        </div>
                    </div>
                ) : null}
            </div>
            <div className={styles.component_enroll_rule_btn}>
                <Space size={16}>
                    <Button
                        onClick={() => {
                            onPrev(store.currentStep - 1)
                        }}
                    >
                        上一步
                    </Button>
                    <Button onClick={handleSubmit} type="primary" disabled={getBtnDisabled()}>
                        提交
                    </Button>
                </Space>
            </div>
        </div>
    )
}

export default inject('userStore', 'siteStore')(observer(EnrollRule))
