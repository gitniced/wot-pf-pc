// 分配题目弹窗

import { Button, Empty, Modal } from 'antd'
import type { ModalProps } from 'antd'
import styles from './index.module.less'
import { observer, useLocalObservable } from 'mobx-react'
import MarkSettingStore from '../store'
import { useEffect } from 'react'
import PaperItemComp from './PaperItem'
import type { IRouteParams } from '../interface'
import { useParams } from 'umi'
import type { MULTIPLE_TYPE_ENUM } from '../../grading-manage/constants'

interface IModalProps extends Omit<ModalProps, 'onOk'> {
    multiple:  MULTIPLE_TYPE_ENUM,
    onOk: () => void
}

const AssignTopicModal = (props: IModalProps) => {
    const { taskCode } = useParams() as IRouteParams
    const { visible, onOk, multiple } = props

    const store = useLocalObservable(() => MarkSettingStore)
    const { gradingDetail, gradingPaperList } = store
    const { teacherDetails = [] } = gradingDetail ?? {}

    useEffect(() => {
        store.getGradingQuestion(taskCode)
    }, [])

    // 给题目分配老师
    const handleSelectTeacher = (teacherUserCode: string | string[], questionCode: string) => {
        
        for (let i = 0; i < teacherDetails.length; i++) {
            const teacher = teacherDetails[i]

            if (teacher.questionCodes.includes(questionCode)) {
                teacher.questionCodes = teacher.questionCodes.filter(code => code !== questionCode)
            }

            if (teacher.userCode === teacherUserCode || teacherUserCode?.includes(teacher.userCode)) {
                teacher.questionCodes = [...teacher.questionCodes, questionCode]
            }
        }

        store.changeGradingDetail(teacherDetails)
        
    }

    return (
        <Modal
            centered
            visible={visible}
            title="分配题目"
            onCancel={onOk}
            maskClosable={false}
            className={styles.assign_topic_modal}
            footer={
                <Button type="primary" onClick={onOk}>
                    确定
                </Button>
            }
        >
            {gradingPaperList.length ? (
                // 试卷
                <div className={styles.paper_list}>
                    {gradingPaperList.map((item, index) => (
                        <PaperItemComp
                            mode="edit"
                            paper={{...item, index}}
                            key={item.paperTitle}
                            onChange={handleSelectTeacher}
                            multiple={multiple}
                        />
                    ))}
                </div>
            ) : (
                <Empty description="暂无可分配的题目" />
            )}
        </Modal>
    )
}

export default observer(AssignTopicModal)
