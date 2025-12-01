// 批量导入

import { Button, Modal } from 'antd'

import type { BatchImportProps, FailRecordItem, ImportParams } from './interface'

import Before from './Before'

import styles from './index.module.less'
import { useState } from 'react'
import { IMPORT_STATUS_ENUM, IMPORT_TYPE_ENUM } from './constant'
import type { UploadFile } from 'antd/es/upload/interface'
import { getImportCode, getImportResult, getImportAuthenticateResult } from './api'
import { useRequest } from 'ahooks'
import Loading from './Loading'
import { findSiteData } from '@wotu/wotu-components'
import Resolved from './Resolved'
import Rejected from './Rejected'
import {
    BELONG_TYPE_ENUM,
    SKILL_TYPE_ENUM,
    SUBJECT_TYPE_ENUM,
} from '@/pages/question/[type]/constants'
import useUserStore from '@/hooks/useUserStore'
import useSiteStore from '@/hooks/useSiteStore'

const BatchImport = (props: BatchImportProps) => {
    const userStore = useUserStore()
    const siteStore = useSiteStore()

    const {
        skill,
        subject,
        open,
        onCancel,
        onOk,
        importApi,
        businessType,
        description,
        practiceCode,
        importTemplate,
        authenticateCode,
        templateType,
        title,
        commonJob = [],
        showContinue = true,
        importFileType = 'excel',
    } = props

    const [importStatus, setImportStatus] = useState<number>(IMPORT_STATUS_ENUM.NONE)
    const [currentFile, setCurrentFile] = useState<UploadFile>()
    const [importCode, setImportCode] = useState<string>()

    const [failCount, setFailCount] = useState<number>(0)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [errorList, setErrorList] = useState<FailRecordItem[]>([])
    const [errorFileUrl, setErrorFileUrl] = useState<string>()

    // 上传进度
    const [progress, setProgress] = useState<string>()

    const organizationCode = userStore?.selectedOrganization || userStore?.defaultOrganization

    // 处理导入结果
    const handleImportResult = (res: any, callback: any) => {
        const {
            rate,
            importStatus: _importStatus,
            failCount: _failCount,
            totalCount: _totalCount,
            failFileUrl: _failFileUrl,
            failDtoList: _failDtoList = [],
        } = res ?? {}
        if (![IMPORT_STATUS_ENUM.RESOLVED, IMPORT_STATUS_ENUM.REJECTED].includes(_importStatus)) {
            setProgress(rate)
            authenticateCode
                ? callback(importCode)
                : callback({
                      businessType,
                      code: importCode!,
                      organizationCode,
                  })
        } else {
            // 设置结果状态
            if (_failCount === 0 && _totalCount! > 0) {
                // 全部成功
                setImportStatus(IMPORT_STATUS_ENUM.RESOLVED)
            } else {
                // 失败  包括部分失败和全部失败
                setImportStatus(IMPORT_STATUS_ENUM.REJECTED)
            }

            setFailCount(_failCount)
            setTotalCount(_totalCount)
            setErrorList(_failDtoList)
            setErrorFileUrl(_failFileUrl)
            // 更新导入数据
            onOk(_importStatus === IMPORT_STATUS_ENUM.RESOLVED, res, currentFile)
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

    // 上海要素细目表定制
    const { run: runAuthenticateImportResult } = useRequest(getImportAuthenticateResult, {
        manual: true,
        onSuccess: (res: any) => {
            handleImportResult(res, runAuthenticateImportResult)
        },
        debounceWait: 2000,
    })

    // 上传文件改变
    const handleFileChange = (file: UploadFile) => {
        setCurrentFile(file)
        setImportStatus(IMPORT_STATUS_ENUM.BEFORE)
    }

    // 开始导入
    const handleStartImport = () => {
        const { name, url } = currentFile?.response ?? {}
        const [jobNameObj, jobTypeObj, jobLevelObj] = commonJob
        // 获取导入code
        const params: ImportParams = {
            name,
            url,
            organizationCode,
            practiceCode,
            templateType,
        }

        if (commonJob.length) {
            params.commonJob = {
                jobNameCode: jobNameObj.value,
                jobName: jobNameObj.label,
                jobType: jobTypeObj.label,
                jobTypeCode: jobTypeObj.value,
                jobLevel: jobLevelObj.label,
                jobLevelCode: jobLevelObj.value,
            }
        }

        if (businessType === IMPORT_TYPE_ENUM.QUESTION_EXCEL) {
            params.belongType = BELONG_TYPE_ENUM.ORGANIZE
            params.skill = skill || SKILL_TYPE_ENUM.THEORY
            params.subject = subject || SUBJECT_TYPE_ENUM.SIMULATION
        }

        getImportCode(importApi, params).then((code: any) => {
            // 修改导入状态为导入中中
            setImportStatus(IMPORT_STATUS_ENUM.LOADING)
            // 记录当前的导入记录code，用于轮询
            setImportCode(code)
            // 轮询结果
            runImportResult({
                code,
                businessType,
                organizationCode,
            })
        })
    }

    // 开始导入（上海要素细目表定制）
    const handleStartImportAuthenticate = () => {
        const { url } = currentFile?.response ?? {}
        // 获取导入code
        const params: ImportParams = {
            url,
            authenticateCode,
            templateType,
        }

        getImportCode(importApi, params).then((code: any) => {
            // 修改导入状态为导入中中
            setImportStatus(IMPORT_STATUS_ENUM.LOADING)
            // 记录当前的导入记录code，用于轮询
            setImportCode(code)
            // 轮询结果（上海要素细目表定制）
            runAuthenticateImportResult(code)
        })
    }

    // 查看批量操作记录
    const handleCheckImportRecord = () => {
        const { siteData } = siteStore
        const loginUrl = findSiteData(siteData, 'pcDomain', { findKey: 'baseInfo' })

        window.open(`${loginUrl}/account/organization/action`, '_blank')
    }

    // 导入完成
    const handleImportDone = () => {
        if (importStatus !== IMPORT_STATUS_ENUM.LOADING) {
            setImportStatus(IMPORT_STATUS_ENUM.NONE)
            onCancel()
        } else {
            Modal.confirm({
                centered: true,
                title: '弹窗关闭后，数据仍继续导入',
                content: '您可以在【机构中心-批量操作】列表页，查看具体的导入进度及结果',
                onOk: () => {
                    setImportStatus(IMPORT_STATUS_ENUM.NONE)
                    onCancel()
                },
            })
        }
    }

    // 继续导入
    const handleImportContinue = () => {
        setImportStatus(IMPORT_STATUS_ENUM.NONE)
        setProgress('0.00') // 清空进度条
    }

    const renderFooter = () => {
        if ([IMPORT_STATUS_ENUM.NONE, IMPORT_STATUS_ENUM.BEFORE].includes(importStatus)) {
            return (
                <Button
                    type="primary"
                    disabled={importStatus === IMPORT_STATUS_ENUM.NONE}
                    onClick={() => {
                        if (authenticateCode) {
                            handleStartImportAuthenticate()
                        } else {
                            handleStartImport()
                        }
                    }}
                >
                    开始导入
                </Button>
            )
        }

        if (importStatus === IMPORT_STATUS_ENUM.LOADING) {
            return (
                <Button type="primary" onClick={handleCheckImportRecord}>
                    批量操作记录
                </Button>
            )
        }

        if ([IMPORT_STATUS_ENUM.RESOLVED, IMPORT_STATUS_ENUM.REJECTED].includes(importStatus)) {
            return (
                <>
                    <Button onClick={handleImportDone}>
                        {importStatus === IMPORT_STATUS_ENUM.RESOLVED ? '完成' : '取消'}
                    </Button>
                    {importStatus === IMPORT_STATUS_ENUM.RESOLVED && showContinue && (
                        <Button type="primary" onClick={handleImportContinue}>
                            继续导入
                        </Button>
                    )}
                    {importStatus === IMPORT_STATUS_ENUM.REJECTED && (
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
            title={subject && [SUBJECT_TYPE_ENUM.REAL, SUBJECT_TYPE_ENUM.COMPETITION].includes(subject) ? title : '批量导入'}
            open={open}
            width={648}
            className={styles.batch_import_modal}
            footer={renderFooter()}
            onCancel={handleImportDone}
        >
            {/* 导入前（上传文件） */}
            {[IMPORT_STATUS_ENUM.NONE, IMPORT_STATUS_ENUM.BEFORE].includes(importStatus) && (
                <Before
                    onChange={handleFileChange}
                    description={description}
                    importTemplate={importTemplate}
                    subject={subject}
                    practiceCode={practiceCode}
                    importFileType={importFileType}
                />
            )}

            {/* 导入中 */}
            {importStatus === IMPORT_STATUS_ENUM.LOADING && (
                <Loading progress={progress!} file={currentFile!} />
            )}

            {/* 导入成功 */}
            {importStatus === IMPORT_STATUS_ENUM.RESOLVED && <Resolved totalCount={totalCount} />}

            {/* 导入失败 */}
            {importStatus === IMPORT_STATUS_ENUM.REJECTED && (
                <Rejected
                    totalCount={totalCount}
                    failCount={failCount}
                    errorList={errorList}
                    errorFileUrl={errorFileUrl!}
                    importFileType={importFileType}
                />
            )}
        </Modal>
    )
}

export default BatchImport
