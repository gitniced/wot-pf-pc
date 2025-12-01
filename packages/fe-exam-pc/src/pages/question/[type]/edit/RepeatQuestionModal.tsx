// 重复试题弹窗

import { Modal } from 'antd'
import QuestionList from '../check/QuestionList'
import type { RepeatModalData } from './interface'
import styles from './index.module.less'

const RepeatQuestionModal: React.FC<RepeatModalData> = props => {
    const { open, questionList, callback, onCancel } = props

    return (
        <Modal
            open={open}
            title="存在重复试题"
            okText="仍要录入"
            width={800}
            onCancel={onCancel}
            onOk={callback}
            className={styles.repeat_question_modal}
        >
            <QuestionList
                showEdit={false}
                showDelete={false}
                maxCount={8}
                questionList={questionList}
            />
        </Modal>
    )
}

export default RepeatQuestionModal
