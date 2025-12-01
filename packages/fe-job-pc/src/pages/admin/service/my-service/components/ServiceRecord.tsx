/* eslint-disable */
import styles from './index.module.less'
import { SuperTable } from '@wotu/wotu-components'
import { Button, Modal, Space, Typography } from 'antd'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import dayjs from 'dayjs'
import { useState } from 'react'
import ServiceRecordDetailModal from './ServiceRecordDetailModal'
import AddServiceRecordModal from './AddServiceRecordModal'
import type { RecordItem } from './interface'
import FinishServiceModal from './FinishServiceModal'
import BatchExport from '@/components/BatchExport'
import { inject, observer, useLocalObservable } from 'mobx-react'

import Store from './store'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { history, useLocation } from 'umi'
import TitleAdvance from '@/components/TitleAdvance'

const ServiceRecord = ({ isRecord, userStore }: { isRecord?: boolean; userStore?: any }) => {
    const { userData } = userStore
    const store = useLocalObservable(() => Store)
    const {
        query: { code },
    } = useLocation()

    console.log(userData)

    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)
    const [openAddModal, setOpenAddModal] = useState<boolean>(false)
    const [openFinishModal, setOpenFinishModal] = useState<boolean>(false)
    const [currentRecord, setCurrentRecord] = useState<RecordItem>()
    const [openExportModal, setOpenExportModal] = useState<boolean>(false)

    const { serviceRecordList } = store

    const columns: ColumnsTypeItem<any>[] = [
        {
            title: '服务内容',
            dataIndex: 'measure',
            ellipsis: true,
            width: 200,
        },
        {
            title: '服务日期',
            dataIndex: 'serverAt',
            width: 100,
            render: val => dayjs(val).format('YYYY-MM-DD'),
        },
        {
            title: '服务人员',
            dataIndex: 'userName',
            width: 200,
            render: (val, { userCode }) => `${val}(ID:${userCode})`,
        },
        {
            title: '服务记录',
            dataIndex: 'content',
            ellipsis: true,
            width: 200,
        },
        {
            title: '操作',
            width: 200,
            render: (_, record) => (
                <Space size={16}>
                    <Typography.Link
                        onClick={() => {
                            setCurrentRecord(record)
                            setOpenDetailModal(true)
                        }}
                    >
                        详情
                    </Typography.Link>
                    {userData?.code === record.userCode && !isRecord && (
                        <>
                            <Typography.Link onClick={() => handleEdit(record)}>
                                编辑
                            </Typography.Link>
                            <Typography.Link onClick={() => handleDelete(record)}>
                                删除
                            </Typography.Link>
                        </>
                    )}
                </Space>
            ),
        },
    ]

    const handleEdit = (record: any) => {
        setCurrentRecord(record)
        setOpenAddModal(true)
    }

    const handleAddRecord = (values: any) => {
        if (currentRecord) {
            store.updateServer(
                {
                    code: currentRecord?.code,
                    measureCode: values.measureCode,
                    serverAt: values.serverAt?.valueOf(),
                    content: values.content,
                },
                code,
            )
        } else {
            store.createServer(
                {
                    recordCode: code,
                    measureCode: values.measureCode,
                    serverAt: values.serverAt?.valueOf(),
                    content: values.content,
                },
                code,
            )
        }
        setOpenAddModal(false)
    }

    const handleFinishService = (values: any) => {
        Modal.confirm({
            content: '结束服务后不支持修改任何信息和状态，是否确定结束？',
            okText: '确定',
            icon: <ExclamationCircleFilled />,
            cancelText: '取消',
            onOk: () => {
                store.finishRecord(
                    {
                        recordCode: code,
                        ...values,
                    },
                    code,
                )
                setOpenFinishModal(false)
                history.goBack()
            },
        })
    }

    const handleDelete = (record: any) => {
        Modal.confirm({
            content: '删除后无法找回，是否确定删除？',
            okText: '确定',
            icon: <ExclamationCircleFilled />,
            cancelText: '取消',
            onOk: () => {
                store.deleteServer(
                    {
                        code: record.code,
                    },
                    code,
                )
            },
        })
    }

    const handleExport = () => {
        // setOpenExportModal(true)
        store.exportWord({ recordCode: code })
    }

    return (
        <div className={styles.service_record}>
            <TitleAdvance title="服务记录" />

            <SuperTable
                renderOptionBar={() => (
                    <Space className={styles.table_option_bar}>
                        <Space size={16}>
                            {!isRecord && (
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setCurrentRecord(undefined)
                                        setOpenAddModal(true)
                                    }}
                                >
                                    添加服务记录
                                </Button>
                            )}

                            {/* 服务记录数据为0的时候禁用 */}
                            <Button onClick={handleExport} disabled={!serviceRecordList.length}>
                                导出
                            </Button>
                        </Space>
                        {!isRecord && (
                            <Button onClick={() => setOpenFinishModal(true)}>结束本次服务</Button>
                        )}
                    </Space>
                )}
                columns={columns}
                dataSource={serviceRecordList}
                search={false}
            />

            <ServiceRecordDetailModal
                record={currentRecord}
                open={openDetailModal}
                onCancel={() => setOpenDetailModal(false)}
            />

            <AddServiceRecordModal
                open={openAddModal}
                currentRecord={currentRecord}
                onCancel={() => setOpenAddModal(false)}
                onOk={handleAddRecord}
            />

            <ServiceRecordDetailModal />

            <FinishServiceModal
                open={openFinishModal}
                onCancel={() => setOpenFinishModal(false)}
                onOk={handleFinishService}
            />

            <BatchExport
                open={openExportModal}
                // TODO
                api="/export/ur"
                progressApi="/export/detail"
                onClose={() => setOpenExportModal(false)}
            />
        </div>
    )
}

export default inject('userStore')(observer(ServiceRecord))
