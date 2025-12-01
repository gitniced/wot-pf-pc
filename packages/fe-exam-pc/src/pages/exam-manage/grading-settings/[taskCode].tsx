// 阅卷设置

import Breadcrumbs from '@/components/Breadcrumbs'
import styles from './index.module.less'
import GradingDetail from '../components/GradingDetail'
import TitleBlock from '@/components/TitleBlock'
import { Button, Form, Radio, Select, Space, Spin, Tooltip, Typography, message } from 'antd'
import {
    GRADING_TYPE_ENUM,
    GRADING_TYPE_OPTIONS,
    MULTIPLE_TYPE_ENUM,
    MULTIPLE_TYPE_OPTIONS,
} from '../grading-manage/constants'
import type { IRouteParams, TeacherItem } from './interface'
import { observer, useLocalObservable } from 'mobx-react'
import MarkSettingStore from './store'
import { useEffect, useMemo, useState } from 'react'
import Footer from '@/components/Footer'
import { InfoCircleOutlined } from '@ant-design/icons'
import AssignTopicModal from './components/AssignTopic'
import { history, useParams } from 'umi'
import { TEACHER_STATE } from './constants'
import { QUESTION_TYPE_TEXT } from '@/pages/question/[type]/constants'
import { getCookie, SuperTable } from '@wotu/wotu-components'
import type { ColumnsTypeItem } from '@wotu/wotu-components/dist/esm/SuperTable/interface'

interface OptionItem {
    label: string
    value: number
}

export const generateTypeOptions = (questionTypes: number[]) => {
    return questionTypes.map(item => ({
        label: QUESTION_TYPE_TEXT[item],
        value: item,
    }))
}

const MarkSettings = () => {
    const [form] = Form.useForm()
    const { taskCode } = useParams() as IRouteParams
    const store = useLocalObservable(() => MarkSettingStore)
    const { gradingDetail, allQuestions, distributeQuestions } = store
    const { teacherDetails = [], stuCount = 0 } = gradingDetail

    const [currentType, setCurrentType] = useState<string>(GRADING_TYPE_ENUM.ALL)
    const [multi, setMulti] = useState<MULTIPLE_TYPE_ENUM>(MULTIPLE_TYPE_ENUM.FALSE)
    const [visible, setVisible] = useState<boolean>(false)

    // 已经选择的题型
    const [selectedTypes, setSelectedTypes] = useState<OptionItem[]>([])

    // 所有题型
    const allQuestionTypes = generateTypeOptions(gradingDetail.questionTypes ?? [])
    // 可以选择的题型（老师选择题型不可重复）
    const filteredOptions = allQuestionTypes.filter(
        o => !selectedTypes.map(i => i.value).includes(o.value),
    )

    useEffect(() => {
        document.title = '阅卷管理'
        store.getGradingDetail(taskCode)
    }, [])

    useEffect(() => {
        setCurrentType(gradingDetail.gradingType!)
        form.setFieldValue('gradingType', gradingDetail.gradingType!)
    }, [gradingDetail.gradingType])

    useEffect(() => {
        setMulti(gradingDetail.multipleState!)
        form.setFieldValue('multipleState', gradingDetail.multipleState!)
    }, [gradingDetail.multipleState])

    // 回填已经被选择的数据
    useEffect(() => {
        const selectedTypeValue: number[] = []
        gradingDetail.teacherDetails?.forEach(item => {
            selectedTypeValue.push(...item.questionTypes)
        })

        setSelectedTypes(generateTypeOptions([...new Set(selectedTypeValue)]))
    }, [gradingDetail.teacherDetails])

    // 整卷阅卷配置
    const rowSelection = {
        // 先过滤掉没有选中状态的数据，再取每条数据的userCode作为Key
        selectedRowKeys:
            teacherDetails
                ?.filter(item => item.selectState === TEACHER_STATE.SELECTED)
                .map(item => item.userCode) ?? [],
        onChange: (_selectedRowKeys: React.Key[]) => {
            const _teacherDetails = teacherDetails.map(item => ({
                ...item,
                // 如果老师的userCode不在_selectedRowKeys中，那么就是没有选中
                selectState: _selectedRowKeys.includes(item.userCode)
                    ? TEACHER_STATE.SELECTED
                    : TEACHER_STATE.NOT_SELECTED,
            }))

            store.changeGradingDetail(_teacherDetails)
        },
    }

    // 指定题型阅卷设置
    const handleSelectQuestionType = (selectedType: OptionItem, selectTeacher: TeacherItem) => {
        setSelectedTypes(prevState => {
            const length = prevState.filter(item => item.value === selectedType.value).length
            return length > 0 ? prevState : [...prevState, selectedType]
        })

        selectTeacher.questionTypes = [...selectTeacher.questionTypes, selectedType.value]
        const findIndex = teacherDetails?.findIndex(
            t => t.userCode === selectTeacher.userCode,
        ) as number

        teacherDetails[findIndex] = selectTeacher

        store.changeGradingDetail(teacherDetails)
    }
    // 取消选择
    const handleDeSelectQuestionType = (selectedType: OptionItem, selectTeacher: TeacherItem) => {
        selectTeacher.questionTypes = selectTeacher.questionTypes.filter(
            t => t !== selectedType.value,
        )

        const findIndex = teacherDetails?.findIndex(
            t => t.userCode === selectTeacher.userCode,
        ) as number
        teacherDetails[findIndex] = selectTeacher
        setSelectedTypes(prevState => {
            let hasSelect = false
            teacherDetails.map(item => {
                if (item.questionTypes.includes(selectedType.value)) {
                    hasSelect = true
                }
            })
            return hasSelect ? prevState : prevState.filter(s => s.value !== selectedType.value)
        })
        store.changeGradingDetail(teacherDetails)
    }

    // 指定题目阅卷配置
    const handleAssignTopic = () => {
        store.calculatorDistributeQuestions()
        setVisible(false)
    }

    // 保存阅卷配置
    const handleSaveSetting = () => {
        // 整卷阅卷配置至少选择一位老师
        if (currentType === GRADING_TYPE_ENUM.ALL) {
            // 已经选择的老师
            const selectedTeachers = teacherDetails.filter(
                item => item.selectState === TEACHER_STATE.SELECTED,
            )

            if (!selectedTeachers?.length) {
                message.error('请至少选择1名阅卷老师')
                return
            }
        }

        // 指定题型 需要校验本场考试所包含的全部主观题型是否都已经制定了老师
        if (currentType === GRADING_TYPE_ENUM.TYPE) {
            if (selectedTypes.length !== allQuestionTypes.length) {
                const questionNames = allQuestionTypes
                    .filter(item => !selectedTypes.map(s => s.value).includes(item.value))
                    .map(item => item.label)

                message.error(`${questionNames.join('、')}未设置阅卷老师`)
                return
            }
        }

        // 指定题目 校验所有题目是否都已经制定老师了
        if (currentType === GRADING_TYPE_ENUM.QUESTION) {
            if (distributeQuestions < allQuestions) {
                message.error(`存在${allQuestions - distributeQuestions}题待分配`)
                return
            }
        }

        store.saveGradingSetting(taskCode, { currentType, multipleState: multi }).then(() => {
            message.success('保存成功')
            history.goBack()
        })
    }

    // 计算人均阅卷数
    const getPaperUnitCount = () => {
        const teacherTotalCount = teacherDetails.length
        // 判断是否可以平均分配
        const isRemainder = stuCount % teacherTotalCount

        if (teacherTotalCount) {
            const unitPaper = Math.floor(stuCount / teacherTotalCount)
            // 如果不能平均分配
            if (isRemainder) {
                return `${unitPaper}~${unitPaper + 1}`
            }

            return unitPaper
        }

        return teacherTotalCount
    }

    // 取消
    const handleCancel = () => {
        history.goBack()
    }

    const desensitizationList = [
        {
            key: 'name',
            type: '1',
            sign: true,
        },
        {
            key: 'phone',
            type: '2',
        },
    ]

    const columns: ColumnsTypeItem<TeacherItem>[] = [
        {
            title: '阅卷老师',
            dataIndex: 'name',
            width: 200,
        },
        {
            title: '手机号码',
            dataIndex: 'phone',
            width: 200,
        },
        {
            title: '阅卷题型',
            width: 240,
            render: (_, record) => (
                <Select
                    mode="multiple"
                    placeholder="请选择"
                    labelInValue
                    value={generateTypeOptions(record.questionTypes)}
                    options={multi === MULTIPLE_TYPE_ENUM.TRUE ? allQuestionTypes : filteredOptions}
                    onSelect={_selectedTypes => handleSelectQuestionType(_selectedTypes, record)}
                    onDeselect={_selectedTypes =>
                        handleDeSelectQuestionType(_selectedTypes, record)
                    }
                />
            ),
            hide: currentType !== GRADING_TYPE_ENUM.TYPE,
        },
        {
            // @ts-ignore
            title: (
                <Tooltip title="若考试设置了随机试卷或随机考卷，实际阅卷题数将小于分配题数">
                    分配题数
                    <InfoCircleOutlined />
                </Tooltip>
            ),
            dataIndex: 'questionCodes',
            hide: currentType !== GRADING_TYPE_ENUM.QUESTION,
            render: questionCodes => questionCodes.length,
        },
    ]

    const renderLabel = useMemo(() => {
        if (currentType === GRADING_TYPE_ENUM.ALL) {
            return '阅卷老师'
        }

        if (multi === MULTIPLE_TYPE_ENUM.FALSE) {
            return '题型任务分配'
        }

        return (
            <Space>
                题型任务分配
                <Tooltip
                    title={
                        currentType === GRADING_TYPE_ENUM.TYPE
                            ? '1个题型支持指定多名阅卷老师，不同题型阅卷老师可重复'
                            : '1道题目支持指定多名阅卷老师，不同题目阅卷老师可重复'
                    }
                >
                    <InfoCircleOutlined />
                </Tooltip>
            </Space>
        )
    }, [currentType, multi])

    return (
        <Spin spinning={store.loading}>
            <div className={styles.page_mark_settings}>
                <Breadcrumbs
                    crumbData={[
                        { link: '/exam-manage/grading-manage', name: '阅卷管理' },
                        { name: '阅卷设置' },
                    ]}
                />

                <GradingDetail {...store.gradingDetail} />

                <div className={styles.content_wrapper}>
                    <TitleBlock title="阅卷设置" />
                    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        {/* todo ew */}
                        {getCookie('ALIAS') === 'ew' && <Form.Item
                            label="评分模式"
                            initialValue={'1'}
                            name="评分模式"
                            rules={[{ required: true, message: '评分模式' }]}
                        >
                            <Radio.Group
                                options={[
                                    { label: '单评', value: '1' },
                                    { label: '双评', value: '2' },
                                    { label: '三评', value: '3' },
                                    { label: '整卷', value: '4' },
                                ]}
                            />
                        </Form.Item>}
                        <Form.Item
                            label="阅卷方式"
                            initialValue={currentType}
                            name="gradingType"
                            rules={[{ required: true, message: '请选择阅卷方式' }]}
                        >
                            <Radio.Group
                                options={getCookie('ALIAS') === 'esh' ? GRADING_TYPE_OPTIONS.slice(0, 2) : GRADING_TYPE_OPTIONS}
                                onChange={e => {
                                    setCurrentType(e.target.value)
                                    setMulti(MULTIPLE_TYPE_ENUM.FALSE)
                                    form.setFieldValue('multipleState', MULTIPLE_TYPE_ENUM.FALSE)
                                    store.resetGradingDetail()
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="多人阅卷取平均分"
                            initialValue={MULTIPLE_TYPE_ENUM.FALSE}
                            name="multipleState"
                            rules={[{ required: true, message: '请选择阅卷方式' }]}
                        >
                            <Radio.Group
                                options={MULTIPLE_TYPE_OPTIONS}
                                onChange={e => {
                                    setMulti(e.target.value)
                                    store.resetGradingDetail()
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label={renderLabel}
                            name="teachers"
                            rules={[{ required: true, message: '请选择阅卷老师' }]}
                        >
                            {currentType === GRADING_TYPE_ENUM.QUESTION && (
                                <div className={styles.assign_topic}>
                                    <Button type="primary" onClick={() => setVisible(true)}>
                                        分配题目
                                    </Button>
                                    <Typography.Text>
                                        已分配
                                        <Typography.Link>{distributeQuestions}</Typography.Link>
                                        题，待分配
                                        <Typography.Text type="danger">
                                            {allQuestions - distributeQuestions}
                                        </Typography.Text>
                                        题
                                    </Typography.Text>
                                </div>
                            )}
                            <SuperTable
                                bordered
                                rowKey="userCode"
                                // @ts-ignore
                                desensitizationList={desensitizationList}
                                dataSource={store.gradingDetail.teacherDetails ?? []}
                                columns={columns}
                                rowSelection={
                                    currentType === GRADING_TYPE_ENUM.ALL ? rowSelection : undefined
                                }
                                pagination={false}
                                search={false}
                            />
                            {currentType === GRADING_TYPE_ENUM.ALL && (
                                <Form.Item dependencies={['multipleState']}>
                                    {({ getFieldValue }) => {
                                        const multipleState = getFieldValue('multipleState')
                                        if (multipleState === MULTIPLE_TYPE_ENUM.TRUE) return null
                                        return (
                                            <div className={styles.tips}>
                                                人均阅卷份数为
                                                <Typography.Link>
                                                    {getPaperUnitCount()}
                                                </Typography.Link>
                                                份，供参考，非强制要求
                                            </div>
                                        )
                                    }}
                                </Form.Item>
                            )}
                        </Form.Item>
                    </Form>
                </div>

                <Footer>
                    <div className={styles.footer_inner}>
                        <Button onClick={handleCancel}>取消</Button>
                        <Button type="primary" onClick={handleSaveSetting}>
                            保存
                        </Button>
                    </div>
                </Footer>

                <AssignTopicModal visible={visible} onOk={handleAssignTopic} multiple={multi} />
            </div>
        </Spin>
    )
}

export default observer(MarkSettings)
