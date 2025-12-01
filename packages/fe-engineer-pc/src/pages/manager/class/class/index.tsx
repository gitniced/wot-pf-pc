import React, { useRef, useState, useCallback, useMemo } from 'react'
import { Button, message, Modal, Form, Input, Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { useSaasTitle } from '@wotu/wotu-components'
import BusinessTable from '@/components/BusinessTable'
import CustomTitle from '@/components/CustomTitle'
import styles from './index.module.less'
import type { IClass, IClassPageQuery, ISaveClassRequest } from './types'
import { getClassList, deleteClass, saveClass } from './service'
import { getClassTableColumns } from './column'
import { getMajorList, getTrainLevelsByMajor } from '../../organization/major/service'
import type { IMajor } from '../../organization/major/types'
import type { ITrainLevelResponse } from '../../organization/major/types'
import { isEqual } from 'lodash'

const Index: React.FC = () => {
    useSaasTitle('班级管理')
    const actionRef = useRef({
        reload: () => {},
    })

    const [_loading, _setLoading] = useState(false)
    const [form] = Form.useForm()
    const [modalVisible, setModalVisible] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [editingRecord, setEditingRecord] = useState<IClass | null>(null)
    const isEditMode = !!editingRecord
    const [formValue, setFormValue] = useState({})

    const [majorOptions, setMajorOptions] = useState<IMajor[]>([])
    const [majorLoading, setMajorLoading] = useState(false)
    const [trainLevelOptions, setTrainLevelOptions] = useState<ITrainLevelResponse[]>([])
    const [trainLevelLoading, setTrainLevelLoading] = useState(false)
    const [eduOptions, setEduOptions] = useState<
        { code: string; startPoint: number; eduLen: number }[]
    >([])
    const [_eduLoading, _setEduLoading] = useState(false)

    const _handleGetClassList = async (params: IClassPageQuery) => {
        _setLoading(true)
        try {
            const res = await getClassList({
                ...params,
                hasStatistics: true,
            })
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

    const handleDelete = (record: IClass) => {
        if (record.studentCount && record.studentCount > 0) {
            message.error('班级下已有学生，不可删除')
            return
        }

        Modal.confirm({
            type: 'warning',
            title: '确定要删除吗，该操作不可逆。',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                await deleteClass(record.code)
                message.success('删除成功')
                actionRef.current.reload()
            },
        })
    }

    const fetchMajorOptions = useCallback(async () => {
        setMajorLoading(true)
        try {
            const res = await getMajorList({
                status: 1,
                pageNo: 1,
                pageSize: 1000,
            })
            setMajorOptions(res.data || [])
        } finally {
            setMajorLoading(false)
        }
    }, [])

    const fetchTrainLevelOptions = useCallback(async (majorCode: string) => {
        if (!majorCode) return

        setTrainLevelLoading(true)
        try {
            const res = await getTrainLevelsByMajor(majorCode)
            setTrainLevelOptions(res || [])
        } finally {
            setTrainLevelLoading(false)
        }
    }, [])

    const handleEdit = async (record: IClass) => {
        setEditingRecord(record)

        form.setFieldsValue({
            name: record.name,
            majorCode: record.majorCode,
            trainLevelCode: record.trainLevelCode,
            trainLevelEduCode: record.trainLevelEduCode,
            enrollYear: record.enrollYear ? dayjs().year(record.enrollYear) : undefined,
        })

        setModalVisible(true)
        fetchMajorOptions()

        if (record.majorCode) {
            const trainLevels = await getTrainLevelsByMajor(record.majorCode)
            setTrainLevelOptions(trainLevels || [])

            if (record.trainLevelCode && trainLevels) {
                const selectedTrainLevel = trainLevels.find(
                    item => item.code === record.trainLevelCode,
                )
                if (selectedTrainLevel) {
                    setEduOptions(selectedTrainLevel.eduList || [])
                }
            }
        }
    }

    const handleMajorChange = (majorCode: string) => {
        form.setFieldsValue({
            trainLevelCode: undefined,
            trainLevelEduCode: undefined,
        })
        setTrainLevelOptions([])
        setEduOptions([])

        if (majorCode) {
            fetchTrainLevelOptions(majorCode)
        }
    }

    const handleTrainLevelChange = (trainLevelCode: string) => {
        form.setFieldsValue({
            trainLevelEduCode: undefined,
        })

        const selectedTrainLevel = trainLevelOptions.find(item => item.code === trainLevelCode)
        if (selectedTrainLevel) {
            setEduOptions(selectedTrainLevel.eduList || [])
        } else {
            setEduOptions([])
        }
    }

    const handleAdd = () => {
        setEditingRecord(null)
        form.resetFields()
        setModalVisible(true)
        setMajorOptions([])
        setTrainLevelOptions([])
        setEduOptions([])
        fetchMajorOptions()
    }

    const handleSubmitClass = async () => {
        try {
            const values = await form.validateFields()
            setModalLoading(true)

            const classData: ISaveClassRequest = {
                name: values.name,
                majorCode: values.majorCode,
                trainLevelCode: values.trainLevelCode,
                trainLevelEduCode: values.trainLevelEduCode,
                enrollYear: values.enrollYear ? values.enrollYear.year() : undefined,
                ...(isEditMode && {
                    code: editingRecord!.code,
                }),
            }

            await saveClass(classData)
            message.success(`${isEditMode ? '编辑' : '新建'}班级成功`)
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
        setMajorOptions([])
        setTrainLevelOptions([])
        setEduOptions([])
    }

    const columns = useMemo(() => {
        return getClassTableColumns(handleEdit, handleDelete, formValue)
    }, [JSON.stringify(formValue)])

    return (
        <div className={styles.page}>
            <CustomTitle title="班级管理" marginBottom={32} />

            <div className={styles.content}>
                <BusinessTable
                    actionRef={actionRef}
                    search={{}}
                    scroll={{ x: 1400 }}
                    renderOptionBar={() => (
                        <Button type="primary" onClick={handleAdd}>
                            新建
                        </Button>
                    )}
                    columns={columns}
                    request={_handleGetClassList as any}
                    rowKey="code"
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: (total: number) => `共 ${total} 个班级`,
                    }}
                    beforeSearchSubmit={v => {
                        return {
                            ...v,
                            enrollYear: v.enrollYear?.year(),
                            graduateYear: v.graduateYear?.year(),
                        }
                    }}
                    formProps={{
                        labelCol: { span: 6 },
                        wrapperCol: { span: 18 },
                        labelAlign: 'right',
                        onValuesChange: (_, all) => {
                            let currentValues = formValue || {}
                            const itemList = ['majorCode', 'trainLevelCode'].reverse()

                            if (!isEqual(all, currentValues)) {
                                let resetEndIndex: number = 0
                                itemList.some((key, index) => {
                                    if (all[key] && all[key] !== currentValues[key]) {
                                        currentValues[key] = all[key]
                                        resetEndIndex = index
                                        return true
                                    } else {
                                        if (Object.prototype.hasOwnProperty.call(all, key)) {
                                            currentValues[key] = all[key]
                                        }
                                        return false
                                    }
                                })
                                // 当专业改变时，重置培养层级
                                if (resetEndIndex > 0) {
                                    // 这里可以通过其他方式重置字段，或者让组件自己处理
                                }
                                setFormValue({ ...all })
                            }
                        },
                    }}
                    onReset={() => {
                        setFormValue({})
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
                        onClick={handleSubmitClass}
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
                        label="班级名称"
                        rules={[
                            { required: true, message: '请输入班级名称' },
                            { max: 20, message: '班级名称不能超过20个字符' },
                        ]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>

                    <Form.Item
                        name="majorCode"
                        label="专业"
                        rules={[{ required: true, message: '请选择专业' }]}
                    >
                        <Select
                            placeholder="请输入关键字搜索"
                            showSearch
                            loading={majorLoading}
                            onChange={handleMajorChange}
                            filterOption={(input, option) =>
                                String(option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {majorOptions.map(item => (
                                <Select.Option key={item.code} value={item.code} label={item.name}>
                                    <div>
                                        <div>{item.name}</div>
                                        <div style={{ fontSize: '12px', color: '#999' }}>
                                            代码：{item.majorNum}
                                        </div>
                                    </div>
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="trainLevelCode"
                        label="培养层级"
                        rules={[{ required: true, message: '请选择培养层级' }]}
                    >
                        <Select
                            placeholder="请选择"
                            loading={trainLevelLoading}
                            onChange={handleTrainLevelChange}
                            disabled={!form.getFieldValue('majorCode')}
                        >
                            {trainLevelOptions.map(item => {
                                const levelMap: Record<number, string> = {
                                    10: '中级技能',
                                    20: '高级技能',
                                    30: '预备技师',
                                }
                                return (
                                    <Select.Option key={item.code} value={item.code}>
                                        <div>
                                            <div>
                                                {levelMap[item.level] || `培养层级${item.level}`}
                                            </div>
                                            {item.levelNum && (
                                                <div style={{ fontSize: '12px', color: '#999' }}>
                                                    代码：{item.levelNum}
                                                </div>
                                            )}
                                        </div>
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="trainLevelEduCode"
                        label="起点学制"
                        rules={[{ required: true, message: '请选择起点学制' }]}
                    >
                        <Select
                            placeholder="请选择"
                            disabled={!form.getFieldValue('trainLevelCode')}
                        >
                            {eduOptions.map(item => {
                                const startPointMap: Record<number, string> = {
                                    10: '初中起点',
                                    20: '高中起点',
                                }
                                return (
                                    <Select.Option key={item.code} value={item.code}>
                                        {startPointMap[item.startPoint] || `起点${item.startPoint}`}
                                        {item.eduLen}年
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="enrollYear"
                        label="入学年份"
                        rules={[{ required: true, message: '请选择入学年份' }]}
                    >
                        <DatePicker
                            picker="year"
                            placeholder="请选择"
                            style={{ width: '100%' }}
                            disabledDate={current => {
                                // 限制选择范围为当前年份前后10年
                                const currentYear = new Date().getFullYear()
                                return (
                                    current &&
                                    (current.year() < currentYear - 10 ||
                                        current.year() > currentYear + 10)
                                )
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default React.memo(Index)
