// 阅卷设置详情

import { Button, Form, Modal } from 'antd'
import type { ColumnType } from 'antd/lib/table'
import {
    GRADING_TYPE_ENUM,
    GRADING_TYPE_TEXT,
    MULTIPLE_TYPE_TEXT,
} from '../../grading-manage/constants'
import styles from './index.module.less'

import PaperItemComp from './PaperItem'
import MarkSettingStore from '../store'
import { observer, useLocalObservable } from 'mobx-react'
import type { IRouteParams, MarkSettingModalProps, TeacherItem } from '../interface'
import { generateTypeOptions } from '../[taskCode]'
import { isEmpty } from 'lodash'
import { TEACHER_STATE } from '../constants'
import { useParams } from 'umi'
import { useEffect } from 'react'
import { getDecodeInfo } from '@wotu/wotu-components'
import BusinessTable from '@/components/BusinessTable'

const MarkSettingDetail = ({ open, onCancel }: MarkSettingModalProps) => {
    const [form] = Form.useForm()
    const { taskCode } = useParams() as IRouteParams

    const store = useLocalObservable(() => MarkSettingStore)

    const { gradingDetail, gradingPaperList } = store
    const { gradingType, teacherDetails = [], multipleState } = gradingDetail

    useEffect(() => {
        if (open) {
            store.getGradingQuestion(taskCode)
        }
    }, [open])

    const renderLabel = () => {
        return gradingType === GRADING_TYPE_ENUM.ALL ? '阅卷老师' : '题目任务分配'
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

    const renderColumns = () => {
        const allColumns: ColumnType<TeacherItem>[] = [
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
                dataIndex: 'questionTypes',
                width: 240,
                render: questionTypes => {
                    const questionTypeNames = generateTypeOptions(questionTypes).map(
                        item => item.label,
                    )

                    return !isEmpty(questionTypeNames) ? questionTypeNames.join('、') : '无'
                },
            },
        ]
        return allColumns
    }

    // 题型
    const renderType = () => {
        return (
            <BusinessTable
                bordered
                rowKey="userCode"
                isFirstToRequest={false}
                search={false}
                toolBar={false}
                dataSource={gradingDetail.teacherDetails}
                columns={renderColumns() as unknown as any}
                pagination={false}
                desensitizationList={desensitizationList as unknown as any}
            />
        )
    }
    // 试卷
    const renderPaper = () => {
        return (
            <div className={styles.paper_list}>
                {gradingPaperList.map((item, index) => (
                    <PaperItemComp
                        paper={{ ...item, index }}
                        key={item.paperCode}
                        mode="preview"
                        multiple={multipleState!}
                    />
                ))}
            </div>
        )
    }

    // 配置详情
    const renderSettingDetail = () => {
        if (gradingType === GRADING_TYPE_ENUM.ALL) {
            const teacherName = teacherDetails
                .filter(item => item.selectState === TEACHER_STATE.SELECTED)
                .map(item => item.name)
            return teacherName.length > 0 ? teacherName.map(i => getDecodeInfo(i)) : '--'
        }
        if (gradingType === GRADING_TYPE_ENUM.TYPE) {
            return renderType()
        }
        if (gradingType === GRADING_TYPE_ENUM.QUESTION) {
            return renderPaper()
        }
    }

    return (
        <Modal
            centered
            title="阅卷设置详情"
            width={800}
            open={open}
            onCancel={onCancel}
            maskClosable={false}
            footer={
                <Button type="primary" onClick={onCancel}>
                    关闭
                </Button>
            }
            className={styles.grading_setting_modal}
        >
            <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                <Form.Item label="阅卷方式" name="gradingType">
                    <span>{GRADING_TYPE_TEXT[gradingType!]}</span>
                </Form.Item>
                <Form.Item label="多人阅卷取平均分" name="multipleState">
                    <span>{MULTIPLE_TYPE_TEXT[multipleState!]}</span>
                </Form.Item>
                <Form.Item label={renderLabel()} name="gradingType">
                    {renderSettingDetail()}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default observer(MarkSettingDetail)
