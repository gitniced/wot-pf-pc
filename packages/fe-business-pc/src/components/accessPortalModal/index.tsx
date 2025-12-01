import { Modal, message, Button } from 'antd'
import { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styles from './index.module.less'
import Clipboard from 'clipboard'
import QRCode from 'qrcode.react'
import type { IProps } from './interface'
import { getCookie } from '@/storage'

function useToCopy(selector: string) {
    const copy = new Clipboard(selector)
    copy.on('success', function (e) {
        message.success('复制成功')
        e.clearSelection()
    })
    copy.on('error', function (e) {
        message.error('复制失败')
        console.error('Action:', e.action)
        console.error('Trigger:', e.trigger)
    })
    useEffect(() => {
        return () => copy.destroy()
    }, [copy])

    return () => copy.destroy()
}

const AccessPortalModal = (props: IProps) => {
    useToCopy('.pc-copy')
    useToCopy('.mobile-copy')
    const { visible, randomCode, onCancel, siteStore } = props
    /** 获取h5 saas的基础地址 */
    const getSaasBase = () => siteStore?.siteData?.data?.baseInfo?.portalH5Url
    /** 获取pc saas的基础地址 */
    const getPcSaasBase = () => siteStore?.siteData?.data?.baseInfo?.burl
    /** 获取移动端地址 */
    const getMobilePath = () => `${getSaasBase()}/${getCookie('SELECT_ORG_CODE')}`
    /** 获取pc地址 */
    const getPcPath = () => `${getPcSaasBase()}/${getCookie('SELECT_ORG_CODE')}/home`
    const title = '访问门户'

    //优化后的复制二维码图片   //注:此方法只能在localhost跟https协议下可用,http协议下不存在此方法
    // 将base64转成blob格式
    const base64ToBlob = (urlData: any, type: any) => {
        const arr = urlData.split(',')
        const mime = arr[0].match(/:(.*?);/)[1] || type
        // 去掉url的头，并转化为byte
        const bytes = window.atob(arr[1])
        // 处理异常,将ascii码小于0的转换为大于0
        const ab = new ArrayBuffer(bytes.length)
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        const ia = new Uint8Array(ab)
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], {
            type: mime,
        })
    }

    /**
     * 复制图片
     */
    const clickCopyImg = async () => {
        // 将 qrcode 生成的二维码利用canvas自带的 toDataURL 转成base64 格式 然后再转成 Blob格式 使用 clipboard.write 复制
        const canvasImg: any = document.getElementById('QR-code') // 获取canvas类型的二维码
        const file = canvasImg?.toDataURL('image/jpg') // 把整个base64给file
        const type = 'image/png' // 定义图片类型（canvas转的图片一般都是png，也可以指定其他类型）
        const conversions = base64ToBlob(file, type)
        try {
            await navigator.clipboard.write([
                // eslint-disable-next-line no-undef
                new ClipboardItem({
                    [conversions.type]: conversions,
                }),
            ])
            message.success('复制成功')
        } catch (error) {
            message.error('请在https协议下操作')
        }
    }

    /**
     * 打开地址
     * @param url
     */
    const openPath = (url: string) => {
        url && window.open(url)
    }

    return (
        <>
            <Modal
                centered
                title={title}
                visible={visible}
                onCancel={onCancel}
                footer={false}
                width={866}
            >
                <div className={styles.info_model}>
                    <div className={styles.link_box}>
                        <div className={styles.min_title}>链接访问</div>
                        <div className={styles.link_body}>
                            <div className={styles.link_body_item}>
                                <div className={styles.link_body_item_tost}>移动链接访问</div>
                                <div className={styles.link_body_item_url_item}>
                                    <div
                                        className={styles.link_body_item_url}
                                        id="mobile-copy-content"
                                        onClick={() => {
                                            openPath(getMobilePath())
                                        }}
                                    >
                                        {getMobilePath()}
                                    </div>
                                    <Button
                                        type="primary"
                                        className={[styles.link_body_item_copy, 'mobile-copy'].join(
                                            ' ',
                                        )}
                                        data-clipboard-target="#mobile-copy-content"
                                    >
                                        复制
                                    </Button>
                                </div>
                            </div>
                            <div className={styles.link_body_item}>
                                <div className={styles.link_body_item_tost}>PC链接访问</div>
                                <div className={styles.link_body_item_url_item}>
                                    <div
                                        id="pc-copy-content"
                                        className={styles.link_body_item_url}
                                        onClick={() => {
                                            openPath(
                                                `${getPcPath()}/keepalive?randomCode=${randomCode}`,
                                            )
                                        }}
                                    >
                                        {getPcPath()}
                                    </div>
                                    <Button
                                        type="primary"
                                        className={[styles.link_body_item_copy, 'pc-copy'].join(
                                            ' ',
                                        )}
                                        data-clipboard-target="#pc-copy-content"
                                    >
                                        复制
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.qr_code_box}>
                        <div className={styles.min_title}>移动端二维码访问</div>
                        <div className={styles.qr_code_warp}>
                            <QRCode
                                id="QR-code"
                                value={getMobilePath() || ''}
                                size={160}
                                fgColor="#000000"
                            />
                            <div style={{ textAlign: 'center' }}>
                                <a onClick={() => clickCopyImg()}>复制图片</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default inject('siteStore')(observer(AccessPortalModal))
