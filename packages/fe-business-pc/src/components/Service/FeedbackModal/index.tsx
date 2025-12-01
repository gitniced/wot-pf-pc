/* eslint-disable*/
/**
 * Created by cgl on 2020/9/23.
 * Theme：意见反馈弹窗
 */
import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Form, Input, Select, Upload, message } from 'antd'
import { PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { useObserver } from 'mobx-react'
import styles from './index.module.less'
import api from '../api'
import { getData, postFile, postData } from '../Http'

const { Option } = Select
export default function (props) {
    const [form] = Form.useForm()

    const [feedbackTypeList, setFeedbackTypeList] = useState([])
    const [uploadFileLength, setUploadFileLength] = useState(0)
    const [unUploadImgList, setUnUploadImgList] = useState([])
    const [imgList, setImgList] = useState([])
    const [previewTitle, setPreviewTitle] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [previewVisible, setPreviewVisible] = useState(false)
    const [fileList, setFileList] = useState([])

    useEffect(() => {
        getFeedbackTypeList()
    }, [])

    /**
     * 获取反馈分类
     * */
    const getFeedbackTypeList = async () => {
        const res = (await getData(api.getFeedbackType)) || {}
        let { status, data } = res || {}
        if (status !== 200) return
        data = data || []
        setFeedbackTypeList(data)
    }

    /**
     * 提交
     */
    const handleOk = () => {
        form.validateFields()
            .then(values => {
                const { cid, content, contact } = values || {}
                let tempList = []
                fileList?.map(item =>
                    tempList.push({
                        url: item.url,
                        name: item.name,
                        file_id: item.file_id,
                        type: item.type,
                    }),
                )
                postData(
                    api.feedbacks,
                    {
                        cid,
                        content,
                        contact,
                        images: tempList,
                        allow_ext: ['jpg', 'png', 'jpeg'],
                    },
                    {
                        noMsg: false,
                        delayTime: 3000,
                        signle: api.feedbacks,
                    },
                )
                    .then(({ data, status }) => {
                        if (status === 200) {
                            message.success('提交成功')
                            props.handleClose()
                        }
                    })
                    .catch(({ data, status }) => {})
            })
            .catch(info => {})
    }

    /**
     * 上传前操作
     * @param file
     * @returns {boolean}
     */
    const beforeUpload = file => {
        // const isImgType =
        //   file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        // if (!isImgType) {
        //   // message.error('文件格式不正确')
        // }
        uploadImg(file)
        return false
    }

    /**
     * 图片上传
     * @param info
     * @returns {Promise<void>}
     */
    async function uploadImg(info) {
        const res = await postFile(api.uploads, { file: info, type: 'img' })
        const { data, status } = res || {}
        // console.log('data', data)
        const { url, name, file_id, type } = data || {}
        setFileList(fileList.concat([{ url, name, file_id, type, hover: false }]))
    }

    /**
     * 预览图片
     * @param data
     * @returns {boolean}
     */
    function onPreview(data) {
        const { url, name } = data || {}
        setPreviewTitle(name)
        setPreviewImage(url)
        setPreviewVisible(true)
    }

    /**
     * 删除图像
     * @param url
     */
    function onDeleteImg(url) {
        const tempList = fileList?.filter(item => item.url !== url)
        setFileList(tempList)
    }

    /**
     * 滑图过片
     * @param url
     */
    function mouseEnter(url) {
        const tempList = fileList.map(item => {
            return {
                ...item,
                hover: url === item.url,
            }
        })
        setFileList(tempList)
    }

    /**
     * 滑出过片
     */
    function mouseLeave() {
        const tempList = fileList.map(item => {
            return {
                ...item,
                hover: false,
            }
        })
        setFileList(tempList)
    }

    return useObserver(() => {
        const { visible } = props
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
        }
        const uploadButton = (
            <div className={styles.upload}>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
            </div>
        )

        const normFile = e => {
            if (Array.isArray(e)) {
                return e
            }
            return e && e.fileList
        }

        // console.log('fileList', fileList)
        return (
            <Modal
                title="意见反馈"
                width={500}
                visible={visible}
                onOk={handleOk}
                destroyOnClose={true}
                okText="提交"
                onCancel={props.handleClose}
            >
                <Form form={form} {...layout}>
                    <Form.Item
                        name="cid"
                        label="问题类型"
                        rules={[{ required: true, message: '请选择问题类型' }]}
                    >
                        <Select placeholder="意见建议">
                            {feedbackTypeList.map(item => {
                                const { key, name } = item || {}
                                return (
                                    <Option value={key} key={`feedback_type_item_${key}`}>
                                        {name}
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item name="content" label="问题描述" rules={[{ required: true }]}>
                        <Input.TextArea
                            placeholder="请填写问题描述以便我们提供更好的帮助"
                            rows={4}
                        />
                    </Form.Item>
                    <Form.Item
                        name="images"
                        label="上传图片"
                        // valuePropName="fileList"
                        // getValueFromEvent={normFile}
                        extra={'JPG、PNG、JPEG格式图片，最多3张'}
                    >
                        <div className={styles.upload_container}>
                            {fileList?.map((item, index) => {
                                const { url, hover } = item
                                return (
                                    <div
                                        key={index}
                                        className={styles.img_item}
                                        onMouseEnter={() => mouseEnter(url)}
                                        onMouseLeave={mouseLeave}
                                    >
                                        <div className={styles.img_box}>
                                            <div
                                                style={{ display: hover ? 'flex' : 'none' }}
                                                className={styles.img_modal}
                                            >
                                                <EyeOutlined
                                                    className={styles.img_icon}
                                                    onClick={() => onPreview(item)}
                                                />
                                                <DeleteOutlined
                                                    className={styles.img_icon}
                                                    onClick={() => onDeleteImg(url)}
                                                />
                                            </div>
                                            <div className={styles.img_content}>
                                                <img src={url} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {fileList?.length < 3 && (
                                <Upload
                                    // fileList={unUploadImgList}
                                    fileList={[]}
                                    className={styles.myUplpad}
                                    listType={'picture-card'}
                                    accept={'.jpg,.png,.jpeg'}
                                    beforeUpload={beforeUpload}
                                >
                                    {uploadButton}
                                </Upload>
                            )}
                        </div>
                    </Form.Item>
                    {/* <Form.Item name="contact" label="联系方式">
                        <Input placeholder="如果您希望得到反馈，请留下您的联系方式" />
                    </Form.Item> */}
                </Form>

                <Modal
                    visible={previewVisible}
                    footer={null}
                    title={previewTitle}
                    onCancel={() => setPreviewVisible(false)}
                >
                    <img alt="logo" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Modal>
        )
    })
}
