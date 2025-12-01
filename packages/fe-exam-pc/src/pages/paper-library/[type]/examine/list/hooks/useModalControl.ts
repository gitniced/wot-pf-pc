/**
 * ModalProvider 确认\取消操作
 */
import type { ModalProviderType } from '@/components/ModalProvider'
import { useState } from 'react'
import { ModalType } from '../enums'
import { downloadUrlFile } from '@/utils/tool'
import { pdfDownload, paperDownload } from '../api'
import useCommonParams from '@/hooks/useCommonParams'

type ModalDataType = Omit<ModalProviderType, 'handleClose' | 'handleConfirm'>

const useModalControl = () => {
    const [modalData, setModalData] = useState<ModalDataType>({
        visible: false,
        dataSource: {},
        type: ModalType.PREVIEW,
    })
    const commonParams = useCommonParams()
    /**
     * 下载试卷
     * @param data
     */
    const downloadPaper = (data: any) => {
        const { code, file_format, paper_content } = data || {}
        if (file_format === 'pdf') {
            pdfDownload({
                code,
                type: paper_content,
            }).then((res: any) => {
                const { fileName, path } = res || {}
                downloadUrlFile(path, fileName)
            })
        } else {
            paperDownload({
                file_format,
                code,
                type: paper_content,
                ...commonParams,
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
