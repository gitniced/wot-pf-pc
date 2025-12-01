//  科学计算器

import { Modal } from 'antd'
import type { IScientificCalculator } from './interface'
import { useEffect, useRef } from 'react'

import styles from './index.module.less'

const ScientificCalculator = (props: IScientificCalculator) => {
    const { visible, onCancel } = props

    const scientificCalculatorRef = useRef<HTMLDivElement>(null)
    const calculatorInstance = useRef<any>(null)

    useEffect(() => {
        if (!calculatorInstance.current && visible) {
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
    }, [visible])

    return (
        <Modal visible={visible} title="科学计算器" footer={null} width={800} onCancel={onCancel}>
            <div ref={scientificCalculatorRef} className={styles.scientific_calculator} />
        </Modal>
    )
}

export default ScientificCalculator
