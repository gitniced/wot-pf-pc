import { Form, Radio, message, TimePicker } from "antd"
import Store from "./store"
import { observer, useLocalObservable } from "mobx-react"
import { useEffect, useImperativeHandle } from "react"
import locale from 'antd/es/date-picker/locale/zh_CN';
import type { FormComponentProps } from "../../interface";
import styles from './index.module.less'
import PageTitle from "../../components/PageTitle";
import { overTimeStateOptions } from "./const";

const WelfareInfo: React.FC<FormComponentProps> = ({ onRef, setBtnLoading, getRate }) => {
    const store = useLocalObservable(() => new Store())
    const [form] = Form.useForm()

    /** 提交表单 */
    const onFinish = async (value: any) => {
        setBtnLoading(true)
        await store.editWelfareInfo(value).finally(() => setBtnLoading(false))
        getRate()
        message.success('提交成功')
    }

    const init = async () => {
        await store.getWelfareInfo()
        form.setFieldsValue(store.welfareInfo)
    }

    const fromItems = [
        {
            name: 'workTime',
            label: '工作时间',
            rules: [{ required: true, message: '请选择工作时间', }],
            render: () => <TimePicker.RangePicker className={styles.range_picker} locale={locale} format="HH:mm" />
        },
        {
            name: 'overTimeState',
            label: '加班情况',
            render: () => (
                <Radio.Group defaultValue="a" buttonStyle="solid">
                    {overTimeStateOptions.map((item, index) => (
                        <Radio.Button key={item} value={index}>{item}</Radio.Button>
                    ))}
                </Radio.Group>
            )
        },
        {
            name: 'restTimeState',
            label: '休息时间',
            rules: [{ required: true, message: '请选择休息时间', }],
            render: () => (
                <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value={1}>双休</Radio.Button>
                    <Radio.Button value={2}>排班轮休</Radio.Button>
                </Radio.Group>
            )
        },
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
            <PageTitle title="公司基本信息" />
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

/** 公司福利信息 */
export default observer(WelfareInfo)
