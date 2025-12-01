import { inject, Observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import baseHooks from './hooks'
import { Col, Form, Input, message, Row, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import CustomTitle from '@/components/Global/CustomTitle'
import { useEffect } from 'react'
import type { IRoute } from 'umi'
import type { BaseInfoProps } from './interface'
import validateRule from '@/components/Global/ValidateRule'
import LoadingBtn from '@/components/Global/LoadingBtn'
import api from './api'
// import MyCorp from '@/components/Global/MyCrop'

const BaseInfo = (props: BaseInfoProps) => {
    const { userStore, siteStore } = props
    const hooks = useLocalObservable(() => new baseHooks())

    const itemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    }

    const [form] = Form.useForm()

    useEffect(() => {
        hooks.getBaseInfo(userStore.userData, form)
    }, [])

    const CustomUpload = ({ store }: { store: baseHooks }) => {
        return (
            <ImgCrop rotate>
                <Upload
                    listType={'picture-card'}
                    accept={'.jpg,.png,.jpeg'}
                    showUploadList={false}
                    fileList={store.avatarList as any}
                    className={styles.avatar_upload}
                    beforeUpload={e => {
                        store.imageUpload({
                            image: e,
                        })
                        return false
                    }}
                    onRemove={e => {
                        store.removeImage({
                            image: e,
                        })
                        return false
                    }}
                >
                    <div
                        className={styles.avatar}
                        style={{
                            background: `url('${
                                hooks.avatar || siteStore?.siteAvatar || defaultAvatar
                            }')
                no-repeat center / cover`,
                        }}
                    >
                        <div className={styles.avatar_btn}>更换头像</div>
                    </div>
                </Upload>
            </ImgCrop>
        )
    }

    const getParams = () => {
        let params = form.getFieldsValue()
        if (hooks.avatar) {
            params.avatar = hooks.avatar
        }

        return params
    }

    const updateBaseInfo = (res: unknown) => {
        const { success } = res || {}
        if (!success) {
            const fieldErrors = res?.message.split('/^wt~/')
            if (Array.isArray(fieldErrors)) {
                fieldErrors.map(errItem => {
                    let errKey = errItem.substr(0, errItem.indexOf(':'))
                    let errMsg = errItem.substr(errItem.indexOf(':') + 1, errItem.length).trim()
                    if (errKey) {
                        form.setFields([{ name: errKey, errors: [errMsg] }])
                    }
                })
            }
        } else {
            message.success('修改成功')
            userStore.getUserData()
        }
    }

    return (
        <Observer>
            {() => {
                return (
                    <div className={styles.page}>
                        <div className={styles.content}>
                            <CustomTitle title="基础信息" />
                            <Row>
                                <Col span={10} offset={7}>
                                    <Form
                                        className={styles.form}
                                        form={form}
                                        name="create"
                                        // onFinish={e => {
                                        //     hooks.updateBaseInfo(e, form, userStore.getUserData)
                                        // }}
                                    >
                                        <Form.Item
                                            {...itemLayout}
                                            label={'头像'}
                                            name="avatar"
                                            extra="图片要求：文件大小≤2MB，文件格式JGP、PNG、JPEG"
                                        >
                                            {CustomUpload({ store: hooks })}
                                        </Form.Item>
                                        {userStore.userData?.username ? (
                                            <Form.Item
                                                {...itemLayout}
                                                label={'账号'}
                                                name="username"
                                            >
                                                <Input className={styles.input} disabled={true} />
                                            </Form.Item>
                                        ) : null}
                                        <Form.Item
                                            {...itemLayout}
                                            label={'昵称'}
                                            name="nickname"
                                            rules={[
                                                validateRule({
                                                    rule: 'NOSPECIAL',
                                                    message: '昵称只能使用中文、数字或字母',
                                                    max: 30,
                                                }),
                                            ]}
                                        >
                                            <Input
                                                className={styles.input}
                                                placeholder="请输入昵称"
                                            />
                                        </Form.Item>
                                        <Form.Item noStyle>
                                            <div className={styles.form_btn}>
                                                <LoadingBtn
                                                    url={api.updateBaseInfo}
                                                    method="post"
                                                    getParams={getParams}
                                                    config={{ form: true }}
                                                    callback={updateBaseInfo}
                                                />
                                                {/* <Button type="primary" htmlType="submit">
                                                    确认
                                                </Button> */}
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                        {/* <MyCorp
                            title="编辑头像"
                            visible={hooks.visible}
                            imageSrc={hooks.avatar}
                            onOk={(e: any) => {
                                console.log(e)
                            }}
                            onCancel={() => {}}
                        /> */}
                    </div>
                )
            }}
        </Observer>
    )
}

// BaseInfo.title = '基础信息'
// export default BaseInfo

const ObserverBaseInfo: IRoute = inject('userStore', 'siteStore')(BaseInfo)

ObserverBaseInfo.title = '基础信息'

export default ObserverBaseInfo
