import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd'
import type { SearchFormType } from '../../interface'
import { useEffect, useState } from 'react'
import ProfessionCascade from '@/components/ProfessionCascade'
import { compositionMap, publishMapList, referenceStateMapList } from '../../enums'
import styles from '../../index.module.less'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

const initialValues = { composition: 'all', referenceState: 'all', publishState: 'all' }

const SearchForm = (props: SearchFormType) => {
    const { onSearch, formRef } = props
    const [form] = Form.useForm()
    const [expand, setExpand] = useState<boolean>(false) // 展开

    useEffect(() => {
        if (!formRef?.current && form) {
            formRef.current = form
        }
    }, [form, formRef])

    const getData = (data: string | number) => {
        return data === 'all' ? [0, 1] : [Number(data)]
    }

    // 获取列表请求参数
    const getParams = (values: any) => {
        const { composition, jobName, publishState, referenceState, title } = values || []
        const [work, job, level] = jobName || []
        return {
            composition:
                composition === 'all'
                    ? ['authenticate', 'questiontype', 'fromfile']
                    : [composition],
            publishState: getData(publishState),
            referenceState: getData(referenceState),
            title,
            customContent: work
                ? {
                      commonJob: {
                          jobName: work?.label,
                          jobNameCode: work?.value,
                          jobType: job?.label,
                          jobTypeCode: job?.value,
                          jobLevel: level?.label,
                          jobLevelCode: level?.value,
                      },
                  }
                : {},
        }
    }

    // 查询
    const onFinish = async () => {
        const values = await form.validateFields()
        const params = getParams(values)

        return onSearch(params)
    }

    // 重置
    const onReset = () => {
        form.resetFields()
        const params = getParams({ ...initialValues, customContent: {}, title: undefined })
        onSearch(params)
    }

    return (
        <div className={styles.search_form}>
            <Form form={form} onFinish={onFinish} initialValues={initialValues}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item name="jobName" label="职业/工种/等级">
                            <ProfessionCascade />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="title" label="试卷名称">
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                    {expand && (
                        <>
                            <Col span={8}>
                                <Form.Item name="composition" label="组卷方式">
                                    <Select placeholder="请选择">
                                        {Object.keys(compositionMap).map((v: string) => (
                                            <Select.Option value={v} key={v}>
                                                {(compositionMap as any)[v]}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="referenceState" label="引用状态">
                                    <Select placeholder="请选择" options={referenceStateMapList} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="publishState" label="发布状态">
                                    <Select placeholder="请选择" options={publishMapList} />
                                </Form.Item>
                            </Col>
                        </>
                    )}
                    <Col span={8}>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                                <Button onClick={onReset}>重置</Button>
                                <Typography.Link
                                    onClick={() => {
                                        setExpand(!expand)
                                    }}
                                >
                                    {expand ? '收起' : '展开'}
                                    {expand ? <UpOutlined /> : <DownOutlined />}
                                </Typography.Link>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default SearchForm
