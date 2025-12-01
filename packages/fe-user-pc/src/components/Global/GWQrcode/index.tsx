import React, { useCallback, useRef } from 'react'
import { useEffect, useState } from 'react'
import http from '@/servers/http'
import api from './api'
import QRCode from 'qrcode.react';
import { getLocalStorage, getSessionStorage } from '@/storage';
import { inject } from 'mobx-react';
import { message } from 'antd';
import styles from './index.module.less'
let interval: any;
function GWQrcode({ userStore }: any) {

    const [qrcodeData, setQrcodeData] = useState({
        code: '',
        bizSeq: '',
    })
    const [isValidate, setIsValidate] = useState(true)
    const qrDataRef = useRef({ bizSeq: '' })

    const pollScanResult = useCallback(() => {
        // 授权登录的用户类型
        let authUserType: string = getSessionStorage('AUTH_USER_TYPE')
        const sid = getLocalStorage('SID')
        http(api.getScanQrcodeResult, 'post', {
            // 授权码 redirectUrl携带返回
            code: qrDataRef?.current.bizSeq,
            // code: 'd383349dffec4e20b6cdfdf108ab70f7',
            // 授权应用id
            appId: '',
            // 登录设备
            appKey: 'WEB',
            // 类型，1个人，2机构，3资源方
            type: authUserType,
            // 站点id
            sid,
            // 	授权类型,wx:微信;dd:钉钉
            authType: 'nnc',
        }, { form: true }).then((res: any) => {
            if (res.data?.authOpenId || res.data?.accessToken) {
                userStore.afterScanningCode?.({
                    ...res.data,
                    userType: authUserType,
                })
            } else if (res.messageCode === '4') {
                return
            } else if (res.messageCode === '1' || res.messageCode === '2') {
                setIsValidate(false)
                clearInterval(interval)
            } else {
                clearInterval(interval)
                message.error(`${res.message}`)
            }

        }).catch(() => {
            clearInterval(interval)
        })
    }, [qrcodeData])

    const fetchQrcode = async () => {
        clearInterval(interval)
        setIsValidate(true)
        const data: any = await http(api.getQrcode, 'post', {})
        setQrcodeData(data)
        qrDataRef.current = data
        interval = setInterval(() => pollScanResult(), 2000) // 每5秒轮询一次
    }

    useEffect(() => {
        fetchQrcode()
        return () => clearInterval(interval) // 清理定时器
    }, [])

    return (
        <div className={styles.qrcode_wrapper}>
            <div style={{ opacity: isValidate ? '1' : '0.1' }}>
                {qrcodeData?.code && <QRCode
                    onClick={fetchQrcode}
                    id="qrCode"
                    value={qrcodeData?.code}
                    size={246} // 二维码的大小
                    style={{ margin: 'auto' }}
                    level="Q"
                    imageSettings={{ // 二维码中间的logo图片
                        src: 'https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe_user_pc/images/png_shenfenrenzheng_a19f38d3.png',
                        height: 49,
                        width: 49,
                        excavate: true, // 中间图片所在的位置是否镂空
                    }}
                />}
            </div>
            {!isValidate && <div className={styles.tips} onClick={fetchQrcode}>二维码已失效，点击刷新</div>}
        </div>
    )
}



export default inject('userStore')(GWQrcode)