// 选择题目弹窗

import { Form, Modal, message } from 'antd'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'

import PracticeStore from '../../store'
import type { SelectByWorkModal } from './interface'
import { useEffect, useState } from 'react'
import type { Timeout } from 'ahooks/lib/useRequest/src/types'
import QuestionStore from '@/pages/question/[type]/store'
import type { CustomContent } from '../../interface'
import type { OptionProps } from 'antd/lib/select'
import { SuperCascader } from '@wotu/kp-components'
import useUserStore from '@/hooks/useUserStore'

// 按职业目录选择题目
const SelectByWork = ({ open, onOk, onCancel }: SelectByWorkModal) => {
    const userStore = useUserStore()

    const practiceStore = useLocalObservable(() => PracticeStore)
    const store = useLocalObservable(() => QuestionStore)

    const [form] = Form.useForm()

    const { practiceDetail } = practiceStore
    // 暂存已经选择的职业/工种/等级，确定选择的时候再去更新刷题的数据
    const [commonJobCustomDtoList, setCommonJobCustomDtoList] = useState<CustomContent[]>([])

    let inputEvent: Timeout[] = []

    useEffect(() => {
        return () => {
            inputEvent.map((i: Timeout) => {
                clearTimeout(i)
                inputEvent = []
            })
        }
    })

    useEffect(() => {
        const { selectQuestionDto } = practiceDetail
        const { commonJobCustomDtoList: _commonJobCustomDtoList = [] } = selectQuestionDto ?? {}
        if (!_commonJobCustomDtoList.length) return

        const currentCommonJob = _commonJobCustomDtoList[0]
        const { jobNameCode, jobTypeCode, jobLevelCode } = currentCommonJob
        const commonJob = [jobNameCode, jobTypeCode, jobLevelCode]

        form.setFieldValue('commonJob', commonJob)
        setCommonJobCustomDtoList(_commonJobCustomDtoList)

        // 获取额外的数据（例：之前创建的数据在第三页，初始化只获取第一页，导致渲染不对，手动获取第三页的数据，拼在options的最上面）z
        commonJob[0] && store.getExtraCommonJobList([commonJob[0]])
    }, [])

    // 搜索职业工种等级
    const handleSearchCommonJob = async ({ input, page }: { input: string; page: number }) => {
        return new Promise(resolve => {
            inputEvent.map((i: Timeout) => {
                clearTimeout(i)
                inputEvent = []
            })
            const t = setTimeout(() => {
                inputEvent.map((i: Timeout) => {
                    clearTimeout(i)
                    inputEvent = []
                })
                store.getCommonJobList({ name: input, pageNo: page }).then(res => {
                    resolve(res)
                })
            }, 500)

            inputEvent.push(t)
        })
    }

    // 修改自定义组件
    const handleChangeCustomContent = (selectedOptionList: any) => {
        const _commonJobCustomDtoList: CustomContent[] = []

        const [jobNameObj, jobTypeObj, jobLevelObj] = selectedOptionList ?? []

        const { hasWorkType } = jobNameObj

        let commonJobCustomDto: CustomContent = {
            jobName: jobNameObj?.label,
            jobNameCode: jobNameObj?.value,
        }

        // 处理只有等级没有工种的情况
        if (hasWorkType) {
            commonJobCustomDto = {
                ...commonJobCustomDto,
                jobType: jobTypeObj?.label,
                jobTypeCode: jobTypeObj?.value,
                jobLevel: jobLevelObj?.label,
                jobLevelCode: jobLevelObj?.value,
            }
        } else {
            commonJobCustomDto = {
                ...commonJobCustomDto,
                jobLevel: jobTypeObj?.label,
                jobLevelCode: jobTypeObj?.value,
            }
        }

        _commonJobCustomDtoList.push(commonJobCustomDto)

        setCommonJobCustomDtoList(_commonJobCustomDtoList)
    }

    // 确认选择
    const handleOk = () => {
        form.validateFields().then(() => {
            const { selectQuestionDto } = practiceDetail

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
                    <SuperCascader
                        changeOnSelect
                        placeholder="请选择"
                        colSetting={[
                            {
                                // @ts-ignore
                                onEventChange: handleSearchCommonJob,
                            },
                        ]}
                        extraOptions={store.commonJobList}
                        // @ts-ignore
                        onChange={(_: number[], selectedOptionList: OptionProps[]) =>
                            handleChangeCustomContent(selectedOptionList)
                        }
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default observer(SelectByWork)
