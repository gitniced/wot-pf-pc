import React from 'react'
import styles from './index.module.less'
import SubTitle from '../SubTitle'
import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'

interface FillMethodsType {
    onChangeFill?: (v: 'cover' | 'space') => void
    value?: 'cover' | 'space'
}

function FillMethods({ onChangeFill, value }: FillMethodsType) {
    return (
        <>
            <SubTitle
                title="填充方式"
                // tip="满屏：根据浏览器窗口自适应，铺满屏幕两侧留白：固定宽度1200px，居中对齐其他组件"
                tip={
                    <span>
                        满屏：根据浏览器窗口自适应，铺满屏幕。
                        <br />
                        两侧留白：固定宽度1200px，居中对齐其他组件。
                    </span>
                }
            />
            <Radio.Group
                defaultValue="cover"
                buttonStyle="solid"
                className={styles.fill_methods_icon_wkj}
                onChange={(e: RadioChangeEvent) => {
                    const { target } = e
                    onChangeFill?.(target.value)
                }}
                value={value}
            >
                <Radio.Button value={'cover'} className={styles.type_btn}>
                    <div className={value === 'cover' ? styles.all_fill_active : styles.all_fill} />
                </Radio.Button>

                <Radio.Button value={'space'} className={styles.type_btn}>
                    <div
                        className={value === 'space' ? styles.space_fill_active : styles.space_fill}
                    />
                </Radio.Button>
            </Radio.Group>
            <div className={styles.type_text_fill}>
                <span
                    onClick={() => onChangeFill?.('cover')}
                    className={[value === 'cover' ? styles.type_text_checked : ''].join(' ')}
                >
                    满屏
                </span>
                <span
                    onClick={() => onChangeFill?.('space')}
                    className={[value === 'space' ? styles.type_text_checked : ''].join(' ')}
                >
                    两侧留白
                </span>
            </div>
        </>
    )
}

export default FillMethods
