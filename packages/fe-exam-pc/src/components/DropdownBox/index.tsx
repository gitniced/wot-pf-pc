// 通用 下拉选择框
import React from 'react'
import { observer } from 'mobx-react'
import { Select } from 'antd'
import { optionsType, optionAll } from './const'

interface DropdownBoxProps {
    // 题型 难易程度 区分度
    type:
        | 'questionType'
        | 'questionLevel'
        | 'discrimination'
        | 'recommendStatus'
        | 'referStatus'
        | 'reviewStatus'
    value?: string
    onChange?: (e: string) => void
    style?: object
    // 是否展示全部
    isOptionAll?: boolean
}
const DropdownBox: React.FC<DropdownBoxProps> = ({
    type,
    value,
    onChange,
    style,
    isOptionAll = false,
}) => {
    return (
        <Select
            style={style}
            onChange={onChange}
            value={value}
            options={isOptionAll ? [optionAll, ...optionsType[type]] : optionsType[type]}
            placeholder="请选择"
            getPopupContainer={target => target.parentNode}
        />
    )
}
export default observer(DropdownBox)
