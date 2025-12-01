import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Progress, message, Spin } from 'antd'
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons'
import styles from './index.module.less'
import Http from '@/servers/http'
import { PTHistory } from '@wotu/wotu-components'

interface ErrorItem {
    content: string
    line: number
    reason: string
}

interface ProgressResponse {
    code: string
    createdAt: number
    errorFileUrl: string
    errorList: ErrorItem[]
    failCount: number
    fileUrl: string
    rate: number
    showStatus: number
    status: number
    totalCount: number
    type: number
    typeName: string
}

interface BatchExportProps {
    open: boolean
    api: string
    params?: any
    progressApi?: string
    onClose?: () => void
}

const BatchExport: React.FC<BatchExportProps> = ({ open, api, params, onClose }) => {
    const [fileData, setFileData] = useState<any>({})
    const [status, setStatus] = useState<'exporting' | 'success' | 'fail'>('exporting')
    const [progress, setProgress] = useState(0)
    const [fileName, setFileName] = useState('')
    const [exportCode, setExportCode] = useState<any>('')
    const timerRef = useRef<any>()

    // 开始导出
    const startExport = async () => {
        try {
            setStatus('exporting')
            setProgress(0)

            const data = await Http<any, any>(api, 'post', { ...params, operationType: 1 })
            console.log(data)
            if (data) {
                setExportCode(data)
            } else {
                setStatus('fail')
            }
        } catch (error) {
            console.error('导出失败:', error)
            setStatus('fail')
        }
    }

    // 监听 open 变化，开始导出
    useEffect(() => {
        if (open) {
            startExport()
        } else {
            // 关闭弹窗时清理状态
            setExportCode('')
            setProgress(0)
            setFileName('')
            setFileData({})
            clearInterval(timerRef.current)
        }
    }, [open])

    // 轮询进度
    const pollProgress = async () => {
        try {
            const data: any = await Http<any, { data: ProgressResponse }>(
                `/auth/batch_operate/detail/${exportCode}`,
                'get',
                {},
            )
            console.log(data)
            if (data) {
                setProgress(data.rate)
                setFileData(data)
                if (data.status === 3 || (data.status === 2 && data.errorList.length > 0)) {
                    // 导入失败
                    setStatus('fail')
                    clearInterval(timerRef.current)
                } else if (data.status === 2) {
                    // 已完成
                    setFileName(data.fileUrl)
                    setStatus('success')
                    clearInterval(timerRef.current)
                } else if (data.status === 0) {
                    // 未进行
                    setStatus('fail')
                    clearInterval(timerRef.current)
                }
            }
        } catch (error) {
            console.error('轮询进度失败:', error)
            message.error('获取进度失败')
        }
    }

    // 监听 exportCode 变化，开始轮询
    useEffect(() => {
        if (exportCode) {
            timerRef.current = setInterval(pollProgress, 2000)
        }
        return () => {
            clearInterval(timerRef.current)
        }
    }, [exportCode])

    // 关闭弹窗
    const handleClose = () => {
        clearInterval(timerRef.current)
        if (status === 'exporting') {
            Modal.confirm({
                title: '弹窗关闭后，数据仍继续导入',
                content: '您可以在【批量操作记录】列表页，查看具体的导入进度及结果',
            })
        }
        onClose?.()
    }

    // 下载文件
    const handleDownload = () => {
        window.open(fileName)
        handleClose()
    }

    // 渲染不同状态的弹窗内容
    const renderModalContent = () => {
        switch (status) {
            case 'exporting':
                return (
                    <div className={styles.exportingModal}>
                        <div className={styles.content}>
                            <Spin className={styles.loadingIcon} />
                            <div className={styles.text}>导出中，请稍候...</div>
                            <Progress percent={progress} showInfo={true} />
                        </div>
                    </div>
                )

            case 'success':
                return (
                    <div className={styles.successModal}>
                        <CheckCircleFilled className={styles.successIcon} />
                        <div className={styles.content}>
                            <div className={styles.text}>导出成功</div>
                            <div className={styles.fileName}>
                                {fileData?.fileName ||
                                    params?.fileName ||
                                    fileName?.split('/').slice(-1)}
                            </div>
                        </div>
                    </div>
                )

            case 'fail':
                return (
                    <div className={styles.failModal}>
                        <ExclamationCircleFilled className={styles.failIcon} />
                        <div className={styles.content}>
                            <div className={styles.text}>导出失败</div>
                        </div>
                    </div>
                )
        }
    }

    function footerRender() {
        switch (status) {
            case 'exporting':
                return (
                    <Button
                        type="primary"
                        onClick={() => {
                            PTHistory.push('location', `/organization/action`)
                        }}
                    >
                        批量操作记录
                    </Button>
                )

            case 'success':
                return (
                    <div className={styles.footer}>
                        <Button onClick={handleClose}>完成</Button>
                        <Button type="primary" onClick={handleDownload}>
                            下载文件
                        </Button>
                    </div>
                )

            case 'fail':
                return <Button onClick={handleClose}>完成</Button>
        }
    }

    return (
        <Modal
            title="批量导出"
            open={open}
            footer={footerRender()}
            width={648}
            onCancel={handleClose}
            className={styles.batchExportModal}
        >
            {renderModalContent()}
        </Modal>
    )
}

export default BatchExport
