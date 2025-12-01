// 监考任务列表
import styles from './index.module.less'
import { Select, Button, message } from 'antd'
import InvigilateStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect, useMemo } from 'react'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { StuItem, LocationParams } from './interface'
import {
    STU_STATE_OPTIONS,
    SIGN_STATE_OPTIONS,
    ALL_STATE,
    DELAY_STATE_OPTIONS,
    MARK_STATE_OPTIONS,
    EXAM_STATE_ENUM,
} from './constants'
import { useLocation } from 'umi'
import ExamDetail from './ExamDetail'
import useUserStore from '@/hooks/useUserStore'
import BusinessTable from '@/components/BusinessTable'
import { downloadUrlFile } from '@/utils/tool'
import dayjs from 'dayjs'

const ExamRecord = () => {
    const store = useLocalObservable(() => InvigilateStore)
    const { examDetail, getStuList, getExamDetail } = store
    const { query: routeQuery } = useLocation() as LocationParams

    const userStore = useUserStore()

    useEffect(() => {
        document.title = '考试记录'
        getExamDetail(routeQuery.examCode)
    }, [])

    const desensitizationList = [
        {
            key: 'stuName',
            type: '1',
            sign: true,
        },
        {
            key: 'certNumber',
            type: '4',
        },
    ]

    const columns = useMemo(() => {
        return [
            {
                title: '考生姓名',
                dataIndex: 'stuName',
                search: true,
                width: 120,
                ellipsis: true,
                formItemProps: {
                    name: 'stuName',
                    label: '考生姓名',
                },
            },
            {
                title: '证件号码',
                dataIndex: 'certNumber',
                search: true,
                width: 240,
                formItemProps: {
                    name: 'certNumber',
                    label: '证件号码',
                },
            },
            {
                title: '准考证号',
                dataIndex: 'admissionTicketNumber',
                search: true,
                width: 240,
                formItemProps: {
                    name: 'admissionTicketNumber',
                    label: '准考证号',
                },
            },
            {
                title: '座位号',
                dataIndex: 'seatNumber',
                width: 100,
            },
            {
                title: '考生考试状态',
                dataIndex: 'stuState',
                render: val => {
                    const curSignType = STU_STATE_OPTIONS.find(item => item.value === val)
                    return (
                        <div className={styles.stuStateText}>
                            <span className={styles.circle} style={curSignType?.style} />
                            {curSignType?.label}
                        </div>
                    )
                },
                search: true,
                renderFormItem: () => {
                    return (
                        <Select
                            placeholder="请选择"
                            options={STU_STATE_OPTIONS.map(item => {
                                return { label: item.label, value: item.value }
                            })}
                            defaultValue={ALL_STATE.value}
                        />
                    )
                },
                width: 160,
                formItemProps: {
                    label: '考生考试状态',
                    name: 'stuState',
                    labelCol: { span: 7.5 },
                },
            },
            {
                title: '考生签到状态',
                dataIndex: 'signState',
                render: val => {
                    const curSignType = SIGN_STATE_OPTIONS.find(item => item.value === val)
                    return (
                        <div className={styles.stuStateText}>
                            <span className={styles.circle} style={curSignType?.style} />
                            {curSignType?.label}
                        </div>
                    )
                },
                search: true,
                renderFormItem: () => {
                    return (
                        <Select
                            placeholder="请选择"
                            options={SIGN_STATE_OPTIONS.map(item => {
                                return { label: item.label, value: item.value }
                            })}
                            defaultValue={ALL_STATE.value}
                        />
                    )
                },
                width: 160,
                formItemProps: {
                    label: '考生签到状态',
                    name: 'signState',
                    labelCol: { span: 7.5 },
                },
            },
            {
                title: '交卷时间',
                dataIndex: 'submitAt',
                width: 220,
                render: val => (val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : '--'),
            },
            {
                title: '被提醒次数',
                dataIndex: 'reminderCount',
                width: 120,
                render: val => (val ? `${val}次` : '--'),
            },
            {
                title: '延时',
                dataIndex: 'delayCount',
                width: 100,
                formItemProps: {
                    label: '是否延时',
                    initialValue: null,
                    name: 'delayState',
                },
                renderFormItem: () => <Select options={DELAY_STATE_OPTIONS} />,
                render: val => (val ? `${val}分钟` : '--'),
            },
            {
                title: '标记',
                dataIndex: 'remark',
                width: 160,
                formItemProps: {
                    label: '是否标记',
                    name: 'remarkState',
                    initialValue: null,
                },
                renderFormItem: () => <Select options={MARK_STATE_OPTIONS} />,
                ellipsis: true,
                render: val => val || '--',
            },
        ] as ColumnsTypeItem<StuItem>[]
    }, [examDetail])

    const handleExport = () => {
        if (examDetail.examState !== EXAM_STATE_ENUM.FINISHED) {
            return message.error('考试结束后可导出')
        }

        store.getExportRecord(store.exportParams).then((res: any) => {
            downloadUrlFile(
                res,
                `考试记录${dayjs(examDetail?.startTime).format('YYYY-MM-DD')}(${
                    examDetail.jobStr
                })——${examDetail.title}.xlsx`,
            )
        })
    }

    return (
        <div className={styles.page_exam_record}>
            <ExamDetail {...examDetail} />

            <div className={styles.page_stu_list}>
                <BusinessTable
                    // @ts-ignore
                    desensitizationList={desensitizationList}
                    // @ts-ignore
                    request={(params: any) =>
                        getStuList({
                            ...params,
                            organizationCode: userStore?.selectedOrganization,
                            examCode: routeQuery.examCode,
                        })
                    }
                    columns={columns}
                    formProps={{ labelWrap: false }}
                    rowKey={'stuCode'}
                    // @ts-ignore
                    renderOptionBar={() => (
                        <Button type="primary" onClick={handleExport}>
                            导出考试记录
                        </Button>
                    )}
                />
            </div>
        </div>
    )
}

export default observer(ExamRecord)
