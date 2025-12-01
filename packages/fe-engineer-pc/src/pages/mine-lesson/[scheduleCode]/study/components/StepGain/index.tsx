import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { Link, useLocation, useParams } from 'umi'
import dayjs from 'dayjs'

import styles from './index.module.less'
import type { OutcomeItemDto } from './interface'
import type { CollaborationType } from '../StepComponents/interface'
import { PersonCollaboration, TeamCollaboration } from '../StepComponents/const'
import { downloadFileByUrl } from '@/utils/file'
import GlobalUpload from '@/components/GlobalUpload'
import { inject, observer, useLocalObservable } from 'mobx-react'
import Store from '../StepComponents/store'
import type { PageProps } from '@/types'
import customOpen from '@/utils/customOpen'
import { TaskGuideModal } from '@/components/AIComp/TaskGuideModal'
import aiStore from '@/modules/ai/store'
import Empty from '@/components/Empty'

// 常量定义
const EDIT_FORMAT = {
    ONLINE: '1', // 在线编辑
    FILE: '2', // 文件上传
} as const

const EDIT_STATUS = {
    COMPLETED: 1, // 已编辑/上传
    PENDING: 2, // 未编辑/上传
} as const

/**
 * 自定义上传按钮组件
 */
interface CustomUploadBtnProps {
    data: OutcomeItemDto
    contentUrl: string
    scheduleCode: string
    updateGainItem: (data: OutcomeItemDto, scheduleCode: string) => void
}

const CustomUploadBtn: React.FC<CustomUploadBtnProps> = ({
    data,
    contentUrl,
    scheduleCode,
    updateGainItem,
}) => {
    const [showLoading, setShowLoading] = useState<boolean>(false)
    /**
     * 处理文件上传变化
     */
    const handleFileChange = (fileList: any[]) => {
        if (Array.isArray(fileList) && fileList.length > 0) {
            const latestFile = fileList[fileList.length - 1]
            const { response } = latestFile

            if (response?.url) {
                updateGainItem(
                    {
                        ...data,
                        contentUrl: response.url,
                    },
                    scheduleCode,
                )
            }
        }
    }

    return (
        <GlobalUpload
            drag={false}
            type={18}
            size={100}
            otherProps={{ showUploadList: false, maxCount: 1 }}
            onCustomRequestStart={() => setShowLoading(true)}
            onCustomRequestEnd={() => setShowLoading(false)}
            onChange={handleFileChange}
        >
            <Button type="link" className={styles.text_btn} loading={showLoading}>
                {contentUrl ? '重新上传' : '上传'}
            </Button>
        </GlobalUpload>
    )
}

/**
 * 步骤学习成果组件的属性接口
 */
interface StepGainProps {
    /** 是否为教师 */
    isTeacher: boolean
    /** 收获成果列表 */
    gainList: OutcomeItemDto[]
    /** 协作类型 */
    collaborationType: CollaborationType
    /** 是否为组长 */
    isLeader: boolean
    /** 成果是否已提交 */
    outcomeSubmitted: boolean
}

/**
 * 步骤收获组件
 * 用于展示和管理学习过程中的成果收获
 */
const StepGain: React.FC<StepGainProps & PageProps> = ({
    isTeacher,
    gainList = [],
    collaborationType = TeamCollaboration,
    isLeader = true,
    outcomeSubmitted = false,
    userStore,
}) => {
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const routeQuery = useLocation()
    const {
        //@ts-ignore
        query: { activityCode = '' },
    } = routeQuery || {}
    const { studentData } = userStore || {}
    const { organizationCode, userCode, majorCode } = studentData || {}

    const store = useLocalObservable(() => new Store())

    const { updateGainItem, onStudyGainEdit, submitActivityContent, isGainSubmitting } = store
    const [params, setParams] = useState<any>({})

    let currentGroupCode = ''

    if (gainList.length === 0) {
        return <Empty type="component" style={{ paddingTop: '20px' }} />
    }

    return (
        <div className={styles.gain_content}>
            {gainList.map(item => {
                const {
                    code,
                    /** 编辑/上传内容链接 */
                    contentUrl,
                    /** 协作类型 1-个人，2-团队*/
                    type,
                    /** 关联小组编码（仅团队成果） */
                    groupCode,
                    /** 编辑格式(1-在线，2-文件) */
                    editFormat,
                    /** 编辑人姓名 */
                    editName,
                    /** 编辑或上传状态(1-已，2-未) */
                    editStatus,
                    /** 编辑时间 */
                    editTime,
                    /** 文件格式(word-文档，excel-表格，mind-脑图) */
                    fileFormat,
                    /** 成果名称 */
                    name,
                    /** 模版信息(url或文件id) */
                    templateInfo,
                    /** 编辑loading */
                    loading,
                    /** ai助教会话编码 */
                    sessionCode,
                } = item || {}

                currentGroupCode = groupCode || ''

                // 判断是否为文件格式
                const isFileFormat = String(editFormat) === EDIT_FORMAT.FILE
                const hasContent = Boolean(contentUrl)
                const isCompleted = editStatus === EDIT_STATUS.COMPLETED
                /**
                 * 处理模版下载
                 */
                const handleTemplateDownload = (e: React.MouseEvent) => {
                    e.stopPropagation()
                    if (templateInfo) {
                        downloadFileByUrl(templateInfo, `${name}_模版`)
                    }
                }

                /**
                 * 处理查看操作
                 */
                const getViewLink = () => {
                    if (isTeacher) {
                        return `/mine-lesson/${scheduleCode}/study/result?activityCode=${activityCode}&gainCode=${code}`
                    } else {
                        if (isFileFormat) {
                            return contentUrl || ''
                        } else {
                            return `/office/${fileFormat}/${
                                contentUrl || templateInfo
                            }?preview=true`
                        }
                    }
                }

                /**
                 * 处理下载操作
                 */
                const handleDownload = (e: React.MouseEvent) => {
                    e.stopPropagation()
                    if (contentUrl) {
                        downloadFileByUrl(contentUrl, name || '文件')
                    }
                }

                /**
                 * 处理编辑操作
                 */
                const handleEdit = (e: React.MouseEvent) => {
                    e.stopPropagation()
                    console.log(type, groupCode, userCode)
                    if (isFileFormat) {
                        customOpen(contentUrl!, '_blank')
                    } else {
                        const submitterCode =
                            Number(type) === TeamCollaboration ? groupCode : userCode
                        onStudyGainEdit(
                            Number(type) === TeamCollaboration,
                            organizationCode!,
                            majorCode!,
                            scheduleCode,
                            activityCode,
                            code!,
                            name!,
                            submitterCode!,
                            templateInfo!,
                            fileFormat!,
                        )
                    }
                }

                return (
                    <div key={code} className={styles.gain_content_item}>
                        <div
                            className={[
                                styles.file_type,
                                isFileFormat
                                    ? styles.file
                                    : styles[fileFormat as unknown as string],
                            ].join(' ')}
                        />
                        <div className={styles.file_name}>
                            <div className={styles.file_name_text}>{name}</div>
                            {isFileFormat && templateInfo && (
                                <div
                                    className={styles.file_template}
                                    onClick={handleTemplateDownload}
                                >
                                    下载模版
                                </div>
                            )}
                        </div>

                        <div className={styles.file_info}>
                            {isCompleted && editName && editTime && (
                                <>
                                    {editName} {dayjs(editTime).format('YYYY-MM-DD HH:mm')} 更新
                                </>
                            )}
                        </div>

                        {/* TODO: 添加ai助教按钮逻辑 */}
                        {/* 非教师展示ai助教按钮 */}
                        {!isTeacher && (
                            <div
                                className={styles.ai_btn}
                                onClick={() =>
                                    setParams({
                                        courseCode: aiStore.exchangeData.courseCode,
                                        sessionCode,
                                        bizType: '20',
                                        taskCode: code,
                                    })
                                }
                            />
                        )}

                        {/* 操作按钮区域 */}
                        {isTeacher ? (
                            <Link className={styles.text_btn} to={getViewLink()} target={'_blank'}>
                                查看
                            </Link>
                        ) : (
                            <>
                                {isFileFormat ? (
                                    <>
                                        {hasContent && (
                                            <>
                                                {/* <a
                                                    className={styles.text_btn}
                                                    href={getViewLink()}
                                                    target={'_blank'}
                                                    rel="noreferrer"
                                                >
                                                    查看
                                                </a> */}
                                                {/* <div
                                                    className={styles.text_btn}
                                                    onClick={(e: React.MouseEvent) => {
                                                        e.stopPropagation()
                                                        message.warning('该格式不支持在线预览')
                                                    }}
                                                >
                                                    查看
                                                </div> */}
                                                <div
                                                    className={styles.text_btn}
                                                    onClick={handleDownload}
                                                >
                                                    下载
                                                </div>
                                            </>
                                        )}
                                        {!outcomeSubmitted && (
                                            <CustomUploadBtn
                                                data={item}
                                                contentUrl={contentUrl || ''}
                                                scheduleCode={scheduleCode || ''}
                                                updateGainItem={updateGainItem}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {outcomeSubmitted ? (
                                            <Link
                                                className={styles.text_btn}
                                                to={getViewLink()}
                                                target={'_blank'}
                                            >
                                                查看
                                            </Link>
                                        ) : (
                                            <Button
                                                type={'link'}
                                                loading={loading}
                                                className={styles.text_btn}
                                                onClick={handleEdit}
                                            >
                                                编辑
                                            </Button>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                )
            })}

            {/* 提交按钮区域 */}
            {!isTeacher &&
                !outcomeSubmitted &&
                ((collaborationType === TeamCollaboration && isLeader) ||
                    collaborationType === PersonCollaboration) && (
                    <div className={styles.submit_content}>
                        <Button
                            loading={isGainSubmitting}
                            type="primary"
                            onClick={e => {
                                e.stopPropagation()
                                Modal.confirm({
                                    title: '提示',
                                    content: '确定要提交吗？',
                                    centered: true,
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: () => {
                                        submitActivityContent({
                                            scheduleCode,
                                            activityCode,
                                            submissionType: 2,
                                            type: collaborationType,
                                            groupCode:
                                                collaborationType === TeamCollaboration
                                                    ? currentGroupCode
                                                    : undefined,
                                        })
                                    },
                                })
                            }}
                        >
                            提交
                        </Button>
                    </div>
                )}
            <TaskGuideModal
                open={params?.courseCode}
                onCancel={() => setParams({})}
                params={params}
            />
        </div>
    )
}

export default inject('userStore')(observer(StepGain))
