import React, { useEffect, useRef, useState } from 'react'
import ImportStore from './store'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import { toJS } from 'mobx'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { Progress, Tooltip } from 'antd'
import CustomTitle from '@/components/CustomTitle'
import type { ImportListType } from './interface'
import { ACTION_STATUS_TYPE } from './interface.d'
import type { IRoute } from 'umi'
import detailModal from './components/DetailModal'
import { useModel } from 'umi'
import type { MasterProps } from '@/components/MasterPlugins/interface'
import BusinessTable from '@/components/BusinessTable'
import { usePageListConfig } from '@wotu/wotu-components'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { isEmpty } from 'lodash'
import { DatePicker } from '@/components/Picker'
import MoreSelect from '@/components/MoreSelect'
import BatchExport from './components/BatchExport'
const { RangePicker } = DatePicker

const Action: IRoute = observer(() => {
    // const actionRef = useRef({
    //     reload: () => {},
    // })
    const [detailsCode, setDetailsCode] = useState<any>()
    let store = useLocalObservable(() => new ImportStore())
    let { getImportList, getOrganizationCode } = toJS(store)
    const masterStore: MasterProps = useModel('@@qiankunStateFromMaster')
    let { getCurrentOrganization } = masterStore
    let currentOrganization = getCurrentOrganization?.()
    const { getPageListConfig } = usePageListConfig()
    useEffect(() => {
        getOrganizationCode(currentOrganization)
        return store.clearTimer
    }, [currentOrganization])

    // useEffect(() => {
    //     if (store.isPolling) {
    //         store.doTimer(actionRef)
    //     } else {
    //         store.clearTimer()
    //     }
    // }, [store.isPolling])

    // 判断是否超过15天
    const isPast = (createdAt: string) => {
        let fiveTeenDay = 24 * 3600 * 1000 * 15
        let steps = new Date().getTime() - Number(createdAt)
        let result = !(steps >= fiveTeenDay)
        return result
    }

    // table
    // 操作记录
    const modalColumns: ColumnsType<ImportListType> = [
        {
            title: 'ID',
            key: 'code',
            dataIndex: 'code',
            width: '8%',
        },
        {
            title: '操作类型',
            dataIndex: 'type',
            key: 'type',
            width: '12%',
            search: true,
            formItemProps: {
                label: '操作项',
            },
            render: (_, { typeName }) => {
                return typeName
            },
            renderFormItem: () => {
                return (
                    <MoreSelect
                        all={false}
                        placeholder="请选择操作类型"
                        valueKey={'key'}
                        requestParams={{ alias: 'batch_operation_type' }}
                        requestUrl={'/auth/common_data/category'}
                        requestMethod={'get'}
                        isHasPage={false}
                    />
                )
            },
        },
        {
            title: '操作文件',
            dataIndex: 'fileName',
            key: 'fileName',
            width: '18%',
            render: (_, { fileUrl, fileName, createdAt, operationType }) => {
                let past: boolean = isPast(createdAt)
                return (
                    <div className={styles.fileName}>
                        {past ? (
                            fileUrl ? (
                                <a href={fileUrl}>{fileName}</a>
                            ) : operationType === 1 ? (
                                '-'
                            ) : (
                                fileName
                            )
                        ) : (
                            <Tooltip title="文件已过期">
                                <span>{fileName}</span>
                            </Tooltip>
                        )}
                    </div>
                )
            },
        },
        {
            search: true,
            title: '操作时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '15%',
            render: (_, { createdAt }) => {
                return <div> {dayjs(createdAt).format('YYYY-MM-DD HH:mm') ?? '-'}</div>
            },
            renderFormItem: () => {
                return <RangePicker allowClear />
            },
        },
        {
            title: '操作进度',
            dataIndex: 'rate',
            key: 'rate',
            render: (_, { rate, status, failCount, totalCount, operationType }) => {
                // (全部)失败 部分失败 成功 等待中 导入中
                // totalCount可以有0的情况，这种情况指的是文件格式有问题，试题未导入，也认为是失败
                return (
                    <div className={styles.progress}>
                        {(status === ACTION_STATUS_TYPE.FORMATERROR ||
                            (status === ACTION_STATUS_TYPE.COMPLETE &&
                                failCount === totalCount)) && (
                            <>
                                <Progress percent={rate} status="exception" size="small" />
                                <span className={styles.format}>失败</span>
                            </>
                        )}

                        {status === ACTION_STATUS_TYPE.COMPLETE &&
                            failCount > 0 &&
                            failCount !== totalCount && (
                                <>
                                    <Progress percent={rate} status="exception" size="small" />
                                    <span className={styles.format}>部分失败</span>
                                </>
                            )}

                        {status === ACTION_STATUS_TYPE.COMPLETE &&
                            failCount === 0 &&
                            totalCount > 0 && (
                                <>
                                    <Progress percent={rate} size="small" />
                                    <span className={styles.format}>成功</span>
                                </>
                            )}

                        {status === ACTION_STATUS_TYPE.PENDING && (
                            <>
                                <Progress
                                    percent={rate}
                                    status="active"
                                    size="small"
                                    format={() => ''}
                                />
                                <span className={styles.format}>
                                    {operationType === 0 ? '导入中' : '导出中'}
                                </span>
                            </>
                        )}

                        {status === ACTION_STATUS_TYPE.WAITING && (
                            <>
                                <Progress
                                    percent={rate}
                                    status="active"
                                    size="small"
                                    format={() => ''}
                                />
                                <span className={styles.format}>等待中</span>
                            </>
                        )}
                    </div>
                )
            },
        },
        {
            title: '操作',
            key: 'operation',
            dataIndex: 'operation',
            width: '20%',
            render: (_, { errorFileUrl, createdAt, code, status, operationType }) => {
                let past: boolean = isPast(createdAt)
                const handleOpera = () => {
                    if (!errorFileUrl) return <></>
                    if (past) {
                        return (
                            <a className={styles.operation_btn} href={errorFileUrl}>
                                下载失败记录
                            </a>
                        )
                    } else {
                        return (
                            <Tooltip title="文件已过期">
                                <span className={styles.be_overdue}>下载失败记录</span>
                            </Tooltip>
                        )
                    }
                }

                return (
                    <div className={styles.operation}>
                        {/* 状态完成展示详情 */}
                        {[ACTION_STATUS_TYPE.FORMATERROR, ACTION_STATUS_TYPE.COMPLETE].includes(
                            status,
                        ) && (
                            <span
                                className={styles.operation_btn}
                                onClick={() => {
                                    if (operationType === 0) {
                                        detailModal({ code, errorFileUrl, past })
                                    } else {
                                        setDetailsCode(code)
                                    }
                                }}
                            >
                                详情
                            </span>
                        )}
                        {handleOpera()}
                    </div>
                )
            },
        },
    ]
    const beforeSearchSubmit = (params: any) => {
        const { createdAt, ...rest } = params
        const _params = { ...rest }

        const [startTime, endTime] = !isEmpty(createdAt) ? createdAt : []

        _params.startTime = startTime ? dayjs(startTime).startOf('day').valueOf() : null
        _params.endTime = endTime ? dayjs(endTime).endOf('day').valueOf() : null

        return _params
    }

    const getExtraInitParams = () => {
        const pageParams = getPageListConfig('save_params')
        const { startTime, endTime } = pageParams

        const createdAt: (Dayjs | null)[] = [
            startTime ? dayjs(startTime) : null,
            endTime ? dayjs(endTime) : null,
        ]

        return { createdAt }
    }

    return (
        <div className={styles.action_page}>
            <CustomTitle title="批量操作" />

            {/* 表格 */}
            <div className={styles.content}>
                {store.organizationCode && (
                    <BusinessTable
                        // actionRef={actionRef}
                        formItemsStyle={{
                            width: '398px',
                        }}
                        columns={modalColumns}
                        request={getImportList as any}
                        beforeSearchSubmit={beforeSearchSubmit}
                        extraInitParams={getExtraInitParams()}
                        toolBar={true}
                        params={{
                            organizationCode: store.organizationCode,
                        }}
                    />
                )}
            </div>
            <BatchExport
                open={!!detailsCode}
                code={detailsCode}
                onClose={() => setDetailsCode(null)}
            />
        </div>
    )
})

Action.title = '批量操作'
export default Action
