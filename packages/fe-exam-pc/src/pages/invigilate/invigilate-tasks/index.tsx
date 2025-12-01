// 监考任务列表
import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'
import { usePageListConfig } from '@wotu/wotu-components'
import { Select, DatePicker, Typography } from 'antd'
import InvigilateStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { InvigilationItem } from './interface'
import dayjs from 'dayjs'
import {
    PROJECT_TYPE_ENUM,
    PROJECT_TYPE_OPTIONS,
    ALL_STATE,
    SIGN_STATE_OPTIONS,
    EXAM_STATE_OPTIONS,
    SIGN_TYPE_STATE_OPTIONS,
    EXAM_STATE_ENUM,
    SIGN_STATE_ENUM,
    SIGN_TYPE_ENUM,
} from './constants'
import { history } from 'umi'
import useUserStore from '@/hooks/useUserStore'
import BusinessTable from '@/components/BusinessTable'
import { isEmpty } from 'lodash'

const { RangePicker } = DatePicker

const Invigilate = () => {
    const store = useLocalObservable(() => InvigilateStore)
    const userStore = useUserStore()
    const { getPageListConfig } = usePageListConfig()

    const { _getInvigilationTaskList } = store

    const actionRef = useRef<any>()

    useEffect(() => {
        document.title = '监考任务'
    }, [])

    const goPage = (path: string) => {
        history.push(path)
    }

    const [columns] = useState([
        {
            title: '考试名称',
            dataIndex: 'examTitle',
            search: true,
            width: 240,
            ellipsis: true,
        },
        {
            title: '考试开始时间',
            dataIndex: 'examTime',
            search: true,
            formItemProps: {
                label: '考试时间',
                className: 'examTime',
            },
            renderFormItem: () => {
                return <RangePicker showTime />
            },
            width: 240,
            render: (val, record) =>
                record.examStartTime
                    ? dayjs(record.examStartTime).format('YYYY-MM-DD HH:mm:ss')
                    : '未设置',
        },
        {
            title: '考试结束时间',
            dataIndex: 'examEndTime',
            width: 240,
            render: val => (val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : '未设置'),
        },
        {
            title: '关联项目',
            dataIndex: 'projectTitle',
            search: true,
            width: 120,
            ellipsis: true,
        },
        {
            title: '项目类型',
            dataIndex: 'projectType',
            width: 120,
            render: val => {
                const curProjectType = PROJECT_TYPE_OPTIONS.find(item => item.value === val)
                if ([PROJECT_TYPE_ENUM.COMPETITION, PROJECT_TYPE_ENUM.EVALUATION].includes(val)) {
                    return (
                        <span
                            className={styles.project_type}
                            style={{
                                color: curProjectType?.color,
                                borderColor: curProjectType?.color,
                                backgroundColor: curProjectType?.bgColor,
                            }}
                        >
                            {curProjectType?.label}
                        </span>
                    )
                }
            },
            search: true,
            renderFormItem: () => {
                return (
                    <Select
                        placeholder="请选择"
                        options={PROJECT_TYPE_OPTIONS}
                        defaultValue={ALL_STATE.value}
                    />
                )
            },
        },
        {
            title: '考生人数',
            dataIndex: 'stuCount',
            search: false,
            width: 120,
        },
        {
            title: '签到方式',
            dataIndex: 'signType',
            render: val => {
                const curSignType = SIGN_TYPE_STATE_OPTIONS.find(item => item.value === val)
                return curSignType?.label
            },
            search: true,
            renderFormItem: () => {
                return (
                    <Select
                        defaultValue={-1}
                        placeholder="请选择"
                        options={SIGN_TYPE_STATE_OPTIONS.map(item => {
                            return { label: item.label, value: item.value }
                        })}
                    />
                )
            },
            width: 100,
        },
        {
            title: '签到状态',
            dataIndex: 'signState',
            width: 120,
            render: val => {
                const curSignType = SIGN_STATE_OPTIONS.find(item => item.value === val)
                return (
                    <div className={styles.stuStateText}>
                        <span className={styles.circle} style={curSignType?.style} />
                        {curSignType?.label}
                    </div>
                )
            },
        },
        {
            title: '考试状态',
            dataIndex: 'examState',
            width: 100,
            render: val => {
                const curExamType = EXAM_STATE_OPTIONS.find(item => item.value === val)
                return (
                    <div className={styles.stuStateText}>
                        <span className={styles.circle} style={curExamType?.style} />
                        {curExamType?.label}
                    </div>
                )
            },
            search: true,
            renderFormItem: () => {
                return (
                    <Select
                        placeholder="请选择"
                        options={EXAM_STATE_OPTIONS.map(item => {
                            return { label: item.label, value: item.value }
                        })}
                        defaultValue={ALL_STATE.value}
                    />
                )
            },
        },
        {
            title: '操作',
            width: 160,
            order: 11,
            dataIndex: 'options',
            fixed: 'right',
            render: (_, record) => (
                <div className={styles.buttonContainer}>
                    {record.examState === EXAM_STATE_ENUM.ONGOING && (
                        <span
                            onClick={() => {
                                goPage(`/invigilate/invigilate-detail?examCode=${record.examCode}`)
                            }}
                        >
                            监考
                        </span>
                    )}
                    {(record.examState === EXAM_STATE_ENUM.NOT_START ||
                        record.examState === EXAM_STATE_ENUM.FINISHED) && (
                        <span
                            onClick={() => {
                                goPage(`/invigilate/invigilate-detail?examCode=${record.examCode}`)
                            }}
                        >
                            详情
                        </span>
                    )}
                    {/* 签到方式位监考老师端人脸识别 */}
                    {record.signType === SIGN_TYPE_ENUM.TEACHER_FACE_RECOGNITION &&
                        record.signState !== SIGN_STATE_ENUM.NOT_START &&
                        record.signState !== SIGN_STATE_ENUM.NOT_SIGN && (
                            <>
                                {record.signState === SIGN_STATE_ENUM.SIGNING && (
                                    <Typography.Link
                                        href={`${window.location.origin}/sign-center/face-sign-in?signType=1&taskCode=${record.signTaskCode}`}
                                        target="_blank"
                                    >
                                        签到
                                    </Typography.Link>
                                )}
                                {record.signState === SIGN_STATE_ENUM.ENDING && (
                                    <Typography.Link
                                        href={`${window.location.origin}/sign-center/attendance-record?signType=1&taskCode=${record.signTaskCode}`}
                                        target="_blank"
                                    >
                                        签到记录
                                    </Typography.Link>
                                )}
                            </>
                        )}
                </div>
            ),
        },
    ] as ColumnsTypeItem<InvigilationItem>[])

    const getExtraInitParams = () => {
        const pageParams = getPageListConfig('save_params')
        let { examTime } = pageParams

        if (examTime) {
            examTime = examTime.map((v: string) => dayjs(v))
        }
        return { ...pageParams, examTime }
    }

    return (
        <div className={styles.page_invigilate_list}>
            <TitleBlock title="监考任务" />
            <BusinessTable
                actionRef={actionRef}
                columns={columns}
                // @ts-ignore
                request={(params: any) => _getInvigilationTaskList(params)}
                extraInitParams={getExtraInitParams()}
                beforeSearchSubmit={(values: any) => {
                    const { examTime = [], examState = 0, signType = -1 } = values
                    const params: any = {}

                    const [startTime, endTime] = !isEmpty(examTime) ? examTime : []
                    params.startTime = startTime ? dayjs(startTime).startOf('day').valueOf() : null
                    params.endTime = endTime ? dayjs(endTime).endOf('day').valueOf() : null
                    return {
                        ...values,
                        ...params,
                        organizationCode: userStore?.selectedOrganization,
                        examState,
                        signType,
                    }
                }}
            />
        </div>
    )
}

export default observer(Invigilate)
