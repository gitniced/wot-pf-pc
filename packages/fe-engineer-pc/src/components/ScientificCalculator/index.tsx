import type { ModalProps } from 'antd'
import { Modal } from 'antd'
import { useEffect, useRef } from 'react'

import styles from './index.module.less'

const ScientificCalculator = (props: ModalProps) => {
    const { open, onCancel } = props

    const scientificCalculatorRef = useRef<HTMLDivElement>(null)
    const calculatorInstance = useRef<any>(null)

    useEffect(() => {
        if (!calculatorInstance.current && open) {
            // @ts-ignore
            calculatorInstance.current = window.Desmos.ScientificCalculator(
                scientificCalculatorRef?.current,
            )
            calculatorInstance?.current?.updateSettings({
                settingsMenu: false,
                language: 'zh-CN',
                fontSize: 20,
            })
        }
    }, [open])

    return (
        <Modal
            {...props}
            open={open}
            title="科学计算器"
            footer={null}
            width={800}
            onCancel={onCancel}
        >
            <div ref={scientificCalculatorRef} className={styles.scientific_calculator} />
        </Modal>
    )
}

export default ScientificCalculator
