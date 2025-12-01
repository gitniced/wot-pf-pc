// 字体大小修改、科学计算器

import { Slider } from 'antd'
import styles from './index.module.less'
import ScientificCalculator from '@/components/ScientificCaculator'
import { useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'

import TestStore from '@/pages/test-manage/store'
import PaperStore from '@/pages/test-manage/exam/paper/store'
import { CalculatorOutlined } from '@ant-design/icons'
import { CalculatorState } from '@/pages/test-manage/constant'

const FontSize = () => {
    const store = useLocalObservable(() => TestStore)
    const paperStore = useLocalObservable(() => PaperStore)

    const { calculatorShowState } = store.examData

    const [visible, setVisible] = useState<boolean>(false)

    const onChangeSize = (value: number) => {
        paperStore.changeFontSize(value)
    }

    return (
        <div className={styles.component_fontsize}>
            <div className={styles.fontsize_inner}>
                <span className={styles.text}>字体大小</span>
                <span className={styles.low}>A</span>
                {/* 最小字体默认16px 最大32px */}
                <Slider defaultValue={24} min={16} max={32} onChange={onChangeSize} />
                <span className={styles.high}>A</span>
            </div>

            {calculatorShowState === CalculatorState.ENABLE && (
                <div className={styles.scientific_calculator} onClick={() => setVisible(true)}>
                    <CalculatorOutlined />
                    科学计算器
                </div>
            )}

            <ScientificCalculator visible={visible} onCancel={() => setVisible(false)} />
        </div>
    )
}

export default observer(FontSize)
