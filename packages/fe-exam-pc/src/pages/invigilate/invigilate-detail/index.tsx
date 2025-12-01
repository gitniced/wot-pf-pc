// 监考任务列表
import TitleBlock from '@/components/TitleBlock'
import styles from './index.module.less'
import {
    Spin,
    Select,
    Modal,
    Input,
    message,
    InputNumber,
    Dropdown,
    Typography,
    Button,
} from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined, RedoOutlined, WarningFilled } from '@ant-design/icons'
import InvigilateStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type { StuItem, LocationParams, TipsParams, EnumButton, WindingParams } from './interface'
import {
    STU_STATE_ENUM,
    STU_STATE_OPTIONS,
    SIGN_STATE_OPTIONS,
    ALL_STATE,
    BUTTON_ENUM,
    BUTTON_TEXT,
    EXAM_STATE_ENUM,
    IP_STATE_OPTIONS,
    IP_STATE_ENUM,
} from './constants'
import { useLocation } from 'umi'
import ExamDetail from './components/ExamDetail'
import Breadcrumbs from '@/components/Breadcrumbs'
import useUserStore from '@/hooks/useUserStore'
import BusinessTable from '@/components/BusinessTable'
import WindingModal from './components/WindingModal'
import { getCookie, getLocalStorage } from '@/storage'
import IPLimitModal from './components/IPLimitModal'
import { isDemo } from '@/utils/customeFields'

const Invigilate = () => {
    const store = useLocalObservable(() => InvigilateStore)
    const {
        examDetail,
        modalVisible,
        modalTitle,
        modalTitleText,
        selectStuCode,
        isAll,
        randomKey,
        _getStuList,
        _getExamDetail,
        showModal,

        closeModal,

        _sendDelay,
        _sendRemark,
        _sendTips,
        sendAutoWinding,
    } = store
    const { query: routeQuery } = useLocation() as LocationParams

    const userStore = useUserStore()

    const [modalValue, setModalValue] = useState<any>('请认真作答！')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [open, setOpen] = useState(false)

    const windingRef = useRef<{
        onValidate: () => Promise<void>
        onResetFields: () => Promise<void>
    }>()

    const actionRef = useRef({
        reload: () => { }, // 添加 reload 方法
    })

    useEffect(() => {
        document.title = '监考详情'

        _getExamDetail(routeQuery.examCode)
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

    const columns = useMemo(
        () =>
            [
                {
                    title: '考生姓名',
                    dataIndex: 'stuName',
                    search: true,
                    width: 120,
                    ellipsis: true,
                    formItemProps: {
                        name: 'stuName',
                        label: '考生姓名',
                        labelCol: { span: 7 },
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
                        labelCol: { span: 7 },
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
                        labelCol: { span: 7 },
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
                    title: '剩余登录次数',
                    dataIndex: 'loginRemainTimes',
                    hide: examDetail?.loginLimit === 0,
                    width: 160,
                },
                {
                    title: '当前IP',
                    dataIndex: 'ipState',
                    render: (val, record) => {
                        return (
                            <div>
                                {STU_STATE_ENUM.SUBMIT !== record.stuState
                                    ? record.ip || '--'
                                    : '--'}
                                {val === IP_STATE_ENUM.ERROR && (
                                    <WarningFilled style={{ color: '#faad14' }} />
                                )}
                            </div>
                        )
                    },
                    search: true,
                    renderFormItem: () => {
                        return (
                            <Select
                                placeholder="请选择"
                                options={IP_STATE_OPTIONS.map(item => {
                                    return { label: item.label, value: item.value }
                                })}
                                defaultValue={IP_STATE_ENUM.ALL}
                            />
                        )
                    },
                    width: 160,
                    formItemProps: {
                        label: '当前IP状态',
                        name: 'ipState',
                        labelCol: { span: 7.5 },
                    },
                },
                {
                    title: '提醒',
                    dataIndex: 'reminderCount',
                    width: 100,
                    render: val => (val ? `${val}次` : '--'),
                },
                {
                    title: '延时',
                    dataIndex: 'delayCount',
                    width: 100,
                    render: val => (val ? `${val}分钟` : '--'),
                },
                {
                    title: '标记',
                    dataIndex: 'remark',
                    width: 160,
                    ellipsis: true,
                    render: val => val || '--',
                },

                {
                    title: '操作',
                    width: 240,
                    order: 11,
                    fixed: 'right',
                    render: record => (
                        <div className={styles.buttonContainer}>
                            {record.stuState === STU_STATE_ENUM.DOING && (
                                <>
                                    <span
                                        onClick={() => {
                                            showModal(BUTTON_ENUM.TIPS, record)
                                            setModalValue('请认真作答！')
                                        }}
                                    >
                                        提醒
                                    </span>
                                    <span
                                        onClick={() => {
                                            showModal(BUTTON_ENUM.DELAY, record)
                                            setModalValue(undefined)
                                        }}
                                    >
                                        延时
                                    </span>
                                    <span
                                        onClick={() => {
                                            showModal(BUTTON_ENUM.REMARK, record)
                                            setModalValue(undefined)
                                        }}
                                    >
                                        标记
                                    </span>
                                    {
                                        // 如果开启了强制收卷，显示收卷操作
                                        Boolean(examDetail.forcedWinding) && (
                                            <span
                                                onClick={() => {
                                                    showModal(BUTTON_ENUM.WINDING, record)
                                                    setModalValue(undefined)
                                                }}
                                            >
                                                收卷
                                            </span>
                                        )
                                    }
                                </>
                            )}
                        </div>
                    ),
                },
            ] as ColumnsTypeItem<StuItem>[],
        [examDetail],
    )

    const apiMap: Record<
        EnumButton,
        (
            value: any,
            commonParams:
                | Omit<TipsParams, 'reminder'>
                | Omit<WindingParams, 'verifyCode' | 'account'>,
        ) => void
    > = {
        [BUTTON_ENUM.TIPS]: (value, commonParams) => {
            _sendTips({ ...(commonParams as Omit<TipsParams, 'reminder'>), reminder: value }).then(
                () => {
                    actionRef.current.reload()
                },
            )
        },
        [BUTTON_ENUM.DELAY]: (value, commonParams) => {
            _sendDelay({ ...(commonParams as Omit<TipsParams, 'reminder'>), delay: value }).then(
                () => {
                    actionRef.current.reload()
                },
            )
        },
        [BUTTON_ENUM.REMARK]: (value, commonParams) => {
            _sendRemark({ ...(commonParams as Omit<TipsParams, 'reminder'>), remark: value }).then(
                () => {
                    actionRef.current.reload()
                },
            )
        },
        [BUTTON_ENUM.WINDING]: (value, commonParams) => {
            sendAutoWinding({ ...commonParams, ...value }).then(() => {
                actionRef.current.reload()
            })
        },
    }

    //确认提交
    const confirmSubmit = async () => {
        const commonParams = {
            isAllStu: isAll,
            examCode: routeQuery.examCode,
            stuCodeList: selectStuCode,
        }

        if (modalTitle !== BUTTON_ENUM.WINDING) {
            //非空校验
            if (!modalValue) {
                return message.warning('内容必填')
            }
            await apiMap[modalTitle](modalValue, commonParams as TipsParams)
        }

        if (modalTitle === BUTTON_ENUM.WINDING) {
            const params = {
                sid: getLocalStorage('SID'),
                userCode: userStore?.userData.code,
                examCode: routeQuery.examCode,
                stuCode: selectStuCode[0],
                key: randomKey!,
            }
            windingRef.current?.onValidate().then(values => {
                // 二次确认
                Modal.confirm({
                    centered: true,
                    content: '强制收卷后，考生将无法继续答题、无法重新进入考试，是否确定收卷？',
                    onOk: () =>
                        apiMap[modalTitle](values, {
                            ...params,
                        }),
                })
            })
        }
    }

    const onBatchClick = (data: any, type: EnumButton) => {
        const { key } = data

        store.isAll = key === 'All'

        if (key === 'Selected' && !selectedRowKeys.length) {
            message.warning('至少选择1条')
            return
        }

        const BatchType: Record<string, string> = {
            Selected: '本页选中考生',
            All: '全部考生',
        }

        showModal(type, {})
        store.modalTitleText = `批量${BUTTON_TEXT[modalTitle]}(${BatchType[key]})`
        store.selectStuCode = [...selectedRowKeys] as string[]
    }

    const items: MenuProps['items'] = [
        {
            label: '本页选中考生',
            key: 'Selected',
        },
        {
            label: '全部考生',
            key: 'All',
        },
    ]

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        preserveSelectedRowKeys: true,
    }

    const handleAddCount = () => {
        Modal.confirm({
            centered: true,
            title: '每次操作可增加1次登录次数，消耗完毕后方可再次增加，且仅对当前登录次数为0的考生生效，是否确定增加？',
            onOk: () => {
                store
                    .addLoginTimes({
                        examCode: routeQuery.examCode,
                        userCodes: selectedRowKeys,
                    })
                    .then(() => {
                        actionRef.current.reload()
                    })
            },
        })
    }

    const handleLimit = () => {
        setOpen(true)
    }

    return (
        <Spin spinning={false}>
            <div className={styles.stu_detail}>
                <Breadcrumbs
                    crumbData={[
                        { link: '/invigilate/invigilate-tasks', name: '监考任务' },
                        { name: '详情' },
                    ]}
                />
                <ExamDetail {...examDetail} />
                <div className={styles.page_stu_list}>
                    <TitleBlock title="监考详情" />
                    <BusinessTable
                        //@ts-ignore
                        desensitizationList={desensitizationList}
                        actionRef={actionRef}
                        toolBar={false}
                        // @ts-ignore
                        request={(params: any) =>
                            _getStuList({
                                ...params,
                                organizationCode: userStore?.selectedOrganization,
                                examCode: routeQuery.examCode,
                            })
                        }
                        className={styles.tableWrap}
                        columns={columns}
                        rowSelection={rowSelection}
                        formProps={{ labelWrap: false }}
                        rowKey={'stuCode'}
                        // @ts-ignore
                        renderOptionBar={
                            examDetail.examState === EXAM_STATE_ENUM.ONGOING
                                ? () => (
                                    <div className={styles.buttonBar}>
                                        <div className={styles.left_bar}>
                                            <Dropdown
                                                menu={{
                                                    items,
                                                    onClick: (data: any) => {
                                                        setModalValue('请认真作答！')
                                                        onBatchClick(data, BUTTON_ENUM.TIPS)
                                                    },
                                                }}
                                            >
                                                <Typography.Link onClick={e => e.preventDefault()}>
                                                    <div className={styles.batchBtn}>
                                                        <span>批量提醒</span>
                                                        <DownOutlined />
                                                    </div>
                                                </Typography.Link>
                                            </Dropdown>

                                            <Dropdown
                                                menu={{
                                                    items,
                                                    onClick: (data: any) => {
                                                        setModalValue(undefined)
                                                        onBatchClick(data, BUTTON_ENUM.DELAY)
                                                    },
                                                }}
                                            >
                                                <Typography.Link onClick={e => e.preventDefault()}>
                                                    <div className={styles.batchBtn}>
                                                        <span>批量延时</span>
                                                        <DownOutlined />
                                                    </div>
                                                </Typography.Link>
                                            </Dropdown>

                                            <Dropdown
                                                menu={{
                                                    items,
                                                    onClick: (data: any) => {
                                                        setModalValue(undefined)
                                                        onBatchClick(data, BUTTON_ENUM.REMARK)
                                                    },
                                                }}
                                            >
                                                <Typography.Link onClick={e => e.preventDefault()}>
                                                    <div className={styles.batchBtn}>
                                                        <span>批量标记</span>
                                                        <DownOutlined />
                                                    </div>
                                                </Typography.Link>
                                            </Dropdown>

                                            {!!examDetail?.loginLimit && (
                                                <Button
                                                    className={styles.btn}
                                                    onClick={handleAddCount}
                                                    disabled={selectedRowKeys.length === 0}
                                                >
                                                    增加登录次数
                                                </Button>
                                            )}
                                            <Typography.Link
                                                onClick={e => {
                                                    e.preventDefault()
                                                    actionRef.current.reload
                                                }}
                                            >
                                                <RedoOutlined
                                                    style={{ fontSize: 20 }}
                                                    onClick={() => actionRef.current.reload()}
                                                />
                                            </Typography.Link>
                                        </div>
                                        {'ezjs' === getCookie('ALIAS') && (
                                            <Button
                                                type='ghost'
                                                className={styles.btn}
                                                onClick={handleLimit}
                                            >
                                                IP限制
                                            </Button>
                                        )}
                                    </div>
                                )
                                : () => null
                        }
                    />
                </div>
            </div>

            <Modal
                closable={false}
                title={modalTitleText}
                open={modalVisible}
                width={480}
                className={styles.TipsModal}
                centered
                onCancel={() => {
                    setModalValue(undefined)
                    closeModal()

                    if (modalTitle === BUTTON_ENUM.WINDING) {
                        windingRef.current?.onResetFields()
                    }
                }}
                onOk={() => {
                    setModalValue(undefined)
                    confirmSubmit()
                }}
            >
                {modalTitle === BUTTON_ENUM.TIPS && (
                    <div className={styles.modalForm}>
                        <div className={styles.formTitle}>
                            <span className={styles.required}>*</span>
                            提醒内容：
                        </div>
                        <Input.TextArea
                            maxLength={30}
                            value={modalValue}
                            onChange={e => {
                                setModalValue(e.target.value)
                            }}
                            className={styles.formInput}
                            autoSize={false}
                        />
                    </div>
                )}
                {modalTitle === BUTTON_ENUM.DELAY && (
                    <div className={[styles.modalForm, styles.modalFormDelay].join(' ')}>
                        <div className={styles.formTitle}>
                            <span className={styles.required}>*</span>
                            本次延时时长：
                        </div>
                        <InputNumber
                            max={60}
                            min={1}
                            value={modalValue}
                            onChange={value => {
                                setModalValue(value)
                            }}
                        />
                        <span className={styles.unit}>分钟</span>
                    </div>
                )}
                {modalTitle === BUTTON_ENUM.REMARK && (
                    <div className={styles.modalForm}>
                        <div className={styles.formTitle}>
                            <span className={styles.required}>*</span>
                            标记内容：
                        </div>
                        <Input.TextArea
                            placeholder={'请在此输入，确定后将覆盖原有标记内容'}
                            maxLength={30}
                            value={modalValue}
                            onChange={e => {
                                setModalValue(e.target.value)
                            }}
                            className={styles.formInput}
                            autoSize={false}
                        />
                    </div>
                )}
                {modalTitle === BUTTON_ENUM.WINDING && (
                    <WindingModal examCode={routeQuery.examCode} ref={windingRef} />
                )}
            </Modal>
            <IPLimitModal open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} />
        </Spin>
    )
}

export default observer(Invigilate)
