import React, { useEffect } from 'react'
import { Form } from 'antd'
import styles from './index.module.less'
import SetBackground from './setBackground'
import SetMargin from './setMargin'
import { getComponentsDefaultStyle } from '@wotu/pt-components'
import type { AnyObj } from '@/types'
/**
 * @name 设置微页面组件的样式组件
 * @description 设置组件的上下padding和背景
 * @param {boolean} showImageMargin 是否显示图片间距
 * @param {Function} onStyleChange 组件样式改变的回调
 * @param {Record<string, any>} styleData 组件样式
 * @param {string} mode 组件展示的终端
 * @return {*}
 */
const SetMicroComponentStyle = ({
    showImageMargin = false,
    onStyleChange,
    styleData = {},
    mode,
    style = {},
}: {
    // 是否显示图片间距
    showImageMargin?: boolean
    onStyleChange?: (allValues: Record<string, any>) => void
    styleData?: Record<string, any>
    mode?: 'pc' | 'mobile'
    style?: AnyObj
}) => {
    const [form] = Form.useForm()
    useEffect(() => {
        let { backgroundImage } = styleData || ''
        // 设置背景图片的回显格式
        let backgroundImageValue = backgroundImage
            ? [
                  {
                      url: backgroundImage,
                      uid: '-1',
                      name: 'image.png',
                      status: 'done',
                      response: {
                          url: backgroundImage,
                      },
                  },
              ]
            : []

        form?.setFieldsValue({
            ...styleData,
            backgroundImage: backgroundImageValue,
        })
    }, [styleData])
    // 设置默认样式
    let initialValues = getComponentsDefaultStyle(styleData?.type, mode)
    // 组件样式改变
    const onValuesChange = (_: Record<string, any>, allValues: Record<string, any>) => {
        // 处理背景图片的格式
        allValues.backgroundImage = allValues?.backgroundImage?.[0]?.response?.url || ''
        onStyleChange?.({
            ...styleData,
            ...allValues,
        })
    }
    return (
        <div className={styles.set_style} style={style}>
            {/* <div className={styles.line} /> */}
            <Form
                form={form}
                preserve={false}
                initialValues={initialValues}
                onValuesChange={onValuesChange}
            >
                <div className={styles.title}>组件样式</div>
                <SetMargin showImageMargin={showImageMargin} />
                <SetBackground />
            </Form>
        </div>
    )
}

export default SetMicroComponentStyle
