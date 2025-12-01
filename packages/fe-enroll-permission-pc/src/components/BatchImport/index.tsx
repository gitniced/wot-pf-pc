// 批量导入

import { Button, Modal, message } from 'antd'

import type { BatchImportProps, FailRecordItem, ImportParams } from './interface'

import Before from './Before'

import styles from './index.module.less'
import { useImperativeHandle, useState } from 'react'
import { IMPORT_STATUS_ENUM } from './constant'
import type { UploadFile } from 'antd/es/upload/interface'
import { getImportCode, getImportResult } from './api'
import { useRequest } from 'ahooks'
import Loading from './Loading'
import Resolved from './Resolved'
import Rejected from './Rejected'
import type { UserStore } from '@/stores/userStore'
import React from 'react'

type IBatchImportProps = BatchImportProps & {
    userStore: UserStore
}

const BatchImport = React.forwardRef((props: IBatchImportProps, ref: any) => {
    const { importFile, userStore, onOk, onReset } = props

    const { userData } = userStore

    const [importStatus, setImportStatus] = useState<number>(IMPORT_STATUS_ENUM.BEFORE)
    const [currentFile, setCurrentFile] = useState<UploadFile | undefined>(importFile)
    const [importCode, setImportCode] = useState<string>()

    const [failCount, setFailCount] = useState<number>(0)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [errorList, setErrorList] = useState<FailRecordItem[]>([])
    const [errorFileUrl, setErrorFileUrl] = useState<string>()

    const [open, setOpen] = useState<boolean>(false)

    // 上传进度
    const [progress, setProgress] = useState<string>()

    const organizationCode = userData?.selectedOrganization || userData?.defaultOrganization

    const { run: runImportResult, cancel } = useRequest(code => getImportResult(code), {
        manual: true,
        onSuccess: (res: any) => {
            const {
                isFinish, // 是否完成
                isError, // 是否报错
                errorMsg, // 错误信息
                errorLines, // 导入失败的记录
                failCount: _failCount, // 失败条数
                successCount: _successCount, // 成功条数
                failFileUrl: _failFileUrl, // 失败的url
            } = res ?? {}
            if (isError) {
                // 提示报错信息并取消轮询
                message.error(errorMsg)
                cancel()
                return
            }

            if (!isFinish) {
                runImportResult(importCode!)
                setProgress('100')
            } else {
                // 设置结果状态
                if (_failCount === 0) {
                    // 全部成功
                    setImportStatus(IMPORT_STATUS_ENUM.RESOLVED)
                } else {
                    // 失败  包括部分失败和全部失败
                    setImportStatus(IMPORT_STATUS_ENUM.REJECTED)
                }
                setFailCount(_failCount)
                setTotalCount(_failCount + _successCount)
                setErrorList(errorLines)
                setErrorFileUrl(_failFileUrl)
            }
        },
        debounceWait: 2000,
    })

    // 上传文件改变
    const handleFileChange = (file: UploadFile) => {
        setCurrentFile(file)
        importFile && onReset()
    }

    // 开始导入
    const handleStartImport = (values: ImportParams, file?: UploadFile) => {
        const { url } = file?.response ?? {}
        // 获取导入code
        const params: ImportParams = {
            ...values,
            fileUrl: url,
            organizationCode,
        }

        getImportCode(params).then((code: any) => {
            // 显示导入状态弹窗
            setOpen(true)
            // 修改导入状态为导入中中
            setImportStatus(IMPORT_STATUS_ENUM.LOADING)
            // 记录当前的导入记录code，用于轮询
            setImportCode(code)
            // 轮询结果
            runImportResult(code)
        })
    }

    useImperativeHandle(ref, () => {
        return {
            validate: () => {
                return new Promise((resolve, reject) => {
                    if (!currentFile) {
                        message.error('请先上传文件')
                        reject('请先上传文件')
                    }
                    resolve(true)
                })
            },
            handleStartImport: (values: ImportParams) => handleStartImport(values, currentFile),
        }
    })

    // 导入完成
    const handleImportDone = () => {
        // 如果全部失败了，关闭弹窗，不进行下一步

        // 是否全部导入失败
        const isAllFail = failCount === totalCount
        if (!isAllFail) {
            onOk(importCode!, currentFile!)
        }

        setImportStatus(IMPORT_STATUS_ENUM.NONE)
        setOpen(false)
    }

    const renderFooter = () => {
        if (importStatus === IMPORT_STATUS_ENUM.LOADING) {
            return <Button onClick={handleImportDone}>关闭</Button>
        }

        if ([IMPORT_STATUS_ENUM.RESOLVED, IMPORT_STATUS_ENUM.REJECTED].includes(importStatus)) {
            return <Button onClick={handleImportDone}>完成</Button>
        }
    }

    return (
        <>
            {/* 导入前（上传文件） */}
            <Before onChange={handleFileChange} currentFile={currentFile} />

            <Modal
                centered
                title="批量导入"
                open={open}
                width={648}
                className={styles.batch_import_modal}
                footer={renderFooter()}
                onCancel={handleImportDone}
            >
                {/* 导入中 */}
                {importStatus === IMPORT_STATUS_ENUM.LOADING && (
                    <Loading progress={progress!} file={currentFile!} />
                )}

                {/* 导入成功 */}
                {importStatus === IMPORT_STATUS_ENUM.RESOLVED && (
                    <Resolved totalCount={totalCount} />
                )}

                {/* 导入失败 */}
                {importStatus === IMPORT_STATUS_ENUM.REJECTED && (
                    <Rejected
                        totalCount={totalCount}
                        failCount={failCount}
                        errorList={errorList}
                        errorFileUrl={errorFileUrl!}
                    />
                )}
            </Modal>
        </>
    )
})

export default BatchImport
