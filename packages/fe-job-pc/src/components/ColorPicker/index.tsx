import { Button } from 'antd'
import React, { useState } from 'react'
import styles from './index.module.less'
import { SketchPicker } from 'react-color'

type ColorObject = {
    hex: string
    [key: string]: any
}

type ColorProps = {
    defaultColor: string
    onClose: () => void
    onFinish: (color: ColorObject) => void
}

const ColorPicker: React.FC<ColorProps> = props => {
    let { defaultColor, onClose, onFinish } = props
    defaultColor = defaultColor ? defaultColor : '#ff0000'
    onClose = onClose || new Function()
    onFinish = onFinish || new Function()
    const [color, setColor] = useState<ColorObject>(defaultColor as unknown as ColorObject)

    const onChange = (e: any) => {
        setColor(e)
    }

    const closeHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        onClose()
    }
    const finishHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (Object.prototype.toString.call(color) !== '[object Object]') {
            onFinish({ hex: defaultColor })
        } else {
            onFinish(color)
        }
    }

    return (
        <div className={styles.page}>
            <SketchPicker className={styles.picker} color={color} onChange={onChange} />
            <div className={styles.button}>
                <Button type={'default'} onClick={closeHandler}>
                    取消
                </Button>
                <Button type={'primary'} onClick={finishHandler}>
                    确定
                </Button>
            </div>
        </div>
    )
}

export default ColorPicker
