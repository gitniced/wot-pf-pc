import type { ComponentMapType } from '@/components/ModalProvider'
import { ModalFooterText, ModalTitle, ModalType } from './enums'

// TODO 添加描述
export const config: ComponentMapType = {
    [ModalType.ADD_REQUESTION]: {
        type: ModalType.ADD_REQUESTION,
        title: ModalTitle.ADD_REQUESTION,
        component: import(
            '@/components/PaperExamine/editTmp/components/ModalComponents/AddQuestionModal'
        ),
        width: 1000,
        centered: true,
        okText: ModalFooterText.ADD,
        cancelText: ModalFooterText.CANCEL,
    },
    [ModalType.REMOVE_REQUESTION]: {
        type: ModalType.REMOVE_REQUESTION,
        title: ModalTitle.REMOVE_REQUESTION,
        component: import(
            '@/components/PaperExamine/editTmp/components/ModalComponents/RemoveQuestionModal'
        ),
        width: 1000,
        centered: true,
        okText: ModalFooterText.REMOVE,
        cancelText: ModalFooterText.CANCEL,
    },
    [ModalType.NOTE]: {
        type: ModalType.NOTE,
        title: ModalTitle.NOTE,
        component: import('@/components/PaperExamine/editTmp/components/ModalComponents/NoteModal'),
        centered: true,
        okText: ModalFooterText.SAVE,
        cancelText: ModalFooterText.CANCEL,
    },
    [ModalType.VIEW_NOTE]: {
        type: ModalType.VIEW_NOTE,
        title: ModalTitle.VIEW_NOTE,
        component: import('@/components/PaperExamine/editTmp/components/ModalComponents/NoteModal'),
        centered: true,
        okText: ModalFooterText.CONFIRM,
    },
    [ModalType.QUESTION_REQUIRE]: {
        type: ModalType.QUESTION_REQUIRE,
        title: ModalTitle.QUESTION_REQUIRE,
        component: import(
            '@/components/PaperExamine/editTmp/components/ModalComponents/QuestionRequireModal'
        ),
        width: 695,
        centered: true,
        okText: ModalFooterText.CONFIRM,
    },
    [ModalType.SCORE_DETAIL]: {
        type: ModalType.SCORE_DETAIL,
        title: ModalTitle.SCORE_DETAIL,
        component: import(
            '@/components/PaperExamine/editTmp/components/ModalComponents/ScoreDetailModal'
        ),
        width: 695,
        centered: true,
        okText: ModalFooterText.CONFIRM,
    },
    [ModalType.BATCH_SET_SCORE]: {
        type: ModalType.BATCH_SET_SCORE,
        title: ModalTitle.BATCH_SET_SCORE,
        component: import(
            '@/components/PaperExamine/editTmp/components/ModalComponents/BatchSetScoreModal'
        ),
        width: 694,
        centered: true,
        okText: ModalFooterText.CONFIRM,
        cancelText: ModalFooterText.CANCEL,
    },
    [ModalType.PUBLISH]: {
        type: ModalType.PUBLISH,
        title: ModalTitle.PUBLISH,
        component: import('@/components/PaperExamine/list/components/PublishModal'),
        width: 520,
        height: 380,
        centered: true,
        okText: ModalFooterText.CONFIRM,
        cancelText: ModalFooterText.CANCEL,
    },
}
