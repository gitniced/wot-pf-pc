import styles from './index.module.less'
import { Button, Modal, Space, Switch, Table, Tooltip, Typography } from 'antd'
import { FormOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import TitleAdvance from '@/components/TitleAdvance'
import { MEASURE_TYPE, MEASURE_TYPE_TEXT } from './consts'

import Store from './store'
import { observer, useLocalObservable } from 'mobx-react'
import type { MeasureItem } from './interface'
import AddMeasureModal from './AddMeasureModal'
import AddServiceRecordModal from './AddServiceRecordModal'
import { toJS } from 'mobx'
import { useLocation } from 'umi'

let _recordFake = 1
const AssistanceMeasures = ({ isRecord }: { isRecord?: boolean }) => {
    const {
        query: { code },
    } = useLocation()
    const store = useLocalObservable(() => Store)

    const [openAddMeasureModal, setOpenAddMeasureModal] = useState<boolean>(false)
    const [openAddModal, setOpenAddModal] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [currentRecord, setCurrentRecord] = useState<MeasureItem>()

    const { measureList } = store

    const _actionRef = useRef({
        reload: () => {},
    })

    useEffect(() => {}, [])

    const handleOpenAddMeasureModal = () => {
        setIsEdit(false)
        setOpenAddMeasureModal(true)
    }

    const handleDeleteMeasure = (measure: MeasureItem) => {
        Modal.confirm({
            title: '删除手无法找回，是否确定删除？',
            onOk: () => {
                store.deleteMeasure({ code: measure.code })
                store.getAssistanceDetail(code)
            },
        })
    }

    const handleUpdateMeasure = (values: any) => {
        const { title, type, measure } = values
        const newList = toJS(measureList)
        if (isEdit) {
            const findIndex = newList.findIndex(item => item.code === currentRecord?.code)
            store.updateMeasure(
                {
                    code: newList[findIndex].code,
                    type: MEASURE_TYPE.CUSTOM,
                    title: title,
                },
                code,
            )
        } else {
            store.createMeasure(
                {
                    recordCode: code,
                    type,
                    title: type === MEASURE_TYPE.CUSTOM ? title : measure.label,
                },
                code,
            )
        }

        setOpenAddMeasureModal(false)
    }

    // 添加服务记录
    const handleAddMeasureRecord = (measureItem: MeasureItem) => {
        setCurrentRecord(measureItem)
        setOpenAddModal(true)
    }

    const handleChange = (value: boolean, item: any) => {
        store.enableMeasure(
            {
                code: item.code,
                enableState: value ? 1 : 0,
            },
            code,
        )
    }

    const columns: ColumnsTypeItem<MeasureItem>[] = [
        {
            title: '措施内容',
            dataIndex: 'title',
            width: 200,
            render: (val, record) => (
                <Space size={4}>
                    <Typography>{val}</Typography>
                    {!isRecord && (
                        <FormOutlined
                            onClick={() => {
                                setIsEdit(true)
                                setOpenAddMeasureModal(true)
                                setCurrentRecord(record)
                            }}
                        />
                    )}
                </Space>
            ),
        },
        {
            title: '类型',
            dataIndex: 'type',
            width: 100,
            render: val => MEASURE_TYPE_TEXT[val],
        },
        {
            title: (
                <Space size={4}>
                    <Typography>同步求职者</Typography>
                    <Tooltip title="开启后，求职者将看到对应建议措施内容">
                        <InfoCircleOutlined className={styles.info_circle_icon} />
                    </Tooltip>
                </Space>
            ),
            dataIndex: 'enableState',
            width: 100,
            render: (val, record) => (
                <Switch
                    disabled={isRecord}
                    checked={val}
                    onChange={v => {
                        if (isRecord) return
                        handleChange(v, record)
                    }}
                />
            ),
        },
        {
            title: '服务记录',
            dataIndex: 'serviceNum',
            width: 100,
            render: count => count || '0',
        },
        {
            title: '操作',
            hide: isRecord,
            width: 100,
            render: (_, record) => (
                <Space size={16}>
                    {record.serviceNum === 0 && (
                        <Typography.Link onClick={() => handleDeleteMeasure(record)}>
                            删除
                        </Typography.Link>
                    )}

                    <Typography.Link onClick={() => handleAddMeasureRecord(record)}>
                        添加服务记录
                    </Typography.Link>
                </Space>
            ),
        },
    ] as ColumnsTypeItem<MeasureItem>[]

    const handleAddRecord = async (values: any) => {
        console.log(values)
        const { measureCode, serverAt, content } = values
        await store.createServer(
            {
                recordCode: code,
                measureCode,
                serverAt: serverAt?.valueOf(),
                content,
            },
            code,
        )
        setOpenAddModal(false)
    }

    return (
        <div className={styles.assistance_measures}>
            <TitleAdvance title="帮扶措施">
                {!isRecord && (
                    <Button type="primary" onClick={handleOpenAddMeasureModal}>
                        新建
                    </Button>
                )}
                <Table
                    rowKey={'code'}
                    columns={columns.filter(item => !item.hide)}
                    dataSource={store.measureList}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        disabled: false,
                        showTotal: (t: number) => `总共${t}条`,
                    }}
                />
            </TitleAdvance>

            {openAddMeasureModal && (
                <AddMeasureModal
                    open={openAddMeasureModal}
                    record={currentRecord}
                    isEdit={isEdit}
                    onCancel={() => {
                        setOpenAddMeasureModal(false)
                    }}
                    onOk={handleUpdateMeasure}
                />
            )}

            {openAddModal && (
                <AddServiceRecordModal
                    open={openAddModal}
                    currentRecord={currentRecord}
                    onCancel={() => setOpenAddModal(false)}
                    onOk={handleAddRecord}
                />
            )}
        </div>
    )
}

export default observer(AssistanceMeasures)
