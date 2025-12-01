import React from 'react'
import http from '@/servers/http'
import Api from '@/components/QuestionEdit/api'
import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import type { IDomEditor } from '@wangeditor/editor'

interface MathFormulaModalProps {
    onInit: (setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>) => void
    editor: IDomEditor
}
const MathFormulaModal: React.FC<MathFormulaModalProps> = props => {
    const [isModalVisible, setIsModalVisible] = useState(true)
    const close = () => {
        setIsModalVisible(false)
    }

    useEffect(() => {
        props?.onInit(setIsModalVisible)
    }, [])
    const onOk = async () => {
        const iframe = document.getElementById('iframe-custom')
        // @ts-ignore
        const kfe = iframe?.contentWindow?.kfe

        // latax字符串
        let latex = kfe.execCommand('get.source')
        const res = await http(Api.getImgUrlByLatex, 'post', {
            latex,
        })

        props.editor.dangerouslyInsertHtml(`<img class='formula' src='${res}' alt />`)
        close()
    }
    return (
        <Modal
            title="插入公式"
            open={isModalVisible}
            width={900}
            destroyOnClose={true}
            onOk={onOk}
            onCancel={close}
        >
            <div className="w-e-kity-formula-container">
                <iframe
                    style={{ border: 'none' }}
                    className="kity-formula-iframe"
                    id="iframe-custom"
                    width="100%"
                    height="400px"
                    scrolling="no"
                    src="/kityformula/index.html"
                />
            </div>
        </Modal>
    )
}

export default MathFormulaModal
