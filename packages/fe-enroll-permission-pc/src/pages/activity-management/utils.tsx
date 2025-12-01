import { message, Modal, Space, Switch, Image, Select, InputNumber } from 'antd'
import React from 'react'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import type ActivityClassifyStore from './store'
import { NavLink } from 'umi'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { history } from 'umi'
import { ACTIVITY_STATUS_ENUM } from './const'
import MoreSelectUpdate from '@/components/MoreSelectUpdate'
import { getCookie } from '@/storage'

export function utils(
    store: ActivityClassifyStore,
    actionRef: React.MutableRefObject<{ reload: () => void }>,
) {
    /**  列表发布 */
    const releaseActive = (code?: string) => {
        Modal.confirm({
            title: '确定要发布活动吗，发布后用户可以在活动列表查看并报名活动。',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            onOk() {
                store.publishActivity(code).then(() => {
                    actionRef?.current?.reload?.()
                    message.success('发布成功')
                })
            },
        })
    }

    /**  删除  */
    const removeActiveManage = (code?: string) => {
        Modal.confirm({
            title: '确定要删除吗，该操作不可逆。',
            icon: <ExclamationCircleOutlined />,
            centered: true,
            onOk() {
                store.deleteItem(code).then(() => {
                    actionRef?.current?.reload?.()
                    message.success('删除成功')
                })
            },
        })
    }

    /**  状态  */
    const updateStatus = (status: number, code: string) => {
        store.changeStatus(status, code).then(() => {
            actionRef?.current?.reload?.()
            message.success('操作成功')
        })
    }

    /**  渲染活动人数  */
    const renderPeople = (e: any) => {
        const { joinTotalPeople, activityStatus, joinUncheckPeople, applyCode, applyName } = e
        if (activityStatus === ACTIVITY_STATUS_ENUM.UNPUBLISHED) {
            return '-'
        }

        return (
            <a
                onClick={() => {
                    history.push(
                        `/activity-enroll?enrollCode=${encodeURIComponent(
                            JSON.stringify({ value: applyCode, label: applyName }),
                        )}`,
                    )
                }}
            >
                {joinTotalPeople}
                {joinUncheckPeople === 0 ? '' : `(${joinUncheckPeople}待审核)`}
            </a>
        )
    }
    /**  渲染打卡人数  */
    const renderClock = (e: any) => {
        const { signPeople, activityStatus, signCode, signName, relateSignStatus } = e

        if (activityStatus === ACTIVITY_STATUS_ENUM.UNPUBLISHED) {
            return '-'
        }

        if (activityStatus !== ACTIVITY_STATUS_ENUM.UNPUBLISHED && relateSignStatus === 0) {
            return '-'
        }

        return (
            <a
                onClick={() => {
                    // history.push(`/questionnaire/sign?taskCode=${signCode}`)
                    history.push(
                        `/activity-sign?taskCode=${encodeURIComponent(
                            encodeURIComponent(
                                JSON.stringify({ value: signCode, label: signName }),
                            ),
                        )}`,
                    )
                }}
            >
                {signPeople}
            </a>
        )
    }

    /**  排序  */
    const updateSort = async (s: number, c: string) => {
        await store.sortActivityClassify(Number(s), c)
        actionRef?.current?.reload?.()
        message.success('排序成功')
    }

    /**  列  */
    const columns: ColumnsType<any> = [
        {
            title: '活动名称',
            dataIndex: 'activityName',
            width: 200,
            search: true,
            render: (_, { activityName, code }) => {
                return (
                    <NavLink to={`/activity-management/detail?code=${code}`}>
                        {activityName ? activityName : '-'}
                    </NavLink>
                )
            },
        },
        {
            title: '封面',
            dataIndex: 'coverUrl',
            width: 100,
            render: col => {
                return col ? (
                    <Image
                        src={col}
                        alt="logo"
                        style={{ width: '60px', borderRadius: 8, height: '60px' }}
                    />
                ) : (
                    '-'
                )
            },
        },
        {
            title: '分类',
            dataIndex: 'activityCatalogCode',
            width: 200,
            search: true,
            render: (_, { activityCatalogName }) => {
                return activityCatalogName || '-'
            },
            renderFormItem: () => {
                const sidValue = getCookie('SID')
                return (
                    <MoreSelectUpdate
                        all={false}
                        placeholder="请选择分类"
                        valueKey="code"
                        labelKey="catalogName"
                        requestUrl="/activity/front/activity/page_activity_catalog"
                        repeatFilter={false}
                        labelInValue
                        requestParams={{
                            sid: sidValue,
                            openStatus: 1,
                        }}
                        allowClear
                    />
                )
            },
        },

        {
            title: '形式',
            dataIndex: 'activityForm',
            width: 200,
            search: true,
            render: (_, { activityFormName }) => {
                return activityFormName || '-'
            },
            renderFormItem: () => {
                return (
                    <Select
                        placeholder="请选择"
                        style={{
                            width: '100%',
                        }}
                        options={[
                            {
                                label: '线上',
                                value: 0,
                            },
                            {
                                label: '线下',
                                value: 1,
                            },
                            {
                                label: '线上+线下',
                                value: 2,
                            },
                        ]}
                    />
                )
            },
        },
        {
            title: '活动时间',
            dataIndex: 'time',
            width: 270,
            search: false,
            render: (_, { startTime, endTime }) => {
                return (
                    <div>
                        {startTime && endTime
                            ? `${dayjs(startTime).format('YYYY-MM-DD HH:mm')} - ${dayjs(
                                  endTime,
                              ).format('YYYY-MM-DD HH:mm')}`
                            : '-'}
                    </div>
                )
            },
        },
        {
            search: false,
            title: '活动人数',
            dataIndex: 'joinTotalPeople',
            width: 200,
            render: (_, { joinTotalPeople, activityStatus, joinUncheckPeople, applyCode }) => {
                return (
                    <div>
                        {renderPeople({
                            joinTotalPeople,
                            activityStatus,
                            joinUncheckPeople,
                            applyCode,
                        })}
                    </div>
                )
            },
        },
        {
            search: false,
            title: '打卡人数',
            dataIndex: 'signPeople',
            width: 200,
            render: (_, { signPeople, activityStatus, signCode, relateSignStatus }) => {
                return (
                    <div>
                        {renderClock({ signPeople, activityStatus, signCode, relateSignStatus })}
                    </div>
                )
            },
        },
        {
            title: '活动状态',
            dataIndex: 'activityStatus',
            width: 120,
            render: (_, { activityStatusName }) => {
                return activityStatusName || '-'
            },
        },
        {
            title: '排序',
            dataIndex: 'sort',
            width: 120,
            render: (_, { code, sort }) => {
                return (
                    <InputNumber
                        defaultValue={sort}
                        min={0}
                        max={9999}
                        formatter={value => {
                            if (!Number(value)) return 0
                            return value
                        }}
                        parser={val => {
                            return val ? parseInt(val) : ''
                        }}
                        onBlur={(e: any) => {
                            updateSort(e.target.value, code)
                        }}
                    />
                )
            },
        },
        {
            search: true,
            title: '显示状态',
            dataIndex: 'display',
            width: 120,
            render: (_, recode) => {
                return (
                    <Space size="middle">
                        <Switch
                            checked={_ === 1 ? true : false}
                            onChange={() => {
                                updateStatus(recode?.display, recode?.code)
                            }}
                        />
                    </Space>
                )
            },
            renderFormItem: () => {
                return (
                    <Select
                        placeholder="请选择"
                        style={{
                            width: '100%',
                        }}
                        options={[
                            {
                                label: '不显示',
                                value: 0,
                            },
                            {
                                label: '显示',
                                value: 1,
                            },
                        ]}
                    />
                )
            },
        },
        {
            fixed: 'right',
            title: '操作',
            dataIndex: 'operation',
            width: 250,
            formItemProps: {
                label: '权限ID',
            },
            render: (_, record) => (
                <Space style={{ flexWrap: 'wrap' }} size="middle">
                    {record?.activityStatus === ACTIVITY_STATUS_ENUM.UNPUBLISHED ? (
                        <a onClick={() => releaseActive(record.code)}>发布</a>
                    ) : null}
                    <a
                        onClick={() => {
                            history.push(
                                `/activity-management/create?code=${record.code}&isRelease=${
                                    record?.activityStatus === ACTIVITY_STATUS_ENUM.UNPUBLISHED
                                        ? 0
                                        : 1
                                }`,
                            )
                        }}
                    >
                        编辑
                    </a>
                    <a onClick={() => removeActiveManage(record.code)}>删除</a>
                    {[
                        ACTIVITY_STATUS_ENUM.ENDED,
                        ACTIVITY_STATUS_ENUM.PROCESSING,
                        ACTIVITY_STATUS_ENUM.UNSTARTED,
                    ].includes(record?.activityStatus) && (
                        <a
                            onClick={() => {
                                history.push(`/activity-management/share?code=${record.code}`)
                            }}
                        >
                            分享
                        </a>
                    )}
                    {[ACTIVITY_STATUS_ENUM.ENDED, ACTIVITY_STATUS_ENUM.PROCESSING].includes(
                        record?.activityStatus,
                    ) && (
                        <a
                            onClick={() => {
                                history.push(`/activity-management/review?code=${record.code}`)
                            }}
                        >
                            活动回顾
                        </a>
                    )}
                </Space>
            ),
        },
    ]
    return columns
}
