import styles from './index.module.less'
import { Button, Col, message, Row, Space, Switch, Table, Tooltip, Typography } from 'antd'
import { FormOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { useEffect, useImperativeHandle, useState } from 'react'
import { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import TitleAdvance from '@/components/TitleAdvance'
import AddMeasureModal from './AddMeasureModal'
import { MEASURE_TYPE, MEASURE_TYPE_TEXT } from './consts'

import Store from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { MeasureItem } from './interface'
import React from 'react'

let recordCode = 1
const AssistanceMeasures = React.forwardRef((props, ref) => {
    const store = useLocalObservable(() => Store)
    const { assistanceInfo, sysMeasureList } = store
    const { diagnosticResult, measureList: resMeasureList = [] } = assistanceInfo

    const [measureList, setMeasureList] = useState<MeasureItem[]>([])
    const [moreMeasureList, setMoreMeasureList] = useState<MeasureItem[]>(store.moreMeasureList)
    const [openAddMeasureModal, setOpenAddMeasureModal] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [currentRecord, setCurrentRecord] = useState<MeasureItem>()

    useImperativeHandle(ref, () => {
        return {
            validateSave: (callback: (data: any) => void) => {
                if (!measureList.length) {
                    return message.warning('请先维护帮扶措施')
                }
                callback(measureList)
            },
        }
    })

    const handleOpenAddMeasureModal = () => {
        setIsEdit(false)
        setOpenAddMeasureModal(true)
    }

    // 使用更多措施
    const handleUseMoreMeasure = (measure: MeasureItem) => {
        setMeasureList(prev => [{ ...measure, code: `faker_${recordCode}` }, ...prev])
        recordCode++
        const findIndex = moreMeasureList.findIndex(item => item.title === measure.title)

        moreMeasureList.splice(findIndex, 1)
        setMoreMeasureList([...moreMeasureList])
    }

    const handleDeleteMeasure = (measure: MeasureItem) => {
        if (measure.type !== MEASURE_TYPE.CUSTOM) {
            setMoreMeasureList(prev => [...prev, measure])
        }

        const findIndex = measureList.findIndex(item => item.code === measure.code)
        measureList.splice(findIndex, 1)
        setMeasureList([...measureList])
    }

    const handleChange = (record: MeasureItem, value: boolean) => {
        const findIndex = measureList.findIndex(item => item.code === record?.code)
        const list = [...measureList]
        list[findIndex].enableState = value ? 1 : 0
        setMeasureList(list)
    }

    // 变更措施，编辑后，不论该措施之前是什么类型，均变更为【自定义措施】，原措施若为【系统推荐措施】或【系统更多措施】，均流转展示于下方【更多措施】列表中
    const handleUpdateMeasure = (values: any) => {
        const newRecord = { ...currentRecord } as MeasureItem
        if (!isEdit) {
            setMeasureList([...measureList, { code: `faker_${recordCode}`, type: MEASURE_TYPE.CUSTOM, title: values?.title, enableState: 0, level: [] }])
            recordCode++

            setOpenAddMeasureModal(false)
            return
        }

        const findIndex = measureList.findIndex(item => item.code === currentRecord?.code)
        handleDeleteMeasure(currentRecord!)
        newRecord.type = MEASURE_TYPE.CUSTOM
        newRecord.title = values.title

        const list = [...measureList]
        list.splice(findIndex, 0, newRecord)
        console.log(list)
        setMeasureList(list)


        setOpenAddMeasureModal(false)
    }

    const columns: ColumnsTypeItem<MeasureItem>[] = [
        {
            title: '措施内容',
            dataIndex: 'title',
            width: 200,
            render: (val, record) => (
                <Space size={4}>
                    <Typography>{val}</Typography>
                    <FormOutlined
                        onClick={() => {
                            setIsEdit(true)
                            setOpenAddMeasureModal(true)
                            setCurrentRecord(record)
                        }}
                    />
                </Space>
            ),
        },
        {
            title: '类型',
            width: 100,
            dataIndex: 'type',
            render: val => MEASURE_TYPE_TEXT[val],
        },
        {
            title: (
                <Space size={4}>
                    <Typography>同步求职者</Typography>
                    <Tooltip title="开启后，求职者将看到对应建议措施内容">
                        <InfoCircleOutlined className={styles.info_circle_icon}/>
                    </Tooltip>
                </Space>
            ),
            width: 100,
            dataIndex: 'enableState',
            render: (val, record) => <Switch checked={!!val} onChange={(value) => handleChange(record, value)} />,
        },
        {
            title: '操作',
            width: 100,
            render: (_, record) => (
                <Typography.Link onClick={() => handleDeleteMeasure(record)}>删除</Typography.Link>
            ),
        },
    ] as ColumnsTypeItem<any>[]

    useEffect(() => {
        console.log('resMeasureList', resMeasureList)
        if (resMeasureList.length > 0) {
            setMeasureList(resMeasureList as any)
            const selectSys = resMeasureList.filter((resItem => resItem.type !== 3)).map(i => i.title)
            setMoreMeasureList(
                sysMeasureList.filter((item: any) => !selectSys.includes(item.title))
            )
            return
        }
    }, [diagnosticResult?.diagonsticResultCode, resMeasureList])

    return (
        <div className={styles.assistance_measures}>
            <TitleAdvance title="帮扶措施">
                {/* 自定义帮扶措施 */}
                <div className={styles.custom_measures}>
                    <div className={styles.title}>
                        根据诊断结果 [{diagnosticResult?.diagonsticResult}] ，已自动推荐帮扶措施
                    </div>
                    <div className={styles.sub_title}>
                        您可以编辑措施内容、删除措施、设置是否同步求职者，也可以新建自定义措施
                    </div>

                    <Space direction="vertical" size={16}>
                        <Button type="primary" onClick={handleOpenAddMeasureModal}>
                            新建
                        </Button>
                        <Table
                            rowKey={({ code, title }) => `${code}_${title}`}
                            columns={columns}
                            dataSource={measureList}
                            pagination={{
                                showQuickJumper: true,
                                showSizeChanger: true,
                                disabled: false,
                                showTotal: (t: number) => `总共${t}条`,
                            }}
                        />
                    </Space>
                </div>
                {/* 更多措施 */}
                <div className={styles.more_measures}>
                    <div className={styles.title}>更多措施</div>
                    <div className={styles.sub_title}>
                        以下为其他诊断结果的推荐措施，可视求职者具体情况选择使用
                    </div>

                    <Row gutter={[24, 24]} className={styles.measure_list}>
                        {moreMeasureList.map(item => (
                            <Col span={6} key={item.title}>
                                <div className={styles.measure_item}>
                                    <Typography>{item.title}</Typography>
                                    <Typography.Link onClick={() => handleUseMoreMeasure(item)}>
                                        使用
                                    </Typography.Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </TitleAdvance>

            {openAddMeasureModal && <AddMeasureModal
                open={openAddMeasureModal}
                record={currentRecord}
                isEdit={isEdit}
                onCancel={() => {
                    setOpenAddMeasureModal(false)
                }}
                onOk={handleUpdateMeasure}
                sysMeasureList={sysMeasureList}
            />}
        </div>
    )
})

export default observer(AssistanceMeasures)
