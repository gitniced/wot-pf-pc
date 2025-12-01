import React from 'react'
import Hooks from './hooks'
import { Modal, Input, TreeSelect, Form, InputNumber, Radio } from 'antd'
import styles from './index.module.less'
import { MinusCircleOutlined } from '@ant-design/icons'
import { GlobalSelect } from '@wotu/kp-components'

const AddModal = (props: any) => {
    const { visible, handleCancel, recordId } = props || {}
    const [form] = Form.useForm()
    const hooks = Hooks(props)
    const {
        deleteOption,
        options,
        onInputChange,
        addOption,
        handleOk,
        level = '0',
        treeList,
        setSelectValue,
        setLevel,
        limitDecimals,
        optionsInit,
        setOptions,
        type,
        setType
    } = hooks || {}
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }
    type ObjType = Record<string, string>
    const obj: ObjType = {
        '0': '一级考评范围',
        '1': '二级考评范围',
        '2': '三级考评范围',
        '4': '考评点',
    }

    console.log(level)
    return (
        <Modal
            // title={recordId ? '重新生成' : '新增'}
            title={'新建'}
            width={600}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form} {...formItemLayout}>
                <Form.Item label="上级名称">
                    <TreeSelect
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        showSearch
                        defaultValue={recordId}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeList}
                        placeholder="请选择"
                        onSelect={(e: string, node: any) => {
                            setSelectValue(e)
                            setLevel(node.props.level || '0')
                            setOptions(optionsInit)
                        }}
                        //   @ts-ignore
                        filterTreeNode={(inputValue, treeNode) => {
                            if (treeNode.props.title.indexOf(inputValue) !== -1) {
                                return treeList
                            }
                        }}
                    />
                </Form.Item>

                {Number(level) === 3 && (
                    <Form.Item label="新建内容">
                        <Radio.Group
                            value={type}
                            options={[
                                { label: '相关知识要求', value: 1 },
                                { label: '考评点', value: 2 },
                            ]}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </Form.Item>
                )}
                <div>
                    <Form.Item label={Number(level) === 3 ? type === 1 ? '相关知识要求' : '考评点' : obj[level]} key={level}>
                        {options &&
                            options.length > 0 &&
                            options.map(item => (
                                <div className={styles.form_box} key={item.code}>
                                    {!(Number(level) === 3 && type === 1) && <Input
                                        className={styles.flex_1}
                                        placeholder="名称代码"
                                        value={item.name}
                                        maxLength={level === '3' ? 128 : undefined}
                                        onChange={e => {
                                            onInputChange(e, item.code, '1')
                                        }}
                                    />}
                                    {!(Number(level) === 3 && type === 1) && <div style={{ width: '30px', textAlign: 'center' }}>--</div>}
                                    {Number(level) < 3 && (
                                        <InputNumber
                                            className={styles.flex_1}
                                            placeholder="请输入"
                                            min={0.5}
                                            step={0.5}
                                            //@ts-ignore
                                            formatter={limitDecimals}
                                            onChange={e => {
                                                onInputChange(e, item.code, '2')
                                            }}
                                        />
                                    )}
                                    {Number(level) === 3 && type === 1 && (
                                        <>
                                            <Input
                                                className={styles.flex_1}
                                                placeholder="相关知识要求"
                                                onChange={e => {
                                                    onInputChange(e, item.code, '4')
                                                }}
                                            />
                                        </>
                                    )}
                                    {((Number(level) === 3 && type === 2) || Number(level) === 4) && (
                                        <GlobalSelect
                                            className={styles.flex_1}
                                            placeholder="请选择重要程度"
                                            options={[
                                                {
                                                    value: 'X',
                                                    label: 'X',
                                                },
                                                {
                                                    value: 'Y',
                                                    label: 'Y',
                                                },
                                                {
                                                    value: 'Z',
                                                    label: 'Z',
                                                },
                                            ]}
                                            value={item.rate}
                                            onChange={e => {
                                                onInputChange(e, item.code, '3')
                                            }}
                                        />
                                    )}
                                    {options.length > 1 && (
                                        <span
                                            onClick={() => {
                                                deleteOption(item.code)
                                            }}
                                        >
                                            <MinusCircleOutlined style={{ marginLeft: '8px' }} />
                                        </span>
                                    )}
                                </div>
                            ))}

                        <div className={styles.choice}>
                            <div className={styles.add_options_box} onClick={addOption}>
                                + 添加
                            </div>
                            <MinusCircleOutlined
                                style={{ marginLeft: '8px', visibility: 'hidden' }}
                            />
                        </div>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}
export default AddModal
