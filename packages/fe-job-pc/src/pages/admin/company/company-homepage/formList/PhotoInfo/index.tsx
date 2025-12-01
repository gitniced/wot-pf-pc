import { Button, Form, message } from 'antd'
import type { UploadProps } from 'antd'
import Store from './store'
import { observer, useLocalObservable } from 'mobx-react'
import { useEffect, useImperativeHandle, useState } from 'react'
import CustomUpload from '../../components/CustomUpload'
import globalApi from '@/servers/globalApi'
import type { FormComponentProps } from '../../interface'
import PageTitle from '../../components/PageTitle'
import styles from './index.module.less'
import GlobalUpload from '@/components/GlobalUpload'
import { UploadOutlined } from '@ant-design/icons'

const _props: UploadProps = {
    name: 'file',
    multiple: true,
    action: globalApi.upload,
    data: { type: 2 },
    onChange(info) {
        const { status } = info.file
        if (status !== 'uploading') {
            //
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    },
    onDrop(_e) {},
}

const PhotoInfo: React.FC<FormComponentProps> = ({ onRef, setBtnLoading }) => {
    const store = useLocalObservable(() => new Store())
    const [form] = Form.useForm()

    const [disBtn, setDisBtn] = useState<boolean>(false)

    /** 提交表单 */
    const onFinish = async (value: any) => {
        setBtnLoading(true)
        await store.editPhotoInfo(value).finally(() => setBtnLoading(false))
        message.success('提交成功')
    }

    const init = async () => {
        await store.getPhotoInfo()
        form.setFieldsValue(store.photoInfo)
    }

    const fromItems = [
        {
            name: 'imgList',
            label: '公司照片',
            render: () => <CustomUpload btnText="上传" otherProps={{ maxCount: 20 }} />,
        },
        {
            name: 'videoList',
            label: '公司视频',
            render: () => (
                <GlobalUpload
                    amount={3}
                    size={20}
                    accept={['mp4']}
                    drag={false}
                    type={3}
                    onCustomRequestEnd={() => setDisBtn(false)}
                    onCustomRequestStart={() => setDisBtn(true)}
                >
                    <Button loading={disBtn} icon={<UploadOutlined />}>
                        点击上传视频
                    </Button>
                    <div className={styles.text} onClick={e => e.stopPropagation()}>
                        支持扩展名：.mp4
                    </div>
                </GlobalUpload>
            ),
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
            <PageTitle title="公司相册" />
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

/** 公司相册信息 */
export default observer(PhotoInfo)
