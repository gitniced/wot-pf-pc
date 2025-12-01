import Breadcrumbs from '@/components/Breadcrumbs'
import styles from './index.module.less'
import { Button, Form, Input, Modal, Space, Steps, Tooltip, message } from 'antd'
import TitleAdvance from './components/TitleAdvance'
import { CheckCircleFilled, InfoCircleOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { PUBLISH_STATE_ENUM } from '../constants'
import { observer, useLocalObservable } from 'mobx-react'
import { history } from 'umi'

import PracticeStore from '../store'
import type { PracticeListItem, RouteQuery, SelectQuestionDto } from '../interface'
import { isEmpty } from 'lodash'

import { QUESTION_SELECT_TYPE, STEP_ENUM } from './constants'
import SelectQuestion from './components/SelectQuestion'
import useUserStore from '@/hooks/useUserStore'

const PracticeEdit = () => {
    const userStore = useUserStore()

    const [form] = Form.useForm()
    const { code } = history.location.query as RouteQuery
    // 是否是编辑页面
    const isEditPage = !!code

    const store = useLocalObservable(() => PracticeStore)

    const { practiceDetail } = store

    const { selectQuestionDto, questionType } = practiceDetail

    // 当前步骤
    const [currentStep, setCurrentStep] = useState<number>(STEP_ENUM.FIRST)
    // 是否已经调用了form.validated方法，为了动态显示模拟题的help
    const [hasValidated, setHasValidated] = useState<boolean>(false)

    // 是否已经选择了题目
    const hasSelectQuestion = useMemo(() => {
        if (questionType === QUESTION_SELECT_TYPE.WORK)
            return !isEmpty(selectQuestionDto?.commonJobCustomDtoList)

        return !isEmpty(selectQuestionDto?.knowledgePointInfoList)
    }, [questionType, selectQuestionDto])

    // 回显数据
    useEffect(() => {
        document.title = code ? '编辑' : '新建'
        if (code) {
            // @ts-ignore
            store.getPracticeDetail(code).then((values: PracticeListItem) => {
                // 标题，模拟题
                const { title, selectQuestionDto } = values

                form.setFieldsValue({
                    title,
                    selectQuestionDto,
                })
            })
        }

        return () => {
            // 清空数据
            store.practiceDetail = { questionType: QUESTION_SELECT_TYPE.WORK }
        }
    }, [code])

    // 完成题目选择
    const handleSelectDone = (_selectQuestionDto: SelectQuestionDto) => {
        form.setFieldValue('selectQuestionDto', _selectQuestionDto)
    }

    // 切换步骤
    const handleChangeStep = (current: number) => {
        if (current === STEP_ENUM.FIRST) {
            setCurrentStep(current)
            return
        }

        // 表单校验通过才可以切换步骤
        form.validateFields().then(() => {
            setCurrentStep(current)
        })
    }

    // 取消
    const handleCancel = () => {
        // 第一步的取消和第三步的返回列表都是回到列表页，在第一步取消的时候需要二次弹窗确认
        if (currentStep === STEP_ENUM.FIRST) {
            Modal.confirm({
                centered: true,
                title: '取消后无法找回本次已填写的内容， 是否确定取消？',
                onOk: () => {
                    form.resetFields()
                    history.push('/practice/list')
                },
            })
            return
        }

        form.resetFields()
        history.push('/practice/list')
    }

    // 保存并下一步
    const handleSaveAndNext = () => {
        form.validateFields().then((values: any) => {
            const { title } = values
            store.updatePractice({ title })
            // 新建刷题或者还没有调用前置接口的时候才需要调用前置接口
            if (!isEditPage && !practiceDetail.code) {
                // 调用前置接口生成刷题code，因为第二步心中用户的时候需要建立和刷题之间的关系
                store.createPracticePre(userStore?.selectedOrganization).then(() => {
                    handleChangeStep(STEP_ENUM.SECOND)
                    message.success('保存成功')
                })
            } else {
                // 编辑或者已经调用了前置接口的情况下直接下一步
                handleChangeStep(STEP_ENUM.SECOND)
            }
        })
    }

    // 保存草稿
    const handleSaveDraft = () => {
        setHasValidated(true)
        // 保存草稿之前需要校验必填项（标题和模拟题）
        form.validateFields().then(() => {
            // 模拟题为0的情况下也相当于没有选择模拟题
            if (!selectQuestionDto?.totalCount) {
                message.error('当前未选择任何模拟题，请重新选择')
                return
            }

            store
                .createPractice(PUBLISH_STATE_ENUM.DRAFT, userStore?.selectedOrganization)
                .then(() => {
                    // 保存草稿成功停留在当前页面
                    message.success('保存成功')
                    setHasValidated(false)
                })
        })
    }

    // 保存并发布
    const handlePublish = () => {
        setHasValidated(true)
        // 发布之前需要校验必填项（标题和模拟题）
        form.validateFields().then(() => {
            // 模拟题为0的情况下也相当于没有选择模拟题
            if (!selectQuestionDto?.totalCount) {
                message.error('当前未选择任何模拟题，请重新选择')
                return
            }

            store
                .createPractice(PUBLISH_STATE_ENUM.PUBLISHED, userStore?.selectedOrganization)
                .then(() => {
                    // 发布之后到第三步
                    setCurrentStep(STEP_ENUM.THIRD)
                    setHasValidated(false)
                })
        })
    }

    // 再次创建
    const handleCreateAgain = () => {
        // 清空数据
        form.resetFields()
        store.practiceDetail = {}
        setCurrentStep(STEP_ENUM.FIRST)
        // 修改路由
        history.push('/practice/edit')
    }

    const firstStepContent = (
        <div className={styles.first_content_wrapper}>
            <TitleAdvance title="基本信息">
                <Form.Item
                    label="练习标题"
                    name="title"
                    rules={[{ required: true, message: '请输入练习标题' }]}
                >
                    <Input placeholder="请输入" maxLength={50} showCount />
                </Form.Item>
            </TitleAdvance>
        </div>
    )

    const handleChangeSelectType = (questionType: QUESTION_SELECT_TYPE) => {
        store.updatePractice({ questionType })
    }

    const secondStepContent = () => {
        return (
            <div className={styles.second_content_wrapper}>
                <TitleAdvance title="模拟题">
                    <Form.Item
                        label={
                            <Tooltip title="支持单选、多选、判断、组合4种题型">
                                抽题方式 <InfoCircleOutlined />
                            </Tooltip>
                        }
                        name="selectQuestionDto"
                        rules={[{ required: true, message: '请选择模拟题' }]}
                        help={!hasSelectQuestion && hasValidated ? '请选择模拟题' : ''}
                    >
                        <SelectQuestion
                            questionType={questionType}
                            selectQuestionDto={selectQuestionDto}
                            onChange={handleChangeSelectType}
                            onSelect={handleSelectDone}
                            hasSelectQuestion={hasSelectQuestion}
                        />
                    </Form.Item>
                </TitleAdvance>
            </div>
        )
    }

    const thirdStepContent = (
        <div className={styles.third_content_wrapper}>
            <div className={styles.left_wrapper}>
                <CheckCircleFilled />
                <div className={styles.text}>发布成功</div>
            </div>
        </div>
    )

    return (
        <div className={styles.page_practice_edit_wrapper}>
            <div className={styles.page_practice_edit}>
                <Breadcrumbs
                    crumbData={[
                        { link: '/practice/list', name: '练习' },
                        { link: '', name: code ? '编辑' : '新建' },
                    ]}
                />
                <div className={styles.step_wrapper}>
                    <Steps current={currentStep} onChange={handleChangeStep}>
                        <Steps.Step title="填写练习信息" />
                        <Steps.Step
                            title="设置练习权限"
                            disabled={!isEditPage && !practiceDetail.code}
                        />
                        {/* 不允许直接切换到第三步的发布 */}
                        <Steps.Step title="发布" disabled={true} />
                    </Steps>
                </div>

                <div className={styles.content_wrapper}>
                    <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 12 }}>
                        {currentStep === STEP_ENUM.FIRST
                            ? firstStepContent
                            : currentStep === STEP_ENUM.SECOND
                            ? secondStepContent
                            : thirdStepContent}
                    </Form>
                </div>
            </div>
            <div className={styles.footer_wrapper}>
                {currentStep === STEP_ENUM.FIRST && (
                    <Space size={16}>
                        <Button onClick={handleCancel}>取消</Button>
                        <Button type="primary" onClick={handleSaveAndNext}>
                            保存并下一步
                        </Button>
                    </Space>
                )}
                {currentStep === STEP_ENUM.SECOND && (
                    <Space size={16}>
                        <Button onClick={() => setCurrentStep(STEP_ENUM.FIRST)}>上一步</Button>
                        <Button onClick={handleSaveDraft}>保存草稿</Button>
                        <Button type="primary" onClick={handlePublish}>
                            保存并发布
                        </Button>
                    </Space>
                )}
                {currentStep === STEP_ENUM.THIRD && (
                    <Space size={16}>
                        <Button onClick={handleCancel}>返回列表</Button>
                        <Button type="primary" onClick={handleCreateAgain}>
                            再次创建
                        </Button>
                    </Space>
                )}
            </div>
        </div>
    )
}

export default observer(PracticeEdit)
