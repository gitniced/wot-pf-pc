import React, { useState } from 'react'
import styles from './index.module.less'
import type { StudentHomeworkDto } from './interface'
import { Button, Tooltip } from 'antd'
import GlobalUpload from '@/components/GlobalUpload'
import { UploadOutlined } from '@ant-design/icons'
import { downloadFileByUrl } from '@/utils/file'
import { Link, useLocation, useParams } from 'umi'
import Store from '../StepComponents/store'
import { inject, observer, useLocalObservable } from 'mobx-react'
import type { HomeworkStatusStatisticsDto } from '../StepComponents/interface'
import type { PageProps } from '@/types'
import { TaskGuideModal } from '@/components/AIComp/TaskGuideModal'
import aiStore from '@/modules/ai/store'
// import dayjs from 'dayjs'

const StepHomeworkItem = ({
    homework,
    isTeacher,
    homeworkStat,
    userStore,
}: {
    homework: StudentHomeworkDto
    isTeacher: boolean
    homeworkStat: HomeworkStatusStatisticsDto
} & PageProps) => {
    const { scheduleCode } = useParams<{ scheduleCode: string }>()
    const {
        query: { activityCode = '' },
    } = useLocation<{ query: { activityCode: string } }>()
    const store = useLocalObservable(() => new Store())

    const { submitHomeworkEdit, submitAllHomework, onHomeworkEdit } = store

    const { studentData } = userStore || {}
    const { organizationCode, majorCode } = studentData || {}

    const { pendingCount = 0, submittedCount = 0, gradedCount = 0 } = homeworkStat || {}
    const [params, setParams] = useState<any>({})

    const [close, setClose] = useState(false)
    const {
        comment,
        homeworkCode,
        homeworkName,
        contentInfo,
        objectives,
        requirements,
        editFormat,
        fileFormat,
        submissionStatus,
        score,
        templateInfo,
        loading,
        sessionCode,
    } = homework || {}
    /** 不展示上传和编辑的状态列表 */
    const noUploadAndEditStatus: string[] = ['2', '3']
    /** 展示提交的状态列表 */
    const canSubmitStatus: string[] = ['0', '1']

    const toggleClose = () => {
        setClose(!close)
    }

    return (
        <div className={[styles.homework_content_item, close ? styles.close : ''].join(' ')}>
            <div className={styles.homework_content_item_top}>
                <div className={styles.homework_sign} />

                <div className={styles.homework_name}>{homeworkName}</div>
                {/* TODO: 添加ai助教按钮逻辑 */}
                {/* 非教师展示ai助教按钮 */}
                {!isTeacher && (
                    <div
                        className={styles.ai_btn}
                        onClick={() =>
                            setParams({
                                courseCode: aiStore.exchangeData.courseCode,
                                sessionCode,
                                bizType: '21',
                                taskCode: homeworkCode,
                            })
                        }
                    />
                )}

                <div className={styles.homework_right}>
                    {!isTeacher ? (
                        <>
                            {String(submissionStatus) !== '3' ? (
                                <div className={styles.homework_status}>
                                    <div
                                        className={[
                                            styles.homework_status_sign,
                                            String(submissionStatus) === '2' ? styles.green : '',
                                        ].join(' ')}
                                    />
                                    <div className={styles.homework_status_name}>
                                        {canSubmitStatus.includes(String(submissionStatus))
                                            ? '未提交'
                                            : '已提交'}
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.homework_score}>
                                    <div className={styles.homework_score_value}>
                                        {String(submissionStatus) === '3' ? score : 0}分
                                    </div>
                                    <Tooltip title={`${comment ? comment : '评语'}`}>
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref={`#Info-Circle`} />
                                        </svg>
                                    </Tooltip>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.homework_teacher_status}>
                            <div className={styles.homework_teacher_status_warring}>
                                <span>{pendingCount}</span>待提交/
                            </div>
                            <div className={styles.homework_teacher_status_normal}>
                                <span>{submittedCount}</span>待批改/
                            </div>
                            <div className={styles.homework_teacher_status_normal}>
                                <span>{gradedCount}</span>已批改
                            </div>
                            <Link
                                className={styles.homework_teacher_status_btn}
                                to={`/homework/${homeworkCode}?scheduleCode=${scheduleCode}`}
                                target={'_blank'}
                            >
                                查看
                            </Link>
                        </div>
                    )}
                    <svg
                        className={['icon', styles.homework_arrow].join(' ')}
                        aria-hidden="true"
                        onClick={e => {
                            e.stopPropagation()
                            toggleClose()
                        }}
                    >
                        <use xlinkHref={`#Down`} />
                    </svg>
                </div>
            </div>

            <div className={styles.homework_content_item_bottom}>
                <div className={styles.homework_info_item}>
                    <div className={styles.homework_info_item_title}>作业考核目标：</div>
                    <div className={styles.homework_info_item_value}>{objectives}</div>
                </div>

                <div className={styles.homework_info_item}>
                    <div className={styles.homework_info_item_title}>任务要求：</div>
                    <div className={styles.homework_info_item_value}>{requirements}</div>
                </div>

                {String(editFormat) === '2' && templateInfo ? (
                    <div className={styles.homework_info_item}>
                        <div className={styles.homework_info_item_title}>参考模版：</div>
                        <div className={styles.homework_info_item_value}>
                            <div className={styles.homework_info_item_value_file}>
                                <div className={styles.uploaded}>
                                    <div className={styles.file_sign}>
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref={`#Attachment`} />
                                        </svg>
                                    </div>
                                    {homeworkName}-模版
                                    <div
                                        className={styles.download}
                                        onClick={e => {
                                            e.stopPropagation()
                                            downloadFileByUrl(templateInfo!, `${homeworkName}-模版`)
                                        }}
                                    >
                                        下载
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                {!isTeacher && (
                    <>
                        {String(editFormat) === '2' ? (
                            <>
                                {noUploadAndEditStatus.includes(String(submissionStatus)) ? (
                                    <div className={styles.homework_info_item}>
                                        <div className={styles.homework_info_item_title}>
                                            作业：
                                        </div>
                                        <div className={styles.homework_info_item_value}>
                                            <div className={styles.homework_info_item_value_file}>
                                                <div className={styles.uploaded}>
                                                    <div className={styles.file_sign}>
                                                        <svg className="icon" aria-hidden="true">
                                                            <use xlinkHref={`#Attachment`} />
                                                        </svg>
                                                    </div>
                                                    {homeworkName}
                                                    <div
                                                        className={styles.download}
                                                        onClick={e => {
                                                            e.stopPropagation()
                                                            downloadFileByUrl(
                                                                contentInfo!,
                                                                homeworkName,
                                                            )
                                                        }}
                                                    >
                                                        下载
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.homework_info_item}>
                                        <div className={styles.homework_info_item_title}>
                                            作业：
                                        </div>
                                        <div className={styles.homework_info_item_value}>
                                            <div className={styles.homework_info_item_value_file}>
                                                <div className={styles.upload}>
                                                    <GlobalUpload
                                                        amount={1}
                                                        size={20}
                                                        accept={['excel', 'pdf', 'word', 'ppt']}
                                                        drag={false}
                                                        type={18}
                                                        onChange={fileList => {
                                                            if (
                                                                Array.isArray(fileList) &&
                                                                fileList.length > 0
                                                            ) {
                                                                const latestFile =
                                                                    fileList[fileList.length - 1]
                                                                const { response } = latestFile

                                                                if (response?.url) {
                                                                    submitHomeworkEdit(
                                                                        scheduleCode,
                                                                        homeworkCode!,
                                                                        response?.url,
                                                                    )
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        {/* @ts-ignore */}
                                                        <Button
                                                            icon={<UploadOutlined />}
                                                            className={styles.upload_btn}
                                                        >
                                                            上传文件
                                                        </Button>
                                                    </GlobalUpload>
                                                    <div className={styles.extra}>
                                                        支持扩展名：.rar .zip .doc .docx .pdf
                                                        .jpg...
                                                    </div>
                                                    {canSubmitStatus.includes(
                                                        String(submissionStatus),
                                                    ) ? (
                                                        <Button
                                                            type={'primary'}
                                                            className={styles.btn}
                                                            onClick={e => {
                                                                e.stopPropagation()
                                                                submitAllHomework(
                                                                    homeworkCode!,
                                                                    activityCode,
                                                                )
                                                            }}
                                                        >
                                                            提交
                                                        </Button>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : null}

                        {String(editFormat) === '1' ? (
                            <>
                                {noUploadAndEditStatus.includes(String(submissionStatus)) ? (
                                    <div className={styles.homework_info_item}>
                                        <div className={styles.homework_info_item_title}>
                                            作业：
                                        </div>
                                        <div className={styles.homework_info_item_value}>
                                            <div className={styles.homework_info_item_value_online}>
                                                <Link
                                                    to={`/office/${fileFormat}/${contentInfo}?preview=true`}
                                                    target={'_blank'}
                                                >
                                                    <div className={styles.online_item}>
                                                        <div className={styles[fileFormat!]} />
                                                        {homeworkName}
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.homework_info_item}>
                                        <div className={styles.homework_info_item_title}>
                                            作业：
                                        </div>
                                        <div className={styles.homework_info_item_value}>
                                            <div className={styles.homework_info_item_value_online}>
                                                <div className={styles.online_item}>
                                                    <div className={styles[fileFormat!]} />
                                                    {homeworkName}
                                                </div>
                                                {canSubmitStatus.includes(
                                                    String(submissionStatus),
                                                ) ? (
                                                    <div className={styles.online_btn_content}>
                                                        <Button
                                                            loading={loading}
                                                            className={styles.btn}
                                                            type={'default'}
                                                            onClick={e => {
                                                                e.stopPropagation()
                                                                onHomeworkEdit(
                                                                    organizationCode!,
                                                                    majorCode!,
                                                                    scheduleCode,
                                                                    homeworkCode!,
                                                                    homeworkName!,
                                                                    templateInfo!,
                                                                    fileFormat!,
                                                                )
                                                            }}
                                                        >
                                                            编辑
                                                        </Button>
                                                        <Button
                                                            className={styles.btn}
                                                            type={'primary'}
                                                            onClick={e => {
                                                                e.stopPropagation()
                                                                submitAllHomework(
                                                                    homeworkCode!,
                                                                    activityCode,
                                                                )
                                                            }}
                                                        >
                                                            提交
                                                        </Button>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : null}
                    </>
                )}
            </div>
            <TaskGuideModal
                open={params?.courseCode}
                onCancel={() => setParams({})}
                params={params}
            />
        </div>
    )
}

export default inject('userStore')(observer(StepHomeworkItem))
