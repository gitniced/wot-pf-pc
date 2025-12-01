import React, { useEffect } from 'react'
import styles from './index.module.less'
import EnrollDetailsStore from './store'
import { inject, observer, useLocalObservable } from 'mobx-react'
import { useLocation, history } from 'umi'
import EnrollInfo from './EnrollInfo'
// import Icon from '../components/Icon'
import Footer from './Footer'
import { message, Tooltip } from 'antd'
import { DownloadOutlined, PaperClipOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import Clipboard from 'clipboard'
import { getSessionStorage } from '@/storage'
import type { UserStore } from '@/stores/userStore'
import type SiteStore from '@/stores/siteStore'
import Cover from '@/components/Cover'
import { imgList } from '@/components/Cover/const'
import { Empty } from '@wotu/wotu-components'

const EnrollDetails = ({ userStore }: { userStore: UserStore; siteStore: SiteStore }) => {
    // 从pathname中解析当前的机构code
    const { query = {} } = useLocation()
    /**
     * code {string} 活动code
     * applyChannel {ApplyChannelType} 报名渠道
     */
    const { code } = query as { code: string }
    const store = useLocalObservable(() => new EnrollDetailsStore())

    const platform = getSessionStorage('PLATFORM')

    /**是否开启报名须知 */
    const hasRule = Boolean(store.activityDetails?.openConfirm?.toString?.() === '1')
    /**报名须知内容 */
    const ruleContent = store.activityDetails?.notice || '<div></div>'

    const init = async () => {
        if (!code) {
            message.error({ content: 'code参数丢失' })
            return
        }
        await store.getActivityDetail(code)
        await store.getRecommendActivity(code)
        document.title = store.activityDetails.name!
    }

    useEffect(() => {
        init()
        document.title = '报名活动详情'
    }, [code])

    const frontVisible = () => {
        if (document.visibilityState === 'visible') {
            userStore?.getUserData?.()
            init()
        }
    }

    useEffect(() => {
        document.addEventListener('visibilitychange', frontVisible)
        return () => {
            document.removeEventListener('visibilitychange', frontVisible)
        }
    }, [])

    const renderAttachment = () => {
        let attachment = []
        try {
            attachment = JSON.parse(store.activityDetails.attachmentJson!)
        } catch (err) {
            console.log('err: ', err)
        }
        return attachment.map((item: { url: string; name: string }) => {
            return (
                <div key={item.url} className={styles.attachment_item}>
                    <div className={styles.attachment_item_text}>
                        <PaperClipOutlined className={styles.attachment_item_icon} />
                        <span className={styles.attachment_item_name}>{item.name}</span>
                    </div>

                    <a href={item.url} className={styles.attachment_item_upload}>
                        <DownloadOutlined className={styles.attachment_item_upload_icon} />
                        下载
                    </a>
                </div>
            )
        })
    }
    // 前往机构推荐的活动详情
    const goToRecommend = (RecommendCode: string) => {
        history.push(`/enroll-detail?code=${RecommendCode}`)
    }

    // 获取推荐位标题
    const getRecommendName = () => {
        switch (platform) {
            case 'workbench':
                return '机构推荐'
            case 'portal':
                return '推荐报名'
            default:
                return '推荐报名'
        }
    }

    /**
     *  复制机构电话
     */
    const copy = new Clipboard('.org_mobile')
    copy.on('success', function (e) {
        message.success('复制成功')
        e.clearSelection()
    })
    copy.on('error', function (e) {
        message.error('复制失败')
        console.error('Action:', e.action)
        console.error('Trigger:', e.trigger)
    })

    const { industryList, provinceName, cityName, areaName } = store.activityDetails || {}

    return (
        <div className={`${styles.enroll_detail_bg}`}>
            <div className={`${styles.enroll_detail} ${styles.enroll_wrapper}`}>
                <div className={styles.enroll_detail_header}>
                    <EnrollInfo store={store} />
                    <Footer enrollCode={code} store={store} />
                </div>

                <div className={styles.enroll_detail_main}>
                    <div className={styles.enroll_activity_left}>
                        <div className={styles.enroll_activity_introduce}>
                            {/* <div className={styles.enroll_activity_introduce_item}>
                                <div className={styles.enroll_activity_introduce_title}>
                                    活动简介
                                </div>
                                <div className={styles.enroll_activity_introduce_content}>
                                    {store.activityDetails.intro}
                                </div>
                            </div> */}
                            <div className={styles.enroll_activity_introduce_item}>
                                <div className={styles.enroll_activity_introduce_title}>
                                    活动详情
                                </div>
                                {store.activityDetails.detail &&
                                store.activityDetails.detail !== '<p><br></p>' ? (
                                    <div
                                        className={styles.enroll_activity_introduce_content}
                                        dangerouslySetInnerHTML={{
                                            __html: store.activityDetails.detail!,
                                        }}
                                    />
                                ) : (
                                    <Empty />
                                )}
                            </div>

                            {store.activityDetails.attachmentJson && (
                                <div className={styles.enroll_activity_introduce_item}>
                                    <div className={styles.enroll_activity_introduce_title}>
                                        附件
                                    </div>
                                    {renderAttachment()}
                                </div>
                            )}
                            {hasRule ? (
                                <div className={styles.enroll_activity_rule}>
                                    <div className={styles.enroll_activity_rule_title}>
                                        报名须知
                                    </div>
                                    <div
                                        className={styles.enroll_activity_rule_content}
                                        dangerouslySetInnerHTML={{ __html: ruleContent }}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className={styles.enroll_detail_right}>
                        <div className={styles.enroll_merchant_info}>
                            <div className={styles.enroll_merchant_info_title}>机构信息</div>
                            <div className={styles.org_info}>
                                <img
                                    src={
                                        store.activityDetails?.organizationLogo ||
                                        'https://static.zpimg.cn/public/fe_user_pc/images/default_org@2x.png'
                                    }
                                />
                                <div>{store.activityDetails.organizationName}</div>
                            </div>
                            <div className={styles.org_item}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#icon_hangye`} />
                                </svg>
                                {industryList?.map((item: any) => item.name)?.join(' / ') || '-'}
                            </div>
                            <div className={styles.org_item}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#jigou`} />
                                </svg>
                                {[provinceName, cityName, areaName].filter(i => i).join(` / `)}
                            </div>
                            {store.activityDetails.contract && (
                                <div className={styles.org_item}>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref={`#icon_phone`} />
                                    </svg>
                                    {store.activityDetails.contract}
                                </div>
                            )}
                            {/* <div className={styles.enroll_merchant_info_item}>
                                <Icon
                                    xlinkHref="jigou"
                                    classList={[styles.enroll_merchant_info_item_icon]}
                                />
                                <span className={styles.label}>
                                    {store.activityDetails.organizationName}
                                </span>
                            </div>
                            {store.activityDetails?.contract && (
                                <div className={styles.enroll_merchant_info_item}>
                                    <Icon xlinkHref="dianhua" classList={[]} />

                                    <Tooltip title={'复制'}>
                                        <span
                                            className={classNames(styles.label, 'org_mobile')}
                                            id="org_mobile"
                                            data-clipboard-text={store.activityDetails.contract}
                                        >
                                            {store.activityDetails.contract}
                                        </span>
                                    </Tooltip>
                                </div>
                            )} */}
                        </div>
                        <div
                            className={classNames(
                                styles.enroll_merchant_info,
                                styles.enroll_merchant_recommend,
                            )}
                        >
                            <div
                                className={styles.enroll_merchant_info_title}
                                style={{ marginBottom: 8 }}
                            >
                                {getRecommendName()}
                            </div>
                            <div className={styles.merchant_introduce_list}>
                                {store.recommendActivity?.length === 0 ? (
                                    <div className={styles.list_empty}>
                                        <img src="https://img-test.zpimg.cn/public_read/finance_evidence/17205401b86lwlxc.png" />
                                        <div>暂无内容</div>
                                    </div>
                                ) : (
                                    store.recommendActivity?.map((item: any) => {
                                        let {
                                            cover,
                                            name,
                                            code: RecommendCode,
                                            categoryName,
                                            entryName,
                                        } = item

                                        const selectCover = imgList.filter(
                                            i => i.value === cover,
                                        )?.[0]
                                        return (
                                            <div
                                                key={RecommendCode}
                                                className={styles.merchant_introduce_item}
                                                onClick={() => goToRecommend(RecommendCode)}
                                            >
                                                {/* <img
                                                    src={cover ? cover : defaultImage}
                                                    className={styles.cover}
                                                /> */}
                                                <Cover
                                                    width={100}
                                                    cover={cover}
                                                    text={selectCover?.color ? name : ''}
                                                    color={selectCover?.color}
                                                    fontStyles={{ fontSize: 10 }}
                                                />
                                                <div className={styles.entry}>{entryName}</div>
                                                <div
                                                    className={
                                                        styles.merchant_introduce_item_content
                                                    }
                                                >
                                                    <Tooltip title={name}>
                                                        <div className={styles.name}>{name}</div>
                                                    </Tooltip>

                                                    <div className={styles.category}>
                                                        {categoryName}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default inject('siteStore', 'userStore')(observer(EnrollDetails))
