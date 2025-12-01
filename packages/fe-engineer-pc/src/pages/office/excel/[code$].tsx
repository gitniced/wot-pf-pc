import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams, history, useLocation } from 'umi'
import styles from './index.module.less'
import { Button, Input, message } from 'antd'
import { RESOURCE_FORMAT, RESOURCE_TYPE } from '@/modules/resource/const'
import { createWebFileCode } from '@/modules/office/service'
import { createResource, getResourceDetail, updateResource } from '@/modules/resource/service'
import { getCookie } from '@/storage'
import type { IResourceDetail } from '@/modules/resource/types'
import { useSaasTitle } from '@wotu/wotu-components'
import useBroadcastChannel from '@/hooks/useBroadcastChannel'
import HrefBreadcrumb from '@/components/HrefBreadcrumb'

const defaultName = '未命名表格'

const Excel = () => {
    const { code } = useParams<{ code?: string }>()
    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)
    const preview = searchParams.get('preview') === 'true'
    useSaasTitle(`${preview ? '预览' : code ? '编辑' : '新建'}在线表格`)

    let fromType = searchParams.get('fromType') as unknown as RESOURCE_TYPE | undefined
    if (fromType) {
        fromType = Number(fromType)
    }
    const majorCode = searchParams.get('majorCode') as string | undefined
    const [resourceDetail, setResourceDetail] = useState<IResourceDetail | null>(null)
    const title = useMemo(
        () => `${preview ? '预览' : code ? '编辑' : '新建'}在线表格`,
        [preview, code],
    )
    const wpsRef = useRef<IWps>()
    const codeRef = useRef(code)
    const [name, setName] = useState<string>('')
    const [isEditingName, setIsEditingName] = useState<boolean>(false)
    const [editingName, setEditingName] = useState<string>('')

    const stateRef = useRef<string | null>(null)
    if (!stateRef.current && fromType) {
        stateRef.current = window.sessionStorage.getItem('office_broadcast_state')
        if (stateRef.current) {
            window.sessionStorage.removeItem('office_broadcast_state')
        }
    }
    const state = stateRef.current

    const broadcastChannel = useBroadcastChannel<{
        state: string
        code: string
        name: string
    }>('excel')

    const showTabs =
        String(getCookie('SELECT_IDENTITY_CODE')) === '14'
            ? !code ||
              [RESOURCE_TYPE.activityOutcome, RESOURCE_TYPE.activityHomework].includes(fromType)
                ? false
                : true
            : false
    const canEditName = String(getCookie('SELECT_IDENTITY_CODE')) === '14'

    const crumbData = useMemo(
        () => [
            { name: '首页', link: `/assistant/home` },
            {
                name: '资源库',
                link: `/assistant/resource`,
            },
            {
                name: title,
                link: `/office/excel${code ? `/${code}` : ''}${preview ? '?preview=true' : ''}${
                    majorCode ? `&majorCode=${majorCode}` : ''
                }${fromType ? `&fromType=${fromType}` : ''}`,
            },
        ],
        [code, preview, majorCode, fromType],
    )

    useEffect(() => {
        if (!code) {
            setName(defaultName)
            return
        }
        getResourceDetail(code).then(res => {
            if (!res) return
            setResourceDetail(res)
            setName(res.name)
        })
    }, [code])

    useEffect(() => {
        const init = async () => {
            if (!codeRef.current) {
                const fileCode = await createWebFileCode({
                    format: RESOURCE_FORMAT.excel,
                    organizationCode: getCookie('SELECT_ORG_CODE'),
                })
                codeRef.current = fileCode
            }

            wpsRef.current = WebOfficeSDK.init({
                mode: preview ? 'simple' : 'nomal',
                officeType: WebOfficeSDK.OfficeType.Spreadsheet,
                attrAllow: ['clipboard-read', 'clipboard-write'],
                appId:
                    BUILD_ENV === 'pro'
                        ? 'AK20251023SSAYXE'
                        : BUILD_ENV === 'pre'
                        ? 'SX20251013JFCZVV'
                        : 'SX20250725LPNDOH',
                fileId: codeRef.current,
                mount: document.getElementById('web-office-container'),
                token: getCookie('TOKEN'),
                customArgs: {
                    update: preview ? 0 : 1,
                    userCode: getCookie('USER_CODE'),
                    identity: getCookie('SELECT_IDENTITY_CODE'),
                },
            })

            // if (wpsRef.current) {
            //     wpsRef.current.ApiEvent?.AddApiEventListener('fileNameChange', data => {
            //         console.log('fileNameChange: ', data)
            //         setFileName(data.fileName)
            //     })

            //     wpsRef.current.ApiEvent?.AddApiEventListener('DocumentSaveStatus', data => {
            //         console.log('DocumentSaveStatus: ', data)
            //     })
            // }
        }

        init()
    }, [])

    const handleSave = useCallback(async () => {
        if (!wpsRef.current) {
            message.error('请等待文件加载完成后再试')
            return
        }

        const loading = message.loading('保存中...', 0)
        try {
            let result: string | null = null
            if (!code) {
                if (!majorCode) {
                    message.warning('缺少专业无法创建')
                    loading()
                    return
                }

                result = await createResource({
                    name: name || defaultName,
                    format: RESOURCE_FORMAT.excel,
                    type: fromType || RESOURCE_TYPE.personal,
                    majorCode: majorCode,
                    wpsCode: codeRef.current,
                })
            } else {
                if (!resourceDetail) {
                    message.warning('资源不存在')
                    loading()
                    return
                }

                result = await updateResource({
                    code: resourceDetail.code,
                    name: name,
                    format: RESOURCE_FORMAT.excel,
                    type: resourceDetail.type,
                    majorCode: resourceDetail.majorCode,
                })
            }

            if (result) {
                message.success('保存成功')

                if (fromType && state) {
                    broadcastChannel.send({
                        state: state,
                        code: result,
                        name: name,
                    })
                }

                if (history.length > 1) {
                    loading()
                    history.goBack()
                } else {
                    if (!code) {
                        let url =
                            `/office/excel/${result}` + `${fromType ? `?fromType=${fromType}` : ''}`
                        loading()
                        history.replace(url)

                        setTimeout(() => {
                            window.dispatchEvent(new Event('resize'))
                        }, 100)
                    } else {
                        loading()
                    }
                }
            } else {
                loading()
            }
        } catch (error) {
            loading()
        }
    }, [resourceDetail, code, majorCode, name, fromType, state, broadcastChannel])

    return (
        <div className={styles.excel}>
            {showTabs && <HrefBreadcrumb crumbData={crumbData} />}

            <div className={styles.excel_content}>
                <div className={styles.excel_content_header}>
                    <div className={styles.excel_content_header_title}>
                        {!preview && canEditName ? (
                            isEditingName ? (
                                <>
                                    <Input
                                        size="small"
                                        autoFocus
                                        value={editingName}
                                        onChange={e => setEditingName(e.target.value)}
                                        maxLength={50}
                                    />
                                    <Button
                                        type="link"
                                        size="small"
                                        style={{ padding: 0, margin: 0, lineHeight: 1 }}
                                        onClick={() => {
                                            setName(editingName)
                                            setIsEditingName(false)
                                        }}
                                    >
                                        保存名称
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <span>{name}</span>
                                    <Button
                                        type="link"
                                        size="small"
                                        style={{ padding: 0, margin: 0, lineHeight: 1 }}
                                        onClick={() => {
                                            setEditingName(name)
                                            setIsEditingName(true)
                                        }}
                                    >
                                        修改名称
                                    </Button>
                                </>
                            )
                        ) : (
                            <span>{name}</span>
                        )}
                    </div>
                    {preview || !canEditName ? null : (
                        <div className={styles.excel_content_header_control}>
                            <Button type="primary" onClick={handleSave}>
                                保存
                            </Button>
                        </div>
                    )}
                </div>
                <div
                    className={styles.excel_content_body}
                    style={{ height: `calc(100vh - ${showTabs ? '224' : '184'}px)` }}
                >
                    <div id="web-office-container" className={styles.web_office_container} />
                </div>
            </div>
        </div>
    )
}

export default Excel
