import React from 'react'
import { Form, Input, Select, Radio, Row, Col } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import GlobalUpload from '@/components/Global/GlobalUploading'
import AreaCascader from '@/components/Global/AreaCascader'
import Minititle from '../Minititle';
import FilletTitle from '../FilletTitle';
import {MARGINTOP_KEY} from '../FromToUp/const';
// import style from './index.module.less'

function GeneratorFrom({ json, form, initialValues, formProps }) {
    // const [form] = form
    const generAtorBeforItem: Record<string, (_item: any) => JSX.Element> = {
        group: () => <span>生成组</span>,
        miniTitle: _item => (
            <Minititle titleStyles={{marginTop: '24px', fontSize: '16px'}} title={_item.label} />
        ),
        'miniTitle-4': _item => {
            let style = {};
            Object.keys(MARGINTOP_KEY).forEach(key => {
                if(MARGINTOP_KEY[key] === _item.key) {
                    style = {marginTop: '16px'}
                }
            })
            return <FilletTitle style={style} title={_item.label} desc={_item.desc}/>
        },
    }
    const generAtorItem: Record<string, (_item: any) => JSX.Element | JSX.Element[]> = {
        input: _item => <Input {..._item.props} />,
        select: _item => {
            const { valueEnum } = _item
            return (
                <Select {..._item.props}>
                    {valueEnum?.map(i => (
                        <Select.Option key={i.key || i.value} value={i.value}>
                            {i.label || ''}
                        </Select.Option>
                    ))}
                </Select>
            )
        },
        cascader: _item => {
            return <AreaCascader {..._item.props} />
        },
        radio: _item => (
            <Radio.Group {..._item.props}>
                {_item.valueEnum?.map(i => (
                    <Radio value={i.value} key={i.key || i.value}>
                        {i.label}
                    </Radio>
                ))}
            </Radio.Group>
        ),
        ImgUpload: _item => {
            return (
                <GlobalUpload
                    amount={1}
                    otherProps={{
                        listType: 'picture-card',
                    }}
                    drag={false}
                    size={10}
                    type={11}
                    accept={'image'}
                    {..._item.props}
                >
                    <div>
                        <PlusOutlined />
                        <div>{_item.props.placeholder || '上传照片'}</div>
                    </div>
                </GlobalUpload>
            )
        },
    }

    const getItem = (_item, _json) => {
        // 派发使用 form item
        const dispatchFromItem = (item, selfJson) => {
            if (typeof item.formItemRender === 'function') {
                return item.formItemRender(item, selfJson)
            }
            return generAtorItem[item.type]?.(item, selfJson)
        }
        if (generAtorBeforItem[_item.type]) {
            return <Col span={24} key={_item.key} >
                {generAtorBeforItem[_item.type](_item, _json)}
            </Col>
        } else {
            return (
                <Col span={8} key={_item.key}>
                    <Form.Item
                        key={_item.key}
                        name={_item.key}
                        label={_item.label}
                        rules={_item.rules}
                        {..._item.formItemProps}
                        labelCol={{span: 24}}
                        wrapperCol={{span: 18}}
                    >
                        {dispatchFromItem(_item, _json)}
                    </Form.Item>
                </Col>

            )
        }
    }

    const getForm = getFormJson => {
        if (Array.isArray(getFormJson) && getFormJson.length) {
            return (
                <Form form={form} initialValues={initialValues} {...formProps}>
                    <Row gutter={24}>
                        {getFormJson.filter(Boolean).map(item => getItem(item, json))}
                    </Row>

                </Form>
            )
        }
        return <></>
    }

    return getForm(json)
}

export default GeneratorFrom
