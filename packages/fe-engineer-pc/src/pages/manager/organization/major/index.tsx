import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Button, message, Modal, Form, Input, Select, InputNumber, Space, Spin } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSaasTitle } from '@wotu/wotu-components'
import BusinessTable from '@/components/BusinessTable'
import CustomTitle from '@/components/CustomTitle'
import styles from './index.module.less'
import type {
    IMajor,
    IMajorPageQuery,
    ISaveMajorRequest,
    ISaveTrainLevelRequest,
    ITrainLevelEdu,
} from './types'
import {
    getMajorList,
    updateMajorStatus,
    updateMajorSort,
    deleteMajor,
    saveMajor,
    saveTrainLevel,
    deleteTrainLevel,
    getTrainLevelsByMajor,
} from './service'
import { getCollegeList } from '../college/service'
import type { ICollegeSimple } from '../college/types'
import { getMajorTableColumns } from './column'

const Index: React.FC = () => {
    useSaasTitle('专业管理')
    const actionRef = useRef({
        reload: () => {},
    })

    const [_loading, _setLoading] = useState(false)
    const [form] = Form.useForm()
    const [modalVisible, setModalVisible] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [collegeOptions, setCollegeOptions] = useState<ICollegeSimple[]>([])
    const [collegeLoading, setCollegeLoading] = useState(false)
    const [editingRecord, setEditingRecord] = useState<IMajor | null>(null)
    const isEditMode = !!editingRecord

    const [trainLevelForm] = Form.useForm()
    const [trainLevelModalVisible, setTrainLevelModalVisible] = useState(false)
    const [trainLevelLoading, setTrainLevelLoading] = useState(false)
    const [selectedMajor, setSelectedMajor] = useState<IMajor | null>(null)
    const [editingTrainLevel, setEditingTrainLevel] = useState<any>(null)
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])
    const [trainLevelData, setTrainLevelData] = useState<Record<string, any[]>>({})
    const [trainLevelLoadingMap, setTrainLevelLoadingMap] = useState<Record<string, boolean>>({})

    const _handleGetMajorList = async (params: IMajorPageQuery) => {
        _setLoading(true)
        try {
            const res = await getMajorList(params)
            _setLoading(false)
            return {
                data: res.data || [],
                totalCount: res.totalCount || 0,
                success: true,
            }
        } catch (error) {
            _setLoading(false)
            return {
                data: [],
                totalCount: 0,
                success: false,
            }
        }
    }

    const fetchTrainLevels = async (majorCode: string) => {
        setTrainLevelLoadingMap(prev => ({ ...prev, [majorCode]: true }))
        try {
            const res = await getTrainLevelsByMajor(majorCode)
            setTrainLevelData(prev => ({
                ...prev,
                [majorCode]: res || [],
            }))
        } finally {
            setTrainLevelLoadingMap(prev => ({ ...prev, [majorCode]: false }))
        }
    }

    const handleExpand = (expanded: boolean, record: IMajor) => {
        if (expanded) {
            setExpandedRowKeys(prev => [...prev, record.code])
            fetchTrainLevels(record.code)
        } else {
            setExpandedRowKeys(prev => prev.filter(key => key !== record.code))
        }
    }

    const handleStatusChange = async (checked: boolean, record: IMajor) => {
        await updateMajorStatus({
            code: record.code,
            status: checked ? 1 : 0,
        })
        message.success(`${checked ? '启用' : '禁用'}成功`)
        actionRef.current.reload()
    }

    const handleSortChange = async (value: number, record: IMajor) => {
        await updateMajorSort({
            code: record.code,
            sortOrder: value,
        })
        message.success('排序更新成功')
        actionRef.current.reload()
    }

    const fetchCollegeOptions = useCallback(async () => {
        setCollegeLoading(true)
        try {
            const res = await getCollegeList({
                status: 1,
                pageNo: 1,
                pageSize: 1000,
            })
            const collegeList = (res.data || []).map(college => ({
                code: college.code,
                name: college.name,
            }))
            setCollegeOptions(collegeList)
        } finally {
            setCollegeLoading(false)
        }
    }, [])

    const handleEdit = (record: IMajor) => {
        setEditingRecord(record)
        form.setFieldsValue({
            name: record.name,
            majorNum: record.majorNum,
            collegeCode: record.collegeCode,
        })
        setModalVisible(true)
    }

    useEffect(() => {
        fetchCollegeOptions()
    }, [])

    const handleDelete = (record: IMajor) => {
        Modal.confirm({
            type: 'warning',
            title: '确定要删除吗，该操作不可逆。',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                await deleteMajor(record.code)
                message.success('删除成功')
                actionRef.current.reload()
            },
        })
    }

    const handleAdd = () => {
        setEditingRecord(null)
        form.resetFields()
        setModalVisible(true)
    }

    const handleSubmitMajor = async () => {
        try {
            const values = await form.validateFields()
            setModalLoading(true)

            const majorData: ISaveMajorRequest = {
                name: values.name,
                majorNum: values.majorNum,
                collegeCode: values.collegeCode,
                ...(!isEditMode && {
                    sortOrder: 0,
                    status: 1,
                }),
                ...(isEditMode && {
                    sid: editingRecord!.sid,
                    code: editingRecord!.code,
                }),
            }

            await saveMajor(majorData)
            message.success(`${isEditMode ? '编辑' : '新建'}专业成功`)
            setModalVisible(false)
            actionRef.current.reload()
        } catch (error: any) {
            if (error?.errorFields) {
                return
            }
        } finally {
            setModalLoading(false)
        }
    }

    const handleCancel = () => {
        setModalVisible(false)
        setEditingRecord(null)
        form.resetFields()
    }

    const handleAddTrainLevel = (record: IMajor) => {
        setSelectedMajor(record)
        setEditingTrainLevel(null)
        trainLevelForm.resetFields()
        trainLevelForm.setFieldsValue({
            eduList: [{ startPoint: undefined, eduLen: undefined }],
        })
        setTrainLevelModalVisible(true)
    }

    const handleEditTrainLevel = (trainLevel: any, major: IMajor) => {
        setSelectedMajor(major)
        setEditingTrainLevel(trainLevel)
        trainLevelForm.setFieldsValue({
            level: trainLevel.level,
            levelNum: trainLevel.levelNum,
            eduList: trainLevel.eduList || [{ startPoint: undefined, eduLen: undefined }],
        })
        setTrainLevelModalVisible(true)
    }

    const handleDeleteTrainLevel = async (trainLevel: any, major: IMajor) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除该培养层级吗？',
            onOk: async () => {
                await deleteTrainLevel(trainLevel.code)
                message.success('删除成功')
                fetchTrainLevels(major.code)
                actionRef.current.reload()
            },
        })
    }

    const handleAddTrainLevelSubmit = async () => {
        try {
            const values = await trainLevelForm.validateFields()
            setTrainLevelLoading(true)

            if (!selectedMajor) {
                message.error('请选择专业')
                return
            }

            const startPoints = values.eduList.map((item: ITrainLevelEdu) => item.startPoint)
            const uniqueStartPoints = new Set(startPoints)
            if (startPoints.length !== uniqueStartPoints.size) {
                message.error('同一培养层级下，起点不可重复')
                return
            }

            const trainLevelRequestData: ISaveTrainLevelRequest = {
                collegeCode: selectedMajor.collegeCode,
                majorCode: selectedMajor.code,
                level: values.level,
                levelNum: values.levelNum || '',
                eduList: values.eduList.map((item: ITrainLevelEdu) => ({
                    code: item.code || '',
                    startPoint: item.startPoint,
                    eduLen: item.eduLen,
                })),
            }

            if (editingTrainLevel) {
                trainLevelRequestData.code = editingTrainLevel.code
            }

            await saveTrainLevel(trainLevelRequestData)
            message.success(editingTrainLevel ? '更新培养层级成功' : '添加培养层级成功')
            setTrainLevelModalVisible(false)
            if (selectedMajor) {
                fetchTrainLevels(selectedMajor.code)
            }
            actionRef.current.reload()
        } catch (error: any) {
            if (error?.errorFields) {
                return
            }
        } finally {
            setTrainLevelLoading(false)
        }
    }

    const handleCancelTrainLevel = () => {
        setTrainLevelModalVisible(false)
        trainLevelForm.resetFields()
        setSelectedMajor(null)
        setEditingTrainLevel(null)
    }

    const addEduItem = () => {
        const eduList = trainLevelForm.getFieldValue('eduList') || []
        if (eduList.length >= 10) {
            message.warning('最多只能添加10个学制项')
            return
        }
        trainLevelForm.setFieldsValue({
            eduList: [...eduList, { startPoint: undefined, eduLen: undefined }],
        })
    }

    const removeEduItem = (index: number) => {
        const eduList = trainLevelForm.getFieldValue('eduList') || []
        if (eduList.length <= 1) {
            message.warning('至少需要保留一个学制项')
            return
        }
        eduList.splice(index, 1)
        trainLevelForm.setFieldsValue({ eduList: [...eduList] })
    }

    const columns = getMajorTableColumns(
        handleStatusChange,
        handleSortChange,
        handleEdit,
        handleDelete,
        handleAddTrainLevel,
        collegeOptions,
    )

    return (
        <div className={styles.page}>
            {/* @ts-ignore */}
            <CustomTitle title="专业管理" marginBottom={32} />

            <div className={styles.content}>
                {/* @ts-ignore */}
                <BusinessTable
                    actionRef={actionRef}
                    search={{}}
                    renderOptionBar={() => (
                        <Button type="primary" onClick={handleAdd}>
                            新建
                        </Button>
                    )}
                    columns={columns}
                    request={_handleGetMajorList as any}
                    rowKey="code"
                    expandable={{
                        expandedRowKeys,
                        onExpand: handleExpand,
                        rowExpandable: (record: IMajor) => !!record.existTrainLevel,
                        expandedRowRender: (record: IMajor) => {
                            const isLoading = trainLevelLoadingMap[record.code]
                            if (
                                isLoading &&
                                !trainLevelData[record.code] &&
                                !!record.existTrainLevel
                            ) {
                                return (
                                    <div
                                        style={{
                                            padding: '16px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '100%',
                                        }}
                                    >
                                        <Spin />
                                    </div>
                                )
                            }

                            const trainLevels = trainLevelData[record.code] || []
                            if (trainLevels.length === 0) {
                                return (
                                    <div style={{ padding: '16px', color: '#999' }}>
                                        暂无培养层级数据
                                    </div>
                                )
                            }

                            return (
                                <div style={{ padding: '0 84px' }}>
                                    {trainLevels.map((trainLevel: any, index: number) => (
                                        <div
                                            key={
                                                trainLevel.code ||
                                                `train-level-${trainLevel.level}-${trainLevel.levelNum}`
                                            }
                                            style={{
                                                padding: '12px',
                                                marginBottom:
                                                    index === trainLevels.length - 1 ? '0' : '16px',
                                                background: '#fafafa',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <div style={{ width: '30%' }}>
                                                <div style={{ marginBottom: '4px' }}>
                                                    {trainLevel.level === 10
                                                        ? '中级'
                                                        : trainLevel.level === 20
                                                        ? '高级'
                                                        : '预备技师（技师）'}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: '12px',
                                                        color: '#666',
                                                        marginBottom: '4px',
                                                    }}
                                                >
                                                    代码：{trainLevel.levelNum || '-'}
                                                </div>
                                            </div>
                                            <div style={{ width: '30%' }}>
                                                {trainLevel.eduList && trainLevel.eduList.length > 0
                                                    ? trainLevel.eduList
                                                          .map(
                                                              (edu: any) =>
                                                                  `${
                                                                      edu.startPoint === 10
                                                                          ? '初中'
                                                                          : '高中'
                                                                  }起点${edu.eduLen}年`,
                                                          )
                                                          .join('，')
                                                    : '暂无学制信息'}
                                            </div>
                                            <Space
                                                style={{
                                                    width: '40%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                }}
                                            >
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    onClick={() =>
                                                        handleEditTrainLevel(trainLevel, record)
                                                    }
                                                >
                                                    编辑
                                                </Button>
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    onClick={() =>
                                                        handleDeleteTrainLevel(trainLevel, record)
                                                    }
                                                >
                                                    删除
                                                </Button>
                                            </Space>
                                        </div>
                                    ))}
                                </div>
                            )
                        },
                    }}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total: number) => `共 ${total} 个专业`,
                    }}
                    formProps={{
                        labelCol: { span: 6 },
                        wrapperCol: { span: 18 },
                        labelAlign: 'right',
                    }}
                />
            </div>

            <Modal
                title={isEditMode ? '编辑' : '新建'}
                open={modalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={modalLoading}
                        onClick={handleSubmitMajor}
                    >
                        确定
                    </Button>,
                ]}
                width={520}
                destroyOnClose
            >
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    labelAlign="right"
                >
                    <Form.Item
                        name="name"
                        label="专业名称"
                        rules={[
                            { required: true, message: '请输入专业名称' },
                            { max: 20, message: '专业名称不能超过20个字符' },
                        ]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item
                        name="majorNum"
                        label="专业代码"
                        rules={[{ max: 20, message: '专业代码不能超过20个字符' }]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item
                        name="collegeCode"
                        label="所属学院"
                        rules={[{ required: true, message: '请选择所属学院' }]}
                    >
                        <Select
                            placeholder="请选择"
                            loading={collegeLoading}
                            showSearch
                            filterOption={(input, option) =>
                                String(option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={collegeOptions.map(item => ({
                                label: item.name,
                                value: item.code,
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={editingTrainLevel ? '编辑培养层次' : '添加培养层次'}
                open={trainLevelModalVisible}
                onCancel={handleCancelTrainLevel}
                footer={[
                    <Button key="cancel" onClick={handleCancelTrainLevel}>
                        取消
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={trainLevelLoading}
                        onClick={handleAddTrainLevelSubmit}
                    >
                        确定
                    </Button>,
                ]}
                width={600}
                destroyOnClose
            >
                <Form
                    form={trainLevelForm}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    labelAlign="right"
                >
                    <Form.Item
                        name="level"
                        label="培养层级"
                        rules={[{ required: true, message: '请选择' }]}
                    >
                        <Select placeholder="请选择培养层级" disabled={!!editingTrainLevel}>
                            <Select.Option value={10}>中级技能</Select.Option>
                            <Select.Option value={20}>高级技能</Select.Option>
                            <Select.Option value={30}>预备技师（技师）</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="levelNum"
                        label="代码"
                        rules={[{ max: 20, message: '代码不能超过20个字符' }]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item label="起点学制" required>
                        <Form.List name="eduList">
                            {fields => (
                                <>
                                    {fields.map((field, index) => (
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                position: 'relative',
                                                marginBottom: 12,
                                                gap: 8,
                                            }}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'startPoint']}
                                                rules={[{ required: true, message: '请选择起点' }]}
                                                style={{ flex: 1, marginBottom: 0 }}
                                            >
                                                <Select placeholder="请选择起点">
                                                    <Select.Option value={10}>
                                                        初中起点
                                                    </Select.Option>
                                                    <Select.Option value={20}>
                                                        高中起点
                                                    </Select.Option>
                                                </Select>
                                            </Form.Item>
                                            <span>-</span>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'eduLen']}
                                                rules={[
                                                    { required: true, message: '请输入学制' },
                                                    {
                                                        type: 'number',
                                                        min: 1,
                                                        max: 10,
                                                        message: '学制范围为1-10年',
                                                    },
                                                ]}
                                                style={{ flex: 1, marginBottom: 0 }}
                                            >
                                                <InputNumber
                                                    placeholder="请输入学制"
                                                    min={1}
                                                    max={10}
                                                    precision={0}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                            <span>年</span>
                                            <Button
                                                style={{
                                                    opacity: fields.length > 1 ? 1 : 0,
                                                    pointerEvents:
                                                        fields.length > 1 ? 'auto' : 'none',
                                                    border: 'none',
                                                }}
                                                size="small"
                                                icon={<DeleteOutlined />}
                                                onClick={() => removeEduItem(index)}
                                            />
                                        </div>
                                    ))}
                                    {fields.length < 10 && (
                                        <Button
                                            type="dashed"
                                            onClick={addEduItem}
                                            icon={<PlusOutlined />}
                                            style={{ width: '100%' }}
                                        >
                                            添加
                                        </Button>
                                    )}
                                </>
                            )}
                        </Form.List>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default React.memo(Index)
