import { message, Modal, Space } from 'antd'
import { history } from 'umi'
import React from 'react'
import styles from './index.module.less'

import { isDisableEmailSite } from '@/utils/isEmailSite'
import classNames from 'classnames'
import { getDecodeInfo, SuperLink } from '@wotu/wotu-components'

interface ChangeBindModalProps {
    // modal框的显隐
    bindModalVisible: boolean
    // 改变modal框的显隐
    setBindModalVisible: () => void
    // 用户邮箱
    email?: string
    mobile?: string
}
export default function ChangeBindModal({
    bindModalVisible,
    setBindModalVisible,
    email,
    mobile,
}: ChangeBindModalProps) {
    const toChangePhone = (type: string) => {
        return `/bind/phone?type=${type}`
    }

    const toEmailChangePhone = async () => {
        if (email) {
            let isDisable = await isDisableEmailSite()
            !isDisable && history.push('/bind/phone?type=email')
        } else {
            message.error('请先认证邮箱')
        }
    }

    return (
        <Modal
            maskClosable={false}
            title="验证身份"
            centered
            footer={null}
            open={bindModalVisible}
            onCancel={setBindModalVisible}
            className={styles.bind_modal}
        >
            <div className={styles.chose}>
                <SuperLink className={styles.phone} href={toChangePhone('edit')}>
                    <Space>
                        <img
                            className={styles.before_icon}
                            src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/icon_yanzheng_phone.png"
                            width={72}
                            height={72}
                        />
                        <span className={styles.text}>短信验证</span>
                    </Space>

                    <Space>
                        <span className={styles.phone_value}>{getDecodeInfo(mobile!, '2')}</span>
                        <img
                            className={styles.after_icon}
                            src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bg_card_phone.png"
                            width={85}
                            height={66}
                        />
                        <img
                            className={styles.arrow_icon}
                            src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/%E5%9B%BE%E6%A0%87icon_%E7%AE%AD%E5%A4%B4%402x.png"
                            width={16}
                            height={16}
                        />
                    </Space>
                </SuperLink>
                <SuperLink className={styles.password} href={toChangePhone('password')}>
                    <Space>
                        <img
                            className={styles.before_icon}
                            src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/icon_yanzheng_mima.png"
                            width={72}
                            height={72}
                        />
                        <span className={styles.text}>密码验证</span>
                    </Space>

                    <Space>
                        <img
                            className={styles.after_icon}
                            src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bg_card_mima.png"
                            width={85}
                            height={66}
                        />
                        <img
                            className={styles.arrow_icon}
                            src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/%E5%9B%BE%E6%A0%87icon_%E7%AE%AD%E5%A4%B4%402x.png"
                            width={16}
                            height={16}
                        />
                    </Space>
                </SuperLink>
                <div
                    className={classNames(styles.email, {
                        [styles.disabled]: !email,
                    })}
                    onClick={toEmailChangePhone}
                >
                    <Space>
                        {email ? (
                            <img
                                className={styles.before_icon}
                                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/icon_yanzheng_email.png"
                                width={72}
                                height={72}
                            />
                        ) : (
                            <img
                                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/icon_yanzheng_email_un.png"
                                className={styles.before_icon}
                                width={72}
                                height={72}
                            />
                        )}

                        <span className={styles.text}>邮箱验证</span>
                    </Space>

                    <Space>
                        {Boolean(email) && (
                            <span className={styles.email_value}>{getDecodeInfo(email!, '3')}</span>
                        )}
                        {email ? (
                            <img
                                className={styles.after_icon}
                                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bg_card_email.png"
                                width={85}
                                height={66}
                            />
                        ) : (
                            <img
                                className={styles.after_icon}
                                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/bg_card_email_un.png"
                                width={85}
                                height={66}
                            />
                        )}
                        {Boolean(email) && (
                            <img
                                className={styles.arrow_icon}
                                src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/%E5%9B%BE%E6%A0%87icon_%E7%AE%AD%E5%A4%B4%402x.png"
                                width={16}
                                height={16}
                            />
                        )}
                    </Space>
                </div>
            </div>
        </Modal>
    )
}
