import Breadcrumbs from '@/components/Breadcrumbs'
import styles from './index.module.less'
import { Button, Form, Input, Modal, Radio, Select, Space, Steps, Tooltip, message } from 'antd'
import TitleAdvance from './components/TitleAdvance'
import { CheckCircleFilled, InfoCircleOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import UserSelect from './components/UserSelect'
import { PRACTICE_SOURCE, PUBLISH_STATE_ENUM } from '../constants'
import { ObserverPublishContent } from './components/PublishModal'
import { observer, useLocalObservable } from 'mobx-react'
import { history } from 'umi'

import PracticeStore from '../store'
import type {
    MerchantPracticeItem,
    PracticeListItem,
    RouteQuery,
    SelectQuestionDto,
} from '../interface'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { Moment } from 'moment'
import { isEmpty } from 'lodash'

import { JOIN_USER_ENUM, QUESTION_SELECT_TYPE, STEP_ENUM } from './constants'
import SelectQuestion from './components/SelectQuestion'
import useUserStore from '@/hooks/useUserStore'
import { DatePicker } from '@/components/Picker'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

const PracticeEdit = () => {
    const userStore = useUserStore()

    const [form] = Form.useForm()
    // 来源默认自建
    const { code, sourceType } = history.location.query as RouteQuery

    // 是否是编辑页面
    const isEditPage = !!code

    const store = useLocalObservable(() => PracticeStore)

    const { practiceDetail, personList, merchantPracticeList, loading } = store

    const { selectQuestionDto, joinStatus, questionType } = practiceDetail

    // 当前步骤
    const [currentStep, setCurrentStep] = useState<number>(STEP_ENUM.FIRST)
    // 是否已经调用了form.validated方法，为了动态显示模拟题的help
    const [hasValidated, setHasValidated] = useState<boolean>(false)
    // 当前选择的资源方练习
    const [currentMerchantPractice, setCurrentMerchantPractice] = useState<MerchantPracticeItem>()

    // 是否已经选择了题目
    const hasSelectQuestion = useMemo(() => {
        // 如果抽题方式是按职业目录，就判断职业目录列表是否为空
        if (questionType === QUESTION_SELECT_TYPE.WORK)
            return !isEmpty(selectQuestionDto?.commonJobCustomDtoList)

        // 否则就判断知识点分类列表是否为空
        return !isEmpty(selectQuestionDto?.knowledgePointInfoList)
    }, [questionType, selectQuestionDto])

    // 回显数据
    useEffect(() => {
        document.title = isEditPage ? '编辑' : '新建'
        if (isEditPage) {
            // @ts-ignore
            store.getPracticeDetail(code).then((values: PracticeListItem) => {
                // 标题，开始日期，结束日期，题库资源方练习code（如果练习 创建自 资源方练习才会有sourceCode）
                // 模拟题（职业目录/知识点分类数据），
                const {
                    title,
                    startTime,
                    endTime,
                    sourceCode,
                    selectQuestionDto: _selectQuestionDto,
                } = values

                // 回显Form表单
                form.setFieldsValue({
                    title,
                    sourceCode,
                    selectQuestionDto: _selectQuestionDto,
                    startTime: startTime ? dayjs(startTime) : null,
                    endTime: endTime ? dayjs(endTime) : null,
                })

                // 判断如果是从资源方创建的练习，需要直接请求练习下面的题目
                if (sourceCode) {
                    store.getSelectQuestion(sourceCode).then((res: any) => {
                        form.setFieldsValue({ selectQuestionDto: res })
                    })

                    store.getPracticeListByMerchant().then((res: any) => {
                        const _currentMerchantPractice = res.find(
                            (item: MerchantPracticeItem) => item.practiceCode === sourceCode,
                        )
                        setCurrentMerchantPractice(_currentMerchantPractice)
                    })
                }
            })
        }

        if (!isEditPage && Number(sourceType) === QUESTION_SELECT_TYPE.KNOWLEDGE) {
            store.getPracticeListByMerchant()
        }

        return () => {
            // 清空数据
            store.practiceDetail = {
                joinStatus: JOIN_USER_ENUM.NOT_LIMIT,
                questionType: QUESTION_SELECT_TYPE.WORK,
            }
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
            const { title, startTime, endTime, sourceCode } = values

            // 如果当前选择了资源方推送的练习，那么需要判断开始时间和结束时间是否在使用时效范围内
            const { startTime: merchantStartTime, endTime: merchantEndTime } =
                currentMerchantPractice ?? {}

            // 资源方推送的开始时间和结束时间都存在
            if (merchantStartTime && merchantEndTime) {
                if (startTime < merchantStartTime || endTime > merchantEndTime) {
                    return message.warning(
                        `当前选择的资源库练习使用时效为${dayjs(merchantStartTime).format(
                            'YYYY-MM-DD',
                        )}~${dayjs(merchantEndTime).format(
                            'YYYY-MM-DD',
                        )}，请修改练习起止时间后再发布`,
                    )
                }
            }

            // 资源方推送的开始时间限制，结束时间不限制
            if (merchantStartTime && !merchantEndTime) {
                if (!startTime || startTime < merchantStartTime) {
                    return message.warning(
                        `当前选择的资源库练习使用时效${dayjs(merchantStartTime).format(
                            'YYYY-MM-DD',
                        )}~永久，请修改练习起止时间后再发布`,
                    )
                }
            }

            // 资源方推送的开始时间不限制，结束时间限制
            if (!merchantStartTime && merchantEndTime) {
                if (endTime > merchantEndTime || !endTime) {
                    return message.warning(
                        `当前选择的资源库练习使用时效${dayjs(merchantStartTime).format(
                            'YYYY-MM-DD',
                        )}截止，请修改练习起止时间后再发布`,
                    )
                }
            }

            // 资源方推送的练习开始时间和结束时间都不限制，进行下一步操作
            store.updatePractice({
                title,
                sourceCode,
                sourceType: Number(sourceType),
                startTime: startTime ? dayjs(startTime).startOf('day').valueOf() : null,
                endTime: endTime ? dayjs(endTime).endOf('day').valueOf() : null,
            })
            // 新建刷题或者还没有调用前置接口的时候才需要调用前置接口
            if (!isEditPage && !practiceDetail.code) {
                // 调用前置接口生成刷题code，因为第二步选择用户的时候需要建立和刷题之间的关系
                store.createPracticePre(userStore?.selectedOrganization).then(() => {
                    handleChangeStep(STEP_ENUM.SECOND)

                    // 判断如果是从资源方创建的练习，需要直接请求练习下面的题目
                    if (sourceCode) {
                        store.getSelectQuestion(sourceCode).then((res: any) => {
                            form.setFieldsValue({ selectQuestionDto: res })
                        })
                    }
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

            // 如果选择了指定用户，指定用户不能为空
            if (joinStatus === JOIN_USER_ENUM.PART && isEmpty(personList)) {
                message.error('当前未选择任何用户，请先添加用户')
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

            // 如果选择了指定用户，指定用户不能为空
            if (joinStatus === JOIN_USER_ENUM.PART && isEmpty(personList)) {
                message.error('当前未选择任何用户，请先添加用户')
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

    // 更新开始日期
    const handleChangeStartTime = (startTime: Moment | null) => {
        const { endTime } = form.getFieldsValue()
        // 结束日期存在且结束日期小于开始日期的时候，需要更新结束日期，将结束日期置为开始日期
        if (endTime && startTime && startTime > endTime) {
            form.setFieldValue('endTime', startTime)
        }
    }

    const disabledDate = (current: Moment | Dayjs) => {
        // 当前选择的结束时间，需要和资源方结束时间做对比，取最近的
        const { endTime } = form.getFieldsValue()

        const { startTime: merchantStartTime, endTime: merchantEndTime } =
            currentMerchantPractice ?? {}

        // 今天以前的时间
        const disabledPrev = current < dayjs().startOf('day')
        // 资源方禁用的开始时间
        const disabledMerchantStartTime = current < dayjs(merchantStartTime).startOf('day')

        // 如果选择的结束时间和资源方结束时间都存在的话，可选择的结束时间取最近的结束时间
        const recentEndTime =
            endTime && merchantEndTime
                ? Math.min(merchantEndTime!, endTime)
                : merchantEndTime || endTime

        // 结束时间之后的时间
        const disabledNext = current > dayjs(recentEndTime).endOf('day')
        // 开始时间和结束时间都有限制
        if (merchantStartTime && recentEndTime) {
            return disabledMerchantStartTime || disabledNext
        }

        // 资源方只设置了开始时间，那么可选择的开始时间大于等于资源方练习的开始时间
        if (merchantStartTime && !recentEndTime) {
            return disabledMerchantStartTime
        }

        // 只设置了结束时间
        if (!merchantStartTime && recentEndTime) {
            return disabledPrev || disabledNext
        }

        // 开始时间和结束时间都没有限制
        return disabledPrev
    }

    const disabledEndDate = (current: Moment | Dayjs) => {
        // 当前选择的开始时间，需要和资源方开始时间做对比，取最近的
        const { startTime } = form.getFieldsValue()

        const { startTime: merchantStartTime, endTime: merchantEndTime } =
            currentMerchantPractice ?? {}

        // 资源方禁用的结束时间
        const disabledMerchantEndTime = current > dayjs(merchantEndTime).endOf('day')

        // 如果选择的开始时间和资源方开始时间都存在的话，可选择的开始时间取最近的开始时间
        const recentStartTime =
            startTime && merchantStartTime
                ? Math.max(merchantStartTime!, startTime)
                : merchantStartTime || startTime

        const disabledPrev = current < dayjs().startOf('day')

        // 开始时间之前的时间
        const disabledRecentPrev = current < dayjs(recentStartTime).startOf('day')

        // 开始时间和结束时间都有限制
        if (recentStartTime && merchantEndTime) {
            return disabledRecentPrev || disabledMerchantEndTime
        }

        // 设置了开始时间，没有限制结束时间
        if (recentStartTime && !merchantEndTime) {
            return disabledRecentPrev
        }

        // 开始时间没有限制，结束时间不能超过资源方练习结束时间
        if (!recentStartTime && merchantEndTime) {
            return disabledPrev || disabledMerchantEndTime
        }

        // 开始时间和结束时间都没有限制
        return !merchantEndTime ? disabledPrev : false
    }

    // 选择资源库练习
    const handleChangeSource = (option: MerchantPracticeItem) => {
        const { startTime, endTime } = option
        // 选择之后自动回显开始时间和结束时间
        form.setFieldsValue({
            startTime: startTime ? dayjs(startTime) : null,
            endTime: endTime ? dayjs(endTime) : null,
        })
        setCurrentMerchantPractice(option)
    }

    const handleChangeSelectType = (_questionType: QUESTION_SELECT_TYPE) => {
        store.updatePractice({ questionType: _questionType })
    }

    const firstStepContent = (
        <div className={styles.first_content_wrapper}>
            <TitleAdvance title="基本信息">
                {Number(sourceType) === PRACTICE_SOURCE.SELF_BUILT ? (
                    <Form.Item
                        label="练习标题"
                        name="title"
                        rules={[{ required: true, message: '请输入练习标题' }]}
                    >
                        <Input placeholder="请输入" maxLength={50} showCount />
                    </Form.Item>
                ) : (
                    <Form.Item
                        label="选择资源库练习"
                        name="sourceCode"
                        rules={[{ required: true, message: '请选择资源库练习' }]}
                    >
                        <Select
                            placeholder="请选择"
                            options={merchantPracticeList.map(item => ({
                                label: item.title,
                                value: item.practiceCode,
                                startTime: item.startTime,
                                endTime: item.endTime,
                            }))}
                            onChange={(_, option) =>
                                handleChangeSource(option as unknown as MerchantPracticeItem)
                            }
                        />
                    </Form.Item>
                )}

                <Form.Item
                    label={
                        <Tooltip title="不设置开始日期则即刻可练习">
                            开始时间 <InfoCircleOutlined />
                        </Tooltip>
                    }
                    name="startTime"
                >
                    <DatePicker disabledDate={disabledDate} onChange={handleChangeStartTime} />
                </Form.Item>
                <Form.Item
                    label={
                        <Tooltip title="不设置结束日期则永久可练习">
                            结束时间 <InfoCircleOutlined />
                        </Tooltip>
                    }
                    name="endTime"
                >
                    <DatePicker disabledDate={disabledEndDate} />
                </Form.Item>
            </TitleAdvance>
        </div>
    )

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
                            loading={loading}
                            questionType={questionType}
                            selectQuestionDto={selectQuestionDto}
                            onChange={handleChangeSelectType}
                            onSelect={handleSelectDone}
                            hasSelectQuestion={hasSelectQuestion}
                        />
                    </Form.Item>
                </TitleAdvance>
                <TitleAdvance title="参与用户">
                    <Form.Item
                        label="参与用户"
                        name="joinStatus"
                        rules={[{ required: true, message: '请选择参与用户' }]}
                        initialValue={joinStatus}
                    >
                        <Radio.Group
                            value={joinStatus}
                            onChange={(e: any) =>
                                store.updatePractice({ joinStatus: e.target.value })
                            }
                        >
                            <Radio value={JOIN_USER_ENUM.NOT_LIMIT}>
                                <Tooltip title="获得练习链接的登录用户均可进行练习">
                                    不限 <InfoCircleOutlined />
                                </Tooltip>
                            </Radio>
                            <Radio value={JOIN_USER_ENUM.PART}>指定部分用户</Radio>
                        </Radio.Group>
                        {joinStatus === JOIN_USER_ENUM.PART && <UserSelect type="edit" />}
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
            <ObserverPublishContent practiceCode={code || practiceDetail.code} />
        </div>
    )

    return (
        <div className={styles.page_practice_edit_wrapper}>
            <div className={styles.page_practice_edit}>
                <Breadcrumbs
                    crumbData={[
                        { link: '/practice/list', name: '练习' },
                        { name: code ? '编辑' : '新建' },
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
