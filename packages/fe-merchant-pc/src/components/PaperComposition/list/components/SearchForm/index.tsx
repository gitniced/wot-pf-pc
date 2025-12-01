import ProfessionCascade from '@/components/ProfessionCascade'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import type { SearchFormProps } from './interface'
import { composeOptions, statusOptions } from './const'
import styles from './index.module.less'

const SearchForm = (props: SearchFormProps) => {
    const { initSearchParams, searchParams, onSearch } = props || {}
    const [form] = Form.useForm()
    const [expand, setExpand] = useState(false)

    useEffect(() => {
        form.setFieldsValue(searchParams)
    }, [])

    const initSearchList = [
        {
            attr: {
                label: '模板名称',
                name: 'title',
            },
            render: () => <Input placeholder="请输入" />,
        },
        {
            attr: {
                label: '组卷方式',
                name: 'composition',
            },
            render: () => <Select options={composeOptions} placeholder="请选择" />,
        },
    ]
    // 隐藏（未展示）的搜索list
    const hideSearchList = [
        {
            attr: {
                label: '职业/工种/等级',
                name: 'commonJob',
            },
            render: () => <ProfessionCascade type="JOB" />,
        },
        {
            attr: {
                label: '状态',
                name: 'usedState',
            },
            render: () => <Select options={statusOptions} placeholder="请选择" />,
        },
    ]

    // 需要展示的list
    const getFields = () => {
        const list = expand ? [...initSearchList, ...hideSearchList] : [...initSearchList]
        return (
            <>
                {list.map(({ attr, render }) => {
                    return (
                        <Col
                            style={{ paddingLeft: '12px', paddingRight: '12px' }}
                            span={8}
                            key={attr.name}
                        >
                            <Form.Item {...attr}>{render()}</Form.Item>
                        </Col>
                    )
                })}
            </>
        )
    }

    return (
        <div className={styles.search_form}>
            <Form
                form={form}
                name="advanced_search"
                onFinish={onSearch}
                initialValues={initSearchParams}
            >
                <Row>
                    {getFields()}
                    <Col span={8} style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button
                                onClick={() => {
                                    form.resetFields()
                                    onSearch(initSearchParams)
                                }}
                            >
                                重置
                            </Button>
                            <Typography.Link
                                onClick={() => {
                                    setExpand(!expand)
                                }}
                            >
                                {expand ? '收起' : '展开'}
                                {expand ? <UpOutlined /> : <DownOutlined />}
                            </Typography.Link>
                        </Space>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default SearchForm
