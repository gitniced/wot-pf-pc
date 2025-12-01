import React from 'react'
import http from '@/servers/http'
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

    // 公式地址，开发环境默认为business-develop
    const formulaUrlOrigin =
        process.env.RUN_ENV === 'local' ? 'https://business-develop.cloud.wozp.cn' : window.origin

    useEffect(() => {
        props?.onInit(setIsModalVisible)
    }, [])

    const onOk = async () => {
        const iframe = document.getElementById('iframe-custom')
        // @ts-ignore
        const kfe = iframe?.contentWindow.kfe

        // latax字符串
        let latex = kfe.execCommand('get.source')
        const res = await http('/question/front/latex_to_img', 'post', {
            latex,
        })
        props.editor.dangerouslyInsertHtml(`<img class='formula' src='${res}' alt />`)
        close()
    }
    return (
        <Modal
            title="插入公式"
            visible={isModalVisible}
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
                    src={`${formulaUrlOrigin}/kityformula/index.html`}
                />
            </div>
        </Modal>
    )
}

export default MathFormulaModal
