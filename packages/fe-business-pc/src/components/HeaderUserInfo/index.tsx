import React from 'react'
import { Avatar, Popover } from 'antd'
import styles from './index.module.less'
import { UpOutlined } from '@ant-design/icons'
import { findSiteData } from '@wotu/wotu-components'
import { inject } from 'mobx-react'

const UserDataInfo = inject(
    'siteStore',
    'userStore',
)<any>(({ siteStore, userStore }) => {
    const cardList = [
        {
            key: 'a',
            url: '/baseinfo',
            name: '基础信息',
        },
        {
            key: 'b',
            url: '/bind',
            name: '认证绑定',
        },
        {
            key: 'c',
            url: '/account',
            name: '账号设置',
        },
    ]
    // console.log(siteStore, userStore)
    const loginUrl = findSiteData(siteStore, 'pcDomain', { findKey: 'baseInfo' })
    const isValidateIdCard = userStore?.userData?.isValidateIdCard
    return (
        <div className={styles.user_data_block}>
            <Avatar
                src={userStore?.userData?.avatar || defaultAvatar}
                className={styles.avatar_image}
            />
            <div className={styles.user_date_name}>{userStore?.userData?.nickname}</div>
            <div className={styles[isValidateIdCard ? 'card_item_success' : 'card_item_fail']}>
                <svg className={styles.card_icon}>
                    <use xlinkHref="#icon_renzheng_n">{/*  */}</use>
                </svg>
                <div>{isValidateIdCard ? '已认证' : '未认证'} </div>
            </div>
            <div className={styles.info_line}>{/*  */}</div>
            <div
                className={styles.user_center}
                onClick={() => {
                    window.location.href = `${loginUrl}/account`
                }}
            >
                <svg className={styles.first_icon}>
                    <use xlinkHref="#icon_zhanghaozhongxin">{/*  */}</use>
                </svg>
                <div>账号中心</div>
                <svg className={styles.arrow}>
                    <use xlinkHref="#icon_shouqi">{/*  */}</use>{' '}
                </svg>
            </div>
            {cardList.map(item => {
                return (
                    <div
                        className={styles.user_center}
                        key={item.key}
                        onClick={() => {
                            window.location.href = `${loginUrl}/account/${item.url}`
                        }}
                    >
                        <div className={styles.first_icon}>{/*  */}</div>
                        <div className={styles.gree_text}>{item.name}</div>
                    </div>
                )
            })}
            <div className={styles.info_line}>{/*  */}</div>

            <div
                className={styles.user_center}
                onClick={() => {
                    userStore?.loginOut()
                }}
            >
                <svg className={styles.first_icon}>
                    <use xlinkHref="#icon_tuichudenglu">{/*  */}</use>
                </svg>
                <div>退出登录</div>
            </div>
        </div>
    )
})

function HeaderUserInfo({ userStore }) {
    return (
        <div>
            <Popover
                getPopupContainer={() => document.getElementById('popver') as HTMLElement}
                color="#fff"
                content={<UserDataInfo />}
            >
                <div className={styles.user_header} id="popver">
                    <div className={styles.user_header_inner}>
                        <Avatar
                            src={userStore?.userData?.avatar || defaultAvatar}
                            className={styles.avatar_image}
                        />
                        <div>{userStore?.userData?.nickname}</div>
                        <UpOutlined className={styles.arrow} />
                    </div>
                </div>
            </Popover>
        </div>
    )
}

export default inject('userStore')<any>(HeaderUserInfo)
