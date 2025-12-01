/* eslint-disable*/

/**
 * Created by cgl on 2020/9/21.
 * Theme：侧边服务
 */
import React, { useState } from 'react'
import { Popover, Tooltip } from 'antd'
import { inject, observer } from 'mobx-react'
import FeedbackModal from './FeedbackModal'
import styles from './index.module.less'
import Item from './Item'
import { findSiteData } from '@wotu/wotu-components'

import type { UserInfo } from '@/stores/interface'
import type { SiteData } from '@/types'
import { message } from 'antd'
import classNames from 'classnames'
import { ReactSVG } from 'react-svg'

const ysfConfigUsr = (userDate: UserInfo, siteData: SiteData) => {
    const { avatar, code, email, name, mobile } = userDate || {}

    const siteAvatar = findSiteData(siteData, 'avatar', { findKey: 'configList' })?.value || ''

    const configUsr = {
        // 用户标识，不传表示匿名用户
        uid: code,
        // 用户名称
        name: name,
        // 用户邮箱
        email: email,
        // 用户手机号
        mobile: mobile,
        // 用户组id
        groupid: 483406582,

        level: 1, // vip级别
        robotShuntSwitch: 1, // 机器人优先开关
        data: JSON.stringify([
            { key: 'alias', label: '站点信息', value: name },
            { key: 'avatar', label: '头像', value: avatar ? avatar : siteAvatar }, // 访客头像
        ]),
        // 导航头是否显示返回按钮
        isShowBack: true,
        success: function () {
            //@ts-ignore
            ysf?.('open', {
                templateId: 6635280,
            })
        },
        error: function () {
            message.error('打开客服窗口失败，请稍后再试')
        },
    }
    return configUsr
}

const Service = (props: any) => {
    const [showFloat, setShowFloat] = useState(true)
    const [modalShow, setModalShow] = useState(false)
    const [tooltipShow, setTooltipShow] = useState(true)

    const showModal = () => {
        setModalShow(true)
    }

    const modalClose = () => {
        setModalShow(false)
    }

    const { siteStore, userStore } = props

    return (
        <>
            {!showFloat ? (
                <div className={styles.float_btn_wrapper}>
                    <div className={styles.kefu_img_wrapper}>
                        <img
                            src="https://static.zpimg.cn/public/business_pc/pic_zhinengkefu.png"
                            alt="zhipeikefu"
                            className={styles.kefu_img}
                            onClick={() => {
                                // 七鱼客服
                                // @ts-ignore
                                const configUsr = ysfConfigUsr(
                                    userStore?.userData,
                                    siteStore?.siteData?.data,
                                )
                                // @ts-ignore
                                ysf('config', configUsr)
                            }}
                        />
                    </div>
                    <div
                        className={styles.float_btn}
                        onClick={() => {
                            setShowFloat(true)
                        }}
                    >
                        <svg className={['icon', styles.icon].join(' ')} aria-hidden="true">
                            <use xlinkHref={'#icon_shouqi-copy'} />
                        </svg>
                        <div className={styles.text}>展</div>
                        <div className={styles.text}>开</div>
                    </div>
                </div>
            ) : null}
            <div
                className={classNames(styles.container_wrapper, {
                    [styles.show]: showFloat,
                })}
                id="popver"
            >
                {
                    // 职培客服机器人
                    showFloat && (
                        <Tooltip
                            getPopupContainer={() =>
                                document.getElementById('popver') as HTMLElement
                            }
                            overlayClassName={styles.tooltip_class}
                            title={() => {
                                return (
                                    <div className={styles.tooltip_class_content}>
                                        有事找沃小智
                                        <span
                                            onClick={() => {
                                                setTooltipShow(false)
                                            }}
                                            style={{ marginLeft: 4, cursor: 'pointer' }}
                                        >
                                            {/* <svg className="icon" aria-hidden="true">
                                                <use xlinkHref={`#a-guanbichacha`} />
                                            </svg> */}
                                            <ReactSVG
                                                className={styles.svg}
                                                src={
                                                    'https://img-test.zpimg.cn/public_read/menu_icon/172002218vnwo6ps.svg'
                                                }
                                                beforeInjection={svg => {
                                                    svg.setAttribute('style', `paddingTop: 3px`)
                                                }}
                                            />
                                        </span>
                                    </div>
                                )
                            }}
                            color={'linear-gradient( 97deg, #FF7082 0%, #EF0A26 100%)'}
                            open={tooltipShow}
                            trigger={'click'}
                        >
                            <img
                                src="https://static.zpimg.cn/public/business_pc/pic_zhinengkefu.png"
                                alt="zhipeikefu"
                                className={styles.kefu_img}
                                onClick={() => {
                                    // 七鱼客服
                                    // @ts-ignore
                                    const configUsr = ysfConfigUsr(
                                        userStore?.userData,
                                        siteStore?.siteData?.data,
                                    )
                                    // @ts-ignore
                                    ysf('config', configUsr)
                                }}
                            />
                        </Tooltip>
                    )
                }
                <div
                    className={styles.container}
                    style={{
                        top: '50%',
                    }}
                >
                    <Popover
                        content={
                            <div className={styles.popover}>
                                <img
                                    src="https://static.zpimg.cn/public/career/hunan/home/IMG_3822.png"
                                    className={styles.qrcode}
                                    style={{
                                        width: '156px',
                                    }}
                                />
                            </div>
                        }
                        placement="left"
                    >
                        <div style={{ width: 'fit-content', height: 'fit-content' }}>
                            <Item
                                title="电话客服"
                                icon="#quxianzixun"
                                hoverIcon="#quxianzixun-copy"
                            />
                        </div>
                    </Popover>

                    {/* QQ客服 */}
                    <Popover
                        content={
                            <div className={styles.popover}>
                                <img
                                    src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/career/hunan/home/qq_kefu.png"
                                    className={styles.qrcode}
                                    style={{
                                        width: '156px',
                                    }}
                                />
                            </div>
                        }
                        placement="left"
                    >
                        <div style={{ width: 'fit-content', height: 'fit-content' }}>
                            <Item
                                title="QQ客服"
                                icon="#home_qq_kefu"
                                hoverIcon="#home_qq_kefu_ghost"
                                onClick={() =>
                                    window.open(
                                        'http://wpa.qq.com/msgrd?v=3&uin=3845682604&site=qq&menu=yes&from=website&isappinstalled=0&msg=&name=',
                                        '_blank',
                                    )
                                }
                                isRenderReactSvg={true}
                                src={
                                    'https://img-test.zpimg.cn/public_read/menu_icon/172002218zm0th4w.svg'
                                }
                            />
                        </div>
                    </Popover>

                    {/* 微信客服 */}
                    <Popover
                        content={
                            <div className={styles.popover}>
                                <img
                                    src="https://static.zpimg.cn/public/career/hunan/home/wx_service_hun.png"
                                    className={styles.qrcode}
                                    style={{
                                        width: '220px',
                                    }}
                                />
                            </div>
                        }
                        placement="left"
                    >
                        <div style={{ width: 'fit-content', height: 'fit-content' }}>
                            <Item
                                title="微信客服"
                                icon="#home_wechat_kefu"
                                hoverIcon="#home_wechat_kefu_ghost"
                                isRenderReactSvg={true}
                                src={
                                    'https://img-test.zpimg.cn/public_read/menu_icon/172002218ztvssu8.svg'
                                }
                            />
                        </div>
                    </Popover>

                    {/* 课程需求 */}
                    <Item
                        title="课程需求"
                        icon="#home_kechengxuqiu"
                        hoverIcon="#home_kechengxuqiu_ghost"
                        onClick={() => window.open('https://www.wjx.cn/vm/PS6gamE.aspx#', '_blank')}
                        isRenderReactSvg={true}
                        src={'https://img-test.zpimg.cn/public_read/menu_icon/1720022190496dq8.svg'}
                    />

                    <Item
                        title="意见反馈"
                        icon="#home_feedback"
                        hoverIcon="#home_feedback_ghost"
                        onClick={showModal}
                    />

                    {/* <Popover
                        content={
                            <div className={styles.popover}>
                                <img
                                    src={
                                        'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/career/hunan/home/mobile_photo.png'
                                    }
                                    className={styles.qrcode}
                                    width={500}
                                />
                            </div>
                        }
                        placement="left"
                    >
                        <div style={{ width: 'fit-content', height: 'fit-content' }}>
                            <Item
                                title="移动端"
                                icon={'#home_mobile'}
                                hoverIcon={'#home_mobile_ghost'}
                            />
                        </div>
                    </Popover> */}

                    <div
                        className={styles.hide_btn}
                        onClick={() => {
                            setShowFloat(false)
                        }}
                    >
                        <svg className={['icon', styles.icon].join(' ')} aria-hidden="true">
                            <use xlinkHref={'#icon_shouqi'} />
                        </svg>
                        <div className={styles.text}>收起</div>
                    </div>
                    {modalShow && <FeedbackModal visible={modalShow} handleClose={modalClose} />}
                </div>
            </div>
        </>
    )
}

export default inject('userStore', 'siteStore')(observer(Service))
