import styles from './index.module.less'
import { Steps, Form, Input, Button, Modal, message } from 'antd'
import { useState, useEffect } from 'react'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import CourseInfo from '@/pages/assistant/home/components/CourseInfo'
import { history } from 'umi'
import api from './../../home/api'
import http from '@/servers/http'
import { OnceGenerateButoon } from '@/components/AIComp/OnceGenerateButton'
import { useSaasTitle } from '@wotu/wotu-components'
import HrefBreadcrumb from '@/components/HrefBreadcrumb'

const { confirm } = Modal

const CourseCreate: React.FC = () => {
    useSaasTitle(`新建课程`)
    const [form] = Form.useForm()

    const crumbData = [{ name: '首页', link: '/assistant/home' }, { name: '新建' }]

    const [current, setCurrent] = useState(0)
    const [isGenerating, setIsGenerating] = useState(false)

    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 11 },
    }

    const formItemLayout1 = {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
    }

    const submit = () => {
        form.validateFields().then(res => {
            const params = {
                ...res,
            }

            params.coverUrl = params?.coverUrl?.[0]?.url

            http(api.coursesCreate, 'post', params).then(data => {
                message.success('新建成功！')
                history.push(`/assistant/course/${data}/design/conversion`)
            })
        })
    }

    const numberToChinese = (num: number): string => {
        const units = ['', '十', '百', '千', '万', '亿']
        const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']

        if (num === 0) return chars[0]

        let str = ''
        const numStr = num.toString()
        const len = numStr.length

        for (let i = 0; i < len; i++) {
            const digit = +numStr[i]
            const unitIndex = len - i - 1

            if (digit === 0) {
                if (!str.endsWith(chars[0]) && i !== len - 1) {
                    str += chars[0]
                }
            } else {
                str += chars[digit] + units[unitIndex]
            }
        }

        // 特殊处理：去掉末尾的“零”
        str = str.replace(/零+$/, '')
        // 特殊处理：一十 => 十
        str = str.replace(/^一十/, '十')

        return str
    }

    useEffect(() => {
        form.setFieldsValue({
            taskList: ['', '', ''],
        })
    }, [])

    return (
        <div className={styles.course_create}>
            <div>
                <HrefBreadcrumb crumbData={crumbData} />
            </div>

            <div className={styles.content}>
                <div className={styles.box}>
                    <Steps
                        current={current}
                        items={[
                            {
                                title: '基本信息',
                            },
                            {
                                title: '校本转化要求',
                            },
                            {
                                title: '学习任务',
                            },
                        ]}
                    />

                    <div className={styles.form}>
                        <Form
                            form={form}
                            {...formItemLayout}
                            autoComplete="off"
                            style={{ display: current === 0 ? 'block' : 'none' }}
                        >
                            <CourseInfo form={form} />
                        </Form>

                        <Form
                            form={form}
                            {...formItemLayout1}
                            autoComplete="off"
                            style={{ display: current === 1 ? 'block' : 'none' }}
                        >
                            <Form.Item label="校本转化要求" required className={styles.label}>
                                {[
                                    { label: '校本转化要点', name: 'schoolBasedConversion' },
                                    { label: '当地产业概况', name: 'localIndustryOverview' },
                                    { label: '教学条件概况', name: 'teachingConditionsOverview' },
                                ]?.map(item => (
                                    <Form.Item key={item.name}>
                                        <div className={styles.row_box}>
                                            <Form.Item
                                                label={item.label}
                                                name={item.name}
                                                className={styles.left}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '请输入！',
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea
                                                    placeholder="请输入"
                                                    maxLength={1000}
                                                    rows={3}
                                                />
                                            </Form.Item>

                                            <div className={styles.right}>
                                                <OnceGenerateButoon
                                                    type="link"
                                                    url="/wil/ai/school_converter_require"
                                                    generateText="生成"
                                                    disabled={isGenerating}
                                                    params={() => ({
                                                        ...form.getFieldsValue(),
                                                        fieldName: item.label,
                                                    })}
                                                    onStart={() => setIsGenerating(true)}
                                                    onFinish={data => form.setFieldsValue(data)}
                                                    onFinally={() => setIsGenerating(false)}
                                                />
                                            </div>
                                        </div>
                                    </Form.Item>
                                ))}

                                <Form.Item>
                                    <OnceGenerateButoon
                                        disabled={isGenerating}
                                        params={() => form.getFieldsValue()}
                                        url="/wil/ai/school_converter_require"
                                        onStart={() => setIsGenerating(true)}
                                        onFinish={data => form.setFieldsValue(data)}
                                        onFinally={() => setIsGenerating(false)}
                                    />
                                </Form.Item>
                            </Form.Item>
                        </Form>

                        <Form
                            form={form}
                            {...formItemLayout1}
                            autoComplete="off"
                            style={{ display: current === 2 ? 'block' : 'none' }}
                        >
                            <Form.Item label="学习任务" required className={styles.label}>
                                <Form.List name="taskList">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item key={field.key}>
                                                    <div className={styles.row_box}>
                                                        <Form.Item
                                                            label={`任务名称${numberToChinese(
                                                                index + 1,
                                                            )}`}
                                                            name={[field.name]}
                                                            className={styles.left}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: '请输入！',
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                placeholder="请输入"
                                                                maxLength={50}
                                                            />
                                                        </Form.Item>

                                                        <div className={styles.right}>
                                                            <OnceGenerateButoon
                                                                type="link"
                                                                url="/wil/ai/generate_task"
                                                                generateText="生成"
                                                                disabled={isGenerating}
                                                                params={() => ({
                                                                    ...form.getFieldsValue(),
                                                                    num: 1,
                                                                })}
                                                                onStart={() =>
                                                                    setIsGenerating(true)
                                                                }
                                                                onFinish={data => {
                                                                    console.log(data, 'data')
                                                                    form.setFieldValue(
                                                                        ['taskList', index],
                                                                        data.taskList[0],
                                                                    )
                                                                }}
                                                                onFinally={() =>
                                                                    setIsGenerating(false)
                                                                }
                                                            />
                                                            <a
                                                                className={styles.del}
                                                                onClick={() => remove(field.name)}
                                                            >
                                                                <DeleteOutlined />
                                                                删除
                                                            </a>
                                                        </div>
                                                    </div>
                                                </Form.Item>
                                            ))}

                                            <Form.Item>
                                                <div className={styles.row_box_button}>
                                                    <Button
                                                        style={{ marginRight: '16px' }}
                                                        onClick={() => add()}
                                                        icon={<PlusOutlined />}
                                                    >
                                                        添加学习任务
                                                    </Button>
                                                    <OnceGenerateButoon
                                                        disabled={isGenerating}
                                                        params={() => ({
                                                            ...form.getFieldsValue(),
                                                            fieldName: `taskList`,
                                                            num: fields.length,
                                                        })}
                                                        url="/wil/ai/generate_task"
                                                        onStart={() => setIsGenerating(true)}
                                                        onFinish={data => form.setFieldsValue(data)}
                                                        onFinally={() => setIsGenerating(false)}
                                                    />
                                                </div>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className={styles.button}>
                        <Button
                            onClick={() => {
                                if (current === 0) {
                                    confirm({
                                        title: '取消后不会保存任何课程信息，是否确定取消？',
                                        onOk() {
                                            history.goBack()
                                        },
                                    })
                                } else {
                                    setCurrent(current - 1)
                                }
                            }}
                        >
                            {current === 0 ? '取消' : '上一步'}
                        </Button>
                        <Button
                            type="primary"
                            style={{ marginLeft: '16px' }}
                            onClick={() => {
                                if (current === 0) {
                                    form.validateFields([
                                        'name',
                                        'majorCode',
                                        'levelCode',
                                        'coverUrl',
                                    ]).then(() => {
                                        setCurrent(current + 1)
                                    })
                                }

                                if (current === 1) {
                                    form.validateFields([
                                        'schoolBasedConversion',
                                        'localIndustryOverview',
                                        'teachingConditionsOverview',
                                    ]).then(() => {
                                        setCurrent(current + 1)
                                    })
                                }

                                if (current === 2) {
                                    submit()
                                }
                            }}
                        >
                            {current === 2 ? '确定' : '下一步'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCreate
