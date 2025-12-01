import { Button, Form, message, Input, Tooltip } from "antd"
import Store from "./store"
import { observer, useLocalObservable } from "mobx-react"
import { useEffect, useImperativeHandle } from "react"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import CustomUpload from "../../components/CustomUpload"
import { initFormData } from "./const"
import PageTitle from "../../components/PageTitle"
import styles from './index.module.less'
import type { FormComponentProps } from "../../interface"
import TextArea from "antd/lib/input/TextArea"

const ProductIntroductionInfo: React.FC<FormComponentProps> = ({ onRef, setBtnLoading }) => {
    const store = useLocalObservable(() => new Store())
    const [form] = Form.useForm()

    /** 提交表单 */
    const onFinish = async (value: any) => {
        setBtnLoading(true)
        await store.editProductIntroductionInfo(value).finally(() => setBtnLoading(false))
        message.success('提交成功')
    }

    const init = async () => {
        await store.getProductIntroductionInfo()
        form.setFieldsValue(store.productIntroductionInfo)
    }

    const fromItems = [
        {
            name: 'logo',
            label: '产品logo',
            render: () => <CustomUpload btnText='上传' />
        },
        {
            name: 'title',
            label: '产品名称',
            render: () => <Input maxLength={30} placeholder="请输入产品名称" />
        },
        {
            name: 'introduction',
            label: '产品介绍',
            render: () => <TextArea showCount rows={4} maxLength={300} placeholder="请输入产品介绍" />
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
            <PageTitle title="产品介绍" />
            <div className={styles.form_box}>
                <Form
                    className={styles.form}
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                >
                    <Form.List name="productList">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} className={styles.field_item}>
                                        {fromItems.map(({ render, ...item }) => (
                                            <Form.Item
                                                key={item.name}
                                                {...restField}
                                                {...item}
                                                name={[name, item.name]}
                                            >
                                                {render()}
                                            </Form.Item>
                                        ))}
                                        <Tooltip title="删除">
                                            <DeleteOutlined className={styles.remove} onClick={() => remove(name)} />
                                        </Tooltip>
                                    </div>
                                ))}
                                {
                                    fields.length < 5 && <Button className={styles.button} type="dashed" onClick={() => add(initFormData, fields.length)} block icon={<PlusOutlined />}>
                                        添加
                                    </Button>
                                }
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>
        </div >
    )
}

/** 产品介绍信息 */
export default observer(ProductIntroductionInfo)
