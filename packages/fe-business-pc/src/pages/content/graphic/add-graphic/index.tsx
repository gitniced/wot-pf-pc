import React, { useEffect, useState } from 'react'
import { observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import { Button, Col, Form, Input, Row } from 'antd'
import CustomTitle from '@/components/CustomTitle'
import ImageUpload from '@/components/ImageUpload'
import { useLocation, history } from 'umi'
import Hooks from './store'
import type { EditType } from '../interface'
import MoreSelect from '@/components/MoreSelect'
import MyEditor from '@/components/MyEditor'
import { getCookie, getLocalStorage } from '@/storage'
import { STATUS } from './const'
import GlobalUpload from '@/components/GlobalUpload'
import { UploadOutlined } from '@ant-design/icons'
import { Power } from '@wotu/wotu-pro-components'

// 新增图文
const Graphic = observer(() => {
    const organizationCode = getCookie('SELECT_ORG_CODE')
    const hooks = useLocalObservable(() => new Hooks())

    const { query }: any = useLocation()
    const { code: editCode } = query || {}

    const [form] = Form.useForm()
    const [title, setTitle] = useState<string>('新增图文')
    const [disBtn, setDisBtn] = useState(false)

    useEffect(() => {
        if (editCode) {
            document.title = '编辑图文'
            setTitle('编辑图文')
            hooks.getEditDetail(editCode).then((res: any) => {
                if (res.cover) {
                    res.cover = [
                        {
                            uid: '-1',
                            name: 'image.jpeg',
                            status: 'done',
                            url: res.cover,
                        },
                    ]

                    form.setFieldsValue(res)
                } else {
                    Reflect.deleteProperty(res, 'cover')
                    form.setFieldsValue(res)
                }

                let arr = res.imageTextCategoryNameDtoList?.map(i => {
                    return {
                        label: i.name,
                        value: i.code,
                    }
                })

                form.setFieldValue('imageTextCategoryList', arr)
                // 富文本回显
                hooks.editorText = res?.content as string
            })
        } else {
            document.title = '新增图文'
            setTitle('新增图文')
        }
    }, [])

    const itemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    }

    // onFinish
    const onFinish = (val: EditType, type?: number) => {
        let arr =
            (val.imageTextCategoryList &&
                val.imageTextCategoryList?.map(i => {
                    return i.value
                })) ||
            []

        // 处理附件字段
        let attachmentList = []
        val?.attachment?.forEach?.(element => {
            let { name, url } = element.response || {}
            if (url) {
                attachmentList.push({ name, url })
            }
        })

        let attachmentJson = JSON.stringify(attachmentList)
        let tempVal = {
            ...val,
            attachmentJson,
            sort: 0,
            categoryCodes: arr,
            sid: getLocalStorage('SID'),
        }
        Reflect.deleteProperty(tempVal, 'imageTextCategoryList')
        Reflect.deleteProperty(tempVal, 'attachment')
        /* 
                编辑状态下点击的保存
         */
        if (editCode) {
            if (hooks.editDetail.status === STATUS.release) {
                // 编辑
                Object.assign(tempVal, {
                    code: hooks.editDetail.code,
                    isTabBar: 0,
                    status: hooks.editDetail.status,
                })
                hooks.editText(tempVal)
            } else if (hooks.editDetail.status === STATUS.draft) {
                // 编辑
                if (type === 0) {
                    Object.assign(tempVal, {
                        code: hooks.editDetail?.code,
                        isTabBar: 0,
                        status: hooks.editDetail.status,
                    })
                    hooks.editText(tempVal)
                } else {
                    Object.assign(tempVal, { status: 1, code: editCode })
                    hooks.publishText(tempVal)
                }
            }
        } else {
            // 新增  判断点击的是草稿还是发布  0草稿 1发布
            if (type === 0) {
                Object.assign(tempVal, { status: 0 })
                hooks.addText(tempVal)
            } else {
                Object.assign(tempVal, { status: 1 })
                hooks.publishText(tempVal)
            }
        }
    }

    // 内容校验
    const checkContent = () => {
        if (hooks.editorText && hooks.editorText !== '<p><br></p>') {
            return Promise.resolve()
        }
        return Promise.reject(new Error('请输入内容'))
    }

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <CustomTitle title={title} />
                <Row>
                    <Col span={14} offset={5}>
                        <Form
                            className={styles.form}
                            form={form}
                            name="create"
                            onFinish={onFinish}
                            {...itemLayout}
                        >
                            <Form.Item
                                label={'标题'}
                                name="title"
                                rules={[{ required: true, message: '请输入标题' }]}
                            >
                                <Input placeholder="请输入" maxLength={100} showCount />
                            </Form.Item>
                            <Form.Item
                                label={'封面'}
                                name="cover"
                                extra={'使用16:9的图片，建议尺寸750*414px，支持jpg、jpeg、png格式'}
                                valuePropName="fileList"
                                getValueFromEvent={e => {
                                    if (Array.isArray(e)) {
                                        return e
                                    }
                                    return e && e.fileList
                                }}
                            >
                                <ImageUpload
                                    listType="picture-card"
                                    type={10}
                                    otherProps={{
                                        maxCount: 1,
                                        size: 100,
                                        accept: ['image/jpeg', 'image/png', 'image/jpg'],
                                    }}
                                    onCustomRequestEnd={() => {
                                        setDisBtn(false)
                                    }}
                                    onCustomRequestStart={() => {
                                        setDisBtn(true)
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label={'分类'} name="imageTextCategoryList">
                                <MoreSelect
                                    all={false}
                                    maxLength={5}
                                    placeholder="请选择分类"
                                    requestParams={{ organizationCode }}
                                    valueKey={'code'}
                                    mode={'multiple'}
                                    showSearch={false}
                                    requestUrl={'/business/imagetext_category/page'}
                                    beforeChange={(_, selectItem: any) => {
                                        form.setFieldValue('categoryCodes', selectItem?.code)
                                    }}
                                    labelInValue
                                    // fieldNames={{ label: name, value: 'code' }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'内容'}
                                name="content"
                                rules={[{ validator: checkContent }]}
                                required={true}
                            >
                                {/* 副文本 */}
                                <MyEditor
                                    setEditorText={hooks.setEditorText}
                                    editorText={hooks.editorText}
                                />
                            </Form.Item>

                            <Form.Item label={'附件'} name="attachment" extra={'最多上传10份'}>
                                <GlobalUpload
                                    amount={10}
                                    drag={false}
                                    type={18}
                                    size={100}
                                    onCustomRequestStart={() => {
                                        hooks.setBtnLoading(true)
                                    }}
                                    onCustomRequestEnd={() => {
                                        hooks.setBtnLoading(false)
                                    }}
                                >
                                    <Button style={{ width: 140, color: ' rgba(0,0,0,0.65)' }}>
                                        <UploadOutlined />
                                        上传文件
                                    </Button>
                                </GlobalUpload>
                            </Form.Item>
                            <Form.Item noStyle>
                                <div className={styles.form_btn}>
                                    <Button type="default" onClick={() => history.goBack()}>
                                        取消
                                    </Button>
                                    <>
                                        {!editCode && (
                                            <>
                                                <Button
                                                    type="default"
                                                    htmlType="button"
                                                    loading={hooks.btnLoading}
                                                    onClick={() => {
                                                        onFinish(form.getFieldsValue(), 0)
                                                    }}
                                                    disabled={disBtn}
                                                >
                                                    保存草稿
                                                </Button>
                                                <Power powerId={11139}>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        loading={hooks.btnLoading}
                                                        disabled={disBtn}
                                                    >
                                                        {'发布'}
                                                    </Button>
                                                </Power>
                                            </>
                                        )}
                                        {editCode &&
                                            hooks?.editDetail?.status === STATUS.draft && ( //编辑草稿
                                                <>
                                                    <Button
                                                        type="default"
                                                        htmlType="button"
                                                        loading={hooks.btnLoading}
                                                        onClick={() => {
                                                            onFinish(form.getFieldsValue(), 0)
                                                        }}
                                                        disabled={disBtn}
                                                    >
                                                        保存草稿
                                                    </Button>
                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        loading={hooks.btnLoading}
                                                        disabled={disBtn}
                                                    >
                                                        {'发布'}
                                                    </Button>
                                                </>
                                            )}
                                        {editCode &&
                                            hooks?.editDetail?.status === STATUS.release && ( //编辑 发布
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    loading={hooks.btnLoading}
                                                    disabled={disBtn}
                                                >
                                                    {'保存'}
                                                </Button>
                                            )}
                                    </>
                                </div>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    )
})

Graphic.title = '新增图文'
export default Graphic
