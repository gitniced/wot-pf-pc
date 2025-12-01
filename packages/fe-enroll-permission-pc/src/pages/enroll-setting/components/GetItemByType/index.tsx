import React from 'react'
import type { GetItemTypeOptions } from './const'
import { ITEM_TYPE_ENUM } from './const'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { PickerProps } from 'antd/lib/date-picker/generatePicker'
import { Input, Radio, Select } from 'antd'
// import GlobalUpload from '@/components/GlobalUpload'
// import ImageUpload from '@/components/ImageUpload'
import { DatePicker } from '@/components/Picker'
import MyEditor from '@/components/MyEditor'

/**
 * 时间的限制范围
 * @param start
 * @param end
 * @returns {*}
 */
const range = (start: number, end: number) => {
    const result = []
    for (let i = start; i < end; i++) {
        result.push(i)
    }
    return result
}

/**
 * 设置时间选择的范围
 * @param date
 * @returns {*}
 */
const disabledTime = (date: any) => {
    const hour = dayjs().hour() // 获取当前的小时
    const min = dayjs().minute() // 获取当前的分钟
    const second = dayjs().second() // 获取当前秒
    if (date?.format('YYYY-MM-DD').valueOf() === dayjs().format('YYYY-MM-DD').valueOf()) {
        if (date?.format('HH').valueOf() === dayjs().format('HH').valueOf()) {
            if (date?.format('mm').valueOf() === dayjs().format('mm').valueOf()) {
                return {
                    disabledHours: () => range(0, 24).splice(0, hour),
                    disabledMinutes: () => range(0, 60).splice(0, min),
                    disabledSeconds: () => range(0, 60).splice(0, second),
                }
            } else {
                return {
                    disabledHours: () => range(0, 24).splice(0, hour),
                    disabledMinutes: () => range(0, 60).splice(0, min),
                }
            }
        } else {
            return {
                disabledHours: () => range(0, 24).splice(0, hour),
            }
        }
    }
}

const getItemByType = (itemType: keyof typeof ITEM_TYPE_ENUM, options: GetItemTypeOptions = {}) => {
    switch (ITEM_TYPE_ENUM[itemType]) {
        case ITEM_TYPE_ENUM.DATEPICKER:
            if (options.disabledDate) {
                if (options.limitDate) {
                    ;(options.disabledDate as any) = (cur: Dayjs) =>
                        cur && ((cur < dayjs(Number(options.limitDate)).startOf('day')) as any)
                } else {
                    ;(options.disabledDate as any) = (cur: Dayjs) =>
                        cur && cur < dayjs().startOf('day')
                }
            }
            if (options.disabledTime) {
                // @ts-ignore
                options.disabledTime = disabledTime
            }
            return (
                <DatePicker
                    format="YYYY-MM-DD"
                    {...(options as unknown as PickerProps<Dayjs>)}
                    // @ts-ignore
                    getPopupContainer={target => target.parentNode}
                />
            )

        case ITEM_TYPE_ENUM.SELECT:
            return <Select {...options} getPopupContainer={target => target.parentNode} />
        case ITEM_TYPE_ENUM.TEXTAREA:
            return <Input.TextArea {...options} />
        case ITEM_TYPE_ENUM.RADIO:
            return <Radio.Group {...options} />
        case ITEM_TYPE_ENUM.EDITOR:
            return (
                <MyEditor
                    setEditorText={options?.setEditorText ? options.setEditorText : () => {}}
                    editorText={options?.editorText ? options.editorText : ''}
                    {...options}
                />
            )
        default:
            return <Input {...options} />
    }
}

export default getItemByType
