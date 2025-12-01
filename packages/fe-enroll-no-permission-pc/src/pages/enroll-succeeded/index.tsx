/* eslint-disable no-case-declarations */
import { inject, observer } from 'mobx-react'
import styles from './index.modules.less'
import { Button, Result } from 'antd'
import type { IRoute } from 'umi'
import { useEffect, useState } from 'react'
import { history } from 'umi'
import { ACTIVITY_STATUS } from './const'
import { getLocalStorage, getSessionStorage } from '@/storage'
// @ts-ignore
import { findSiteData, PTHistory } from '@wotu/wotu-components'

const EnrollSucceeded: React.FC = () => {
    const { query = {} } = history.location || {}
    const platform = getSessionStorage('PLATFORM')
    useEffect(() => {
        document.title = '报名中心'
    }, [])
    /**
     * 是否开启审核：0否，1是
     * 是否开启缴费：0否，1是
     * 活动状态，1未开始、2报名中、3已结束
     * 来源  group 批量报名
     */
    const { openAudit, openPay, status, from } = query || {}

    const isFromGroup = from === 'group'

    /**  报名title  */
    const [title, setTitle] = useState<string>('')
    /**  报名info  */
    const [info, setInfo] = useState<string>('')

    const backHandler = () => {
        switch (platform) {
            // 职培
            case 'train':
                PTHistory.push('history', `/enroll-list`)
                break
            // 工作台
            case 'workbench':
                PTHistory.pushState(query, 'my-enrollment', '/enroll-center/my-enrollment')
                break
            // 门户
            case 'portal':
                PTHistory.pushState(
                    query,
                    'my-enrollment',
                    `/mine/enroll-center/my-enrollment`,
                    platform,
                )
                break
            // 中台
            // case 'middle':
            //     const eventCode = getSessionStorage('EVENT_CODE')
            //     delSessionStorage('EVENT_CODE')
            //     PTHistory.replace('history', `/event-detail?code=${eventCode}`)
            //     break
            default:
                PTHistory.go(-2)
        }
    }

    /**
     * 不同状态渲染不同文案
     */
    const handleEnrollStatus = () => {
        //审核关闭&在线缴费关闭
        if (!Number(openAudit) && !Number(openPay)) {
            setTitle('报名成功')
            setInfo('恭喜您报名成功')
        }
        //审核开启&在线缴费关闭
        if (Number(openAudit) && !Number(openPay)) {
            setTitle('报名已提交')
            setInfo('您的报名已提交，待机构审核，可在“我的报名”中查看审核结果')
        }
        //审核开启&在线缴费开启
        if (Number(openAudit) && Number(openPay)) {
            setTitle('报名已提交')
            setInfo('您的报名已提交，待机构审核请在“我的报名”中关注审核进度，完成报名缴费')
        }

        //审核关闭&在线缴费开启
        if (!Number(openAudit) && Number(openPay)) {
            setTitle('报名已提交')
            setInfo('您的报名已提交，请在“我的报名”中完成报名缴费')
        }

        //报名结束
        if (Number(status) === ACTIVITY_STATUS.END) {
            setTitle('报名已结束')
            setInfo('')
        }
    }

    useEffect(() => {
        handleEnrollStatus()
    }, [])

    const goToAgain = () => {
        switch (platform) {
            // case 'train':
            //     PTHistory.push('history', '/my-enrollment')
            //     break
            case 'portal':
                PTHistory.pushState(query, 'my-enrollment', '/mine/enroll-center/my-enrollment')
                break
            default:
                // PTHistory.pushState(query, 'my-enrollment', '/enroll-center/my-enrollment')
                const siteStore = getLocalStorage('SITE_STORE') || {}
                const { siteData } = siteStore || {}
                const orgDomain = findSiteData(siteData, 'orgDomain', { findKey: 'baseInfo' })
                window.location.href = `${orgDomain}/enroll-center/my-enrollment`
        }
    }

    return (
        <div className={styles.enroll_succeeded}>
            <div className={styles.main}>
                <Result
                    status={Number(status) === ACTIVITY_STATUS.END ? 'info' : 'success'}
                    title={title}
                    subTitle={isFromGroup ? undefined : info}
                    extra={[
                        isFromGroup ? null : (
                            <Button
                                type="primary"
                                key="console"
                                className={styles.look_self}
                                onClick={goToAgain}
                            >
                                查看我的报名
                            </Button>
                        ),
                        <Button
                            key="buy"
                            onClick={() => {
                                backHandler()
                            }}
                            className={styles.back}
                        >
                            返回
                        </Button>,
                    ]}
                />
            </div>
        </div>
    )
}

const ObserverPassword: IRoute = inject('siteStore')(observer(EnrollSucceeded))

ObserverPassword.title = '报名中心'

export default ObserverPassword
