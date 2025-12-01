import type { ComponentMapType } from '@/components/ModalProvider'
import { ModalFooterText, ModalTitle, ModalType } from './enums'

// TODO 添加描述
export const config: ComponentMapType = {
    [ModalType.DOWNLOAD]: {
        type: ModalType.DOWNLOAD,
        title: ModalTitle.DOWNLOAD,
        component: import('@/components/PaperExamine/list/components/DownloadModal'),
        centered: true,
        okText: ModalFooterText.CONFIRM,
        cancelText: ModalFooterText.CANCEL,
    },
    [ModalType.PREVIEW]: {
        type: ModalType.PREVIEW,
        title: ModalTitle.PREVIEW,
        component: import('@/components/PaperExamine/list/components/PreviewModal'),
        width: 1000,
        centered: true,
        okText: ModalFooterText.CONFIRM,
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
