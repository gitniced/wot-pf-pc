import { Form, message, Input } from "antd"
import Store from "./store"
import { observer, useLocalObservable } from "mobx-react"
import { useEffect, useImperativeHandle } from "react"
import styles from './index.module.less'
import type { FormComponentProps } from "../../interface"
import PageTitle from "../../components/PageTitle"
const { TextArea } = Input;

const IntroductionInfo: React.FC<FormComponentProps> = ({ onRef, setBtnLoading, getRate }) => {
    const store = useLocalObservable(() => new Store())
    const [form] = Form.useForm()

    /** 提交表单 */
    const onFinish = async (value: any) => {
        setBtnLoading(true)
        await store.editIntroductionInfo(value).finally(() => setBtnLoading(false))
        getRate()
        message.success('提交成功')
    }

    const init = async () => {
        await store.getIntroductionInfo()
        form.setFieldsValue(store.introductionInfo)
    }

    const fromItems = [
        {
            name: 'simpleIntroduction',
            label: '一句话介绍',
            render: () => <Input showCount maxLength={100} placeholder='请输入一句话介绍' />
        },
        {
            name: 'introduction',
            label: '公司简介',
            rules: [{ required: true, message: '请输入公司简介', }],
            render: () => <TextArea rows={4} maxLength={500} showCount placeholder='请输入公司简介' />
        },
        {
            name: 'developmentProcess',
            label: '发展历程',
            render: () => <TextArea rows={4} maxLength={500} showCount placeholder='请输入发展历程' />
        }
    ]

    useEffect(() => {
        init()
    }, [])

    /** 暴露子组件方法 */
    useImperativeHandle(onRef, () => ({
        onSubmit: form.submit
    }))

    return (
        <div className={styles.page}>
            <PageTitle title="公司介绍" />
            <div className={styles.form_box}>
                <Form
                    className={styles.form}
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {fromItems.map(({ render, ...item }) => (
                        <Form.Item
                            key={item.name}
                            {...item}
                        >
                            {render()}
                        </Form.Item>
                    ))}
                </Form>
            </div>
        </div >
    )
}

/** 公司主营业务信息 */
export default observer(IntroductionInfo)
