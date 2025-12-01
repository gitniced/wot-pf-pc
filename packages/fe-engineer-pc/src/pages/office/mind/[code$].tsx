import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.less'
import { useLocation, useParams } from 'umi'
import { Button, Input, message, Spin } from 'antd'
import type { IMindMapRef } from '@/components/MindMap'
import MindMap from '@/components/MindMap'
import { RESOURCE_FORMAT, RESOURCE_TYPE } from '@/modules/resource/const'
import { history } from 'umi'
import type {
    ICreateResourceBody,
    IResourceDetail,
    IUpdateResourceBody,
} from '@/modules/resource/types'
import { createResource, getResourceDetail, updateResource } from '@/modules/resource/service'
import { useSaasTitle } from '@wotu/wotu-components'
import { getCookie } from '@/storage'
import useBroadcastChannel from '@/hooks/useBroadcastChannel'
import HrefBreadcrumb from '@/components/HrefBreadcrumb'

const defaultName = '未命名脑图'

const Mind = () => {
    const { code } = useParams<{ code?: string }>()
    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)
    const preview = searchParams.get('preview') === 'true'
    useSaasTitle(`${preview ? '预览' : code ? '编辑' : '新建'}在线脑图`)

    let fromType = searchParams.get('fromType') as unknown as RESOURCE_TYPE | undefined
    if (fromType) {
        fromType = Number(fromType)
    }
    const majorCode = searchParams.get('majorCode') as string | undefined
    const [resourceDetail, setResourceDetail] = useState<IResourceDetail | null>(null)
    const [loading, setLoading] = useState(false)
    const title = useMemo(
        () => `${preview ? '预览' : code ? '编辑' : '新建'}在线脑图`,
        [preview, code],
    )
    const mindMapRef = useRef<IMindMapRef>(null)
    const [name, setName] = useState<string>('')
    const [isEditingName, setIsEditingName] = useState<boolean>(false)
    const [editingName, setEditingName] = useState<string>('')

    // 从 sessionStorage 读取 state，读取后立即删除
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
    }>('mind')

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
                link: `/office/mind${code ? `/${code}` : ''}${preview ? '?preview=true' : ''}${
                    majorCode ? `&majorCode=${majorCode}` : ''
                }${fromType ? `&fromType=${fromType}` : ''}`,
            },
        ],
        [code, preview, majorCode, fromType],
    )

    useEffect(() => {
        if (code) {
            setLoading(true)
            getResourceDetail(code)
                .then(res => {
                    if (!res) return
                    setResourceDetail(res)
                    setName(res.name || '')
                    mindMapRef.current?.init(res.content, preview)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            mindMapRef.current?.init(undefined, preview)
            setName(defaultName)
        }
    }, [code])

    const handleSave = useCallback(async () => {
        if (!mindMapRef.current) {
            message.warning('系统还没有准备好,请稍后尝试')
            return
        }

        setLoading(true)
        try {
            const content = await mindMapRef.current.export()

            if (code) {
                if (!resourceDetail) {
                    message.warning('资源不存在')
                    setLoading(false)
                    return
                }

                const data: IUpdateResourceBody = {
                    ...resourceDetail,
                    code,
                    content: content,
                    majorCode: resourceDetail.majorCode,
                    name: name || resourceDetail.name,
                }

                const result = await updateResource(data)

                if (result) {
                    message.success('保存成功')

                    if (fromType && state) {
                        console.log('send', state, result, name || resourceDetail.name)
                        broadcastChannel.send({
                            state: state,
                            code: result,
                            name: name || resourceDetail.name,
                        })
                    }

                    setLoading(false)
                    history.goBack()
                } else {
                    setLoading(false)
                }
            } else {
                if (!majorCode) {
                    message.warning('缺少专业无法创建')
                    setLoading(false)
                    return
                }

                const data: ICreateResourceBody = {
                    name: name || defaultName,
                    format: RESOURCE_FORMAT.mind,
                    majorCode: majorCode,
                    type: fromType || RESOURCE_TYPE.personal,
                    content: content,
                }

                const result = await createResource(data)

                if (result) {
                    message.success('保存成功')

                    if (fromType && state) {
                        broadcastChannel.send({
                            state: state,
                            code: result,
                            name: name || defaultName,
                        })
                    }

                    if (history.length > 1) {
                        setLoading(false)
                        history.goBack()
                    } else {
                        let url =
                            `/office/mind/${result}` + `${fromType ? `?fromType=${fromType}` : ''}`
                        history.replace(url)
                    }
                } else {
                    setLoading(false)
                }
            }
        } catch (error) {
            setLoading(false)
        }
    }, [code, resourceDetail, majorCode, name, fromType, state, broadcastChannel])

    return (
        <div className={styles.mind}>
            {showTabs && <HrefBreadcrumb crumbData={crumbData} />}

            <div className={styles.mind_content}>
                <Spin spinning={code ? !resourceDetail || loading : false}>
                    <div className={styles.mind_content_header}>
                        <div className={styles.mind_content_header_title}>
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
                        {preview ? null : (
                            <div className={styles.mind_content_header_control}>
                                <Button type="primary" onClick={handleSave}>
                                    保存
                                </Button>
                            </div>
                        )}
                    </div>
                    <div
                        className={styles.mind_content_body}
                        style={{ height: `calc(100vh - ${showTabs ? '224' : '184'}px)` }}
                    >
                        <MindMap ref={mindMapRef} name={name || defaultName} preview={preview} />
                    </div>
                </Spin>
            </div>
        </div>
    )
}

export default Mind
