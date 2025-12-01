import React from 'react'
import Hooks from './hooks'
import { Modal, Radio } from 'antd'
import type { recordType } from './interface'
const TipsModal = (props: any) => {
    const { visible, type, handleCancel, onRadioChange, radioValue, tipsData } = props || {}
    const hooks = Hooks(props)
    const { tipsHandleOk } = hooks || {}
    type ObjType = Record<string, string>
    const obj: ObjType = {
        '0': '一级考评范围',
        '1': '一级考评范围',
        '2': '二级考评范围',
        '3': '三级考评范围',
        '4': '相关知识要求',
        '5': '考评点',
    }
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    }
    return (
        <Modal centered title="提示" open={visible} onOk={tipsHandleOk} onCancel={handleCancel}>
            <div style={{ marginBottom: '10px' }}>
                {type === 'edit' ? '请选择编辑内容' : '请选择删除范围'}
            </div>
            <Radio.Group onChange={onRadioChange} value={radioValue}>
                {tipsData.map((item: recordType) => (
                    <Radio key={item.code} value={item.code} style={radioStyle}>
                        {obj[item.level]}【{item.name}】
                    </Radio>
                ))}
            </Radio.Group>
        </Modal>
    )
}
export default TipsModal
