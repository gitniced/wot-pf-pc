import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Form, Tooltip, Button, Modal, Radio, Input } from 'antd'
import MyEditor from '@/components/MyEditor'
import { CheckOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'
import GlobalUpload from '@/components/GlobalUpload'
import dayjs from 'dayjs'
import { imgList } from '../../const'
import Cover from '../Cover'

const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}

export default function EnrollDetails({ form, store }: any) {
    // const [editorText, setEditorText] = useState()
    const [open, setOpen] = useState(false)
    const { PortalInfoDetail, selectedCategoryList } = store
    const { name, logo, provinceName, cityName, areaName, industryList } = PortalInfoDetail
    const {
        name: enrollName,
        cover: cover_url,
        applyStartTime,
        applyEndTime,
        entryCodeInteger,
        courseCode,
    } = form.getFieldsValue(true)
    const selectCover = imgList.filter(i => i.value === cover_url)?.[0]
    console.log(selectedCategoryList)

    /**
     * 内容校验
     */
    // const checkContent = () => {
    //   if (editorText && editorText !== '<p><br></p>') {
    //     return Promise.resolve()
    //   }
    //   return Promise.reject(new Error('请输入活动详情'))
    // }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleOk = () => {
        form.validateFields(['cover_type', 'cover', 'cover_file']).then((value: any) => {
            console.log(value)
            const { cover_type, cover_file } = value
            if (cover_type === 1) {
                form.setFieldsValue({ cover: cover_file?.[0]?.response.url })
            }
            setOpen(false)
        })
    }

    const timeRender = () => {
        if (!applyStartTime && !applyEndTime) {
            return '不限'
        }
        return (
            <span>
                {applyStartTime
                    ? dayjs(applyStartTime).format('YYYY-MM-DD HH:mm')
                    : '开始时间不限，'}
                {applyEndTime ? ' 至 ' : ''}
                {applyEndTime
                    ? dayjs(applyEndTime).format('YYYY-MM-DD HH:mm')
                    : '开始，结束时间不限'}
                {applyStartTime ? '' : '结束'}
            </span>
        )
    }

    const cateRender = () => {
        return selectedCategoryList.map((item: any) => {
            const { name: cateName, types } = item
            const count = types.filter((i: any) => ['careerId', 'work', 'level'].includes(i)).length
            return <span>{cateName.slice(-count).join('/')}</span>
        })
    }

    const handleOpen = () => {
        if (imgList.filter((i: any) => i.value === cover_url).length > 0) {
            form.setFieldsValue({ cover_type: 0 })
        } else {
            form.setFieldsValue({
                cover_type: 1,
                cover_file: cover_url
                    ? [
                          {
                              uid: '-1',
                              name: 'image.png',
                              status: 'done',
                              url: cover_url,
                              response: { url: cover_url },
                          },
                      ]
                    : [],
            })
        }
        setOpen(true)
    }

    useEffect(() => {
        store.getPortalInfo()
    }, [])

    return (
        <div className={styles.enroll_details_container}>
            <Form form={form} layout="vertical">
                <div className={styles.details_top}>
                    <div className={styles.cover_wrapper}>
                        <div className={styles.cover_preview}>
                            <Cover
                                text={selectCover?.color ? enrollName : ''}
                                color={selectCover?.color}
                                cover={cover_url}
                            />
                            <div className={styles.cover_option} onClick={handleOpen}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#icon-pingjia`} />
                                </svg>
                                <span>更换封面图</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.enroll_info}>
                        <div className={styles.enroll_title}>{enrollName}</div>
                        <div className={styles.tags_wrapper}>
                            {entryCodeInteger === 9 ? (
                                <span className={styles.course}>{courseCode?.label}</span>
                            ) : (
                                cateRender()
                            )}
                        </div>
                        <div className={styles.enroll_time}>报名时间：{timeRender()}</div>
                    </div>
                </div>
                <div className={styles.details_content_wrapper}>
                    <div className={styles.details_content}>
                        <Form.Item
                            label="活动详情"
                            name="detail"
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: '请输入活动详情',
                            //   },
                            //   {
                            //     validator: checkContent,
                            //   },
                            // ]}
                            valuePropName="editorText"
                        >
                            <MyEditor
                                setEditorText={(val: any) => {
                                    form.setFieldsValue({ detail: val })
                                    // setEditorText(val)
                                }}
                                autoFocus={false}
                                height={600}
                            />
                        </Form.Item>
                    </div>
                    <div className={styles.details_content_right}>
                        <div className={styles.details_org}>
                            <div className={styles.sub_title}>
                                机构信息
                                <Tooltip title="如需修改机构基本信息，请至【系统>机构信息】页面">
                                    <ExclamationCircleOutlined />
                                </Tooltip>
                            </div>
                            <div className={styles.org_info}>
                                <img
                                    src={
                                        logo ||
                                        'https://static.zpimg.cn/public/fe_user_pc/images/default_org@2x.png'
                                    }
                                />
                                <div>{name}</div>
                            </div>
                            <div className={styles.org_item}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#icon_hangye`} />
                                </svg>
                                {industryList?.map((item: any) => item.name)?.join(' / ') || '-'}
                            </div>
                            <div className={styles.org_item}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#jigou`} />
                                </svg>
                                {[provinceName, cityName, areaName].filter(i => i).join(` / `)}
                            </div>
                            <div className={styles.org_item}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#icon_phone`} />
                                </svg>
                                <Form.Item name="contract" label="" noStyle>
                                    <Input maxLength={50} placeholder="请输入" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className={styles.details_file}>
                            <div className={styles.sub_title}>附件材料</div>
                            <Form.Item
                                name="filesLists"
                                extra="支持word、pdf、PPT、excel格式，最多5个"
                                getValueFromEvent={(e: { fileList: any }) => {
                                    if (Array.isArray(e)) {
                                        return e
                                    }
                                    return e && e.fileList
                                }}
                            >
                                <GlobalUpload
                                    amount={5}
                                    size={20}
                                    accept={['excel', 'pdf', 'word', 'ppt']}
                                    drag={false}
                                    type={3}
                                >
                                    <Button icon={<UploadOutlined />}>上传附件</Button>
                                </GlobalUpload>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>

            <Modal title="更换封面图" open={open} onCancel={handleCancel} onOk={handleOk}>
                <Form form={form} layout="horizontal" {...formLayout}>
                    <Form.Item label="封面图" required style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="cover_type"
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Radio.Group
                                options={[
                                    { label: '系统生成', value: 0 },
                                    { label: '自定义', value: 1 },
                                ]}
                                onChange={e => {
                                    if (e.target.value === 0) {
                                        form.setFieldsValue({ cover: imgList[0].value })
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item dependencies={['cover_type']} noStyle>
                            {({ getFieldValue }) => {
                                const type = getFieldValue('cover_type')
                                return (
                                    <>
                                        <div style={{ display: type === 0 ? 'block' : 'none' }}>
                                            <Form.Item name="cover" colon={false}>
                                                <Radio.Group className={styles.group_cover_wrapper}>
                                                    {imgList.map(item => {
                                                        return (
                                                            <Radio value={item.value}>
                                                                <div
                                                                    className={styles.cover_wrapper}
                                                                >
                                                                    <div className={styles.checked}>
                                                                        <CheckOutlined />
                                                                    </div>
                                                                    <img src={item.label} />
                                                                </div>
                                                            </Radio>
                                                        )
                                                    })}
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item dependencies={['cover']} noStyle>
                                                {({ getFieldValue: getFieldValue1 }) => {
                                                    const cover = getFieldValue1('cover')
                                                    const title = getFieldValue1('name')
                                                    const selectStyle = imgList.filter(
                                                        i => i.value === cover,
                                                    )?.[0]
                                                    return (
                                                        <Cover
                                                            width={360}
                                                            text={title}
                                                            color={selectStyle?.color}
                                                            cover={cover}
                                                        />
                                                    )
                                                }}
                                            </Form.Item>
                                        </div>
                                        <Form.Item
                                            style={{ display: type !== 0 ? 'block' : 'none' }}
                                            name="cover_file"
                                            rules={[{ required: type !== 0, message: '请上传' }]}
                                            colon={false}
                                            extra="支持png、jpg、jpeg格式，限1张，建议尺寸640*360px"
                                        >
                                            <GlobalUpload
                                                otherProps={{
                                                    listType: 'picture-card',
                                                }}
                                                amount={1}
                                                size={20}
                                                accept={['image']}
                                                drag={false}
                                                type={3}
                                            >
                                                <UploadOutlined />
                                                上传图片
                                            </GlobalUpload>
                                        </Form.Item>
                                    </>
                                )
                            }}
                        </Form.Item>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
