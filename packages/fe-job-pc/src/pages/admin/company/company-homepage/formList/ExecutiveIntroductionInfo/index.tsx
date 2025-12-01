import { Button, Form, Input, Tooltip, message } from "antd"
import Store from "./store"
import { observer, useLocalObservable } from "mobx-react"
import { useEffect, useImperativeHandle } from "react"
import { initFormData } from "./const"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import CustomUpload from "../../components/CustomUpload"
import TextArea from "antd/lib/input/TextArea"
import styles from './index.module.less'
import type { FormComponentProps } from "../../interface"
import PageTitle from "../../components/PageTitle"

const IntroductionInfo: React.FC<FormComponentProps> = ({ onRef, setBtnLoading }) => {
    const store = useLocalObservable(() => new Store())
    const [form] = Form.useForm()

    /** 提交表单 */
    const onFinish = async (value: any) => {
        setBtnLoading(true)
        await store.editExecutiveIntroductionInfo(value).finally(() => setBtnLoading(false))
        message.success('提交成功')
    }

    const init = async () => {
        await store.getExecutiveIntroductionInfo()
        form.setFieldsValue(store.executiveIntroductionInfo)
    }


    const fromItems = [
        {
            name: 'imgUrl',
            label: '照片',
            render: () => <CustomUpload btnText='上传' />
        },
        {
            name: 'name',
            label: '姓名',
            render: () => <Input maxLength={100} placeholder="请输入姓名" />
        },
        {
            name: 'position',
            label: '职位',
            render: () => <Input maxLength={100} placeholder="请输入职位" />
        },
        {
            name: 'introduction',
            label: '介绍',
            render: () => <TextArea showCount rows={4} maxLength={300} placeholder="请输入介绍" />
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
            <PageTitle title="高管介绍" />
            <div className={styles.form_box}>
                <Form
                    className={styles.form}
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                >
                    <Form.List name="executiveList">
                        {(fields, { add, remove }) => {
                            return (
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
                                    {fields.length < 5 &&
                                        <Button className={styles.button} type="dashed" onClick={() => add(initFormData, fields.length)} block icon={<PlusOutlined />}>
                                            添加
                                        </Button>}
                                </>
                            )
                        }}
                    </Form.List>
                </Form>
            </div>
        </div >
    )
}

/** 公司主营业务信息 */
export default observer(IntroductionInfo)
