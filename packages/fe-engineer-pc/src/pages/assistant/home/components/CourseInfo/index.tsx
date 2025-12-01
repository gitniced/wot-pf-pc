import { Form, Input, Select, Radio, Upload, message } from 'antd'
import type { FormInstance } from 'antd/es/form'
import styles from './index.module.less'
import { CheckOutlined } from '@ant-design/icons'
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import ImgCrop from 'antd-img-crop'
import type { UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import kingUrl from '@/servers/kingUrl'
import { useMajorList } from '@/modules/major/hooks'
import http from '@/servers/http'
import api from './../../api'
import { getCookie } from '@/storage'
import { levelListMap } from '@/pages/assistant/home'

enum CUSTOM_COVER_STATUS {
    system = 0,
    custom = 1,
}

export const urls = [
    {
        small: 'https://static.zpimg.cn/public/fe-engineer-pc/images/small1.png',
        large: 'https://static.zpimg.cn/public/fe-engineer-pc/images/large1.png',
    },
    {
        small: 'https://static.zpimg.cn/public/fe-engineer-pc/images/small2.png',
        large: 'https://static.zpimg.cn/public/fe-engineer-pc/images/large2.png',
    },
    {
        small: 'https://static.zpimg.cn/public/fe-engineer-pc/images/small3.png',
        large: 'https://static.zpimg.cn/public/fe-engineer-pc/images/large3.png',
    },
    {
        small: 'https://static.zpimg.cn/public/fe-engineer-pc/images/small4.png',
        large: 'https://static.zpimg.cn/public/fe-engineer-pc/images/large4.png',
    },
]

const CourseInfo = forwardRef(
    (
        {
            form,
            courseInfo,
            templateList,
        }: {
            form: FormInstance<any>
            courseInfo?: Record<string, any> | null
            templateList?: Record<string, any>[] | null
        },
        ref,
    ) => {
        const customCoverStatus = Form.useWatch('customCoverStatus', form)
        const name = Form.useWatch('name', form)
        const [check, setCheck] = useState(0)
        const [fileList, setFileList] = useState<UploadFile[]>([])
        const [levelList, setLevelList] = useState<Record<string, any>[]>([])
        const { majorOptions } = useMajorList()

        const getLevelList = (code: string) => {
            http(api.listByMajorCode + `?majorCode=${code}`, 'post', {}).then((res: any) => {
                if (res?.length) {
                    setLevelList([
                        ...res.map((item: Record<string, any>) => ({
                            value: item?.code,
                            label: levelListMap?.[item?.level]?.label,
                        })),
                    ])
                } else {
                    setLevelList([])
                }
            })
        }

        const onChange: UploadProps['onChange'] = e => {
            setFileList(e.fileList)

            if (e.file.status === 'removed') {
                form.setFieldsValue({
                    coverUrl: [],
                })
            }

            if (e.file.status === 'done') {
                const newFileList = [{ ...e.file?.response?.data, uid: '-1' }]
                form.setFieldsValue({
                    coverUrl: newFileList,
                })
                setFileList(newFileList)
            }

            if (e.file.status === 'error') {
                message.error('上传失败！')
                setFileList([])
                form.setFieldsValue({
                    coverUrl: [],
                })
            }
        }

        useImperativeHandle(ref, () => ({
            getLevelList(code: string) {
                getLevelList(code)
            },
        }))

        useEffect(() => {
            form.setFieldsValue({
                customCoverStatus: +courseInfo?.customCoverStatus || CUSTOM_COVER_STATUS.system,
                coverUrl: courseInfo
                    ? [{ uid: '-1', url: courseInfo?.coverUrl }]
                    : [
                          {
                              uid: '-1',
                              name: '',
                              url: urls[0].large,
                          },
                      ],
            })
            setFileList(courseInfo ? [{ uid: '-1', name: '', url: courseInfo?.coverUrl }] : [])
            setCheck(courseInfo ? urls.findIndex(ele => ele?.large === courseInfo?.coverUrl) : 0)
        }, [courseInfo])

        return (
            <div>
                <Form.Item
                    label="课程名称"
                    name="name"
                    rules={[{ required: true, message: '请输入!' }]}
                >
                    <Input placeholder="请输入" maxLength={50} />
                </Form.Item>

                <Form.Item
                    label="所属专业"
                    name="majorCode"
                    rules={[{ required: true, message: '请选择！' }]}
                    extra="此项新建后不支持修改"
                >
                    <Select
                        placeholder="请选择"
                        options={majorOptions}
                        disabled={courseInfo || templateList ? true : false}
                        onChange={e => {
                            form.setFieldsValue({
                                levelCode: undefined,
                            })
                            getLevelList(e)
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="课程技能所属层级"
                    name="levelCode"
                    rules={[{ required: true, message: '请选择！' }]}
                    extra="此项新建后不支持修改"
                >
                    <Select
                        placeholder="请选择"
                        options={levelList}
                        disabled={courseInfo ? true : false}
                    />
                </Form.Item>

                <Form.Item
                    label="课程封面"
                    name="customCoverStatus"
                    rules={[{ required: true, message: '请选择！' }]}
                    style={{ margin: '0' }}
                >
                    <Radio.Group
                        onChange={e => {
                            if (+e.target.value === CUSTOM_COVER_STATUS.custom) {
                                setFileList([])
                                form.setFieldsValue({
                                    coverUrl: [],
                                })
                            } else {
                                const arr = [
                                    {
                                        uid: '-1',
                                        name: '',
                                        url: urls[0].large,
                                    },
                                ]
                                form.setFieldsValue({
                                    coverUrl: arr,
                                })
                                setFileList(arr)
                                setCheck(0)
                            }
                        }}
                    >
                        <Radio value={CUSTOM_COVER_STATUS.system}>系统生成</Radio>
                        <Radio value={CUSTOM_COVER_STATUS.custom}>自定义</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label=" " colon={false}>
                    {customCoverStatus === CUSTOM_COVER_STATUS.system ? (
                        <div className={styles.custom}>
                            <div className={styles.smalls}>
                                {urls?.map((item, index) => (
                                    <div
                                        key={item?.small}
                                        className={styles.small}
                                        onClick={() => {
                                            setCheck(index)
                                            form.setFieldsValue({
                                                coverUrl: [{ url: urls?.[index]?.large }],
                                            })
                                        }}
                                    >
                                        {check === index && (
                                            <div className={styles.check}>
                                                <CheckOutlined />
                                            </div>
                                        )}

                                        <img src={item?.small} />
                                    </div>
                                ))}
                            </div>

                            <div
                                className={styles.large}
                                style={{
                                    backgroundImage: `url(${urls?.[check]?.large})`,
                                    color: check === 0 ? '#fff' : 'rgba(0,0,0,0.85)',
                                }}
                            >
                                {name}
                            </div>

                            <Form.Item name="coverUrl" style={{ display: 'none' }}>
                                <Input />
                            </Form.Item>
                        </div>
                    ) : (
                        <Form.Item
                            style={{ margin: 0 }}
                            name="coverUrl"
                            valuePropName="fileList"
                            rules={[{ required: true, message: '请选择！' }]}
                            getValueFromEvent={e => {
                                if (Array.isArray(e)) {
                                    return e
                                }
                                return e && e.fileList
                            }}
                            extra="支持png、jpg、jpeg格式，限1张，建议尺寸640*360px"
                        >
                            <ImgCrop rotationSlider aspect={640 / 360}>
                                <Upload
                                    action={kingUrl + '/auth/resource/file/upload'}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    headers={{
                                        Authorization: getCookie('TOKEN'),
                                        'X-Site-Alias': 'engineer',
                                    }}
                                    data={{ type: '28' }}
                                >
                                    {fileList.length < 1 && '上传图片'}
                                </Upload>
                            </ImgCrop>
                        </Form.Item>
                    )}
                </Form.Item>
            </div>
        )
    },
)

export default CourseInfo
