import { Input, Form, Select, Cascader, Row, Col } from 'antd'
import DatePicker from '@/components/Picker/DatePicker'
import { SearchInput } from './SearchInput'
import ImgUpload from './ImgUpload'
import AI from '../AI'
import { useState } from 'react'
const { TextArea } = Input
const { RangePicker } = DatePicker
import dayjs from 'dayjs'
import VideoUpload from '@/components/VideoUpload'

const Index = ({
    type,
    label,
    name,
    rules = [],
    extraParam,
    childrenParam = {},
    inlineParam = [],
    ai = null,
    setField,
    getField,
    FormInstance,
    formInstance,
    gutter,
    renderChildren,
}: any) => {
    const [searchValue, setSearchValue] = useState('')

    const disabledDate = (current: any) => {
        return current && dayjs(current) > dayjs().endOf('day')
    }

    const collect = {
        Input: (params: any) => <Input placeholder="请输入" maxLength={30} {...params} />,
        TagSelect: (params: any) => (
            <Select
                placeholder="请选择"
                getPopupContainer={triggerNode => triggerNode.parentNode}
                style={{ width: '100%' }}
                searchValue={searchValue}
                onChange={_val => setSearchValue('')}
                onSearch={_val => {
                    setSearchValue(_val.slice(0, 20))
                }}
                {...params}
            />
        ),
        Select: (params: any) => (
            <Select
                placeholder="请选择"
                allowClear
                getPopupContainer={triggerNode => triggerNode.parentNode}
                style={{ width: '100%' }}
                {...params}
            />
        ),
        Cascader: (params: any) => (
            <Cascader
                placeholder="请选择"
                getPopupContainer={triggerNode => triggerNode.parentNode}
                allowClear={false}
                {...params}
            />
        ),
        TextArea: (params: any) => (
            <TextArea
                placeholder="请输入"
                autoSize={{ minRows: 4, maxRows: 6 }}
                showCount
                maxLength={300}
                {...params}
            />
        ),
        RangePicker: (params: any) => {
            return <RangePicker disabledDate={disabledDate} {...params} />
        },
        SearchInput: (params: any) => <SearchInput placeholder="请输入" {...params} />,
        ImgUpload: (params: any) => <ImgUpload {...params} />,
        VideoUpload: (params: any) => <VideoUpload {...params} />,
    }
    if (type === 'inline') {
        return (
            <Form.Item required label={label}>
                <Row gutter={gutter || 24}>
                    {inlineParam?.map((item: any, i: number) => (
                        <Col key={i} span={item?.span || 12}>
                            <Form.Item name={item.name} rules={item.rules} noStyle>
                                {/* @ts-ignore */}
                                {collect[item?.type](item?.childrenParam)}
                            </Form.Item>
                        </Col>
                    ))}
                </Row>
            </Form.Item>
        )
    }

    return (
        <>
            <Form.Item shouldUpdate noStyle>
                {(...props) =>
                    renderChildren ? (
                        renderChildren(
                            <Form.Item label={label} name={name} rules={rules} {...extraParam}>
                                {/* @ts-ignore */}
                                {collect[type](childrenParam)}
                            </Form.Item>,
                            ...props,
                        )
                    ) : (
                        <Form.Item label={label} name={name} rules={rules} {...extraParam}>
                            {/* @ts-ignore */}
                            {collect[type](childrenParam)}
                        </Form.Item>
                    )
                }
            </Form.Item>
            {ai && (
                <AI
                    recall={ai?.recall}
                    warn={ai?.warn}
                    mode={ai?.mode}
                    maxLength={ai?.maxLength}
                    watchedField={ai?.watchedField}
                    FormInstance={FormInstance}
                    formInstance={formInstance}
                    moduleName={ai.moduleName}
                    remoteFunc={ai.remoteFunc}
                    master={ai.master}
                    prev={ai.prev}
                    next={ai.next}
                    ws={ai.ws}
                    getAIChat={ai.getAIChat}
                    getField={getField}
                    name={name}
                    setField={setField}
                />
            )}
        </>
    )
}

export default Index
