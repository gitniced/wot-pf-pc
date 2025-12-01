import { Form, message, Input } from "antd"
import Store from "./store"
import { observer, useLocalObservable } from "mobx-react"
import { useEffect, useImperativeHandle } from "react"
import { abilityTrainingOptions, promotionSystemOptions, talentIncentiveOptions } from "./const"
import CheckboxCard from "../../components/CheckboxCard"
import type { FormComponentProps } from "../../interface"
import styles from './index.module.less'
import PageTitle from "../../components/PageTitle"
const { TextArea } = Input;

const IntroductionInfo: React.FC<FormComponentProps> = ({ onRef, setBtnLoading }) => {
    const store = useLocalObservable(() => new Store())
    const [form] = Form.useForm()

    /** 提交表单 */
    const onFinish = async (value: any) => {
        setBtnLoading(true)
        await store.editTalentDevelopmentInfo(value).finally(() => setBtnLoading(false))
        message.success('提交成功')
    }

    const init = async () => {
        await store.getTalentDevelopmentInfo()
        form.setFieldsValue(store.talentDevelopmentInfo)
    }

    const fromItems = [
        {
            name: 'promotionSystem',
            label: '晋升制度',
            render: () => (
                <CheckboxCard options={promotionSystemOptions} />
            )
        },
        {
            name: 'talentIncentive',
            label: '人才激励',
            render: () => (
                <CheckboxCard options={talentIncentiveOptions} />
            )
        },
        {
            name: 'abilityTraining',
            label: '能力培养',
            render: () => (
                <CheckboxCard options={abilityTrainingOptions} />
            )
        },
        {
            name: 'moreInformation',
            label: '更多信息',
            render: () => <TextArea showCount rows={4} placeholder="请输入更多信息" maxLength={300} />
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
            <PageTitle title="人才发展" />
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

/** 公司人才发展信息 */
export default observer(IntroductionInfo)
