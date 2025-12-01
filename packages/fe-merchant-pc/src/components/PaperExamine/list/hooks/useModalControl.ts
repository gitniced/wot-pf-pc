/**
 * ModalProvider 确认\取消操作
 */
import type { ModalProviderType } from '@/components/ModalProvider'
import { useState } from 'react'
import { ModalType } from '../enums'
import http from '@/servers/http'
import { downloadUrlFile } from '@/utils/tool'

type ModalDataType = Omit<ModalProviderType, 'handleClose' | 'handleConfirm'>

const useModalControl = () => {
    const [modalData, setModalData] = useState<ModalDataType>({
        visible: false,
        dataSource: {},
        type: ModalType.PREVIEW,
    })
    /**
     * 下载试卷
     * @param data
     */
    const downloadPaper = (data: any) => {
        const { code, file_format, paper_content } = data || {}
        if (file_format === 'pdf') {
            let pathname = ''
            if (Number(paper_content) === 1) {
                pathname = '/merchant-center/print/test-paper'
            } else {
                pathname = '/merchant-center/print/test-paper-answer'
            }
            window.open(`${window.location.origin}${pathname}?code=${code}`)
        } else {
            http(`/exam_main/paper/download/${file_format}/${code}`, 'get', {
                type: paper_content,
            }).then((res: any) => {
                const { fileName, path } = res || {}
                downloadUrlFile(path, fileName)
            })
        }
    }

    const handleClose = () => {
        setModalData({ visible: false, dataSource: {}, type: ModalType.PREVIEW })
    }

    // 保存弹窗数据
    const handleConfirm = async (data: any) => {
        if (modalData.type === ModalType.DOWNLOAD) {
            downloadPaper(data)
        }
        handleClose()
    }

    return {
        handleClose,
        handleConfirm,
        modalData,
        setModalData,
    }
}

export default useModalControl
