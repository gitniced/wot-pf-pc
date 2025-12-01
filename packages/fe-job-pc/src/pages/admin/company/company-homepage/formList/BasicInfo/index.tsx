// @ts-nocheck
import { Form, Input, Select, message } from 'antd'
import LoadingCascader from './LoadingCascader'
import Store from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect, useImperativeHandle } from 'react'
import type { FormComponentProps } from '../../interface'
import AreaCascader from '@/components/AreaCascader'
import CustomUpload from '../../components/CustomUpload'
import PageTitle from '../../components/PageTitle'
import styles from './index.module.less'

const BasicInfo: React.FC<FormComponentProps> = ({ onRef, setBtnLoading, getRate }) => {
    const store = useLocalObservable(() => new Store())
    const [form] = Form.useForm()

    /** 提交表单 */
    const onFinish = async (value: any) => {
        setBtnLoading(true)
        await store.editBaseInfo(value).finally(() => setBtnLoading(false))
        getRate()
        message.success('提交成功')
    }

    const init = async () => {
        store.getScaleList()
        store.getFinancingOptions()
        await store.getBaseInfo()
        form.setFieldsValue(store.baseInfo)
    }

    const fromItems = [
        {
            name: 'logo',
            label: '组织图片',
            rules: [{ required: true, message: '请上传组织图片' }],
            render: () => <CustomUpload btnText="上传" otherProps={{ maxCount: 1 }} />,
        },
        {
            name: 'name',
            label: '组织名称',
            rules: [{ required: true, message: '请输入组织名称' }],
            render: () => (
                <Input
                    maxLength={100}
                    placeholder="请输入组织名称"
                    disabled={[1, 2].includes(store.baseInfo.certifyStatus)}
                />
            ),
        },
        {
            name: 'shortName',
            label: '简称',
            // rules: [{ required: require, message: '请输入简称' }],
            render: () => <Input maxLength={100} placeholder="请输入简称" />,
        },
        {
            name: 'industryId',
            label: '所属行业',
            rules: [{ required: true, message: '请输入所属行业' }],
            render: () => (
                <LoadingCascader api="/common_data/industry/list" placeholder="请选择所属行业" />
            ),
        },
        {
            name: 'scale',
            label: '组织规模',
            rules: [{ required: true, message: '请输入组织规模' }],
            render: () => (
                <Select
                    allowClear
                    placeholder="请选择组织规模"
                    options={store.scaleList.map(item => ({
                        label: item.name,
                        value: Number(item.key),
                    }))}
                />
            ),
        },
        {
            name: 'addressList',
            label: '所在地址',
            rules: [{ required: true, message: '请输入所在地址' }],
            render: () => <AreaCascader type="area" />,
        },
        {
            name: 'address',
            label: '详细地址',
            render: () => <Input maxLength={100} placeholder="请输入详细地址" />,
        },
        {
            name: 'financing',
            label: '融资阶段',
            rules: [{ required: true, message: '请选择融资阶段' }],
            render: () => (
                <Select
                    allowClear
                    placeholder="请选择融资阶段"
                    options={store.financingOptions}
                    fieldNames={{
                        label: 'name',
                        value: 'key',
                    }}
                />
            ),
        },
        {
            name: 'resumeMail',
            label: '简历接收邮箱',
            rules: [
                {
                    required: true,
                    message: '请输入简历接收邮箱',
                },
                {
                    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                    message: '邮箱格式不正确',
                },
            ],
            render: () => <Input maxLength={100} placeholder="请输入简历接收邮箱" />,
        },
    ]

    useEffect(() => {
        init()
    }, [])

    /** 暴露子组件方法 */
    useImperativeHandle(onRef, () => ({
        onSubmit: form.submit,
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
                        <Form.Item key={item.name} {...item}>
                            {render()}
                        </Form.Item>
                    ))}
                </Form>
            </div>
        </div>
    )
}

/** 公司基本信息 */
export default observer(BasicInfo)
