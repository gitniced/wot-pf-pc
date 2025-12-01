// 批量导入

import { Button, Modal } from 'antd'

import type { BatchImportProps, FailRecordItem, ImportParams } from './interface'

import Before from './Before'

import styles from './index.module.less'
import { useState } from 'react'
import { ACTION_STATUS_TYPE } from './constant'
import type { UploadFile } from 'antd/es/upload/interface'
import { getImportCode, getImportResult } from './api'
import { useRequest } from 'ahooks'
import Loading from './Loading'
import Resolved from './Resolved'
import Rejected from './Rejected'
import { getLocalStorage } from '@/storage'

const BatchImport = (props: BatchImportProps) => {
    const {
        subject,
        open,
        onCancel,
        importApi,
        description,
        importTemplate,
        title,
        showContinue = true,
        uploadTips,
        accept,
        uploadParams,
        failApi
    } = props

    const userStore = getLocalStorage('USER_STORE')

    const [importStatus, setImportStatus] = useState<number>(ACTION_STATUS_TYPE.WAITING)
    const [currentFile, setCurrentFile] = useState<UploadFile>()
    const [importCode, setImportCode] = useState<string>()

    const [failCount, setFailCount] = useState<number>(0)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [errorList, setErrorList] = useState<FailRecordItem[]>([])
    const [errorFileUrl, setErrorFileUrl] = useState<string>()

    // 上传进度
    const [progress, setProgress] = useState<string>()

    // 处理导入结果
    const handleImportResult = (res: any, callback: any) => {
        const {
            rate,
            status: _importStatus,
            failCount: _failCount,
            totalCount: _totalCount,
            failFileUrl: _failFileUrl,
            failDtoList: _failDtoList = [],
        } = res ?? {}
        if (![ACTION_STATUS_TYPE.COMPLETE, ACTION_STATUS_TYPE.FORMATERROR].includes(_importStatus)) {
            setProgress(rate)
            callback({
                code: importCode!,
            })
        } else {
            // 设置结果状态
            if (_failCount === 0 && _totalCount! > 0) {
                // 全部成功
                setImportStatus(ACTION_STATUS_TYPE.COMPLETE)
            } else {
                // 失败  包括部分失败和全部失败
                setImportStatus(ACTION_STATUS_TYPE.FORMATERROR)
            }

            setFailCount(_failCount)
            setTotalCount(_totalCount)
            setErrorList(_failDtoList)
            setErrorFileUrl(_failFileUrl)
            // 更新导入数据
            // onOk(_importStatus === ACTION_STATUS_TYPE.COMPLETE, res, currentFile)
        }
    }

    // 标准导入
    const { run: runImportResult } = useRequest(getImportResult, {
        manual: true,
        onSuccess: (res: any) => {
            handleImportResult(res, runImportResult)
        },
        debounceWait: 2000,
    })

    // 上传文件改变
    const handleFileChange = (file: UploadFile) => {
        setCurrentFile(file)
        setImportStatus(ACTION_STATUS_TYPE.BEFORE)
    }

    // 开始导入
    const handleStartImport = () => {
        const { name, url } = currentFile?.response ?? {}
        // 获取导入code
        const params: ImportParams = {
            fileName:name,
            fileUrl: url,
            organizationCode: userStore.selectedOrganization,
        }

        getImportCode(importApi, params).then((code: any) => {
            // 修改导入状态为导入中中
            setImportStatus(ACTION_STATUS_TYPE.PENDING)
            // 记录当前的导入记录code，用于轮询
            setImportCode(code)
            // 轮询结果
            runImportResult({
                code,
            })
        })
    }

    // 导入完成
    const handleImportDone = () => {
        if (importStatus !== ACTION_STATUS_TYPE.PENDING) {
            setImportStatus(ACTION_STATUS_TYPE.WAITING)
            onCancel()
        } else {
            Modal.confirm({
                centered: true,
                title: '弹窗关闭后，数据仍继续导入',
                content: '您可以在【机构中心-批量操作】列表页，查看具体的导入进度及结果',
                onOk: () => {
                    setImportStatus(ACTION_STATUS_TYPE.WAITING)
                    onCancel()
                },
            })
        }
    }

    // 继续导入
    const handleImportContinue = () => {
        setImportStatus(ACTION_STATUS_TYPE.WAITING)
        setProgress('0.00') // 清空进度条
    }

    const renderFooter = () => {
        if ([ACTION_STATUS_TYPE.WAITING, ACTION_STATUS_TYPE.BEFORE].includes(importStatus)) {
            return (
                <Button
                    type="primary"
                    disabled={importStatus === ACTION_STATUS_TYPE.WAITING}
                    onClick={() => {
                        handleStartImport()
                    }}
                >
                    开始导入
                </Button>
            )
        }

        if (importStatus === ACTION_STATUS_TYPE.PENDING) {
            return (
                <Button type="primary" onClick={() => {
                    PTHistory.push(
                        'location',
                        `/organization/action`,
                    )
                }}>
                    批量操作记录
                </Button>
            )
        }

        if ([ACTION_STATUS_TYPE.COMPLETE, ACTION_STATUS_TYPE.FORMATERROR].includes(importStatus)) {
            return (
                <>
                    <Button onClick={handleImportDone}>
                        {importStatus === ACTION_STATUS_TYPE.COMPLETE ? '完成' : '取消'}
                    </Button>
                    {importStatus === ACTION_STATUS_TYPE.COMPLETE && showContinue && (
                        <Button type="primary" onClick={handleImportContinue}>
                            继续导入
                        </Button>
                    )}
                    {importStatus === ACTION_STATUS_TYPE.FORMATERROR && (
                        <Button type="primary" onClick={handleImportContinue}>
                            再次导入
                        </Button>
                    )}
                </>
            )
        }
    }

    return (
        <Modal
            title={title || '批量导入'}
            open={open}
            width={948}
            className={styles.batch_import_modal}
            footer={renderFooter()}
            onCancel={handleImportDone}
        >
            {/* 导入前（上传文件） */}
            {[ACTION_STATUS_TYPE.WAITING, ACTION_STATUS_TYPE.BEFORE].includes(importStatus) && (
                <Before
                    onChange={handleFileChange}
                    description={description}
                    importTemplate={importTemplate}
                    subject={subject}
                    uploadTips={uploadTips}
                    accept={accept}
                    uploadParams={uploadParams}
                    failApi={failApi}
                />
            )}

            {/* 导入中 */}
            {importStatus === ACTION_STATUS_TYPE.PENDING && (
                <Loading progress={progress!} file={currentFile!} />
            )}

            {/* 导入成功 */}
            {importStatus === ACTION_STATUS_TYPE.COMPLETE && <Resolved totalCount={totalCount} />}

            {/* 导入失败 */}
            {importStatus === ACTION_STATUS_TYPE.FORMATERROR && (
                <Rejected
                    failApi={failApi}
                    totalCount={totalCount}
                    failCount={failCount}
                    errorList={errorList}
                    errorFileUrl={errorFileUrl!}
                    importCode={importCode}
                />
            )}
        </Modal>
    )
}

export default BatchImport
