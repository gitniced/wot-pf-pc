import { Form, message, Select } from "antd"
import Store from "./store"
import { observer, useLocalObservable } from "mobx-react"
import { useEffect, useImperativeHandle } from "react"
import type { FormComponentProps } from "../../interface"
import styles from './index.module.less'
import PageTitle from "../../components/PageTitle"

const IntroductionInfo: React.FC<FormComponentProps> = ({ onRef, setBtnLoading }) => {
    const store = useLocalObservable(() => new Store())
    const [form] = Form.useForm()


    /** 提交表单 */
    const onFinish = async (value: any) => {
        setBtnLoading(true)
        await store.editMainBusinessInfo(value).finally(() => setBtnLoading(false))
        message.success('提交成功')
    }

    const init = async () => {
        await store.getMainBusinessInfo()
        form.setFieldsValue(store.mainBusinessInfo)
    }


    const fromItems = [
        {
            name: 'mainBusiness',
            label: '主营业务',
            rules: [() => ({
                validator(_, value: string[]) {
                    if (value.length > 10) {
                        return Promise.reject(new Error('标签不能大于10个'));
                    }
                    return Promise.resolve()
                },
            })],
            render: () => (
                <Select
                    mode='tags'
                    placeholder="请选择"
                    options={[]}
                />
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
            <PageTitle title="主营业务" />
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
