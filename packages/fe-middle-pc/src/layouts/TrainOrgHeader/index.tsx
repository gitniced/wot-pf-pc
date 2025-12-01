import React, { useState } from 'react'
import { findSiteData } from '@wotu/wotu-components'
import { inject, observer } from 'mobx-react'
import styles from './index.module.less'
import { DownOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { message, Modal } from 'antd'
import globalApi from '@/servers/globalApi'
import http from '@/servers/http'
import { delCookie } from '@/storage'

const Index = ({ siteStore, userStore }: any) => {
    const { siteData = {} } = siteStore
    const { userData = {} } = userStore
    let { name, avatar } = userData || {}
    avatar = avatar || siteStore?.siteAvatar || defaultAvatar

    const [showOut, setShowOut] = useState<boolean>(false)

    let siteName = findSiteData(siteData, 'name', { findKey: 'baseInfo' }) || ''
    let siteLogo = findSiteData(siteData, 'wap_logo', { findKey: 'configList' })?.value || ''
    let loginUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' })
    const orgDomain = findSiteData(siteData, 'orgDomain', { findKey: 'baseInfo' })

    const loginOut = () => {
        http(globalApi.loginOut, 'get', {})
            .then(async () => {
                delCookie('TOKEN')
                message.success('退出成功')
                location.href = orgDomain
            })
            .catch(() => {})
    }

    return (
        <div className={styles.train_header}>
            <div className={styles.train_header_content}>
                <div className={styles.train_header_left}>
                    <img src={siteLogo} />
                    <span>{siteName}</span>
                </div>
                <div className={styles.train_header_right}>
                    <div
                        className={styles.home_btn}
                        onClick={e => {
                            e.stopPropagation()
                            location.href = orgDomain
                        }}
                    >
                        <div />
                        首页
                    </div>
                    <div
                        className={styles.message_btn}
                        onClick={e => {
                            e.stopPropagation()
                            location.href = `${orgDomain}/message/myMessage`
                        }}
                    >
                        <div />
                        消息
                    </div>
                    <div className={styles.user_btn}>
                        <div
                            className={styles.user_btn_avatar}
                            style={{ backgroundImage: `url(${avatar})` }}
                        />
                        <div className={styles.user_btn_name}>{name}</div>
                        <DownOutlined className={styles.user_btn_arrow} />
                        <div className={styles.user_info_card}>
                            <div className={styles.user_info}>
                                <img src={avatar} />
                                <span>{name}</span>
                            </div>

                            <div className={styles.btn_list}>
                                <div
                                    className={styles.btn_list_item}
                                    onClick={e => {
                                        e.stopPropagation()
                                        location.href = `${loginUrl}/account/account`
                                    }}
                                >
                                    <div>
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#icon_zhanghaozhongxin" />
                                        </svg>
                                        <span>个人中心</span>
                                    </div>
                                    <svg
                                        className={['icon', styles.arrow].join(' ')}
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref="#right" />
                                    </svg>
                                </div>
                                <div
                                    className={styles.btn_list_item}
                                    onClick={e => {
                                        e.stopPropagation()
                                        setShowOut(true)
                                    }}
                                >
                                    <div>
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#icon_tuichu" />
                                        </svg>
                                        <span>退出登录</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                width={420}
                className={styles.resume_modal}
                title="提示"
                okText="确认"
                cancelText="取消"
                open={showOut}
                centered
                onOk={loginOut}
                onCancel={() => {
                    setShowOut(false)
                }}
            >
                <div className={styles.resume_modal_content}>
                    <ExclamationCircleFilled className={styles.resume_modal_icon} />
                    确定退出系统吗？
                </div>
            </Modal>
        </div>
    )
}

export default inject('siteStore', 'userStore')(observer(Index))
