// 选择题目弹窗

import { Form, Modal, message } from 'antd'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'

import PracticeStore from '../../store'
import type { SelectByWorkModal } from './interface'
import { useEffect } from 'react'
import ProfessionCascade from '@/components/ProfessionCascade'
import useUserStore from '@/hooks/useUserStore'

// 按职业目录选择题目
const SelectByWork = ({
    open,
    onOk,
    onCancel,
}: // commonJobList = [],
SelectByWorkModal) => {
    const userStore = useUserStore()
    const [form] = Form.useForm()

    const practiceStore = useLocalObservable(() => PracticeStore)

    const { practiceDetail } = practiceStore

    useEffect(() => {
        const { selectQuestionDto } = practiceDetail
        const { commonJobCustomDtoList = [] } = selectQuestionDto ?? {}
        if (!commonJobCustomDtoList.length) return

        const currentCommonJob = commonJobCustomDtoList[0]
        const { jobName, jobNameCode, jobType, jobTypeCode, jobLevel, jobLevelCode } =
            currentCommonJob

        form.setFieldValue('commonJob', [
            {
                label: jobName,
                value: jobNameCode,
            },
            {
                label: jobType,
                value: jobTypeCode,
            },
            {
                label: jobLevel,
                value: jobLevelCode,
            },
        ])
    }, [open])

    // 确认选择
    const handleOk = () => {
        form.validateFields().then(({ commonJob = [] }: any) => {
            const { selectQuestionDto } = practiceDetail

            const [jobNameObj, jobTypeObj, jobLevelObj] = commonJob

            const commonJobCustomDtoList = [
                {
                    jobName: jobNameObj?.label,
                    jobNameCode: jobNameObj?.value,
                    jobType: jobTypeObj?.label,
                    jobTypeCode: jobTypeObj?.value,
                    jobLevel: jobLevelObj?.label,
                    jobLevelCode: jobLevelObj?.value,
                },
            ]

            const _selectQuestionDto = { ...selectQuestionDto, commonJobCustomDtoList }

            practiceStore.updatePractice({
                selectQuestionDto: _selectQuestionDto,
            })

            // 根据自定义字段请求题目
            PracticeStore.getPracticeQuestion(userStore?.selectedOrganization).then(() => {
                message.success('操作成功')
                onOk(_selectQuestionDto)
            })
        })
    }

    // 取消选择
    const handleCancel = () => {
        form.resetFields()
        onCancel()
    }

    return (
        <Modal
            centered
            width={700}
            open={open}
            title="选择模拟题"
            className={styles.select_by_work_modal}
            onCancel={handleCancel}
            onOk={handleOk}
        >
            <div className={styles.title}>根据职业目录选题</div>

            <Form form={form}>
                <Form.Item
                    label="职业/工种/等级"
                    name="commonJob"
                    rules={[{ required: true, message: '请选择职业/工种/等级' }]}
                    id="commonJobId"
                >
                    {/* @ts-ignore */}
                    <ProfessionCascade
                        type="JOB"
                        changeOnSelect
                        // onChange={(selectedOptionList: OptionProps[]) =>
                        //     handleChangeCustomContent(selectedOptionList)
                        // }
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default observer(SelectByWork)
