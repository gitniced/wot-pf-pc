import React, { useEffect, useMemo } from 'react'
import styles from './index.module.less'
import { Col, message, Row, Tabs, Tooltip } from 'antd'
import EnrollTab from './components/EnrollTab'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from './store'
import ImageTab from './components/ImageTab'
import { setPageTitle } from '@/utils/setDocTitle'

function Admissions(props: any) {
    const { siteStore } = props
    const store = useLocalObservable(() => new Store())
    const {
        name,
        scale,
        provinceName,
        cityName,
        areaName,
        logo,
        industryList,
        certifyStatus,
        contactMobile,
        contactEmail,
        videoUrl,
        introduction,
    } = store.orgInfo

    store.setSiteData(siteStore?.siteData?.data)
    console.log(store.totalCount)

    const items = useMemo(
        () => [
            {
                label: `在线报名（${store.totalCount}）`,
                key: 'item-1',
                children: <EnrollTab store={store} />,
            }, // 务必填写 key
            {
                label: `机构风采（${store?.orgInfo?.imageUrlList?.length || 0}）`,
                key: 'item-2',
                children: <ImageTab store={store} />,
            },
        ],
        [store.orgInfo, store.totalCount],
    )

    const handleCopy = () => {
        // 复制当前页面地址到剪贴板
        const url = window.location.href
        if (navigator && navigator.clipboard) {
            navigator.clipboard
                .writeText(url)
                .then(() => {
                    message.success('链接已复制')
                })
                .catch(() => {
                    message.error('复制失败，请手动复制')
                })
        } else {
            // 兼容不支持 clipboard API 的浏览器
            const input = document.createElement('input')
            input.value = url
            document.body.appendChild(input)
            input.select()
            try {
                document.execCommand('copy')
                message.success('链接已复制')
            } catch (e) {
                message.error('复制失败，请手动复制')
            }
            document.body.removeChild(input)
        }
    }

    useEffect(() => {
        store?.getOrgInfo()
        setPageTitle('机构专题页')
    }, [])

    return (
        <div className={styles.admission_container}>
            <div className={styles.admissions_header_bg}>
                <img
                    src={
                        'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-enroll-pc/bg_1ffc183d.png'
                    }
                />
            </div>
            <div className={styles.admissions_header__card}>
                <div className={styles.admissions_header__card_logo}>
                    <img src={logo || 'https://i.zpimg.cn/public_read/22102410qdkcjk.png'} />
                </div>
                <div className={styles.admissions_header__card_right}>
                    <div className={styles.admissions_header__card_title}>
                        <div className={styles.admissions_header__card_title_text}>
                            {name}
                            {certifyStatus === '1' && (
                                <img src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-enroll-pc/renzheng_a5be7726.png" />
                            )}
                        </div>
                        <div className={styles.share_wrapper}>
                            <span className={styles.share_text}>分享</span>
                            <Tooltip title="点击分享">
                                <svg
                                    className={styles.link_icon}
                                    aria-hidden="true"
                                    onClick={handleCopy}
                                >
                                    <use xlinkHref={`#icon_share_lianjie`} />
                                </svg>
                            </Tooltip>
                        </div>
                    </div>
                    <Row className={styles.desc_item} gutter={[32, 16]}>
                        <Col span={12}>
                            行业：
                            <span className={styles.gray}>
                                {industryList?.map((i: any) => i.name).join(' / ')}
                            </span>
                        </Col>
                        <Col span={12}>
                            规模：<span className={styles.gray}>{scale || '-'}</span>
                        </Col>
                        <Col span={12}>
                            地区：
                            <span className={styles.gray}>
                                {[provinceName, cityName, areaName].filter(i => i).join(' / ')}
                            </span>
                        </Col>
                        <Col span={12}>
                            联系方式：<span className={styles.gray}>{contactMobile || '-'}</span>
                        </Col>
                        <Col span={12}>
                            邮箱：<span className={styles.gray}>{contactEmail || '-'}</span>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className={styles.admissions_header__card_descrption}>
                <div className={styles.desc_wrapper}>
                    <div className={styles.desc_title}>机构简介</div>
                    <div>{introduction}</div>
                </div>
                {videoUrl && (
                    <div>
                        <video src={videoUrl} controls />
                    </div>
                )}
            </div>
            <div className={styles.tabs_wrapper}>
                <Tabs items={items} />
            </div>
        </div>
    )
}

export default inject('siteStore')(observer(Admissions))
