import React from 'react'
import { getResourceDetail } from '@/modules/resource/service'
import type { IResourceDetail } from '@/modules/resource/types'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getCookie } from '@/storage'
import styles from './index.module.less'
import { Spin } from 'antd'
import { RESOURCE_FORMAT } from '@/modules/resource/const'
import MindMap from '@/components/MindMap'
import type { IMindMapRef } from '@/components/MindMap'

export interface OfficeOnlinePreviewEmptyComponentProps {
    status: 'error' | 'empty'
    fileUrl: string
    fileName: string
}

/**
 * Office 在线预览参数
 */
interface OfficeOnlinePreviewProps {
    /**
     * 资源 code
     */
    code: string
    /**
     * 空状态
     */
    emptyComponent: (props: OfficeOnlinePreviewEmptyComponentProps) => React.ReactElement
    /**
     * 挂载完成
     */
    onMounted?: () => void
    /**
     * 错误
     */
    onError?: () => void
}

/**
 * Office 在线预览
 */
const OfficeOnlinePreview: React.FC<OfficeOnlinePreviewProps> = props => {
    const { code, emptyComponent, onMounted, onError } = props
    const [resource, setResource] = useState<IResourceDetail | null>(null)
    const [detailLoading, setDetailLoading] = useState(true)
    const [error, setError] = useState(false)
    const wpsRef = useRef<IWps>()
    const containerRef = useRef<HTMLDivElement | null>(null)
    const mindMapRef = useRef<IMindMapRef>(null)

    useLayoutEffect(() => {
        if (code) {
            getResourceDetail(code)
                .then(res => {
                    if (!res) return
                    setResource(res)
                })
                .finally(() => {
                    setDetailLoading(false)
                })
        } else {
            setResource(null)
            setDetailLoading(false)
        }
    }, [code])

    useEffect(() => {
        setTimeout(() => {
            if (!resource) return

            if (resource.format === RESOURCE_FORMAT.mind) {
                if (!mindMapRef.current) return

                try {
                    mindMapRef.current.init(resource.content, true)
                    onMounted?.()
                } catch (err) {
                    setError(true)
                    onError?.()
                }

                return
            }

            // 处理 word 和 excel 格式
            if (!containerRef.current) return

            wpsRef.current = WebOfficeSDK.init({
                mode: 'simple',
                officeType:
                    resource.format === RESOURCE_FORMAT.word
                        ? WebOfficeSDK.OfficeType.Writer
                        : WebOfficeSDK.OfficeType.Spreadsheet,
                attrAllow: ['clipboard-read', 'clipboard-write'],
                appId:
                    BUILD_ENV === 'pro'
                        ? 'AK20251023SSAYXE'
                        : BUILD_ENV === 'pre'
                        ? 'SX20251013JFCZVV'
                        : 'SX20250725LPNDOH',
                fileId: resource.code,
                mount: containerRef.current,
                token: getCookie('TOKEN'),
                customArgs: {
                    update: 0,
                    userCode: getCookie('USER_CODE'),
                },
            })

            wpsRef.current?.ApiEvent?.AddApiEventListener('fileOpen', data => {
                console.log('fileOpen: ', data)
                if (!data.success) {
                    setError(true)
                    onError?.()
                } else {
                    onMounted?.()
                }
            })
        }, 0)
    }, [resource])

    return (
        <div className={styles.office_online_preview}>
            {detailLoading ? (
                <Spin spinning />
            ) : !resource || error ? (
                emptyComponent({
                    status: !resource ? 'empty' : 'error',
                    fileUrl: resource?.content || '',
                    fileName: resource?.name || '',
                })
            ) : resource.format === RESOURCE_FORMAT.mind ? (
                <MindMap ref={mindMapRef} preview />
            ) : (
                <div ref={containerRef} className={styles.web_office_container} />
            )}
        </div>
    )
}

export default React.memo(OfficeOnlinePreview)
